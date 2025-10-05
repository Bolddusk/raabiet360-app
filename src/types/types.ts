import { ReactNode, RefObject } from 'react';
import {
  GestureResponderEvent,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { CountryCode } from 'react-native-country-picker-modal';
import { MessageOptions, MessageType } from 'react-native-flash-message';

// Re-export Project type from API
export type { Project } from '@api';
import PhoneInput from 'react-native-phone-number-input';
import { SvgProps } from 'react-native-svg';

import { THEME, USER_ROLE, WorkerStatus } from '@constant';

export type LanguageCode = 'en_US' | 'fr_CA';

export type ShowFlashArgs = {
  message: string;
  description?: string;
  type?: MessageType;
  icon?: MessageOptions['icon'] | React.ReactElement;
  floating?: boolean;
};

export type AuthBundle = {
  accessToken: string;
  refreshToken: string;
  userId: number | null;
};

export interface ColorPalette {
  primary: string;
  primaryLight: string;
  primary100: string;
  gray: string;
  gray100: string;
  bg: string;
  gray600: string;
  black100: string;
  background: string;
  white: string;
  white100: string;
  black: string;
  red: string;
  green: string;
  yellow100: string;
  blackTransparent: string;
}
export interface ThemeContextProps {
  currentTheme: THEME;
  THEME_COLOR: ColorPalette;
  toggleTheme: () => void;
}

export interface LocalizationContextProps {
  currentLanguage: LanguageCode;
  t: (key: string, options?: any) => string;
  changeLanguage: (lng: LanguageCode) => void;
}
export interface AuthContextProps {
  isLoggedIn: boolean;
  userInfo: any;
  authData: AuthBundle;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<any>;
  updatePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<any>;
}

export interface PickupContextProps {
  selectedFilter: string;
  workerRequests: WorkerRequest[];
  filteredRequests: WorkerRequest[];
  selectedWorker: WorkerRequest | null;
  modalVisible: boolean;
  loading: boolean;
  setSelectedFilter: (value: string) => void;
  setSelectedWorker: (worker: WorkerRequest | null) => void;
  updateRequestStatus: (
    requestId: string,
    newStatus: WorkerRequest['status'],
  ) => Promise<void>;
  openModal: (worker: WorkerRequest) => void;
  closeModal: () => void;
  loadPickupRequests: () => Promise<void>;
}

export interface StockContextProps {
  selectedFilter: string;
  workerRequests: WorkerRequest[];
  filteredRequests: WorkerRequest[];
  selectedWorker: WorkerRequest | null;
  modalVisible: boolean;
  loading: boolean;
  isDriver: boolean;
  statusOptions: Array<{label: string, value: string}>;
  setSelectedFilter: (value: string) => void;
  setSelectedWorker: (worker: WorkerRequest | null) => void;
  updateRequestStatus: (
    requestId: string,
    newStatus: WorkerRequest['status'],
  ) => Promise<void>;
  openModal: (worker: WorkerRequest) => Promise<void>;
  closeModal: () => void;
  loadStockRequests: () => Promise<void>;
  loadAllStockRequests: () => Promise<void>;
  filterRequestsByCreatorRole: (requests: WorkerRequest[], allowedRoles?: string[]) => WorkerRequest[];
  // Pagination info
  currentPage: number;
  totalPages: number;
  totalRequests: number;
  hasMorePages: boolean;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface AsyncStorageHook<T> {
  fetchAsync: (key: string) => Promise<T | null>;
  saveAsync: (key: string, value: T) => Promise<void>;
  deleteAsync: (key: string) => Promise<void>;
}
export interface ButtonTypes {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

export interface TextFieldProps {
  showLabel?: boolean;
  label?: string;
  multiline?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showLeftCustomIcon?: boolean;
  showRightCustomIcon?: boolean;
  showError?: boolean;

  leftIconColor?: string;
  rightIconColor?: string;
  leftIconSize?: number;
  rightIconSize?: number;
  error?: string;
  value: string;
  placeholder?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  secureEye?: boolean;
  btnDisabled?: boolean;
  maxLength?: number;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  loading?: boolean;

  LeftIcon?: React.ComponentType<{
    width: number;
    height: number;
    color?: string;
  }>;
  RightIcon?: React.ComponentType<{
    width: number;
    height: number;
    color?: string;
  }>;

  onChangeText?: (text: string) => void;
  onPressInput?: () => void;
  onRightIconClick?: () => void;
}

export interface WrapperProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  flex?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
  applyHorizontalPadding?: boolean;
  applyVerticalPadding?: boolean;
  scrollEnabled?: boolean;
  bgColor?: string;
  statusBarColor?: string;
}

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  fullscreen?: boolean;
  isVisible?: boolean;
  title?: string;
  showTitle?: boolean;
  loaderColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showOverlayBackgroundColor?: boolean;
  onClose?: () => void;
}
export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface TabBarLabelProps {
  label: string;
  focused: boolean;
  themeColor: any;
}

export interface TabBarIconProps {
  Icon: React.FC<SvgProps>;
  focused: boolean;
  isMiddle?: boolean;
  themeColor: any;
}

export interface HeaderProps {
  showLeftContainer?: boolean;
  showMiddleContainer?: boolean;
  showRightContainer?: boolean;

  LeftIcon?: React.ComponentType<SvgProps>;
  leftIconSize?: number;
  leftIconColor?: string;
  leftText?: string;
  middleText?: string;
  rightText?: string;
  variant: 'simple' | 'home';
  userName?: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
  t?: any;
  onPressLeft?: () => void;
}

export interface InfoCardProps {
  variant: 'icon' | 'count';
  label: string;
  count?: string;
  Icon?: React.FC<SvgProps>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  time: string;
  date: string;
  project: string;
  status: WorkerStatus;
  item?: string;
  quantity?: string;
  decisionBy?: string;
  decisionTime?: string;
}

export interface StatusModalProps {
  visible: boolean;
  workerInfo: Worker | null;
  type: 'worker' | 'stock';
  onClose: () => void;
  onStatusUpdate: (requestId: string, newStatus: Worker['status']) => void;
}
export interface WorkRequestModalProps {
  visible: boolean;
  workerInfo: Worker | null;
  type: 'pickup' | 'stock';
  onClose: () => void;
  onPrimaryAction: () => void;
  onStatusUpdate?: (requestId: string, newStatus: string, notes?: string) => void;
}

export interface ConfirmationModalProps {
  visible: boolean;
  iconType: 'success' | 'error' | 'custom';
  title: string;
  subtitle: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  Icon?: React.FC<SvgProps>;
  onSecondaryAction?: () => void;
  onPrimaryAction: () => void;
}

export interface FilterCardProps {
  filterData?: {
    label: string;
    value: string;
  }[];
  statusOptions?: Array<{label: string, value: string}>;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}

export interface WorkerRequest {
  id: string;
  request_id?: string; // For stock requests
  replenishment_id?: string; // For replenishments
  name: string;
  phone: string;
  address: string;
  project: string;
  time: string;
  date: string;
  status: string;
  avatar: string;
  quantity?: string;
  item?: string;
  items?: Array<{
    id: number;
    item_name: string;
    quantity_requested: number;
    quantity_delivered?: number;
  }>;
  // Creator information with role
  creator?: {
    id: number;
    name: string;
    email: string;
    role?: {
      id: number;
      role_name: string;
    };
    user_roles?: Array<{
      id: number;
      role?: {
        id: number;
        role_name: string;
      };
    }>;
  };
  // Timeline timestamp fields
  driver_id?: number;
  driver_name?: string;
  driver_pickup_confirmation?: boolean;
  pickup_date_time?: string;
  pickup_notes?: string;
  in_transit_date_time?: string;
  driver_delivery_confirmation?: boolean;
  delivery_date_time?: string;
  delivery_notes?: string;
  in_transit_notes?: string;
  worker_confirmation?: boolean;
  completion_date_time?: string;
  completion_notes?: string;
  notes?: string; // Main request-level notes
  created_at?: string;
  updated_at?: string;
  // Timeline specific timestamps (from backend)
  driverAssignedAt?: string;
  inTransitAt?: string;
  completedAt?: string;
  // Pickup request specific fields
  vehicle_number?: string;
  vehicle_color?: string;
  drop_off_time?: string;
}

export interface StockRequest {
  id: number;
  request_id: string;
  request_type: 'stock_request' | 'replenishment';
  status: string;
  project_name: string;
  warehouse_name: string;
  driver_id?: number;
  driver_name?: string;
  creator_name?: string;
  creator?: {
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  created_by?: number;
  requestingStaff?: string;
  created_at: string;
  updated_at: string;
  total_quantity_requested?: number;
  items?: Array<{
    id: number;
    item_name: string;
    quantity_requested: number;
    quantity_delivered?: number;
  }>;
}

export interface PickupRequest {
  id: number;
  worker_id: number;
  project_id: number;
  driver_id: number;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  pickup_time: string;
  pickup_date: string;
  destination: string;
  description?: string;
  drop_off_time?: string;
  vehicle_number?: string;
  vehicle_color?: string;
  created_at: string;
  updated_at: string;
  worker: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone?: string;
    mobile?: string;
  };
  driver: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone?: string;
    mobile?: string;
    vehicle_number?: string;
    vehicle_color?: string;
    vehicle_model?: string;
  };
  project: {
    id: number;
    project_id: string;
    name: string;
    description?: string;
    address?: string;
  };
}

