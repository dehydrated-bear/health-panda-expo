import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 85 }, (_, i) => currentYear - 13 - i);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const Col: React.FC<{
    label: string; items: (string | number)[];
    selected: string | number; onSelect: (v: any) => void;
    format?: (v: any) => string; flex?: number;
}> = ({ label, items, selected, onSelect, format, flex = 1 }) => (
    <View style={{ flex }}>
        <Text style={col.label}>{label}</Text>
        <ScrollView style={col.box} showsVerticalScrollIndicator={false} nestedScrollEnabled>
            {items.map((item) => {
                const active = item === selected;
                return (
                    <TouchableOpacity
                        key={String(item)}
                        style={[col.row, active && col.rowActive]}
                        onPress={() => onSelect(item)}
                    >
                        <Text style={[col.text, active && col.textActive]}>
                            {format ? format(item) : String(item)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    </View>
);
const col = StyleSheet.create({
    label: { fontSize: 10, fontWeight: '800', color: '#AAA', letterSpacing: 1.2, marginBottom: 8, textAlign: 'center' },
    box: { maxHeight: 220, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12, backgroundColor: '#FAFAFA' },
    row: { paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' },
    rowActive: { backgroundColor: C.orange + '14' },
    text: { fontSize: 14, color: '#999', fontWeight: '500' },
    textActive: { fontSize: 15, color: C.orange, fontWeight: '800' },
});

export default function Step2DOB() {
    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(MONTHS[today.getMonth()]);
    const [year, setYear] = useState(today.getFullYear() - 25);

    const monthIdx = MONTHS.indexOf(month);
    const age = Math.floor((today.getTime() - new Date(year, monthIdx, day).getTime()) / (365.25 * 24 * 3600 * 1000));
    const valid = age >= 13 && age <= 100;

    return (
        <OnboardingShell
            step={2}
            title="Date of birth"
            pandaSpeech={valid
                ? `${age} years old — perfect, I'll use this to calibrate your plan!`
                : "Scroll to pick your birthday below."}
            onContinue={() => router.push('/(onboarding)/step3-height')}
            canContinue={valid}
        >
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Col label="DAY" items={DAYS} selected={day} onSelect={setDay} format={(d) => String(d).padStart(2, '0')} flex={0.7} />
                <Col label="MONTH" items={MONTHS} selected={month} onSelect={setMonth} flex={1.6} />
                <Col label="YEAR" items={YEARS} selected={year} onSelect={setYear} flex={1} />
            </View>

            {valid && (
                <View style={chip.wrap}>
                    <Text style={chip.text}>{age} years old</Text>
                </View>
            )}
        </OnboardingShell>
    );
}

const chip = StyleSheet.create({
    wrap: { marginTop: 18, backgroundColor: C.sky + '18', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'center', borderWidth: 1, borderColor: C.sky + '40' },
    text: { fontSize: 15, fontWeight: '700', color: '#0284C7' },
});
