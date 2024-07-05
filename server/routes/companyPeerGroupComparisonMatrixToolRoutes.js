/* eslint-disable no-var */
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const companyPeerGroupComparisonMatrixToolRoutes = 'companyPeerGroupComparisonMatrixToolRoute';

router.post('/getVulDDL', authenticateToken, getVulDDL);
router.post('/GetVulDataList', authenticateToken, GetVulDataList);
router.post('/getVCId', authenticateToken, getVCId);

// /////////////////////////////////////////

function catchFn(e) {
  console.log(
    e.lineNumber,
    `-----------------\n${e.procName}\n---------------------`
  );
  console.error(e.message);
}
function replaceToUnderscore(item) {
  const word = item.split(' ').join('_');
  return word
    .toString()
    .replace('(', '_')
    .replace(')', '_')
    .replace('.', '_')
    .replace(',', '_')
    .replace('&', '_')
    .replace('$', '_')
    .replace('%', '_')
    .replace('*', '_')
    .replace('-', '_')
    .replace('/', '_')
    .replace(' ', '_')
    .trim();
}
const transposeRowsToColumns = (matrix) => {
  try {
    const [row] = matrix;
    return row.map((value, column) => matrix.map((row) => row[column]));
  } catch (e) {
    catchFn(e);
  }
};
const transposeColumnsToRows = (a) => {
  try {
    return Object.keys(a[0]).map((c) => a.map((r) => r[c]));
  } catch (e) {
    catchFn(e);
  }
};
function ColourList(colorNo) {
  const ColourList_0 = '#FFFFFF';
  const ColourList_1 = '#639CDF';
  const ColourList_2 = '#4B76A3';
  const ColourList_3 = '#7FA2CA';
  const ColourList_4 = '#1465E6';
  const ColourList_5 = '#031E54';
  let colorTone = '';

  if (colorNo === 1) {
    colorTone = ColourList_1;
  } else if (colorNo === 2) {
    colorTone = ColourList_2;
  } else if (colorNo === 3) {
    colorTone = ColourList_3;
  } else if (colorNo === 4) {
    colorTone = ColourList_4;
  } else if (colorNo === 5) {
    colorTone = ColourList_5;
  } else {
    colorTone = ColourList_0;
  }
  return colorTone;
}
function isNumeric(n) {
  return typeof n === 'number' && !Number.isNaN(n);
}
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
// /////////////////////////////////////////

