import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const GOALS = [
    { key: 'lose', label: 'Lose Weight', color: C.coral, desc: 'Calorie deficit plan' },
    { key: 'maintain', label: 'Maintain Weight', color: '#3B82F6', desc: 'Maintenance calories' },
    { key: 'gain', label: 'Build Muscle', color: C.orange, desc: 'Calorie surplus + strength' },
    { key: 'health', label: 'Improve Health', color: '#10B981', desc: 'Energy, sleep & wellness' },
    { key: 'sport', label: 'Athletic Performance', color: '#8B5CF6', desc: 'Fuel & recovery focused' },
];

export default function Step6Goal() {
    const [selected, setSelected] = useState<string | null>(null);
    const [targetKg, setTargetKg] = useState('');
    const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
    const [focusedT, setFocusedT] = useState(false);

    const showTarget = selected === 'lose' || selected === 'gain';
    const tNum = parseFloat(targetKg);
    const targetValid = !showTarget || (tNum > 20 && tNum < 300);
    const valid = selected !== null && targetValid;

    const activeGoal = GOALS.find((g) => g.key === selected);

    return (
        <OnboardingShell
            step={6}
            title="Your goal"
            pandaSpeech={activeGoal
                ? `${activeGoal.label} — great choice. Let's make it happen.`
                : "What are you working towards?"}
            onContinue={() => router.push('/(onboarding)/step7-activity')}
            canContinue={valid}
        >
            <View style={{ gap: 10 }}>
                {GOALS.map((g) => {
                    const active = selected === g.key;
                    return (
                        <TouchableOpacity
                            key={g.key}
                            style={[s.card, active && { borderColor: g.color, backgroundColor: g.color + '08' }]}
                            onPress={() => { setSelected(g.key); setTargetKg(''); }}
                            activeOpacity={0.85}
                        >
                            <View style={[s.colorBar, { backgroundColor: active ? g.color : '#E8E8E8', width: active ? 4 : 3 }]} />
                            <View style={{ flex: 1, paddingLeft: 14 }}>
                                <Text style={[s.label, active && { color: g.color }]}>{g.label}</Text>
                                <Text style={s.desc}>{g.desc}</Text>
                            </View>
                            <View style={[s.radio, active && { backgroundColor: g.color, borderColor: g.color }]}>
                                {active && <View style={s.radioDot} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Target weight (only for lose/gain) */}
            {showTarget && (
                <View style={s.targetSection}>
                    <Text style={s.targetTitle}>
                        Target weight
                    </Text>
                    <Text style={s.targetSub}>What weight are you aiming for?</Text>

                    <View style={s.targetRow}>
                        <View style={[s.targetInput, focusedT && { borderColor: activeGoal?.color }]}>
                            <TextInput
                                style={s.targetNum}
                                value={targetKg}
                                onChangeText={setTargetKg}
                                keyboardType="decimal-pad"
                                placeholder={unit === 'kg' ? '65' : '143'}
                                placeholderTextColor="#DDD"
                                onFocus={() => setFocusedT(true)}
                                onBlur={() => setFocusedT(false)}
                                autoFocus
                            />
                        </View>
                        <View style={s.unitToggle}>
                            {(['kg', 'lb'] as const).map((u) => (
                                <TouchableOpacity
                                    key={u}
                                    style={[s.unitBtn, unit === u && { backgroundColor: activeGoal?.color || C.orange }]}
                                    onPress={() => setUnit(u)}
                                >
                                    <Text style={[s.unitTxt, unit === u && { color: '#fff' }]}>{u}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            )}
        </OnboardingShell>
    );
}

const s = StyleSheet.create({
    card: {
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1.5, borderColor: '#EBEBEB',
        borderRadius: 14, paddingVertical: 14, paddingRight: 14, backgroundColor: '#fff',
        overflow: 'hidden',
    },
    colorBar: { width: 3, alignSelf: 'stretch', borderRadius: 2 },
    label: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 2 },
    desc: { fontSize: 12, color: '#999' },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
    radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },

    targetSection: { marginTop: 20, backgroundColor: '#FAFAFA', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#EBEBEB' },
    targetTitle: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 3 },
    targetSub: { fontSize: 12, color: '#999', marginBottom: 14 },

    targetRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    targetInput: { flex: 1, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12, backgroundColor: '#fff' },
    targetNum: { fontSize: 28, fontWeight: '800', color: '#111', paddingVertical: 12, paddingHorizontal: 16 },

    unitToggle: { gap: 6 },
    unitBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#EBEBEB' },
    unitTxt: { fontSize: 13, fontWeight: '700', color: '#777' },
});
