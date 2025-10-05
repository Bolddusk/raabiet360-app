import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Keychain from 'react-native-keychain';

import { API_ENDPOINT, BASE_URL, patchData, postData } from '@api';
import { KEYS } from '@constant';
import useAsyncStorage from '@shared/hooks/useAsyncStorage';
import { showFlash } from '@shared/utils/helpers';
import { AuthBundle, AuthContextProps, ProviderProps } from '@types';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to automatically inject auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log('🔔 Axios interceptor - adding auth token to request:', config.url);
      
      // Get token from keychain
      const savedAuth = await Keychain.getGenericPassword({
        service: KEYS.AUTH,
      });
      
      console.log('🔔 Keychain auth data:', savedAuth ? 'Present' : 'Missing');
      
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth.password);
        console.log('🔔 Parsed auth data:', { 
          hasAccessToken: !!parsed.accessToken,
          tokenPreview: parsed.accessToken ? parsed.accessToken.substring(0, 20) + '...' : 'No token'
        });
        
        if (parsed.accessToken) {
          config.headers.Authorization = `Bearer ${parsed.accessToken}`;
          console.log('🔔 Authorization header added to request');
        } else {
          console.log('🔔 No access token found in keychain');
        }
      } else {
        console.log('🔔 No auth data found in keychain');
      }
    } catch (error) {
      console.log('🔔 Error getting auth token for interceptor:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const DEFAULT_AUTH: AuthBundle = {
  accessToken: '',
  refreshToken: '',
  userId: null,
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const { fetchAsync, saveAsync, deleteAsync } = useAsyncStorage<any>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [authData, setAuthData] = useState<AuthBundle>(DEFAULT_AUTH);

  useEffect(() => {
    (async () => {
      try {
        const savedAuth = await Keychain.getGenericPassword({
          service: KEYS.AUTH,
        });
        const savedUser = await fetchAsync(KEYS.USER);

        if (savedAuth) {
          const parsed = JSON.parse(savedAuth.password);
          setAuthData({
            accessToken: parsed.accessToken ?? '',
            refreshToken: parsed.refreshToken ?? '',
            userId: parsed.userId ?? null,
          });

          if (parsed.accessToken) {
            setIsLoggedIn(true);
          }
        }

        if (savedUser) {
          setUserInfo(savedUser);
        }
      } catch (error) {
        console.log('Error loading saved credentials', error);
      }
    })();
  }, [fetchAsync]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const normalizedEmail = email.trim().toLowerCase();

        const response = await postData(API_ENDPOINT.LOGIN, {
          email: normalizedEmail,
          password,
        });

        const user = response?.data?.user;
        const roles = user?.roles ?? [];

        const DRIVER_ROLE_ID = 10;
        const ONSITE_WORKER_ROLE_ID = 6;

        // check if the user has a valid role
        const isAuthorized = roles.some(
          (role: { id: number }) =>
            role.id === DRIVER_ROLE_ID || role.id === ONSITE_WORKER_ROLE_ID,
        );

        if (!isAuthorized) {
          throw new Error('Access Denied');
        }

        const finalRole = roles.find(
          (r: { id: number }) =>
            r.id === DRIVER_ROLE_ID || r.id === ONSITE_WORKER_ROLE_ID,
        );

        const infoToStore = {
          ...user,
          // role: finalRole?.role_name || 'Unknown',
          role: finalRole || {},
        };

        const authBundle: AuthBundle = {
          accessToken: response?.data?.access_token ?? '',
          refreshToken: response?.data?.refresh_token ?? '',
          userId: user?.id ?? null,
        };

        await Keychain.setGenericPassword('auth', JSON.stringify(authBundle), {
          service: KEYS.AUTH,
          // accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
          storage: Keychain.STORAGE_TYPE.AES,
        });

        await saveAsync(KEYS.USER, infoToStore);

        setIsLoggedIn(true);
        setUserInfo(infoToStore);
        setAuthData(authBundle);
      } catch (error: any) {
        showFlash({
          message:
            error?.message ?? 'Invalid email or credentials. Please try again.',
          type: 'danger',
        });
        throw error;
      }
    },
    [saveAsync],
  );

  const logout = useCallback(async () => {
    try {
      // Always try to call logout API, but don't fail if it doesn't work
      await postData(API_ENDPOINT.LOGOUT, undefined, authData.accessToken);
    } catch (error: any) {
      // Log the error but don't show it to user - we'll still proceed with local logout
      console.log('Logout API call failed:', error?.message || 'Unknown error');
    }

    // Always clear local data regardless of API response
    try {
      setIsLoggedIn(false);
      setUserInfo({});
      setAuthData(DEFAULT_AUTH);

      await deleteAsync(KEYS.USER);
      await Keychain.resetGenericPassword({ service: KEYS.AUTH });
      
      showFlash({
        message: 'Logged out successfully',
        type: 'success',
      });
    } catch (error: any) {
      showFlash({
        message: 'Logout Failed',
        description: 'Failed to clear local data. Please restart the app.',
        type: 'danger',
      });
      throw error;
    }
  }, [authData.accessToken, deleteAsync]);

  const updateProfile = useCallback(
    async (data: any) => {
      try {
        const response = await patchData(
          API_ENDPOINT.updateUser(authData.userId),
          data,
          authData.accessToken,
        );

        setUserInfo(response?.data || response);
        await saveAsync(KEYS.USER, response?.data || response);

        showFlash({
          message: 'Profile updated successfully',
          type: 'success',
        });

        return response;
      } catch (error: any) {
        showFlash({
          message: 'Profile update failed',
          description:
            error?.message || 'Something went wrong while updating profile.',
          type: 'danger',
        });
        throw error;
      }
    },
    [authData.accessToken, saveAsync],
  );

  const updatePassword = useCallback(
    async (data: { currentPassword: string; newPassword: string }) => {
      try {
        const response = await patchData(
          API_ENDPOINT.updatePassword(authData.userId),
          data,
          authData.accessToken,
        );

        showFlash({
          message: 'Password updated successfully',
          type: 'success',
        });

        return response;
      } catch (error: any) {
        showFlash({
          message: 'Password update failed',
          description:
            error?.message || 'Something went wrong while updating password.',
          type: 'danger',
        });
        throw error;
      }
    },
    [authData.accessToken, authData.userId],
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        authData,
        login,
        logout,
        updateProfile,
        updatePassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
