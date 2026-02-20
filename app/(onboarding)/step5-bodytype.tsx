import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Dimensions, Image,
} from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const { width: SW } = Dimensions.get('window');
const CARD_W = SW * 0.60;
const CARD_GAP = 12;

// ── 5 body type definitions ───────────────────────────────────────────────────
const TYPES = [
    {
        key: '1',
        label: 'Shredded',
        sub: 'Very lean & defined',
        bodyfat: '6–10%',
        bfNum: 8,
        desc: 'Visible muscle definition, six-pack abs, very low body fat',
        color: '#3B82F6',
        image: require('@/assets/images/1.jpeg'),
    },
    {
        key: '2',
        label: 'Fit',
        sub: 'Lean & athletic',
        bodyfat: '10–15%',
        bfNum: 12,
        desc: 'Athletic build, some muscle definition, healthy weight',
        color: '#10B981',
        image: require('@/assets/images/2.jpeg'),
    },
    {
        key: '3',
        label: 'Average',
        sub: 'Healthy weight',
        bodyfat: '15–22%',
        bfNum: 18,
        desc: 'Normal weight range, moderate fitness level',
        color: C.yellow,
        image: require('@/assets/images/3.jpeg'),
    },
    {
        key: '4',
        label: 'Overweight',
        sub: 'Higher body fat',
        bodyfat: '22–30%',
        bfNum: 26,
        desc: 'Carrying extra weight, reduced muscle visibility',
        color: C.orange,
        image: require('@/assets/images/4.jpeg'),
    },
    {
        key: '5',
        label: 'Obese',
        sub: 'High body fat',
        bodyfat: '30%+',
        bfNum: 35,
        desc: 'Significantly above healthy weight range',
        color: C.coral,
        image: require('@/assets/images/5.jpeg'),
    },
] as const;

