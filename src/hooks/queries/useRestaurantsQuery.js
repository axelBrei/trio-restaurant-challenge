import {useQuery, useQueryClient} from 'react-query';
import Documenu from 'documenu';
import mock from 'constants/mockRestaurant.json';

export const useRestaurantsQuery = (restaurantId = {}, options = {}) => {
  const qc = useQueryClient();

  const query = useQuery(
    `restaurants-${restaurantId}`,
    () =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(reject, 3000, 'TIMEOUT');
        Documenu.Restaurants.get(restaurantId).then(response => {
          clearTimeout(timeout);

          if (!response) reject('NO_DATA');
          resolve(response?.result);
        });
      }),
    {
      ...options,
      staleTime: Infinity,
      retry: 1,
      cacheTime: 2 * 60 * 60 * 1000, // 2 hours,
      onError: err => {
        if (err === 'NO_DATA') {
          // This is only because the Documenu api is down since 03/16/2022
          // And the application should show data
          // This will trigger unnecessary renders
          qc.setQueryData(`restaurants-${restaurantId}`, mock);
          return options?.onSuccess?.(mock);
        }
        options?.onError?.(err);
      },
    },
  );

  return query;
};
