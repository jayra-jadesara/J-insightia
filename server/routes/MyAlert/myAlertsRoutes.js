const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const myAlertsRoutes = 'myAlertsRoute';

router.post('/GetActivismNewsAlerts', authenticateToken, GetActivismNewsAlerts);
router.post('/V2AListAlertEvents', authenticateToken, V2AListAlertEvents);
router.post('/ListFilingGroups', authenticateToken, ListFilingGroups);
router.post('/GetAlertOptionsAndSubOptions', authenticateToken, GetAlertOptionsAndSubOptions);
router.post('/GetDirectorType', authenticateToken, GetDirectorType);
router.post('/GetGovAmendemntCategories', authenticateToken, GetGovAmendemntCategories);
router.post('/UpdateTblalert', authenticateToken, UpdateTblalert);
router.post('/InserttblAlertOptionLink', authenticateToken, InserttblAlertOptionLink);
router.post('/InserttblAlertSubOptionLink', authenticateToken, InserttblAlertSubOptionLink);
router.post('/DeleteTblAlertOptionLink', authenticateToken, DeleteTblAlertOptionLink);
router.post('/GetExistingAlerts', authenticateToken, GetExistingAlerts);
router.post('/GetAlertDetails', authenticateToken, GetAlertDetails);
router.post('/GetAlertModuleAccess', authenticateToken, GetAlertModuleAccess);

