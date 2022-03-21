import React from 'react';
import {Text, PixelRatio} from 'react-native';
import {pxToRem} from 'utils/responsiveUtils';
import {colors} from 'constants/style';
import PropTypes from 'prop-types';

export const AppText = ({style, size, primary, center, color, ...props}) => {
  const fontSize = pxToRem(size) * PixelRatio.getFontScale();
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: primary
            ? 'Montserrat-Regular'
            : 'PlayfairDisplay-Regular',
          fontSize,
          lineHeight: fontSize + pxToRem(5),
          color,
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
    />
  );
};

AppText.defaultProps = {
  primary: true,
  center: false,
  style: null,
  size: 16,
  color: colors.defaultTextColor,
};
AppText.propTypes = {
  primary: PropTypes.bool,
  center: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};
