import React from 'react';
import cssta from 'cssta/native';
import {AppText} from 'components/ui/AppText';
import {View} from 'react-native';
import {pxToRem} from 'utils/responsiveUtils';
import {colors} from 'constants/style';

export const MenuItem = ({name, description, price}) => {
  return (
    <Container>
      <AppText center primary={false} size={48}>
        {name}
      </AppText>
      {!!description && (
        <DescriptionText center size={30} color={colors.grayText}>
          {description}
        </DescriptionText>
      )}
      <PriceText center size={22}>
        $ {price}
      </PriceText>
    </Container>
  );
};

const Container = cssta(View)`
  padding: ${pxToRem(30)}px;
  align-items: center;
  justify-content: center;
  margin: ${pxToRem(55)}px 0;
`;

const DescriptionText = cssta(AppText)`
  margin-top: ${pxToRem(20)}px;
`;

const PriceText = cssta(AppText)`
  margin-top: ${pxToRem(30)}px;
`;
