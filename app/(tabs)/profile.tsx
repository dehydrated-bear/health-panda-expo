/**
 * Profile Page
 */
import React from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Image, Platform,
} from 'react-native';
import { PandaColors as C } from '@/constants/theme';
import { router } from 'expo-router';

const STATS = [
    { label: 'Current', value: '72.4 kg', icon: '⚖️', color: C.orange },
    { label: 'Target', value: '68 kg', icon: '🎯', color: '#10B981' },
    { label: 'BMI', value: '23.1', icon: '📊', color: '#3B82F6' },
    { label: 'Body Fat', value: '18%', icon: '📏', color: C.coral },
];

const SETTINGS = [
    {
        section: 'Health & Goals', items: [
            { label: 'Edit Goals', icon: '🎯' },
            { label: 'Calorie Target', icon: '🔥' },
            { label: 'Activity Level', icon: '💪' },
            { label: 'Connected Devices', icon: '⌚' },
        ]
    },
    {
        section: 'App', items: [
            { label: 'Notifications', icon: '🔔' },
            { label: 'Reminders', icon: '⏰' },
            { label: 'Privacy', icon: '🔒' },
            { label: 'About', icon: 'ℹ️' },
        ]
    },
];

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header banner */}
                <View style={s.banner}>
                    <View style={s.avatarWrap}>
                        <Image source={require('@/assets/images/image.png')} style={s.avatar} resizeMode="contain" />
                    </View>
                    <Text style={s.name}>Alex Johnson</Text>
                    <Text style={s.handle}>Member since Feb 2026</Text>
                    <TouchableOpacity style={s.editBtn}>
                        <Text style={s.editBtnText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats row */}
                <View style={s.statsRow}>
                    {STATS.map((st) => (
                        <View key={st.label} style={[s.statBox, { borderTopColor: st.color, borderTopWidth: 3 }]}>
                            <Text style={{ fontSize: 20, marginBottom: 4 }}>{st.icon}</Text>
                            <Text style={[s.statValue, { color: st.color }]}>{st.value}</Text>
                            <Text style={s.statLabel}>{st.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Weekly summary bar */}
                <View style={s.weeklyCard}>
                    <Text style={s.cardTitle}>This week</Text>
                    <View style={s.weeklyRow}>
                        {[
                            { label: 'Workouts', value: '4', unit: 'sessions', color: C.orange },
                            { label: 'Avg Steps', value: '9.2k', unit: '/day', color: '#3B82F6' },
                            { label: 'Avg Cals', value: '1,940', unit: 'kcal/day', color: '#10B981' },
                        ].map((wk) => (
                            <View key={wk.label} style={s.weeklyItem}>
                                <Text style={[s.weeklyValue, { color: wk.color }]}>{wk.value}</Text>
                                <Text style={s.weeklyUnit}>{wk.unit}</Text>
                                <Text style={s.weeklyLabel}>{wk.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Achievements */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Achievements</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 4 }}>
                        {[
                            { icon: '🔥', label: '7-day streak', earned: true },
                            { icon: '🏃', label: 'First 5K', earned: true },
                            { icon: '💪', label: '50 workouts', earned: false },
                            { icon: '🥗', label: 'Clean eater', earned: false },
                            { icon: '⚖️', label: '-5 kg', earned: false },
                        ].map((a) => (
                            <View key={a.label} style={[s.badge, !a.earned && { opacity: 0.35 }]}>
                                <Text style={{ fontSize: 28 }}>{a.icon}</Text>
                                <Text style={s.badgeLabel}>{a.label}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Settings */}
                {SETTINGS.map((group) => (
                    <View key={group.section} style={s.section}>
                        <Text style={s.sectionTitle}>{group.section}</Text>
                        <View style={s.settingsCard}>
                            {group.items.map((item, i) => (
                                <TouchableOpacity
                                    key={item.label}
                                    style={[s.settingRow, i < group.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }]}
                                >
                                    <Text style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</Text>
                                    <Text style={s.settingLabel}>{item.label}</Text>
                                    <Text style={{ color: '#DDD', fontSize: 18 }}>›</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Sign out */}
                <View style={s.section}>
                    <TouchableOpacity
                        style={s.signOutBtn}
                        onPress={() => router.replace('/(auth)/welcome')}
                    >
                        <Text style={s.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    banner: {
        backgroundColor: '#fff', paddingTop: Platform.OS === 'ios' ? 60 : 36,
        paddingBottom: 28, alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    },
    avatarWrap: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#EEF9FF', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: C.orange + '40', marginBottom: 12 },
    avatar: { width: 86, height: 86 },
    name: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 3 },
    handle: { fontSize: 13, color: '#AAA', marginBottom: 14 },
    editBtn: { backgroundColor: C.orange + '12', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderColor: C.orange + '40' },
    editBtnText: { fontSize: 13, fontWeight: '700', color: C.orange },

    statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginTop: 16, marginBottom: 16 },
    statBox: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0' },
    statValue: { fontSize: 14, fontWeight: '800' },
    statLabel: { fontSize: 10, color: '#AAA', marginTop: 2, fontWeight: '600' },

    weeklyCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#F0F0F0' },
    cardTitle: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 14 },
    weeklyRow: { flexDirection: 'row', justifyContent: 'space-around' },
    weeklyItem: { alignItems: 'center' },
    weeklyValue: { fontSize: 20, fontWeight: '800' },
    weeklyUnit: { fontSize: 11, color: '#AAA', marginTop: 1 },
    weeklyLabel: { fontSize: 11, color: '#999', fontWeight: '600', marginTop: 3 },

    section: { marginHorizontal: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 12 },

    badge: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, width: 90, borderWidth: 1, borderColor: '#F0F0F0' },
    badgeLabel: { fontSize: 10, color: '#777', marginTop: 6, textAlign: 'center', fontWeight: '600' },

    settingsCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#F0F0F0' },
    settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
    settingLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },

    signOutBtn: { borderWidth: 1.5, borderColor: C.coral, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
    signOutText: { fontSize: 15, fontWeight: '700', color: C.coral },
});
