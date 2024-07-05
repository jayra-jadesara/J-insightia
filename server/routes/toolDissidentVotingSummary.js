const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolDissidentVotingSummary';

router.post('/DissidentVotteFiltersLimitedData', authenticateToken, DissidentVotteFiltersLimitedData);
router.post('/DissidentVotteFilters', authenticateToken, DissidentVotteFilters);

async function DissidentVotteFiltersLimitedData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('start_date', sql.Date, req.body.StartDate)
      .input('end_date', sql.Date, req.body.EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('shareholder_base', sql.Int, req.body.ShareholderBase)
      .input('settlements', sql.Int, req.body.Settlements)
      .input('short_slate_all', sql.Int, req.body.DesiredOutcome)
      .input('iss_card', sql.Int, req.body.ISSCard)
      .input('gl_card_rec', sql.Int, req.body.GLCard)
      .input('company_search_id', sql.Int, req.body.CompanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .execute('proxy_insight..DissidentVott_filter_top10_Insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/DissidentVotteFiltersLimitedData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function DissidentVotteFilters(req, res) {
  try {
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );

    let StartDate = null;
    let EndDate = null;

    if (req.body.StartDate !== null){
        StartDate = general.dateCorrection(req.body.StartDate);
    }

    if (req.body.EndDate !== null ){
        EndDate = general.dateCorrection(req.body.EndDate);
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('start_date', sql.Date, StartDate)
      .input('end_date', sql.Date, EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('shareholder_base', sql.Int, req.body.ShareholderBase)
      .input('settlements', sql.Int, req.body.Settlements)
      .input('short_slate_all', sql.Int, req.body.DesiredOutcome)
      .input('iss_card', sql.Int, req.body.ISSCard)
      .input('gl_card_rec', sql.Int, req.body.GLCard)
      .input('company_search_id', sql.Int, req.body.CompanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..DissidentVott_filter_Insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/DissidentVotteFilters`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
