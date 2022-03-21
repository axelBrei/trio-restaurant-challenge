import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultNavigationConfig} from 'constants/defaultNavigationConfig';
import {routes} from 'constants/routes';
import {LoadableHeaderTitle} from 'components/ui/LoadableHeaderTitle';

const {Navigator, Screen} = createNativeStackNavigator();

const Restaurants = () => {
  return (
    <Navigator screenOptions={defaultNavigationConfig}>
      <Screen
        name={routes.restaurantsListScreen}
        getComponent={() =>
          require('components/features/Restaurants/screens/RestaurantsListScreen')
            .default
        }
        initialParams={{
          restaurantId: '3280260097264200',
        }}
        options={({route}) => ({
          headerTitle: () => (
            <LoadableHeaderTitle restaurantId={route?.params?.restaurantId} />
          ),
        })}
      />
    </Navigator>
  );
};

export default Restaurants;
