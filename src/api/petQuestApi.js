import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseURL = '';
const petQuestApi = axios.create({ baseURL });

petQuestApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default petQuestApi;
