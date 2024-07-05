const express = require('express');
const { sql, poolPromise } = require('../config/db');
const general = require('../utill/general');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');

const companygovernancedataandanalyticsRoute =
  'companygovernancedataandanalytics';

router.post('/GetProvisionsList', authenticateToken, GetProvisionTreeList);
router.post(
  '/GetActivistNomineeOnBoard',
  authenticateToken,
  GetActivistNomineeOnBoard
);
router.post(
  '/GetStateOfIncorporation',
  authenticateToken,
  GetStateOfIncorporation
);
router.post(
  '/GetStateOfIncorporationdList',
  authenticateToken,
  GetStateOfIncorporationdList
);
router.post(
  '/GetGovernanceAdvSearchReq',
  authenticateToken,
  GetGovernanceAdvSearchReq
);

async function GetProvisionTreeList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetProvisionTreeList');
    const jsonProvisions = [];
    const unique = [
      ...new Set(result.recordset.map((item) => item.metric_group)),
    ];
    unique.map((e) => {
      {
        let labeltext;
        let Valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((person) => person.metric_group === e)
          .map((row) => {
            labeltext = row.metric_group;
            Valuetext = row.metric_group;
            jsonChildren.push({
              label: row.gov_metric_name,
              value: row.gov_metric_id,
              expanded: true,
            });
          });
        jsonProvisions.push({
          label: labeltext,
          value: Valuetext,
          children: jsonChildren,
          expanded: true,
        });
      }
    });

    res.json(jsonProvisions);
  } catch (error) {
    general.ErrorLog(
      `${companygovernancedataandanalyticsRoute}/GetProvisionTreeList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistNomineeOnBoard(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetActivistNomineeOnBoard');
    const recordfilter = [];
    const record = result.recordset;
    record.forEach((e) => {
      recordfilter.push({ value: e.activist_id, label: e.activist_name });
    });

    res.json(recordfilter);
  } catch (error) {
    general.ErrorLog(
      `${companygovernancedataandanalyticsRoute}/GetActivistNomineeOnBoard`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetStateOfIncorporationdList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetblStateName');
    const recordfilter = [];
    const record = result.recordset;
    record.forEach((e) => {
      recordfilter.push({ value: e.state_id, label: e.state_name });
    });

    res.json(recordfilter);
  } catch (error) {
    general.ErrorLog(
      `${companygovernancedataandanalyticsRoute}/GetStateOfIncorporationdList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetStateOfIncorporation(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetblStateName');
    res.json(result);
  } catch (error) {
    general.ErrorLog(
      `${companygovernancedataandanalyticsRoute}/GetStateOfIncorporation`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetGovernanceAdvSearchReq(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    let yesFinal = req.body.yesParameters;
    if (yesFinal !== null && yesFinal !== undefined) {
      const yesLastChar = yesFinal.lastIndexOf(',', yesFinal.length);
      if (yesLastChar === yesFinal.length - 1) {
        yesFinal = yesFinal.substring(
          0,
          yesFinal.lastIndexOf(',', yesFinal.length)
        );
      }
    }

    let notFinal = req.body.notParameters;
    if (notFinal !== null && notFinal !== undefined) {
      const notLastChar = notFinal.lastIndexOf(',', notFinal.length);
      if (notLastChar === notFinal.length - 1) {
        notFinal = notFinal.substring(
          0,
          notFinal.lastIndexOf(',', notFinal.length)
        );
      }
    }

    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.company_search_id)
      .input('StateOfIncorporation', sql.VarChar, req.body.StateOfIncorporation)
      .input('BoardSizeMin', sql.Int, req.body.BoardSizeMin)
      .input('BoardSizeMax', sql.Int, req.body.BoardSizeMax)
      .input(
        'PoisonPillOwnershipPcentMin',
        sql.Int,
        req.body.PoisonPillOwnershipPcentMin
      )
      .input(
        'PoisonPillOwnershipPcentMax',
        sql.Int,
        req.body.PoisonPillOwnershipPcentMax
      )
      .input(
        'PoisonPillExpiryDateMin',
        sql.VarChar,
        req.body.PoisonPillExpiryDateMin
      )
      .input(
        'PoisonPillExpiryDateMax',
        sql.VarChar,
        req.body.PoisonPillExpiryDateMax
      )
      .input('AvgDirectorTimeMin', sql.VarChar, req.body.AvgDirectorTimeMin)
      .input('AvgDirectorTimeMax', sql.VarChar, req.body.AvgDirectorTimeMax)
      .input('AvgDirectorAgeMin', sql.VarChar, req.body.AvgDirectorAgeMin)
      .input('AvgDirectorAgeMax', sql.VarChar, req.body.AvgDirectorAgeMax)
      .input('AnyDirectorTimeMin', sql.VarChar, req.body.AnyDirectorTimeMin)
      .input('FemaleDirPcentMin', sql.VarChar, req.body.FemaleDirPcentMin)
      .input('FemaleDirPcentMax', sql.VarChar, req.body.FemaleDirPcentMax)
      .input('NomineeActivists', sql.VarChar, req.body.NomineeActivists)
      .input('notParameters', sql.VarChar, notFinal)
      .input('yesParameters', sql.VarChar, yesFinal)
      .input('status', sql.Int, productStatus)
      .execute('GovernanceAdvSearch_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companygovernancedataandanalyticsRoute}/GetGovernanceAdvSearchReq`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
