import { useNavigation } from '@react-navigation/native';

import { DATA, SCREEN, TOP_TABS_REQUESTS, USER_ROLE } from '@constant';
import { useAuth } from '@providers';
import { isWorker } from '@utils/roleUtils';

const labelToScreenMap: Record<string, string> = {
  'New Pickup': SCREEN.WORKER_PICKUP,
  'New Material': SCREEN.WORKER_STOCK,
  'Projects': SCREEN.PROJECTS,
  'Pickup Requests': SCREEN.WORKER_PICKUP,
  'Material Requests': SCREEN.WORKER_STOCK,
  'Locator': SCREEN.LOCATAR,
  'Worker Pickup': SCREEN.DRIVER_PICKUP,
  'Stock Pickup': SCREEN.DRIVER_STOCK,
  'Manager Requests': SCREEN.MANAGER_STOCK,
  'Check-In': SCREEN.CHECKIN,
};

export const useHome = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation<any>();

  const quickAccessData =
    isWorker(userInfo?.role)
      ? DATA.workerQuickAccess
      : DATA.driverQuickAccess;

  const quickDashboardData =
    isWorker(userInfo?.role) ? DATA.workerDashboard : DATA.dashboard;

  const handleItemPress = (item: any) => {
    const targetScreen = labelToScreenMap[item.label];
    const labelLowercase = item.label?.toLowerCase?.();

    const isNewItem = labelLowercase?.includes('new');
    const activeTab = isNewItem
      ? TOP_TABS_REQUESTS.CREATE
      : TOP_TABS_REQUESTS.RECENT;

    if (
      targetScreen === SCREEN.CHECKIN ||
      targetScreen === SCREEN.DRIVER_PICKUP ||
      targetScreen === SCREEN.DRIVER_STOCK ||
      targetScreen === SCREEN.MANAGER_STOCK ||
      targetScreen === SCREEN.PROJECTS ||
      targetScreen === SCREEN.CHECKIN ||
      targetScreen === SCREEN.LOCATAR
    ) {
      navigation.navigate(targetScreen, {
        itemData: {
          id: item.id,
          label: item.label,
          // Remove Icon to avoid non-serializable warning
        },
      });
    } else if (targetScreen === SCREEN.WORKER_PICKUP) {
      navigation.navigate(targetScreen, {
        itemData: {
          id: item.id,
          label: item.label,
          // Remove Icon to avoid non-serializable warning
        },
        activeTab,
      });
    } else if (targetScreen === SCREEN.WORKER_STOCK) {
      navigation.navigate(targetScreen, {
        itemData: {
          id: item.id,
          label: item.label,
          // Remove Icon to avoid non-serializable warning
        },
        activeTab,
      });
    } else {
      console.warn(`No screen mapped for label: ${item.label}`);
    }
  };

  return {
    quickAccessData,
    quickDashboardData,
    handleItemPress,
  };
};
