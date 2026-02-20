/**
 * Home Dashboard — with live-simulated smartwatch vitals
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Image, TouchableOpacity, Dimensions, Platform, Animated, Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PandaColors as C } from '@/constants/theme';
import { router } from 'expo-router';

const { width: SW } = Dimensions.get('window');
const BG = '#EEF2F7';

// ── Helpers ──────────────────────────────────────────────────────────────────
/** Clamp a number between min and max */
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Simulate a realistic slow-walk toward a target value */
function useSimulatedValue(
  initial: number,
  min: number,
  max: number,
  intervalMs: number = 2000,
  stepRange: number = 3,
) {
  const [value, setValue] = useState(initial);
  const ref = useRef(initial);
  useEffect(() => {
    const id = setInterval(() => {
      const delta = (Math.random() - 0.5) * stepRange * 2;
      ref.current = clamp(ref.current + delta, min, max);
      setValue(Math.round(ref.current * 10) / 10);
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs, stepRange]);
  return value;
}

// ── Heartbeat pulse animation ────────────────────────────────────────────────
const PulseRing: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.45, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.6, duration: 0, useNativeDriver: true }),
        ]),
        Animated.delay(700),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size / 2,
      borderWidth: 2, borderColor: color,
      transform: [{ scale }], opacity,
    }} />
  );
};

// ── Live Heartbeat Line ───────────────────────────────────────────────────────
const HeartLine: React.FC<{ color: string }> = ({ color }) => {
  // draw a simple ECG-like waveform using bars of varying heights
  const heights = [4, 4, 6, 10, 30, 8, 4, 20, 4, 6, 4, 4, 4, 8, 14, 6, 4, 4];
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, { toValue: 1, duration: 1500, useNativeDriver: false, easing: Easing.linear })
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 36, gap: 2, marginLeft: 4 }}>
      {heights.map((h, i) => (
        <View key={i} style={{ width: 3, height: h, borderRadius: 2, backgroundColor: color, opacity: 0.85 }} />
      ))}
    </View>
  );
};

// ── Arc Gauge ────────────────────────────────────────────────────────────────
const ArcGauge: React.FC<{ pct: number; color: string; size: number; label: string; value: string; unit: string }> = ({
  pct, color, size, label, value, unit,
}) => {
  const stroke = 9;
  const rot = 180 + (pct * 180);
  return (
    <View style={{ alignItems: 'center', width: size }}>
      <View style={{ width: size, height: size / 2 + 16, overflow: 'hidden', alignItems: 'center' }}>
        <View style={{
          width: size, height: size, borderRadius: size / 2,
          borderWidth: stroke, borderColor: '#E0E5EC',
          position: 'absolute', top: 0,
        }} />
        <View style={{
          width: size, height: size, borderRadius: size / 2,
          borderWidth: stroke, borderColor: color,
          borderTopColor: 'transparent', borderRightColor: 'transparent',
          position: 'absolute', top: 0,
          transform: [{ rotate: `${rot - 270}deg` }],
        }} />
        <View style={{ position: 'absolute', top: size * 0.3, alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.22, fontWeight: '800', color: '#111' }}>{value}</Text>
          <Text style={{ fontSize: 10, color: '#999', fontWeight: '600' }}>{unit}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 11, color: '#888', fontWeight: '600', marginTop: 4 }}>{label}</Text>
    </View>
  );
};

// ── Icon stat bubble ──────────────────────────────────────────────────────────
const Bubble: React.FC<{ icon: string; iconColor: string; bg: string; label: string; value: string; sub?: string }> = ({
  icon, iconColor, bg, label, value, sub,
}) => (
  <View style={bu.wrap}>
    <View style={[bu.icon, { backgroundColor: bg }]}>
      <Ionicons name={icon as any} size={22} color={iconColor} />
    </View>
    <Text style={bu.value}>{value}</Text>
    <Text style={bu.label}>{label}</Text>
    {sub ? <Text style={bu.sub}>{sub}</Text> : null}
  </View>
);
const bu = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6, flex: 1 },
  icon: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  value: { fontSize: 18, fontWeight: '800', color: '#111' },
  label: { fontSize: 10, color: '#888', fontWeight: '600' },
  sub: { fontSize: 10, color: '#AAA' },
});

