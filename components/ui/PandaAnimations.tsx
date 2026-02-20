/**
 * PandaAnimations — Reusable animation primitives for Health Panda
 *
 * Components:
 *   - FloatingDot       — Floating color orb with staggered animation
 *   - PulseRing         — Pulsing ring (e.g., heart-rate indicator)
 *   - GlowBlob          — Background glow blob
 *   - BreathingView     — Breathing scale animation wrapper
 *   - FadeSlideIn       — Fade + slide in entrance animation
 *   - ShimmerBar        — Loading skeleton shimmer bar
 *   - BounceIn          — Bounce-scale entrance
 *   - WaveIcon          — Waving arm / icon rotation
 *   - ScanLine          — Vertical scan line (AI camera UI)
 *   - ProgressRing      — Quadrant-style circular progress ring
 *
 * Usage:
 *   import { FloatingDot, BreathingView, ProgressRing } from '@/components/ui/PandaAnimations';
 *   <BreathingView scale={1.06}><YourContent /></BreathingView>
 *   <ProgressRing percent={78} color={PandaColors.orange} value="7,820" label="Steps" />
 */

import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSpring,
    withSequence,
    withDelay,
    Easing,
    interpolate,
    FadeIn,
    SlideInDown,
    ZoomIn,
} from 'react-native-reanimated';
import { PandaColors } from '@/constants/theme';

// ─── Floating Dot ─────────────────────────────────────────────────────────────
export const FloatingDot: React.FC<{
    color: string;
    delay?: number;
    size?: number;
    style?: ViewStyle;
    amplitude?: number;
    duration?: number;
}> = ({ color, delay = 0, size = 8, style, amplitude = 22, duration = 2200 }) => {
    const y = useSharedValue(0);
    const o = useSharedValue(0.6);

    useEffect(() => {
        y.value = withDelay(
            delay,
            withRepeat(
                withTiming(-amplitude, { duration, easing: Easing.inOut(Easing.sin) }),
                -1, true,
            ),
        );
        o.value = withDelay(
            delay,
            withRepeat(withTiming(1, { duration }), -1, true),
        );
    }, []);

    const aStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value }],
        opacity: o.value,
    }));

    return (
        <Animated.View style={[
            { width: size, height: size, borderRadius: size / 2, backgroundColor: color, position: 'absolute' },
            aStyle,
            style,
        ]} />
    );
};

// ─── Glow Blob ────────────────────────────────────────────────────────────────
export const GlowBlob: React.FC<{
    color: string;
    size?: number;
    style?: ViewStyle;
    speed?: number;
}> = ({ color, size = 160, style, speed = 3000 }) => {
    const v = useSharedValue(0);

    useEffect(() => {
        v.value = withRepeat(
            withTiming(1, { duration: speed, easing: Easing.inOut(Easing.sin) }),
            -1, true,
        );
    }, []);

    const aStyle = useAnimatedStyle(() => ({
        opacity: interpolate(v.value, [0, 1], [0.18, 0.45]),
        transform: [{ scale: interpolate(v.value, [0, 1], [0.94, 1.08]) }],
    }));

    return (
        <Animated.View style={[
            { width: size, height: size, borderRadius: size / 2, backgroundColor: color, position: 'absolute' },
            aStyle,
            style,
        ]} />
    );
};

// ─── Breathing View ───────────────────────────────────────────────────────────
export const BreathingView: React.FC<{
    children: React.ReactNode;
    scale?: number;
    duration?: number;
    style?: ViewStyle;
}> = ({ children, scale: maxScale = 1.07, duration = 2400, style }) => {
    const s = useSharedValue(1);

    useEffect(() => {
        s.value = withRepeat(
            withTiming(maxScale, { duration, easing: Easing.inOut(Easing.sin) }),
            -1, true,
        );
    }, []);

    const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));

    return <Animated.View style={[aStyle, style]}>{children}</Animated.View>;
};

