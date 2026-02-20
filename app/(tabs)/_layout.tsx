/**
 * Custom Tab Bar — dark pill bar, circular selected state (reference style)
 */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Image, Platform,
} from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PandaColors as C } from '@/constants/theme';

const TABS = [
  { name: 'leaderboard', icon: 'stats-chart-outline', iconActive: 'stats-chart', label: 'Ranks' },
  { name: 'food', icon: 'restaurant-outline', iconActive: 'restaurant', label: 'Food' },
  { name: 'index', label: '', center: true },
  { name: 'exercise', icon: 'fitness-outline', iconActive: 'fitness', label: 'Train' },
  { name: 'profile', icon: 'person-outline', iconActive: 'person', label: 'Profile' },
];

const PANDA = 52;

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.outer, { paddingBottom: insets.bottom || 12 }]}>
      <View style={s.bar}>
        {TABS.map((tab) => {
          // Find the route in the navigation state that matches this tab's name
          const routeIdx = state.routes.findIndex((r: any) =>
            r.name === tab.name || (tab.name === 'index' && r.name.toLowerCase().includes('index'))
          );
          const focused = state.index === routeIdx;

          const onPress = () => {
            const route = state.routes[routeIdx];
            const event = navigation.emit({
              type: 'tabPress',
              target: route?.key || tab.name,
              canPreventDefault: true
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route?.name ?? tab.name);
            }
          };

          // ── Centre panda ────────────────────────────────────────────
          if (tab.center) {
            return (
              <View key="center" style={s.centerSlot}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[s.pandaRing, focused && { borderColor: C.orange }]}>
                  <View style={s.pandaClip}>
                    <Image source={require('@/assets/images/image.png')} style={s.pandaImg} resizeMode="cover" />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          // ── Regular tab ─────────────────────────────────────────────
          return (
            <TouchableOpacity key={tab.name} style={s.tabBtn} onPress={onPress} activeOpacity={0.75}>
              <View style={[s.iconCircle, focused && s.iconCircleActive]}>
                <Ionicons
                  name={(focused ? tab.iconActive : tab.icon) as any}
                  size={24}
                  color={focused ? '#fff' : 'rgba(255,255,255,0.7)'}
                />
              </View>
              <Text style={[s.lbl, focused && s.lblActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  outer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18191E',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 24,
  },

  tabBtn: { flex: 1, alignItems: 'center', gap: 4 },
  iconCircle: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  iconCircleActive: { backgroundColor: C.orange },
  lbl: { fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: 0.3 },
  lblActive: { color: '#fff' },

  centerSlot: { flex: 1, alignItems: 'center' },
  pandaRing: {
    width: PANDA + 8, height: PANDA + 8,
    borderRadius: (PANDA + 8) / 2,
    borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    shadowColor: C.orange, shadowOpacity: 0.35,
    shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 16,
  },
  pandaClip: { width: PANDA + 4, height: PANDA + 4, overflow: 'hidden', borderRadius: (PANDA + 4) / 2, backgroundColor: '#EEF9FF' },
  pandaImg: { width: PANDA + 4, height: PANDA + 4 },
});

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="leaderboard" />
      <Tabs.Screen name="food" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="exercise" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