// ── Vital Tile ────────────────────────────────────────────────────────────────
interface VitalTileProps {
  icon: string;
  iconColor: string;
  bg: string;
  label: string;
  value: string | number;
  unit: string;
  sub?: string;
  width?: number;
  showPulse?: boolean;
  showLine?: boolean;
  lineColor?: string;
}
const VitalTile: React.FC<VitalTileProps> = ({
  icon, iconColor, bg, label, value, unit, sub, width, showPulse, showLine, lineColor,
}) => (
  <View style={[vt.tile, width ? { width } : { flex: 1 }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
      <View style={[vt.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={16} color={iconColor} />
      </View>
      <Text style={vt.label}>{label}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
      {showPulse && (
        <View style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
          <PulseRing color={iconColor} size={28} />
          <Ionicons name="heart" size={14} color={iconColor} />
        </View>
      )}
      <Text style={vt.value}>{value}</Text>
      <Text style={vt.unit}>{unit}</Text>
    </View>
    {showLine && lineColor && <HeartLine color={lineColor} />}
    {sub ? <Text style={vt.sub}>{sub}</Text> : null}
  </View>
);
const vt = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  iconWrap: { width: 30, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 11, fontWeight: '700', color: '#AAA', letterSpacing: 0.3 },
  value: { fontSize: 28, fontWeight: '900', color: '#111' },
  unit: { fontSize: 12, fontWeight: '600', color: '#AAA', marginBottom: 4 },
  sub: { fontSize: 10, color: '#BBB', marginTop: 4 },
});

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ text: string; color: string; bg: string }> = ({ text, color, bg }) => (
  <View style={{ backgroundColor: bg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 6 }}>
    <Text style={{ fontSize: 10, fontWeight: '700', color }}>{text}</Text>
  </View>
);

// ── Stress Level Bar ──────────────────────────────────────────────────────────
const StressBar: React.FC<{ level: number }> = ({ level }) => {
  // level 0-100
  const color = level < 30 ? '#10B981' : level < 60 ? '#F59E0B' : '#EF4444';
  const label = level < 30 ? 'Low' : level < 60 ? 'Moderate' : 'High';
  const bg = level < 30 ? '#D1FAE5' : level < 60 ? '#FEF3C7' : '#FEE2E2';
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#AAA' }}>STRESS INDEX</Text>
        <StatusBadge text={label} color={color} bg={bg} />
      </View>
      <View style={{ height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ height: 8, width: `${level}%`, backgroundColor: color, borderRadius: 4 }} />
      </View>
      <Text style={{ fontSize: 10, color: '#BBB', marginTop: 4 }}>{level}/100</Text>
    </View>
  );
};

