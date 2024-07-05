const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const advancedVotingDataSearchRoute = 'advancedVotingDataSearch';

// fetch static data
const VoteCast_data = require('../config/SampleData/VoteCast_data.json');
const ManagementRecc_data = require('../config/SampleData/ManagementRecc_data.json');
const Support_data = require('../config/SampleData/Support_data.json');
const OutputField_data = require('../config/SampleData/OutputField_data.json');

router.post(
  '/GetAdvanceVotingDataFundname',
  authenticateToken,
  GetAdvanceVotingDataFundname
);
router.post(
  '/AdvancedVotingDataSearchList',
  authenticateToken,
  AdvancedVotingDataSearchList
);
router.post('/GetVoteCast', authenticateToken, GetVoteCast);
router.post('/GetManagementRecc', authenticateToken, GetManagementRecc);
router.post('/GetSupport', authenticateToken, GetSupport);
router.post('/GetOutputField', authenticateToken, GetOutputField);
router.post(
  '/GetListProposalsAndCategories',
  authenticateToken,
  GetListProposalsAndCategories
);

async function GetAdvanceVotingDataFundname(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('proxy_insight..GetAdvanceVotingDataFundname');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetAdvanceVotingDataFundname`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AdvancedVotingDataSearchList(req, res) {
  try {
    let new_voteCast = null;
    if (req.body.voteCast !== null && req.body.voteCast.includes(',')) {
      new_voteCast = req.body.voteCast.replaceAll("','", ',');
      new_voteCast = new_voteCast.replaceAll('"', '');
      new_voteCast = new_voteCast.substring(1);
      new_voteCast = new_voteCast.slice(0, -1);
    } else {
      if (req.body.voteCast !== null) {
        new_voteCast = req.body.voteCast;
        new_voteCast = new_voteCast.substring(1);
        new_voteCast = new_voteCast.slice(0, -1);
      }
    }

    let new_managementRecc = null;
    if (
      req.body.managementRecc !== null &&
      req.body.managementRecc.includes(',')
    ) {
      new_managementRecc = req.body.managementRecc.replaceAll("','", ',');
      new_managementRecc = new_managementRecc.replaceAll('"', '');
      new_managementRecc = new_managementRecc.substring(1);
      new_managementRecc = new_managementRecc.slice(0, -1);
    } else {
      if (req.body.managementRecc !== null) {
        new_managementRecc = req.body.managementRecc;
        new_managementRecc = new_managementRecc.substring(1);
        new_managementRecc = new_managementRecc.slice(0, -1);
      }
    }
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );

    const meetingStartDate =
      req.body.meetingStartDate !== null
        ? new Date(req.body.meetingStartDate)
        : null;
    const meetingEndDate =
      req.body.meetingEndDate !== null
        ? new Date(req.body.meetingEndDate)
        : null;
    const pool = await poolPromise;
    const result = await pool
      .request()
      // options
      .input('internal', sql.Bit, req.body.internal)
      .input('ShowVotingDetail', sql.Bit, req.body.ShowVotingDetail)
      .input(
        'ShowInvestorVotingDetail',
        sql.Bit,
        req.body.showInvestorVotingDetail
      )
      .input('ShowVoteResults', sql.Bit, req.body.ShowVoteResults)
      .input('ShowRationale', sql.Bit, req.body.ShowRationale)
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_search_id', sql.Int, req.body.investorSearchId)
      .input('investor_id', sql.Int, req.body.investor_id)
      .input('meeting_type', sql.VarChar, req.body.meetingType)
      .input('fund_id', sql.VarChar, req.body.fundId)
      .input('meeting_date_from', sql.Date, meetingStartDate)
      .input('meeting_date_to', sql.Date, meetingEndDate)
      .input('sponsor', sql.Int, req.body.sponsor)
      .input('proposal_types', sql.VarChar, req.body.proposalType)
      .input('vote_cast', sql.VarChar, new_voteCast)
      .input('vote_support_type', sql.VarChar, req.body.support)
      .input(
        'vote_support_min',
        sql.Decimal,
        req.body.supportMin ? req.body.supportMin : 0
      )
      .input(
        'vote_support_max',
        sql.Decimal,
        req.body.supportMax ? req.body.supportMax : 100
      )
      .input('management_recc', sql.VarChar, new_managementRecc)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..GetAdvanceVotingDataSearch');

    res.json({
      data: result.recordsets.length > 0 ? result.recordsets[0] : [],
      maxColumns:
        result.recordsets.length > 0 && result.recordsets[1].length > 0
          ? result.recordsets[1][0].max_num_rows
          : [],
    });
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/AdvancedVotingDataSearch`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVoteCast(req, res, next) {
  try {
    res.json(VoteCast_data);
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetVoteCast`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetManagementRecc(req, res, next) {
  try {
    res.json(ManagementRecc_data);
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetManagementRecc`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetSupport(req, res, next) {
  try {
    res.json(Support_data);
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetSupport`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetOutputField(req, res, next) {
  try {
    res.json(OutputField_data);
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetOutputField`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetListProposalsAndCategories(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('proxy_insight..ListProposalsAndCategories');

    // #region Shareholder Proposal Category: DDL
    const result_ProposalsAndCategories = await pool
      .request()
      .execute('proxy_insight..ListProposalsAndCategories');

    const jsonProposalsAndCategoriesMain = [];
    const uniqueProposalsAndCategories = [
      ...new Set(
        result_ProposalsAndCategories.recordset.map(
          (item) => item.proposal_type_toplevel
        )
      ),
    ];

    await uniqueProposalsAndCategories.map((eParent) => {
      let parenttext = '';
      let parentid = '';
      const arrMain = [];

      result_ProposalsAndCategories.recordset
        .filter((res) => res.proposal_type_toplevel === eParent)
        .map((row) => {
          arrMain.push(row.proposal_type_id);
        });

      result_ProposalsAndCategories.recordset
        .filter((res) => res.proposal_type_toplevel === eParent)
        .map((row) => {
          parentid = row.proposal_top_level.replace(/(?:\r\n|\r|\n)/g, '');
          parenttext = arrMain.toString();
        });

      const jsonProposalsAndCategoriesCategory = [];
      const uniqueProposalsAndCategories_Category_Sub_level_id = [
        ...new Set(
          result_ProposalsAndCategories.recordset
            .filter(
              (item) =>
                item.proposal_type_sublevel &&
                item.proposal_type_toplevel === eParent
            )
            .map((item) => item.proposal_type_sublevel)
        ),
      ];

      uniqueProposalsAndCategories_Category_Sub_level_id.map((e) => {
        {
          let labeltext = '';
          let valuetext = '';
          const arrSub = [];

          const jsonChildren = [];

          result_ProposalsAndCategories.recordset
            .filter((res) => res.proposal_type_sublevel === e && res.proposal_type_toplevel === eParent)
            .map((row) => {
              arrSub.push(row.proposal_type_id);
            });

          result_ProposalsAndCategories.recordset
            .filter((res) => res.proposal_type_sublevel === e && res.proposal_type_toplevel === eParent)
            .map((row) => {
              labeltext = row.Category_Sub_level.replace(/(?:\r\n|\r|\n)/g, '');
              valuetext = arrSub.toString();
              jsonChildren.push({
                label: row.proposal_type.replace(/(?:\r\n|\r|\n)/g, ''),
                value: row.proposal_type_id,
                checked: true,
              });
            });

          jsonProposalsAndCategoriesCategory.push({
            label: labeltext,
            value: valuetext,
            children: jsonChildren,
            checked: true,
            expanded: true,
          });
        }
      });
      jsonProposalsAndCategoriesMain.push({
        label: parentid,
        value: parenttext,
        children: jsonProposalsAndCategoriesCategory,
        checked: true,
        expanded: true,
      });
    });
    // #endregion

    res.json({
      DDLProposalsAndCategoriesCategory: [
        {
          label: 'All',
          value: '1',
          children: jsonProposalsAndCategoriesMain,
          checked: true,
        },
      ],
    });
    // res.json(result)
  } catch (error) {
    general.ErrorLog(
      `${advancedVotingDataSearchRoute}/GetListProposalsAndCategories`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
