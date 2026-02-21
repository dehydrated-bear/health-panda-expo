/**
 * API Service — Backend Integration for Health Panda
 * Base URL: Update this to match your backend server
 */

import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = 'http://127.0.0.1:5000/api';

// For iOS simulator use: http://127.0.0.1:5000/api
// For Android emulator use: http://10.0.2.2:5000/api
// For physical device use: http://YOUR_LOCAL_IP:5000/api

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance with interceptor for auth token
// ─────────────────────────────────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests automatically
apiClient.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Handle 401 errors (unauthorized)
apiClient.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user_data');
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfilePayload {
  weight: number;
  height: number;
  body_type: string;
  fitness_goal: string;
  activity_level: string;
}

export interface UserProfile {
  weight: number;
  height: number;
  body_type: string;
  fitness_goal: string;
  activity_level: string;
}

export interface FoodEntry {
  entry_id: number;
  food_name: string;
  calories: number | null;
  confidence: number | null;
  image_path: string;
  created_on: string;
}

export interface FoodScanResult {
  entry_id: number;
  food_name: string;
  calories: number | null;
  confidence: number | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Authentication APIs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a new user
 */
export const register = async (payload: RegisterPayload): Promise<{ message: string }> => {
  const response = await apiClient.post('/register', payload);
  return response.data;
};

/**
 * Login user and store token
 */
export const login = async (payload: LoginPayload): Promise<{ access_token: string }> => {
  const response = await apiClient.post('/login', payload);
  const { access_token } = response.data;
  
  // Store token in AsyncStorage
  await AsyncStorage.setItem('access_token', access_token);
  
  return response.data;
};

/**
 * Logout user and clear stored data
 */
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('user_data');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('access_token');
  return !!token;
};

/**
 * Get stored access token
 */
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('access_token');
};

// ─────────────────────────────────────────────────────────────────────────────
// Profile APIs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get user profile
 */
export const getProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get('/profile');
  return response.data;
};

/**
 * Create or update user profile
 */
export const updateProfile = async (payload: ProfilePayload): Promise<{ message: string }> => {
  const response = await apiClient.post('/profile', payload);
  return response.data;
};

// ─────────────────────────────────────────────────────────────────────────────
// Food & Calorie APIs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Upload food image and get calorie information
 * @param imageUri - Local URI of the image
 */
export const scanFood = async (imageUri: string): Promise<FoodScanResult> => {
  const formData = new FormData();
  
  // Extract filename from URI
  const filename = imageUri.split('/').pop() || 'photo.jpg';
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';
  
  // Append image to form data
  formData.append('image', {
    uri: imageUri,
    name: filename,
    type: type,
  } as any);
  
  const response = await apiClient.post('/food', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Get all food entries for the logged-in user
 */
export const getFoodEntries = async (): Promise<FoodEntry[]> => {
  const response = await apiClient.get('/food');
  return response.data.entries || [];
};

// ─────────────────────────────────────────────────────────────────────────────
// Export API client for custom requests
// ─────────────────────────────────────────────────────────────────────────────
export default apiClient;
