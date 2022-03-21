import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Dimensions, FlatList, PixelRatio, View} from 'react-native';
import cssta from 'cssta/native';
import {pxToRem} from 'utils/responsiveUtils';
import {MenuSectionItem} from 'components/features/Restaurants/screens/RestaurantsListScreen/MenuSectionItem';
import ContentLoader, {Rect} from 'react-content-loader/native';

const {width} = Dimensions.get('window');
export const MenuSectionsSelector = ({
  selectedSectionIndex,
  onSelectItem,
  menuSections = [],
  loading = false,
  menuSectionsTranslateX,
}) => {
  const listRef = useRef(null);

  const mappedList = useMemo(
    () =>
      menuSections
        .map(i => i?.section_name)
        .slice(0, selectedSectionIndex)
        .join(' '),
    [menuSections, selectedSectionIndex],
  );

  useEffect(() => {
    const {section_name = ''} = menuSections?.[selectedSectionIndex] || {};
    const charWidth = pxToRem(12) * PixelRatio.getFontScale();
    let offset = Math.round(
      mappedList.length * charWidth + // offset counting characters
        pxToRem(20) * 2 * selectedSectionIndex, // both side padding
    );
    if (selectedSectionIndex > 2) {
      offset += section_name.length * charWidth; // current section
    }

    listRef.current?.scrollToOffset({
      offset: selectedSectionIndex === 0 ? 0 : offset,
      animated: true,
    });
  }, [mappedList.length, menuSections, selectedSectionIndex]);

  return (
    <Container>
      {loading ? (
        <ContentLoader
          viewBox={`0 0 ${width} ${pxToRem(80)}`}
          width={width}
          height={pxToRem(80)}>
          <Rect
            height={pxToRem(40)}
            width={width * 0.33}
            y={pxToRem(20)}
            x={pxToRem(16)}
            ry={pxToRem(10)}
            rx={pxToRem(10)}
          />
          <Rect
            height={pxToRem(40)}
            width={width * 0.33}
            y={pxToRem(20)}
            x={pxToRem(32 + width * 0.4)}
            ry={pxToRem(10)}
            rx={pxToRem(10)}
          />
          <Rect
            height={pxToRem(40)}
            width={width * 0.33}
            y={pxToRem(20)}
            x={pxToRem(48 + width * 0.4 * 2)}
            ry={pxToRem(10)}
            rx={pxToRem(10)}
          />
        </ContentLoader>
      ) : (
        <FlatList
          ref={listRef}
          keyExtractor={(item, index) => `menuSections-${item.name}-${index}`}
          horizontal
          data={menuSections}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <MenuSectionItem
              onSelect={() => onSelectItem(index)}
              selected={selectedSectionIndex === index}
              {...item}
            />
          )}
        />
      )}

      <Divider />
    </Container>
  );
};

const Container = cssta(View)`
  width: 100%;
`;

const Divider = cssta(View)`
  background-color: var(--darkSeparator);
  max-height: 1px;
  height: 1px;
  margin: 0 30px;
`;