// ── Body Fat gauge bar ────────────────────────────────────────────────────────
const BfBar: React.FC<{ bfNum: number; color: string }> = ({ bfNum, color }) => {
    const fillW = useSharedValue(0);

    React.useEffect(() => {
        // 6% → 0%, 36% → 100%
        const pct = Math.min(Math.max((bfNum - 6) / 30, 0), 1);
        fillW.value = withTiming(pct, { duration: 500, easing: Easing.out(Easing.cubic) });
    }, [bfNum]);

    const fillStyle = useAnimatedStyle(() => ({
        width: `${fillW.value * 100}%` as any,
        backgroundColor: color,
    }));

    return (
        <View style={bf.wrap}>
            <View style={bf.trackBg}>
                {/* Gradient segments underneath */}
                <View style={[StyleSheet.absoluteFillObject, bf.segments]} pointerEvents="none">
                    {['#3B82F6', '#10B981', '#FBBF24', '#F97316', '#EF4444'].map((c, i) => (
                        <View key={i} style={{ flex: 1, backgroundColor: c + '28' }} />
                    ))}
                </View>
                <Animated.View style={[bf.fill, fillStyle]} />
            </View>
            <View style={bf.labelRow}>
                <Text style={bf.labelText}>Low fat</Text>
                <Text style={bf.labelText}>High fat</Text>
            </View>
        </View>
    );
};
const bf = StyleSheet.create({
    wrap: { marginTop: 10 },
    trackBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
    segments: { flexDirection: 'row' },
    fill: { height: 8, borderRadius: 4, position: 'absolute', top: 0, left: 0, bottom: 0 },
    labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
    labelText: { fontSize: 9, color: '#BBB', fontWeight: '600' },
});

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Step5BodyType() {
    const [selected, setSelected] = useState<string | null>(null);
    const scrollRef = useRef<ScrollView>(null);

    const activeType = TYPES.find((t) => t.key === selected);

    const handleSelect = (key: string, idx: number) => {
        setSelected(key);
        // Scroll the selected card into view
        scrollRef.current?.scrollTo({
            x: Math.max(0, idx * (CARD_W + CARD_GAP) - (SW - CARD_W) / 2 + CARD_GAP),
            animated: true,
        });
    };

    return (
        <OnboardingShell
            step={5}
            title="Body type"
            pandaSpeech={activeType
                ? `Type ${activeType.key} — ${activeType.sub}. Body fat ~${activeType.bodyfat}.`
                : "Scroll and pick the image that best matches you right now."}
            onContinue={() => router.push('/(onboarding)/step6-goal')}
            canContinue={selected !== null}
        >
            {/* Number scale */}
            <View style={s.scaleRow}>
                {TYPES.map((t) => (
                    <TouchableOpacity
                        key={t.key}
                        style={[
                            s.numBtn,
                            { borderColor: selected === t.key ? t.color : '#E8E8E8' },
                            selected === t.key && { backgroundColor: t.color },
                        ]}
                        onPress={() => handleSelect(t.key, TYPES.indexOf(t))}
                    >
                        <Text style={[s.numText, selected === t.key && { color: '#fff' }]}>{t.key}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ── Horizontal image cards ── */}
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_W + CARD_GAP}
                decelerationRate="fast"
                contentContainerStyle={s.scrollContent}
            >
                {TYPES.map((t, idx) => {
                    const active = selected === t.key;
                    return (
                        <TouchableOpacity
                            key={t.key}
                            style={[
                                s.card,
                                active && { borderColor: t.color, borderWidth: 2.5 },
                            ]}
                            onPress={() => handleSelect(t.key, idx)}
                            activeOpacity={0.9}
                        >
                            {/* Image */}
                            <View style={s.imgWrap}>
                                <Image
                                    source={t.image}
                                    style={[s.img, !active && { opacity: 0.82 }]}
                                    resizeMode="cover"
                                />
                                {/* Type number badge */}
                                <View style={[s.badge, { backgroundColor: active ? t.color : '#00000066' }]}>
                                    <Text style={s.badgeText}>{t.key}</Text>
                                </View>
                            </View>

                            {/* Info */}
                            <View style={s.cardInfo}>
                                <Text style={[s.cardLabel, active && { color: t.color }]}>{t.label}</Text>
                                <Text style={s.cardSub}>{t.sub}</Text>

                                {/* Body fat chip */}
                                <View style={[s.bfChip, { backgroundColor: t.color + '15', borderColor: t.color + '40' }]}>
                                    <Text style={[s.bfText, { color: t.color }]}>Body fat  {t.bodyfat}</Text>
                                </View>

                                <Text style={s.cardDesc}>{t.desc}</Text>

                                {/* Body fat bar */}
                                <BfBar bfNum={t.bfNum} color={t.color} />
                            </View>

                            {active && (
                                <View style={[s.checkBadge, { backgroundColor: t.color }]}>
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '800' }}>✓</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Dot indicators */}
            <View style={s.dots}>
                {TYPES.map((t) => (
                    <TouchableOpacity
                        key={t.key}
                        onPress={() => handleSelect(t.key, TYPES.indexOf(t))}
                    >
                        <View style={[
                            s.dot,
                            selected === t.key && { width: 20, backgroundColor: t.color },
                        ]} />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={s.hint}>← Swipe to browse all 5 types →</Text>
        </OnboardingShell>
    );
}

const s = StyleSheet.create({
    // Number picker row
    scaleRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginBottom: 14, gap: 8,
    },
    numBtn: {
        flex: 1, height: 38, borderRadius: 10, borderWidth: 1.5,
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA',
    },
    numText: { fontSize: 15, fontWeight: '800', color: '#AAA' },

    // Scroll
    scrollContent: { paddingHorizontal: 2, paddingBottom: 4, gap: CARD_GAP },

    // Card
    card: {
        width: CARD_W,
        borderRadius: 18, borderWidth: 1.5, borderColor: '#E8E8E8',
        backgroundColor: '#fff', overflow: 'hidden',
    },
    imgWrap: {
        width: '100%', height: 200,
        backgroundColor: '#F0F7FF',
        position: 'relative',
    },
    img: { width: '100%', height: '100%' },

    badge: {
        position: 'absolute', top: 10, left: 10,
        width: 30, height: 30, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center',
    },
    badgeText: { color: '#fff', fontSize: 14, fontWeight: '800' },

    checkBadge: {
        position: 'absolute', top: 10, right: 10,
        width: 28, height: 28, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center',
    },

    cardInfo: { padding: 14 },
    cardLabel: { fontSize: 17, fontWeight: '800', color: '#111', marginBottom: 1 },
    cardSub: { fontSize: 12, color: '#888', marginBottom: 10 },

    bfChip: {
        alignSelf: 'flex-start', borderRadius: 20, borderWidth: 1,
        paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8,
    },
    bfText: { fontSize: 11, fontWeight: '700' },

    cardDesc: { fontSize: 11, color: '#AAA', lineHeight: 16, marginBottom: 4 },

    // Dots + hint
    dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 14 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDD' },
    hint: { textAlign: 'center', fontSize: 11, color: '#CCC', marginTop: 8 },
});
