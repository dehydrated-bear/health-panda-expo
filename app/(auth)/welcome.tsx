/**
 * Welcome Screen — clean, panda on white so background matches
 */
import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, Dimensions, Platform,
} from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle,
    withSpring, withDelay, withTiming,
    withRepeat, withSequence, Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';

const { width: SW, height: SH } = Dimensions.get('window');

export default function WelcomeScreen() {
    const pandaY = useSharedValue(180);
    const pandaO = useSharedValue(0);
    const textO = useSharedValue(0);
    const btnO = useSharedValue(0);
    const floatY = useSharedValue(0);

    useEffect(() => {
        pandaY.value = withSpring(0, { damping: 18, stiffness: 100 });
        pandaO.value = withTiming(1, { duration: 450 });
        textO.value = withDelay(550, withTiming(1, { duration: 500 }));
        btnO.value = withDelay(950, withTiming(1, { duration: 500 }));
        floatY.value = withDelay(900, withRepeat(
            withSequence(
                withTiming(-10, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
            ), -1, false,
        ));
    }, []);

    const pandaStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: pandaY.value + floatY.value }],
        opacity: pandaO.value,
    }));
    const textStyle = useAnimatedStyle(() => ({ opacity: textO.value }));
    const btnStyle = useAnimatedStyle(() => ({ opacity: btnO.value }));

    return (
        <View style={s.root}>
            {/* Light blue top area */}
            <View style={s.topArea} />

            {/* White bottom semicircle */}
            <View style={s.semiWrap}>
                <View style={s.semi} />
            </View>

            {/* Panda — white bg card so no white box visible */}
            <View style={s.pandaStage}>
                <Animated.View style={[s.pandaCard, pandaStyle]}>
                    {/* Soft shadow circle behind panda */}
                    <View style={s.pandaShadow} />
                    <Image
                        source={require('@/assets/images/image.png')}
                        style={s.panda}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>

            {/* Bottom text content */}
            <View style={s.bottomContent}>
                <Animated.View style={textStyle}>
                    <Text style={s.brandTag}>HEALTH PANDA</Text>
                    <Text style={s.headline}>Your personal{'\n'}health companion</Text>
                    <Text style={s.tagline}>
                        Track nutrition, build habits and reach{'\n'}
                        your goals — all in one place.
                    </Text>

                    {/* Clean feature row — no emojis */}
                    <View style={s.featureRow}>
                        {[
                            { label: 'Nutrition', color: C.orange },
                            { label: 'Workouts', color: C.sky },
                            { label: 'Analytics', color: C.coral },
                        ].map((f) => (
                            <View key={f.label} style={[s.featurePill, { borderColor: f.color }]}>
                                <View style={[s.featureDot, { backgroundColor: f.color }]} />
                                <Text style={[s.featureLabel, { color: f.color }]}>{f.label}</Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>

                <Animated.View style={[s.buttons, btnStyle]}>
                    <TouchableOpacity
                        style={s.primaryBtn}
                        onPress={() => router.push('/(auth)/sign-in')}
                        activeOpacity={0.88}
                    >
                        <Text style={s.primaryBtnText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={s.ghostBtn}
                        onPress={() => router.replace('/(onboarding)/step1-name')}
                    >
                        <Text style={s.ghostBtnText}>Skip sign in</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F0F7FF' },

    topArea: { position: 'absolute', top: 0, left: 0, right: 0, height: SH * 0.52, backgroundColor: '#F0F7FF' },

    semiWrap: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: SH * 0.56, overflow: 'hidden', alignItems: 'center',
    },
    semi: {
        width: SW * 1.5, height: SW * 1.5,
        borderRadius: SW * 0.75,
        backgroundColor: '#fff',
        position: 'absolute', bottom: -SW * 0.25,
    },

    // Panda sits in centre overlapping the boundary
    pandaStage: {
        position: 'absolute',
        top: SH * 0.06,
        left: 0, right: 0,
        height: SH * 0.44,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pandaCard: {
        // Transparent — matches both backgrounds via white circle underneath
        alignItems: 'center', justifyContent: 'center',
    },
    pandaShadow: {
        position: 'absolute',
        width: 200, height: 200, borderRadius: 100,
        // Gradual radial feel — just a very light tinted circle
        backgroundColor: '#EEF9FF',
    },
    panda: { width: 210, height: 210, zIndex: 1 },

    // Text area is inside the white semicircle
    bottomContent: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: SH * 0.42,
        paddingHorizontal: 32,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 44 : 28,
        justifyContent: 'space-between',
    },
    brandTag: { fontSize: 11, fontWeight: '800', color: C.orange, letterSpacing: 2.5, marginBottom: 10 },
    headline: { fontSize: 30, fontWeight: '800', color: '#111', lineHeight: 38, marginBottom: 8 },
    tagline: { fontSize: 14, color: '#777', lineHeight: 22, marginBottom: 18 },

    featureRow: { flexDirection: 'row', gap: 10 },
    featurePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
    featureDot: { width: 6, height: 6, borderRadius: 3 },
    featureLabel: { fontSize: 12, fontWeight: '700' },

    buttons: { gap: 12 },
    primaryBtn: {
        backgroundColor: C.orange, borderRadius: 14,
        paddingVertical: 17, alignItems: 'center',
        shadowColor: C.orange, shadowOpacity: 0.28,
        shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 5,
    },
    primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
    ghostBtn: { alignItems: 'center', paddingVertical: 10 },
    ghostBtnText: { fontSize: 13, color: '#AAA', fontWeight: '600' },
});
