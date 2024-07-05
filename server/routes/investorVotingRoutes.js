const { json } = require('body-parser');
const express = require('express');
const dateFormat = require('dateformat');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const investorVotingRoutes = 'investorVoting-Route';

router.post('/GetDissidentVotingByInvestor', authenticateToken, GetDissidentVotingByInvestor);
router.post('/GetSupportByDissident', authenticateToken, GetSupportByDissident);
router.post('/GetProxyContestsChartData', authenticateToken, GetProxyContestsChartData);

async function GetDissidentVotingByInvestor(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_id', sql.Int, req.body.investorId)
      .input('start_date', sql.DateTime, req.body.startDate)
      .input('end_date', sql.DateTime, req.body.endDate)
      .input('Board_Control', sql.Int, req.body.desiredOutcome)
      .input('proponent', sql.VarChar, req.body.proponent)
      .input('proxy_winner', sql.Int, req.body.settlements)
      .input('iss_card', sql.Int, req.body.issCard)
      .input('gl_card_rec', sql.Int, req.body.glCard)
      .execute('proxy_insight..GetDissidentVoting_byInvestor_Insightia');

    let myResult = {};
    if (result.recordsets.length > 0) {
      function wordingFunc(d) {
        if (d === 'Man') {
          return 'Management';
        } else if (d === 'Dis All') {
          return 'Dissident';
        } else if (d === 'Dis Some') {
          return 'Some Dissident';
        } else {
          return d;
        }
      }
      const myUpdateJson = [];
      result.recordsets[0].forEach((e) => {
        myUpdateJson.push({
          ...e,
          meeting_date: general.dateToNull(e.meeting_date, 'dd-mmm-yy', true),
          proxy_session: general.dateToNull(
            new Date(e.meeting_date).setMonth(new Date(e.meeting_date).getMonth() + 6),
            'dd-mmm-yy',
            true
          ),
          Investor_vote: wordingFunc(e.Investor_vote),
          ISS_recommendation: wordingFunc(e.ISS_recommendation),
          GL_recommendation: wordingFunc(e.GL_recommendation),
        });
      });
      myResult = { ...myResult, VotingAtProxyContestsData: myUpdateJson };
    }

    if (result.recordsets.length > 1) {
      myResult = { ...myResult, VotingSummaryAtProxyContests: result.recordsets[1][0] };
    }

    res.json(myResult);
  } catch (error) {
    general.ErrorLog(
      `${investorVotingRoutes}/GetDissidentVotingByInvestor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetSupportByDissident(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_id', sql.Int, req.body.investorId)
      .input('start_date', sql.DateTime, req.body.startDate)
      .input('end_date', sql.DateTime, req.body.endDate)
      .input('Board_Control', sql.Int, req.body.desiredOutcome)
      .input('proponent', sql.VarChar, req.body.proponent)
      .input('proxy_winner', sql.Int, req.body.settlements)
      .input('iss_card', sql.Int, req.body.issCard)
      .input('gl_card_rec', sql.Int, req.body.glCard)
      .execute('proxy_insight..GetSupportByDissident_Insightia');

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${investorVotingRoutes}/GetSupportByDissident`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetProxyContestsChartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_id', sql.Int, req.body.investorId)
      .input('Board_Control', sql.Int, req.body.desiredOutcome)
      .input('proponent', sql.VarChar, req.body.proponent)
      .input('proxy_winner', sql.Int, req.body.settlements)
      .input('iss_card', sql.Int, req.body.issCard)
      .input('gl_card_rec', sql.Int, req.body.glCard)
      .execute('proxy_insight..sp_getproxyContestsChart_Insightia');

    const myJson = [];

    result.recordset.forEach((e) => {
      const total = e.Dissident + e.Management;
      myJson.push({
        ...e,
        Dissident: parseFloat(parseFloat((e.Dissident * 100) / total).toFixed(1)),
        Management: parseFloat(parseFloat((e.Management * 100) / total).toFixed(1)),
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${investorVotingRoutes}/GetProxyContestsChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
