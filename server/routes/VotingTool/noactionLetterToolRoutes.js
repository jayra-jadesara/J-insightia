/* eslint-disable no-var */
const express = require('express');
const { sql, poolPromise } = require('../../config/db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const noactionLetterToolRoutes = 'noactionLetterToolRoute';

router.post(
  '/getVotingToolNoActionLetterDDL',
  authenticateToken,
  getVotingToolNoActionLetterDDL
);
router.post('/getVotingToolNoActionLetterAnalysisData', authenticateToken, getVotingToolNoActionLetterAnalysisData);

// /////////////////////////////////////////

function catchFn(e) {
  console.log(
    e.lineNumber,
    `-----------------\n${e.procName}\n---------------------`
  );
  console.error(e.message);
}

// /////////////////////////////////////////

function getrowname(tableNo) {
  if (tableNo === 2) {
    return 'Proxy Access';
  }
  if (tableNo === 3) {
    return 'Special Meeting';
  }
  if (tableNo === 4) {
    return 'Written Consent';
  }
  if (tableNo === 5) {
    return 'Independent Chairman';
  }
  if (tableNo === 6) {
    return 'Supermajority Vote';
  }
  if (tableNo === 7) {
    return 'Others';
  }
  return '';
}

function checkValuesToFixed(value, fixedSize = 2) {
  if (value === 0) {
    return value;
  }
  if (value === -1) {
    return '';
  }
  if (!value) {
    return '';
  }
  if (Number.isNaN(value)) {
    return value;
  }
  return `${value.toFixed(fixedSize)}%`;
}

async function getVotingToolNoActionLetterDDL(req, res, next) {
  try {
    const pool = await poolPromise;

    const result_ddlProponentBind = await pool
      .request()
      .execute('proxy_insight.dbo.GetNoActionProponentsAll');
    const myJsonDDLProponent = [{ label: 'All', value: '' }];
    if (result_ddlProponentBind) {
    result_ddlProponentBind.recordset.forEach((obj) => {
      myJsonDDLProponent.push({
        label: obj.proponent_name,
        value: obj.proponent_id,
      });
    });
  }

    // #region Shareholder Proposal Category: DDL
    const result_ShareholderProposalCategory = await pool
      .request()
      .execute('proxy_insight.dbo.GetAllShareholderProposalTypesAllLevels');

    const jsonShareholderProposalCategoryMain = [];
    const uniqueShareholderProposalCategory = [
      ...new Set(
        result_ShareholderProposalCategory.recordset.map(
          (item) => item.proposal_type_top_level_id
        )
      ),
    ];

    uniqueShareholderProposalCategory.map((eParent) => {
      let parenttext = '';
      let parentid = '';
      let arrMain = [];

      result_ShareholderProposalCategory.recordset
      .filter((res) => res.proposal_type_top_level_id === eParent)
      .map((row) => {
        arrMain.push(row.proposal_type_id);
      });

      result_ShareholderProposalCategory.recordset
        .filter((res) => res.proposal_type_top_level_id === eParent)
        .map((row) => {
          parentid = row.proposal_top_level.replace(/(?:\r\n|\r|\n)/g, '');
          parenttext = arrMain.toString();
        });

      const jsonShareholderProposalCategory = [];
      const uniqueShareholderProposalCategory_Category_Sub_level_id = [
        ...new Set(
          result_ShareholderProposalCategory.recordset
            .filter(
              (item) =>
                item.Category_Sub_level_id &&
                item.proposal_type_top_level_id === eParent
            )
            .map((item) => item.Category_Sub_level_id)
        ),
      ];

      uniqueShareholderProposalCategory_Category_Sub_level_id.map((e) => {
        {
          let labeltext = '';
          let valuetext = '';
          let arrSub = [];

          result_ShareholderProposalCategory.recordset
            .filter((res) => res.Category_Sub_level_id === e)
            .map((row) => {
              arrSub.push(row.proposal_type_id);
            });

          const jsonChildren = [];
          result_ShareholderProposalCategory.recordset
            .filter((res) => res.Category_Sub_level_id === e)
            .map((row) => {
              labeltext = row.Category_Sub_level.replace(/(?:\r\n|\r|\n)/g, '');
              valuetext = arrSub.toString();
              jsonChildren.push({
                label: row.proposal_type.replace(/(?:\r\n|\r|\n)/g, ''),
                value: row.proposal_type_id,
                checked: true,
              });
            });

          jsonShareholderProposalCategory.push({
            label: labeltext,
            value: valuetext,
            children: jsonChildren,
            checked: true,
            expanded: true,
          });
        }
      });
      jsonShareholderProposalCategoryMain.push({
        label: parentid,
        value: parenttext,
        children: jsonShareholderProposalCategory,
        checked: true,
        expanded: true,
      });
    });
    // #endregion

    res.json({
      DDLShareholderProposalCategory: [
        {
          label: 'All',
          value: '1',
          children: jsonShareholderProposalCategoryMain,
          checked: true,
        },
      ],
      DDLProponent: myJsonDDLProponent,
    });
  } catch (e) {
    catchFn(e);
    general.ErrorLog(
      `${noactionLetterToolRoutes}/getVotingToolNoActionLetterDDL`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    return [];
  }
}

async function getVotingToolNoActionLetterAnalysisData(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result_NoActionLettersAnalysis = await pool
      .request()
      .input('Proposal_type_ID', sql.VarChar, req.body.proposal_type)
      .input('Proponent_ID', sql.Int, req.body.proponent)
      .input('start_date', sql.Date, req.body.start_date)
      .input('end_date', sql.Date, req.body.end_date)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight.dbo.GetResSearchByProponent_v2');

    var chart_ProposalsBy = result_NoActionLettersAnalysis.recordsets[0];
    const chart_ProposalsThatWentToAVote = result_NoActionLettersAnalysis.recordsets[1];
    const table_SupportfromTop20Investors = result_NoActionLettersAnalysis.recordsets[8];

    let tableAverage = [];
    let tableISS = [];
    let tableGL = [];
    let finalTableAverage = [];
    let finalTableISS = [];
    let finalTableGL = [];

    const yearJson = [];

    // #region Year JSON
    chart_ProposalsBy =
      chart_ProposalsBy.length > 0 &&
      chart_ProposalsBy
        .slice()
        .sort((a, b) => Number(a.date_act_Year) - Number(b.date_act_Year));

    result_NoActionLettersAnalysis.recordsets[2].map((a, i) => {
      yearJson.push({ year: a.meeting_date, index: i });
    });
    result_NoActionLettersAnalysis.recordsets[3].map((a, i) => {
      if (!yearJson.map((x) => x.year).includes(a.meeting_date)) {
        yearJson.push({ year: a.meeting_date, index: i });
      }
    });
    result_NoActionLettersAnalysis.recordsets[4].map((a, i) => {
      if (!yearJson.map((x) => x.year).includes(a.meeting_date)) {
        yearJson.push({ year: a.meeting_date, index: i });
      }
    });
    result_NoActionLettersAnalysis.recordsets[5].map((a, i) => {
      if (!yearJson.map((x) => x.year).includes(a.meeting_date)) {
        yearJson.push({ year: a.meeting_date, index: i });
      }
    });
    result_NoActionLettersAnalysis.recordsets[6].map((a, i) => {
      if (!yearJson.map((x) => x.year).includes(a.meeting_date)) {
        yearJson.push({ year: a.meeting_date, index: i });
      }
    });
    result_NoActionLettersAnalysis.recordsets[7].map((a, i) => {
      if (!yearJson.map((x) => x.year).includes(a.meeting_date)) {
        yearJson.push({ year: a.meeting_date, index: i });
      }
    });

    yearJson.filter((item, index) => {
      if (item.year === null) {
        yearJson.splice(index, 1);
      }
    });

    // #endregion

    yearJson.map((yearItem, yearIndex) => {
      if (
        result_NoActionLettersAnalysis.recordsets[2].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[2]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(
                item.avg_support_proxy_access,
                1
              ),
              name: getrowname(2),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(
                item.ISS_support_proxy_access,
                1
              ),
              name: getrowname(2),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(
                item.GL_support_proxy_access,
                1
              ),
              name: getrowname(2),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(2) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(2) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(2) });
      }

      if (
        result_NoActionLettersAnalysis.recordsets[3].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[3]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(
                item.avg_support_special_meeting,
                1
              ),
              name: getrowname(3),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(
                item.ISS_support_special_meeting,
                1
              ),
              name: getrowname(3),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(
                item.GL_support_special_meeting,
                1
              ),
              name: getrowname(3),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(3) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(3) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(3) });
      }

      if (
        result_NoActionLettersAnalysis.recordsets[4].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[4]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(
                item.avg_support_written_consent,
                1
              ),
              name: getrowname(4),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(
                item.ISS_support_written_consent,
                1
              ),
              name: getrowname(4),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(
                item.GL_support_written_consent,
                1
              ),
              name: getrowname(4),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(4) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(4) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(4) });
      }

      if (
        result_NoActionLettersAnalysis.recordsets[5].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[5]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(
                item.avg_support_ind_chairman,
                1
              ),
              name: getrowname(5),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(
                item.ISS_support_ind_chairman,
                1
              ),
              name: getrowname(5),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(
                item.GL_support_ind_chairman,
                1
              ),
              name: getrowname(5),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(5) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(5) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(5) });
      }

      if (
        result_NoActionLettersAnalysis.recordsets[6].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[6]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(
                item.avg_support_supermajority_vote,
                1
              ),
              name: getrowname(6),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(
                item.ISS_support_supermajority_vote,
                1
              ),
              name: getrowname(6),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(
                item.GL_support_supermajority_vote,
                1
              ),
              name: getrowname(6),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(6) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(6) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(6) });
      }

      if (
        result_NoActionLettersAnalysis.recordsets[7].filter(
          (item) => item.meeting_date === yearItem.year
        ).length > 0
      ) {
        result_NoActionLettersAnalysis.recordsets[7]
          .filter((item) => item.meeting_date === yearItem.year)
          .map((item) => {
            tableAverage.push({
              [yearItem.year]: checkValuesToFixed(item.avg_support_other, 1),
              name: getrowname(7),
            });
            tableISS.push({
              [yearItem.year]: checkValuesToFixed(item.ISS_support_other, 1),
              name: getrowname(7),
            });
            tableGL.push({
              [yearItem.year]: checkValuesToFixed(item.GL_support_other, 1),
              name: getrowname(7),
            });
          });
      } else {
        tableAverage.push({ [yearItem.year]: '', name: getrowname(7) });
        tableISS.push({ [yearItem.year]: '', name: getrowname(7) });
        tableGL.push({ [yearItem.year]: '', name: getrowname(7) });
      }

      let resultAverage = [];
      let resulISS = [];
      let resultGL = [];

      if (yearIndex === 0) {
        resultAverage = tableAverage;
        resulISS = tableISS;
        resultGL = tableGL;
      } else {
        resultAverage = [finalTableAverage[0], tableAverage].reduce((a, b) =>
          a.map((c, i) => ({ ...c, ...b[i] }))
        );
        resulISS = [finalTableISS[0], tableISS].reduce((a, b) =>
          a.map((c, i) => ({ ...c, ...b[i] }))
        );
        resultGL = [finalTableGL[0], tableGL].reduce((a, b) =>
          a.map((c, i) => ({ ...c, ...b[i] }))
        );
      }
      finalTableAverage = [];
      finalTableISS = [];
      finalTableGL = [];

      tableAverage = [];
      tableISS = [];
      tableGL = [];

      finalTableAverage.push(resultAverage);
      finalTableISS.push(resulISS);
      finalTableGL.push(resultGL);
    });

    const averageHeadings = [{ headingName: 'Average', field: 'name' }];
    yearJson.map((x) => {
      averageHeadings.push({ headingName: x.year, field: x.year });
    });

    const issHeadings = [{ headingName: 'ISS Support', field: 'name' }];
    yearJson.map((x) => {
      issHeadings.push({ headingName: x.year, field: x.year });
    });

    const glHeadings = [{ headingName: 'Glass Lewis Support', field: 'name' }];
    yearJson.map((x) => {
      glHeadings.push({ headingName: x.year, field: x.year });
    });

    res.json({
      chartProposalsBy: chart_ProposalsBy,
      chartProposalsThatWentToAVote: chart_ProposalsThatWentToAVote,
      tableSupportfromTop20Investors: table_SupportfromTop20Investors,
      tableAverage: {
        data: finalTableAverage.length > 0 ? finalTableAverage[0] : [],
        heading: averageHeadings,
      },
      tableISS: {
        data: finalTableISS.length > 0 ? finalTableISS[0] : [],
        heading: issHeadings,
      },
      tableGL: {
        data: finalTableGL.length > 0 ? finalTableGL[0] : [],
        heading: glHeadings,
      },
    });
  } catch (e) {
    catchFn(e);
    general.ErrorLog(
      `${noactionLetterToolRoutes}/getVotingToolNoActionLetterAnalysisData`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    return [];
  }
}

module.exports = router;
