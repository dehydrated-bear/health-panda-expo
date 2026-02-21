/**
 * Sign-Up Screen — Create new account
 */
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, Dimensions, Platform, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle,
    withRepeat, withSequence, withTiming, Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { PandaColors as C } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

const { height: SH } = Dimensions.get('window');

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusedField, setFocused] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useAuth();

    const floatY = useSharedValue(0);
    React.useEffect(() => {
        floatY.value = withRepeat(
            withSequence(
                withTiming(-8, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
            ), -1, false,
        );
    }, []);
    const pandaStyle = useAnimatedStyle(() => ({ transform: [{ translateY: floatY.value }] }));

    const valid = name.length >= 2 && email.includes('@') && password.length >= 6 && password === confirmPassword;

    const handleSignUp = async () => {
        if (!valid || isLoading) return;
        
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        
        setIsLoading(true);
        try {
            await register(name, email, password);
            Alert.alert('Success', 'Account created successfully!', [
                {
                    text: 'Continue',
                    onPress: () => router.replace('/(onboarding)/step1-name'),
                }
            ]);
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'Could not create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={s.root}>
            <TouchableOpacity style={s.back} onPress={() => router.back()}>
                <Text style={s.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Panda — floats on matching bg circle */}
            <View style={s.pandaArea}>
                <Animated.View style={pandaStyle}>
                    <View style={s.pandaBg} />
                    <Image
                        source={require('@/assets/images/image.png')}
                        style={s.panda}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>

            {/* White bottom sheet */}
            <View style={s.sheet}>
                <Text style={s.title}>Create Account</Text>
                <Text style={s.sub}>Join Health Panda today</Text>

                <View style={s.form}>
                    <View style={s.field}>
                        <Text style={s.label}>NAME</Text>
                        <TextInput
                            style={[s.input, focusedField === 'name' && s.inputFocused]}
                            placeholder="John Doe"
                            placeholderTextColor="#C8C8C8"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            autoFocus
                        />
                    </View>

                    <View style={s.field}>
                        <Text style={s.label}>EMAIL</Text>
                        <TextInput
                            style={[s.input, focusedField === 'email' && s.inputFocused]}
                            placeholder="you@example.com"
                            placeholderTextColor="#C8C8C8"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={s.field}>
                        <Text style={s.label}>PASSWORD</Text>
                        <TextInput
                            style={[s.input, focusedField === 'pass' && s.inputFocused]}
                            placeholder="••••••••"
                            placeholderTextColor="#C8C8C8"
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setFocused('pass')}
                            onBlur={() => setFocused(null)}
                            secureTextEntry
                        />
                    </View>

                    <View style={s.field}>
                        <Text style={s.label}>CONFIRM PASSWORD</Text>
                        <TextInput
                            style={[s.input, focusedField === 'confirm' && s.inputFocused]}
                            placeholder="••••••••"
                            placeholderTextColor="#C8C8C8"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onFocus={() => setFocused('confirm')}
                            onBlur={() => setFocused(null)}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[s.btn, (!valid || isLoading) && { opacity: 0.45 }]}
                    onPress={handleSignUp}
                    activeOpacity={valid ? 0.88 : 1}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={s.btnText}>Sign Up</Text>
                    )}
                </TouchableOpacity>

                <View style={s.signupRow}>
                    <Text style={s.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={[s.signupText, { color: C.orange, fontWeight: '700' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F0F7FF' },

    back: {
        position: 'absolute', top: Platform.OS === 'ios' ? 56 : 28, left: 20,
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
        zIndex: 10,
    },
    backArrow: { fontSize: 18, color: '#333', marginTop: -1 },

    pandaArea: {
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 80 : 60,
        height: SH * 0.32,
        justifyContent: 'center',
    },
    pandaBg: {
        position: 'absolute', width: 130, height: 130, borderRadius: 65,
        backgroundColor: '#EEF9FF',
    },
    panda: { width: 140, height: 140 },

    sheet: {
        flex: 1, backgroundColor: '#fff',
        borderTopLeftRadius: 32, borderTopRightRadius: 32,
        paddingHorizontal: 28, paddingTop: 28,
        paddingBottom: Platform.OS === 'ios' ? 44 : 28,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 16, shadowOffset: { width: 0, height: -4 },
    },
    title: { fontSize: 26, fontWeight: '800', color: '#111', marginBottom: 4 },
    sub: { fontSize: 14, color: '#888', marginBottom: 24 },

    form: { gap: 18, marginBottom: 8 },
    field: { gap: 7 },
    label: { fontSize: 10, fontWeight: '800', color: '#AAA', letterSpacing: 1.5 },
    input: {
        borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12,
        paddingHorizontal: 16, paddingVertical: 14,
        fontSize: 15, color: '#111', backgroundColor: '#FAFAFA',
    },
    inputFocused: { borderColor: C.orange, backgroundColor: '#fff' },

    btn: {
        backgroundColor: C.orange, borderRadius: 14,
        paddingVertical: 16, alignItems: 'center', marginTop: 20,
        shadowColor: C.orange, shadowOpacity: 0.25,
        shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4,
    },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '800' },

    signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    signupText: { fontSize: 14, color: '#AAA' },
});
