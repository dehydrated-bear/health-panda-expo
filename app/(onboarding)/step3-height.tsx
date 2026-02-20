import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    TextInput, Dimensions,
} from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { OnboardingShell } from '@/components/OnboardingShell';

const { height: SH } = Dimensions.get('window');
const RULER_H = 220;

// ── Animated ruler on the left ────────────────────────────────────────────────
const Ruler: React.FC<{ percent: number }> = ({ percent }) => {
    const fillH = useSharedValue(0);

    useEffect(() => {
        fillH.value = withTiming(
            Math.min(Math.max(percent, 0), 1) * RULER_H,
            { duration: 600, easing: Easing.out(Easing.cubic) },
        );
    }, [percent]);

    const fillStyle = useAnimatedStyle(() => ({ height: fillH.value }));
    const tickStyle = useAnimatedStyle(() => ({
        bottom: fillH.value - 8,
    }));

    const TICKS = [3, 4, 5, 6, 7]; // feet markers
    return (
        <View style={ruler.wrap}>
            {/* Background track */}
            <View style={ruler.track}>
                {/* Filled portion */}
                <Animated.View style={[ruler.fill, fillStyle]} />

                {/* Tick marks */}
                {TICKS.map((ft) => {
                    const pos = ((ft - 3) / 4) * RULER_H;
                    return (
                        <View key={ft} style={[ruler.tick, { bottom: pos }]}>
                            <View style={ruler.tickLine} />
                            <Text style={ruler.tickLabel}>{ft}'</Text>
                        </View>
                    );
                })}

                {/* Moving indicator arrow */}
                {percent > 0 && (
                    <Animated.View style={[ruler.arrow, tickStyle]}>
                        <View style={ruler.arrowHead} />
                    </Animated.View>
                )}
            </View>
            <Text style={ruler.rulerLabel}>Height</Text>
        </View>
    );
};

const ruler = StyleSheet.create({
    wrap: { width: 52, alignItems: 'center', marginRight: 20 },
    track: { width: 28, height: RULER_H, backgroundColor: '#F0F0F0', borderRadius: 14, overflow: 'visible', position: 'relative', justifyContent: 'flex-end' },
    fill: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: C.orange + 'CC', borderRadius: 14 },
    tick: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center' },
    tickLine: { width: 10, height: 1.5, backgroundColor: '#BBB', marginLeft: 24 },
    tickLabel: { fontSize: 9, color: '#AAA', fontWeight: '600', marginLeft: 3 },
    arrow: { position: 'absolute', right: -18, width: 16, height: 16 },
    arrowHead: { width: 10, height: 10, backgroundColor: C.orange, borderRadius: 5 },
    rulerLabel: { fontSize: 10, color: '#AAA', fontWeight: '700', marginTop: 8, letterSpacing: 0.5 },
});

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Step3Height() {
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [focusedF, setFocusedF] = useState(false);
    const [focusedI, setFocusedI] = useState(false);

    const ft = parseInt(feet, 10) || 0;
    const inc = parseInt(inches, 10) || 0;

    const totalInches = ft * 12 + inc;
    // Valid range: 3'0" (36") — 7'2" (86")
    const valid = totalInches >= 36 && totalInches <= 86 && feet !== '';
    // Percent for ruler: map 36"–86" → 0–1
    const percent = valid ? (totalInches - 36) / 50 : 0;

    const heightLabel = valid ? `${ft}' ${inc}"` : '—';
    const cmLabel = valid ? `${Math.round(totalInches * 2.54)} cm` : '';

    return (
        <OnboardingShell
            step={3}
            title="Your height"
            pandaSpeech={valid
                ? `${heightLabel} (${cmLabel}) — got it!`
                : "Enter your height in feet and inches."}
            onContinue={() => router.push('/(onboarding)/step4-weight')}
            canContinue={valid}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Animated ruler */}
                <Ruler percent={percent} />

                {/* Inputs */}
                <View style={{ flex: 1, gap: 16 }}>
                    {/* Display */}
                    <View style={inp.displayBox}>
                        <Text style={inp.displayText}>{valid ? heightLabel : "—"}</Text>
                        {cmLabel ? <Text style={inp.cmText}>{cmLabel}</Text> : null}
                    </View>

                    {/* Feet */}
                    <View style={inp.row}>
                        <TextInput
                            style={[inp.box, focusedF && { borderColor: C.orange, backgroundColor: '#fff' }]}
                            value={feet}
                            onChangeText={(v) => setFeet(v.replace(/[^0-9]/g, '').slice(0, 1))}
                            keyboardType="number-pad"
                            placeholder="5"
                            placeholderTextColor="#CCC"
                            onFocus={() => setFocusedF(true)}
                            onBlur={() => setFocusedF(false)}
                            maxLength={1}
                            autoFocus
                        />
                        <Text style={inp.unitLabel}>ft</Text>
                    </View>

                    {/* Inches */}
                    <View style={inp.row}>
                        <TextInput
                            style={[inp.box, focusedI && { borderColor: C.orange, backgroundColor: '#fff' }]}
                            value={inches}
                            onChangeText={(v) => {
                                const n = parseInt(v.replace(/[^0-9]/g, ''), 10);
                                if (!isNaN(n) && n <= 11) setInches(String(n));
                                else if (v === '') setInches('');
                            }}
                            keyboardType="number-pad"
                            placeholder="7"
                            placeholderTextColor="#CCC"
                            onFocus={() => setFocusedI(true)}
                            onBlur={() => setFocusedI(false)}
                            maxLength={2}
                        />
                        <Text style={inp.unitLabel}>in</Text>
                    </View>
                </View>
            </View>
        </OnboardingShell>
    );
}

const inp = StyleSheet.create({
    displayBox: {
        backgroundColor: '#F8F8F8', borderRadius: 14,
        paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center',
        borderWidth: 1, borderColor: '#EBEBEB',
    },
    displayText: { fontSize: 36, fontWeight: '800', color: '#111' },
    cmText: { fontSize: 14, color: '#999', marginTop: 2 },

    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    box: {
        flex: 1, borderWidth: 1.5, borderColor: '#EBEBEB',
        borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16,
        fontSize: 24, fontWeight: '700', color: '#111',
        backgroundColor: '#FAFAFA', textAlign: 'center',
    },
    unitLabel: { fontSize: 16, fontWeight: '700', color: '#AAA', width: 28 },
});
