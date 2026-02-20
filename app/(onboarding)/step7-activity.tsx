import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const LEVELS = [
    { key: 'sedentary', label: 'Sedentary', desc: 'Desk job, little or no exercise', pct: 0.20, color: '#93C5FD' },
    { key: 'light', label: 'Lightly Active', desc: 'Light exercise 1–3 days / week', pct: 0.40, color: '#6EE7B7' },
    { key: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3–5 days / week', pct: 0.60, color: C.yellow },
    { key: 'active', label: 'Very Active', desc: 'Hard training 6–7 days / week', pct: 0.80, color: C.orange },
    { key: 'athlete', label: 'Athlete', desc: 'Twice-daily training or physical job', pct: 1.00, color: C.coral },
];

export default function Step7Activity() {
    const [selected, setSelected] = useState<string | null>(null);
    const activeLevel = LEVELS.find((l) => l.key === selected);

    return (
        <OnboardingShell
            step={7}
            title="Activity level"
            pandaSpeech={activeLevel
                ? `${activeLevel.label} — I'll factor this into your daily targets.`
                : "How active are you on a typical week?"}
            onContinue={() => router.replace('/(tabs)')}
            canContinue={selected !== null}
            continueLabel="Finish Setup"
        >
            <View style={{ gap: 10 }}>
                {LEVELS.map((l) => {
                    const active = selected === l.key;
                    return (
                        <TouchableOpacity
                            key={l.key}
                            style={[s.card, active && { borderColor: l.color, backgroundColor: l.color + '0A' }]}
                            onPress={() => setSelected(l.key)}
                            activeOpacity={0.85}
                        >
                            {/* Activity bar */}
                            <View style={s.barTrack}>
                                <View style={[s.barFill, { height: `${l.pct * 100}%` as any, backgroundColor: l.color + (active ? 'FF' : '80') }]} />
                            </View>

                            <View style={{ flex: 1, paddingHorizontal: 14 }}>
                                <Text style={[s.name, active && { color: l.color }]}>{l.label}</Text>
                                <Text style={s.desc}>{l.desc}</Text>
                            </View>

                            <View style={[s.radio, active && { backgroundColor: l.color, borderColor: l.color }]}>
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
        borderRadius: 14, padding: 14, backgroundColor: '#fff', overflow: 'hidden',
    },
    barTrack: { width: 8, height: 44, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-end' },
    barFill: { width: '100%', borderRadius: 4 },
    name: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 2 },
    desc: { fontSize: 12, color: '#999' },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
    radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },
});
