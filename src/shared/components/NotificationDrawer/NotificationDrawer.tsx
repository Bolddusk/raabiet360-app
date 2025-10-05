import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useTheme, useNotifications } from '@providers';
import { Notification } from '@providers';
import { ICONS } from '@assets/svg';
import { styles } from './NotificationDrawer.styles';

interface NotificationDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isVisible,
  onClose,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });
  
  const {
    notifications,
    unreadCount,
    isLoading,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  const slideAnim = useRef(new Animated.Value(-1000)).current;
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleClearAll = () => {
    Alert.alert(
      t('Label.ClearAll'),
      'Are you sure you want to clear all notifications?',
      [
        { text: t('Button.Label.Cancel'), style: 'cancel' },
        {
          text: t('Button.Label.Finish'),
          style: 'destructive',
          onPress: async () => {
            await clearNotifications();
          },
        },
      ]
    );
  };

  const handleNotificationPress = async (notification: Notification) => {
    // Only mark as read if it's currently unread
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }
    // Don't close the drawer - let user continue browsing notifications
    // Handle notification tap action here if needed
  };

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshNotifications();
    } catch (error) {
      console.error('Failed to refresh notifications:', error);
    } finally {
      setIsRefreshing(false);
    }
  };


  const formatTimestamp = (timestamp: string) => {
    const now = moment();
    const notificationTime = moment(timestamp);
    const diffInMinutes = now.diff(notificationTime, 'minutes');
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return notificationTime.format('MMM DD');
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        Styles.notificationItem,
        !item.is_read && Styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}>
      
      {/* Notification Content */}
      <View style={Styles.notificationContent}>
        <View style={Styles.notificationHeader}>
          <Text style={Styles.notificationTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={Styles.notificationTime}>
            {formatTimestamp(item.created_at)}
          </Text>
        </View>
        
        <Text style={Styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        
        {item.data && (
          <View style={Styles.notificationDataContainer}>
            {item.data.pickupDate && (
              <View style={Styles.dataRow}>
                <ICONS.CALENDAR.default width={14} height={14} color="#6B7280" />
                <Text style={Styles.notificationDataText}>
                  {item.data.pickupDate}
                </Text>
              </View>
            )}
            {item.data.destination && (
              <View style={Styles.dataRow}>
                <ICONS.PIN_CHECK.default width={14} height={14} color="#6B7280" />
                <Text style={Styles.notificationDataText} numberOfLines={1}>
                  {item.data.destination}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Status Indicator */}
      <View style={Styles.notificationStatusContainer}>
        {!item.is_read && <View style={Styles.unreadDot} />}
        {item.is_read && (
          <View style={Styles.readIndicator}>
            <ICONS.READ.default width={16} height={16} color="#10B981" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={Styles.emptyState}>
      <Text style={Styles.emptyStateText}>
        {t('Label.NoNotifications')}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={Styles.header}>
      <View style={Styles.headerTop}>
        <Text style={Styles.headerTitle}>
          {t('Label.Notifications')}
        </Text>
        <TouchableOpacity onPress={onClose} style={Styles.closeButton}>
          <Text style={Styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      {notifications.length > 0 && (
        <View style={Styles.headerActions}>
          <TouchableOpacity
            onPress={handleMarkAllAsRead}
            style={[
              Styles.actionButton,
              unreadCount === 0 && Styles.disabledActionButton
            ]}
            disabled={unreadCount === 0}>
            <Text style={[
              Styles.actionButtonText,
              unreadCount === 0 && Styles.disabledActionButtonText
            ]}>
              {t('Label.MarkAllAsRead')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleClearAll}
            style={Styles.actionButton}>
            <Text style={Styles.actionButtonText}>
              {t('Label.ClearAll')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={refreshNotifications}
            style={[
              Styles.refreshButton,
              isLoading && Styles.disabledActionButton
            ]}
            disabled={isLoading}>
            <ICONS.REFRESH.default 
              color={isLoading ? '#B2B2B2' : '#FFFFFF'} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (!isVisible) {
    return null;
  }

  return (
    <View style={Styles.overlay}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      <Animated.View 
        style={[
          Styles.drawer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <SafeAreaView style={Styles.safeArea} edges={['top', 'left', 'right']}>
          {renderHeader()}
          
          {isLoading ? (
            <View style={Styles.loadingContainer}>
              <ActivityIndicator size="large" color={THEME_COLOR.primary} />
            </View>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderNotificationItem}
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={Styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handlePullToRefresh}
                  colors={[THEME_COLOR.primary]}
                  tintColor={THEME_COLOR.primary}
                  title="Pull to refresh"
                  titleColor="#666666"
                />
              }
            />
          )}
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default NotificationDrawer;
