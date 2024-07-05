const { sendMail, getHostEnviroment } = require('./sendmailUtil');
const {
  promiseRejectionErorLog,
  promiseRejectionErorLogSQL,
} = require('./mailTemplate');
const dateFormat = require('dateformat');
const jwt_decode = require('jwt-decode');

/**
 * Rename json key
 * @param {obj} object - json
 * @param {oldKey} string - old key value
 * @param {newKey} string - key value
 */
function RenameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

/**
 * Filter Unique from json
 * @param {json} object - json
 * @param {uniquekey} string - unique key name
 */
async function FilterUniqueFromJson(json, uniquekey) {
  var itemsObj = {};
  var itemsList = [];
  x = json;

  for (var i = 0; i < x.length; i++) {
    var item = x[i];
    if (!itemsObj[item[uniquekey]]) {
      itemsObj[item[uniquekey]] = item;
      itemsList.push(item);
    }
  }
  return await itemsList;
}

/**
 * Filter Unique from json
 * @param {string} route - string
 * @param {string} error - error message
 */
async function ErrorLog(route, error, user_id, body, host) {
  const environmental = getHostEnviroment(host);

  sendMail(
    'ict@insightia.com',
    `${environmental}: Promise Rejection Call Error`,
    promiseRejectionErorLog(route, error, user_id, body, host)
  );
}

async function ErrorLogSql(route, error, sql) {
  sendMail(
    'ict@insightia.com',
    'Dynamic SQL Rejection Call error',
    promiseRejectionErorLogSQL(route, error, sql)
  );
}

function CheckDecimal(inputtxt) {
  const decimal = /^[-+]?[0-9]+\.[0-9]+$/;
  if (inputtxt.match(decimal)) {
    return true;
  }
  return false;
}

function validateDeciNumberToPercentage(obj, columnName) {
  const objKeys = Object.keys(obj);
  objKeys.forEach((key) => {
    if (key === columnName) {
      if (Number(obj[key])) {
        if (CheckDecimal(obj[key])) {
          obj[key] = `${obj[key] * 100} %`;
        }
      }
    }
  });
}
function isNull(obj, key) {
  return obj[key] === null || obj[key] === undefined || obj[key] === 'null';
}
function validateNulltoEmptyString(obj) {
  const objKeys = Object.keys(obj);
  objKeys.forEach((key) => {
    if (isNull(obj, key)) {
      obj[key] = '';
    }
  });
}
function NumberFormatFn(objNumber) {
  if (objNumber !== null && objNumber !== undefined) {
    const nf = new Intl.NumberFormat();
    return nf.format(Math.round(objNumber));
  }
  return '';
}

const getClientAddress = (req) => {
  return (
    (req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for'] || '')
      .split(',')[0]
      .split(':')[0] || req.socket.localAddress.split(':').at(-1)
  );
};

const dateToNull = (date, format, isTrue) => {
  if (
    date !== null &&
    date !== undefined &&
    new Date(date) !== 'Invalid Date'
  ) {
    // return dateFormat(date, 'dd-mmm-yy', true);
    return dateFormat(
      Date.parse(date),
      format,
      isTrue !== null ? isTrue : true
    );
  } else {
    return null;
  }
};

const dateCorrection = (date) => {
  if (date.includes('+0') && !isNaN(date[6])) {
     return date.substring(2, 6) + date.substring(7);
  } else if (date.includes('+0')) {
     return date.substring(2);
  } else if (!isNaN(date[4])) {
     return date.substring(0, 4) + date.substring(5);
  } else {
     return date
  }
}

const TokenDecode = async (token) => {
  try {
    const tokenDecode = await jwt_decode(token);
    return await tokenDecode;
  } catch (e) {
    console.log('TokenDecode', e);
    return null;
  }
};

const TokenDecodeForProductStatus = async (token, product_id) => {
  try {
    const tokenDecode = await jwt_decode(token);
    const product = tokenDecode.MemberShip.filter(
      (x) => x.product_id === product_id
    )[0];
    return await product.status;
  } catch (e) {
    console.log('TokenDecodeForProductStatus', e);
    return null;
  }
};

module.exports = {
  RenameKey,
  FilterUniqueFromJson,
  ErrorLog,
  ErrorLogSql,
  getClientAddress,
  validateNulltoEmptyString,
  isNull,
  NumberFormatFn,
  validateDeciNumberToPercentage,
  CheckDecimal,
  dateToNull,
  TokenDecode,
  TokenDecodeForProductStatus,
  dateCorrection,
};
