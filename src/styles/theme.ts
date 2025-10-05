import { Dimensions, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

const ACTIVE_OPACITY = 0.9;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const iconSize = (num: number) => Math.min(WIDTH, HEIGHT) * num;

const LIGHT_COLOR = {
  primary: '#8085EF',
  primaryLight: '#F2F2FF',
  primary100: '#6938EF',
  gray: '#B2B2B2',
  gray100: '#F9F8FD',
  gray600: '#475467',
  bg: '#F2F4F7',
  white: '#FFFFFF',
  white100: '#FFFFFF99',
  black: '#000000',
  background: '#FFFFFF',
  black100: '#101828',
  red: '#FF0004',
  green: '#44BF53',
  yellow100: '#BAB710',
  error: '#FF4444',
  border: '#E5E5E5',
  lightGray: '#F5F5F5',
  lightBlue: '#F0F8FF',

  blackTransparent: 'rgba(0, 0, 0, 0.5)',
};

const DARK_COLOR = {
  primary: '#8085EF',
  primaryLight: '#F2F2FF',
  primary100: '#6938EF',
  gray: '#B2B2B2',
  gray100: '#F9F8FD',
  gray600: '#475467',
  bg: '#F2F4F7',
  white: '#FFFFFF',
  white100: '#FFFFFF99',
  black: '#000000',
  background: '#FFFFFF',
  black100: '#101828',
  red: '#FF0004',
  green: '#44BF53',
  yellow100: '#BAB710',
  error: '#FF4444',
  border: '#E5E5E5',
  lightGray: '#F5F5F5',
  lightBlue: '#F0F8FF',

  blackTransparent: 'rgba(0, 0, 0, 0.5)',
};

enum FONT {
  Bold = 'Inter-Bold',
  Light = 'Inter-Light',
  Medium = 'Inter-Medium',
  Regular = 'Inter-Regular',
  SemiBold = 'Inter-SemiBold',
}

const commonStyles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  justifyRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow_1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  shadow_2: {
    shadowColor: '#0000001F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  shadow_3: {
    shadowColor: '#0000001F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
});

const TEXT_STYLE = StyleSheet.create({
  h2: {
    fontSize: moderateScale(22),
    fontFamily: FONT.SemiBold,
  },
  h3: {
    fontSize: moderateScale(20),
    fontFamily: FONT.Medium,
  },
  paragraph: {
    fontSize: moderateScale(14),
    fontFamily: FONT.Regular,
  },
  paragraph1: {
    fontSize: moderateScale(14),
    fontFamily: FONT.Medium,
  },
  paragraphSmall: {
    fontSize: moderateScale(12),
    fontFamily: FONT.Regular,
  },
  body1: {
    fontFamily: FONT.Medium,
    fontSize: moderateScale(16),
  },
  body2: {
    fontFamily: FONT.Medium,
    fontSize: moderateScale(14),
  },
  bodyLink1: {
    fontFamily: FONT.SemiBold,
    fontSize: moderateScale(16),
  },
  bodyLink2: {
    fontFamily: FONT.SemiBold,
    fontSize: moderateScale(14),
  },
  buttonPrimary: {
    fontSize: moderateScale(16),
    fontFamily: FONT.Regular,
  },
  input: {
    fontSize: moderateScale(12),
    fontFamily: FONT.Regular,
  },
  caption: {
    fontFamily: FONT.Medium,
    fontSize: moderateScale(12),
  },
  overLine: {
    fontFamily: FONT.SemiBold,
    fontSize: moderateScale(10),
  },
});

const SIZES = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,

  wp_1: wp(1),
  wp_2: wp(2),
  wp_3: wp(3),
  wp_4: wp(4),
  wp_5: wp(5),
  wp_6: wp(6),
  wp_7: wp(7),
  wp_8: wp(8),
  wp_9: wp(9),
  wp_10: wp(10),
  wp_11: wp(11),
  wp_12: wp(12),
  wp_13: wp(13),
  wp_20: wp(20),
  wp_25: wp(25),
  wp_28: wp(28),
  wp_30: wp(30),
  wp_31: wp(31),
  wp_32: wp(32),
  wp_35: wp(35),
  wp_50: wp(50),

  wp_p15: wp(1.5),
  wp_p25: wp(2.5),

  hp_1: hp(1),
  hp_2: hp(2),
  hp_3: hp(3),
  hp_4: hp(4),
  hp_5: hp(5),
  hp_6: hp(6),
  hp_7: hp(7),
  hp_8: hp(8),
  hp_9: hp(9),
  hp_10: hp(10),
  hp_12: hp(12),
  hp_16: hp(16),

  hp_p05: hp(0.5),
  hp_p15: hp(1.5),
  hp_p175: hp(1.75),
  hp_p65: hp(6.5),

  flex_p1: 0.1,
  flex_p4: 0.4,
  flex_p6: 0.6,
  flex_1: 1,
  screenSpacingHorizontal: wp(5),

  inputRadius: 8,
  buttonRadius: 15,
};

export {
  ACTIVE_OPACITY,
  commonStyles,
  DARK_COLOR,
  iconSize,
  LIGHT_COLOR,
  SIZES,
  TEXT_STYLE,
};
