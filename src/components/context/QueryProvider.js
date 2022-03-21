import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {createAsyncStoragePersistor} from 'react-query/createAsyncStoragePersistor-experimental';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 2 * 60 * 60 * 1000, // 2 hours
      staleTime: Infinity,
    },
  },
});

const persistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
  key: 'RestaurantMenu',
});

persistQueryClient({
  queryClient,
  persistor,
  maxAge: Infinity,
});

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

export const QueryProvider = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
