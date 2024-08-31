import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetworkStatus } from '../network/NetworkProvider';

const api = axios.create({
  baseURL: 'https://api.yourservice.com',
});

api.interceptors.request.use(
  async (config) => {
    const isConnected = useNetworkStatus();

    if (!isConnected) {
      // Set a custom flag for offline mode
      config.headers['X-Offline-Mode'] = 'true';
      // Store the cached data in the config for later use
      const cachedData = await AsyncStorage.getItem(config.url!);
      config.data = cachedData ? JSON.parse(cachedData) : null;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Modify the response interceptor to handle offline mode
api.interceptors.response.use(
  async (response) => {
    const isConnected = useNetworkStatus();

    if (isConnected) {
      // Cache successful responses
      await AsyncStorage.setItem(response.config.url!, JSON.stringify(response.data));
    }

    return response;
  },
  async (error) => {
    if (error.config.headers['X-Offline-Mode'] === 'true') {
      // Return cached data as a successful response
      return {
        data: error.config.data,
        status: 200,
        statusText: 'OK (Offline)',
        headers: {},
        config: error.config,
      };
    }
    return Promise.reject(error);
  }
);

export default api;
