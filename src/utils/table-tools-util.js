import React from 'react';
import { NUMBER_FOUR, NUMBER_HUNDRED, NUMBER_THOUSAND, NUMBER_ZERO } from '../constants/NumberConstants';

// checks value is a number then sets it toFixed
export function checkValuesToFixed(value, fixedSize = 2) {
  // some values have double values within an array ([7.231,7.231])
  // this will send the first value into the function to get the output for the first entry of the array
  if (Array.isArray(value)) {
    if (value.length > NUMBER_ZERO) {
      return checkValuesToFixed(value[0], fixedSize);
    }
  }
  if (value === NUMBER_ZERO) {
    return value;
  }
  if (!value) {
    return '';
  }
  if (isNaN(value)) {
    return value;
  }
  if (value === null) {
    return null;
  }
  return Number(value).toFixed(fixedSize);
}

// checks that the value passed is a number then styles based upon positivity
export function setCellStyleFinancial(
  value,
  positiveColour = 'green',
  negativeColour = 'red',
  neutralColour = '#193d75'
) {
  if (!value || Number.isNaN(value)) {
    return { color: neutralColour };
  }
  if (value > NUMBER_ZERO) {
    return { color: positiveColour };
  }
  if (value < NUMBER_ZERO) {
    return { color: negativeColour };
  }
  return { color: neutralColour };
}

// checks that the value passed is a number then styles based upon condition.
export function setCellStyleProposalChange(
  value,
  dodgerColor = '#1E90FF',
  negativeColour = 'red',
  neutralColour = '#193d75'
  // positiveColour = 'green',
) {
  if (!value || Number.isNaN(value)) {
    return { color: neutralColour };
  }
  if (value >= NUMBER_ZERO) {
    return { color: dodgerColor };
  }
  if (value < NUMBER_ZERO) {
    return { color: negativeColour };
  }
  return { color: neutralColour };
}

// checks that the values passed are numbers, then styles based upon how they compare
export function setCellStyleFinancialComparison(
  firstValue,
  secondValue,
  positiveColour = 'green',
  negativeColour = 'red',
  neutralColour = '#193d75'
) {
  if (!firstValue || Number.isNaN(firstValue)) {
    return { color: neutralColour };
  }
  if (!secondValue || Number.isNaN(secondValue)) {
    return { color: neutralColour };
  }

  if (firstValue > secondValue) {
    return { color: positiveColour };
  }
  if (firstValue < secondValue) {
    return { color: negativeColour };
  }
  return { color: neutralColour };
}

// Turns a JSON into an array of Keys and vales
export const buildVerticleTable = (dataObject, table = '') => {
  const vertTable = [];
  Object.keys(dataObject).forEach((key) => {
    vertTable.push({
      key: keyNamePrettier(key, table),
      value: dataObject[key]
    });
  });
  return vertTable;
};

// Turns a JSON into an array of Keys and vales
export const buildFinancialSPPTable = (dataObject, table = '') => {
  const vertTable = [];
  let firstValue = 0;
  Object.keys(dataObject).forEach((key, i) => {
    if (i === NUMBER_ZERO) {
      firstValue = dataObject[key];
    }

    if (key.startsWith('Spacer')) {
      vertTable.push({ key: null, value: null, value2: null });
    } else if (i > NUMBER_FOUR && dataObject[key] !== null) {
      vertTable.push({
        key: keyNamePrettier(key, table),
        value: dataObject[key],
        value2: ((firstValue - dataObject[key]) / dataObject[key]) * NUMBER_HUNDRED
      });
    } else {
      vertTable.push({
        key: keyNamePrettier(key, table),
        value: dataObject[key],
        value2: null
      });
    }
  });
  return vertTable;
};

export const buildFinancialSPPTableHorizonatal = (dataObject) => {
  const horRow = {};
  let firstValue = 0;
  Object.keys(dataObject).forEach((key, i) => {
    if (i === 1) {
      firstValue = dataObject[key];
    }

    if (key.startsWith('Spacer')) {
      horRow[key] = null;
    } else if (i > NUMBER_FOUR && dataObject[key] !== null && !key.startsWith('row_heading')) {
      horRow[key] = ((firstValue - dataObject[key]) / dataObject[key]) * NUMBER_HUNDRED;
    } else {
      horRow[key] = null;
    }

    if (key.startsWith('row_heading')) {
      horRow[key] = 'Change';
    }
  });
  return [dataObject, horRow];
};

