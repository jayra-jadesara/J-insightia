const express = require('express');
const dateFormat = require('dateformat');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const general = require('../utill/general');
const { authenticateToken } = require('../utill/authUtil');

const votingRationaleRoute = 'votingRationale-Route';

router.post('/GetVotingRationale_byInvestor', authenticateToken, GetVotingRationale_byInvestor);

async function GetVotingRationale_byInvestor(req, res, next) {
  try {
    const myJson = [];

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetVotingRationale_byInvestor');
    const arr = result.recordset;

    const myJsonHeading = {
      date: 'Date',
      issuer: 'Company',
      no: 'No.',
      proposal: 'Proposal',
      proposal_type: 'Proposal Type',
      rationale: 'Rationale',
    };

    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        date: obj.meeting_date !== '' ? dateFormat(obj.meeting_date, 'dd-mmm-yyyy', true) : obj.meeting_date,
        issuer: obj.company_name,
        no: obj.proposal_number_orig,
        proposal: obj.proposal_detail,
        proposal_type: obj.proposal_type,
        rationale: obj.vote_reason,
        meeting_id: obj.meeting_id,
        proposal_id: obj.proposal_id,
      });
    });
    res.json({
      data: myJson,
      heading: myJsonHeading,
    });
  } catch (error) {
    general.ErrorLog(
      `${votingRationaleRoute}/GetVotingRationale_byInvestor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