async function GetActivismNewsAlerts(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('ListCampaignActionsAndGroups');

    const jsonCampaignActionsAndGroups = [];
    const unique = [...new Set(result.recordset.map((item) => item.activism_group_id))];
    unique.map((e) => {
      {
        let labeltext;
        let Valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((person) => person.activism_group_id === e)
          .map((row) => {
            labeltext = row.activism_group_name;
            Valuetext = row.activism_group_id;
            jsonChildren.push({
              label: row.activism_type,
              value: row.activism_type_id,
              expanded: false,
            });
          });
        jsonCampaignActionsAndGroups.push({
          label: labeltext,
          value: Valuetext,
          children: jsonChildren,
          expanded: false,
        });
      }
    });
    res.json(jsonCampaignActionsAndGroups);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetActivismNewsAlerts`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function V2AListAlertEvents(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('V2AListAlertEvents');
    result.recordset.forEach((obj) => {
      general.RenameKey(obj, 'activism_type_id', 'value');
      general.RenameKey(obj, 'activism_type', 'label');
    });
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/V2AListAlertEvents`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function ListFilingGroups(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('ListFilingGroups');
    result.recordset.forEach((obj) => {
      general.RenameKey(obj, 'filing_group_id', 'value');
      general.RenameKey(obj, 'filing_group_name', 'label');
    });
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/ListFilingGroups`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAlertOptionsAndSubOptions(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAlertOptionsAndSubOptions');

    const myAlertOptionJson = [];
    const myAlertSubOptionJson = [];
    const myAlertStaticSubOptionJson = [];

    if (result.recordsets.length > 0) {
      result.recordsets[0].forEach((e) => {
        myAlertOptionJson.push({
          ...e,
          value: e.alert_option_id,
          label: e.option_name,
        });
      });
    }

    if (result.recordsets.length > 1) {
      result.recordsets[1].forEach((e) => {
        myAlertSubOptionJson.push({
          ...e,
          value: e.alert_suboption_id,
          label: e.alert_suboption_description,
        });
      });
    }

    if (result.recordsets.length > 2) {
      result.recordsets[2].forEach((e) => {
        myAlertStaticSubOptionJson.push({
          ...e,
          value: e.alert_suboption_static_values_id,
          label: e.sub_option_description,
        });
      });
    }

    res.json({
      AlertOptions: myAlertOptionJson,
      AlertSubOptions: myAlertSubOptionJson,
      AlertStaticSubOptions: myAlertStaticSubOptionJson,
    });
  } catch (error) {
    general.ErrorLog(
      `${myAlertsRoutes}/GetAlertOptionsAndSubOptions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorType(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetDirectorType');
    result.recordset.forEach((obj) => {
      general.RenameKey(obj, 'director_typeno_id', 'value');
      general.RenameKey(obj, 'director_type', 'label');
    });

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetDirectorType`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetGovAmendemntCategories(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetGovAmendemntCategories');
    result.recordset.forEach((obj) => {
      general.RenameKey(obj, 'director_typeno_id', 'value');
      general.RenameKey(obj, 'amend_cat', 'label');
    });

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetGovAmendemntCategories`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function UpdateTblalert(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alertid', sql.Int, req.body.alertid)
      .input('user_id', sql.Int, req.body.userid)
      // .input('created', sql.Int, req.body.created)
      .input('alert_name', sql.VarChar, req.body.alertname)
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('investor_search_id', sql.Int, req.body.investorSearchId)
      // .input('send_filing_alerts', sql.Int, req.body.sendFillingAlerts)
      // .input('send_news_alerts', sql.Int, req.body.sendNewsAlert)
      // .input('send_short_alerts', sql.Int, req.body.sendShortAlert)
      // .input('long_short', sql.Char, req.body.longShort)
      // .input('alert_all', sql.Int, req.body.alertAll)
      // .input('alert_new_investments', sql.Int, req.body.alertnewsInvestment)
      .input('receive_email', sql.Int, req.body.receivedEmail)
      .input('receive_alerts_inbox_online', sql.Int, req.body.receivedAlertInboxOnline)
      // .input('no_alerts_sent', sql.Int, req.body.noAlertSent)
      // .input('alert_paused', sql.Int, req.body.alertPaused)
      // .input('considered_in_current_cycle', sql.Int, req.body.consideredInCurrentCycle)
      // .input('product_id_linked', sql.Int, req.body.productLinked)
      .input('notify_me_instant_alert', sql.Bit, req.body.notyfy_me_instant_alert)
      .input('newAlertID_OUT', sql.Int, null)
      .execute('UpdateTblalert');
    if (result.recordset.length > 0) {
      res.json({ alertId: result.recordset[0].alertId });
    } else {
      res.json({ alertid: 0 });
    }
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/UpdateTblalert`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function InserttblAlertOptionLink(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_id', sql.Int, req.body.alertid)
      .input('alert_option_id', sql.Int, req.body.alertOptionId)
      .input('alert_option_link_id_out', sql.Int, null)
      .execute('Inserttblv3a_alert_option_link');

    if (result.recordset.length > 0) {
      res.json({ alertOptionId: result.recordset[0].alertOptionId });
    } else {
      res.json({ alertOptionId: 0 });
    }
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/InserttblAlertOptionLink`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function InserttblAlertSubOptionLink(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_option_link_id', sql.Int, req.body.optionLinkId)
      .input('alert_suboption_id', sql.Int, req.body.alertSubOptionId)
      .input('value', sql.Int, req.body.value)
      .execute('InsertTblv3a_alert_suboption_link');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${myAlertsRoutes}/InserttblAlertSubOptionLink`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function DeleteTblAlertOptionLink(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_id', sql.Int, req.body.alert_id)
      .execute('deleteTblAlertOptionLink');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/DeleteTblAlertOptionLink`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAlertModuleAccess(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.user_id).execute('GetAlertModuleAccess');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetAlertModuleAccess`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetExistingAlerts(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.Int, req.body.userid).execute('GetExistingAlerts');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetExistingAlerts`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAlertDetails(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('alertid', sql.Int, req.body.alertid).execute('GetAlertDetails');
    let resObject = {};
    if (result.recordsets.length > 0) {
      resObject = { ...resObject, alert: result.recordset[0] };
    }
    if (result.recordsets.length > 1) {
      resObject = { ...resObject, alertOption: result.recordsets[1] };
    }
    if (result.recordsets.length > 2) {
      resObject = { ...resObject, alertSubOption: result.recordsets[2] };
    }
    res.json(resObject);
  } catch (error) {
    general.ErrorLog(`${myAlertsRoutes}/GetAlertDetails`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
