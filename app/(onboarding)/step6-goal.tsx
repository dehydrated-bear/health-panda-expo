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

    const valid = selected !== null;
    const activeGoal = GOALS.find((g) => g.key === selected);

    const onContinue = () => {
        if (selected === 'lose' || selected === 'gain') {
            router.push('/(onboarding)/step6b-target');
        } else {
            router.push('/(onboarding)/step7-activity');
        }
    };

    return (
        <OnboardingShell
            step={6}
            title="Your goal"
            pandaSpeech={activeGoal
                ? `${activeGoal.label} — great choice. Let's make it happen.`
                : "What are you working towards?"}
            onContinue={onContinue}
            canContinue={valid}
        >
            <View style={{ gap: 10 }}>
                {GOALS.map((g) => {
                    const active = selected === g.key;
                    return (
                        <TouchableOpacity
                            key={g.key}
                            style={[s.card, active && { borderColor: g.color, backgroundColor: g.color + '08' }]}
                            onPress={() => setSelected(g.key)}
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
});