export interface WorkerRequestCardProps {
  request: WorkerRequest;
  type: 'stock' | 'pickup';
  onPressDetail?: (request: WorkerRequest) => void;
}
export interface RequestCardProps {
  request: WorkerRequest;
  type: 'stock' | 'pickup';
  onStatusUpdate: (requestId: string, newStatus: string, notes?: string) => void;
  onPressDetail?: (request: WorkerRequest) => void;
}
export interface ProfileInfoProps {
  name: string;
  role: string;
  startTime: string;
  endTime: string;
  profileImage: string;
}
export interface VehicleDetailsProps {
  vehicleName: string;
  vehicleNumber: string;
  status: string;
  color: string;
  model: string;
  vehicleImage: any;
}
export interface DriverDetailsProps {
  name: string;
  phone: string;
  email: string;
  role: USER_ROLE;
  designation?: string;
  onEdit: () => void;
}
export interface SelectionToggleProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onToggle: (value: string) => void;
}
export interface TabBarProps {
  tabs: {
    id: string;
    label: string;
    value?: any;
  }[];
  activeTab: string;
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onTabPress: (tabId: string) => void;
}
export interface CheckInCardProps {
  title: string;
  location: string;
  status?: string;
  checkInTime?: string;
  checkOutTime?: string;
  onCheckIn: () => void;
  loading?: boolean;
}
export interface DropdownProps {
  showLabel?: boolean;
  label?: string;
  placeholder?: string;
  iconColor?: string;
  dContainerStyle?: StyleProp<ViewStyle>;
  dTextStyle?: StyleProp<TextStyle>;
  data: { label: string; value: string }[];
  value: string | string[];
  multiSelect?: boolean;
  RightIcon?: React.FC<SvgProps>;
  onChange: (item: any) => void;
  getStatusButtonStyle?: (status: string) => any;
}
export interface DateTimeSelectorProps {
  isVisible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}
export interface PhoneInputTypes {
  showLabel?: boolean;
  label?: string;
  value?: string;
  maxLength?: number;
  countryCode?: CountryCode;
  error?: string | null;
  phoneInput?: RefObject<PhoneInput>;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  onChangeCountryCode?: (country: any) => void;
}
export interface ProjectCardTypes {
  moduleId: string;
  name: string;
  location: string;
  role: 'driver' | 'worker';
  managerName?: string;
  status?: string;
  statusOptions?: Array<{ name: string; color: string }>;
  onBTFormPress: () => void;
  onQFormPress: () => void;
}
export interface PickupDetailsModalProps {
  visible: boolean;
  data: {
    projectName: string;
    status?: string;
    pickupTime: string;
    dropOffTime: string;
    driverName: string;
    vehicleNo: string;
    vehicleColor: string;
    createdAt?: string;
    completedAt?: string;
  };
  onClose: () => void;
}

export interface EmptyListProps {
  icon?: ReactNode;
  text: string;
}

export interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  containerStyle?: any;
  overlayStyle?: any;
  closeOnOverlayPress?: boolean;
}
