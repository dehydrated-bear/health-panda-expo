import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

export default function Step4Weight() {
    const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);

    const num = parseFloat(value);
    const valid = unit === 'kg' ? (num >= 30 && num <= 250) : (num >= 66 && num <= 550);

    const kgValue = unit === 'kg' ? num : num * 0.4536;
    const lbValue = unit === 'lb' ? num : num * 2.2046;
    const altUnit = unit === 'kg'
        ? (valid ? `${Math.round(lbValue * 10) / 10} lb` : '')
        : (valid ? `${Math.round(kgValue * 10) / 10} kg` : '');

    return (
        <OnboardingShell
            step={4}
            title="Your weight"
            pandaSpeech={valid
                ? `${value} ${unit}${altUnit ? ` · ${altUnit}` : ''} — logged!`
                : "Enter your current weight."}
            onContinue={() => router.push('/(onboarding)/step5-bodytype')}
            canContinue={valid}
        >
            {/* Unit toggle */}
            <View style={s.toggle}>
                {(['kg', 'lb'] as const).map((u) => (
                    <TouchableOpacity
                        key={u}
                        style={[s.toggleBtn, unit === u && s.toggleActive]}
                        onPress={() => { setUnit(u); setValue(''); }}
                    >
                        <Text style={[s.toggleText, unit === u && s.toggleTextActive]}>{u}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Display */}
            <View style={[s.displayBox, focused && { borderColor: C.orange }]}>
                <TextInput
                    style={s.displayInput}
                    value={value}
                    onChangeText={setValue}
                    keyboardType="decimal-pad"
                    placeholder={unit === 'kg' ? '70' : '154'}
                    placeholderTextColor="#DDD"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoFocus
                />
                <Text style={s.unitText}>{unit}</Text>
            </View>

            {/* Converted value */}
            {valid && (
                <Text style={s.converted}>≈ {altUnit}</Text>
            )}

            {/* Weight category bar */}
            <View style={s.catBar}>
                {[
                    { label: 'Light', color: '#93C5FD', end: unit === 'kg' ? 50 : 110 },
                    { label: 'Normal', color: '#6EE7B7', end: unit === 'kg' ? 80 : 176 },
                    { label: 'Heavy', color: C.orange, end: unit === 'kg' ? 110 : 242 },
                    { label: 'Very Heavy', color: C.coral, end: Infinity },
                ].map((cat, idx, arr) => {
                    const prev = idx === 0 ? 0 : arr[idx - 1].end;
                    const inRange = valid && num > (prev as number) && num <= cat.end;
                    return (
                        <View key={cat.label} style={[s.catSeg, { backgroundColor: cat.color + (inRange ? 'FF' : '50'), flex: 1 }]}>
                            <Text style={[s.catLabel, inRange && { color: '#fff', fontWeight: '700' }]}>{cat.label}</Text>
                        </View>
                    );
                })}
            </View>
        </OnboardingShell>
    );
}

const s = StyleSheet.create({
    toggle: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 4, alignSelf: 'center', marginBottom: 24 },
    toggleBtn: { paddingVertical: 8, paddingHorizontal: 30, borderRadius: 8 },
    toggleActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
    toggleText: { fontSize: 15, fontWeight: '600', color: '#AAA' },
    toggleTextActive: { color: C.orange, fontWeight: '700' },

    displayBox: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 16,
        backgroundColor: '#FAFAFA', paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12,
    },
    displayInput: { fontSize: 48, fontWeight: '800', color: '#111', minWidth: 100, textAlign: 'center' },
    unitText: { fontSize: 20, fontWeight: '700', color: '#AAA', marginLeft: 8, marginTop: 8 },
    converted: { textAlign: 'center', fontSize: 14, color: '#999', marginBottom: 24 },

    catBar: { flexDirection: 'row', gap: 4, borderRadius: 8, overflow: 'hidden' },
    catSeg: { paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
    catLabel: { fontSize: 10, fontWeight: '600', color: '#555' },
});