// ── Watch Connection Banner ───────────────────────────────────────────────────
const WatchBanner: React.FC = () => {
  const dot = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(dot, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <View style={wb.banner}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons name="watch" size={18} color={C.orange} />
        <View>
          <Text style={wb.title}>Panda Watch · Series 3</Text>
          <Text style={wb.sub}>Synced just now · 84% battery</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Animated.View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#10B981', opacity: dot }} />
        <Text style={{ fontSize: 11, color: '#10B981', fontWeight: '700' }}>Live</Text>
      </View>
    </View>
  );
};
const wb = StyleSheet.create({
  banner: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  title: { fontSize: 13, fontWeight: '800', color: '#111' },
  sub: { fontSize: 11, color: '#AAA', marginTop: 1 },
});

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // ── Simulated live vitals ──
  const heartRate   = useSimulatedValue(72, 58, 105, 1800, 4);
  const spo2        = useSimulatedValue(97, 94, 100, 3000, 0.5);
  const hrv         = useSimulatedValue(42, 28, 68, 4000, 3);
  const skinTemp    = useSimulatedValue(36.4, 35.8, 37.2, 5000, 0.2);
  const stressLevel = useSimulatedValue(28, 10, 85, 6000, 6);
  const respRate    = useSimulatedValue(16, 12, 22, 4500, 1);
  const bloodO2     = spo2; // alias for display

  // Heart rate zone label
  const hrZone = heartRate < 60 ? { label: 'Resting', color: '#6366F1', bg: '#EEF2FF' }
               : heartRate < 75 ? { label: 'Normal', color: '#10B981', bg: '#D1FAE5' }
               : heartRate < 90 ? { label: 'Fat Burn', color: '#F59E0B', bg: '#FEF3C7' }
               : { label: 'Cardio', color: '#EF4444', bg: '#FEE2E2' };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.greeting}>{greeting} 👋</Text>
            <Text style={s.username}>Alex Johnson</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={s.avatarBtn}>
            <Image source={require('@/assets/images/image.png')} style={s.avatar} resizeMode="cover" />
          </TouchableOpacity>
        </View>

        {/* ── Wellness score card ── */}
        <View style={s.wellnessCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={s.cardEyebrow}>WELLNESS SCORE</Text>
              <Text style={s.wellnessScore}>7.4<Text style={{ fontSize: 20, color: '#AAA' }}>/10</Text></Text>
              <View style={s.wellnessBadge}>
                <Ionicons name="trending-up" size={12} color="#10B981" />
                <Text style={s.wellnessBadgeText}>+13% this week</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('@/assets/images/image.png')} style={s.pandaMini} resizeMode="contain" />
              <Text style={s.pandaStatus}>Looking great!</Text>
            </View>
          </View>

          {/* Calorie progress */}
          <View style={s.calBarWrap}>
            <View style={s.calBarRow}>
              <Text style={s.calBarLabel}>Calories</Text>
              <Text style={s.calBarVal}><Text style={{ color: C.orange, fontWeight: '800' }}>1,820</Text> / 2,100 kcal</Text>
            </View>
            <View style={s.calTrack}>
              <View style={[s.calFill, { width: '87%' }]} />
            </View>
            <Text style={s.calDeficit}>280 kcal remaining · Deficit −150 kcal today</Text>
          </View>
        </View>

        {/* ── 4 stat bubbles ── */}
        <View style={s.bubblesCard}>
          <Bubble icon="flame" iconColor="#FF6B4A" bg="#FFF0EC" label="Calories" value="1,820" sub="kcal eaten" />
          <View style={s.divider} />
          <Bubble icon="footsteps" iconColor="#3B82F6" bg="#EFF6FF" label="Steps" value="6,430" sub="/ 10,000" />
          <View style={s.divider} />
          <Bubble icon="barbell" iconColor={C.orange} bg="#FFF7ED" label="Workout" value="45" sub="min today" />
          <View style={s.divider} />
          <Bubble icon="water" iconColor="#06B6D4" bg="#ECFEFF" label="Water" value="1.5" sub="L today" />
        </View>

        {/* ── SMARTWATCH VITALS SECTION ── */}
        <View style={{ marginHorizontal: 16, marginBottom: 4 }}>
          <Text style={s.sectionTitle}>⌚ Live Vitals</Text>
          <Text style={s.sectionSub}>Simulated from your Panda Watch</Text>
        </View>

        {/* Watch banner */}
        <WatchBanner />

        {/* Row 1: Heart Rate (large) + SpO2 */}
        <View style={{ flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 10 }}>
          {/* Heart rate — big */}
          <VitalTile
            icon="heart"
            iconColor="#EF4444"
            bg="#FEE2E2"
            label="HEART RATE"
            value={Math.round(heartRate)}
            unit="BPM"
            showPulse
            showLine
            lineColor="#EF4444"
            width={(SW - 32 - 10) * 0.58}
          />
          <View style={{ flex: 1, gap: 10 }}>
            {/* SpO2 */}
            <View style={[vt.tile, { flex: 1 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <View style={[vt.iconWrap, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="pulse" size={15} color="#3B82F6" />
                </View>
                <Text style={vt.label}>SPO₂</Text>
              </View>
              <Text style={[vt.value, { fontSize: 24 }]}>{spo2.toFixed(1)}<Text style={vt.unit}>%</Text></Text>
              <StatusBadge
                text={spo2 >= 96 ? 'Normal' : spo2 >= 90 ? 'Low' : 'Critical'}
                color={spo2 >= 96 ? '#10B981' : spo2 >= 90 ? '#F59E0B' : '#EF4444'}
                bg={spo2 >= 96 ? '#D1FAE5' : spo2 >= 90 ? '#FEF3C7' : '#FEE2E2'}
              />
            </View>
            {/* Resp Rate */}
            <View style={[vt.tile, { flex: 1 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <View style={[vt.iconWrap, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="leaf" size={15} color="#10B981" />
                </View>
                <Text style={vt.label}>RESP</Text>
              </View>
              <Text style={[vt.value, { fontSize: 24 }]}>{Math.round(respRate)}<Text style={vt.unit}>/min</Text></Text>
            </View>
          </View>
        </View>

        {/* Row 2: HRV + Skin Temp */}
        <View style={{ flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 10 }}>
          <VitalTile
            icon="analytics"
            iconColor="#8B5CF6"
            bg="#EDE9FE"
            label="HRV"
            value={Math.round(hrv)}
            unit="ms"
            sub="Heart Rate Variability"
          />
          <VitalTile
            icon="thermometer"
            iconColor="#F97316"
            bg="#FFF7ED"
            label="SKIN TEMP"
            value={skinTemp.toFixed(1)}
            unit="°C"
            sub={skinTemp > 37.0 ? 'Slightly elevated' : 'Normal range'}
          />
        </View>

        {/* Row 3: HR Zone + Stress full-width */}
        <View style={{ marginHorizontal: 16, gap: 10, marginBottom: 10 }}>
          {/* HR Zone */}
          <View style={[vt.tile, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={[vt.iconWrap, { backgroundColor: hrZone.bg, width: 38, height: 38 }]}>
                <Ionicons name="heart-circle" size={20} color={hrZone.color} />
              </View>
              <View>
                <Text style={vt.label}>HEART ZONE</Text>
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#111', marginTop: 2 }}>{hrZone.label}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 30, fontWeight: '900', color: hrZone.color }}>{Math.round(heartRate)}</Text>
              <Text style={{ fontSize: 11, color: '#AAA', fontWeight: '600' }}>BPM</Text>
            </View>
          </View>

          {/* Stress */}
          <View style={vt.tile}>
            <StressBar level={Math.round(stressLevel)} />
          </View>
        </View>

        {/* ── 4 Arc gauges ── */}
        <View style={s.gaugesCard}>
          <Text style={s.cardTitle}>Daily Progress</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
            <ArcGauge pct={0.87} color={C.orange} size={86} label="Calories" value="87%" unit="goal" />
            <ArcGauge pct={0.64} color="#3B82F6" size={86} label="Steps" value="64%" unit="goal" />
            <ArcGauge pct={0.78} color="#10B981" size={86} label="Protein" value="78%" unit="goal" />
            <ArcGauge pct={0.50} color="#8B5CF6" size={86} label="Water" value="50%" unit="goal" />
          </View>
        </View>

        {/* ── Macros ── */}
        <View style={s.cardWhite}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Macros</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/food')}>
              <Text style={s.cardAction}>See details</Text>
            </TouchableOpacity>
          </View>
          {[
            { label: 'Protein', val: 117, goal: 150, color: '#3B82F6', unit: 'g' },
            { label: 'Carbs', val: 210, goal: 260, color: C.orange, unit: 'g' },
            { label: 'Fat', val: 52, goal: 70, color: C.coral, unit: 'g' },
          ].map((m) => (
            <View key={m.label} style={s.macroRow}>
              <Text style={s.macroLabel}>{m.label}</Text>
              <View style={s.macroTrack}>
                <View style={[s.macroFill, { width: `${(m.val / m.goal) * 100}%` as any, backgroundColor: m.color }]} />
              </View>
              <Text style={s.macroVal}>{m.val}<Text style={{ color: '#CCC' }}>/{m.goal}{m.unit}</Text></Text>
            </View>
          ))}
        </View>

        {/* ── Today's Activity ── */}
        <View style={s.cardWhite}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Today's Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/exercise')}>
              <Text style={s.cardAction}>Log workout</Text>
            </TouchableOpacity>
          </View>
          {[
            { icon: 'sunny', label: 'Morning Run', meta: '6.2 km · 32 min', cal: '−310', calColor: '#10B981', time: '7:30 AM' },
            { icon: 'restaurant', label: 'Lunch', meta: 'Chicken salad bowl', cal: '+520', calColor: C.coral, time: '1:10 PM' },
            { icon: 'fitness', label: 'Upper Body Gym', meta: '45 min · 8 sets', cal: '−280', calColor: '#10B981', time: '5:30 PM' },
          ].map((item, i) => (
            <View key={i} style={s.actRow}>
              <View style={[s.actIcon, { backgroundColor: BG }]}>
                <Ionicons name={item.icon as any} size={20} color={C.orange} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.actLabel}>{item.label}</Text>
                <Text style={s.actMeta}>{item.meta}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[s.actCal, { color: item.calColor }]}>{item.cal} kcal</Text>
                <Text style={s.actTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Weekly overview bar chart ── */}
        <View style={s.cardWhite}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Weekly Steps</Text>
            <Text style={s.cardAction}>Avg 8,240</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, marginTop: 8 }}>
            {[
              { d: 'M', v: 0.75, done: true },
              { d: 'T', v: 0.88, done: true },
              { d: 'W', v: 0.50, done: true },
              { d: 'T', v: 0.95, done: true, today: true },
              { d: 'F', v: 0.30, done: false },
              { d: 'S', v: 0.10, done: false },
              { d: 'S', v: 0.05, done: false },
            ].map((b, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1, gap: 6 }}>
                <View style={{
                  flex: 1, width: 28, borderRadius: 8,
                  backgroundColor: b.done ? (b.today ? C.orange : '#D1FAE5') : '#F0F0F0',
                  alignSelf: 'flex-end',
                  height: `${b.v * 100}%` as any,
                }} />
                <Text style={{ fontSize: 10, color: b.today ? C.orange : '#AAA', fontWeight: b.today ? '800' : '600' }}>{b.d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Panda tip ── */}
        <View style={[s.cardWhite, { flexDirection: 'row', alignItems: 'center', gap: 14 }]}>
          <Image source={require('@/assets/images/image.png')} style={{ width: 52, height: 52 }} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: C.orange, marginBottom: 3, letterSpacing: 0.5 }}>PANDA INSIGHT</Text>
            <Text style={{ fontSize: 13, color: '#555', lineHeight: 19 }}>
              Your heart rate is {Math.round(heartRate)} BPM — {hrZone.label.toLowerCase()} zone. Keep it up and drink water!
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 36,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: '#888', fontWeight: '600' },
  username: { fontSize: 22, fontWeight: '800', color: '#111', marginTop: 2 },
  avatarBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', backgroundColor: '#EEF9FF', borderWidth: 2, borderColor: '#fff' },
  avatar: { width: 44, height: 44 },

  wellnessCard: {
    marginHorizontal: 16, backgroundColor: '#fff',
    borderRadius: 24, padding: 20, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  cardEyebrow: { fontSize: 10, fontWeight: '800', color: '#AAA', letterSpacing: 1.5, marginBottom: 6 },
  wellnessScore: { fontSize: 48, fontWeight: '900', color: '#111', lineHeight: 54 },
  wellnessBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#D1FAE5', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 8 },
  wellnessBadgeText: { fontSize: 11, color: '#10B981', fontWeight: '700' },
  pandaMini: { width: 62, height: 62 },
  pandaStatus: { fontSize: 11, color: '#AAA', marginTop: 3 },

  calBarWrap: { marginTop: 18 },
  calBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  calBarLabel: { fontSize: 12, fontWeight: '600', color: '#777' },
  calBarVal: { fontSize: 12, color: '#888' },
  calTrack: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  calFill: { height: 8, backgroundColor: C.orange, borderRadius: 4 },
  calDeficit: { fontSize: 11, color: '#AAA' },

  bubblesCard: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 24, padding: 18, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 12, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  divider: { width: 1, height: 48, backgroundColor: '#F0F0F0' },

  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 2 },
  sectionSub: { fontSize: 12, color: '#AAA', fontWeight: '500', marginBottom: 12 },

  gaugesCard: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 12, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },

  cardWhite: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 12, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  cardAction: { fontSize: 13, color: C.orange, fontWeight: '600' },

  macroRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  macroLabel: { width: 52, fontSize: 12, fontWeight: '600', color: '#555' },
  macroTrack: { flex: 1, height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
  macroFill: { height: 8, borderRadius: 4 },
  macroVal: { width: 72, fontSize: 12, fontWeight: '700', color: '#333', textAlign: 'right' },

  actRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  actIcon: { width: 42, height: 42, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  actLabel: { fontSize: 13, fontWeight: '700', color: '#111' },
  actMeta: { fontSize: 11, color: '#AAA', marginTop: 2 },
  actCal: { fontSize: 13, fontWeight: '700' },
  actTime: { fontSize: 10, color: '#BBB', marginTop: 2 },
});
