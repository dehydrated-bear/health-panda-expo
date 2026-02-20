/**
 * PandaCard — Reusable card components for Health Panda
 *
 * Variants: base | elevated | accent | stat | gradient
 *
 * Usage:
 *   import { PandaCard, PandaStatCard, PandaProgressCard } from '@/components/ui/PandaCard';
 *   <PandaCard accent={PandaColors.orange}><Text>content</Text></PandaCard>
 *   <PandaStatCard icon="❤️" label="Heart Rate" value="72" unit="BPM" color={PandaColors.coral} />
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PandaColors, PandaRadius, PandaShadows, PandaSpacing } from '@/constants/theme';

// ─── Base Card ────────────────────────────────────────────────────────────────
export const PandaCard: React.FC<{
    children: React.ReactNode;
    accent?: string;       // left border accent color
    shadow?: 'sm' | 'md' | 'lg' | 'none';
    style?: ViewStyle;
    padding?: number;
}> = ({ children, accent, shadow = 'md', style, padding = PandaSpacing.lg }) => {
    const shadowStyle = shadow === 'none' ? {} : PandaShadows[shadow];
    return (
        <View style={[
            card.base,
            shadowStyle,
            accent ? { paddingLeft: padding + 4 } : { padding },
            style,
        ]}>
            {accent ? (
                <View style={[card.accentBar, { backgroundColor: accent }]} />
            ) : null}
            <View style={accent ? { padding } : undefined}>
                {children}
            </View>
        </View>
    );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
export const PandaStatCard: React.FC<{
    icon: string;
    label: string;
    value: string;
    unit: string;
    color: string;
    change?: number;
    style?: ViewStyle;
}> = ({ icon, label, value, unit, color, change, style }) => (
    <View style={[card.stat, { borderTopColor: color, borderTopWidth: 3 }, style]}>
        <View style={[card.statIcon, { backgroundColor: color + '18' }]}>
            <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={card.statLabel}>{label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 2 }}>
                <Text style={card.statValue}>{value}</Text>
                <Text style={card.statUnit}>{unit}</Text>
            </View>
        </View>
        {change !== undefined ? (
            <View style={[card.changePill, { backgroundColor: change >= 0 ? '#34D39918' : '#FF565618' }]}>
                <Text style={{ color: change >= 0 ? PandaColors.success : PandaColors.coral, fontSize: 11, fontWeight: '700' }}>
                    {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </Text>
            </View>
        ) : null}
    </View>
);

// ─── Progress Card ────────────────────────────────────────────────────────────
export const PandaProgressCard: React.FC<{
    icon: string;
    label: string;
    value: string;
    goal: string;
    percent: number;
    color: string;
    style?: ViewStyle;
}> = ({ icon, label, value, goal, percent, color, style }) => (
    <View style={[card.base, PandaShadows.md, { padding: PandaSpacing.lg }, style]}>
        {/* Left accent bar */}
        <View style={[card.accentBar, { backgroundColor: color }]} />
        <View style={{ paddingLeft: PandaSpacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={card.statLabel}>{label}</Text>
                    <Text style={[card.progressValue, { color: PandaColors.textPrimary }]}>{value}</Text>
                    <Text style={card.statUnit}>{goal}</Text>
                </View>
                <View style={[card.statIcon, { backgroundColor: color + '18', width: 52, height: 52, borderRadius: 14 }]}>
                    <Text style={{ fontSize: 28 }}>{icon}</Text>
                </View>
            </View>
            {/* Track */}
            <View style={card.track}>
                <View style={[card.fill, { width: `${Math.min(percent, 100)}%` as any, backgroundColor: color }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={card.statUnit}>{percent}% of goal</Text>
                <Text style={[card.statUnit, { color }]}>{value}</Text>
            </View>
        </View>
    </View>
);

// ─── Section Header ───────────────────────────────────────────────────────────
export const PandaSectionHeader: React.FC<{
    title: string;
    subtitle?: string;
    pill?: boolean;
    color?: string;
}> = ({ title, subtitle, pill = true, color = PandaColors.orange }) => (
    <View style={section.wrap}>
        {pill ? (
            <View style={[section.pill, { backgroundColor: color + '18' }]}>
                <Text style={[section.title, { color }]}>{title}</Text>
            </View>
        ) : (
            <Text style={[section.title, { color, fontSize: 14, letterSpacing: 1 }]}>{title}</Text>
        )}
        {subtitle ? <Text style={section.sub}>{subtitle}</Text> : null}
        <View style={section.line} />
    </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const card = StyleSheet.create({
    base: {
        backgroundColor: PandaColors.card,
        borderRadius: PandaRadius.md,
        borderWidth: 1,
        borderColor: PandaColors.border,
        marginBottom: 12,
        overflow: 'hidden',
    },
    accentBar: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: 4,
    },
    stat: {
        backgroundColor: PandaColors.card,
        borderRadius: PandaRadius.md,
        padding: 14,
        borderWidth: 1,
        borderColor: PandaColors.border,
        flexDirection: 'row',
        alignItems: 'center',
        ...PandaShadows.sm,
    },
    statIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    statLabel: { fontSize: 11, color: PandaColors.textSecond },
    statValue: { fontSize: 20, color: PandaColors.textPrimary, fontWeight: '800' },
    statUnit: { fontSize: 12, color: PandaColors.textMuted },
    changePill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    progressValue: { fontSize: 34, fontWeight: '800', marginTop: 2 },
    track: { height: 6, backgroundColor: PandaColors.border, borderRadius: 3, marginTop: 12 },
    fill: { height: 6, borderRadius: 3 },
});

const section = StyleSheet.create({
    wrap: { paddingHorizontal: 16, paddingTop: 28, paddingBottom: 10 },
    pill: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
    title: { fontSize: 11, fontWeight: '800', letterSpacing: 1.6, textTransform: 'uppercase' },
    sub: { fontSize: 12, color: PandaColors.textSecond, marginTop: 5 },
    line: { height: 1, backgroundColor: PandaColors.border, marginTop: 10 },
});
