/**
 * Health Panda – Exercise Tab
 * Showcases 15 real calisthenics exercises with images, instructions,
 * muscle-group filter chips, and an expandable detail view.
 */
import React, { useState, useRef } from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity,
    Image, Platform, Modal, Pressable, FlatList, Animated,
    Dimensions,
} from 'react-native';
import { PandaColors as C } from '@/constants/theme';
import {
    CALISTHENICS,
    MUSCLE_FILTER_LABELS,
    CalisthenicsExercise,
} from '@/constants/calisthenicsData';

const { width: SW } = Dimensions.get('window');

const LEVEL_COLOR: Record<string, string> = {
    beginner: '#10B981',
    intermediate: '#FFA239',
    advanced: '#FF5656',
};

const WEEKLY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DONE = [true, true, false, true, false, false, false];
const today = new Date().getDay();   // 0 = Sun

/* ─── Exercise Card ─────────────────────────────────────────────────── */
function ExerciseCard({
    exercise,
    onPress,
}: {
    exercise: CalisthenicsExercise;
    onPress: () => void;
}) {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () =>
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, friction: 6 }).start();
    const onPressOut = () =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();

    return (
        <Animated.View style={[s.card, { transform: [{ scale }] }]}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={1}
            >
                {/* Exercise image */}
                <View style={s.cardImgWrap}>
                    <Image
                        source={exercise.images[0]}
                        style={s.cardImg}
                        resizeMode="cover"
                    />
                    {/* Level badge */}
                    <View style={[s.levelBadge, { backgroundColor: LEVEL_COLOR[exercise.level] }]}>
                        <Text style={s.levelBadgeText}>{exercise.level}</Text>
                    </View>
                    {/* Calories pill */}
                    <View style={s.calPill}>
                        <Text style={s.calPillText}>🔥 {exercise.calories} kcal</Text>
                    </View>
                </View>

                {/* Info */}
                <View style={s.cardBody}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={{ fontSize: 20 }}>{exercise.muscleEmoji}</Text>
                        <Text style={s.cardName}>{exercise.name}</Text>
                    </View>
                    <Text style={s.cardMuscles}>
                        {exercise.primaryMuscles.join(', ')}
                        {exercise.secondaryMuscles.length > 0
                            ? `  ·  ${exercise.secondaryMuscles.slice(0, 2).join(', ')}`
                            : ''}
                    </Text>

                    {/* Sets / Reps row */}
                    <View style={s.cardStats}>
                        <View style={[s.statChip, { backgroundColor: exercise.accentColor + '18' }]}>
                            <Text style={[s.statLabel, { color: exercise.accentColor }]}>
                                {exercise.sets} sets
                            </Text>
                        </View>
                        <View style={[s.statChip, { backgroundColor: exercise.accentColor + '18' }]}>
                            <Text style={[s.statLabel, { color: exercise.accentColor }]}>
                                {exercise.reps} reps
                            </Text>
                        </View>
                        <View style={[s.statChip, { backgroundColor: '#F0F0F0' }]}>
                            <Text style={[s.statLabel, { color: '#777' }]}>
                                {exercise.category}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

/* ─── Detail Modal ──────────────────────────────────────────────────── */
function ExerciseModal({
    exercise,
    visible,
    onClose,
}: {
    exercise: CalisthenicsExercise | null;
    visible: boolean;
    onClose: () => void;
}) {
    const [imgIdx, setImgIdx] = useState(0);

    if (!exercise) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={m.root}>
                {/* Close button */}
                <Pressable style={m.closeBtn} onPress={onClose}>
                    <Text style={m.closeBtnText}>✕</Text>
                </Pressable>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Image switcher */}
                    <View style={m.imgWrap}>
                        <Image
                            source={exercise.images[imgIdx]}
                            style={m.img}
                            resizeMode="cover"
                        />
                        {/* Toggle strip */}
                        <View style={m.imgToggleRow}>
                            {['Start', 'End'].map((label, i) => (
                                <TouchableOpacity
                                    key={label}
                                    style={[m.imgToggleBtn, imgIdx === i && { backgroundColor: exercise.accentColor }]}
                                    onPress={() => setImgIdx(i)}
                                >
                                    <Text style={[m.imgToggleTxt, imgIdx === i && { color: '#fff' }]}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Title + badges */}
                    <View style={m.header}>
                        <Text style={m.title}>{exercise.muscleEmoji} {exercise.name}</Text>
                        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                            <View style={[m.badge, { backgroundColor: LEVEL_COLOR[exercise.level] + '20' }]}>
                                <Text style={[m.badgeText, { color: LEVEL_COLOR[exercise.level] }]}>{exercise.level}</Text>
                            </View>
                            <View style={[m.badge, { backgroundColor: exercise.accentColor + '20' }]}>
                                <Text style={[m.badgeText, { color: exercise.accentColor }]}>{exercise.category}</Text>
                            </View>
                            <View style={[m.badge, { backgroundColor: '#F0F0F0' }]}>
                                <Text style={[m.badgeText, { color: '#555' }]}>{exercise.equipment}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats row */}
                    <View style={m.statsRow}>
                        {[
                            { label: 'Sets', value: String(exercise.sets) },
                            { label: 'Reps', value: exercise.reps },
                            { label: 'Calories', value: `${exercise.calories} kcal` },
                        ].map((stat) => (
                            <View key={stat.label} style={[m.statBox, { borderColor: exercise.accentColor + '40' }]}>
                                <Text style={[m.statVal, { color: exercise.accentColor }]}>{stat.value}</Text>
                                <Text style={m.statLbl}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Muscles */}
                    <View style={m.section}>
                        <Text style={m.sectionTitle}>Muscles Worked</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                            {exercise.primaryMuscles.map((mg) => (
                                <View key={mg} style={[m.muscleChip, { backgroundColor: exercise.accentColor }]}>
                                    <Text style={m.muscleChipText}>{mg}</Text>
                                </View>
                            ))}
                            {exercise.secondaryMuscles.map((mg) => (
                                <View key={mg} style={[m.muscleChip, { backgroundColor: '#EEE' }]}>
                                    <Text style={[m.muscleChipText, { color: '#555' }]}>{mg}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={m.section}>
                        <Text style={m.sectionTitle}>How To Do It</Text>
                        {exercise.instructions.map((step, i) => (
                            <View key={i} style={m.step}>
                                <View style={[m.stepNum, { backgroundColor: exercise.accentColor }]}>
                                    <Text style={m.stepNumText}>{i + 1}</Text>
                                </View>
                                <Text style={m.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>

                    {/* CTA */}
                    <TouchableOpacity
                        style={[m.startBtn, { backgroundColor: exercise.accentColor }]}
                        onPress={onClose}
                    >
                        <Text style={m.startBtnText}>Add to Today's Workout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
}

/* ─── Main Screen ───────────────────────────────────────────────────── */
export default function ExerciseScreen() {
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const [selectedEx, setSelectedEx] = useState<CalisthenicsExercise | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const filterKeys = Object.keys(MUSCLE_FILTER_LABELS);

    const filtered = activeFilter === 'All'
        ? CALISTHENICS
        : CALISTHENICS.filter((ex) =>
            MUSCLE_FILTER_LABELS[activeFilter].some(
                (m) =>
                    ex.primaryMuscles.includes(m) ||
                    ex.secondaryMuscles.includes(m),
            ),
        );

    const openDetail = (ex: CalisthenicsExercise) => {
        setSelectedEx(ex);
        setModalVisible(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
            {/* ─── Header ─── */}
            <View style={s.header}>
                <View>
                    <Text style={s.title}>Exercises</Text>
                    <Text style={s.subtitle}>15 calisthenics moves</Text>
                </View>
            </View>

            {/* ─── Weekly streak strip ─── */}
            <View style={s.weekCard}>
                <Text style={s.weekTitle}>This week</Text>
                <View style={s.weekRow}>
                    {WEEKLY.map((day, i) => {
                        const isToday = (today === 0 ? 6 : today - 1) === i;
                        const done = DONE[i];
                        return (
                            <View key={day} style={s.dayCol}>
                                <Text style={[s.dayLabel, isToday && { color: C.orange }]}>{day}</Text>
                                <View
                                    style={[
                                        s.dayDot,
                                        done && { backgroundColor: C.orange },
                                        isToday && { borderColor: C.orange, borderWidth: 2 },
                                    ]}
                                >
                                    {done && <Text style={{ fontSize: 10, color: '#fff' }}>✓</Text>}
                                </View>
                            </View>
                        );
                    })}
                </View>
                <Text style={s.weekSub}>3 / 7 workout days completed</Text>
            </View>

            {/* ─── Filter chips ─── */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.filterRow}
            >
                {filterKeys.map((key) => (
                    <TouchableOpacity
                        key={key}
                        style={[
                            s.filterChip,
                            activeFilter === key && { backgroundColor: C.orange, borderColor: C.orange },
                        ]}
                        onPress={() => setActiveFilter(key)}
                    >
                        <Text
                            style={[
                                s.filterChipText,
                                activeFilter === key && { color: '#fff' },
                            ]}
                        >
                            {key}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ─── Exercise count ─── */}
            <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
                <Text style={s.countText}>
                    {filtered.length} exercise{filtered.length !== 1 ? 's' : ''}
                </Text>
            </View>

            {/* ─── Exercise grid ─── */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ paddingHorizontal: 12, gap: 12 }}
                contentContainerStyle={{ paddingBottom: 110, paddingTop: 4 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <ExerciseCard exercise={item} onPress={() => openDetail(item)} />
                    </View>
                )}
            />

            {/* ─── Detail Modal ─── */}
            <ExerciseModal
                exercise={selectedEx}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

/* ─── Styles ─────────────────────────────────────────────────────────── */
const CARD_IMG_H = 130;

const s = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 36,
        paddingBottom: 12,
    },
    title: { fontSize: 28, fontWeight: '800', color: '#111' },
    subtitle: { fontSize: 13, color: '#AAA', marginTop: 2 },

    weekCard: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    weekTitle: { fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 12 },
    weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
    dayCol: { alignItems: 'center', gap: 6 },
    dayLabel: { fontSize: 10, color: '#AAA', fontWeight: '600' },
    dayDot: {
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center', alignItems: 'center',
    },
    weekSub: { fontSize: 11, color: '#AAA', marginTop: 10, textAlign: 'center' },

    filterRow: { paddingHorizontal: 14, paddingBottom: 12, gap: 8 },
    filterChip: {
        paddingHorizontal: 14, paddingVertical: 7,
        borderRadius: 20, borderWidth: 1.5, borderColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    filterChipText: { fontSize: 13, fontWeight: '600', color: '#555' },

    countText: { fontSize: 12, color: '#AAA', fontWeight: '600', marginBottom: 4 },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        marginBottom: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    cardImgWrap: {
        height: CARD_IMG_H,
        backgroundColor: '#EEE',
        position: 'relative',
    },
    cardImg: { width: '100%', height: CARD_IMG_H },
    levelBadge: {
        position: 'absolute', top: 8, left: 8,
        paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 8,
    },
    levelBadgeText: { fontSize: 9, fontWeight: '700', color: '#fff', textTransform: 'capitalize' },
    calPill: {
        position: 'absolute', bottom: 8, right: 8,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
    },
    calPillText: { fontSize: 10, color: '#fff', fontWeight: '600' },

    cardBody: { padding: 10 },
    cardName: { fontSize: 13, fontWeight: '800', color: '#111', flex: 1, flexWrap: 'wrap' },
    cardMuscles: { fontSize: 10, color: '#AAA', marginTop: 3, marginBottom: 8 },
    cardStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    statChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    statLabel: { fontSize: 10, fontWeight: '700' },
});

/* ─── Modal Styles ───────────────────────────────────────────────────── */
const m = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F8F9FB' },
    closeBtn: {
        position: 'absolute', top: Platform.OS === 'ios' ? 16 : 12,
        right: 16, zIndex: 99,
        backgroundColor: '#fff', width: 36, height: 36,
        borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 }, elevation: 4,
    },
    closeBtnText: { fontSize: 14, fontWeight: '700', color: '#333' },

    imgWrap: { width: '100%', height: 280, backgroundColor: '#EEE' },
    img: { width: '100%', height: 280 },
    imgToggleRow: {
        position: 'absolute', bottom: 12,
        flexDirection: 'row', gap: 8,
        alignSelf: 'center',
    },
    imgToggleBtn: {
        paddingHorizontal: 18, paddingVertical: 7,
        borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.45)',
    },
    imgToggleTxt: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },

    header: { paddingHorizontal: 20, paddingTop: 18 },
    title: { fontSize: 24, fontWeight: '800', color: '#111' },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },

    statsRow: {
        flexDirection: 'row', marginHorizontal: 20, marginTop: 18,
        gap: 12,
    },
    statBox: {
        flex: 1, backgroundColor: '#fff', borderRadius: 14,
        paddingVertical: 14, alignItems: 'center',
        borderWidth: 1.5,
        shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 }, elevation: 2,
    },
    statVal: { fontSize: 16, fontWeight: '800' },
    statLbl: { fontSize: 11, color: '#AAA', marginTop: 2, fontWeight: '600' },

    section: { marginHorizontal: 20, marginTop: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111' },

    muscleChip: {
        paddingHorizontal: 12, paddingVertical: 5,
        borderRadius: 20,
    },
    muscleChipText: { fontSize: 12, fontWeight: '700', color: '#fff' },

    step: {
        flexDirection: 'row', gap: 12, marginTop: 14, alignItems: 'flex-start',
    },
    stepNum: {
        width: 26, height: 26, borderRadius: 13,
        justifyContent: 'center', alignItems: 'center',
        flexShrink: 0, marginTop: 1,
    },
    stepNumText: { fontSize: 12, fontWeight: '800', color: '#fff' },
    stepText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 21 },

    startBtn: {
        marginHorizontal: 20, marginTop: 28,
        borderRadius: 16, paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 }, elevation: 5,
    },
    startBtnText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
