const dateFormat = require('dateformat');
const { json } = require('body-parser');

const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const advisorRoute = 'advisorRoute';
const { func } = require('prop-types');

router.post('/getAdvisorSearchData', authenticateToken, getAdvisorSearchData);
router.post('/getAdvisorProfile', authenticateToken, getAdvisorProfile);
router.post('/getAdvisorModuleAccessData', authenticateToken, getAdvisorModuleAccessData);
router.post('/getAdvisorActivismCompanyWebsite', authenticateToken, getAdvisorActivismCompanyWebsite);
router.post('/getAdvisorActivismPersonnel', authenticateToken, getAdvisorActivismPersonnel);
router.post('/getAdvisorActivismCampaigns', authenticateToken, getAdvisorActivismCampaigns);
router.post('/getAdvisorActivistShortCampaigns', authenticateToken, getAdvisorActivistShortCampaigns);
router.post('/getIntermediaryData', authenticateToken, getIntermediaryData);
router.post('/getAdvisorVotingDetailInfo', authenticateToken, getAdvisorVotingDetailInfo);
router.post('/getAdvisorVotingWindandInstrByYear', authenticateToken, getAdvisorVotingWindandInstrByYear);
router.post('/getLawFirmProposalTypes', authenticateToken, getLawFirmProposalTypes);

async function getAdvisorSearchData(req, res, next) {
  try {
    if (req.body.searchName !== '') {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('name', sql.VarChar, req.body.searchName)
        .input('quicksearch', sql.Int, req.body.quicksearch)
        .execute('activist_insight.dbo.GetAdviserSearchData');
      res.json(result.recordset);
    }
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getAdvisorSearchData`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function getAdvisorProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.AdmGetCompanyProfile');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getAdvisorProfile`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function getAdvisorModuleAccessData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.AdvisorModuleOptions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getAdvisorModuleAccessData`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function getAdvisorActivismCompanyWebsite(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.GetAdvisorActivismWebsite');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advisorRoute}/getAdvisorActivismCompanyWebsite`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getAdvisorActivismPersonnel(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.ListAdvisorActivismPersonnel');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advisorRoute}/getAdvisorActivismPersonnel`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getAdvisorActivismCampaigns(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.GetAdvisorActivism_Campaigns');
    let Arr = result.recordset;
    await Arr.forEach((d) => {
      if (d.acting_for === 'Activist') {
        d.acting_for = 'Investor';
      } else if (d.acting_for === 'Issuer') {
        d.acting_for = 'Company';
      }
    });
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advisorRoute}/getAdvisorActivismCampaigns`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getAdvisorActivistShortCampaigns(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.GetAdvisorActivistShort_Campaigns');
    let Arr = result.recordset;
    await Arr.forEach((d) => {
      if (d.acting_for === 'Activist') {
        d.acting_for = 'Investor';
      } else if (d.acting_for === 'Issuer') {
        d.acting_for = 'Company';
      }
    });
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advisorRoute}/getAdvisorActivistShortCampaigns`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getIntermediaryData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('activist_insight.dbo.GetIntermediaryData');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getIntermediaryData`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function getAdvisorVotingDetailInfo(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('LF_id', sql.Int, req.body.intermediaryId)
      .input('companyid', sql.Int, req.body.companyid)
      .execute('proxy_insight.dbo.GetLaw_FirmDetailInfo');
    let resultArr = result.recordsets;
    let MaxValue;
    const sumArr = [];
    keys = ['exclusions_approved', 'exclusions_denied', 'proponent_withdrew'];
    if (resultArr !== undefined && resultArr.length > 3) {
      let secRule = resultArr[1];
      let InstructionData = resultArr[3];
      await InstructionData.map((e) => {
        if (e.SEC_Rule_1 == e.SEC_Rule_2) {
          e.no_actionrules = e.SEC_Rule_1;
        } else {
          e.no_actionrules = (e.SEC_Rule_1 ? e.SEC_Rule_1 : '') + ' ' + (e.SEC_Rule_2 ? e.SEC_Rule_2 : '');
        }
      });
      await secRule.map((e) => {
        let sum = 0;
        keys.map((k) => {
          sum += e[k];
        });
        sumArr.push(sum);
      });
      MaxValue = sumArr.sort((a, b) => b - a)[0];
      await secRule.map((e) => {
        keys.map((k) => {
          e[k] = (e[k] / MaxValue) * 100;
        });
      });
    }

    res.json(resultArr);
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getAdvisorVotingDetailInfo`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function getAdvisorVotingWindandInstrByYear(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('proxy_insight.dbo.GetLawFirmWindandInstrByYear_insightia');
    let current_year = new Date().getFullYear();
    await result.recordset.map((e) => {
      if (e['ActYear'] === current_year) {
        e['ActYear'] = e['ActYear'].toString() + ' YTD';
      }
    });
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advisorRoute}/getAdvisorVotingWindandInstrByYear`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getLawFirmProposalTypes(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('proxy_insight.dbo.GetLawFirmProposalTypes');
    const myJson = [];
    result.recordsets[0].forEach((e) => {
      if (e.Proposal_Type_ID === -1) {
        const otherValStr = [];
        result.recordsets[1].forEach((otherEle) => {
          otherValStr.push(`<br/>${otherEle.total_percentage.toFixed(2)}% ${otherEle.proposal_type}`);
        });
        myJson.push({ text: otherValStr.join(), value: e.totalproposals });
      } else {
        myJson.push({ text: e.proposal_type, value: e.totalproposals });
      }
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(`${advisorRoute}/getLawFirmProposalTypes`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
