import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const GENDERS = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'other', label: 'Other' },
];

export default function Step1Name() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<string | null>(null);
    const [focused, setFocused] = useState(false);
    const valid = name.trim().length >= 2 && gender !== null;

    return (
        <OnboardingShell
            step={1}
            title="What's your name?"
            subtitle="Tell us a bit about yourself"
            pandaSpeech={name.trim().length >= 2
                ? `Great to meet you, ${name.trim()}! Let's build your health plan.`
                : "Hi there! I'm Health Panda. What should I call you?"}
            onContinue={() => router.push('/(onboarding)/step2-dob')}
            canContinue={valid}
        >
            <Text style={s.label}>FULL NAME</Text>
            <TextInput
                style={[s.input, focused && { borderColor: C.orange, backgroundColor: '#fff' }]}
                placeholder="e.g. Alex Johnson"
                placeholderTextColor="#C8C8C8"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoFocus
                maxLength={30}
            />

            <Text style={[s.label, { marginTop: 24 }]}>BIOLOGICAL SEX</Text>
            <View style={s.genderRow}>
                {GENDERS.map((g) => {
                    const active = gender === g.key;
                    return (
                        <TouchableOpacity
                            key={g.key}
                            style={[s.genderCard, active && { borderColor: C.orange, backgroundColor: C.orange + '08' }]}
                            onPress={() => setGender(g.key)}
                        >
                            {/* Coloured top stripe */}
                            <View style={[s.stripe, {
                                backgroundColor: active ? C.orange :
                                    g.key === 'male' ? '#BFDBFE' :
                                        g.key === 'female' ? '#FBCFE8' : '#DDD6FE',
                            }]} />
                            <Text style={[s.genderLabel, active && { color: C.orange, fontWeight: '700' }]}>
                                {g.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </OnboardingShell>
    );
}

const s = StyleSheet.create({
    label: { fontSize: 10, fontWeight: '800', color: '#AAA', letterSpacing: 1.5, marginBottom: 10 },
    input: {
        borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12,
        paddingHorizontal: 16, paddingVertical: 14,
        fontSize: 18, fontWeight: '600', color: '#111', backgroundColor: '#FAFAFA',
    },
    genderRow: { flexDirection: 'row', gap: 12 },
    genderCard: {
        flex: 1, borderWidth: 1.5, borderColor: '#EBEBEB',
        borderRadius: 14, overflow: 'hidden', alignItems: 'center',
        paddingBottom: 16, backgroundColor: '#FAFAFA',
    },
    stripe: { width: '100%', height: 6, marginBottom: 14 },
    genderLabel: { fontSize: 14, fontWeight: '600', color: '#555' },
});
