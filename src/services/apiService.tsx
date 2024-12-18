import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { getJWTToken, refreshSession } from "./jwtService";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
  }
  const {VITE_API_URL}= import.meta.env;
const apiService = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => { 
      const { jwtToken } = await getJWTToken();
      if (jwtToken) {
        config.headers = new AxiosHeaders({
            ...config.headers,
            Authorization: `Bearer ${jwtToken}`,
          });
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  
  apiService.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
      if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const { refreshToken } = await getJWTToken();
          if (!refreshToken) {
            console.error("Refresh token is missing. User needs to log in.");
            return Promise.reject(error);
          }
  
          const refreshedTokens = await refreshSession(refreshToken);
          if (refreshedTokens) {
            const { newAccessToken } = refreshedTokens;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiService(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

export const apiGet = (url: string, config?: AxiosRequestConfig) => {
  return apiService.get(url, config);
};

export const apiPost = (url: string, data: any, config?: AxiosRequestConfig) => {
  return apiService.post(url, data, config);
};

export const apiPut = (url: string, data: any, config?: AxiosRequestConfig) => {
  return apiService.put(url, data, config);
};

export const apiDelete = (url: string, config?: AxiosRequestConfig) => {
  return apiService.delete(url, config);
};

export default apiService;
