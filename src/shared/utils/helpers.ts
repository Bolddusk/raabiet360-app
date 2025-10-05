import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

import { TEXT_STYLE } from '@styles/theme';
import { ShowFlashArgs } from '@types';

export const isIOS = () => {
  return Platform.OS == 'ios';
};

export const getCurrentLocation = async (): Promise<{
  latitude: number;
  longitude: number;
  address?: string;
} | null> => {
  try {
    console.log('Getting user current location...');
    
    // Check if Geolocation is available
    if (!Geolocation) {
      console.error('Geolocation service not available');
      return null;
    }

    let hasPermission = false;

    if (!isIOS()) {
      console.log('Requesting Android location permission...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        hasPermission = true;
        console.log('Android location permission granted');
      } else if (
        granted === PermissionsAndroid.RESULTS.DENIED ||
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        console.log('Android location permission denied');
        Alert.alert(
          'Permission Required',
          'Location permission is required. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return null;
      }
    } else {
      console.log('Checking iOS location permission...');
      const permissionStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      if (permissionStatus === RESULTS.GRANTED) {
        hasPermission = true;
        console.log('iOS location permission already granted');
      } else if (permissionStatus === RESULTS.DENIED) {
        console.log('Requesting iOS location permission...');
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          hasPermission = true;
          console.log('iOS location permission granted');
        } else {
          console.log('iOS location permission denied');
          Alert.alert(
            'Permission Required',
            'Please allow location access in Settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => openSettings() },
            ],
          );
          return null;
        }
      } else if (permissionStatus === RESULTS.BLOCKED) {
        console.log('iOS location permission blocked');
        Alert.alert(
          'Location Blocked',
          'Location permission is blocked. Please enable it from Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return null;
      }
    }

    if (!hasPermission) {
      console.log('No location permission');
      return null;
    }

    console.log('Getting current position...');
    return new Promise((resolve, reject) => {
      // Try with high accuracy first (much shorter timeout)
      const timeoutId = setTimeout(() => {
        console.log('High accuracy location request timeout, trying with lower accuracy...');
        
        // Fallback to lower accuracy with shorter timeout
        Geolocation.getCurrentPosition(
          position => {
            console.log('Location obtained with lower accuracy:', position.coords);
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
            });
          },
          error => {
            console.error('Lower accuracy geolocation also failed:', error);
            // No fallback - reject the promise
            reject(new Error('Unable to get location'));
          },
          {
            enableHighAccuracy: false,
            timeout: 3000, // Reduced from 20000 to 3000ms
            maximumAge: 300000, // Increased to 5 minutes for better caching
          },
        );
      }, 2000); // Reduced from 8000 to 2000ms

      Geolocation.getCurrentPosition(
        position => {
          clearTimeout(timeoutId);
          console.log('Location obtained with high accuracy:', position.coords);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
          });
        },
        error => {
          clearTimeout(timeoutId);
          console.error('High accuracy geolocation error:', {
            code: error.code,
            message: error.message,
            PERMISSION_DENIED: error.PERMISSION_DENIED,
            POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
            TIMEOUT: error.TIMEOUT,
          });
          
          // If it's a timeout or position unavailable, try lower accuracy
          if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
            console.log('Trying with lower accuracy due to error...');
            Geolocation.getCurrentPosition(
              position => {
                console.log('Location obtained with lower accuracy after error:', position.coords);
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
                });
              },
              fallbackError => {
                console.error('Lower accuracy also failed:', fallbackError);
                reject(new Error('Unable to get location'));
              },
              {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 60000,
              },
            );
          } else {
            // For permission denied or other errors, reject
            console.log('Location error:', error);
            reject(new Error('Unable to get location'));
          }
        },
        {
          enableHighAccuracy: false, // Use network/cached location for speed
          timeout: 1000, // Very short timeout
          maximumAge: 600000, // Accept location up to 10 minutes old
        },
      );
    });
  } catch (error) {
    console.error('getCurrentLocation error:', error);
    return null;
  }
};


export const showFlash = ({
  message,
  description,
  type = 'success',
  icon = 'none',
  floating = false,
}: ShowFlashArgs): void => {
  showMessage({
    message,
    description,
    type,
    icon,
    floating,
    titleStyle: { ...TEXT_STYLE.paragraph },
    textStyle: { ...TEXT_STYLE.input },
  });
};
