const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const dashboardroutes = 'dashboard-Route';
const DashboardIdData = require('../config/SampleData/DashboardIdData.json');

router.post('/GetAllIssuers', authenticateToken, GetAllIssuers);
router.post('/PIListIndices', authenticateToken, PIListIndices);
router.post('/GetExchange', authenticateToken, GetExchange);
router.post('/GetAIPeerGroups', authenticateToken, GetAIPeerGroups);
router.post('/GetListCompanyRegionsAndCountries', authenticateToken, V2AListCompanyRegionsAndCountries);
router.post('/PIListSectorsAndIndustries', authenticateToken, PIListSectorsAndIndustries);
router.post('/FreeSearchCompanyAndIndustry', authenticateToken, FreeSearchCompanyAndIndustry);
router.post('/GetCompanySearchOptions', authenticateToken, GetCompanySearchOptions);
router.post('/UpdateCompanySearchOptions', authenticateToken, UpdateCompanySearchOptions);
router.post('/AddTblCopmanySearchCopmanies', authenticateToken, AddTblCopmanySearchCopmanies);
router.post('/AddTblcompanySearchIndex', authenticateToken, AddTblcompanySearchIndex);
router.post('/AddTblCompanySearchExchange', authenticateToken, AddTblCompanySearchExchange);
router.post('/GetCompanySearchSelection', authenticateToken, GetAllCompanySearchSelection);
router.post('/AddTblCompanySearchPeerGroup', authenticateToken, AddTblCompanySearchPeerGroup);
router.post('/AddTblCompanySearchIndustry', authenticateToken, AddTblCompanySearchIndustry);
router.post('/DeleteTblCompanySearchIndustry', authenticateToken, DeleteTblCompanySearchIndustry);
router.post('/AddTblCompanySearchMarketCap', authenticateToken, AddTblCompanySearchMarketCap);
router.post('/AddtblCompanySearchCountry', authenticateToken, AddtblCompanySearchCountry);
router.post('/DeletetblCompanySearchCountry', authenticateToken, DeletetblCompanySearchCountry);

router.post('/GetAllDashboardWidget', authenticateToken, GetAllDashboardWidget);
router.post('/UpdateTblDashboard', authenticateToken, UpdateTblDashboard);
router.post('/AddtblDashboardWidgetLink', authenticateToken, AddtblDashboardWidgetLink);
router.post('/GetUserDashboard', authenticateToken, GetUserDashboard);
router.post('/DeleteDashboardSelection', authenticateToken, DeleteDashboardSelection);
router.post('/GetStoredProcedure', authenticateToken, GetStoredProcedure);
router.post('/GetStoredProcedureDownload', authenticateToken, GetStoredProcedureDownload);
// portals
router.post('/GetPortalsTop3News', authenticateToken, GetPortalsTop3News);
router.post('/GetDashboardIds', authenticateToken, GetDashboardIds);
router.post('/GetHotActivistData', authenticateToken, GetHotActivistData);
router.post('/GetDirectorAppointmentChartData', authenticateToken, GetDirectorAppointmentForDataRussell3000);
router.post('/GetAigRussell3000Score', authenticateToken, GetAigRussell3000Score);
router.post('/GetShareHolderProposalESG', authenticateToken, GetShareHolderProposalESG);
router.post('/GetVotingPolicyChangesESG', authenticateToken, GetVotingPolicyChangesESG);
router.post('/GetUpCommingShareHolderESG', authenticateToken, GetUpCommingShareHolderESG);
router.post('/GetMagazinesIssuesESG', authenticateToken, GetMagazinesIssuesESG);
// Investor
router.post('/GetCurrentShareholder', authenticateToken, GetCurrentShareholder);
router.post('/UpdateInvestorSearchOptions', authenticateToken, UpdateInvestorSearchOptions);
router.post('/AddTblInvestorSearchInvestors', authenticateToken, AddTblInvestorSearchInvestors);
router.post('/AddTblInvestorSearchAUM', authenticateToken, AddTblInvestorSearchAUM);
router.post('/AddtblInvestors_SearchType', authenticateToken, AddtblInvestors_SearchType);
router.post('/DeletetblInvestors_SearchType', authenticateToken, DeletetblInvestors_SearchType);
router.post('/GetInvestorsSearchOptions', authenticateToken, GetInvestorsSearchOptions);
router.post('/Deletetblinvestor_search_country', authenticateToken, Deletetblinvestor_search_country);
router.post('/Addtblinvestor_search_country', authenticateToken, Addtblinvestor_search_country);
router.post('/ListInvestorTypeAndSubtype', authenticateToken, ListInvestorTypeAndSubtype);
router.post('/AddtblInvestors_byshareholdercompany', authenticateToken, AddtblInvestors_byshareholdercompany);
router.post('/GetInvestorSearchSelection', authenticateToken, GetInvestorSearchSelection);
router.post('/GetAllInvestors', authenticateToken, GetAllInvestors);
router.post('/FreeSearchInvestor', authenticateToken, FreeSearchInvestor);
router.post('/GetAllInvestorsFromShareholderOfCompany', authenticateToken, GetAllInvestorsFromShareholderOfCompany);
router.post('/GetTblDashboardWidgets', authenticateToken, GetTblDashboardWidgets);
router.post('/ResetDashboardWidgetCompanySearch', authenticateToken, ResetDashboardWidgetCompanySearch);
router.post('/ResetDashboardWidgetInvestorSearch', authenticateToken, ResetDashboardWidgetInvestorSearch);
router.post('/GetErrorBoundryDetails', authenticateToken, GetErrorBoundryDetails);
router.post('/GetVulnerabilityHitsData', authenticateToken, GetVulnerabilityHitsData);
router.post('/GetAUMCategorylist', authenticateToken, GetAUMCategorylist);

