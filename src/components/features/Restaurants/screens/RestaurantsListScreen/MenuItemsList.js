import React, {useCallback} from 'react';
import cssta from 'cssta/native';
import PropTypes from 'prop-types';
import {MenuItem} from 'components/features/Restaurants/screens/RestaurantsListScreen/MenuItem';
import {FlatList, Dimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {pxToRem} from 'utils/responsiveUtils';

const {width, height} = Dimensions.get('window');
export const MenuItemsList = ({
  menuSections,
  listRef,
  onEndDrag,
  onScrollItemsList,
  loading,
}) => {
  const getMenuItemLayout = useCallback((item, index) => {
    let length = pxToRem(110 + 60 + 30 + 53 + 27);
    if (item.description) {
      length += pxToRem(20 + 35);
    }
    return {
      index,
      offset: length * index,
      length,
    };
  }, []);

  if (loading) {
    return (
      <ContentLoader
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}>
        <Rect
          height={height * 0.4}
          width={width - pxToRem(60)}
          x={pxToRem(30)}
          y={pxToRem(55)}
          rx={pxToRem(10)}
          ry={pxToRem(10)}
        />
        <Rect
          height={height * 0.4}
          width={width - pxToRem(60)}
          x={pxToRem(30)}
          y={height * 0.4 + pxToRem(75)}
          rx={pxToRem(10)}
          ry={pxToRem(10)}
        />
      </ContentLoader>
    );
  }
  return (
    <Animated.ScrollView
      ref={listRef}
      horizontal
      onScrollEndDrag={onEndDrag}
      scrollEventThrottle={16}
      bounces={false}
      pagingEnabled
      overScrollMode="never"
      nestedScrollEnabled
      getItemLayout={(data, index) => ({
        index,
        length: width,
        offset: width * index,
      })}
      showsHorizontalScrollIndicator={false}>
      {menuSections?.map((item, index) => (
        <ItemsList
          key={`menuSectionItems-${index}`}
          maxToRenderPerBatch={7}
          keyExtractor={(item, index) => `menuItems-${item.name}-${index}`}
          onScroll={onScrollItemsList}
          data={item?.menu_items || []}
          ItemSeparatorComponent={ItemSeparator}
          showsVerticalScrollIndicator={false}
          renderItem={({item: menuItem}) => <MenuItem {...menuItem} />}
          getItemLayout={getMenuItemLayout}
        />
      ))}
    </Animated.ScrollView>
  );
};

MenuItemsList.defaultProps = {
  data: [],
};
MenuItemsList.propTypes = {
  data: PropTypes.array.isRequired,
};

const ItemsList = cssta(Animated.FlatList)`
  width: 100vw;
`;

const ItemSeparator = cssta(View)`
  flex: 1;
  height: 1px;
  background-color: var(--lightSeparator);
  margin: 0 ${pxToRem(55)}px;
`;
