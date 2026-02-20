import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="step1-name" />
            <Stack.Screen name="step2-dob" />
            <Stack.Screen name="step3-height" />
            <Stack.Screen name="step4-weight" />
            <Stack.Screen name="step5-bodytype" />
            <Stack.Screen name="step6-goal" />
            <Stack.Screen name="step6b-target" />
            <Stack.Screen name="step7-activity" />
        </Stack>
    );
}
