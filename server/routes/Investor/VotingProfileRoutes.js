const express = require('express');
const dateFormat = require('dateformat');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const { sql, poolPromise } = require('../../config/Db');

const routeName = 'votingProfileRoute';

router.post('/GetInvestorDDLList', authenticateToken, GetInvestorDDLList);
router.post(
  '/GetVotingProfileBottomSection',
  authenticateToken,
  GetVotingProfileBottomSection
);
router.post(
  '/GetVotingProfileTopSection',
  authenticateToken,
  GetVotingProfileTopSection
);

async function GetInvestorDDLList(req, res) {
  try {
    const pool = await poolPromise;
    const myJsonDDL = [];

    const result_DDLAllInvestorProfiles = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetAllInvestorProfiles_insightia');
    result_DDLAllInvestorProfiles.recordset.forEach((obj) => {
      myJsonDDL.push({
        label:
          obj.investor_profile_name !== null &&
          obj.investor_profile_name !== undefined
            ? obj.investor_profile_name
            : '',
        value:
          obj.investor_profile_id !== null &&
          obj.investor_profile_id !== undefined
            ? obj.investor_profile_id
            : '',
      });
    });

    res.json({
      ddlAllInvestor: myJsonDDL,
      ddlInitialInvestor: myJsonDDL.length > 0 ? myJsonDDL[0] : null,
    });
  } catch (error) {
    general.ErrorLog(
      `${routeName}/GetInvestorDDLList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingProfileTopSection(req, res) {
  try {
    const pool = await poolPromise;
    const myJsonProxyVotingSummary = [];
    const myJsonKeyDocument = [];
    const myJsonVotingPolicyChanges = [];

    const result_Profile = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile');
    result_Profile.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_ProxyVotingSummary = await pool
      .request()
      .input('investor_profile_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetVotingData_Summary_votesbyinvest');
    result_ProxyVotingSummary.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_ProxyVotingSummary.recordset.forEach((obj) => {
      myJsonProxyVotingSummary.push({
        investor_name: obj.investor_name,
        investor_id: obj.investor_id,
        proposal_type_toplevel: obj.proposal_type_toplevel,
        PI_Index: obj.PI_Index,
        proposal_top_level:
          obj.proposal_top_level !== undefined &&
          obj.proposal_top_level !== null
            ? obj.proposal_top_level
            : '',
        votes_for_pcent:
          obj.votes_for_pcent !== undefined && obj.votes_for_pcent !== null
            ? obj.votes_for_pcent.toFixed(1)
            : obj.votes_for_pcent,
        votes_against_pcent:
          obj.votes_against_pcent !== undefined &&
          obj.votes_against_pcent !== null
            ? obj.votes_against_pcent.toFixed(1)
            : obj.votes_against_pcent,
        votes_split_pcent:
          obj.votes_split_pcent !== undefined && obj.votes_split_pcent !== null
            ? obj.votes_split_pcent.toFixed(1)
            : obj.votes_split_pcent,
        votes_abstain_pcent:
          obj.votes_abstain_pcent !== undefined &&
          obj.votes_abstain_pcent !== null
            ? obj.votes_abstain_pcent.toFixed(1)
            : obj.votes_abstain_pcent,
        votes_withhold_pcent:
          obj.votes_withhold_pcent !== undefined &&
          obj.votes_withhold_pcent !== null
            ? obj.votes_withhold_pcent.toFixed(1)
            : obj.votes_withhold_pcent,
      });
    });

    const result_KeyDocument = await pool
      .request()
      .input('investorID', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.AdmGetDocumentLog_v2');
    result_KeyDocument.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_KeyDocument.recordset.forEach((obj) => {
      myJsonKeyDocument.push({
        document_log_id: obj.document_log_id,
        investor_profile_id: obj.investor_profile_id,
        doc_id: obj.doc_id,
        document_type:
          obj.document_type !== null && obj.document_type !== undefined
            ? obj.document_type
            : '',
        document_date:
          obj.document_date !== null && obj.document_date !== undefined
            ? dateFormat(obj.document_date, 'dd-mmm-yy', true)
            : '',
        document_name:
          obj.document_name !== null && obj.document_name !== undefined
            ? obj.document_name
            : '',
      });
    });

    const result_VotingPolicyChanges = await pool
      .request()
      .input('investor_profile_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetVotingPolicyChanges');
    result_VotingPolicyChanges.recordset.forEach((obj) => {
      myJsonVotingPolicyChanges.push({
        date:
          obj.date_of !== null && obj.date_of !== undefined
            ? dateFormat(obj.date_of, 'dd-mmm-yy', true)
            : '',
        category:
          obj.policycategory_description !== null &&
          obj.policycategory_description !== undefined
            ? obj.policycategory_description
            : '',
        subCategory:
          obj.policysubcategory_description !== null &&
          obj.policysubcategory_description !== undefined
            ? obj.policysubcategory_description
            : '',
        summaryChange:
          obj.summary_change !== null && obj.summary_change !== undefined
            ? obj.summary_change
            : '',
      });
    });

    res.json({
      votingProfile: result_Profile.recordset[0],
      tableKeyDocument: myJsonKeyDocument,
      tableProxyVotingSummary: myJsonProxyVotingSummary,
      tableVotingPolicyChanges: myJsonVotingPolicyChanges,
    });
  } catch (error) {
    general.ErrorLog(
      `${routeName}/GetVotingProfileTopSection`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingProfileBottomSection(req, res) {
  try {
    const pool = await poolPromise;

    const result_Contacts = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.ListFMPersonnel');
    result_Contacts.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Boards = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Board_v2');
    result_Boards.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Committes = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Committees_v2');
    result_Committes.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Remuneration = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Remuneration_v2');
    result_Remuneration.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Structure = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_CorpStructure_v2');
    result_Structure.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_General = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_GeneralGovernance_v2');
    result_General.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_ESG = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_ESG_v2');
    result_ESG.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_VotingPolicy = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_VotingPolicy_v2');
    result_VotingPolicy.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const jsonNews = [];
    const result_News = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetInvestorNews');
    result_News.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_News.recordset.forEach((obj) => {
      jsonNews.push({
        news_id: obj.news_id,
        newsDate: obj.news_date,
        headLine: obj.news_headline,
        shortArticle: obj.news_article,
        img: obj.image_filename,
      });
    });

    res.json({
      tableContacts: result_Contacts.recordset,
      tableBoards:
        result_Boards.recordset.length > 0 ? result_Boards.recordset[0] : {},
      tableCommittes:
        result_Committes.recordset.length > 0
          ? result_Committes.recordset[0]
          : {},
      tableRemuneration:
        result_Remuneration.recordset.length > 0
          ? result_Remuneration.recordset[0]
          : {},
      tableStructure:
        result_Structure.recordset.length > 0
          ? result_Structure.recordset[0]
          : {},
      tableGeneral:
        result_General.recordset.length > 0 ? result_General.recordset[0] : {},
      tableESG: result_ESG.recordset.length > 0 ? result_ESG.recordset[0] : {},
      tableVotingPolicy:
        result_VotingPolicy.recordset.length > 0
          ? result_VotingPolicy.recordset[0]
          : {},
      tableNews: jsonNews,
    });
  } catch (error) {
    general.ErrorLog(
      `${routeName}/GetVotingProfileBottomSection`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingProfileSummary(req, res) {
  try {
    const pool = await poolPromise;
    const myJsonProxyVotingSummary = [];
    const myJsonKeyDocument = [];
    const myJsonVotingPolicyChanges = [];

    const result_Profile = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile');
    result_Profile.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_ProxyVotingSummary = await pool
      .request()
      .input('investor_profile_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetVotingData_Summary_votesbyinvest');
    result_ProxyVotingSummary.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_ProxyVotingSummary.recordset.forEach((obj) => {
      myJsonProxyVotingSummary.push({
        investor_name: obj.investor_name,
        investor_id: obj.investor_id,
        proposal_type_toplevel: obj.proposal_type_toplevel,
        PI_Index: obj.PI_Index,
        proposal_top_level:
          obj.proposal_top_level !== undefined &&
          obj.proposal_top_level !== null
            ? obj.proposal_top_level
            : '',
        votes_for_pcent:
          obj.votes_for_pcent !== undefined && obj.votes_for_pcent !== null
            ? obj.votes_for_pcent.toFixed(1)
            : obj.votes_for_pcent,
        votes_against_pcent:
          obj.votes_against_pcent !== undefined &&
          obj.votes_against_pcent !== null
            ? obj.votes_against_pcent.toFixed(1)
            : obj.votes_against_pcent,
        votes_split_pcent:
          obj.votes_split_pcent !== undefined && obj.votes_split_pcent !== null
            ? obj.votes_split_pcent.toFixed(1)
            : obj.votes_split_pcent,
        votes_abstain_pcent:
          obj.votes_abstain_pcent !== undefined &&
          obj.votes_abstain_pcent !== null
            ? obj.votes_abstain_pcent.toFixed(1)
            : obj.votes_abstain_pcent,
        votes_withhold_pcent:
          obj.votes_withhold_pcent !== undefined &&
          obj.votes_withhold_pcent !== null
            ? obj.votes_withhold_pcent.toFixed(1)
            : obj.votes_withhold_pcent,
      });
    });

    const result_KeyDocument = await pool
      .request()
      .input('investorID', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.AdmGetDocumentLog_v2');
    result_KeyDocument.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_KeyDocument.recordset.forEach((obj) => {
      myJsonKeyDocument.push({
        document_log_id: obj.document_log_id,
        investor_profile_id: obj.investor_profile_id,
        doc_id: obj.doc_id,
        document_type:
          obj.document_type !== null && obj.document_type !== undefined
            ? obj.document_type
            : '',
        document_date:
          obj.document_date !== null && obj.document_date !== undefined
            ? dateFormat(obj.document_date, 'dd-mmm-yy', true)
            : '',
        document_name:
          obj.document_name !== null && obj.document_name !== undefined
            ? obj.document_name
            : '',
      });
    });

    const result_VotingPolicyChanges = await pool
      .request()
      .input('investor_profile_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetVotingPolicyChanges');
    result_VotingPolicyChanges.recordset.forEach((obj) => {
      myJsonVotingPolicyChanges.push({
        date:
          obj.date_of !== null && obj.date_of !== undefined
            ? dateFormat(obj.date_of, 'dd-mmm-yy', true)
            : '',
        category:
          obj.policycategory_description !== null &&
          obj.policycategory_description !== undefined
            ? obj.policycategory_description
            : '',
        subCategory:
          obj.policysubcategory_description !== null &&
          obj.policysubcategory_description !== undefined
            ? obj.policysubcategory_description
            : '',
        summaryChange:
          obj.summary_change !== null && obj.summary_change !== undefined
            ? obj.summary_change
            : '',
      });
    });

    const result_Contacts = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.ListFMPersonnel');
    result_Contacts.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Boards = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Board_v2');
    result_Boards.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Committes = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Committees_v2');
    result_Committes.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Remuneration = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_Remuneration_v2');
    result_Remuneration.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_Structure = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_CorpStructure_v2');
    result_Structure.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_General = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_GeneralGovernance_v2');
    result_General.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_ESG = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_ESG_v2');
    result_ESG.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const result_VotingPolicy = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetFMProfile_VotingPolicy_v2');
    result_VotingPolicy.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const jsonNews = [];
    const result_News = await pool
      .request()
      .input('company_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetInvestorNews');
    result_News.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_News.recordset.forEach((obj) => {
      jsonNews.push({
        news_id: obj.news_id,
        newsDate: obj.news_date,
        headLine: obj.news_headline,
        shortArticle: obj.news_article,
        img: obj.image_filename,
      });
    });

    res.json({
      votingProfile: result_Profile.recordset[0],
      tableKeyDocument: myJsonKeyDocument,
      tableProxyVotingSummary: myJsonProxyVotingSummary,
      tableVotingPolicyChanges: myJsonVotingPolicyChanges,
      tableContacts: result_Contacts.recordset,
      tableBoards:
        result_Boards.recordset.length > 0 ? result_Boards.recordset[0] : {},
      tableCommittes:
        result_Committes.recordset.length > 0
          ? result_Committes.recordset[0]
          : {},
      tableRemuneration:
        result_Remuneration.recordset.length > 0
          ? result_Remuneration.recordset[0]
          : {},
      tableStructure:
        result_Structure.recordset.length > 0
          ? result_Structure.recordset[0]
          : {},
      tableGeneral:
        result_General.recordset.length > 0 ? result_General.recordset[0] : {},
      tableESG: result_ESG.recordset.length > 0 ? result_ESG.recordset[0] : {},
      tableVotingPolicy:
        result_VotingPolicy.recordset.length > 0
          ? result_VotingPolicy.recordset[0]
          : {},
      tableNews: jsonNews,
    });
  } catch (error) {
    general.ErrorLog(
      `${routeName}/GetVotingProfileSummary`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
