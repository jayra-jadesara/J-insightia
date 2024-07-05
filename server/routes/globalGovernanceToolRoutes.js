/* eslint-disable no-var */
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const globalGovernanceToolRoute = 'globalGovernanceToolRoute';

router.post(
  '/getGlobalGovProvisionList',
  authenticateToken,
  getGlobalGovProvisionList
);
router.post('/getCountryGovList', authenticateToken, getCountryGovList);
router.post('/getStateGovList', authenticateToken, getStateGovList);
router.post('/getStateGovDetailList', authenticateToken, getStateGovDetailList);

async function getGlobalGovProvisionList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetGlobalGovProvision');
    const myJson = [];

    result.recordsets.length > 0 &&
      result.recordsets[0].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );

    result.recordsets.length > 0 &&
      result.recordsets[1].forEach((element) => {
        myJson.push({
          value: element.id,
          label: element.name,
        });
      });
    res.json({
      summaryData: result.recordsets.length > 0 ? result.recordsets[0] : [],
      countryData: myJson,
    });
  } catch (error) {
    general.ErrorLog(
      `${globalGovernanceToolRoute}/getGlobalGovProvisionList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getCountryGovList(req, res, next) {
  try {
    const pool = await poolPromise;

    const resultCountryProfile = await pool
      .request()
      .input('country_id', sql.Int, req.body.country_id)
      .execute('GetCountryByID');
    const resultGetCountryGov = await pool
      .request()
      .input('Country_ID', sql.Int, req.body.country_id)
      .execute('GetCountryGov');

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[1].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[2].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[3].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[4].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[5].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[6].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[7].forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    //

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[2].forEach((element) =>
        general.validateDeciNumberToPercentage(element, 'number_global')
      );

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[3].forEach((element) =>
        general.validateDeciNumberToPercentage(element, 'number_global')
      );

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[4].forEach((element) =>
        general.validateDeciNumberToPercentage(element, 'number_global')
      );

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[5].forEach((element) =>
        general.validateDeciNumberToPercentage(element, 'number_global')
      );

    resultGetCountryGov.recordsets.length > 0 &&
      resultGetCountryGov.recordsets[6].forEach((element) =>
        general.validateDeciNumberToPercentage(element, 'number_global')
      );

    res.json({
      countryProfileDetails: resultCountryProfile.recordset,
      overviewDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[0].length > 0
          ? resultGetCountryGov.recordsets[0][0].Overview
          : [],
      documentsDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[1].length > 0
          ? resultGetCountryGov.recordsets[1]
          : [],
      boardDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[2].length > 0
          ? resultGetCountryGov.recordsets[2]
          : [],
      votingDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[3].length > 0
          ? resultGetCountryGov.recordsets[3]
          : [],
      generalGovDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[4].length > 0
          ? resultGetCountryGov.recordsets[4]
          : [],
      shareholderActDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[5].length > 0
          ? resultGetCountryGov.recordsets[5]
          : [],
      govTakeoverDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[6].length > 0
          ? resultGetCountryGov.recordsets[6]
          : [],
      provisionDetails:
        resultGetCountryGov.recordsets.length > 0 &&
        resultGetCountryGov.recordsets[7].length > 0
          ? resultGetCountryGov.recordsets[7]
          : [],
    });
  } catch (error) {
    general.ErrorLog(
      `${globalGovernanceToolRoute}/getCountryGovList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getStateGovList(req, res, next) {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input('filterType', sql.VarChar, req.body.filterType)
      .execute('Get_State_Governance');
    result.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    res.json({
      stateGovDetails: result.recordset,
    });
  } catch (error) {
    general.ErrorLog(
      `${globalGovernanceToolRoute}/getStateGovList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getStateGovDetailList(req, res, next) {
  try {
    const pool = await poolPromise;

    const resultStateGovDetail = await pool
      .request()
      .input('State_Name', sql.VarChar, req.body.stateName)
      .execute('Get_State_Governance_Details');

    const sp500 =
      resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[0].length > 0
        ? resultStateGovDetail.recordsets[0][0].sp500
        : '';
    const sp500_pcent =
      resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[0].length > 0
        ? `${resultStateGovDetail.recordsets[0][0].sp500_pcent.toFixed(2)} %`
        : '';
    const russ3000 =
      resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[0].length > 0
        ? resultStateGovDetail.recordsets[0][0].russ3000
        : '';
    const russ3000_pcent =
      resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[0].length > 0
        ? `${resultStateGovDetail.recordsets[0][0].russ3000_pcent.toFixed(2)} %`
        : '';

    function validateNumberToAddPercentage(obj, columnName) {
      const objKeys = Object.keys(obj);
      objKeys.forEach((key) => {
        if (key === columnName) {
          if (Number(obj[key])) {
            obj[key] = `${obj[key]}%`;
          }
        }
      });
    }
    function validateNumberToAddYearLable(obj, columnName) {
      const objKeys = Object.keys(obj);
      objKeys.forEach((key) => {
        if (key === columnName) {
          if (Number(obj[key])) {
            obj[key] = `${obj[key]} years`;
          }
        }
      });
    }
    function digitToYesNo(obj, columnName) {
      const objKeys = Object.keys(obj);
      objKeys.forEach((key) => {
        if (key === columnName) {
          if (obj[key] === 1) {
            obj[key] = 'Yes';
          } else {
            obj[key] = 'No';
          }
        }
      });
    }

    resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[1].forEach((element) => {
        general.validateNulltoEmptyString(element);
        validateNumberToAddPercentage(element, 'number');
        digitToYesNo(element, 'yes_no');
      });
    resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[2].forEach((element) => {
        general.validateNulltoEmptyString(element);
        validateNumberToAddPercentage(element, 'number');
        digitToYesNo(element, 'yes_no');
      });
    resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[3].forEach((element) => {
        general.validateNulltoEmptyString(element);
        validateNumberToAddPercentage(element, 'number');
        digitToYesNo(element, 'yes_no');
      });
    resultStateGovDetail.recordsets.length > 0 &&
      resultStateGovDetail.recordsets[4].forEach((element) => {
        general.validateNulltoEmptyString(element);
        if (element.Voting === 'Business Combination') {
          validateNumberToAddYearLable(element, 'number');
        } else {
          validateNumberToAddPercentage(element, 'number');
        }
        digitToYesNo(element, 'yes_no');
      });

    res.json({
      descDetails: [
        {
          sp500,
          sp500_pcent,
          russ3000,
          russ3000_pcent,
        },
      ],
      boardDetails:
        resultStateGovDetail.recordsets.length > 0 &&
        resultStateGovDetail.recordsets[1].length > 0
          ? resultStateGovDetail.recordsets[1]
          : [],
      shareholderDetails:
        resultStateGovDetail.recordsets.length > 0 &&
        resultStateGovDetail.recordsets[2].length > 0
          ? resultStateGovDetail.recordsets[2]
          : [],
      votingDetails:
        resultStateGovDetail.recordsets.length > 0 &&
        resultStateGovDetail.recordsets[3].length > 0
          ? resultStateGovDetail.recordsets[3]
          : [],
      mnDetails:
        resultStateGovDetail.recordsets.length > 0 &&
        resultStateGovDetail.recordsets[4].length > 0
          ? resultStateGovDetail.recordsets[4]
          : [],
    });
  } catch (error) {
    general.ErrorLog(
      `${globalGovernanceToolRoute}/getStateGovDetailList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
