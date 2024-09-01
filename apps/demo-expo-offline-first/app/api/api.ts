import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetworkStatus } from '../network/NetworkProvider';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Public API endpoint
});

api.interceptors.request.use(
  async (config) => {
    const isConnected = useNetworkStatus();

    if (!isConnected) {
      // Set a custom flag to handle offline mode in the response interceptor
      config.headers['X-Offline-Mode'] = 'true';
      config.headers['X-Cached-Url'] = config.url;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response) => {
    const isConnected = useNetworkStatus();

    if (isConnected) {
      // Cache successful responses
      await AsyncStorage.setItem(response.config.url!, JSON.stringify(response.data));
    } else if (response.config.headers['X-Offline-Mode']) {
      // Handle offline mode, read from cache
      const cachedUrl = response.config.headers['X-Cached-Url'];
      const cachedData = await AsyncStorage.getItem(cachedUrl);
      if (cachedData) {
        return {
          ...response,
          data: JSON.parse(cachedData),
          status: 200,
          statusText: 'OK (Offline)',
        };
      } else {
        throw new Error('No cached data available');
      }
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
