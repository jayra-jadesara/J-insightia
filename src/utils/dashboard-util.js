import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode, dateToISOString } from './general-util';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_FOUR,
  NUMBER_TWO,
} from '../constants/NumberConstants';
import { deleteFromCache, readFromCache, writeToCache } from './cache-util';
import ProductConstants from '../constants/ProductConstants';

export const AddtblCompanySearchCountry = async (
  company_search_id,
  peerGroupIds,
  sectorIds
) => {
  try {
    const response = await axios.post(
      config.addtblCompanySearchCountry,
      {
        companySearchId: company_search_id,
        regionIds: peerGroupIds,
        countryIds: sectorIds,
        // locationSelection: locationSelection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const DeleteTblCompanySearchIndustry = async (company_search_id) => {
  try {
    const response = await axios.post(
      config.deleteTblCompanySearchIndustry,
      {
        companySearchId: company_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const DeletetblCompanySearchCountry = async (company_search_id) => {
  try {
    const response = await axios.post(
      config.deletetblCompanySearchCountry,
      {
        companySearchId: company_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblCompanySearchMarketCap = async (
  company_search_id,
  marketCap
) => {
  try {
    const response = await axios.post(
      config.addTblCompanySearchMarketCap,
      {
        companySearchId: company_search_id,
        marketCap,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblCompanySearchIndustry = async (
  company_search_id,
  sectorIds,
  peerGroupIds
) => {
  try {
    const response = await axios.post(
      config.addTblCompanySearchIndustry,
      {
        companySearchId: company_search_id,
        sectorIds,
        industryIds: peerGroupIds,
        // industrySelection: industrySelection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblCompanySearchPeerGroup = async (
  company_search_id,
  peerGroupIds
) => {
  try {
    const response = await axios.post(
      config.addTblCompanySearchPeerGroup,
      {
        companySearchId: company_search_id,
        peerGroupIds,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblcompanySearchExchange = async (
  company_search_id,
  exchangeIds
) => {
  try {
    const response = await axios.post(
      config.addTblcompanySearchExchange,
      {
        companySearchId: company_search_id,
        exchange_ids: exchangeIds,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const GetAllCompanySearchSelection = async (company_search_id) => {
  try {
    const response = await axios.post(
      config.getCompanySearchSelection,
      {
        companySearchId: company_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblCopmanySearchCopmanies = async (company_search_id, pid) => {
  try {
    const response = await axios.post(
      config.addTblCopmanySearchCopmanies,
      {
        companySearchId: company_search_id,
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblcompanySearchIndex = async (company_search_id, indexIds) => {
  try {
    const response = await axios.post(
      config.addTblcompanySearchIndex,
      {
        companySearchId: company_search_id,
        index_ids: indexIds,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const GetAllIssuers = async (text) => {
  try {
    const response = await axios.post(
      config.getAllIssuers,
      { searchInput: text },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const PIListIndices = async () => {
  try {
    const cachedData = readFromCache(config.piListIndices);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.piListIndices,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.piListIndices, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetAllExchange = async () => {
  try {
    const cachedData = readFromCache(config.getExchange);

    if (cachedData) {
      return cachedData;
    }

    const response = await axios.post(
      config.getExchange,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getExchange, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetAIPeerGroups = async () => {
  try {
    const cachedData = readFromCache(config.getAIPeerGroups);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.getAIPeerGroups,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getAIPeerGroups, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetListRegionsAndCountries = async () => {
  try {
    const cachedData = readFromCache(config.getListRegionsAndCountries);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.getListRegionsAndCountries,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getListRegionsAndCountries, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const PIListSectorsAndIndustries = async () => {
  try {
    const cachedData = readFromCache(config.piListSectorsAndIndustries);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.piListSectorsAndIndustries,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.piListSectorsAndIndustries, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const FreeSearchCompanyAndIndustry = async (rowdata) => {
  try {
    const response = await axios.post(
      config.freeSearchCompanyAndIndustry,
      {
        rowdata,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetCompanySearchOptions = async () => {
  try {
    const cachedData = readFromCache(config.getCompanySearchOptions);

    if (cachedData) {
      return cachedData;
    }
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));
    const response = await axios.post(
      config.getCompanySearchOptions,
      {
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getCompanySearchOptions, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const UpdateCompanySearchOptions = async (
  name,
  company_search_id,
  action,
  marketCapMin,
  marketCpaMax,
  isSaveSelection,
  pid,
  dashboard_widget_link_id
) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.updateCompanySearchOptions,
      {
        name,
        company_search_id,
        action,
        userid: uid, //
        market_cap_min: marketCapMin,
        market_cap_max: marketCpaMax,
        isSaveSelection,
        pid,
        dashboard_widget_link_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      deleteFromCache(config.getCompanySearchOptions);
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const GetUserRightsForWidgets = async () => {
  try {
    let membership;
    await TokenDecode()
      .then((res) => {
        membership = res.MemberShip;
      })
      .catch((e) => console.error(e));
    return membership;
  } catch (error) {
    return false;
  }
};

export const GetAllDashboardWidgets = async () => {
  try {
    const response = await axios.post(
      config.getAllDashboardWidget,
      {},
      // {
      //   productid: productid,
      // },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const UpdateTblDashboard = async (dashboardName, dashboardid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.updateTblDashboard,
      {
        userid: uid,
        dashboardName,
        dashboardid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      if (dashboardid === null) {
        deleteFromCache(config.getUserDashboard);
        return response.data.recordset[0].Dashboard_id;
      }
      return dashboardid;
    }
    return undefined;
  } catch (error) {
    return false;
  }
};

export const AddtblDashboardWidgetLink = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.addtblDashboardWidgetLink,
      {
        dashboardId: req.dashboardId,
        widgetId: req.widgetId,
        widgetOrder: req.widgetOrder,
        companySearchId: req.companySearchId,
        investorSearchId: req.investorSearchId,
        renameWidget: req.renameWidget,
        position: req.position,
        userid: uid,
        dashboardWidgetLinkId: req.dashboardWidgetLinkId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      deleteFromCache(config.getUserDashboard);
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const GetUserDashboard = async () => {
  try {
    const cachedData = false;

    if (cachedData) {
      return cachedData;
    }
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.getUserDashboard,
      {
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getUserDashboard, response.data.recordset);
      return response.data.recordset;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const DeleteDashboardSelection = async (dashboardWidgetLinkId) => {
  try {
    const response = await axios.post(
      config.deleteDashboardSelection,
      {
        dashboardWidgetLinkId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      deleteFromCache(config.getUserDashboard);
      return response;
    }
    return [];
  } catch (error) {
    return false;
  }
};
//

export const GetCurrentShareholder = async () => {
  try {
    const response = await axios.post(
      config.GetCurrentShareholder,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetCurrentShareholder, response.data.data);
      return response.data.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const UpdateInvestorSearchOptions = async (
  name,
  investor_search_id,
  action,
  aum_min,
  aum_max,
  is_saved,
  dashboard_widget_link_id
) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.UpdateInvestorSearchOptions,
      {
        name,
        investor_search_id,
        action,
        userid: uid,
        aum_min,
        aum_max,
        is_saved,
        dashboard_widget_link_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      deleteFromCache(config.GetInvestorsSearchOptions);
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblInvestorSearchInvestors = async (
  investor_search_id,
  investor_ids
) => {
  try {
    const response = await axios.post(
      config.AddTblInvestorSearchInvestors,
      {
        investor_search_id,
        investor_ids,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddTblInvestorSearchAUM = async (investor_search_id, AUM) => {
  try {
    const response = await axios.post(
      config.AddTblInvestorSearchAUM,
      {
        investor_search_id,
        AUM,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const AddtblInvestors_SearchType = async (
  investor_search_id,
  investor_type_id,
  investor_subtype_id,
  location_selection
) => {
  try {
    const response = await axios.post(
      config.AddtblInvestors_SearchType,
      {
        investor_search_id,
        investor_type_id,
        investor_subtype_id,
        location_selection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const DeletetblInvestors_SearchType = async (investor_search_id) => {
  try {
    const response = await axios.post(
      config.DeletetblInvestors_SearchType,
      {
        investor_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const GetInvestorsSearchOptions = async () => {
  try {
    const cachedData = readFromCache(config.GetInvestorsSearchOptions);

    if (cachedData) {
      return cachedData;
    }
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.GetInvestorsSearchOptions,
      {
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetInvestorsSearchOptions, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
export const Deletetblinvestor_search_country = async (investor_search_id) => {
  try {
    const response = await axios.post(
      config.Deletetblinvestor_search_country,
      {
        investor_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};
export const Addtblinvestor_search_country = async (
  investor_search_id,
  peerGroupIds,
  sectorIds
) => {
  try {
    const response = await axios.post(
      config.Addtblinvestor_search_country,
      {
        investor_search_id,
        regionIds: peerGroupIds,
        countryIds: sectorIds,
        // locationSelection: locationSelection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};

export const ListInvestorTypeAndSubtype = async () => {
  try {
    const cachedData = readFromCache(config.ListInvestorTypeAndSubtype);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.ListInvestorTypeAndSubtype,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.ListInvestorTypeAndSubtype, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const AddtblInvestors_byshareholdercompany = async (
  investor_search_id,
  pid
) => {
  try {
    const response = await axios.post(
      config.AddtblInvestors_byshareholdercompany,
      {
        investor_search_id,
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};
export const getInvestorSearchSelection = async (investor_search_id) => {
  try {
    const response = await axios.post(
      config.GetInvestorSearchSelection,
      {
        investor_search_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (error) {
    return false;
  }
};
export const GetAllInvestors = async (text) => {
  try {
    const response = await axios.post(
      config.GetAllInvestors,
      { searchInput: text },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
export const FreeSearchInvestor = async (rowdata) => {
  try {
    const response = await axios.post(
      config.FreeSearchInvestor,
      {
        rowdata,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
export const GetAllInvestorsFromShareholderOfCompany = async (res) => {
  try {
    const response = await axios.post(
      config.GetAllInvestorsFromShareholderOfCompany,
      { pid: res.value },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetAllDashboardWidgetsList = async () => {
  try {
    const response = await axios.post(
      config.getTblDashboardWidgets,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetStoredProcedure = async (res) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.error(e));

    const response = await axios.post(
      config.getStoredProcedure,
      {
        userid: uid,
        StoredProcedure: res.StoredProcedure,
        dashboard_widget_link_id: res.dashboard_widget_link_id,
      },

      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetStoredProcedureDownload = async (res) => {
  try {
    const response = await axios.post(
      config.getStoredProcedureDownload,
      {
        StoredProcedure: res.StoredProcedure,
        dashboard_widget_link_id: res.dashboard_widget_link_id,
      },

      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const ResetDashboardWidgetCompanySearch = async (res) => {
  try {
    const response = await axios.post(
      config.resetDashboardWidgetCompanySearch,
      {
        dashboard_widget_link_id: res.dashboard_widget_link_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const ResetDashboardWidgetInvestorSearch = async (res) => {
  try {
    const response = await axios.post(
      config.resetDashboardWidgetInvestorSearch,
      {
        dashboard_widget_link_id: res.dashboard_widget_link_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetPortalsTop3News = async () => {
  try {
    const response = await axios.post(
      config.GetPortalsTop3News,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const GetDashboardIdData = async () => {
  try {
    const response = await axios.post(
      config.GetDashboardIdData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHotActivistData = async () => {
  try {
    const response = await axios.post(
      config.GetHotActivistData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getDirectorAppointmentChartData = async () => {
  try {
    const response = await axios.post(
      config.GetDirectorAppointmentChartData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getAigRussell3000Score = async () => {
  try {
    const response = await axios.post(
      config.GetAigRussell3000Score,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getShareHolderProposalESG = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId
) => {
  try {
    const response = await axios.post(
      config.GetShareHolderProposalESG,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getVotingPolicyChangesESG = async () => {
  try {
    const response = await axios.post(
      config.GetVotingPolicyChangesESG,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getUpCommingShareHolderESG = async () => {
  try {
    const response = await axios.post(
      config.GetUpCommingShareHolderESG,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

function isBtnEnableFn(item, token) {
  if (item.is_aim === undefined || item.is_aim === null || !item.is_aim) {
    return true;
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === ProductConstants.ACTIVIST_INSIGHT_MONTHLY &&
        e.status === NUMBER_FOUR
    )
  ) {
    return true;
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === ProductConstants.ACTIVIST_INSIGHT_MONTHLY &&
        e.status === NUMBER_TWO
    )
  ) {
    if (item.is_aim && item.is_latest_aim) {
      return true;
    }
    if (item.is_aim) {
      return false;
    }
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === ProductConstants.ACTIVIST_INSIGHT_MONTHLY &&
        (e.status !== NUMBER_FOUR || e.status !== NUMBER_TWO)
    )
  ) {
    return false;
  }
}

export const getMagazinesIssuesESG = async (res) => {
  try {
    const response = await axios.post(
      config.GetMagazinesIssuesESG,
      {
        product_id: res.product_id,
        article_type_list: res.article_type_list,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    const token = await TokenDecode();
    let TopMyJson = [];
    TopMyJson = await Promise.all(
      response.data.top3Mag.map((item) => ({
        ...item,
        enableBtn: isBtnEnableFn(item, token),
      }))
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return { data: { top3Mag: TopMyJson } };
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetErrorBoundryDetails = async (url, error, errorInfo) => {
  try {
    const response = await axios.post(
      config.getErrorBoundryDetails,
      {
        url,
        error,
        errorInfo,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getVulnerabilityhitsData = async () => {
  try {
    const response = await axios.post(
      config.GetVulnerabilityHitsData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const getAumCategorylist = async () => {
  try {
    const cachedData = readFromCache(config.getAumCategorylist);
    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.getAumCategorylist,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.getAumCategorylist, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
export const GetAllPeopleList = async (text) => {
  try {
    const response = await axios.post(
      config.GetAllPeopleList,
      { text: text },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
