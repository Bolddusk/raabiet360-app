import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageHook } from '@types';

const useAsyncStorage = <T>(): AsyncStorageHook<T> => {

  const fetchAsync = useCallback(async (key: string): Promise<T | null> => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Failed to fetch item with key "${key}":`, e);
      return null;
    }
  }, []);

  const saveAsync = useCallback(
    async (key: string, value: T): Promise<void> => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.error(`Failed to save item with key "${key}":`, e);
      }
    },
    [],
  );

  const deleteAsync = useCallback(async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Failed to delete item with key "${key}":`, e);
    }
  }, []);

  return {
    fetchAsync,
    saveAsync,
    deleteAsync,
  };
};

export default useAsyncStorage;
