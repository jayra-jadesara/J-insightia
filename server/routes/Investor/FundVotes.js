const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const FundVotes = 'FundVotes';

router.post('/GetVotedByManagerList', authenticateToken, GetVotedByManagerList);

async function GetVotedByManagerList(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight..GetVotedByManagerList');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${FundVotes}/GetVotedByManagerList`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
