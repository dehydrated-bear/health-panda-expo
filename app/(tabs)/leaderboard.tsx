/**
 * Leaderboard Page
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { PandaColors as C } from '@/constants/theme';

const TAB_LABELS = ['Steps', 'Calories', 'Workouts'];

const LEADERS = [
    { rank: 1, name: 'Sarah K.', steps: 14220, cal: 2840, workouts: 6, avatar: '👩', badge: '🥇', you: false },
    { rank: 2, name: 'Mike R.', steps: 12800, cal: 2610, workouts: 5, avatar: '👨', badge: '🥈', you: false },
    { rank: 3, name: 'You', steps: 10640, cal: 2100, workouts: 4, avatar: '🐼', badge: '🥉', you: true },
    { rank: 4, name: 'Priya S.', steps: 9800, cal: 1980, workouts: 4, avatar: '👩', badge: '', you: false },
    { rank: 5, name: 'James L.', steps: 9200, cal: 1870, workouts: 3, avatar: '👨', badge: '', you: false },
    { rank: 6, name: 'Emma T.', steps: 8600, cal: 1760, workouts: 3, avatar: '👩', badge: '', you: false },
    { rank: 7, name: 'Carlos M.', steps: 7900, cal: 1680, workouts: 2, avatar: '👨', badge: '', you: false },
    { rank: 8, name: 'Nina P.', steps: 7100, cal: 1520, workouts: 2, avatar: '👩', badge: '', you: false },
];

const CHALLENGES = [
    { title: '10K Steps Daily', progress: 0.75, goal: '7-day challenge', daysLeft: 2, color: '#3B82F6' },
    { title: '500 kcal Burn', progress: 0.84, goal: 'Today only', daysLeft: 0, color: C.coral },
    { title: 'Hydration Heroes', progress: 0.60, goal: 'Weekly challenge', daysLeft: 4, color: C.orange },
];

export default function LeaderboardScreen() {
    const [tab, setTab] = useState(0);

    const getVal = (p: typeof LEADERS[0]) => {
        if (tab === 0) return `${(p.steps / 1000).toFixed(1)}k`;
        if (tab === 1) return `${p.cal}`;
        return `${p.workouts}`;
    };
    const getUnit = () => tab === 0 ? 'steps' : tab === 1 ? 'kcal' : 'workouts';
    const rawVal = (p: typeof LEADERS[0]) => (tab === 0 ? p.steps : tab === 1 ? p.cal : p.workouts);
    const maxPossible = Math.max(...LEADERS.map(rawVal));

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header */}
                <View style={s.header}>
                    <Text style={s.title}>Leaderboard</Text>
                    <Text style={s.sub}>This week · 8 friends</Text>
                </View>

                {/* Podium top 3 */}
                <View style={s.podiumCard}>
                    {/* 2nd */}
                    <View style={[s.podiumCol, { marginTop: 28 }]}>
                        <Text style={{ fontSize: 28 }}>{LEADERS[1].avatar}</Text>
                        <View style={[s.podiumBar, { height: 70, backgroundColor: '#A8A8A8' }]}>
                            <Text style={s.podiumRank}>2</Text>
                        </View>
                        <Text style={s.podiumName}>{LEADERS[1].name}</Text>
                        <Text style={s.podiumVal}>{getVal(LEADERS[1])} {getUnit()}</Text>
                    </View>
                    {/* 1st */}
                    <View style={s.podiumCol}>
                        <Text style={{ fontSize: 10, color: '#F59E0B', fontWeight: '800', marginBottom: 2 }}>LEADER</Text>
                        <Text style={{ fontSize: 32 }}>{LEADERS[0].avatar}</Text>
                        <View style={[s.podiumBar, { height: 96, backgroundColor: C.orange }]}>
                            <Text style={s.podiumRank}>1</Text>
                        </View>
                        <Text style={[s.podiumName, { color: C.orange, fontWeight: '800' }]}>{LEADERS[0].name}</Text>
                        <Text style={s.podiumVal}>{getVal(LEADERS[0])} {getUnit()}</Text>
                    </View>
                    {/* 3rd (you!) */}
                    <View style={[s.podiumCol, { marginTop: 48 }]}>
                        <Text style={{ fontSize: 28 }}>{LEADERS[2].avatar}</Text>
                        <View style={[s.podiumBar, { height: 54, backgroundColor: '#CD7F32' }]}>
                            <Text style={s.podiumRank}>3</Text>
                        </View>
                        <Text style={[s.podiumName, { color: C.orange }]}>{LEADERS[2].name}</Text>
                        <Text style={s.podiumVal}>{getVal(LEADERS[2])} {getUnit()}</Text>
                    </View>
                </View>

                {/* Tab filter */}
                <View style={s.tabRow}>
                    {TAB_LABELS.map((t, i) => (
                        <TouchableOpacity key={t} style={[s.tabPill, tab === i && s.tabActive]} onPress={() => setTab(i)}>
                            <Text style={[s.tabText, tab === i && s.tabTextActive]}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Full list */}
                <View style={s.listCard}>
                    {LEADERS.map((p) => (
                        <View key={p.rank} style={[s.row, p.you && { backgroundColor: C.orange + '08' }]}>
                            <Text style={[s.rank, p.rank <= 3 && { color: C.orange }]}>
                                {p.badge || `#${p.rank}`}
                            </Text>
                            <View style={[s.ava, p.you && { borderColor: C.orange, borderWidth: 2, backgroundColor: C.orange + '15' }]}>
                                <Text style={{ fontSize: 18 }}>{p.avatar}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={[s.pname, p.you && { color: C.orange }]}>{p.name}</Text>
                                <View style={s.miniTrack}>
                                    <View style={[s.miniFill, { width: `${(rawVal(p) / maxPossible) * 100}%` as any, backgroundColor: p.you ? C.orange : '#DDD' }]} />
                                </View>
                            </View>
                            <Text style={[s.pval, p.you && { color: C.orange }]}>{getVal(p)} {getUnit()}</Text>
                        </View>
                    ))}
                </View>

                {/* Challenges */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Active Challenges</Text>
                    {CHALLENGES.map((ch) => (
                        <View key={ch.title} style={s.chCard}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={s.chTitle}>{ch.title}</Text>
                                <Text style={[s.chGoal, { color: ch.color }]}>{ch.goal}</Text>
                            </View>
                            <View style={s.chTrack}>
                                <View style={[s.chFill, { width: `${ch.progress * 100}%` as any, backgroundColor: ch.color }]} />
                            </View>
                            <Text style={s.chPct}>
                                {Math.round(ch.progress * 100)}%{ch.daysLeft > 0 ? ` · ${ch.daysLeft} days left` : ' · Ends today'}
                            </Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 60 : 36, paddingBottom: 16 },
    title: { fontSize: 26, fontWeight: '800', color: '#111' },
    sub: { fontSize: 13, color: '#AAA', marginTop: 2 },

    podiumCard: {
        marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 14,
        flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 16,
        borderWidth: 1, borderColor: '#F0F0F0',
    },
    podiumCol: { alignItems: 'center', gap: 6 },
    podiumBar: { width: 60, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    podiumRank: { color: '#fff', fontWeight: '800', fontSize: 16 },
    podiumName: { fontSize: 12, fontWeight: '600', color: '#333' },
    podiumVal: { fontSize: 11, color: '#AAA' },

    tabRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 12 },
    tabPill: { flex: 1, paddingVertical: 9, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center' },
    tabActive: { backgroundColor: C.orange },
    tabText: { fontSize: 12, fontWeight: '700', color: '#AAA' },
    tabTextActive: { color: '#fff' },

    listCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#F0F0F0', marginBottom: 16 },
    row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    rank: { width: 30, fontSize: 14, fontWeight: '800', color: '#CCC', textAlign: 'center' },
    ava: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    pname: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 },
    miniTrack: { height: 4, backgroundColor: '#F0F0F0', borderRadius: 2, overflow: 'hidden' },
    miniFill: { height: 4, borderRadius: 2 },
    pval: { fontSize: 11, fontWeight: '700', color: '#999', marginLeft: 10, width: 72, textAlign: 'right' },

    section: { marginHorizontal: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 12 },
    chCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#F0F0F0' },
    chTitle: { fontSize: 14, fontWeight: '700', color: '#111' },
    chGoal: { fontSize: 12, fontWeight: '700' },
    chTrack: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
    chFill: { height: 6, borderRadius: 3 },
    chPct: { fontSize: 11, color: '#AAA' },
});
