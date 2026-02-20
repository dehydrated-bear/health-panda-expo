/**
 * OnboardingShell — shared layout wrapper
 * Panda with speech bubble at the top, clean progress bar
 */
import React from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Platform, KeyboardAvoidingView,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';

const TOTAL_STEPS = 7;

interface Props {
    step: number;
    title: string;
    subtitle?: string;
    pandaSpeech: string;           // text shown in speech bubble
    onContinue: () => void;
    canContinue?: boolean;
    continueLabel?: string;
    children: React.ReactNode;
}

export const OnboardingShell: React.FC<Props> = ({
    step, title, subtitle, pandaSpeech,
    onContinue, canContinue = true,
    continueLabel = 'Continue', children,
}) => {
    const isFirst = step === 1;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* ── Header ── */}
            <View style={s.header}>
                <TouchableOpacity
                    style={s.backBtn}
                    onPress={() => isFirst ? router.replace('/(auth)/sign-in') : router.back()}
                >
                    <Text style={s.backArrow}>←</Text>
                </TouchableOpacity>
                <View style={s.progress}>
                    <Text style={s.stepLabel}>{step} / {TOTAL_STEPS}</Text>
                    <View style={s.track}>
                        <View style={[s.fill, { width: `${(step / TOTAL_STEPS) * 100}%` as any }]} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                    <Text style={s.skip}>Skip</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={s.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ── Panda + speech bubble ── */}
                <View style={s.pandaRow}>
                    {/* Panda */}
                    <View style={s.pandaWrap}>
                        <View style={s.pandaBg} />
                        <Image
                            source={require('@/assets/images/image.png')}
                            style={s.pandaImg}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Speech bubble */}
                    <View style={s.bubble}>
                        <Text style={s.bubbleText}>{pandaSpeech}</Text>
                        {/* Tail */}
                        <View style={s.bubbleTail} />
                    </View>
                </View>

                {/* ── Title ── */}
                <Text style={s.title}>{title}</Text>
                {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}

                {/* ── Content ── */}
                <View style={s.content}>{children}</View>

                <View style={{ height: 16 }} />
            </ScrollView>

            {/* ── CTA ── */}
            <View style={s.footer}>
                <TouchableOpacity
                    style={[s.btn, !canContinue && s.btnDisabled]}
                    onPress={canContinue ? onContinue : undefined}
                    activeOpacity={canContinue ? 0.88 : 1}
                >
                    <Text style={[s.btnText, !canContinue && s.btnTextDisabled]}>
                        {continueLabel}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const s = StyleSheet.create({
    header: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 56 : 24,
        paddingBottom: 14,
        borderBottomWidth: 1, borderBottomColor: '#F2F2F2',
    },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    backArrow: { fontSize: 18, color: '#333', marginTop: -1 },
    progress: { flex: 1, gap: 5 },
    stepLabel: { fontSize: 10, fontWeight: '700', color: '#BBB', letterSpacing: 0.5 },
    track: { height: 4, backgroundColor: '#F0F0F0', borderRadius: 2, overflow: 'hidden' },
    fill: { height: 4, backgroundColor: C.orange, borderRadius: 2 },
    skip: { fontSize: 13, color: '#BBB', fontWeight: '600' },

    scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 20 },

    // Panda + bubble row
    pandaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 14 },
    pandaWrap: { position: 'relative', width: 80, height: 80 },
    pandaBg: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F7FF' },
    pandaImg: { width: 80, height: 80 },

    bubble: {
        flex: 1, backgroundColor: '#F7F7F7',
        borderRadius: 14, padding: 12,
        position: 'relative',
        borderWidth: 1, borderColor: '#ECECEC',
    },
    bubbleText: { fontSize: 13, color: '#555', lineHeight: 19 },
    bubbleTail: {
        position: 'absolute', left: -8, top: 18,
        width: 0, height: 0,
        borderTopWidth: 8, borderTopColor: 'transparent',
        borderBottomWidth: 8, borderBottomColor: 'transparent',
        borderRightWidth: 8, borderRightColor: '#F7F7F7',
    },

    title: { fontSize: 24, fontWeight: '800', color: '#111', lineHeight: 32, marginBottom: 6 },
    subtitle: { fontSize: 14, color: '#888', lineHeight: 21, marginBottom: 4 },
    content: { marginTop: 20 },

    footer: {
        paddingHorizontal: 24,
        paddingBottom: Platform.OS === 'ios' ? 36 : 24,
        paddingTop: 14,
        borderTopWidth: 1, borderTopColor: '#F2F2F2',
    },
    btn: { backgroundColor: C.orange, borderRadius: 14, paddingVertical: 16, alignItems: 'center', shadowColor: C.orange, shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
    btnDisabled: { backgroundColor: '#F0F0F0', shadowOpacity: 0, elevation: 0 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    btnTextDisabled: { color: '#C0C0C0' },
});
