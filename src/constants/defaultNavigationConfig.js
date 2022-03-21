import {pxToRem} from 'utils/responsiveUtils';
import {colors} from 'constants/style';

export const defaultNavigationConfig = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerStyle: {backgroundColor: 'white'},
  headerTitleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: pxToRem(26),
    color: colors.defaultTextColor,
  },
};