async function getVulDDL(req, res, next) {
  try {
    res.json(await getReturnVulDDL());
  } catch (error) {
    general.ErrorLog(
      `${companyPeerGroupComparisonMatrixToolRoutes}/getVulDDL`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function getReturnVulDDL() {
  try {
    const pool = await poolPromise;
    const resultKeyFinancials = await pool
      .request()
      .execute('VunListKeyFinancialsWithoutData');
    const resultKeyRatios = await pool
      .request()
      .execute('VunListKeyRatiosWithoutData');

    const jsonKeyFinancials = [];
    const uniqueKeyFinancials = [
      ...new Set(
        resultKeyFinancials.recordset.map(
          (item) => item.key_financials_heading_id
        )
      ),
    ];
    uniqueKeyFinancials.map((e) => {
      {
        let labeltext = '';
        let valuetext = '';
        const jsonChildren = [];
        resultKeyFinancials.recordset
          .filter((res) => res.key_financials_heading_id === e)
          .map((row) => {
            labeltext = row.heading_text.replace(/(?:\r\n|\r|\n)/g, '');
            valuetext = row.key_financials_heading_id;
            jsonChildren.push({
              label: row.entry_text.replace(/(?:\r\n|\r|\n)/g, ''),
              value: row.metric_id,
              checked: true,
            });
          });
        jsonKeyFinancials.push({
          label: labeltext,
          value: valuetext,
          children: jsonChildren,
          checked: true,
          expanded: true,
        });
      }
    });

    const jsonKeyRatios = [];
    const uniqueKeyRatios = [
      ...new Set(
        resultKeyRatios.recordset.map((item) => item.key_ratios_heading_id)
      ),
    ];
    uniqueKeyRatios.map((e) => {
      {
        let labeltext = '';
        let valuetext = '';
        const jsonChildren = [];
        resultKeyRatios.recordset
          .filter((res) => res.key_ratios_heading_id === e)
          .map((row) => {
            labeltext = row.heading_text.replace(/(?:\r\n|\r|\n)/g, '');
            valuetext = row.key_ratios_heading_id;
            jsonChildren.push({
              label: row.entry_text.replace(/(?:\r\n|\r|\n)/g, ''),
              value: row.metric_id,
              checked: true,
            });
          });
        jsonKeyRatios.push({
          label: labeltext,
          value: valuetext,
          children: jsonChildren,
          checked: true,
          expanded: true,
        });
      }
    });

    return {
      DDLKeyFinancials: [
        {
          label: 'Key Financials',
          value: '1',
          children: jsonKeyFinancials,
          checked: true,
        },
      ],
      DDLKeyRatios: [
        {
          label: 'Key Ratios',
          value: '2',
          children: jsonKeyRatios,
          checked: true,
        },
      ],
      DDLVulnerability: [
        {
          label: 'Vulnerability',
          value: '0',
          checked: true,
          expanded: true,
          children: [
            {
              label: 'Score',
              value: '1',
            },
            {
              label: 'Percentile Rank',
              value: '2',
            },
          ],
        },
      ],
      DDLOwnership: [
        {
          label: 'Ownership',
          value: '0',
          checked: true,
          expanded: true,
          children: [
            {
              label: 'Total Holding by Institutional Investors',
              value: '1',
            },
            {
              label: 'Total Holding by Activist Investors',
              value: '2',
            },
          ],
        },
      ],
      DDLGovernance: [
        {
          label: 'Governance',
          value: '0',
          checked: true,
          expanded: true,
          children: [
            {
              label: 'No. of Directors',
              value: '1',
            },
            {
              label: 'Longest Tenure',
              value: '4',
            },
            {
              label: 'Oldest Director',
              value: '7',
            },
          ],
        },
      ],
      DDLVoting: [
        {
          label: 'Voting',
          value: '0',
          checked: true,
          expanded: true,
          children: [
            {
              label: 'Minimum Vote in Favour of Directors',
              value: '1',
            },
            {
              label: 'Minimum Vote in Favour of Remuneration',
              value: '2',
            },
          ],
        },
      ],
      peerGroupSelection: [
        {
          label: 'Default',
          value: '0',
        },
        {
          label: 'Comparison Group',
          value: '1',
        },
      ],
    };
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/getReturnVulDDL`, e);
    return [];
  }
}
// /////////////////////////////////////////

async function getVCId(req, res, next) {
  const pool = await poolPromise;
  const { user_id } = req.body; // txtMarketCapMinRange, txtMarketCapMaxRange, companySearchOptionSelection,
  let { VCId, companySelection } = req.body;
  const { companySearchOptionSelection } = req.body;
  try {
    if (companySearchOptionSelection !== undefined) {
      const restult = await pool
        .request()
        .query(
          `select pid from [activist_insight].dbo.[fnc_getPIDsFromSearch](${companySearchOptionSelection.value})`
        );
      companySelection =
        restult.recordset.length > 0 ? restult.recordset : undefined;
    }

    let CompanyQuery = '';
    if (VCId === 0) {
      const resultVcID = await pool
        .request()
        .input('user_id', sql.Int, user_id.toString())
        .execute('VunCreateNewComparison');
      if (resultVcID.recordset.length > 0) {
        VCId = resultVcID.recordset[0].vulnerability_comparison_id;
      }
    }

    if (companySelection !== undefined) {
      if (companySelection.length > 0) {
        // if (txtMarketCapMinRange !== '' && txtMarketCapMaxRange !== '' && companySelection.length > 0) {
        // await pool.request().query(`EXEC VunRemoveAllSelectedCompanies ${VCId.toString()}`);
        await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId)
          .execute('VunClearSelectedCompanies');
        if (companySelection.length > 50) {
          companySelection = companySelection.slice(0, 50);
        }
      } else {
        // No specific company selected
        const top50companySelection = await pool
          .request()
          .execute('top50companySelection');
        const dataArray = [];
        const data = top50companySelection.recordset;
        data.forEach((item) => {
          dataArray.push({
            label: item.label,
            value: item.value,
            pid: item.value,
          });
        });
        companySelection = dataArray;
      }
      if (companySelection.length > 0) {
        for (const element of companySelection) {
          await pool
            .request()
            .input('vulnerability_comparison_id', sql.Int, VCId)
            .input('pid', sql.Int, element.pid)
            .execute('VunAddCompanyToComparison');
        }
      }
    } else {
      await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .execute('VunDeleteCompanyToComparison');
    }
    await pool
      .request()
      .input('vulnerability_comparison_id', sql.Int, VCId)
      .execute('VunClearCompanyCriteria');

    const resultVunListProvisionalChangesToCompanies = await pool
      .request()
      .input('vulnerability_comparison_id', sql.Int, VCId.toString())
      .execute('VunListProvisionalChangesToCompanies');
    if (resultVunListProvisionalChangesToCompanies.recordset.length > 0) {
      for (const element of resultVunListProvisionalChangesToCompanies.recordset) {
        if (element.provisional_add.toString() === '1') {
          await pool
            .request()
            .input('vulnerability_comparison_id', sql.Int, VCId)
            .input('pid', sql.Int, element.pid)
            .execute('VunAddCompanyToComparisonV2');
        } else {
          await pool
            .request()
            .input('vulnerability_comparison_id', sql.Int, VCId)
            .input('pid', sql.Int, element.pid)
            .execute('VunRemoveSelectedCompanyByComparisonIdAndPid');
        }
      }
    }
    CompanyQuery = `SELECT tblVulnerability_comparison_companies.pid FROM tblVulnerability_comparison_companies JOIN proxy_insight.dbo.tblIssuer ON tblVulnerability_comparison_companies.pid = tblIssuer.PID WHERE vulnerability_comparison_id = ${VCId.toString()}`;
    if (companySelection !== undefined) {
      await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .input('company_query', sql.VarChar, CompanyQuery)
        .input('no_companies', sql.Int, companySelection.length)
        .input('company_criteria_string', sql.VarChar, 'Specific')
        .execute('VunSetCompanyQueryForVulnerabilityComparison');
    } else {
      await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .input('company_query', sql.VarChar, CompanyQuery)
        .input('no_companies', sql.Int, 0)
        .input('company_criteria_string', sql.VarChar, 'Specific')
        .execute('VunSetCompanyQueryForVulnerabilityComparison');
    }

    const status = await checkCriteria(req, VCId);
    return res.json({ Status: status, vcid: VCId });
    // }
    // return res.json({ Status: false, vcid: VCId });
  } catch (e) {
    catchFn(e);
    general.ErrorLog(
      `${companyPeerGroupComparisonMatrixToolRoutes}/getVCId`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    return res.json({ Status: false, vcid: VCId });
  }
}
async function checkCriteria(req, VCId) {
  const pool = await poolPromise;
  let Proceed = false;
  let chkAllCriteria = false;
  let MetricCriteriaString = '';
  let NoCriteria = 0;
  const CHECKED_ALL = 'checked all';

  try {
    const jsonDDL = await getReturnVulDDL();
    const {
      SetKeyFinancials,
      SetKeyRatios,
      SetVulnerability,
      SetOwnership,
      SetGovernance,
      SetVoting,
      user_id,
    } = req.body;

    let result_VunCheckOwnershipOfCustom = [];

    if (VCId > 0) {
      result_VunCheckOwnershipOfCustom = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .input('user_id', sql.Int, user_id)
        .execute('VunCheckOwnershipOfComparison');
    } else {
      result_VunCheckOwnershipOfCustom = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId * -1)
        .input('user_id', sql.Int, user_id)
        .execute('VunCheckOwnershipOfComparison');
    }

    if (
      result_VunCheckOwnershipOfCustom.recordset !== undefined &&
      !result_VunCheckOwnershipOfCustom.recordset.length > 0
    ) {
      VCId = 0;
    }
    if (VCId !== 0) {
      await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId.toString())
        .execute('VunBuildCriteriaSetForCustomPeerGroupIfNeeded');
      if (
        SetKeyFinancials === CHECKED_ALL &&
        SetKeyRatios === CHECKED_ALL &&
        SetVulnerability === CHECKED_ALL &&
        SetOwnership === CHECKED_ALL &&
        SetGovernance === CHECKED_ALL &&
        SetVoting === CHECKED_ALL
      ) {
        chkAllCriteria = true;
      }
      //
      if (chkAllCriteria) {
        Proceed = true;
      } else {
        Proceed = false;
        // DDLVulnerability
        if (SetVulnerability === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetVulnerability.length > 0 &&
            SetVulnerability.some(
              (elementSelection) =>
                elementSelection.checked && elementSelection._depth === 1
            );
        }
        // DDLKeyFinancials
        if (SetKeyFinancials === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetKeyFinancials.length > 0 &&
            SetKeyFinancials.some(
              (elementSelection) =>
                elementSelection.checked &&
                (elementSelection._depth === 1 || elementSelection._depth === 2)
            );
        }
        // DDLKeyRatios
        if (SetKeyRatios === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetKeyRatios.length > 0 &&
            SetKeyRatios.some(
              (elementSelection) =>
                elementSelection.checked &&
                (elementSelection._depth === 1 || elementSelection._depth === 2)
            );
        }
        // DDLOwnership
        if (SetOwnership === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetOwnership.length > 0 &&
            SetOwnership.some(
              (elementSelection) =>
                elementSelection.checked && elementSelection._depth === 1
            );
        }
        // DDLGovernance
        if (SetGovernance === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetGovernance.length > 0 &&
            SetGovernance.some(
              (elementSelection) =>
                elementSelection.checked && elementSelection._depth === 1
            );
        }
        // DDLVoting
        if (SetVoting === CHECKED_ALL) {
          Proceed = true;
        } else {
          Proceed =
            SetVoting.length > 0 &&
            SetVoting.some(
              (elementSelection) =>
                elementSelection.checked && elementSelection._depth === 1
            );
        }
      }
      /// ///////////////
      if (Proceed) {
        await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId.toString())
          .execute('VunClearComparisonCriteria');
        if (chkAllCriteria) {
          await RecordComparisonCriteria(0, -1, -1, -1, 1, VCId, req);
          await RecordComparisonCriteria(1, -1, -1, -1, 1, VCId, req);
          await RecordComparisonCriteria(2, -1, -1, -1, 1, VCId, req);
          await RecordComparisonCriteria(3, -1, -1, -1, 1, VCId, req);
          await RecordComparisonCriteria(4, -1, -1, -1, 1, VCId, req);
          MetricCriteriaString = 'All Criteria, ';
          NoCriteria = 9;

          jsonDDL.DDLKeyFinancials[0].children.forEach((depth1Item) => {
            depth1Item.children.forEach(() => {
              NoCriteria += 1;
            });
          });
          jsonDDL.DDLKeyRatios[0].children.forEach((depth1Item) => {
            depth1Item.children.forEach(() => {
              NoCriteria += 1;
            });
          });
        } else {
          MetricCriteriaString = '';
          NoCriteria = 0;

          if (SetVulnerability === CHECKED_ALL) {
            await RecordComparisonCriteria(0, -1, -1, -1, 1, VCId, req);
            MetricCriteriaString += 'All Vulnerability, ';
            NoCriteria += 2;
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const elementSelection of SetVulnerability) {
              if (elementSelection._depth === 1 && elementSelection.checked) {
                const C1 = Number(elementSelection._id.split('-')[2]);
                await RecordComparisonCriteria(0, C1, -1, -1, 1, VCId, req);
                MetricCriteriaString += `${elementSelection.label}, `;
                NoCriteria += 1;
              }
            }
          }
          //
          if (
            SetKeyFinancials === CHECKED_ALL &&
            SetKeyRatios === CHECKED_ALL
          ) {
            await RecordComparisonCriteria(1, -1, -1, -1, 1, VCId, req);
            MetricCriteriaString += 'All Financials, ';
            SetKeyFinancials.length > 0 &&
              SetKeyFinancials.children.map((elementDepth1) => {
                elementDepth1.children.map(() => {
                  NoCriteria += 1;
                });
              });
            SetKeyRatios.length > 0 &&
              SetKeyRatios.children.map((elementDepth1) => {
                elementDepth1.children.map(() => {
                  NoCriteria += 1;
                });
              });
          } else {
            if (SetKeyFinancials === CHECKED_ALL) {
              const C1 = 0;
              await RecordComparisonCriteria(1, C1, -1, -1, 1, VCId, req);
              MetricCriteriaString += `All ${jsonDDL.DDLKeyFinancials[0].label}, `;
              jsonDDL.DDLKeyFinancials[0].children.forEach((depth1Item) => {
                depth1Item.children.forEach(() => {
                  NoCriteria += 1;
                });
              });
            } else {
              // eslint-disable-next-line no-lonely-if
              if (SetKeyFinancials.length > 0) {
                const C1 = 0;
                let C2 = 0;
                for (const element of jsonDDL.DDLKeyFinancials[0].children) {
                  for (const elementSelection of SetKeyFinancials) {
                    if (
                      element.label === elementSelection.label &&
                      element.value === elementSelection.value &&
                      elementSelection.checked &&
                      elementSelection._depth === 1
                    ) {
                      await RecordComparisonCriteria(
                        1,
                        C1,
                        C2,
                        -1,
                        elementSelection.value,
                        VCId,
                        req
                      );
                      MetricCriteriaString += `All ${jsonDDL.DDLKeyFinancials[0].label} ${elementSelection.label}, `;
                      element.children.forEach(() => {
                        NoCriteria += 1;
                      });
                    } else {
                      let C3 = 0;
                      for (const elementDepth2 of element.children) {
                        if (
                          elementDepth2.label === elementSelection.label &&
                          elementDepth2.value === elementSelection.value &&
                          elementSelection.checked &&
                          elementSelection._depth === 2
                        ) {
                          await RecordComparisonCriteria(
                            1,
                            C1,
                            C2,
                            C3,
                            elementDepth2.value,
                            VCId,
                            req
                          );
                          MetricCriteriaString += `${elementDepth2.label}, `;
                          NoCriteria += 1;
                        }
                        C3 += 1;
                      }
                    }
                  }
                  C2 += 1;
                }
              }
            }
            if (SetKeyRatios === CHECKED_ALL) {
              const C1 = 1;
              await RecordComparisonCriteria(1, C1, -1, -1, 1, VCId, req);
              MetricCriteriaString += `All ${jsonDDL.DDLKeyRatios[0].label}, `;
              jsonDDL.DDLKeyRatios[0].children.forEach((depth1Item) => {
                depth1Item.children.forEach(() => {
                  NoCriteria += 1;
                });
              });
            } else {
              // eslint-disable-next-line no-lonely-if
              if (SetKeyRatios.length > 0) {
                const C1 = 1;
                let C2 = 0;
                for (const element of jsonDDL.DDLKeyRatios[0].children) {
                  for (const elementSelection of SetKeyRatios) {
                    if (
                      element.label === elementSelection.label &&
                      element.value === elementSelection.value &&
                      elementSelection.checked &&
                      elementSelection._depth === 1
                    ) {
                      await RecordComparisonCriteria(
                        1,
                        C1,
                        C2,
                        -1,
                        elementSelection.value,
                        VCId,
                        req
                      );
                      MetricCriteriaString += `All ${jsonDDL.DDLKeyRatios[0].label} ${elementSelection.label}, `;
                      element.children.forEach(() => {
                        NoCriteria += 1;
                      });
                    } else {
                      let C3 = 0;
                      for (const elementDepth2 of element.children) {
                        if (
                          elementDepth2.label === elementSelection.label &&
                          elementDepth2.value === elementSelection.value &&
                          elementSelection.checked &&
                          elementSelection._depth === 2
                        ) {
                          await RecordComparisonCriteria(
                            1,
                            C1,
                            C2,
                            C3,
                            elementDepth2.value,
                            VCId,
                            req
                          );
                          MetricCriteriaString += `${elementDepth2.label}, `;
                          NoCriteria += 1;
                        }
                        C3 += 1;
                      }
                    }
                  }
                  C2 += 1;
                }
              }
            }
          }
          //
          if (SetOwnership === CHECKED_ALL) {
            await RecordComparisonCriteria(2, -1, -1, -1, 1, VCId, req);
            MetricCriteriaString += 'All Ownership, ';
            NoCriteria += 2;
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const elementSelection of SetOwnership) {
              if (elementSelection._depth === 1 && elementSelection.checked) {
                const C1 = Number(elementSelection._id.split('-')[2]);
                await RecordComparisonCriteria(2, C1, -1, -1, 1, VCId, req);
                MetricCriteriaString += `${elementSelection.label}, `;
                NoCriteria += 1;
              }
            }
          }
          //
          if (SetGovernance === CHECKED_ALL) {
            await RecordComparisonCriteria(3, -1, -1, -1, 1, VCId, req);
            MetricCriteriaString += 'All Governance, ';
            NoCriteria += 3;
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const elementSelection of SetGovernance) {
              if (elementSelection._depth === 1 && elementSelection.checked) {
                const C1 = Number(elementSelection._id.split('-')[2]);
                await RecordComparisonCriteria(3, C1, -1, -1, 1, VCId, req);
                MetricCriteriaString += `${elementSelection.label}, `;
                NoCriteria += 1;
              }
            }
          }
          //
          if (SetVoting === CHECKED_ALL) {
            await RecordComparisonCriteria(4, -1, -1, -1, 1, VCId, req);
            MetricCriteriaString += 'All Voting, ';
            NoCriteria += 2;
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const elementSelection of SetVoting) {
              if (elementSelection._depth === 1 && elementSelection.checked) {
                const C1 = Number(elementSelection._id.split('-')[2]);
                await RecordComparisonCriteria(4, C1, -1, -1, 1, VCId, req);
                MetricCriteriaString += `${elementSelection.label}, `;
                NoCriteria += 1;
              }
            }
          }
          //
        }
        MetricCriteriaString = MetricCriteriaString.substr(
          0,
          MetricCriteriaString.length - 2
        ).replace("'", "''");

        await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId)
          .input('metric_criteria_string', sql.VarChar, MetricCriteriaString)
          .input('no_metrics', sql.Int, NoCriteria)
          .execute('VunSetComparisonMetricCriteria');
        return true;
      }
    }
    return false;
  } catch (e) {
    catchFn(e);
    general.ErrorLog(
      `${companyPeerGroupComparisonMatrixToolRoutes}/checkCriteria`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    return false;
  }
}

// /////////////////////////////////////////

async function RecordComparisonCriteria(C1, C2, C3, C4, TableId, VCId, req) {
  try {
    const pool = await poolPromise;
    C2 = C2 === -1 ? null : C2;
    C3 = C3 === -1 ? null : C3;
    C4 = C4 === -1 ? null : C4;

    await pool
      .request()
      .input('vulnerability_comparison_id', sql.Int, VCId)
      .input('c1', sql.Int, C1)
      .input('c2', sql.Int, C2)
      .input('c3', sql.Int, C3)
      .input('c4', sql.Int, C4)
      .input('table_id', sql.Int, TableId)
      .execute('VunAddNewComparisonCriteria');
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/RecordComparisonCriteria`, e, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function formatterNumItem(item, field) {
  let NoDP = -1;

  if (item === '' || item === 0) {
    return item;
  }
  if (item === null || item === undefined) {
    return '';
  }
  if (
    field === 'score' ||
    field === 'prank' ||
    field === 'Institutional_investment' ||
    field === 'Activist_investment' ||
    field === 'no_directors' ||
    field === 'max_tenure' ||
    field === 'max_age' ||
    field === 'min_for_pcent_dir' ||
    field === 'min_for_pcent_rem'
  ) {
    if (field === 'score') {
      NoDP = 1;
    } else if (field === 'prank') {
      NoDP = 0;
    } else if (field === 'Institutional_investment') {
      NoDP = 2;
    } else if (field === 'Activist_investment') {
      NoDP = 2;
    } else if (field === 'no_directors') {
      NoDP = 0;
    } else if (field === 'max_tenure') {
      NoDP = 0;
    } else if (field === 'max_age') {
      NoDP = 0;
    } else if (field === 'min_for_pcent_dir') {
      NoDP = 2;
    } else if (field === 'min_for_pcent_rem') {
      NoDP = 2;
    } else {
      NoDP = -1;
    }
    if (NoDP === -1) {
      return item;
    }
    if (NoDP >= 0) {
      return Number(item).toFixed(NoDP);
    }
  } else {
    if (item.toString().length > 0) {
      if (!isFloat(item)) {
        if ((Number(item) / 1000).toFixed(0) === '0') {
          return item;
        }
        return general.NumberFormatFn((item / 1000).toFixed(0));
      }
      return Number(item).toFixed(2);
    }
    return item;
  }
  return item;
}

async function CalcAverages(item, peerGroupSelection, req) {
  const arr = [];
  let AbsDiff = [];
  let Med = '';
  var Cnt = 0;
  var Pcnt = 0;
  var TopHalf = 0;
  var BottomHalf = 0;
  var MADM = 0;
  var ChartHeight = 40;

  // Below code only for 'Group Median' column
  // BottomHalf, TopHalf for => 'Group Median'

  try {
    item.forEach((element) => {
      if (element[element.field].toString().length > 0) {
        arr.push(element[element.field]);
        Cnt += 1;
      }
    });
    if (Cnt === 0) {
      Med = '';
    } else {
      arr.sort((a, b) => a - b);
      if (Cnt % 2 === 1) {
        Med = arr[(Cnt - 1) / 2];
      } else {
        Med = (Number(arr[Cnt / 2]) + Number(arr[Cnt / 2 - 1])) / 2;
      }
    }
    const valueStatus = Med === '' ? '' : Number(Med);
    if (isNumeric(valueStatus)) {
      const minArr = Number(Math.min.apply(Math, arr));
      const maxArr = Number(Math.max.apply(Math, arr));
      const diffMinMax = maxArr - minArr;
      if (diffMinMax === 0) {
        Pcnt = 0;
        BottomHalf = 0;
        TopHalf = 0;
      } else {
        TopHalf = 0;
        Pcnt = ((Number(Med) - minArr) / diffMinMax).toFixed(2);
        BottomHalf = Number((ChartHeight * Number(Pcnt)).toFixed(0));
        TopHalf = Number((ChartHeight - Number(BottomHalf)).toFixed(0));
        if (BottomHalf === 40) {
          BottomHalf += 5;
        } else if (TopHalf === 40) {
          BottomHalf += 5;
        } else {
          BottomHalf += 5;
        }
      }
    }
    if (peerGroupSelection.value === '1') {
      AbsDiff = [];
      Cnt = 0;
      item.forEach((element) => {
        if (element[element.field].toString().length > 0) {
          AbsDiff.push(Math.abs(Number(element[element.field]) - Number(Med)));
          Cnt += 1;
        }
      });
      AbsDiff.sort((a, b) => a - b);
      if (Cnt % 2 === 1) {
        MADM = AbsDiff[(Cnt - 1) / 2];
      } else {
        MADM = (AbsDiff[Cnt / 2] + AbsDiff[Cnt / 2 - 1]) / 2;
      }
      TopHalf = 0;
      BottomHalf = 0;
    }
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/CalcAverages`, e, req.user.User_Id, req.body, req.headers.origin);
  }
  return {
    Med,
    BottomHalf,
    TopHalf,
    MADM,
  };
}

async function HasVulnerability(firstLeftSideColumn) {
  return (
    firstLeftSideColumn.length > 0 &&
    firstLeftSideColumn.some(
      (item) => item.field === 'score' || item.field === 'prank'
    )
  );
}

async function CalcNewScores(
  VCId,
  lblNoCompanies2_Visible,
  prpGetMaxComparisons,
  req
) {
  try {
    let SQLQuery_CalcNewScores = '';
    let AdHocSetId = 0;
    let NoRecs = 0;
    let ROAECount = 0;
    let MADM = 0;
    let NoCompsToPR = 0;
    let MedianProb = 0;

    const pool = await poolPromise;
    const resultAdHocSet = await pool.request().execute('VunCreateAdHocSet');
    if (resultAdHocSet.recordset.length > 0) {
      AdHocSetId = resultAdHocSet.recordset[0].ad_hoc_set_id;
    }
    if (VCId > 0) {
      const resultVunGetComparisonSpec = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .execute('VunGetComparisonSpec');
      if (resultVunGetComparisonSpec.recordset.length > 0) {
        SQLQuery_CalcNewScores = `INSERT INTO tmpVulScoreCalcsAdHoc (ad_hoc_set_id, PID, Company_name) ${resultVunGetComparisonSpec.recordset[0].company_query} ORDER BY Company_name`;
        if (lblNoCompanies2_Visible) {
          SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
            'SELECT DISTINCT tblissuer.PID',
            `SELECT DISTINCT TOP ${prpGetMaxComparisons.toString()} ${AdHocSetId.toString()} , tblissuer.PID, Company_name`
          );
          SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
            'SELECT tblVulnerability_comparison_companies.pid',
            `SELECT TOP ${prpGetMaxComparisons.toString()} ${AdHocSetId.toString()} , tblVulnerability_comparison_companies.pid, Company_name`
          );
        } else {
          SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
            'SELECT DISTINCT tblissuer.PID',
            `SELECT DISTINCT ${AdHocSetId.toString()}, tblissuer.PID, Company_name`
          );
          SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
            'SELECT tblVulnerability_comparison_companies.pid',
            `SELECT ${AdHocSetId.toString()}, tblVulnerability_comparison_companies.pid, Company_name`
          );
        }
      }
      await pool.request().query(SQLQuery_CalcNewScores);
    } else {
      await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, (VCId * -1).toString())
        .execute('VunPutCustomPeerGroupIntoAdHocSet');
    }

    const resultVunAdHocRescoreStartProcess = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocRescoreStartProcess');
    if (resultVunAdHocRescoreStartProcess.recordset.length > 0) {
      NoRecs = resultVunAdHocRescoreStartProcess.recordset[0].RecCount;
    }

    const resultVunAdHocCountROAEToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocCountROAEToPercentileRank');
    if (resultVunAdHocCountROAEToPercentileRank.recordset.length > 0) {
      ROAECount = resultVunAdHocCountROAEToPercentileRank.recordset[0].RecCount;
    }

    const resultVunAdHocListROAEToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocListROAEToPercentileRank');
    if (resultVunAdHocListROAEToPercentileRank.recordset.length > 0) {
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resultVunAdHocListROAEToPercentileRank.recordset) {
        index += 1;
        const PercentileRank = (index / ROAECount) * 100.0;
        await pool
          .request()
          .input('PID', sql.Int, element.PID)
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('ROAP_Pntl', sql.Decimal, PercentileRank)
          .execute('VunAdHocSetROAEPercentileRank');
      }
    }

    // Update ROAE_Pntl
    await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocSetNullROAEPercentileTo50');
    const resultVunAdHocCountTSR1ToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocCountTSR1ToPercentileRank');
    if (resultVunAdHocCountTSR1ToPercentileRank.recordset.length > 0) {
      ROAECount = resultVunAdHocCountTSR1ToPercentileRank.recordset[0].RecCount;
    }

    const resultVunAdHocListTSR1ToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocListTSR1ToPercentileRank');
    if (resultVunAdHocListTSR1ToPercentileRank.recordset.length > 0) {
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resultVunAdHocListTSR1ToPercentileRank.recordset) {
        index += 1;
        const PercentileRank = (index / ROAECount) * 100.0;
        await pool
          .request()
          .input('pid', sql.Int, element.PID)
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('TSR1_Pntl', sql.Decimal, PercentileRank)
          .execute('VunAdHocSetTSR1PercentileRank');
      }
    }

    await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocSetNullTSR1PercentileTo50');
    const resultVunAdHocListAllScoringParameters = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocListAllScoringParameters');
    if (resultVunAdHocListAllScoringParameters.recordset.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resultVunAdHocListAllScoringParameters.recordset) {
        const { PID, IO, AO, ROAE_Pntl, TSR1_Pntl } = element;
        const C1 =
          -3.603633549 +
          0.005396722 * IO +
          0.01334804 * AO +
          -0.002948911 * ROAE_Pntl +
          -0.006057689 * TSR1_Pntl;
        const Score = Math.exp(C1) / (1 + Math.exp(C1));
        await pool
          .request()
          .input('PID', sql.Int, PID)
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('Prob', sql.Decimal, Score)
          .execute('VunAdHocStoreProb');
      }
    }

    const resultVunAdHocCalcMedianProb = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocCalcMedianProb');
    if (resultVunAdHocCalcMedianProb.recordset.length > 0) {
      MedianProb = resultVunAdHocCalcMedianProb.recordset[0].MedProb;
    }

    await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .input('MedProb', sql.Decimal, MedianProb)
      .execute('VunAdHocCalcProbDiff');
    const resultVunAdHocCalcMADM = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .input('MedProb', sql.Decimal, MedianProb)
      .execute('VunAdHocCalcMADM');
    if (resultVunAdHocCalcMADM.recordset.length > 0) {
      MADM = resultVunAdHocCalcMADM.recordset[0].MADM;
    }

    await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .input('MedProb', sql.Decimal, MedianProb)
      .input('MADM', sql.Decimal, MADM)
      .execute('VunAdHocCalcScore');
    const resultVunAdHocCountScoresToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocCountScoresToPercentileRank');
    if (resultVunAdHocCountScoresToPercentileRank.recordset.length > 0) {
      NoCompsToPR =
        resultVunAdHocCountScoresToPercentileRank.recordset[0].NoRecs;
    }

    const resultVunAdHocListScoresToPercentileRank = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocListScoresToPercentileRank');
    if (resultVunAdHocListScoresToPercentileRank.recordset.length > 0) {
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resultVunAdHocListScoresToPercentileRank.recordset) {
        // Update PRank
        index += 1;
        if (element.Src.toString() === '1') {
          const PercentileRank = (index / NoCompsToPR) * 100.0;
          await pool
            .request()
            .input('PID', sql.Int, element.PID)
            .input('ad_hoc_set_id', sql.Int, AdHocSetId)
            .input('PRank', sql.Decimal, PercentileRank)
            .execute('VunAdHocSetScorePercentileRank');
        }
      }
    }
    return {
      AdHocSetId,
      SQLQuery_CalcNewScores,
      NoRecs,
      ROAECount,
      MedianProb,
      MADM,
      NoCompsToPR,
    };
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/CalcNewScores`, e, req.user.User_Id, req.body, req.headers.origin);
  }
  //
}

async function AddNewScoresToTable(
  AdHocSetId,
  peerGroupSelection,
  jsonCompanyName,
  newArr,
  firstLeftSideColumn,
  req
) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('ad_hoc_set_id', sql.Int, AdHocSetId)
      .execute('VunAdHocGetScoresAndPRanks');
    if (result.recordset.length > 0) {
      const resultTranspose = transposeColumnsToRows(result.recordset);
      const resultCompany = transposeColumnsToRows(jsonCompanyName);
      const existScore = firstLeftSideColumn.some(
        (item) => item.field === 'score'
      );
      const existPrank = firstLeftSideColumn.some(
        (item) => item.field === 'prank'
      );

      let resultTransposeNew = [];
      const jsonSP = [];
      const sideLeftHeader = [];
      const field = [];
      const scoreList = [];
      const prankList = [];
      let sliceData = 0;
      let groupMedianColumns = [];
      if (!existScore) {
        resultTransposeNew.push(resultTranspose.slice(1, 2)[0]);
      }
      if (!existPrank) {
        resultTransposeNew.push(resultTranspose.slice(0, 1)[0]);
      }
      if (existScore && existPrank) {
        resultTransposeNew = resultTranspose;
      }
      // ///////////////////////

      if (resultTransposeNew.length > 0) {
        const compareColumnAndDataLength =
          resultTransposeNew[0].length === jsonCompanyName.length;
        if (!compareColumnAndDataLength) {
          sliceData = 1;
        }

        if (existScore && existPrank) {
          field.push('score');
          sideLeftHeader.push('Score');
          for (
            let index = 0;
            index < resultTransposeNew[0].length - sliceData;
            index++
          ) {
            const element = resultTransposeNew[0][index];
            if (compareColumnAndDataLength) {
              const res = await formatterNumItem(element, 'score');
              scoreList.push({ field: 'score', score: res });
            } else {
              scoreList.push({ field: 'score', score: element.toString() });
            }
          }
          field.push('prank');
          sideLeftHeader.push('Percentile Rank');
          for (
            let index = 0;
            index < resultTransposeNew[1].length - sliceData;
            index++
          ) {
            const element = resultTransposeNew[1][index];
            if (compareColumnAndDataLength) {
              const res = await formatterNumItem(element, 'prank');
              prankList.push({ field: 'prank', prank: res });
            } else {
              prankList.push({ field: 'prank', prank: element.toString() });
            }
          }
          groupMedianColumns = [scoreList, prankList];
        } else {
          if (existScore) {
            field.push('score');
            sideLeftHeader.push('Score');
            for (
              let index = 0;
              index < resultTransposeNew[0].length - sliceData;
              index++
            ) {
              const element = resultTransposeNew[0][index];
              if (compareColumnAndDataLength) {
                const res = await formatterNumItem(element, 'score');
                scoreList.push({ field: 'score', score: res });
              } else {
                scoreList.push({ field: 'score', score: element.toString() });
              }
            }
            groupMedianColumns.push(scoreList);
          }
          if (existPrank) {
            field.push('prank');
            sideLeftHeader.push('Percentile Rank');
            for (
              let index = 0;
              index < resultTransposeNew[0].length - sliceData;
              index++
            ) {
              const element = resultTransposeNew[0][index];
              if (compareColumnAndDataLength) {
                const res = await formatterNumItem(element, 'prank');
                prankList.push({ field: 'prank', prank: res });
              } else {
                prankList.push({ field: 'prank', prank: element.toString() });
              }
            }
            groupMedianColumns.push(prankList);
          }
        }

        for (let index = 0; index < resultTransposeNew.length; index++) {
          let { Med, BottomHalf, TopHalf, MADM } = await CalcAverages(
            groupMedianColumns[index],
            peerGroupSelection,
            req
          );
          BottomHalf = '0'; // For Group Median
          TopHalf = '0'; // For Group Median
          let elementE = '{';
          for (
            let col = 0;
            col < resultTransposeNew[index].length - sliceData;
            col++
          ) {
            let value = 0;
            if (scoreList.length > 0 && field[index] === 'score') {
              value = scoreList[col][field[index]];
            }
            if (prankList.length > 0 && field[index] === 'prank') {
              value = prankList[col][field[index]];
            }
            elementE += `"${[
              replaceToUnderscore(resultCompany[0][col]),
            ]}" : "${value}", `;
            if (compareColumnAndDataLength) {
              elementE += `"indicator_${[
                replaceToUnderscore(resultCompany[0][col]),
              ]}_${field[index]}" : "L", `;
            }
          }
          if (compareColumnAndDataLength) {
            const compareColumnAndDataLength_Med = await formatterNumItem(
              Med,
              field[index]
            );
            elementE += `"groupMedian" : "${compareColumnAndDataLength_Med}", `;
          } else {
            elementE += `"groupMedian" : "${Med}", `;
          }
          elementE += `"color_groupMedian_${field[index]}" : "#07476f", "bottomHalf_groupMedian_${field[index]}" : "${BottomHalf}", "topHalf_groupMedian_${field[index]}" : "${TopHalf}", `;
          elementE += `"sideLeftHeader" : "${sideLeftHeader[index]}", "field" : "${field[index]}", "MADM" : "${MADM}" }`;
          jsonSP.push(JSON.parse(elementE));
        }

        // /////////////////////
        // join Score , Prank with other rows;
        let arr = [];
        const arrJson = [];
        newArr.forEach((item) => {
          if (item.field === 'score' && existScore) {
            const scoreArr = jsonSP.filter((item) => item.field === 'score')[0];
            arr = scoreArr;
          } else if (item.field === 'prank' && existPrank) {
            const prankArr = jsonSP.filter((item) => item.field === 'prank')[0];
            arr = prankArr;
          } else {
            arr = item;
          }
          arrJson.push(arr);
        });

        return arrJson;
      }
      return newArr;
    }
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/AddNewScoresToTable`, e, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function AddSelectedMetrics(
  NeedsVulnerability_value,
  NeedsFinancials_value,
  NeedsOwnership_value,
  NeedsGovernance_value,
  NeedsVotingDir_value,
  NeedsVotingRem_value,
  VCId,
  peerGroupSelection,
  req
) {
  let MetricList = '';
  var NeedsVulnerability = NeedsVulnerability_value;
  var NeedsFinancials = NeedsFinancials_value;
  var NeedsOwnership = NeedsOwnership_value;
  var NeedsGovernance = NeedsGovernance_value;
  var NeedsVotingDir = NeedsVotingDir_value;
  var NeedsVotingRem = NeedsVotingRem_value;
  try {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('vulnerability_comparison_id', VCId)
    .execute('VunGetCriteriaForComparison');
  const DDLjson = await getReturnVulDDL();
  const { DDLKeyFinancials, DDLKeyRatios } = DDLjson;

  if (result.recordset.length > 0) {
    result.recordset.map((item) => {
      switch (item.c1.toString()) {
        case '0':
          NeedsVulnerability = true;
          if (item.c2 === null) {
            MetricList += 'score, prank, ';
          } else if (item.c2.toString() === '0') {
            MetricList += 'score, ';
          } else {
            MetricList += 'prank, ';
          }
          break;
        case '1':
          NeedsFinancials = true;
          if (item.c2 === null) {
            DDLKeyFinancials[0].children.forEach((elementParent) => {
              elementParent.children.forEach((elementChild) => {
                MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
              });
            });
            DDLKeyRatios[0].children.forEach((elementParent) => {
              elementParent.children.forEach((elementChild) => {
                MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
              });
            });
          } else if (item.c3 === null && item.c2 === 0) {
            DDLKeyFinancials[0].children.map((elementParent, index) => {
              elementParent.children.forEach((elementChild) => {
                MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
              });
            });
          } else if (item.c3 === null && item.c2 === 1) {
            DDLKeyRatios[0].children.map((elementParent, index) => {
              elementParent.children.forEach((elementChild) => {
                MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
              });
            });
          } else if (item.c4 === null && item.c2 === 0) {
            DDLKeyFinancials[0].children.map((elementParent, parentIndex) => {
              elementParent.children.map((elementChild, childIndex) => {
                if (item.c3 === parentIndex) {
                  MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
                }
              });
            });
          } else if (item.c4 === null && item.c2 === 1) {
            DDLKeyRatios[0].children.map((elementParent, parentIndex) => {
              elementParent.children.map((elementChild, childIndex) => {
                if (item.c3 === parentIndex) {
                  MetricList += `F${elementChild.value}.value AS f${elementChild.value}_value, `;
                }
              });
            });
          } else {
            MetricList += `F${item.table_id}.value AS f${item.table_id}_value, `;
          }
          break;
        case '2':
          NeedsOwnership = true;
          if (item.c2 === null) {
            MetricList += 'Institutional_investment, Activist_investment, ';
          } else if (item.c2.toString() === '0') {
            MetricList += 'Institutional_investment, ';
          } else {
            MetricList += 'Activist_investment, ';
          }
          break;
        case '3':
          NeedsGovernance = true;
          if (item.c2 === null) {
            MetricList += 'no_directors,  max_tenure, max_age, ';
          } else {
            switch (item.c2.toString()) {
              case '0':
                MetricList += 'no_directors, ';
                break;
              case '1':
                MetricList += 'avg_tenure, ';
                break;
              case '2':
                MetricList += 'min_tenure, ';
                break;
              case '3':
                MetricList += 'max_tenure, ';
                break;
              case '4':
                MetricList += 'avg_age, ';
                break;
              case '5':
                MetricList += 'min_age, ';
                break;
              case '6':
                MetricList += 'max_age, ';
                break;
              default:
                break;
            }
          }
          break;
        case '4':
          if (item.c2 === null) {
            NeedsVotingDir = true;
            NeedsVotingRem = true;
            MetricList += 'min_for_pcent_dir, min_for_pcent_rem, ';
          } else if (item.c2.toString() === '0') {
            NeedsVotingDir = true;
            MetricList += 'min_for_pcent_dir, ';
          } else {
            NeedsVotingRem = true;
            MetricList += 'min_for_pcent_rem, ';
          }
          break;

        default:
          break;
      }
    });
    if (peerGroupSelection.value === '1') {
      if (NeedsGovernance) {
        MetricList += 'avg_tenure, avg_age, ';
      }
    }
    if (MetricList !== '') {
      MetricList = `${MetricList.substr(0, MetricList.length - 2)}\n`;
    }
  }
  return {
    MetricList,
    NeedsVulnerability,
    NeedsFinancials,
    NeedsOwnership,
    NeedsGovernance,
    NeedsVotingDir,
    NeedsVotingRem,
  };
  } catch (error) {
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/AddSelectedMetrics`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function BuildResultsQuery(
  company_query,
  lblNoCompanies2_Visible,
  VCId,
  peerGroupSelection,
  status,
  req,
  companySearchOptionSelection
) {
  let SQLQuery = '';
  let NeedsVulnerability = false;
  let NeedsFinancials = false;
  let NeedsOwnership = false;
  let NeedsGovernance = false;
  let NeedsVotingDir = false;
  let NeedsVotingRem = false;
  const prpGetMaxComparisonsStatus = 20;
  const getStatusMaxLimit = status === 2 ? `TOP ${prpGetMaxComparisonsStatus.toString()}` : '';
  let prpGetMaxComparisons = 50;

  const jsonDDL = await getReturnVulDDL();
  const pool = await poolPromise;

  if (status === 2) {
    prpGetMaxComparisons = prpGetMaxComparisonsStatus;
  }
  if (companySearchOptionSelection) {
    SQLQuery += `create TABLE #pids (pid int)
    begin
    insert into #pids (pid)
    select pid from dbo.fnc_getPIDsFromSearch(${companySearchOptionSelection})
    end \n`;
  }
  if (lblNoCompanies2_Visible) {
    if (NeedsGovernance) {
      SQLQuery += `SELECT TOP ${prpGetMaxComparisons.toString()} tblIssuer.PID, Company_name, Peer_group.peer_group_id, GQ2.avg_tenure, GQ3.avg_age, \n`;
    } else {
      SQLQuery += `SELECT TOP ${prpGetMaxComparisons.toString()} tblIssuer.PID, Company_name, Peer_group.peer_group_id, \n`;
    }
  } else if (NeedsGovernance) {
    SQLQuery += `SELECT ${getStatusMaxLimit} tblIssuer.PID, Company_name, Peer_group.peer_group_id, GQ2.avg_tenure, GQ3.avg_age, \n`;
  } else {
    SQLQuery += `SELECT ${getStatusMaxLimit} tblIssuer.PID, Company_name, Peer_group.peer_group_id, \n`;
  }
  const resMetricList = await AddSelectedMetrics(
    NeedsVulnerability,
    NeedsFinancials,
    NeedsOwnership,
    NeedsGovernance,
    NeedsVotingDir,
    NeedsVotingRem,
    VCId,
    peerGroupSelection,
    req
  );
  NeedsVulnerability = resMetricList.NeedsVulnerability;
  NeedsFinancials = resMetricList.NeedsFinancials;
  NeedsOwnership = resMetricList.NeedsOwnership;
  NeedsGovernance = resMetricList.NeedsGovernance;
  NeedsVotingDir = resMetricList.NeedsVotingDir;
  NeedsVotingRem = resMetricList.NeedsVotingRem;
  SQLQuery += resMetricList.MetricList;
  SQLQuery += 'INTO #tempTable\n';
  SQLQuery += 'FROM proxy_insight.dbo.tblIssuer\n';
  SQLQuery +=
    'OUTER APPLY (SELECT identifier_value FROM proxy_insight.dbo.tblIdentifier AS I WHERE I.PID = tblIssuer.Pid AND I.identifier_type_id = 3 AND (I.date_started IS NULL OR I.date_started <= GETDATE()) AND (I.date_end IS NULL OR I.date_end > GETDATE())) CIK\n';
  SQLQuery +=
    'LEFT JOIN tblMarket_caps_generated on tblMarket_caps_generated.PID = tblIssuer.PID\n';
  SQLQuery +=
    'OUTER APPLY (SELECT identifier_value as peer_group_id FROM proxy_insight.dbo.tblIdentifier AS I WHERE I.PID = tblIssuer.Pid AND I.identifier_type_id = 13 AND (I.date_started IS NULL OR I.date_started <= GETDATE()) AND (I.date_end IS NULL OR I.date_end > GETDATE())) Peer_group\n';
  if (NeedsVulnerability) {
    SQLQuery +=
      'LEFT JOIN tblVulnerability_scores ON tblIssuer.PID = tblVulnerability_scores.pid AND current_score = 1\n';
  }
  if (NeedsFinancials) {
    const resultSQLQuery2 = await pool
      .request()
      .input('vulnerability_comparison_id', sql.Int, VCId)
      .execute('VunGetCriteriaForComparisonFinancialsOnly');

    if (resultSQLQuery2.recordset.length > 0) {
      resultSQLQuery2.recordset.forEach((item) => {
        if (item.c2 === null) {
          jsonDDL.DDLKeyFinancials[0].children.forEach((element) => {
            element.children.forEach((depth2Element) => {
              SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
            });
          });
          jsonDDL.DDLKeyRatios[0].children.forEach((element) => {
            element.children.forEach((depth2Element) => {
              SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
            });
          });
        } else if (item.c3 === null) {
          if (item.c2 === 0) {
            jsonDDL.DDLKeyFinancials[0].children.map((element, index) => {
              element.children.forEach((depth2Element) => {
                SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
              });
            });
          }
          if (item.c2 === 1) {
            jsonDDL.DDLKeyRatios[0].children.map((element, index) => {
              element.children.forEach((depth2Element) => {
                SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
              });
            });
          }
        } else if (item.c4 === null) {
          if (item.c2 === 0) {
            jsonDDL.DDLKeyFinancials[0].children.map((element, index) => {
              element.children.map((depth2Element, depth2Index) => {
                if (item.c3 === index) {
                  SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
                }
              });
            });
          }
          if (item.c2 === 1) {
            jsonDDL.DDLKeyRatios[0].children.map((element, index) => {
              element.children.map((depth2Element, depth2Index) => {
                if (item.c3 === index) {
                  SQLQuery += `LEFT JOIN tblFundamental_metric_values F${depth2Element.value} ON CIK.identifier_value = F${depth2Element.value}.CIK_id AND F${depth2Element.value}.metric_id = ${depth2Element.value}\n`;
                }
              });
            });
          }
        } else {
          SQLQuery += `LEFT JOIN tblFundamental_metric_values F${item.table_id} ON CIK.identifier_value = F${item.table_id}.CIK_id AND F${item.table_id}.metric_id = ${item.table_id}\n`;
        }
      });
    }
  }
  if (NeedsOwnership) {
    SQLQuery +=
      'LEFT JOIN tblInstitutional_investment_cache ON tblIssuer.PID = tblInstitutional_investment_cache.pid\n';
  }
  if (NeedsGovernance) {
    SQLQuery += 'LEFT JOIN\n';
    SQLQuery +=
      '(SELECT PID, COUNT(*) AS no_directors, MIN(DATEDIFF(MONTH, Director_since, GETDATE()) / 12) AS min_tenure, MAX(DATEDIFF(MONTH, Director_since, GETDATE()) / 12) AS max_tenure, MIN(Age) AS min_age, MAX(Age) AS max_age\n';
    SQLQuery += 'FROM tblDirector_appointments\n';
    SQLQuery +=
      'JOIN tblDirectors ON tblDirector_appointments.Director_id = tblDirectors.Director_id\n';
    SQLQuery +=
      'WHERE ((tbldirector_appointments.Director_end_date IS NULL) OR cast(tbldirector_appointments.Director_end_date AS DATE) >= cast(GETDATE()+1 as DATE)) and coalesce([typeNo],3) = 3 and ((tbldirector_appointments.Director_since IS NULL) OR cast(tbldirector_appointments.Director_since AS DATE) <= cast(GETDATE() as DATE)) AND (tblDirectors.Source IS NULL) AND (Age IS NOT NULL) \n';
    SQLQuery += 'GROUP BY PID) GQ1 ON tblIssuer.PID = GQ1.PID \n';
    SQLQuery += 'LEFT JOIN\n';
    SQLQuery += '(SELECT PID, avg_tenure = AVG(1.0 * Tenure)\n';
    SQLQuery += 'FROM\n';
    SQLQuery += '(\n';
    SQLQuery +=
      'SELECT PID, o.Tenure, rn=ROW_NUMBER() OVER (PARTITION BY PID ORDER BY o.Tenure), c.c\n';
    SQLQuery +=
      'FROM (SELECT tblDirectors.Director_id, PID, DATEDIFF(MONTH, Director_since, GETDATE()) / 12 AS Tenure\n';
    SQLQuery += 'FROM tblDirector_appointments\n';
    SQLQuery +=
      'JOIN tblDirectors ON tblDirector_appointments.Director_id = tblDirectors.Director_id\n';
    SQLQuery +=
      'WHERE ((tbldirector_appointments.Director_end_date IS NULL) OR cast(tbldirector_appointments.Director_end_date AS DATE) >= cast(GETDATE()+1 as DATE)) and coalesce([typeNo],3) = 3 and ((tbldirector_appointments.Director_since IS NULL) OR cast(tbldirector_appointments.Director_since AS DATE) <= cast(GETDATE() as DATE)) AND (tblDirectors.Source IS NULL) AND (Age IS NOT NULL) \n';
    SQLQuery +=
      'AND DATEDIFF(MONTH, Director_since, GETDATE()) / 12 IS NOT NULL\n';
    SQLQuery += 'AND PID IN (SELECT PID FROM v_vulnerability_universe)) AS o\n';
    SQLQuery +=
      'CROSS APPLY (SELECT c=COUNT(*) FROM (SELECT tblDirectors.Director_id, PID, DATEDIFF(MONTH, Director_since, GETDATE()) / 12 AS Tenure\n';
    SQLQuery += 'FROM tblDirector_appointments\n';
    SQLQuery +=
      'JOIN tblDirectors ON tblDirector_appointments.Director_id = tblDirectors.Director_id\n';
    SQLQuery +=
      'WHERE ((tbldirector_appointments.Director_end_date IS NULL) OR cast(tbldirector_appointments.Director_end_date AS DATE) >= cast(GETDATE()+1 as DATE)) and coalesce([typeNo],3) = 3 and ((tbldirector_appointments.Director_since IS NULL) OR cast(tbldirector_appointments.Director_since AS DATE) <= cast(GETDATE() as DATE)) AND (tblDirectors.Source IS NULL) AND (Age IS NOT NULL) \n';
    SQLQuery +=
      'AND DATEDIFF(MONTH, Director_since, GETDATE()) / 12 IS NOT NULL\n';
    SQLQuery +=
      'AND PID IN (SELECT PID FROM v_vulnerability_universe)) b WHERE o.PID=b.PID) AS c\n';
    SQLQuery += ') AS x\n';
    SQLQuery += 'WHERE rn IN ((c + 1)/2, (c + 2)/2)\n';
    SQLQuery += 'GROUP BY PID) GQ2 ON tblIssuer.PID = GQ2.PID\n';
    SQLQuery += 'LEFT JOIN\n';
    SQLQuery += '(SELECT PID, avg_age = AVG(1.0 * Age)\n';
    SQLQuery += 'FROM\n';
    SQLQuery += '(\n';
    SQLQuery +=
      'SELECT PID, o.Age, rn=ROW_NUMBER() OVER (PARTITION BY PID ORDER BY o.Age), c.c\n';
    SQLQuery += 'FROM (SELECT tblDirectors.Director_id, PID, Age\n';
    SQLQuery += 'FROM tblDirector_appointments\n';
    SQLQuery +=
      'JOIN tblDirectors ON tblDirector_appointments.Director_id = tblDirectors.Director_id\n';
    SQLQuery +=
      'WHERE ((tbldirector_appointments.Director_end_date IS NULL) OR cast(tbldirector_appointments.Director_end_date AS DATE) >= cast(GETDATE()+1 as DATE)) and coalesce([typeNo],3) = 3 and ((tbldirector_appointments.Director_since IS NULL) OR cast(tbldirector_appointments.Director_since AS DATE) <= cast(GETDATE() as DATE)) AND (tblDirectors.Source IS NULL) AND (Age IS NOT NULL) \n';
    SQLQuery += 'AND PID IN (SELECT PID FROM v_vulnerability_universe)) AS o\n';
    SQLQuery +=
      'CROSS APPLY (SELECT c=COUNT(*) FROM (SELECT tblDirectors.Director_id, PID, Age\n';
    SQLQuery += 'FROM tblDirector_appointments\n';
    SQLQuery +=
      'JOIN tblDirectors ON tblDirector_appointments.Director_id = tblDirectors.Director_id\n';
    SQLQuery +=
      'WHERE ((tbldirector_appointments.Director_end_date IS NULL) OR cast(tbldirector_appointments.Director_end_date AS DATE) >= cast(GETDATE()+1 as DATE)) and coalesce([typeNo],3) = 3 and ((tbldirector_appointments.Director_since IS NULL) OR cast(tbldirector_appointments.Director_since AS DATE) <= cast(GETDATE() as DATE)) AND (tblDirectors.Source IS NULL) AND (Age IS NOT NULL) \n';
    SQLQuery +=
      'AND PID IN (SELECT PID FROM v_vulnerability_universe)) b WHERE o.PID=b.PID) AS c\n';
    SQLQuery += ') AS x\n';
    SQLQuery += 'WHERE rn IN ((c + 1)/2, (c + 2)/2)\n';
    SQLQuery += 'GROUP BY PID) GQ3 ON tblIssuer.PID = GQ3.PID\n';
  }
  if (NeedsVotingDir) {
    SQLQuery += 'LEFT JOIN\n';
    SQLQuery +=
      '(SELECT tdappo.PID, MIN(for_pcent_for_agt) AS min_for_pcent_dir\n';
    SQLQuery += 'From tblDirectors tdir \n';
    SQLQuery +=
      'Join tblDirector_appointments tdappo ON tdir.Director_id = tdappo.Director_id\n';
    SQLQuery += 'CROSS APPLY (\n';
    SQLQuery += 'Select TOP 1 proposal_id\n';
    SQLQuery += 'From proxy_insight.dbo.tblProposals\n';
    SQLQuery +=
      'Join proxy_insight.dbo.tblMeetings ON tblProposals.meeting_id = tblMeetings.meeting_id And tblMeetings.meeting_type_id IN (1,5)\n';
    SQLQuery += 'Where tdappo.pid = tblMeetings.pid\n';
    SQLQuery += 'And tblProposals.director_id = tdir.director_id \n';
    SQLQuery +=
      'And tblMeetings.meeting_id IN (SELECT meeting_id FROM proxy_insight.dbo.v_vote_results_pcent_calc)\n';
    SQLQuery += 'ORDER BY meeting_date DESC) proposal\n';
    SQLQuery +=
      'Join proxy_insight.dbo.v_vote_results_pcent_calc ON v_vote_results_pcent_calc.proposal_id = proposal.proposal_id\n';
    SQLQuery +=
      'Join proxy_insight.dbo.tblProposals ON [v_vote_results_pcent_calc].proposal_id = tblProposals.proposal_id\n';
    SQLQuery +=
      'Join proxy_insight.dbo.tblMeetings ON tblProposals.meeting_id = tblMeetings.meeting_id\n';
    SQLQuery +=
      'WHERE((tdappo.Director_end_date Is NULL) Or cast(tdappo.Director_end_date As Date) > cast(GETDATE() + 1 As Date)) And COALESCE(typeNo ,3) = 3 And ((tdappo.Director_since Is NULL) Or CAST(tdappo.Director_since AS DATE) <= CAST(GETDATE() AS DATE))\n';
    SQLQuery += 'GROUP BY tdappo.PID) VDQ ON tblIssuer.PID = VDQ.PID\n';
  }
  if (NeedsVotingRem) {
    SQLQuery += 'LEFT JOIN\n';
    SQLQuery +=
      '(SELECT tblIssuer.PID, MIN(CASE WHEN for_shares IS NOT NULL AND country_id <> 35 THEN\n';
    SQLQuery += '(for_shares/(for_shares+ISNULL(against_shares,0)))*100 \n';
    SQLQuery += 'ELSE CASE WHEN for_pcent is not null THEN for_pcent \n';
    SQLQuery +=
      'ELSE (for_shares/(for_shares+ISNULL(against_shares,0)+ISNULL(withheld_shares,0)))*100 END END) AS min_for_pcent_rem\n';
    SQLQuery += 'FROM proxy_insight.dbo.tblProposals\n';
    SQLQuery +=
      'JOIN proxy_insight.dbo.tblMeetings ON tblProposals.meeting_id = tblMeetings.meeting_id\n';
    SQLQuery +=
      'JOIN proxy_insight.dbo.tblVote_Results ON tblProposals.proposal_id = tblVote_Results.proposal_id \n';
    SQLQuery +=
      'JOIN proxy_insight.dbo.tblissuer on tblissuer.pid = tblmeetings.pid\n';
    SQLQuery += 'JOIN\n';
    SQLQuery += '(SELECT PID, MAX(meeting_date) AS LastMeetingDate\n';
    SQLQuery += 'FROM proxy_insight.dbo.tblMeetings\n';
    SQLQuery +=
      'JOIN proxy_insight.dbo.tblProposals ON tblMeetings.meeting_id = tblProposals.meeting_id\n';
    SQLQuery +=
      'JOIN proxy_insight.dbo.tblVote_Results ON tblProposals.proposal_id = tblVote_Results.proposal_id\n';
    SQLQuery += 'WHERE ((meeting_type_id = 1) OR (meeting_type_id = 5)) AND\n';
    SQLQuery +=
      '((for_shares IS NOT NULL) OR (for_pcent IS NOT NULL) OR (against_shares IS NOT NULL) OR (against_pcent IS NOT NULL) OR (withheld_shares IS NOT NULL) OR (withheld_pcent IS NOT NULL) OR (abstain_shares IS NOT NULL) OR (abstain_pcent IS NOT NULL) OR (broker_shares IS NOT NULL) OR (broker_pcent IS NOT NULL))\n';
    SQLQuery +=
      'GROUP BY PID ) MeetingDates ON tblIssuer.PID = MeetingDates.PID \n';
    SQLQuery +=
      'WHERE ((proposal_type = 248) OR (proposal_type = 252) OR (proposal_type = 280) OR (proposal_type = 290)) AND meeting_date >= DATEADD(MONTH, -6, LastMeetingDate) AND meeting_date <= DATEADD(MONTH, 6, LastMeetingDate)\n';
    SQLQuery += 'GROUP BY tblIssuer.PID) VRQ ON tblIssuer.PID = VRQ.PID\n';
  }
  if (companySearchOptionSelection) {
    SQLQuery += `WHERE (tblIssuer.PID IN ${company_query})\n`;
  } else {
    SQLQuery += `WHERE tblIssuer.PID IN (${company_query})\n`;
  }
  SQLQuery += 'ORDER BY Company_name';
  return SQLQuery;
}
// eslint-disable-next-line no-inner-declarations
async function BuildResultsTableFrame(
  lblNoCompanies_Text,
  VCId,
  lblMetricsText,
  SQLQuery,
  peerGroupSelection,
  lblMetricCriteriaText,
  lblNoCompanies2_Visible,
  prpGetMaxComparisons,
  status,
  req,
  companySearchOptionSelection
) {
  let NoTenures = 0;
  const Tenures = [];
  let NoAges = 0;
  const Ages = [];
  let gblMedianTenure = 0;
  let gblMADMTenure = 0;
  let gblMedianAge = 0;
  let gblMADMAge = 0;
  const groupMedianColortone = '#07476f';

  // JSON data create
  const jsonCompanyName = [];
  let newArr = [];
  let dataFieldHeader = [];
  const firstLeftSideColumn = [];
  const addOtherColumns = [];
  let DataArray = [];
  let tempData = [];
  const newArriveData = [];

  const jsonDDL = await getReturnVulDDL();

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input('vulnerability_comparison_id', sql.Int, VCId)
      .execute('VunGetCriteriaForComparison');
    result.recordset.forEach((element) => {
      switch (element.c1.toString()) {
        case '0':
          if (element.c2 === null) {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Score',
              field: 'score',
            });
            firstLeftSideColumn.push({
              sideLeftHeader: 'Percentile Rank',
              field: 'prank',
            });
          } else if (element.c2.toString() === '0') {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Score',
              field: 'score',
            });
          } else {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Percentile Rank',
              field: 'prank',
            });
          }
          break;
        case '1':
          if (element.c2 === null) {
            jsonDDL.DDLKeyFinancials[0].children.forEach((depth1Item) => {
              depth1Item.children.forEach((depth2Item) => {
                firstLeftSideColumn.push({
                  sideLeftHeader: depth2Item.label,
                  field: `f${depth2Item.value}_value`,
                });
              });
            });
            jsonDDL.DDLKeyRatios[0].children.forEach((depth1Item) => {
              depth1Item.children.forEach((depth2Item) => {
                firstLeftSideColumn.push({
                  sideLeftHeader: depth2Item.label,
                  field: `f${depth2Item.value}_value`,
                });
              });
            });
          } else if (element.c3 === null) {
            if (element.c2 === 0) {
              jsonDDL.DDLKeyFinancials[0].children.map((depth1Item, index) => {
                depth1Item.children.forEach((depth2Item) => {
                  firstLeftSideColumn.push({
                    sideLeftHeader: depth2Item.label,
                    field: `f${depth2Item.value}_value`,
                  });
                });
              });
            }
            if (element.c2 === 1) {
              jsonDDL.DDLKeyRatios[0].children.map((depth1Item, index) => {
                depth1Item.children.forEach((depth2Item) => {
                  firstLeftSideColumn.push({
                    sideLeftHeader: depth2Item.label,
                    field: `f${depth2Item.value}_value`,
                  });
                });
              });
            }
          } else if (element.c4 === null) {
            if (element.c2 === 0) {
              jsonDDL.DDLKeyFinancials[0].children.map((depth1Item, index) => {
                depth1Item.children.map((depth2Item, childindex) => {
                  if (element.c3 === index) {
                    firstLeftSideColumn.push({
                      sideLeftHeader: depth2Item.label,
                      field: `f${depth2Item.value}_value`,
                    });
                  }
                });
              });
            }
            if (element.c2 === 1) {
              jsonDDL.DDLKeyRatios[0].children.map((depth1Item, index) => {
                depth1Item.children.map((depth2Item, childindex) => {
                  if (element.c3 === index) {
                    firstLeftSideColumn.push({
                      sideLeftHeader: depth2Item.label,
                      field: `f${depth2Item.value}_value`,
                    });
                  }
                });
              });
            }
          } else {
            if (element.c2 === 0) {
              jsonDDL.DDLKeyFinancials[0].children.map((depth1Item, index) => {
                depth1Item.children.map((depth2Item, childindex) => {
                  if (element.c3 === index && element.c4 === childindex) {
                    firstLeftSideColumn.push({
                      sideLeftHeader: depth2Item.label,
                      field: `f${element.table_id}_value`,
                    });
                  }
                });
              });
            }
            if (element.c2 === 1) {
              jsonDDL.DDLKeyRatios[0].children.map((depth1Item, index) => {
                depth1Item.children.map((depth2Item, childindex) => {
                  if (element.c3 === index && element.c4 === childindex) {
                    firstLeftSideColumn.push({
                      sideLeftHeader: depth2Item.label,
                      field: `f${element.table_id}_value`,
                    });
                  }
                });
              });
            }
          }
          break;
        case '2':
          if (element.c2 === null) {
            const hasAdd = firstLeftSideColumn.filter(
              (item) =>
                item.field === 'Institutional_investment' ||
                item.field === 'Activist_investment'
            ).length;
            if (hasAdd === 0) {
              firstLeftSideColumn.push({
                sideLeftHeader: 'Inst. Holding',
                field: 'Institutional_investment',
              });
              firstLeftSideColumn.push({
                sideLeftHeader: 'Act. Holding',
                field: 'Activist_investment',
              });
            }
          } else if (element.c2.toString() === '0') {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Inst. Holding',
              field: 'Institutional_investment',
            });
          } else {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Act. Holding',
              field: 'Activist_investment',
            });
          }
          break;
        case '3':
          if (element.c2 === null) {
            firstLeftSideColumn.push({
              sideLeftHeader: 'No. Directors',
              field: 'no_directors',
            });
            firstLeftSideColumn.push({
              sideLeftHeader: 'Max. Tenure',
              field: 'max_tenure',
            });
            firstLeftSideColumn.push({
              sideLeftHeader: 'Max. Age',
              field: 'max_age',
            });
          } else {
            switch (element.c2.toString()) {
              case '0':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'No. Directors',
                  field: 'no_directors',
                });
                break;
              case '1':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Med. Tenure',
                  field: 'avg_tenure',
                });
                break;
              case '2':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Min. Tenure',
                  field: 'min_tenure',
                });
                break;
              case '3':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Max. Tenure',
                  field: 'max_tenure',
                });
                break;
              case '4':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Med. Age',
                  field: 'avg_age',
                });
                break;
              case '5':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Min. Age',
                  field: 'min_age',
                });
                break;
              case '6':
                firstLeftSideColumn.push({
                  sideLeftHeader: 'Max. Age',
                  field: 'max_age',
                });
                break;
              default:
                break;
            }
          }
          break;
        case '4':
          if (element.c2 === null) {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Min. Vote for Dir.',
              field: 'min_for_pcent_dir',
            });
            firstLeftSideColumn.push({
              sideLeftHeader: 'Min. Vote for Rem.',
              field: 'min_for_pcent_rem',
            });
          } else if (element.c2.toString() === '0') {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Min. Vote for Dir.',
              field: 'min_for_pcent_dir',
            });
          } else {
            firstLeftSideColumn.push({
              sideLeftHeader: 'Min. Vote for Rem.',
              field: 'min_for_pcent_rem',
            });
          }
          break;

        default:
          break;
      }
    });
    if (status === 2) {
      SQLQuery += '\nSELECT TOP 2 * FROM #tempTable\n';
    } else {
      SQLQuery += '\nSELECT * FROM #tempTable\n';
    }

    SQLQuery += '\n DROP TABLE #tempTable\n';
    if (companySearchOptionSelection) {
      SQLQuery += '\n DROP TABLE #pids\n';
    }

    // Start FillResultsTable
    const resultSQLQuery = await pool.request().query(SQLQuery);

    if (peerGroupSelection.value === '1') {
      if (
        lblMetricCriteriaText.indexOf('Tenure') > -1 ||
        lblMetricCriteriaText.indexOf('All Governance') > -1
      ) {
        NoTenures = 0;
        Tenures.push(0);
      }
      if (
        lblMetricCriteriaText.indexOf('Age') > -1 ||
        lblMetricCriteriaText.indexOf('Oldest') > -1 ||
        lblMetricCriteriaText.indexOf('Youngest') > -1 ||
        lblMetricCriteriaText.indexOf('All Governance') > -1
      ) {
        NoAges = 0;
        Ages.push(0);
      }
      resultSQLQuery.recordset.forEach((element) => {
        if (
          lblMetricCriteriaText.indexOf('Tenure') > -1 ||
          lblMetricCriteriaText.indexOf('All Governance') > -1
        ) {
          if (element.avg_tenure !== null) {
            NoTenures += 1;
            Tenures.push(element.avg_tenure);
          }
        }
        if (
          lblMetricCriteriaText.indexOf('Age') > -1 ||
          lblMetricCriteriaText.indexOf('Oldest') > -1 ||
          lblMetricCriteriaText.indexOf('Youngest') > -1 ||
          lblMetricCriteriaText.indexOf('All Governance') > -1
        ) {
          if (element.avg_age !== null) {
            NoAges += 1;
            Ages.push(element.avg_age);
          }
        }
      });

      if (
        lblMetricCriteriaText.indexOf('Tenure') > -1 ||
        lblMetricCriteriaText.indexOf('All Governance') > -1
      ) {
        Tenures.sort((a, b) => a - b);
        if (NoTenures % 2 === 1) {
          gblMedianTenure = Tenures[(NoTenures + 1) / 2];
        } else {
          gblMedianTenure =
            (Tenures[NoTenures / 2] + Tenures[NoTenures / 2 + 1]) / 2.0;
        }
        for (let index = 1; index <= NoTenures; index++) {
          Tenures[index] = Math.abs(Tenures[index] - gblMedianTenure);
        }
        //
        Tenures.sort((a, b) => a - b);
        if (NoTenures % 2 === 1) {
          gblMADMTenure = Tenures[(NoTenures + 1) / 2];
        } else {
          gblMADMTenure =
            (Tenures[NoTenures / 2] + Tenures[NoTenures / 2 + 1]) / 2.0;
        }
      }
      if (
        lblMetricCriteriaText.indexOf('Age') > -1 ||
        lblMetricCriteriaText.indexOf('Oldest') > -1 ||
        lblMetricCriteriaText.indexOf('Youngest') > -1 ||
        lblMetricCriteriaText.indexOf('All Governance') > -1
      ) {
        Ages.sort((a, b) => a - b);
        if (NoAges % 2 === 1) {
          gblMedianAge = Ages[(NoAges + 1) / 2];
        } else {
          gblMedianAge = (Ages[NoAges / 2] + Ages[NoAges / 2 + 1]) / 2.0;
        }
        for (let index = 1; index <= NoAges; index++) {
          Ages[index] = Math.abs(Ages[index] - gblMedianAge);
        }
        //
        Ages.sort((a, b) => a - b);
        if (NoAges % 2 === 1) {
          gblMADMAge = Ages[(NoAges + 1) / 2];
        } else {
          gblMADMAge = (Ages[NoAges / 2] + Ages[NoAges / 2 + 1]) / 2.0;
        }
      }
    }

    resultSQLQuery.recordsets.map((item) => {
      item.map((obj, index) => {
        tempData = [];
        Object.entries(obj).forEach(([key, value]) => {
          if (
            key !== 'PID' &&
            key !== 'Company_name' &&
            key !== 'peer_group_id'
          ) {
            if (
              key === 'Institutional_investment' ||
              key === 'Activist_investment'
            ) {
              tempData.push({
                label: index,
                field: key,
                [key]:
                  value === null
                    ? 0
                    : value.length === undefined
                    ? value
                    : value[0],
              });
            } else if (
              (key === 'score' || key === 'prank') &&
              peerGroupSelection.value.toString() === '1'
            ) {
              tempData.push({ label: index, field: key, [key]: '' });
            } else {
              tempData.push({
                label: index,
                field: key,
                [key]:
                  value === null
                    ? ''
                    : value.length === undefined
                    ? value
                    : value[0],
              });
            }
          }
        });
        newArriveData.push(tempData);
      });
    });
    DataArray =
      newArriveData.length > 0 ? transposeRowsToColumns(newArriveData) : [];

    // End FillResultsTable

    if (DataArray.length > 0) {
      resultSQLQuery.recordsets.map((item) => {
        item.map((element, index) => {
          jsonCompanyName.push({
            Company_name_header: element.Company_name,
            uniqueId: index,
          }); // Company Names JSON
        });
      });

      // First Column
      firstLeftSideColumn.map((item) => {
        let arr = [];
        let add = '';
        jsonCompanyName.map((element) => {
          add += `"${replaceToUnderscore(element.Company_name_header)}" : "", `;
        });
        if (add.length > 0) {
          arr = JSON.parse(
            `${JSON.stringify(item).substr(
              0,
              JSON.stringify(item).length - 1
            )}, ${add.substr(0, add.length - 2)} }`
          );
          addOtherColumns.push(arr);
        } else {
          addOtherColumns.push(item);
        }
      });

      // Header field and title
      dataFieldHeader = [
        { headerName: '', field: 'sideLeftHeader' },
        { headerName: 'Group Median', field: 'groupMedian' },
      ];
      jsonCompanyName.forEach((element) => {
        dataFieldHeader.push({
          headerName: element.Company_name_header,
          field: replaceToUnderscore(element.Company_name_header),
        });
      });

      for (const element of DataArray) {
        let abcNew = [];
        const { Med, BottomHalf, TopHalf, MADM } = await CalcAverages(
          element,
          peerGroupSelection,
          req
        );
        let Cnt = 0;
        for (const elementItem of element) {
          Cnt += 1;
          for (const elementOrignal of addOtherColumns) {
            if (elementItem.field === elementOrignal.field) {
              const cmpnyName = replaceToUnderscore(
                jsonCompanyName.filter(
                  (item) => item.uniqueId === elementItem.label
                )[0].Company_name_header
              );
              if (abcNew.length === 0) {
                abcNew = {
                  ...elementOrignal,
                  [cmpnyName]: await formatterNumItem(
                    elementItem[elementItem.field],
                    elementOrignal.field
                  ),
                  groupMedian: await formatterNumItem(
                    Med,
                    elementOrignal.field
                  ),
                  [`bottomHalf_groupMedian_${elementItem.field}`]: BottomHalf,
                  [`topHalf_groupMedian_${elementItem.field}`]: TopHalf,
                  [`color_groupMedian_${elementItem.field}`]:
                    groupMedianColortone,
                  MADM,
                };
              } else {
                abcNew = {
                  ...abcNew,
                  [cmpnyName]: await formatterNumItem(
                    elementItem[elementItem.field],
                    elementOrignal.field
                  ),
                  groupMedian: await formatterNumItem(
                    Med,
                    elementOrignal.field
                  ),
                  [`bottomHalf_groupMedian_${elementItem.field}`]: BottomHalf,
                  [`topHalf_groupMedian_${elementItem.field}`]: TopHalf,
                  [`color_groupMedian_${elementItem.field}`]:
                    groupMedianColortone,
                  MADM,
                };
              }
              break;
            }
          }
          if (element.length === Cnt) {
            newArr.push(abcNew);
          }
        }
      }

      newArr = newArr.filter((item) => item.length !== 0);
      if (peerGroupSelection.value === '0') {
        newArr = await InsertPeerGroupFlags(resultSQLQuery, newArr, req);
      } else {
        // peerGroupSelection : 1
        if (await HasVulnerability(firstLeftSideColumn)) {
          const {
            AdHocSetId,
            SQLQuery_CalcNewScores,
            NoRecs,
            ROAECount,
            MedianProb,
            MADM,
            NoCompsToPR,
          } = await CalcNewScores(
            VCId,
            lblNoCompanies2_Visible,
            prpGetMaxComparisons,
            req
          );
          newArr = await AddNewScoresToTable(
            AdHocSetId,
            peerGroupSelection,
            jsonCompanyName,
            newArr,
            firstLeftSideColumn,
            req
          );
        }
        newArr = await InsertPeerGroupFlagsNewPeerGroup(
          resultSQLQuery,
          newArr,
          gblMedianTenure,
          gblMADMTenure,
          gblMedianAge,
          gblMADMAge,
          req
        );
      }
      newArr = await InsertAllCompanyFlags(
        resultSQLQuery,
        newArr,
        jsonCompanyName,
        peerGroupSelection,
        req
      );
      newArr = await InsertBarGraphs(newArr, dataFieldHeader);
    }
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/BuildResultsTableFrame`, e, req.user.User_Id, req.body, req.headers.origin);
  }
  return { data: newArr, dataHeader: dataFieldHeader };
}

async function InsertPeerGroupFlagsNewPeerGroup(
  resultSQLQuery,
  newArr,
  gblMedianTenure,
  gblMADMTenure,
  gblMedianAge,
  gblMADMAge,
  req
) {
  let HasFundamentals = false;
  const NoMADMsDifference = 1.0;
  const NoMADMsDifferenceIOwnership = 0.5;
  const NoMADMsDifferenceAOwnership = 2.0;
  const NoMADMsDifferenceVoting = 2.0;
  const NoMADMsDifferenceNoDirectors = 1.0;
  const NoMADMsDifferenceTenure = 1.0;
  const NoMADMsDifferenceAge = 1.0;

  let result = [];
  let WarnLower = false;
  const HasFundamentalsArray = [];
  const recordMainTable = resultSQLQuery.recordset;
  const newData = [];

  const pool = await poolPromise;

  try {
    HasFundamentals = newArr.some(
      (element) => element.field.toString().substr(0, 1) === 'f'
    );
    if (HasFundamentals) {
      result = await pool
        .request()
        .execute('VunGetMediansAndMADMsForFundamentalsRatiosOnlyPrecalc');

      for (const item of result.recordset) {
        newArr.forEach((elementNewArr) => {
          if (
            elementNewArr.field === `f${item.metric_id}_value` &&
            elementNewArr.groupMedian.toString().length > 0
          ) {
            recordMainTable.forEach((mtElement) => {
              const Company_name = replaceToUnderscore(mtElement.Company_name);
              const Median = elementNewArr.groupMedian;
              const { MADM } = elementNewArr;

              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  item.warn_lower === null ||
                  item.warn_lower.toString() === '1'
                ) {
                  WarnLower = true;
                } else {
                  WarnLower = false;
                }
                if (WarnLower) {
                  if (
                    Number(elementNewArr[Company_name]) <
                    Number(Median) - Number(MADM) * 1.486 * NoMADMsDifference
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                    });
                  }
                } else if (
                  Number(item[elementNewArr.field]) >
                  Number(item.median) +
                    Number(item.madm) * 1.486 * NoMADMsDifference
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/exclaim.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  if (
                    Number(item[elementNewArr.field]) >
                    Number(item.median) +
                      Number(item.madm) * 1.486 * NoMADMsDifference
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                    });
                  }
                }
              }
            });
          }
        });
      }
    }

    // //////////////////

    newArr.forEach((elementNewArr) => {
      if (elementNewArr.groupMedian.toString().length > 0) {
        recordMainTable.forEach((mtElement) => {
          const Company_name = replaceToUnderscore(mtElement.Company_name);
          let Median = 0;
          let MADM = 0;

          if (elementNewArr.field === 'Institutional_investment') {
            Median = elementNewArr.groupMedian;
            MADM = elementNewArr.MADM;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) >
                Number(Median) +
                  Number(MADM) * 1.486 * NoMADMsDifferenceIOwnership
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
          if (elementNewArr.field === 'Activist_investment') {
            Median = elementNewArr.groupMedian;
            MADM = elementNewArr.MADM;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) >
                Number(Median) +
                  Number(MADM) * 1.486 * NoMADMsDifferenceAOwnership
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
          if (elementNewArr.field === 'no_directors') {
            Median = elementNewArr.groupMedian;
            MADM = elementNewArr.MADM;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) <
                  Number(Median) -
                    Number(MADM) * 1.486 * NoMADMsDifferenceNoDirectors ||
                Number(elementNewArr[Company_name]) >
                  Number(Median) +
                    Number(MADM) * 1.486 * NoMADMsDifferenceNoDirectors
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
          if (elementNewArr.field === 'max_tenure') {
            Median = gblMedianTenure;
            MADM = gblMADMTenure;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) >
                Number(Median) + Number(MADM) * 1.486 * NoMADMsDifferenceTenure
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
          if (elementNewArr.field === 'max_age') {
            Median = gblMedianAge;
            MADM = gblMADMAge;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) >
                Number(Median) + Number(MADM) * 1.486 * NoMADMsDifferenceAge
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
          if (
            elementNewArr.field === 'min_for_pcent_dir' ||
            elementNewArr.field === 'min_for_pcent_rem'
          ) {
            Median = elementNewArr.groupMedian;
            MADM = elementNewArr.MADM;
            if (elementNewArr[Company_name].toString().length > 0) {
              if (
                Number(elementNewArr[Company_name]) <
                Number(Median) - Number(MADM) * 1.486 * NoMADMsDifferenceVoting
              ) {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/icons/redflag_large.png',
                });
              } else {
                HasFundamentalsArray.push({
                  ...elementNewArr,
                  [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                    '/images/vun/tick.png',
                });
              }
            }
          }
        });
      }
    });

    newArr.forEach((element) => {
      let arr = [];
      HasFundamentalsArray.forEach((elementFlag) => {
        if (element.field === elementFlag.field) {
          if (arr.length === 0) {
            arr = elementFlag;
            return arr;
          }
          arr = { ...arr, ...elementFlag };
          return arr;
        }
      });
      if (arr.length === 0) {
        arr = element;
      }
      newData.push(arr);
    });
    return newData;
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/InsertPeerGroupFlagsNewPeerGroup`, e, req.user.User_Id, req.body, req.headers.origin);
    return newArr;
  }
}

