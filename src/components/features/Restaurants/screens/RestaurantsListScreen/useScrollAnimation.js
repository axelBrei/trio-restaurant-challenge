import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  withSpring,
} from 'react-native-reanimated';
import {pxToRem} from 'utils/responsiveUtils';

const menuTotalSize = pxToRem(146);

export const useScrollAnimation = () => {
  const listRef = useAnimatedRef();
  const titleHeight = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const _height = interpolate(
      titleHeight.value,
      [0, 100],
      [menuTotalSize, 0],
      Animated.Extrapolate.CLAMP,
    );
    return {height: _height};
  });

  const dividerRStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      titleHeight.value,
      [0, 100],
      [1, 0],
      Animated.Extrapolate.CLAMP,
    );
    return {opacity: opacity};
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      titleHeight.value = withSpring(event.contentOffset.y);
    },
  });

  return {
    titleHeight,
    listRef,
    rStyle,
    dividerRStyle,
    scrollHandler,
  };
};