// ─── Wave Icon ────────────────────────────────────────────────────────────────
export const WaveIcon: React.FC<{
    children: React.ReactNode;
    style?: ViewStyle;
}> = ({ children, style }) => {
    const r = useSharedValue(0);

    useEffect(() => {
        r.value = withRepeat(
            withSequence(
                withTiming(22, { duration: 280 }),
                withTiming(-22, { duration: 280 }),
                withTiming(16, { duration: 240 }),
                withTiming(-16, { duration: 240 }),
                withTiming(0, { duration: 280 }),
                withTiming(0, { duration: 1400 }),
            ),
            -1, false,
        );
    }, []);

    const aStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${r.value}deg` }] }));

    return <Animated.View style={[aStyle, style]}>{children}</Animated.View>;
};

// ─── Pulse Ring ───────────────────────────────────────────────────────────────
export const PulseRing: React.FC<{
    color: string;
    size?: number;
    style?: ViewStyle;
}> = ({ color, size = 44, style }) => {
    const s = useSharedValue(1);
    const o = useSharedValue(0.8);

    useEffect(() => {
        s.value = withRepeat(
            withTiming(1.6, { duration: 1200, easing: Easing.out(Easing.ease) }),
            -1, false,
        );
        o.value = withRepeat(
            withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
            -1, false,
        );
    }, []);

    const ringStyle = useAnimatedStyle(() => ({
        transform: [{ scale: s.value }],
        opacity: o.value,
    }));

    return (
        <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
            <Animated.View style={[
                { width: size, height: size, borderRadius: size / 2, borderWidth: 2, borderColor: color, position: 'absolute' },
                ringStyle,
            ]} />
            <View style={{ width: size * 0.55, height: size * 0.55, borderRadius: (size * 0.55) / 2, backgroundColor: color + 'AA', justifyContent: 'center', alignItems: 'center' }} />
        </View>
    );
};

// ─── Fade Slide In ────────────────────────────────────────────────────────────
export const FadeSlideIn: React.FC<{
    children: React.ReactNode;
    delay?: number;
    from?: 'bottom' | 'top' | 'left' | 'right';
    style?: ViewStyle;
}> = ({ children, delay = 0, style }) => (
    <Animated.View entering={FadeIn.delay(delay).duration(500)} style={style}>
        {children}
    </Animated.View>
);

// ─── Bounce In ───────────────────────────────────────────────────────────────
export const BounceIn: React.FC<{
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle;
}> = ({ children, delay = 0, style }) => (
    <Animated.View entering={ZoomIn.delay(delay).springify().damping(12)} style={style}>
        {children}
    </Animated.View>
);

// ─── Scan Line ───────────────────────────────────────────────────────────────
export const ScanLine: React.FC<{
    color?: string;
    height?: number;
    duration?: number;
    style?: ViewStyle;
}> = ({ color = PandaColors.orange, height = 120, duration = 1600 }) => {
    const y = useSharedValue(0);

    useEffect(() => {
        y.value = withRepeat(
            withTiming(1, { duration, easing: Easing.linear }),
            -1, false,
        );
    }, []);

    const beamStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(y.value, [0, 1], [0, height]) }],
    }));

    return (
        <Animated.View style={[
            {
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                backgroundColor: color + 'BB',
                shadowColor: color, shadowOpacity: 0.8, shadowRadius: 6,
                shadowOffset: { width: 0, height: 0 },
            },
            beamStyle,
        ]} />
    );
};

// ─── Progress Ring ────────────────────────────────────────────────────────────
export const ProgressRing: React.FC<{
    percent: number;
    color: string;
    size?: number;
    label: string;
    value: string;
}> = ({ percent, color, size = 88, label, value }) => {
    const thick = 7;
    const inner = size - thick * 2 - 6;
    const q1 = percent >= 12.5;
    const q2 = percent >= 37.5;
    const q3 = percent >= 62.5;
    const q4 = percent >= 87.5;

    return (
        <View style={{ alignItems: 'center', gap: 6 }}>
            <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
                {/* Track */}
                <View style={{
                    position: 'absolute', width: size, height: size,
                    borderRadius: size / 2, borderWidth: thick, borderColor: color + '20',
                }} />
                {/* Progress arc (4-quadrant border technique) */}
                <View style={{
                    position: 'absolute', width: size - 4, height: size - 4,
                    borderRadius: (size - 4) / 2, borderWidth: thick,
                    borderTopColor: q1 ? color : color + '20',
                    borderRightColor: q2 ? color : color + '20',
                    borderBottomColor: q3 ? color : color + '20',
                    borderLeftColor: q4 ? color : color + '20',
                    transform: [{ rotate: '-45deg' }],
                }} />
                {/* Inner face */}
                <View style={{
                    width: inner, height: inner, borderRadius: inner / 2,
                    backgroundColor: PandaColors.surface,
                    justifyContent: 'center', alignItems: 'center',
                    shadowColor: color, shadowOpacity: 0.15, shadowRadius: 8,
                    shadowOffset: { width: 0, height: 2 }, elevation: 3,
                }}>
                    <Text style={{ color: PandaColors.textPrimary, fontWeight: '700', fontSize: inner > 60 ? 14 : 11 }}>
                        {value}
                    </Text>
                    <Text style={{ color: PandaColors.textSecond, fontSize: 9, marginTop: 1 }}>{label}</Text>
                </View>
            </View>
            {/* Mini bar */}
            <View style={{ width: size, height: 3, backgroundColor: PandaColors.border, borderRadius: 2 }}>
                <View style={{ width: `${percent}%` as any, height: 3, backgroundColor: color, borderRadius: 2 }} />
            </View>
            <Text style={{ fontSize: 10, color: PandaColors.textMuted }}>{percent}%</Text>
        </View>
    );
};

// ─── Shimmer Bar (skeleton loader) ───────────────────────────────────────────
export const ShimmerBar: React.FC<{
    width?: number | string;
    height?: number;
    radius?: number;
    style?: ViewStyle;
}> = ({ width = '100%', height = 16, radius = 8, style }) => {
    const shimmer = useSharedValue(0);

    useEffect(() => {
        shimmer.value = withRepeat(
            withTiming(1, { duration: 1200, easing: Easing.ease }),
            -1, true,
        );
    }, []);

    const aStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shimmer.value, [0, 1], [0.4, 0.9]),
    }));

    return (
        <Animated.View style={[
            { width: width as any, height, borderRadius: radius, backgroundColor: PandaColors.border },
            aStyle,
            style,
        ]} />
    );
};
