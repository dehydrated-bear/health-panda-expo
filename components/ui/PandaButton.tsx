/**
 * PandaButton — Reusable animated button for Health Panda
 *
 * Variants: primary | secondary | success | warning | coral | outline | ghost | icon
 * Size:     sm | md | lg
 *
 * Usage:
 *   import { PandaButton } from '@/components/ui/PandaButton';
 *   <PandaButton variant="primary" label="Log Meal" onPress={() => {}} />
 *   <PandaButton variant="icon" icon="❤️" label="Like" size="sm" onPress={() => {}} />
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
} from 'react-native-reanimated';

import { PandaColors, PandaRadius, PandaSpacing } from '@/constants/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────
export type PandaBtnVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'coral'
    | 'outline'
    | 'ghost'
    | 'icon';

export type PandaBtnSize = 'sm' | 'md' | 'lg';

export interface PandaButtonProps {
    variant?: PandaBtnVariant;
    size?: PandaBtnSize;
    label: string;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

// ─── Config map ───────────────────────────────────────────────────────────────
const VARIANT_MAP: Record<PandaBtnVariant, {
    bg: string; txt: string; border?: string; shadowColor: string;
}> = {
    primary: { bg: PandaColors.orange, txt: '#fff', shadowColor: PandaColors.orange },
    secondary: { bg: PandaColors.sky, txt: PandaColors.textPrimary, shadowColor: PandaColors.sky },
    success: { bg: PandaColors.success, txt: '#fff', shadowColor: PandaColors.success },
    warning: { bg: PandaColors.yellow, txt: PandaColors.textPrimary, shadowColor: PandaColors.yellow },
    coral: { bg: PandaColors.coral, txt: '#fff', shadowColor: PandaColors.coral },
    outline: { bg: 'transparent', txt: PandaColors.orange, border: PandaColors.orange, shadowColor: PandaColors.orange },
    ghost: { bg: 'transparent', txt: PandaColors.textSecond, shadowColor: 'transparent' },
    icon: { bg: PandaColors.bg, txt: PandaColors.textPrimary, shadowColor: PandaColors.shadow },
};

const SIZE_MAP: Record<PandaBtnSize, {
    paddingV: number; paddingH: number; fontSize: number; radius: number; minWidth: number;
}> = {
    sm: { paddingV: 9, paddingH: 16, fontSize: 13, radius: PandaRadius.sm, minWidth: 80 },
    md: { paddingV: 14, paddingH: 24, fontSize: 15, radius: PandaRadius.md, minWidth: 110 },
    lg: { paddingV: 18, paddingH: 32, fontSize: 17, radius: PandaRadius.lg, minWidth: 140 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export const PandaButton: React.FC<PandaButtonProps> = ({
    variant = 'primary',
    size = 'md',
    label,
    icon,
    disabled = false,
    fullWidth = false,
    onPress,
    style,
    textStyle,
}) => {
    const scale = useSharedValue(1);
    const glow = useSharedValue(0);
    const shimmer = useSharedValue(0);

    const v = VARIANT_MAP[variant];
    const sz = SIZE_MAP[size];

    const onPressIn = () => {
        if (disabled) return;
        scale.value = withSpring(0.94, { damping: 12, stiffness: 300 });
        glow.value = withTiming(1, { duration: 120 });
        shimmer.value = withTiming(1, { duration: 280 });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 260 });
        glow.value = withTiming(0, { duration: 200 });
        shimmer.value = withTiming(0, { duration: 380 });
    };

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        shadowOpacity: interpolate(glow.value, [0, 1], [v.shadowColor === 'transparent' ? 0 : 0.08, 0.36]),
        shadowRadius: interpolate(glow.value, [0, 1], [4, 18]),
        elevation: interpolate(glow.value, [0, 1], [2, 10]),
    }));

    const shimmerStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.18, 0]),
    }));

    return (
        <Animated.View
            style={[
                btn.wrap,
                {
                    backgroundColor: v.bg,
                    borderColor: v.border ?? 'transparent',
                    borderWidth: v.border ? 2 : 0,
                    borderRadius: sz.radius,
                    shadowColor: v.shadowColor,
                    minWidth: sz.minWidth,
                    opacity: disabled ? 0.5 : 1,
                    alignSelf: fullWidth ? 'stretch' : 'flex-start',
                },
                animStyle,
                style,
            ]}
        >
            <TouchableOpacity
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={1}
                style={[btn.inner, { paddingVertical: sz.paddingV, paddingHorizontal: sz.paddingH }]}
            >
                {/* Shimmer flash overlay */}
                <Animated.View style={[btn.shimmer, shimmerStyle]} />

                {/* Content */}
                <View style={btn.row}>
                    {icon ? <Text style={[btn.icon, { fontSize: sz.fontSize + 2 }]}>{icon}</Text> : null}
                    <Text style={[btn.txt, { color: v.txt, fontSize: sz.fontSize }, textStyle]}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const btn = StyleSheet.create({
    wrap: { shadowOffset: { width: 0, height: 4 }, overflow: 'hidden' },
    inner: { alignItems: 'center', justifyContent: 'center' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    txt: { fontWeight: '700', letterSpacing: 0.2 },
    icon: {},
    shimmer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#ffffff',
    },
});

// ─── Button Row helper ────────────────────────────────────────────────────────
export const PandaButtonRow: React.FC<{
    children: React.ReactNode;
    gap?: number;
    wrap?: boolean;
}> = ({ children, gap = PandaSpacing.sm, wrap = false }) => (
    <View style={{ flexDirection: 'row', gap, flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center' }}>
        {children}
    </View>
);
