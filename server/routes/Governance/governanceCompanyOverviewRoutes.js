const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();

const governanceCompanyOverviewRoutes = 'governanceCompanyOverviewRoute';
const dateFormat = require('dateformat');

const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

// Governance Overview
router.post(
  '/GetGovOverview_meetingInfo_Quickview_StockData',
  authenticateToken,
  GetGovOverview_meetingInfo_Quickview_StockData
);
router.post('/GetBoardAndDirectorsIndexDDL', authenticateToken, GetBoardAndDirectorsIndexDDL);
router.post('/GetComparisionTables', authenticateToken, GetComparisionTables);

function isDate(dateStr, req) {
  try {
    return !Number.isNaN(new Date(dateStr).getDate());
  } catch (error) {
    general.ErrorLog(`${governanceCompanyOverviewRoutes}/isDate`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

// APIs
async function GetGovOverview_meetingInfo_Quickview_StockData(req, res) {
  try {
    let arrayQuickView = [];
    let arrayMeetingInfo = [];
    let resultOverviewStock = [];
    let chartJSON = [];
    let chartString = '';

    const pool = await poolPromise;
    try {
      // #region QuickView
      try {
        const result_Quickview = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetGovQuickview_v3');
        if (result_Quickview.recordsets[0].length > 0) {
          result_Quickview.recordsets[0].forEach((element) => general.validateNulltoEmptyString(element));
        }
        if (result_Quickview.recordsets[1].length > 0) {
          result_Quickview.recordsets[1].forEach((element) => general.validateNulltoEmptyString(element));
        }
        if (result_Quickview.recordsets[2].length > 0) {
          result_Quickview.recordsets[2].forEach((element) => general.validateNulltoEmptyString(element));
        }

        if (result_Quickview.recordsets[0].length > 0) {
          let IsAuditor = '';
          let IsChairman = '';
          let IsCEO = '';

          const auditorVal = result_Quickview.recordsets[0][0].Auditor;
          const auditorYearVal = result_Quickview.recordsets[0][0].Auditor_years;
          if (auditorVal !== '') {
            IsAuditor = auditorVal;
            if (auditorYearVal !== '') {
              IsAuditor += ` (${auditorYearVal} years)`;
            }
          } else {
            IsAuditor = 'None';
          }

          if (result_Quickview.recordsets[1].length > 0) {
            result_Quickview.recordsets[1].map((x) => {
              const ChairmanNameVal = x.Chairman_name;
              const ChairmanYearsVal = x.Chairman_years;
              if (IsChairman === '') {
                IsChairman = ChairmanNameVal;
                if (ChairmanYearsVal !== '') {
                  IsChairman += ` (${ChairmanYearsVal} years)`;
                }
              } else {
                IsChairman += `,\n ${ChairmanNameVal}`;
                if (ChairmanYearsVal !== '') {
                  IsChairman += ` (${ChairmanYearsVal} years)`;
                }
              }
            });
          } else {
            IsChairman = 'None';
          }

          if (result_Quickview.recordsets[2].length > 0) {
            result_Quickview.recordsets[2].map((x) => {
              const CEONameVal = x.CEO_name;
              const CEOYearVal = x.CEO_years;
              if (IsCEO === '') {
                IsCEO = CEONameVal;
                if (CEOYearVal !== '') {
                  IsCEO += ` (${CEOYearVal} years)`;
                }
              } else {
                IsCEO += `,\n ${CEONameVal}`;
                if (CEOYearVal !== '') {
                  IsCEO += ` (${CEOYearVal} years)`;
                }
              }
            });
          } else {
            IsCEO = 'None';
          }

          arrayQuickView = {
            IR_website:
              result_Quickview.recordsets[0][0].IR_website !== '' ? result_Quickview.recordsets[0][0].IR_website : '',
            Company_HQ:
              result_Quickview.recordsets[0][0].Company_HQ !== ''
                ? result_Quickview.recordsets[0][0].Company_HQ
                : 'N/A',
            Sector: result_Quickview.recordsets[0][0].Sector !== '' ? result_Quickview.recordsets[0][0].Sector : 'N/A',
            Industry:
              result_Quickview.recordsets[0][0].Industry !== '' ? result_Quickview.recordsets[0][0].Industry : 'N/A',
            Auditor: IsAuditor,
            Auditor_years:
              result_Quickview.recordsets[0][0].Auditor_years !== ''
                ? result_Quickview.recordsets[0][0].Auditor_years
                : 'N/A',
            primary_exchange:
              result_Quickview.recordsets[0][0].primary_exchange !== ''
                ? result_Quickview.recordsets[0][0].primary_exchange
                : 'N/A',
            secondary_exchange:
              result_Quickview.recordsets[0][0].secondary_exchange !== ''
                ? result_Quickview.recordsets[0][0].secondary_exchange
                : 'N/A',
            Index: result_Quickview.recordsets[0][0].Index !== '' ? result_Quickview.recordsets[0][0].Index : 'N/A',
            CEO_name: IsCEO,
            CEO_years:
              result_Quickview.recordsets[0][0].CEO_years !== '' ? result_Quickview.recordsets[0][0].CEO_years : 'N/A',
            marketcap:
              result_Quickview.recordsets[0][0].marketcap !== '' ? result_Quickview.recordsets[0][0].marketcap : 'N/A',
            state_of_incorp:
              result_Quickview.recordsets[0][0].state_of_incorp !== ''
                ? result_Quickview.recordsets[0][0].state_of_incorp
                : 'N/A',
            IPO: result_Quickview.recordsets[0][0].IPO !== '' ? result_Quickview.recordsets[0][0].IPO : 'N/A',
            Chairman_name: IsChairman,
            Chairman_years:
              result_Quickview.recordsets[0][0].Chairman_years !== ''
                ? result_Quickview.recordsets[0][0].Chairman_years
                : 'N/A',
            exchange_id_pri:
              result_Quickview.recordsets[0][0].exchange_id_pri !== ''
                ? result_Quickview.recordsets[0][0].exchange_id_pri
                : 'N/A',
            exchange_id_sec:
              result_Quickview.recordsets[0][0].exchange_id_sec !== ''
                ? result_Quickview.recordsets[0][0].exchange_id_sec
                : 'N/A',
          };
        }
      } catch (error) {
        general.ErrorLog(
          `${governanceCompanyOverviewRoutes}/GetGovOverview_meetingInfo_Quickview_StockData/QuickView`,
          `${error} - QuickView`,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
      // #endregion

      // #region Meeting Info
      try {
        const result_MeetingInfo = await pool
          .request()
          .input('pid', sql.Int, req.body.pid)
          .execute('GovMeetingInformation');
        result_MeetingInfo.recordset.forEach((element) => general.validateNulltoEmptyString(element));

        if (result_MeetingInfo.recordset !== undefined && result_MeetingInfo.recordset.length > 0) {
          const upcoming_annual_meetingVal = result_MeetingInfo.recordset[0].upcoming_annual_meeting;
          const upcoming_annual_meeting_urlVal = result_MeetingInfo.recordset[0].upcoming_annual_meeting_url;
          const previous_annual_meetingVal = result_MeetingInfo.recordset[0].previous_annual_meeting;
          const previous_annual_meeting_urlVal = result_MeetingInfo.recordset[0].previous_annual_meeting_url;
          const upcoming_special_meetingVal = result_MeetingInfo.recordset[0].upcoming_special_meeting;
          const upcoming_special_meeting_urlVal = result_MeetingInfo.recordset[0].upcoming_special_meeting_url;
          const previous_special_meetingVal = result_MeetingInfo.recordset[0].previous_special_meeting;
          const previous_special_meeting_urlVal = result_MeetingInfo.recordset[0].previous_special_meeting_url;
          let shareholder_prop_deadlineVal = result_MeetingInfo.recordset[0].shareholder_prop_deadline;
          let nomination_deadlineVal = result_MeetingInfo.recordset[0].nomination_deadline;
          const board_meetings_last_yearVal = result_MeetingInfo.recordset[0].board_meetings_last_year;

          const upcoming_annual_meetingArray = [];
          const previous_annual_meetingArray = [];
          const upcoming_special_meetingArray = [];
          const previous_special_meetingArray = [];

          if (upcoming_annual_meetingVal !== '') {
            if (upcoming_annual_meetingVal === 'TBD') {
              upcoming_annual_meetingArray.push({ label: 'TBD', element: 'label' });
            } else {
              if (upcoming_annual_meeting_urlVal !== '') {
                if (isDate(upcoming_annual_meetingVal, req)) {
                  upcoming_annual_meetingArray.push({
                    label: upcoming_annual_meetingVal !== null ? upcoming_annual_meetingVal : 'N/A',
                    element: 'hyperlink',
                    link: upcoming_annual_meeting_urlVal,
                  });
                } else {
                  upcoming_annual_meetingArray.push({ label: upcoming_annual_meetingVal, element: 'hyperlink' });
                }
              }
              if (upcoming_annual_meeting_urlVal === '') {
                if (isDate(upcoming_annual_meetingVal, req)) {
                  upcoming_annual_meetingArray.push({
                    label: upcoming_annual_meetingVal !== null ? upcoming_annual_meetingVal : 'N/A',
                    element: 'label',
                  });
                } else {
                  upcoming_annual_meetingArray.push({ label: upcoming_annual_meetingVal, element: 'label' });
                }
              }
              if (isDate(upcoming_annual_meetingVal, req)) {
                if (
                  result_MeetingInfo.recordset[0].virtual_meeting !== '' &&
                  result_MeetingInfo.recordset[0].virtual_meeting !== 0 &&
                  result_MeetingInfo.recordset[0].virtual_meeting !== 3
                ) {
                  let ToolTip = '';
                  if (result_MeetingInfo.recordset[0].virtual_meeting === 1) {
                    ToolTip = 'Virtual-only';
                  }
                  if (result_MeetingInfo.recordset[0].virtual_meeting === 2) {
                    ToolTip = 'Hybrid';
                  }
                  upcoming_annual_meetingArray.push({ label: 'virtualmeetingicon.png', element: 'img', ToolTip });
                }
              }
            }
          } else {
            upcoming_annual_meetingArray.push({ label: 'TBD', element: 'label' });
          }

          if (previous_annual_meetingVal !== '') {
            if (previous_annual_meeting_urlVal !== '') {
              if (isDate(previous_annual_meetingVal, req)) {
                previous_annual_meetingArray.push({
                  label: previous_annual_meetingVal !== null ? previous_annual_meetingVal : 'N/A',
                  element: 'hyperlink',
                  link: previous_annual_meeting_urlVal,
                });
              } else {
                previous_annual_meetingArray.push({ label: previous_annual_meetingVal, element: 'hyperlink' });
              }
            }
            if (previous_annual_meeting_urlVal === '') {
              if (isDate(previous_annual_meetingVal, req)) {
                previous_annual_meetingArray.push({
                  label: previous_annual_meetingVal !== null ? previous_annual_meetingVal : 'N/A',
                  element: 'label',
                });
              } else {
                previous_annual_meetingArray.push({ label: previous_annual_meetingVal, element: 'label' });
              }
            }
            if (isDate(previous_annual_meetingVal, req)) {
              if (
                result_MeetingInfo.recordset[0].virtual_meeting_prev !== '' &&
                result_MeetingInfo.recordset[0].virtual_meeting_prev !== 0 &&
                result_MeetingInfo.recordset[0].virtual_meeting_prev !== 3
              ) {
                let ToolTip = '';
                if (result_MeetingInfo.recordset[0].virtual_meeting_prev === 1) {
                  ToolTip = 'Virtual-only';
                }
                if (result_MeetingInfo.recordset[0].virtual_meeting_prev === 2) {
                  ToolTip = 'Hybrid';
                }
                previous_annual_meetingArray.push({ label: 'virtualmeetingicon.png', element: 'img', ToolTip });
              }
            }
          } else {
            previous_annual_meetingArray.push({ label: 'None', element: 'label' });
          }

          if (upcoming_special_meetingVal !== '') {
            if (upcoming_special_meetingVal === 'None') {
              upcoming_special_meetingArray.push({ label: 'None', element: 'label' });
            } else {
              if (upcoming_special_meeting_urlVal !== '') {
                if (isDate(upcoming_special_meetingVal, req)) {
                  upcoming_special_meetingArray.push({
                    label: upcoming_special_meetingVal !== null ? upcoming_special_meetingVal : 'N/A',
                    element: 'hyperlink',
                    link: upcoming_special_meeting_urlVal,
                  });
                }
              }
              if (upcoming_special_meeting_urlVal === '') {
                if (isDate(upcoming_special_meetingVal, req)) {
                  upcoming_special_meetingArray.push({
                    label: upcoming_special_meetingVal !== null ? upcoming_special_meetingVal : 'N/A',
                    element: 'label',
                  });
                } else {
                  upcoming_special_meetingArray.push({ label: upcoming_special_meetingVal, element: 'label' });
                }
              }
            }
          } else {
            upcoming_special_meetingArray.push({ label: 'None', element: 'label' });
          }

          if (previous_special_meetingVal !== '') {
            if (previous_special_meetingVal === 'None') {
              previous_special_meetingArray.push({ label: 'None', element: 'label' });
            } else {
              if (previous_special_meeting_urlVal !== '') {
                if (isDate(previous_special_meetingVal, req)) {
                  previous_special_meetingArray.push({
                    label: previous_special_meetingVal !== null ? previous_special_meetingVal : 'N/A',
                    element: 'hyperlink',
                    link: previous_special_meeting_urlVal,
                  });
                }
              }
              if (previous_special_meeting_urlVal === '') {
                if (isDate(previous_special_meetingVal, req)) {
                  previous_special_meetingArray.push({
                    label: previous_special_meetingVal !== null ? previous_special_meetingVal : 'N/A',
                    element: 'label',
                  });
                } else {
                  previous_special_meetingArray.push({ label: previous_special_meetingVal, element: 'label' });
                }
              }
            }
          } else {
            previous_special_meetingArray.push({ label: 'None', element: 'label' });
          }

          if (shareholder_prop_deadlineVal !== '') {
            shareholder_prop_deadlineVal =
              shareholder_prop_deadlineVal !== null
                ? `${dateFormat(shareholder_prop_deadlineVal, 'dd-mmm-yyyy', true)} (for inclusion in Proxy Statement)`
                : 'N/A';
          } else {
            shareholder_prop_deadlineVal = 'N/A';
          }

          if (nomination_deadlineVal !== '') {
            nomination_deadlineVal =
              nomination_deadlineVal !== null
                ? `${dateFormat(nomination_deadlineVal, 'dd-mmm-yyyy', true)} (not for inclusion in Proxy Statement)`
                : 'N/A';
          } else {
            nomination_deadlineVal = 'N/A';
          }

          arrayMeetingInfo = {
            upcoming_annual_meeting: upcoming_annual_meetingArray,
            previous_annual_meeting: previous_annual_meetingArray,
            upcoming_special_meeting: upcoming_special_meetingArray,
            previous_special_meeting: previous_special_meetingArray,
            board_meetings_last_year: board_meetings_last_yearVal !== '' ? board_meetings_last_yearVal : 'N/A',
            shareholder_prop_deadline: shareholder_prop_deadlineVal,
            nomination_deadline: nomination_deadlineVal,

            company_name: result_MeetingInfo.recordset[0].company_name,
            virtual_meeting_prev: result_MeetingInfo.recordset[0].virtual_meeting_prev,
            virtual_meeting: result_MeetingInfo.recordset[0].virtual_meeting,
          };
        }
      } catch (error) {
        general.ErrorLog(
          `${governanceCompanyOverviewRoutes}/GetGovOverview_meetingInfo_Quickview_StockData/GovMeetingInformation`,
          `${error} - Meeting Info`,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
      // #endregion

      // #region Stock table
      try {
        resultOverviewStock = await pool.request().input('pid', sql.Int, req.body.pid).execute('getAigOverviewStock');
        resultOverviewStock.recordset.forEach((element) => general.validateNulltoEmptyString(element));
      } catch (error) {
        general.ErrorLog(
          `${governanceCompanyOverviewRoutes}/GetGovOverview_meetingInfo_Quickview_StockData/getAigOverviewStock`,
          `${error} - Stock table`,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
      // #endregion

      // #region Chart
      try {
        const resultChart = await pool.request().input('pid', sql.Int, req.body.pid).execute('AiGScoreJson');
        resultChart.recordset.forEach((element) => general.validateNulltoEmptyString(element));
        const score_json = resultChart.recordset[0][Object.keys(resultChart.recordset[0])[0]];
        if (score_json) {
          chartJSON = resultChart.recordset !== undefined ? JSON.parse(score_json)[0] : [];
          chartString =
            Object.keys(chartJSON).length > 0
              ? `Score: ${chartJSON.score} (${chartJSON.ranking})\n-Board Structure: ${chartJSON.board_structure}\n-Governance: ${chartJSON.governance}`
              : '';
        } else {
          chartString = '';
        }
      } catch (error) {
        general.ErrorLog(
          `${governanceCompanyOverviewRoutes}/GetGovOverview_meetingInfo_Quickview_StockData/AiGScoreJson`,
          `${error} - Chart`,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
      // #endregion
    } catch (error) {
      general.ErrorLog(
        `${governanceCompanyOverviewRoutes}/GetGovOverview_meetingInfo_Quickview_StockData/quickview`,
        `${error} - GetGovOverview_meetingInfo_Quickview_StockData()`,
        req.user.User_Id,
        req.body,
        req.headers.origin
      );
    }

    res.json({
      data_QuickView: arrayQuickView,
      data_MeetingInfo: arrayMeetingInfo,
      data_Stock: resultOverviewStock.recordset,
      data_Chart: chartJSON,
      data_ChartInfo: chartString,
    });
  } catch (error) {
    general.ErrorLog(
      `${governanceCompanyOverviewRoutes}GetGovOverview_meetingInfo_Quickview_StockData`,
      `${error} - GetGovOverview_meetingInfo_Quickview_StockData()`,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetComparisionTables(req, res) {
  try {
    const pool = await poolPromise;
    const result_BoardandDirectors = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .input('filterindex', sql.Int, req.body.filterindex)
      .execute('GetGovBoardandDirectorsDetails_v3');
    result_BoardandDirectors.recordset.forEach((element) => general.validateNulltoEmptyString(element));

    // /////////////
    const arrayShareholder = [];
    const arrayOwnership = [];
    const result_ShareholderRightsAndVoting = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetGovShareholderRightsAndVoting_v2');
    if (
      result_ShareholderRightsAndVoting.recordsets !== undefined &&
      result_ShareholderRightsAndVoting.recordsets.length > 0
    ) {
      result_ShareholderRightsAndVoting.recordsets[0].forEach((element) => general.validateNulltoEmptyString(element));
      result_ShareholderRightsAndVoting.recordsets[1].forEach((element) => general.validateNulltoEmptyString(element));

      // shareHolder : 13,14 &  ownership : 37
      if (result_ShareholderRightsAndVoting.recordsets[0].length > 0) {
        for (const x of result_ShareholderRightsAndVoting.recordsets[0]) {
          try {
            const result_GetGovMetricSHPData = await pool
              .request()
              .input('pid', sql.Int, req.body.pid)
              .input('gov_metric_id', sql.Int, x.gov_metric_id)
              .execute('GetGovMetricSHPData');
            let proposal_information = '';
            result_GetGovMetricSHPData.recordset.map((a) => {
              proposal_information += `${a.proposal_information}\n`;
            });
            if (x.gov_metric_id === 13 || x.gov_metric_id === 14) {
              arrayShareholder.push({ ...x, proposal_information });
            }
            if (x.gov_metric_id === 37) {
              arrayOwnership.push({ ...x, proposal_information });
            }
          } catch (error) {
            general.ErrorLog(
              `${governanceCompanyOverviewRoutes}/GetComparisionTables/1`,
              `${error} - GetGovMetricSHPData-arrayOwnership`,
              req.user.User_Id,
              req.body,
              req.headers.origin
            );
          }
        }
      }
      if (result_ShareholderRightsAndVoting.recordsets[1].length > 0) {
        for (const x of result_ShareholderRightsAndVoting.recordsets[1]) {
          try {
            const result_GetGovMetricSHPData = await pool
              .request()
              .input('pid', sql.Int, req.body.pid)
              .input('gov_metric_id', sql.Int, x.gov_metric_id)
              .execute('GetGovMetricSHPData');
            let proposal_information = '';
            result_GetGovMetricSHPData.recordset.map((a) => {
              proposal_information += `${a.proposal_information}\n`;
            });
            if (x.gov_metric_id === 13 || x.gov_metric_id === 14) {
              arrayShareholder.push({ ...x, proposal_information });
            }
            if (x.gov_metric_id === 37) {
              arrayOwnership.push({ ...x, proposal_information });
            }
          } catch (error) {
            general.ErrorLog(
              `${governanceCompanyOverviewRoutes}/GetComparisionTables/2`,
              `${error} - GetGovMetricSHPData-arrayShareholder`,
              req.user.User_Id,
              req.body,
              req.headers.origin
            );
          }
        }
      }
    }

    res.json({
      dataBoardandDirectors: result_BoardandDirectors.recordset,
      dataShareholder: arrayShareholder,
      dataOwnership: arrayOwnership,
    });
  } catch (error) {
    general.ErrorLog(
      `${governanceCompanyOverviewRoutes}/GetComparisionTables`,
      `${error} - GetComparisionTables()`,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetBoardAndDirectorsIndexDDL(req, res) {
  let arrayDDL = [];
  const myjson = [];
  try {
    const pool = await poolPromise;
    const resultDDL = await pool.request().input('pid', sql.Int, req.body.pid).execute('getBoardAndDirectorsIndex');
    resultDDL.recordset.forEach((element) => general.validateNulltoEmptyString(element));
    const result_company_profile = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyOverviewProfile');
    const data = result_company_profile.recordset[0] !== null && result_company_profile.recordset[0] !== undefined && result_company_profile.recordset[0];
    const ddl_data = resultDDL.recordset;

    if (ddl_data.length > 0) {
      ddl_data.forEach((item) => {
            const str = item.index_name.replace(' ', '');
            myjson.push({
              value: item.index_id, label: item.index_name, value1: str
            });
      });
    }
    const ordering = {}; // map for efficient lookup of sortIndex
    const sortOrder = [
      'FTSE 100',
      'FTSE 350',
      'FTSE 250',
      'FTSE SMALLCAP',
      'FTSE Fledgling',
      'FTSE AIM All-Share',
    ];
    const orderingUS = {}; // map for efficient lookup of sortIndex
    const sortOrderUS = [
      'S&P500',
      'Russell 3000'
    ];
    for (let i = 0; i < sortOrder.length; i++) {
      ordering[sortOrder[i]] = i;
    }
    for (let i = 0; i < sortOrderUS.length; i++) {
      orderingUS[sortOrderUS[i]] = i;
    }
    if (data.country_name !== null && data.country_name !== undefined) {
      if (data.country_name === 'UK') {
        myjson.sort((a, b) => ordering[a.label] - ordering[b.label]);
      }
      if (data.country_name === 'US') {
        myjson.sort((a, b) => orderingUS[a.label] - orderingUS[b.label]);
        arrayDDL = sortOrderUS;
      } else {
        arrayDDL = sortOrder;
      }
    }

    if (myjson.length <= 0) {
      resultDDL.recordset.map((x) => {
        if (x.default === 1) {
          const str = x.index_name.replace(' ', '');
          myjson.push({ value: x.index_id, label: x.index_name, value1: str });
        }
      });
    }
    res.json({
      data: myjson !== null && myjson !== undefined && myjson.length > 0 ? myjson : [],
      selectionData: myjson.length > 0 ? myjson[0] : [],
    });
  } catch (error) {
    general.ErrorLog(
      `${governanceCompanyOverviewRoutes}/GetBoardAndDirectorsIndexDDL`,
      `${error} - GetBoardAndDirectorsIndexDDL()`,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