// looks at strings from the JSON Keys and pretties them up
const keyNamePrettier = (key, table) => {
  switch (key) {
    case 'return':
      return `${table !== '' ? `${table} ` : ''}Return`;
    case 'return_snp':
      return `S&P500 ${table !== '' ? `${table} ` : ''} Return`;
    case 'week_return':
      return `One-week ${table !== '' ? `${table} ` : ''} Return`;
    case 'week_return_snp':
      return `One-week S&P500 ${table !== '' ? `${table} ` : ''} Return`;
    case 'year_return':
      return `One-year ${table !== '' ? `${table} ` : ''} Return`;
    case 'year_return_snp':
      return `One-year S&P500 ${table !== '' ? `${table} ` : ''} Return`;
    case 'VCurr':
      return 'Current Price';
    case 'V12MHigh':
      return '12 Month High';
    case 'V12MLow':
      return '12 Month Low';
    case 'V1M':
      return '-1 Month';
    case 'V3M':
      return '-3 Months';
    case 'V6M':
      return '-6 Months';
    case 'V1Y':
      return '-12 Months';
    case 'V2Y':
      return '-2 Years';
    case 'V3Y':
      return '-3 Years';
    case 'latest_close_value':
      return `Latest Share Price ${table !== '' ? `${table} ` : ''}`;
    case 'close_on_announce':
      return `Price on Announcement ${table !== '' ? `${table} ` : ''}`;
    case 'Market_cap_at_announce':
      return `Market cap at Announcement ${table !== '' ? `${table} ` : ''}`;
    case 'campaign_end_date':
      return `End Date ${table !== '' ? `${table} ` : ''}`;
    case 'announce_date':
      return 'Announcement Date';
    case 'announce_method':
      return 'Announcement Method';
    default:
      return `${key
        .split('_')
        .join(' ')
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}`;
  }
};

// grid width ranges for Dates and Generic values
export const gridWidthDates = {
  minWidth: 150
};

export const gridWidthValues = {
  minWidth: 75,
  maxWidth: 110
};

export const gridWidthHealth = {
  minWidth: 50,
  maxWidth: 55
};

export const gridWidthValuesLrg = {
  minWidth: 125,
  maxWidth: 150
};

export const gridWidthValuesVLrg = {
  minWidth: 180,
  maxWidth: 250
};

export const gridWidthValuesSml = {
  minWidth: 60,
  maxWidth: 80
};

export const gridWidthLink = {
  minWidth: 65,
  maxWidth: 100
};

export const gridWidthReport = {
  minWidth: 150,
  maxWidth: 200
};

export const gridWidthValuesDigits = {
  minWidth: 200
};

export const gridWidthForDigits = {
  minWidth: 180,
  maxWidth: 180
};
export const gridWidthValuesForSml = {
  minWidth: 90,
  maxWidth: 90
};

export const gridWidthValuesXLrg = {
  minWidth: 290,
  maxWidth: 400
};

const dara = [11, 12];
export const dynamicHeader = [
  dara.filter(() => ({
    headerName: `${dara}`,
    field: `${dara}`,
    type: ['autoHeightTrue'],
    ...gridWidthDates
  }))
];

// divides the cells by 1000, unless there start Value is i.e EPS then return normally
export function formatCellEitherMillionsOrPercent(string, startCheck, value, shouldDivide = false) {
  if (!value) {
    return '';
  }
  if (Number.isNaN(Number(value))) {
    return value;
  }
  if (startCheck === false && shouldDivide === false) {
    return <div>{numberWithCommas(value)}</div>;
  }
  if (string.startsWith(startCheck)) {
    return <div>{value}</div>;
  }
  return <div>{numberWithCommas(value / NUMBER_THOUSAND)}</div>;
}

// divides the cells by 1000, unless there start Value is i.e EPS then return normally
// For Excel Downloading.
export function formatCellEitherMillionsOrPercentExcelDownload(string, startCheck, value, shouldDivide = false, isTofixed = false) {
  if (!value) {
    return '';
  }
  if (Number.isNaN(Number(value))) {
    return value;
  }
  if (startCheck === false && shouldDivide === false) {
    return numberWithCommas(value);
  }
  if (string.startsWith(startCheck)) {
    return value;
  }
  if (isTofixed) {
    return numberWithCommas((value / NUMBER_THOUSAND).toFixed());
  }
  return numberWithCommas(value / NUMBER_THOUSAND);
}

// adds commas to style the numbers into a more readable manner like: 1,000,000
export function numberWithCommas(n) {
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

export const numberToCommaString = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function numberWithCommasHandleNulls(n) {
  if (!n) {
    return '';
  }
  if (Number.isNaN(Number(n))) {
    return n;
  }
  const arrDecimal = n.toString().split('.');
  const predecimal = arrDecimal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const postdecimal = arrDecimal[1] ? `.${arrDecimal[1]}` : '';

  return predecimal + postdecimal;
}

export default {
  checkValuesToFixed,
  setCellStyleFinancial,
  setCellStyleFinancialComparison,
  setCellStyleProposalChange,
  gridWidthValues,
  gridWidthValuesDigits,
  gridWidthDates,
  gridWidthLink,
  buildVerticleTable,
  gridWidthReport,
  gridWidthValuesXLrg,
  buildFinancialSPPTable,
  formatCellEitherMillionsOrPercent,
  formatCellEitherMillionsOrPercentExcelDownload,
  numberWithCommas,
  buildFinancialSPPTableHorizonatal,
  numberToCommaString
};

export const greyBackgroudForNull = (param) => {
  if (param === null) {
    return { backgroundColor: '#d4d4d4', border: '2px solid white' };
  }
};

export const positiveOrNegative = (param) => {
  if (param > 0) {
    return { backgroundColor: 'green', color: 'white', border: '2px solid white' };
  }
  if (param < 0) {
    return { backgroundColor: 'red', color: 'white', border: '2px solid white' };
  }
};