async function InsertPeerGroupFlags(resultSQLQuery, newArr, req) {
  let HasFundamentals = false;
  let HasOwnership = false;
  let HasGovernance = false;
  let HasVoting = false;
  const NoMADMsDifference = 1.0;
  const NoMADMsDifferenceIOwnership = 0.5;
  const NoMADMsDifferenceAOwnership = 2.0;
  const NoMADMsDifferenceVoting = 2.0;
  const NoMADMsDifferenceNoDirectors = 1.0;
  const NoMADMsDifferenceTenure = 1.0;
  const NoMADMsDifferenceAge = 1.0;

  let result = [];
  let WarnLower = false;
  const HasFundamentalsArray = [];
  const recordMainTable = resultSQLQuery.recordset;
  const newData = [];

  const pool = await poolPromise;

  try {
    HasFundamentals = newArr.some(
      (element) => element.field.toString().substr(0, 1) === 'f'
    );
    if (HasFundamentals) {
      result = await pool
        .request()
        .execute(
          'VunGetPeerGroupMediansAndMADMsForFundamentalsRatiosOnlyPrecalc'
        );
      for (const item of result.recordset) {
        const PeerGroupId = Number(item.peer_group_id);

        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            if (
              mtElement.peer_group_id !== null &&
              mtElement.peer_group_id === PeerGroupId
            ) {
              const Company_name = replaceToUnderscore(mtElement.Company_name);

              if (elementNewArr.field === `f${item.metric_id}_value`) {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    item.warn_lower === null ||
                    item.warn_lower.toString() === '1'
                  ) {
                    WarnLower = true;
                  } else {
                    WarnLower = false;
                  }
                  if (WarnLower) {
                    if (
                      Number(elementNewArr[Company_name]) <
                      Number(item.median) -
                        Number(item.madm) * 1.486 * NoMADMsDifference
                    ) {
                      HasFundamentalsArray.push({
                        ...elementNewArr,
                        [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                          '/images/icons/redflag_large.png',
                      });
                    } else {
                      HasFundamentalsArray.push({
                        ...elementNewArr,
                        [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                          '/images/vun/tick.png',
                      });
                    }
                  } else if (
                    Number(item[elementNewArr.field]) >
                    Number(item.median) +
                      Number(item.madm) * 1.486 * NoMADMsDifference
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/exclaim.png',
                    });
                  } else {
                    if (
                      Number(item[elementNewArr.field]) >
                      Number(item.median) +
                        Number(item.madm) * 1.486 * NoMADMsDifference
                    ) {
                      HasFundamentalsArray.push({
                        ...elementNewArr,
                        [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                          '/images/icons/redflag_large.png',
                      });
                    } else {
                      HasFundamentalsArray.push({
                        ...elementNewArr,
                        [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                          '/images/vun/tick.png',
                      });
                    }
                  }
                }
              }
            }
          });
        });
      }
    }

    // //////////////////

    HasOwnership = newArr.some(
      (element) =>
        element.field.toString() === 'Institutional_investment' ||
        element.field.toString() === 'Activist_investment'
    );
    if (HasOwnership) {
      result = await pool
        .request()
        .execute('VunGetPeerGroupMediansAndMADMsForOwnershipPrecalc');
      for (const item of result.recordset) {
        const PeerGroupId = Number(item.peer_group_id);

        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            if (
              mtElement.peer_group_id !== null &&
              mtElement.peer_group_id === PeerGroupId
            ) {
              const Company_name = replaceToUnderscore(mtElement.Company_name);

              if (elementNewArr.field === 'Institutional_investment') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) >
                    Number(item.MedII) +
                      Number(item.MADMII) * 1.486 * NoMADMsDifferenceIOwnership
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
              if (elementNewArr.field === 'Activist_investment') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) >
                    Number(item.MedAI) +
                      Number(item.MADMAI) * 1.486 * NoMADMsDifferenceAOwnership
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
            }
          });
        });
      }
    }

    // //////////////////

    HasGovernance = newArr.some(
      (element) =>
        element.field.toString() === 'no_directors' ||
        element.field.toString() === 'max_tenure' ||
        element.field.toString() === 'max_age'
    );
    if (HasGovernance) {
      result = await pool
        .request()
        .execute('VunGetPeerGroupMediansAndMADMsForGovernancePrecalc');
      for (const item of result.recordset) {
        const PeerGroupId = Number(item.peer_group_id);

        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            if (
              mtElement.peer_group_id !== null &&
              mtElement.peer_group_id === PeerGroupId
            ) {
              const Company_name = replaceToUnderscore(mtElement.Company_name);

              if (elementNewArr.field === 'no_directors') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) <
                      Number(item.MedND) -
                        Number(item.MADMND) *
                          1.486 *
                          NoMADMsDifferenceNoDirectors ||
                    Number(elementNewArr[Company_name]) >
                      Number(item.MedND) +
                        Number(item.MADMND) *
                          1.486 *
                          NoMADMsDifferenceNoDirectors
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
              if (elementNewArr.field === 'max_tenure') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) >
                    Number(item.MedAT) +
                      Number(item.MADMAT) * 1.486 * NoMADMsDifferenceTenure
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
              if (elementNewArr.field === 'max_age') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) >
                    Number(item.MedAA) +
                      Number(item.MADMAA) * 1.486 * NoMADMsDifferenceAge
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
            }
          });
        });
      }
    }
    // //////////////////

    HasVoting = newArr.some(
      (element) =>
        element.field.toString() === 'min_for_pcent_dir' ||
        element.field.toString() === 'min_for_pcent_rem'
    );
    if (HasVoting) {
      result = await pool
        .request()
        .execute('VunGetPeerGroupMediansAndMADMsForVotingPrecalc');
      for (const item of result.recordset) {
        const PeerGroupId = Number(item.peer_group_id);

        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            if (
              mtElement.peer_group_id !== null &&
              mtElement.peer_group_id === PeerGroupId
            ) {
              const Company_name = replaceToUnderscore(mtElement.Company_name);

              if (elementNewArr.field === 'min_for_pcent_dir') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) <
                    Number(item.MedMinVFD) -
                      Number(item.MADMMinVFD) * 1.486 * NoMADMsDifferenceVoting
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
              if (elementNewArr.field === 'min_for_pcent_rem') {
                if (elementNewArr[Company_name].toString().length > 0) {
                  if (
                    Number(elementNewArr[Company_name]) <
                    Number(item.MedMinVFR) -
                      Number(item.MADMMinVFR) * 1.486 * NoMADMsDifferenceVoting
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                    });
                  }
                }
              }
            }
          });
        });
      }
    }

    newArr.forEach((element) => {
      let arr = [];
      HasFundamentalsArray.forEach((elementFlag) => {
        if (element.field === elementFlag.field) {
          if (arr.length === 0) {
            arr = elementFlag;
            return arr;
          }
          arr = { ...arr, ...elementFlag };
          return arr;
        }
      });
      if (arr.length === 0) {
        arr = element;
      }
      newData.push(arr);
    });
    return newData;
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/InsertPeerGroupFlags`, e, req.user.User_Id, req.body, req.headers.origin);
    return newArr;
  }
}

async function InsertAllCompanyFlags(
  resultSQLQuery,
  newArr,
  jsonCompanyName,
  peerGroupSelection,
  req
) {
  let HasFundamentals = false;
  let HasOwnership = false;
  let HasGovernance = false;
  let HasVoting = false;
  const NoMADMsDifference = 1.0;
  const NoMADMsDifferenceIOwnership = 0.5;
  const NoMADMsDifferenceAOwnership = 2.0;
  const NoMADMsDifferenceVoting = 2.0;
  const NoMADMsDifferenceNoDirectors = 1.0;
  const NoMADMsDifferenceTenure = 1.0;
  const NoMADMsDifferenceAge = 1.0;

  let result = [];
  let WarnLower = false;
  const HasFundamentalsArray = [];
  const recordMainTable = resultSQLQuery.recordset;
  const newData = [];

  const pool = await poolPromise;
  try {
    HasFundamentals = newArr.some(
      (element) => element.field.toString().substr(0, 1) === 'f'
    );
    if (HasFundamentals) {
      result = await pool
        .request()
        .execute('VunGetMediansAndMADMsForFundamentalsRatiosOnlyPrecalc');
      for (const item of result.recordset) {
        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            const Company_name = replaceToUnderscore(mtElement.Company_name);

            if (elementNewArr.field === `f${item.metric_id}_value`) {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  item.warn_lower === null ||
                  item.warn_lower.toString() === '1'
                ) {
                  WarnLower = true;
                } else {
                  WarnLower = false;
                }
                if (WarnLower) {
                  if (
                    Number(elementNewArr[Company_name]) <
                    Number(item.median) -
                      Number(item.madm) * 1.486 * NoMADMsDifference
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                    });
                  }
                } else if (
                  Number(item[elementNewArr.field]) >
                  Number(item.median) +
                    Number(item.madm) * 1.486 * NoMADMsDifference
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/exclaim.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  if (
                    Number(item[elementNewArr.field]) >
                    Number(item.median) +
                      Number(item.madm) * 1.486 * NoMADMsDifference
                  ) {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                        '/images/icons/redflag_large.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                    });
                  } else {
                    HasFundamentalsArray.push({
                      ...elementNewArr,
                      [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                        '/images/vun/tick.png',
                      [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                    });
                  }
                }
              }
            }
          });
        });
      }
    }

    // //////////////////

    HasOwnership = newArr.some(
      (element) =>
        element.field.toString() === 'Institutional_investment' ||
        element.field.toString() === 'Activist_investment'
    );
    if (HasOwnership) {
      result = await pool
        .request()
        .execute('VunGetMediansAndMADMsForOwnershipPrecalc');
      for (const item of result.recordset) {
        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            const Company_name = replaceToUnderscore(mtElement.Company_name);

            if (elementNewArr.field === 'Institutional_investment') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) >
                  Number(item.MedII) +
                    Number(item.MADMII) * 1.486 * NoMADMsDifferenceIOwnership
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                }
              }
            }
            if (elementNewArr.field === 'Activist_investment') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) >
                  Number(item.MedAI) +
                    Number(item.MADMAI) * 1.486 * NoMADMsDifferenceAOwnership
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                }
              }
            }
          });
        });
      }
    }

    // //////////////////

    HasGovernance = newArr.some(
      (element) =>
        element.field.toString() === 'no_directors' ||
        element.field.toString() === 'max_tenure' ||
        element.field.toString() === 'max_age'
    );
    if (HasGovernance) {
      result = await pool
        .request()
        .execute('VunGetMediansAndMADMsForGovernancePrecalc');
      for (const item of result.recordset) {
        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            const Company_name = replaceToUnderscore(mtElement.Company_name);

            if (elementNewArr.field === 'no_directors') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) <
                    Number(item.MedND) -
                      Number(item.MADMND) *
                        1.486 *
                        NoMADMsDifferenceNoDirectors ||
                  Number(elementNewArr[Company_name]) >
                    Number(item.MedND) +
                      Number(item.MADMND) * 1.486 * NoMADMsDifferenceNoDirectors
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                }
              }
            }
            if (elementNewArr.field === 'max_tenure') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) >
                  Number(item.MedAT) +
                    Number(item.MADMAT) * 1.486 * NoMADMsDifferenceTenure
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                }
              }
            }
            if (elementNewArr.field === 'max_age') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) >
                  Number(item.MedAA) +
                    Number(item.MADMAA) * 1.486 * NoMADMsDifferenceAge
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'L',
                  });
                }
              }
            }
          });
        });
      }
    }
    // //////////////////

    HasVoting = newArr.some(
      (element) =>
        element.field.toString() === 'min_for_pcent_dir' ||
        element.field.toString() === 'min_for_pcent_rem'
    );
    if (HasVoting) {
      result = await pool
        .request()
        .execute('VunGetMediansAndMADMsForVotingPrecalc');
      for (const item of result.recordset) {
        newArr.forEach((elementNewArr) => {
          recordMainTable.forEach((mtElement) => {
            const Company_name = replaceToUnderscore(mtElement.Company_name);

            if (elementNewArr.field === 'min_for_pcent_dir') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) <
                  Number(item.MedMinVFD) -
                    Number(item.MADMMinVFD) * 1.486 * NoMADMsDifferenceVoting
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                }
              }
            }
            if (elementNewArr.field === 'min_for_pcent_rem') {
              if (elementNewArr[Company_name].toString().length > 0) {
                if (
                  Number(elementNewArr[Company_name]) <
                  Number(item.MedMinVFR) -
                    Number(item.MADMMinVFR) * 1.486 * NoMADMsDifferenceVoting
                ) {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/icons/redflag_large.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                } else {
                  HasFundamentalsArray.push({
                    ...elementNewArr,
                    [`imgFlagSrc1_${Company_name}_${elementNewArr.field}`]:
                      '/images/vun/tick.png',
                    [`indicator_${Company_name}_${elementNewArr.field}`]: 'H',
                  });
                }
              }
            }
          });
        });
      }
    }

    newArr.forEach((element) => {
      let arr = [];
      HasFundamentalsArray.forEach((elementFlag) => {
        if (element.field === elementFlag.field) {
          if (arr.length === 0) {
            arr = elementFlag;
            return arr;
          }
          arr = { ...arr, ...elementFlag };
          return arr;
        }
      });
      if (
        (peerGroupSelection.value.toString() === '0' &&
          element.field === 'score') ||
        element.field === 'prank'
      ) {
        let companyNameAddArr = [];
        jsonCompanyName.forEach((x) => {
          const Company_name = replaceToUnderscore(x.Company_name_header);
          if (companyNameAddArr.length === 0) {
            companyNameAddArr = {
              ...element,
              [`indicator_${Company_name}_${element.field}`]: 'L',
            };
          } else {
            companyNameAddArr = {
              ...companyNameAddArr,
              [`indicator_${Company_name}_${element.field}`]: 'L',
            };
          }
        });

        arr = companyNameAddArr;
      }
      if (arr.length === 0) {
        arr = element;
      }
      newData.push(arr);
    });
    return newData;
  } catch (e) {
    catchFn(e);
    general.ErrorLog(`${companyPeerGroupComparisonMatrixToolRoutes}/InsertAllCompanyFlags`, e, req.user.User_Id, req.body, req.headers.origin);
    return newArr;
  }
}

async function InsertBarGraphs(newArr, dataFieldHeader) {
  let IsGovRow = false;
  let FirstVal = false;
  let MinVal = 0;
  let MaxVal = 0;
  let GraphCol = 0;
  let Median = 0;
  let CellVal = 0;
  let Diff = 0;
  let MinDiff = 0;
  let MaxDiff = 0;
  let Pcnt = 0;
  let BottomHalf = 0;
  let TopHalf = 0;
  const ChartHeight = 40;
  let ColourNo = 0;
  const myJson = [];
  const newData = [];

  dataFieldHeader = dataFieldHeader.filter(
    (item) => item.field !== 'groupMedian' && item.field !== 'sideLeftHeader'
  );

  try {
    newArr.forEach((item) => {
      IsGovRow = item.sideLeftHeader === 'No. Directors';
      if (IsGovRow) {
        Median = item.groupMedian;
      }
      GraphCol = 1;
      FirstVal = true;

      // Get MinVal, MaxVal
      dataFieldHeader.forEach((elementFieldHeader) => {
        const valueStatus =
          item[elementFieldHeader.field] === ''
            ? ''
            : Number(
                item[elementFieldHeader.field]
                  .toString()
                  .replace(',', '')
                  .replace(',', '')
              );
        if (isNumeric(valueStatus)) {
          CellVal = valueStatus;
          if (FirstVal) {
            MinVal = Number(CellVal);
            MaxVal = Number(CellVal);
            FirstVal = false;
          } else {
            if (CellVal < MinVal) {
              MinVal = Number(CellVal);
            }
            if (CellVal > MaxVal) {
              MaxVal = Number(CellVal);
            }
          }
        }

        if (IsGovRow) {
          Diff = Math.abs(CellVal - Number(Median));
          if (FirstVal) {
            MinDiff = Diff;
            MaxDiff = Diff;
          } else {
            if (Diff < MinDiff) {
              MinDiff = Diff;
            }
            if (Diff > MaxDiff) {
              MaxDiff = Diff;
            }
          }
        }
        GraphCol += 1;
      });

      GraphCol = 1;
      dataFieldHeader.forEach((element) => {
        if (MinVal < MaxVal) {
          const valueStatus =
            item[element.field] === ''
              ? ''
              : Number(
                  item[element.field]
                    .toString()
                    .replace(',', '')
                    .replace(',', '')
                );
          if (isNumeric(valueStatus)) {
            CellVal = valueStatus;
            Pcnt = ((CellVal - MinVal) / (MaxVal - MinVal)).toFixed(2);
            BottomHalf = Number(ChartHeight) * Pcnt;
            TopHalf = ChartHeight - BottomHalf;
            if (BottomHalf === 40) {
              BottomHalf += 5;
            } else if (TopHalf === 40) {
              BottomHalf += 5;
            } else {
              BottomHalf += 5;
            }

            if (IsGovRow) {
              Diff = Math.abs(CellVal - Median);
            }
            ColourNo = GraphCol % 5;
            if (ColourNo === 0) {
              ColourNo = 5;
            }

            // //////////////////////////

            if (CellVal === MinVal) {
              let bottomHalfColor = ColourList(ColourNo);
              if (
                item[`indicator_${element.field}_${item.field}`] === 'L' &&
                !IsGovRow
              ) {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                  [`imgStarSrc_${element.field}_${item.field}`]:
                    '/images/vun/Star.png',
                });
              } else {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                });
              }

              if (
                item[`indicator_${element.field}_${item.field}`] === 'H' ||
                IsGovRow
              ) {
                CellVal = Number(item[element.field]);
                Pcnt = ((CellVal - MinVal) / (MaxVal - MinVal)).toFixed(2);
                BottomHalf = Number(ChartHeight) * Pcnt;
                TopHalf = ChartHeight - BottomHalf;
                if (BottomHalf === 40) {
                  BottomHalf += 5;
                } else if (TopHalf === 40) {
                  BottomHalf += 5;
                } else {
                  BottomHalf += 5;
                }

                bottomHalfColor = ColourList(ColourNo);
                let stringPath = '';
                if (Diff === MaxDiff || !IsGovRow) {
                  stringPath = '/images/vun/Warning.png';
                  myJson.push({
                    ...item,
                    [`topHalf_${element.field}_${item.field}`]:
                      TopHalf.toFixed(0),
                    [`bottomHalf_${element.field}_${item.field}`]:
                      BottomHalf.toFixed(0),
                    [`color_${element.field}_${item.field}`]: bottomHalfColor,
                    [`imgStarSrc_${element.field}_${item.field}`]: stringPath,
                  });
                }
                if (Diff === MinDiff && IsGovRow) {
                  stringPath = '/images/vun/StarCircle.png';
                  myJson.push({
                    ...item,
                    [`topHalf_${element.field}_${item.field}`]:
                      TopHalf.toFixed(0),
                    [`bottomHalf_${element.field}_${item.field}`]:
                      BottomHalf.toFixed(0),
                    [`color_${element.field}_${item.field}`]: bottomHalfColor,
                    [`imgStarSrc_${element.field}_${item.field}`]: stringPath,
                  });
                }
              }
            } else if (CellVal === MaxVal) {
              let bottomHalfColor = ColourList(ColourNo);
              if (
                item[`indicator_${element.field}_${item.field}`] === 'H' &&
                !IsGovRow
              ) {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                  [`imgStarSrc_${element.field}_${item.field}`]:
                    '/images/vun/StarCircle.png',
                });
              } else {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                });
              }

              if (
                item[`indicator_${element.field}_${item.field}`] === 'L' ||
                IsGovRow
              ) {
                CellVal = Number(item[element.field]);
                Pcnt = ((CellVal - MinVal) / (MaxVal - MinVal)).toFixed(2);
                BottomHalf = Number(ChartHeight) * Pcnt;
                TopHalf = ChartHeight - BottomHalf;
                if (BottomHalf === 40) {
                  BottomHalf += 5;
                } else if (TopHalf === 40) {
                  BottomHalf += 5;
                } else {
                  BottomHalf += 5;
                }

                bottomHalfColor = ColourList(ColourNo);
                let stringPath = '';
                if (Diff === MaxDiff || !IsGovRow) {
                  stringPath = '/images/vun/Warning.png';
                  myJson.push({
                    ...item,
                    [`topHalf_${element.field}_${item.field}`]:
                      TopHalf.toFixed(0),
                    [`bottomHalf_${element.field}_${item.field}`]:
                      BottomHalf.toFixed(0),
                    [`color_${element.field}_${item.field}`]: bottomHalfColor,
                    [`imgStarSrc_${element.field}_${item.field}`]: stringPath,
                  });
                }
                if (Diff === MinDiff && IsGovRow) {
                  stringPath = '/images/vun/StarCircle.png';
                  myJson.push({
                    ...item,
                    [`topHalf_${element.field}_${item.field}`]:
                      TopHalf.toFixed(0),
                    [`bottomHalf_${element.field}_${item.field}`]:
                      BottomHalf.toFixed(0),
                    [`color_${element.field}_${item.field}`]: bottomHalfColor,
                    [`imgStarSrc_${element.field}_${item.field}`]: stringPath,
                  });
                }
              }
            } else {
              const bottomHalfColor = ColourList(ColourNo);
              if (IsGovRow && Diff === MinDiff) {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                  [`imgStarSrc_${element.field}_${item.field}`]:
                    '/images/vun/StarCircle.png',
                });
              } else {
                myJson.push({
                  ...item,
                  [`topHalf_${element.field}_${item.field}`]:
                    TopHalf.toFixed(0),
                  [`bottomHalf_${element.field}_${item.field}`]:
                    BottomHalf.toFixed(0),
                  [`color_${element.field}_${item.field}`]: bottomHalfColor,
                });
              }
            }
          }
          GraphCol += 1;
        }
      });
      // ///////////
    });

    newArr.forEach((element) => {
      let arr = [];
      myJson.forEach((elementFlag) => {
        if (element.field === elementFlag.field) {
          if (arr.length === 0) {
            arr = elementFlag;
            return arr;
          }
          arr = { ...arr, ...elementFlag };
          return arr;
        }
      });
      if (arr.length === 0) {
        arr = element;
      }
      newData.push(arr);
    });
    return newData;
  } catch (e) {
    catchFn(e);
    return newArr;
  }
}

async function GetVulDataList(req, res, next) {
  const pool = await poolPromise;
  const { user_id, peerGroupSelection } = req.body;
  let { VCId, companySearchOptionSelection } = req.body;

  const productStatus = await general.TokenDecodeForProductStatus(
    req.body.token,
    req.body.product_id
  );
  const status= productStatus;
  //
  const prpGetMaxComparisons = 50;
  let company_query = '';
  let no_companies = 0;
  let lblNoCompanies2_Text = '';
  let company_criteria_string = '';
  let no_metrics = 0;
  let metric_criteria_string = '';
  let Saved;
  //
  var trName_Visible = false;
  var lblNoCompanies2_Visible = false;
  let lblNoCompanies_Text = '';
  let lblNameText = '';

  let result_vulnerability_comparison_detail = [];
  let result1 = [];
  let arrayFinalresult = [];
  let SQLQuery = '';

  companySearchOptionSelection =
    companySearchOptionSelection !== undefined
      ? companySearchOptionSelection.value
      : null;
  try {
    if (VCId > 0) {
      result1 = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .input('user_id', sql.Int, user_id)
        .execute('VunCheckOwnershipOfComparison');

      if (!result1.recordset.length > 0) {
        VCId = 0;
      } else {
        Saved = result1.recordset[0].saved === 1;
      }
    } else {
      result1 = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId * -1)
        .input('user_id', sql.Int, user_id)
        .execute('VunCheckOwnershipOfCustomPeerGroup');
      if (!result1.recordset.length) {
        VCId = 0;
      } else {
        Saved = 1;
        await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId)
          .execute('VunBuildCriteriaSetForCustomPeerGroupIfNeeded');
      }
    }

    if (VCId > 0) {
      result_vulnerability_comparison_detail = await pool
        .request()
        .input('vulnerability_comparison_id', sql.Int, VCId)
        .execute('VunGetComparisonSpec');
      if (Saved) {
        lblNameText = result_vulnerability_comparison_detail.recordset[0].name;
        trName_Visible = true;
      }
      no_companies =
        result_vulnerability_comparison_detail.recordset[0].no_companies;
      if (no_companies > prpGetMaxComparisons) {
        lblNoCompanies_Text = prpGetMaxComparisons;
        lblNoCompanies2_Text = `(${no_companies} selected)`;
        lblNoCompanies2_Visible = true;
      } else {
        lblNoCompanies_Text = no_companies;
        lblNoCompanies2_Visible = false;
      }
      company_criteria_string =
        result_vulnerability_comparison_detail.recordset[0]
          .company_criteria_string;
      no_metrics =
        result_vulnerability_comparison_detail.recordset[0].no_metrics;
      metric_criteria_string =
        result_vulnerability_comparison_detail.recordset[0]
          .metric_criteria_string;
      company_query = `${result_vulnerability_comparison_detail.recordset[0].company_query}`;
      // company_query = `${result_vulnerability_comparison_detail.recordset[0].company_query} AND tblIssuer.PID IN (SELECT * FROM v_vulnerability_universe)`;
    } else {
      result_vulnerability_comparison_detail = await pool
        .request()
        .input('custom_peer_group_id', sql.Int, VCId * -1)
        .execute('VunGetCustomPeerGroup');

      if (Saved) {
        lblNameText = result_vulnerability_comparison_detail.recordset[0].name;
        trName_Visible = true;
      }
      no_companies =
        result_vulnerability_comparison_detail.recordset[0].no_companies;
      if (no_companies > prpGetMaxComparisons) {
        lblNoCompanies_Text = prpGetMaxComparisons;
        lblNoCompanies2_Text = `(${no_companies} selected)`;
        lblNoCompanies2_Visible = true;
      } else {
        lblNoCompanies_Text = no_companies;
        lblNoCompanies2_Visible = false;
      }
      company_criteria_string = 'Specific';
      no_metrics =
        result_vulnerability_comparison_detail.recordset[0].no_metrics;
      company_criteria_string =
        result_vulnerability_comparison_detail.recordset[0]
          .company_criteria_string;
      metric_criteria_string =
        result_vulnerability_comparison_detail.recordset[0]
          .metric_criteria_string;
      company_query = `SELECT pid FROM tblVulnerability_custom_peer_group_members WHERE custom_peer_group_id = ${
        VCId * -1
      } AND pid IN (SELECT * FROM v_vulnerability_universe)`;
    }

    let NoCompanies = 0;
    if (company_criteria_string !== 'Specific') {
      if (company_query === '') {
        return '';
      }
      const resultCompanyQuery = await pool.request().query(company_query);
      resultCompanyQuery.recordset !== undefined &&
        resultCompanyQuery.recordset.length > 0 &&
        resultCompanyQuery.recordset.map(() => {
          NoCompanies += 1;
        });
      if (NoCompanies !== Number(lblNoCompanies_Text)) {
        if (NoCompanies > prpGetMaxComparisons) {
          lblNoCompanies_Text = prpGetMaxComparisons;
          lblNoCompanies2_Text = `(${no_companies} selected)`;
          lblNoCompanies2_Visible = true;
        } else {
          lblNoCompanies_Text = NoCompanies;
          lblNoCompanies2_Visible = false;
        }
        //
        await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId)
          .input('no_companies', sql.Int, NoCompanies)
          .execute('VunUpdateNoCompaniesInComparison');
      }
    } else {
      let result = [];
      if (VCId > 0) {
        result = await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId)
          .execute('VunCountComparisonMatrixCompaniesInUniverse');
      } else {
        result = await pool
          .request()
          .input('vulnerability_comparison_id', sql.Int, VCId * -1)
          .execute('VunCountCustomPeerGroupCompaniesInUniverse');
      }
      NoCompanies = result.recordset[0].NoCompaniesInUniverse;
      if (NoCompanies !== no_companies && NoCompanies > prpGetMaxComparisons) {
        lblNoCompanies_Text = prpGetMaxComparisons;
        lblNoCompanies2_Text = `(${no_companies} selected)`;
        lblNoCompanies2_Visible = true;
      } else {
        lblNoCompanies_Text = NoCompanies;
        lblNoCompanies2_Visible = false;
      }
    }

    if (companySearchOptionSelection) {
      company_query = '';
      company_query =
        '(SELECT pid FROM #pids) AND tblIssuer.PID IN (SELECT pid FROM v_vulnerability_universe) AND tblIssuer.PID IN (SELECT * FROM v_vulnerability_universe)';
    }
    // ////////////
    SQLQuery = '';
    SQLQuery = await BuildResultsQuery(
      company_query,
      lblNoCompanies2_Visible,
      VCId,
      peerGroupSelection,
      status,
      req,
      companySearchOptionSelection
    );
    arrayFinalresult = await BuildResultsTableFrame(
      lblNoCompanies_Text,
      VCId,
      no_metrics,
      SQLQuery,
      peerGroupSelection,
      metric_criteria_string,
      lblNoCompanies2_Visible,
      prpGetMaxComparisons,
      status,
      req,
      companySearchOptionSelection
    );

    var filteredArrayFinalresult = arrayFinalresult.data.filter((el) => {
      if (
        el.groupMedian !== '' ||
        el.ADMA_Biologics__Inc_ !== '' ||
        el.Adicet_Bio__Inc_ !== '' ||
        el.Adial_Pharmaceuticals_Inc !== '' ||
        el.Adhera_Therapeutics__Inc_ !== '' ||
        el.ADDvantage_Technologies_Group_Inc_ !== '' ||
        el.Addus_HomeCare_Corporation !== '' ||
        el.Adaptive_Biotechnologies_Corp !== '' ||
        el.AdaptHealth_Corp_ !== '' ||
        el.Adams_Resources___Energy_Inc_ !== '' ||
        el.Adamas_Pharmaceuticals_Inc !== '' ||
        el.Acushnet_Holdings_Corp !== '' ||
        el.Activision_Blizzard__Inc !== '' ||
        el.Actinium_Pharmaceuticals__Inc_ !== '' ||
        el.Acorn_Energy_Inc_ !== '' ||
        el.Acorda_Therapeutics_Inc_ !== '' ||
        el.ACNB_Corporation !== '' ||
        el.Acme_United_Corporation_ !== '' ||
        el.ACM_Research_Inc !== '' ||
        el.Aclaris_Therapeutics_Inc !== '' ||
        el.ACI_Worldwide_Inc_ !== '' ||
        el.Achieve_Life_Sciences_Inc !== '' ||
        el.Acer_Therapeutics_Inc !== '' ||
        el.AcelRx_Pharmaceuticals_Inc_ !== '' ||
        el.Accuray_Incorporated !== '' ||
        el.Acco_Brands_Corporation !== '' ||
        el.Acceleron_Pharma_Inc_ !== '' ||
        el.Accelerate_Diagnostics_Inc_ !== '' ||
        el.Acadia_Realty_Trust !== '' ||
        el.ACADIA_Pharmaceuticals_Inc_ !== '' ||
        el.Acadia_Healthcare_Company_Inc_ !== '' ||
        el.Abraxas_Petroleum_Corporation !== '' ||
        el.ABM_Industries_Incorporated !== '' ||
        el.Abiomed__Inc_ !== '' ||
        el.Abercrombie___Fitch_Company !== '' ||
        el.AbbVie_Inc_ !== '' ||
        el.Abbott_Laboratories !== '' ||
        el.AAON_Inc_ !== '' ||
        el.A10_Networks_Inc !== '' ||
        el['10x_Genomics__Inc_'] !== '' ||
        el['1347_Property_Insurance_Holdings_Inc'] !== '' ||
        el['1st_Constitution_Bancorp'] !== '' ||
        el['1_800_FLOWERS_COM_Inc.'] !== '' ||
        el['1st_Source_Corporation'] !== '' ||
        el['22nd_Century_Group_Inc'] !== '' ||
        el['2U_Inc'] !== '' ||
        el['3D_Systems_Corporation'] !== '' ||
        el['3M_Company'] !== '' ||
        el['89bio_Inc'] !== '' ||
        el['9_Meters_Biopharma_Inc'] !== '' ||
        el['A_H._Belo_Corporation'] !== ''
      ) {
        return el;
      }
    });

    let lblNoCmpny = '';
    if (lblNoCompanies2_Visible) {
      lblNoCmpny = `${lblNoCompanies_Text} ${lblNoCompanies2_Text}`;
    } else {
      lblNoCmpny = lblNoCompanies_Text;
    }

    const summarySelectionList = [
      { headerName: 'Name', label: lblNameText },
      { headerName: 'No. Companies', label: lblNoCmpny },
      { headerName: 'Criteria', label: company_criteria_string },
      { headerName: 'Metrics', label: no_metrics },
      { headerName: 'Criteria', label: metric_criteria_string },
    ];
    return res.json({
      data: filteredArrayFinalresult,
      dataHeader: arrayFinalresult.dataHeader,
      dataSummarySelection: summarySelectionList,
    });
  } catch (e) {
    catchFn(e);
    general.ErrorLog(
      `${companyPeerGroupComparisonMatrixToolRoutes}/GetVulDataList`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    return res.json({ data: [], dataHeader: [], dataSummarySelection: [] });
  }
}

module.exports = router;
