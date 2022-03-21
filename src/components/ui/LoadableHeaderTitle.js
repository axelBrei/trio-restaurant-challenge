import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {AppText} from 'components/ui/AppText';
import {colors} from 'constants/style';
import {Dimensions, Platform} from 'react-native';
import {pxToRem} from 'utils/responsiveUtils';
import {useRestaurantsQuery} from 'hooks/queries/useRestaurantsQuery';

const {width} = Dimensions.get('window');
export const LoadableHeaderTitle = ({restaurantId}) => {
  const {data, isFetching} = useRestaurantsQuery(restaurantId, {
    enabled: false,
  });

  if (isFetching) {
    return (
      <ContentLoader
        boxSize={`0 0 ${width} 60`}
        width={width}
        height={pxToRem(60)}>
        <Rect
          width={Math.round(width / 2)}
          height={pxToRem(45)}
          x={Math.round(width / 4) - pxToRem(15)}
          y={Platform.OS === 'android' && 2}
          rx={pxToRem(10)}
          ry={pxToRem(10)}
        />
      </ContentLoader>
    );
  }
  return (
    <AppText size={26} color={colors.defaultTextColor}>
      {data?.restaurant_name?.toUpperCase()}
    </AppText>
  );
};
