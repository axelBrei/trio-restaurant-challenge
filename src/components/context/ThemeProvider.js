import React from 'react';
import VariablesContext from 'cssta/runtime/VariablesContext';
import {colors} from 'constants/style';

export const ThemeProvider = props => (
  <VariablesContext.Provider value={colors} {...props} />
);
