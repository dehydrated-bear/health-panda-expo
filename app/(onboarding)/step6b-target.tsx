import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

export default function Step6Target() {
    const [targetKg, setTargetKg] = useState('');
    const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
    const [focused, setFocused] = useState(false);

    const tNum = parseFloat(targetKg);
    const valid = !isNaN(tNum) && tNum > 20 && tNum < 300;

    return (
        <OnboardingShell
            step={7}
            title="Target weight"
            subtitle="What weight are you aiming for?"
            pandaSpeech={valid
                ? `${targetKg}${unit} — that's a great target! Let's update your plan.`
                : "Enter your goal weight below."}
            onContinue={() => router.push('/(onboarding)/step7-activity')}
            canContinue={valid}
        >
            <View style={s.targetRow}>
                <View style={[s.targetInput, focused && { borderColor: C.orange }]}>
                    <TextInput
                        style={s.targetNum}
                        value={targetKg}
                        onChangeText={setTargetKg}
                        keyboardType="decimal-pad"
                        placeholder={unit === 'kg' ? '65' : '143'}
                        placeholderTextColor="#DDD"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoFocus
                    />
                </View>
                <View style={s.unitToggle}>
                    {(['kg', 'lb'] as const).map((u) => (
                        <TouchableOpacity
                            key={u}
                            style={[s.unitBtn, unit === u && { backgroundColor: C.orange }]}
                            onPress={() => setUnit(u)}
                        >
                            <Text style={[s.unitTxt, unit === u && { color: '#fff' }]}>{u}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={s.infoBox}>
                <Text style={s.infoText}>
                    I'll use this to calculate your daily calorie target and estimated timeline.
                </Text>
            </View>
        </OnboardingShell>
    );
}

const s = StyleSheet.create({
    targetRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 },
    targetInput: { flex: 1, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12, backgroundColor: '#fff' },
    targetNum: { fontSize: 32, fontWeight: '800', color: '#111', paddingVertical: 14, paddingHorizontal: 16 },

    unitToggle: { gap: 6 },
    unitBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#EBEBEB' },
    unitTxt: { fontSize: 14, fontWeight: '700', color: '#777' },

    infoBox: { marginTop: 30, backgroundColor: '#F0F7FF', borderRadius: 12, padding: 16, borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
    infoText: { fontSize: 13, color: '#4B5563', lineHeight: 20 },
});
