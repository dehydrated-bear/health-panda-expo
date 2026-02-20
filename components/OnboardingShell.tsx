/**
 * OnboardingShell — robust shared wrapper for all onboarding steps
 */
import React from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Platform, SafeAreaView,
    Image, StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';

const TOTAL_STEPS = 8;

interface Props {
    step: number;
    title: string;
    subtitle?: string;
    pandaSpeech?: string;
    onContinue: () => void;
    canContinue?: boolean;
    continueLabel?: string;
    children: React.ReactNode;
}

export const OnboardingShell: React.FC<Props> = ({
    step, title, subtitle,
    pandaSpeech = "Let's build your health profile!",
    onContinue, canContinue = true,
    continueLabel = 'Continue', children,
}) => {
    const isFirst = step === 1;
    const pct = Math.round((step / TOTAL_STEPS) * 100);

    return (
        <View style={s.root}>
            <StatusBar barStyle="dark-content" />

            {/* ── Top safe-area header ── */}
            <View style={s.headerWrap}>
                <View style={s.header}>
                    {/* Back */}
                    <TouchableOpacity
                        style={s.iconBtn}
                        onPress={() => isFirst ? router.replace('/(auth)/sign-in') : router.back()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={s.backArrow}>‹</Text>
                    </TouchableOpacity>

                    {/* Progress bar */}
                    <View style={s.progressWrap}>
                        <View style={s.progressBg}>
                            <View style={[s.progressFill, { width: `${pct}%` as any }]} />
                        </View>
                        <Text style={s.stepText}>{step} of {TOTAL_STEPS}</Text>
                    </View>

                    {/* Skip */}
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={s.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Scrollable body ── */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Panda row with speech bubble */}
                <View style={s.pandaRow}>
                    {/* Panda in a circular clip */}
                    <View style={s.pandaCircle}>
                        <Image
                            source={require('@/assets/images/image.png')}
                            style={s.pandaImg}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Speech bubble */}
                    <View style={s.bubbleWrap}>
                        {/* pointed tail */}
                        <View style={s.tail} />
                        <View style={s.bubble}>
                            <Text style={s.bubbleText}>{pandaSpeech}</Text>
                        </View>
                    </View>
                </View>

                {/* Title + subtitle */}
                <Text style={s.title}>{title}</Text>
                {!!subtitle && <Text style={s.subtitle}>{subtitle}</Text>}

                {/* Screen content */}
                <View style={s.body}>{children}</View>

                {/* Bottom breathing room so footer doesn't cover content */}
                <View style={{ height: 32 }} />
            </ScrollView>

            {/* ── Fixed footer CTA ── */}
            <View style={s.footer}>
                <TouchableOpacity
                    style={[s.continueBtn, !canContinue && s.continueBtnOff]}
                    onPress={canContinue ? onContinue : undefined}
                    activeOpacity={canContinue ? 0.85 : 1}
                >
                    <Text style={[s.continueTxt, !canContinue && s.continueTxtOff]}>
                        {continueLabel}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Header
    headerWrap: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight ?? 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 14,
        gap: 12,
    },
    iconBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#F5F5F5',
        alignItems: 'center', justifyContent: 'center',
    },
    backArrow: { fontSize: 26, color: '#333', lineHeight: 30, marginTop: -2 },
    progressWrap: { flex: 1, gap: 5 },
    progressBg: {
        height: 5, backgroundColor: '#F0F0F0',
        borderRadius: 3, overflow: 'hidden',
    },
    progressFill: { height: 5, backgroundColor: C.orange, borderRadius: 3 },
    stepText: { fontSize: 10, color: '#BBB', fontWeight: '700', letterSpacing: 0.4 },
    skipText: { fontSize: 13, color: '#BBB', fontWeight: '600' },

    // Scroll
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20 },

    // Panda + bubble
    pandaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
        gap: 14,
    },
    pandaCircle: {
        width: 78, height: 78,
        borderRadius: 39,
        overflow: 'hidden',
        backgroundColor: '#EEF9FF',
        borderWidth: 2,
        borderColor: '#E0F0FF',
        // Elevation so it's clearly above bg
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    pandaImg: { width: 78, height: 78 },

    bubbleWrap: { flex: 1, position: 'relative' },
    tail: {
        position: 'absolute',
        left: -7, top: 14,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderTopWidth: 7,
        borderBottomWidth: 7,
        borderRightWidth: 8,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#F0F0F0',
        zIndex: 1,
    },
    bubble: {
        backgroundColor: '#FAFAFA',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        padding: 12,
    },
    bubbleText: { fontSize: 13, color: '#555', lineHeight: 19 },

    // Title
    title: { fontSize: 25, fontWeight: '800', color: '#111', lineHeight: 33, marginBottom: 6 },
    subtitle: { fontSize: 14, color: '#888', lineHeight: 21, marginBottom: 4 },
    body: { marginTop: 22 },

    // Footer
    footer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: Platform.OS === 'ios' ? 36 : 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    continueBtn: {
        backgroundColor: C.orange,
        borderRadius: 14, paddingVertical: 16,
        alignItems: 'center',
        shadowColor: C.orange,
        shadowOpacity: 0.3, shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 }, elevation: 5,
    },
    continueBtnOff: {
        backgroundColor: '#EEEEEE',
        shadowOpacity: 0, elevation: 0,
    },
    continueTxt: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
    continueTxtOff: { color: '#BDBDBD' },
});
