import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { useNotifications } from '@providers';

interface PushNotificationContextType {
    clearAllNotifications: () => Promise<void>;
}

const PushNotificationContext = createContext<PushNotificationContextType | undefined>(undefined);

export const PushNotificationProvider = ({ children }: { children: ReactNode }) => {

    const { incrementUnreadCount } = useNotifications();

    //   Handle notification tap when app is launched from quit state
    const handleQuiteNotificationPress = async (remoteMessage: any) => {
        try {
            const parsedData = JSON.parse(remoteMessage?.data?.jsonPayload);
            console.log('App launched from quit state:', parsedData);
            // TODO: Add navigation handling if needed
        } catch (error) {
            console.error('Error parsing quit notification payload:', error);
        }
    };

    // Handle notification tap when app is foregrounded or backgrounded
    const handleNotificationPress = async (remoteMessage: any) => {
        try {
            const parsedData = JSON.parse(remoteMessage);
            console.log('Notification pressed:', parsedData);
            // TODO: Add navigation handling if needed
        } catch (error) {
            console.error('Error parsing notification payload:', error);
        }
    };

    // Create a notification channel 
    const createNotificationChannel = async () => {
        if (Platform.OS === 'android') {
            await notifee.createChannel({
                id: 'notifications',
                name: 'Notification Channel',
                sound: 'default',
            });
        }
    };

    // Display notification when app is in foreground
    const handleForegroundNotification = (remoteMessage: any) => {
        const { notification, data } = remoteMessage;
        notifee.displayNotification({
            id: Date.now().toString(),
            title: notification?.title,
            body: notification?.body,
            data,
            android: {
                channelId: 'notifications',
                timestamp: Date.now(),
                showTimestamp: true,
                sound: 'default',
                pressAction: { id: 'default' },
            },
        });
    };

    //  Clear all local notifications
    const clearAllNotifications = async () => {
        await notifee.cancelAllNotifications();
    };

    //  Setup Notification Handlers
    useEffect(() => {
        createNotificationChannel();

        // Handle notification when app is launched from quit state
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    handleQuiteNotificationPress(remoteMessage);
                }
            });

        // Handle notification when app is opened from background
        const unsubscribeOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                handleNotificationPress(remoteMessage?.data?.jsonPayload);
            }
        });

        return () => {
            unsubscribeOpenedApp();
        };
    }, []);

    // Foreground notifications and Notifee events
    useEffect(() => {
        const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
            handleForegroundNotification(remoteMessage);

            incrementUnreadCount();
        });

        // Notifee event listener
        const eventListener = notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                handleNotificationPress(detail?.notification?.data?.jsonPayload);
            }
        });

        return () => {
            unsubscribeMessage();
            eventListener();
        };
    }, [incrementUnreadCount]);

    const value: PushNotificationContextType = {
        clearAllNotifications,
    };

    return (
        <PushNotificationContext.Provider value={value}>
            {children}
        </PushNotificationContext.Provider>
    );
};

export const usePushNotifications = (): PushNotificationContextType => {
    const context = useContext(PushNotificationContext);
    if (!context) {
        throw new Error('usePushNotifications must be used within a PushNotificationProvider');
    }
    return context;
};
