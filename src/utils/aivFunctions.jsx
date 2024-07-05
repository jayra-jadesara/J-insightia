import React from 'react';
import { HEALTHCHECK_VALUE } from '../constants/ActivistInsightsVulnerabilityConstant';
import { RED_FLAG_LARGE, GREEN_FLAG_LARGE } from '../constants/PathsConstant';
import { NUMBER_ZERO, NUMBER_ONE } from '../constants/NumberConstants';

export const exclaimImageWarn = (
  <div className='text-center'>
    <img src={`${window.location.origin}${RED_FLAG_LARGE}`} alt='Warn' height='20' />
  </div>
);
export const exclaimImage = 'Warn';

export const healthyImageHealthy = (
  <div className='text-center'>
    <img src={`${window.location.origin}${GREEN_FLAG_LARGE}`} alt='Healthy' height='20' />
  </div>
);
export const healthyImage = 'Healthy';

export const noDivImage = <div> </div>;
export const noImage = 'No Flag';

// no need to rename the arguments as you can call it in the fuction call in the table
export function calculateHealth(val, med, madm, mult, bothSides = false, adjust = HEALTHCHECK_VALUE, warn_lower = 0) {
  if (val === undefined || med === undefined) {
    return noImage;
  }

  if (val === null || med === null) {
    return noImage;
  }

  if (bothSides && (val < med - madm * adjust * mult || val > med + madm * adjust * mult)) {
    return exclaimImage;
  }

  if (!bothSides && warn_lower === NUMBER_ZERO && val > med + madm * adjust * mult) {
    return exclaimImage;
  }

  if (!bothSides && warn_lower === NUMBER_ONE && val < med - madm * adjust * mult) {
    return exclaimImage;
  }

  return healthyImage;
}

export function DisplayFlagsByName(data) {
  if (data === 'Warn') {
    return exclaimImageWarn;
  }
  if (data === 'Healthy') {
    return healthyImageHealthy;
  }
  if (data === 'No Flag') {
    return noDivImage;
  }
  return noDivImage;
}

export default {
  calculateHealth,
  exclaimImage,
  noImage,
  healthyImage,
  DisplayFlagsByName
};
