import {Dimensions, PixelRatio} from 'react-native';

/**
 * Calculates the Relative unit (rem) that will be used throughout the styling
 * of the whole application. It's based on some common heuristics.
 *
 * PhM      -> Phone Magic: Good constant number for phones.
 * TaWidth  -> Tablet Width: Good avg for 3:4 tablets.
 * MSW      -> Multiplier Starting Width: Multiplier starts to affect rem after this width.
 * MSV      -> Multiplier Starting Value: Value in which multiplier affects rem.
 * MTV      -> Multiplier Target Value: Value the multiplier will have when `TaWidth` is reached.
 *
 * @param {object} width/height - Screen dimensions
 * @returns {number} - REM unit for this device
 */
export const getRemSize = ({width} = Dimensions.get('window')) => {
  const PhM = 380;
  const TaWidth = 850;
  const MSW = 375;
  // In order to use the same sizes than the design i choose MSV=0.8 instead of 1
  // to adjust the styles
  const MSV = 0.8;
  const MTV = 0.5;

  let remValue = width / PhM;

  if (width > MSW) {
    const multiplier = ((width - MSW) / (TaWidth - MSW)) * (MTV - MSV) + MSV; // Linear eq
    remValue = remValue * multiplier;
  }

  return remValue;
};

export const pxToRem = size =>
  PixelRatio.roundToNearestPixel(size * getRemSize());