async function FreeSearchInvestor(req, res, next) {
  try {
    const arrRowData = req.body.rowdata
      .replace(/\r\n|\r|\n/gi, ',')
      .replace(/, Inc|,Inc|Inc/gi, '')
      .replace(/, Ltd|,Ltd|Ltd/gi, '')
      .replace(/, AG/gi, '')
      .replace(/, S.A.|, SA|, S.A/gi, '')
      .replace(/, LLC/gi, '')
      .replace(/, LP|, L.P./gi, '')
      .replace(/\./gi, '')
      .split(',')
      .filter((item) => item.trim());
    const myJson = [];
    for (let index = 0; index < arrRowData.length; index++) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('row_data', sql.VarChar, arrRowData[index].trim())
        .execute('FreeSearchInvestor');
      for (let index1 = 0; index1 < result.recordset.length; index1++) {
        myJson.push(result.recordset[index1]);
      }
    }
    const s = await general.FilterUniqueFromJson(myJson, 'investor_id');
    return res.json(s);
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/FreeSearchInvestor`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetCurrentShareholder(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('proxy_insight.dbo.GetCurrentShareholder_insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetCurrentShareholder`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetAllInvestors(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('text', sql.VarChar, req.body.searchInput).execute('GetAllInvestors');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetAllInvestors`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetAllInvestorsFromShareholderOfCompany(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.body.pid)
      .execute('proxy_insight.dbo.GetAllInvestors');

    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'investor_id', 'value');
      general.RenameKey(obj, 'investor_name', 'label');
    });
    res.json({ data: arr });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetAllInvestorsFromShareholderOfCompany`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function UpdateInvestorSearchOptions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.VarChar, req.body.name)
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('userid', sql.Int, req.body.userid)
      .input('action', sql.VarChar, req.body.action)
      .input('aum_min', sql.Int, req.body.aum_min)
      .input('aum_max', sql.Int, req.body.aum_max)
      .input('is_saved', sql.Bit, req.body.is_saved)
      .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
      .execute('UpdateInvestorSearchOptions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/UpdateInvestorSearchOptions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function AddTblInvestorSearchInvestors(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('investor_ids', sql.VarChar, req.body.investor_ids)
      .execute('AddTblInvestorSearchInvestors');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblInvestorSearchInvestors`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function AddTblInvestorSearchAUM(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('AUM_group_id', sql.Int, req.body.AUM)
      .execute('AddTblInvestorSearchAUM');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblInvestorSearchAUM`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function AddtblInvestors_SearchType(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('investor_type_id', sql.Int, req.body.investor_type_id)
      .input('investor_subtype_id', sql.Int, req.body.investor_subtype_id)
      .input('location_selection', sql.VarChar, req.body.location_selection)
      .execute('AddtblInvestors_SearchType');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddtblInvestors_SearchType`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function DeletetblInvestors_SearchType(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .execute('DeletetblInvestors_SearchType');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/DeletetblInvestors_SearchType`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetInvestorsSearchOptions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.Int, req.body.userid).execute('GetInvestorsSearchOptions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetInvestorsSearchOptions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function Deletetblinvestor_search_country(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.companySearchId)
      .execute('Deletetblinvestor_search_country');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/Deletetblinvestor_search_country`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function Addtblinvestor_search_country(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('region_ids', sql.Int, req.body.regionIds)
      .input('country_ids', sql.Int, req.body.countryIds)
      // .input("locationSelection", sql.VarChar, req.body.locationSelection)
      .execute('Addtblinvestor_search_country');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/Addtblinvestor_search_country`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function ListInvestorTypeAndSubtype(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('ListInvestorTypeAndSubtype');
    const jsonTypes = [];
    if (!result) {
      res.status(400).json([]);
      return false;
    }
    const unique = [...new Set(result.recordset.map((item) => item.investor_type_id))];
    unique.forEach((e) => {
        let labeltext;
        let Valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((person) => person.investor_type_id === e)
          .forEach((row) => {
            labeltext = row.investor_type_name;
            Valuetext = row.investor_type_id;
            if (row.investor_sub_type_id !== null) {
              jsonChildren.push({ label: row.investor_sub_type_name, value: row.investor_sub_type_id, expanded: true });
            }
          });
        jsonTypes.push({
          label: labeltext,
          value: Valuetext,
          children: jsonChildren,
          expanded: true,
        });
    });

    res.json(jsonTypes);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/ListInvestorTypeAndSubtype`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function AddtblInvestors_byshareholdercompany(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('pid', sql.VarChar, req.body.pid)
      .execute('AddtblInvestors_byshareholdercompany');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddtblInvestors_byshareholdercompany`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetInvestorSearchSelection(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .execute('GetInvestorSearchSelection');
    res.json({
      investors: result.recordsets[0],
      AUM: result.recordsets[1],
      country: result.recordsets[2],
      search_type: result.recordsets[3],
      byshareholdercompany: result.recordsets[4],
      investor_search: result.recordsets[5],
    });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetInvestorSearchSelection`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//
async function DeleteDashboardSelection(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('dashboardWidgetLinkId', sql.Int, req.body.dashboardWidgetLinkId)
      .execute('deleteDashboardSelection');
    res.json(result);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/DeleteDashboardSelection`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetUserDashboard(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.Int, req.body.userid).execute('getUserDashboard');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetUserDashboard`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function AddtblDashboardWidgetLink(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('dashboard_id', sql.Int, req.body.dashboardId)
      .input('widget_id', sql.Int, req.body.widgetId)
      .input('widget_order', sql.Int, req.body.widgetOrder)
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_search_id', sql.Int, req.body.investorSearchId)
      .input('renamed_widget', sql.NVarChar, req.body.renameWidget)
      .input('position', sql.VarChar, req.body.position)
      .input('userid', sql.VarChar, req.body.userid)
      .input('dashboard_widget_link_id', sql.VarChar, req.body.dashboardWidgetLinkId)
      .execute('AddtblDashboard_widget_link');
    res.json(result);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddtblDashboardWidgetLink`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function UpdateTblDashboard(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .input('dashboard_name', sql.VarChar, req.body.dashboardName)
      .input('dashboard_id', sql.Int, req.body.dashboardid)
      .execute('UpdateTblDashboard');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/UpdateTblDashboard`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAllDashboardWidget(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      // .input("product_id", sql.Int, req.body.productid)
      .execute('GetTblDashboardWidgets');
    const jsonWeidgets = [];
    if (!result) {
      res.status(400).json([]);
    }
    const unique = [...new Set(result.recordset.map((item) => item.Section_name))];
    unique.forEach((e) => {
      const jsonChildren = [];
      result.recordset
        .filter((person) => person.Section_name === e)
        .forEach((row) => {
          const row_name = row.name;
          const row_Section_name = row.Section_name;
          jsonChildren.push({
            ...row,
            Section_name: row_Section_name.replace(/\r?\n?/g, ''),
            Name: row_name.replace(/\r?\n?/g, ''),
            id: uuidv4(),
          });
        });
      jsonWeidgets.push({ Section_name: e.replace(/\r?\n?/g, ''), tab: jsonChildren });
    });

    res.json({ data: jsonWeidgets });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetAllDashboardWidget`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function AddtblCompanySearchCountry(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('region_ids', sql.VarChar, req.body.regionIds)
      .input('country_ids', sql.VarChar, req.body.countryIds)
      // .input("locationSelection", sql.VarChar, req.body.locationSelection)
      .execute('AddtblCompany_Search_Country');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddtblCompanySearchCountry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function DeletetblCompanySearchCountry(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .execute('DeletetblCompany_Search_Country');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/DeletetblCompanySearchCountry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblCompanySearchMarketCap(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('market_cap_group_id', sql.VarChar, req.body.marketCap)
      .execute('AddTblCompany_search_market_cap');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblCompanySearchMarketCap`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function DeleteTblCompanySearchIndustry(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .execute('DeleteTblCompany_search_industry');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/DeleteTblCompanySearchIndustry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblCompanySearchIndustry(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('industry_ids', sql.VarChar, req.body.industryIds)
      .input('sector_ids', sql.VarChar, req.body.sectorIds)
      // .input("industrySelection", sql.VarChar, req.body.industrySelection)
      .execute('AddTblCompany_search_industry');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblCompanySearchIndustry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblCompanySearchPeerGroup(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('peerGroup_ids', sql.VarChar, req.body.peerGroupIds)
      .execute('AddTblcompany_search_peer_group');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblCompanySearchPeerGroup`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblCompanySearchExchange(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('exchange_ids', sql.VarChar, req.body.exchange_ids)
      .execute('AddTblcompany_search_exchange');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblCompanySearchExchange`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAllCompanySearchSelection(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .execute('GetCompanySearchSelection');
    res.json({
      companies: result.recordsets[0],
      country: result.recordsets[1],
      exchange: result.recordsets[2],
      index: result.recordsets[3],
      industry: result.recordsets[4],
      market_cap: result.recordsets[5],
      peer_group: result.recordsets[6],
      company_search: result.recordsets[7],
    });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetAllCompanySearchSelection`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function UpdateCompanySearchOptions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.VarChar, req.body.name)
      .input('company_search_id', sql.Int, req.body.company_search_id)
      .input('action', sql.VarChar, req.body.action)
      .input('userid', sql.Int, req.body.userid)
      .input('market_cap_min', sql.Int, req.body.market_cap_min)
      .input('market_cap_max', sql.Int, req.body.market_cap_max)
      .input('is_saved', sql.Bit, req.body.isSaveSelection)
      .input('pid', sql.Int, req.body.pid)
      .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
      .execute('UpdateCompanySearchOptions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/UpdateCompanySearchOptions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblCopmanySearchCopmanies(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('pids', sql.VarChar, req.body.pid)
      .execute('AddTblCopmanySearchCopmanies');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblCopmanySearchCopmanies`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function AddTblcompanySearchIndex(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('index_ids', sql.VarChar, req.body.index_ids)
      .execute('AddTblcompany_search_index');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/AddTblcompanySearchIndex`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompanySearchOptions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.Int, req.body.userid).execute('GetCompanySearchOptions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetCompanySearchOptions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function FreeSearchCompanyAndIndustry(req, res, next) {
  try {
    const arrRowData = req.body.rowdata
      .replace(/\r\n|\r|\n/gi, '#|')
      .replace(/,(?! S.A.|SA|S.A|Inc|LLC|LP|L.P.|AG|Ltd)/gi, '#|')
      .split('#|')
      .filter((item) => item.trim());
    const myJson = [];
    for (let index = 0; index < arrRowData.length; index++) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('row_data', sql.VarChar, arrRowData[index].trim())
        .execute('FreeSearchCompanyAndIndustry');
      if (result.recordset !== undefined && result.recordset.length > 0) {
        for (let index1 = 0; index1 < result.recordset.length; index1++) {
          myJson.push(result.recordset[index1]);
        }
      }
    }
    const s = await general.FilterUniqueFromJson(myJson, 'pid');
    return res.json(s);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/FreeSearchCompanyAndIndustry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function PIListSectorsAndIndustries(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('PIListSectorsAndIndustries');
    const jsonIndustrySector = [];
    if (!result) {
      res.status(400).json([]);
      return false;
    }
    const unique = [...new Set(result.recordset.map((item) => item.industry_sector_id))];
    unique.forEach((e) => {
        let labeltext;
        let valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((res) => res.industry_sector_id === e)
          .forEach((row) => {
            labeltext = row.industry_sector_name;
            valuetext = row.industry_sector_id;
            jsonChildren.push({ label: row.industry_name, value: row.industry_id, expanded: true });
          });
        jsonIndustrySector.push({
          label: labeltext,
          value: valuetext,
          children: jsonChildren,
          expanded: true,
        });
      }
    );

    res.json(jsonIndustrySector);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/PIListSectorsAndIndustries`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function V2AListCompanyRegionsAndCountries(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('ListCompanyRegionsAndCountries_insightia');
    const jsonCountries = [];
    if (!result) {
      res.status(400).json([]);
      return false;
    }
    const unique = [...new Set(result.recordset.map((item) => item.Region_id))];
    unique.forEach((e) => {
        let labeltext;
        let Valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((person) => person.Region_id === e)
          .forEach((row) => {
            labeltext = row.Region_name;
            Valuetext = row.Region_id;
            jsonChildren.push({ label: row.Country_name, value: row.Country_id, expanded: true });
          });
        jsonCountries.push({
          label: labeltext,
          value: Valuetext,
          children: jsonChildren,
          expanded: true,
        });
      }
    );

    res.json(jsonCountries);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/V2AListCompanyRegionsAndCountries`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetExchange(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetExchange');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetExchange`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAllIssuers(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('text', sql.VarChar, req.body.searchInput).execute('GetAllIssuers');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetAllIssuers`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function PIListIndices(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('PIListIndices');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'index_id', 'value');
      general.RenameKey(obj, 'index_name', 'label');
    });
    const updatedJson = JSON.stringify(arr);
    res.json({ data: arr });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/PIListIndices`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAIPeerGroups(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAIPeerGroups');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetAIPeerGroups`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetTblDashboardWidgets(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .execute('GetTblDashboardWidgets');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetTblDashboardWidgets`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetStoredProcedure(req, res, next) {
  try {
    if (req.body.StoredProcedure !== null) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
        .execute(req.body.StoredProcedure);

        const resultDashboard = await pool.request().input('userid', sql.Int, req.body.userid).execute('getUserDashboard');
      res.json({ orgData: result.recordset, dashbordData: resultDashboard.recordset });
    } else {
      res.json([]);
    }
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetStoredProcedure/${req.body.StoredProcedure}`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetStoredProcedureDownload(req, res, next) {
  try {
    if (req.body.StoredProcedure !== null) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
        .execute(req.body.StoredProcedure);
      res.json(result.recordset);
    } else {
      res.json([]);
    }
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetStoredProcedureDownload/${req.body.StoredProcedure}`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ResetDashboardWidgetCompanySearch(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
      .execute('ResetDashboardWidgetCompanySearch');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/ResetDashboardWidgetCompanySearch`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ResetDashboardWidgetInvestorSearch(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('dashboard_widget_link_id', sql.Int, req.body.dashboard_widget_link_id)
      .execute('ResetDashboardWidgetInvestorSearch');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/ResetDashboardWidgetInvestorSearch`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPortalsTop3News(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetVotingPortalTop3News');

    const result1 = await pool.request().execute('GetActivismPortalTop3News');

    const result2 = await pool.request().execute('GetGovernancePortalTop3News');

    const result3 = await pool.request().execute('GetESGPortalTop3News');

    const result4 = await pool.request().execute('GetVulnerabilityPortalTop3News');
    const result5 = await pool.request().execute('GetActivistShortsPortalTop3News');

    res.json({
      votingNewsData: result.recordsets[0],
      activismNewsData: result1.recordsets[0],
      governanceNewsData: result2.recordsets[0],
      ESGNewsData: result3.recordsets[0],
      vulnerabilityNewsData: result4.recordsets[0],
      activistShortsNewsData: result5.recordsets[0],
    });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetPortalsTop3News`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetDashboardIds(req, res, next) {
  try {
    res.json({ data: DashboardIdData });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetDashboardIds`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetHotActivistData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetHotActivistData');

    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetHotActivistData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorAppointmentForDataRussell3000(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetDirectorAppointmentData_Russell_3000');

    const lstGenderDiversityOfDirectorAppointment = [];

    lstGenderDiversityOfDirectorAppointment.push({
      text: `Male (${Math.round(result.recordset[0].male_per)}%)`,
      value: Math.round(result.recordset[0].male_per),
    });
    lstGenderDiversityOfDirectorAppointment.push({
      text: `Female (${Math.round(result.recordset[0].female_per)}%)`,
      value: Math.round(result.recordset[0].female_per),
    });

    res.json({ data: lstGenderDiversityOfDirectorAppointment });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetDirectorAppointmentForDataRussell3000`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAigRussell3000Score(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('AigRussell3000Score');

    const lstAiGScore = [];

    lstAiGScore.push({
      text: 'Poor',
      value: Math.round(result.recordset[0].poor_per),
    });
    lstAiGScore.push({
      text: 'Bad',
      value: Math.round(result.recordset[0].bad_per),
    });
    lstAiGScore.push({
      text: 'Average',
      value: Math.round(result.recordset[0].avg_per),
    });
    lstAiGScore.push({
      text: 'Good',
      value: Math.round(result.recordset[0].good_per),
    });
    lstAiGScore.push({
      text: 'Excellent',
      value: Math.round(result.recordset[0].excellent_per),
    });
    res.json({ data: lstAiGScore });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetAigRussell3000Score`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetShareHolderProposalESG(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('start_date', sql.Date, req.body.StartDate)
      .input('end_date', sql.Date, req.body.EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .execute('proxy_insight.dbo.resolutions_by_invest_filter_Insightia_ESG');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetShareHolderProposalESG`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingPolicyChangesESG(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('proxy_insight.dbo.GetVotingPolicyChangesESG');

    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetVotingPolicyChangesESG`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetUpCommingShareHolderESG(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('proxy_insight.dbo.GetUpCommingShareHolderESG');

    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetUpCommingShareHolderESG`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetMagazinesIssuesESG(req, res, next) {
  try {
    const Top3Mag = [];
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('product_id', sql.Int, req.body.product_id)
      .input('article_type_list', sql.VarChar, req.body.article_type_list)
      .execute('GetMagazineIssue_ProductType');
    await result.recordset.forEach((element, i) => {
      if (i < 3) {
        Top3Mag.push(element);
      }
    });
    res.json({ data: result.recordset, top3Mag: Top3Mag });
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetMagazinesIssuesESG`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetErrorBoundryDetails(req, res, next) {
  try {
    const route = req.body.url;
    const error = req.body.error;
    const body = req.body.errorInfo;
    general.ErrorLog(route, error, req.user.User_Id, body, req.headers.origin);
  } catch (error) {
    general.ErrorLog(`${dashboardroutes}/GetErrorBoundryDetails`, error);
  }
}

async function GetVulnerabilityHitsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('getVulnerabilityhits');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetVulnerabilityHitsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAUMCategorylist(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAUMCategory');
    const jsonResult = [];
    result.recordset.forEach((row) => {
      jsonResult.push({ label: row.drop_down_text, value: row.aum_category_id });
    });
    res.json(jsonResult);
  } catch (error) {
    general.ErrorLog(
      `${dashboardroutes}/GetAUMCategorylist`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
