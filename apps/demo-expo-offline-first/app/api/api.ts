// api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Public API endpoint
});

export const fetchWithCache = async (url: string, isConnected: boolean) => {
  // First, try to get cached data regardless of connection status
  const cachedData = await AsyncStorage.getItem(url);

  if (!isConnected) {
    console.log(`Offline mode - attempting to serve cached data for: ${url}`);
    if (cachedData) {
      console.log(`Serving cached data for: ${url}`);
      return JSON.parse(cachedData);
    } else {
      console.log(`No cached data available for: ${url}`);
      throw new Error('No cached data available');
    }
  }

  // If connected, try to fetch new data
  try {
    const response = await api.get(url);
    console.log(`Caching new data for ${url}`);
    await AsyncStorage.setItem(url, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    // If fetch fails and we have cached data, return that
    if (cachedData) {
      console.log('Fetch failed. Serving cached data for:', url);
      return JSON.parse(cachedData);
    }
    // If no cached data, rethrow the error
    throw error;
  }
};