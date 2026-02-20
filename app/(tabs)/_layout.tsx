/**
 * Custom Tab Bar — panda face raised in centre, 2 icons each side
 * Layout: [Leaderboard] [Food] [🐼 Home] [Exercise] [Profile]
 */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Image, Platform, Dimensions,
} from 'react-native';
import { Tabs, router, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PandaColors as C } from '@/constants/theme';

const { width: SW } = Dimensions.get('window');

// ── Icon primitives (text-based, no external dep needed) ─────────────────────
const icons: Record<string, string> = {
  leaderboard: '🏆',
  food: '🥗',
  exercise: '💪',
  profile: '👤',
};

const TABS = [
  { key: 'leaderboard', label: 'Ranks' },
  { key: 'food', label: 'Food' },
  { key: 'index', label: '', center: true },
  { key: 'exercise', label: 'Exercise' },
  { key: 'profile', label: 'Profile' },
];

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[tb.wrap, { paddingBottom: insets.bottom || 12 }]}>
      {/* Separator line */}
      <View style={tb.line} />

      <View style={tb.row}>
        {TABS.map((tab, i) => {
          const routeIndex = state.routes.findIndex((r: any) => r.name === tab.key);
          const isFocused = state.index === routeIndex;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: state.routes[routeIndex]?.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[routeIndex]?.name || tab.key);
            }
          };

          // Centre panda button
          if (tab.center) {
            return (
              <View key="center" style={tb.centerWrap}>
                <TouchableOpacity style={[tb.pandaBtn, isFocused && { borderColor: C.orange }]} onPress={onPress} activeOpacity={0.88}>
                  <View style={tb.pandaBg} />
                  <Image source={require('@/assets/images/image.png')} style={tb.pandaImg} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity key={tab.key} style={tb.tabBtn} onPress={onPress} activeOpacity={0.8}>
              <Text style={[tb.tabIcon, isFocused && { opacity: 1 }]}>
                {icons[tab.key]}
              </Text>
              <Text style={[tb.tabLabel, isFocused && { color: C.orange, fontWeight: '700' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const PANDA_BTN = 64;

const tb = StyleSheet.create({
  wrap: { backgroundColor: '#fff', paddingTop: 0 },
  line: { height: 1, backgroundColor: '#F0F0F0' },
  row: { flexDirection: 'row', alignItems: 'flex-end', paddingTop: 6 },

  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabIcon: { fontSize: 22, opacity: 0.45 },
  tabLabel: { fontSize: 10, color: '#BBB', fontWeight: '600', marginTop: 3 },

  centerWrap: { flex: 1, alignItems: 'center', paddingBottom: 6 },
  pandaBtn: {
    width: PANDA_BTN + 10, height: PANDA_BTN + 10,
    borderRadius: (PANDA_BTN + 10) / 2,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginTop: -(PANDA_BTN / 2),
    borderWidth: 3, borderColor: '#F0F0F0',
    shadowColor: C.orange, shadowOpacity: 0.22,
    shadowRadius: 10, shadowOffset: { width: 0, height: -2 }, elevation: 12,
  },
  pandaBg: { position: 'absolute', width: 68, height: 68, borderRadius: 34, backgroundColor: '#EEF9FF' },
  pandaImg: { width: 62, height: 62 },
});

// ── Layout ────────────────────────────────────────────────────────────────────
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="leaderboard" />
      <Tabs.Screen name="food" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="exercise" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
