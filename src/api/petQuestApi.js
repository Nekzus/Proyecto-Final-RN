import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseURL = 'https://nodejs-backend-rn.up.railway.app/api'; //'http://192.168.50.122:8080/api';localhost

const petQuestApi = axios.create({ baseURL });

petQuestApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default petQuestApi;
