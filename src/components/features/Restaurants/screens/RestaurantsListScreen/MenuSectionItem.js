import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity, View} from 'react-native';
import cssta from 'cssta/native';
import {pxToRem} from 'utils/responsiveUtils';
import {AppText} from 'components/ui/AppText';
import PropTypes from 'prop-types';

export const MenuSectionItem = ({selected, onSelect, section_name, index}) => {
  const scaleX = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleX: scaleX.value}],
    };
  });

  useEffect(() => {
    if (selected) {
      scaleX.value = withSpring(1);
    } else {
      scaleX.value = withTiming(0);
    }
  }, [selected, scaleX]);

  return (
    <Container onPress={onSelect}>
      <LabelContainer>
        <AppText center size={22}>
          {section_name?.toUpperCase()}
        </AppText>
      </LabelContainer>

      <SelectedSeparator style={rStyle} />
    </Container>
  );
};

MenuSectionItem.defaultProps = {
  selected: false,
  section_name: '',
};

MenuSectionItem.propTypes = {
  selected: PropTypes.bool,
  section_name: PropTypes.string,
};

const Container = cssta(TouchableOpacity)`
  height: ${pxToRem(80)}px;
  padding: 0px ${pxToRem(16)}px 0;
  justify-content: center;
`;

const SelectedSeparator = cssta(Animated.View)`
  height: ${pxToRem(3)}px;
  background-color: var(--defaultTextColor);
`;

const LabelContainer = cssta(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
