import React, {useCallback, useEffect, useState} from 'react';
import {useRestaurantsQuery} from 'hooks/queries/useRestaurantsQuery';
import {Dimensions, View} from 'react-native';
import cssta from 'cssta/native';
import {pxToRem} from 'utils/responsiveUtils';
import {MenuSectionsSelector} from 'components/features/Restaurants/screens/RestaurantsListScreen/MenuSectionsSelector';
import {useRoute} from '@react-navigation/native';
import {MenuItemsList} from 'components/features/Restaurants/screens/RestaurantsListScreen/MenuItemsList';
import Animated from 'react-native-reanimated';
import {AppText} from 'components/ui/AppText';
import {useScrollAnimation} from 'components/features/Restaurants/screens/RestaurantsListScreen/useScrollAnimation';

const {width} = Dimensions.get('window');
const RestaurantsListScreen = () => {
  const {params} = useRoute();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const {data, isFetching, status} = useRestaurantsQuery(params?.restaurantId);
  const {scrollHandler, listRef, dividerRStyle, rStyle} = useScrollAnimation();

  const onSelectNewItem = useCallback(
    index => {
      setSelectedSectionIndex(index);
      listRef.current?.scrollTo({
        y: 0,
        x: index * width,
      });
    },
    [listRef, setSelectedSectionIndex],
  );

  const onEndDragMenuItemsList = useCallback(
    ({nativeEvent}) => {
      const index = Math.round(nativeEvent?.contentOffset?.x / width);
      setSelectedSectionIndex(index);
    },
    [setSelectedSectionIndex],
  );

  return (
    <ScreenContainer>
      <Animated.View style={[{overflow: 'hidden'}, rStyle]}>
        <AppText
          size={26}
          style={{
            height: pxToRem(26),
            marginTop: pxToRem(75),
            marginBottom: pxToRem(45),
          }}>
          MENU
        </AppText>
      </Animated.View>
      <Divider style={dividerRStyle} />
      <MenuSectionsSelector
        menuSections={data?.menus?.[0]?.menu_sections}
        selectedSectionIndex={selectedSectionIndex}
        onSelectItem={onSelectNewItem}
        listRef={listRef}
        loading={isFetching}
      />
      <MenuItemsList
        loading={isFetching}
        listRef={listRef}
        onScrollItemsList={scrollHandler}
        onEndDrag={onEndDragMenuItemsList}
        menuSections={data?.menus?.[0]?.menu_sections}
      />
    </ScreenContainer>
  );
};
export default RestaurantsListScreen;

const ScreenContainer = cssta(View)`
  flex: 1;
  background-color: var(--bgColor);
  align-items: center;
  border-top-width: 1px;
  border-color: var(--lightSeparator);
`;

const Divider = cssta(Animated.View)`
  background-color: var(--darkSeparator);
  max-height: 1px;
  height: 1px;
  width: ${width - 60}px;
`;
