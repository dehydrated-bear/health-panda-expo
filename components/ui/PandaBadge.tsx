/**
 * PandaBadge — Status badges, tags, and alert banners for Health Panda
 *
 * Usage:
 *   import { PandaBadge, PandaAlert } from '@/components/ui/PandaBadge';
 *   <PandaBadge label="Good Form" type="good" icon="🟢" />
 *   <PandaAlert type="success" title="Great!" body="You hit your goal!" />
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PandaColors } from '@/constants/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────
export type PandaBadgeType = 'good' | 'warn' | 'bad' | 'info' | 'purple' | 'sky' | 'orange' | 'neutral';
export type PandaAlertType = 'success' | 'warning' | 'danger' | 'info';

// ─── Badge Color Map ───────────────────────────────────────────────────────────
const BADGE_COLORS: Record<PandaBadgeType, { bg: string; text: string; border: string }> = {
    good: { bg: '#34D39918', text: '#059669', border: '#34D39940' },
    warn: { bg: '#FFA23918', text: '#D97706', border: '#FFA23940' },
    bad: { bg: '#FF565618', text: '#DC2626', border: '#FF565640' },
    info: { bg: '#8CE4FF18', text: '#0284C7', border: '#8CE4FF40' },
    purple: { bg: '#C4B5FD18', text: '#7C3AED', border: '#C4B5FD40' },
    sky: { bg: `${PandaColors.sky}20`, text: PandaColors.sky, border: `${PandaColors.sky}50` },
    orange: { bg: `${PandaColors.orange}18`, text: PandaColors.orange, border: `${PandaColors.orange}40` },
    neutral: { bg: PandaColors.border, text: PandaColors.textSecond, border: PandaColors.border },
};

// ─── Alert Color Map ───────────────────────────────────────────────────────────
const ALERT_COLORS: Record<PandaAlertType, { accent: string; icon: string }> = {
    success: { accent: PandaColors.success, icon: '✅' },
    warning: { accent: PandaColors.orange, icon: '⚠️' },
    danger: { accent: PandaColors.coral, icon: '🚨' },
    info: { accent: PandaColors.sky, icon: '🔔' },
};

// ─── Badge Component ──────────────────────────────────────────────────────────
export const PandaBadge: React.FC<{
    label: string;
    type?: PandaBadgeType;
    icon?: string;
    style?: ViewStyle;
    size?: 'sm' | 'md';
}> = ({ label, type = 'info', icon, style, size = 'md' }) => {
    const clr = BADGE_COLORS[type];
    const isSmall = size === 'sm';
    return (
        <View style={[
            badge.wrap,
            {
                backgroundColor: clr.bg,
                borderColor: clr.border,
                paddingHorizontal: isSmall ? 8 : 12,
                paddingVertical: isSmall ? 3 : 5,
            },
            style,
        ]}>
            {icon ? (
                <Text style={{ fontSize: isSmall ? 10 : 12, marginRight: 3 }}>{icon}</Text>
            ) : null}
            <Text style={[badge.text, { color: clr.text, fontSize: isSmall ? 10 : 12 }]}>
                {label}
            </Text>
        </View>
    );
};

// ─── Alert Banner Component ───────────────────────────────────────────────────
export const PandaAlert: React.FC<{
    type?: PandaAlertType;
    title: string;
    body?: string;
    icon?: string;
    style?: ViewStyle;
}> = ({ type = 'info', title, body, icon, style }) => {
    const clr = ALERT_COLORS[type];
    return (
        <View style={[
            alert.wrap,
            { backgroundColor: clr.accent + '18', borderColor: clr.accent + '44' },
            style,
        ]}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>{icon ?? clr.icon}</Text>
            <View style={{ flex: 1 }}>
                <Text style={[alert.title, { color: clr.accent }]}>{title}</Text>
                {body ? (
                    <Text style={alert.body}>{body}</Text>
                ) : null}
            </View>
        </View>
    );
};

// ─── Status Dot ──────────────────────────────────────────────────────────────
export const PandaStatusDot: React.FC<{
    status: 'online' | 'offline' | 'busy' | 'away';
    size?: number;
}> = ({ status, size = 8 }) => {
    const color = {
        online: PandaColors.success,
        offline: PandaColors.textMuted,
        busy: PandaColors.coral,
        away: PandaColors.yellow,
    }[status];

    return (
        <View style={{
            width: size, height: size, borderRadius: size / 2,
            backgroundColor: color,
            borderWidth: 1.5, borderColor: PandaColors.surface,
        }} />
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const badge = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    text: { fontWeight: '700' },
});

const alert = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginTop: 10,
    },
    title: { fontWeight: '700', fontSize: 14 },
    body: { color: PandaColors.textSecond, fontSize: 13, marginTop: 3, lineHeight: 20 },
});
