import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { SCREEN } from '@constant';
import { useAuth, useLocalization } from '@providers';
import { LanguageCode } from '@types';

export const useEditProfile = () => {
  const navigation = useNavigation<any>();
  const { userInfo, logout, updateProfile, updatePassword } = useAuth();
  const { currentLanguage, changeLanguage } = useLocalization();

  const initialInfo = {
    firstName: userInfo?.first_name || '',
    lastName: userInfo?.last_name || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.mobile || '',
  };

  const [infoData, setInfoData] = useState(initialInfo);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [infoErrors, setInfoErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isInfoUpdating, setIsInfoUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  const handleInfoChange = (field: keyof typeof infoData, value: string) => {
    setInfoData(prev => ({ ...prev, [field]: value }));
    setInfoErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwordData,
    value: string,
  ) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setPasswordErrors(prev => ({ ...prev, [field]: '' }));
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const isInfoValid = () =>
    infoData.firstName.trim() &&
    infoData.lastName.trim() &&
    infoData.email.trim() &&
    infoData.phoneNumber.trim();

  const isPasswordValid = () =>
    passwordData.currentPassword.trim() &&
    passwordData.newPassword.trim() &&
    passwordData.confirmPassword.trim() &&
    passwordData.newPassword === passwordData.confirmPassword;

  const isInfoChanged = useMemo(() => {
    return (
      infoData.firstName !== initialInfo.firstName ||
      infoData.lastName !== initialInfo.lastName ||
      infoData.email !== initialInfo.email ||
      infoData.phoneNumber !== initialInfo.phoneNumber
    );
  }, [infoData, initialInfo]);

  const handleUpdateInfo = async () => {
    if (!isInfoValid() || !isInfoChanged) return;

    try {
      setIsInfoUpdating(true);
      await updateProfile({
        first_name: infoData.firstName.trim(),
        last_name: infoData.lastName.trim(),
        email: infoData.email.trim(),
        mobile: infoData.phoneNumber.trim(),
      });
    } catch (err) {
    } finally {
      setIsInfoUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!isPasswordValid()) {
      console.warn('Password validation failed');
      return;
    }

    try {
      setIsPasswordUpdating(true);

      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
  
      setPasswordErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
  
      setPasswordVisibility({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    } catch (error) {
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate(SCREEN.EDIT_PROFILE);
  };

  const handleLanguageChange = async (code: LanguageCode) => {
    if (currentLanguage !== code) {
      await changeLanguage(code);
    }
  };

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (e) {
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    infoData,
    passwordData,
    infoErrors,
    passwordErrors,
    passwordVisibility,
    handleInfoChange,
    handlePasswordChange,
    togglePasswordVisibility,
    isInfoValid,
    isPasswordValid,
    isInfoChanged,
    handleUpdateInfo,
    handleUpdatePassword,
    isInfoUpdating,
    isPasswordUpdating,
    isLogoutModalVisible,
    currentLanguage,
    isLoggingOut,
    handleEditProfile,
    handleLanguageChange,
    handleLogoutPress,
    handleCancelLogout,
    handleConfirmLogout,
  };
};
