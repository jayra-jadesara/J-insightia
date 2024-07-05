const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const alertInboxRoutes = 'alertInboxRoute';

router.post('/GetAlertInbox', authenticateToken, GetAlertInbox);
router.post('/GetAlertFilingDetails', authenticateToken, GetAlertFilingDetails);
router.post('/GetSampleData', authenticateToken, GetSampleData);
router.post('/GetInboxAlertByUser', authenticateToken, GetInboxAlertByUser);
router.post('/GetAlertInboxType', authenticateToken, GetAlertInboxType);
router.post('/GetElementDetails', authenticateToken, GetElementDetails);
router.post('/deleteAlert', authenticateToken, deleteAlert);
router.post('/UpdateAlertStatus', authenticateToken, UpdateAlertStatus);
router.post('/GetInboxAlertDetails', authenticateToken, GetInboxAlertDetails);
router.post('/GetAlertNotificationData', authenticateToken, GetAlertNotificationData);
router.post('/GetTop20AlertResult', authenticateToken, GetTop20AlertResult);

async function GetAlertInbox(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .input('element_type_id', sql.Int, req.body.element_type_id)
      .execute('GetInboxAlertNames');

    let nameResult = result.recordset;
    let lstAlertName = [];
    nameResult.forEach((item) => {
      lstAlertName.push({
        value: item.alert_id,
        label: item.alert_name
      });
    });

    res.json({ lstAlertName: lstAlertName, result: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetAlertInbox`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAlertFilingDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
      .execute('Getv3aFilingDetailsAlert');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetAlertFilingDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetSampleData(req, res, next) {
  try {
    let keys;
    let newTable = [];
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
      .execute('Getv3aNSAlert');
    let results = result.recordset;
    results.forEach((e) => {
      keys = Object.keys(e);
    });
    results.forEach((e) => {
      keys.forEach((k) => {
        newTable.push({
          row_heading: k,
          1: e[k]
        });
      });
    });
    res.json(newTable);
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetSampleData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
//get alert type dropdown
async function GetAlertInboxType(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .input('alert_id', sql.Int, req.body.alert_id)
      .execute('GetInboxAlertTypes');

    let nameResult = result.recordset;
    let lstAlertType = [];
    nameResult.forEach((item) => {
      lstAlertType.push({
        value: item.element_type_id,
        label: item.category
      });
    });

    res.json({ lstAlertType: lstAlertType, result: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetAlertInboxType`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInboxAlertByUser(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .input('alert_id', sql.Int, req.body.alert_id)
      .input('element_type_id', sql.Int, req.body.element_type_id)
      .execute('GetInboxAlertsbyUser');

    var perChunk = 100; // items per chunk

    var Finalresult = result.recordset.reduce((resultArray, data, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(data);

      return resultArray;
    }, []);
    res.json({
      elementData: Finalresult
    });
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetInboxAlertByUser`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
//get alert detail with lazy loading
async function GetInboxAlertDetails(req, res) {
  try {
    const pool = await poolPromise;

    if (
      req.body.alert_option_id === 1 ||
      req.body.alert_option_id === 3 ||
      req.body.alert_option_id === 19 ||
      req.body.alert_option_id === 14
    ) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aNewsAlert');

      let array1 = result.recordset;

      array1.filter((x) => {
        x['element_type_id'] = req.body.element_type_id;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'News';
        x['info'] = x.news_headline;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (
      req.body.element_type_id === 21 &&
      req.body.alert_option_id === 2
    ) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aNSAlert');
      let array1 = result.recordset;

      array1.filter((x) => {
        x['element_type_id'] = req.body.element_type_id;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Filing';
        x['info'] =
          x.Company_name !== undefined ? x.Company_name : x.investor_name;
      });

      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (
      req.body.element_type_id === 22 &&
      req.body.alert_option_id === 2
    ) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aOFilingAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] = req.body.element_type_id;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Filing';
        x['info'] =
          x.Company_name !== undefined ? x.Company_name : x.investor_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (
      req.body.element_type_id === 23 &&
      req.body.alert_option_id === 2
    ) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aSFilingAlert');
      let array1 = result.recordset;
      if (array1.length > 0) {
        array1.filter((x) => {
          x['element_type_id'] = req.body.element_type_id;
          x['alert_option_id'] = req.body.alert_option_id;
          x['alert_read'] = req.body.alert_read;
          x['type'] = 'Filing';
          x['info'] =
            x.Company_name !== undefined ? x.Company_name : x.investor_name;
        });
      }
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 4) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aShortAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] = req.body.element_type_id;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Short Alert';
        x['info'] = x.Company_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 15) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aFailedMgmtAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 151;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Failed Management Proposals';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 16) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aShareholderSpptAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 161;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Shareholder Proposals with Significant Support';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 17) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aAgainstMgmtAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 171;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Against Management Votes';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 5) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aPersonnelAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 51;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Personnel Changes';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 6) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aCharterAmendAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 61;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Charter Amendment';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 11) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aInvestorPolicyAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 111;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Investor Policy Changes';
        x['info'] = x.investor_profile_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 12) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aNoActionAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 121;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'No Action (US)';
        x['info'] = x.Company_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 13) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3a8kAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 131;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = '8-K Item 5.07 Meeting Result';
        x['info'] = x.Company_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    } else if (req.body.alert_option_id === 18) {
      var resultData = [];
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aRightsAgreementAlert');
      let array1 = result.recordset;
      array1.filter((x) => {
        x['element_type_id'] =
          req.body.element_type_id !== null ? req.body.element_type_id : 181;
        x['alert_option_id'] = req.body.alert_option_id;
        x['alert_read'] = req.body.alert_read;
        x['type'] = 'Rights Agreements';
        x['info'] = x.alert_name;
      });
      resultData = [...resultData, ...array1];
      res.json({
        data: resultData
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetInboxAlertDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function UpdateAlertStatus(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
      .execute('UpdateAlertStatus');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/UpdateAlertStatus`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function deleteAlert(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('alert_id', sql.Int, req.body.alert_id)
      .execute('alertDelete');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/deleteAlert`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetElementDetails(req, res) {
  try {
    if (req.body.element_type_id === 151 || req.body.element_type_id === 152) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aFailedMgmtDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (
      req.body.element_type_id === 162 ||
      req.body.element_type_id === 161
    ) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aShareholderSpptDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (
      req.body.element_type_id === 171 ||
      req.body.element_type_id === 172 ||
      req.body.element_type_id === 173
    ) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aAgainstMgmtDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (req.body.element_type_id === 121) {
      //pivot table
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aNoActionDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: true,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (
      req.body.element_type_id === 21 ||
      req.body.element_type_id === 23 ||
      req.body.element_type_id === 23
    ) {
      //pivot table
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aFilingDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: true,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (req.body.element_type_id === 111) {
      //pivot table
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aInvestorPolicyDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: true,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (
      req.body.element_type_id === 11 ||
      req.body.element_type_id === 31 ||
      req.body.element_type_id === 191 ||
      req.body.element_type_id === 141
    ) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('user_id', sql.Int, req.body.user_id)
        .input('news_id', sql.Int, req.body.alert_data['news_id'])
        .execute('GetNewsDetails');
      if (result.recordset.length > 0) {
        let textShortArticle = '';
        const article = result.recordset[0].news_article
          .replace('[[B]].', '.')
          .replace('[[B]]', '')
          .replace(/HREF/g, 'target="_blank" HREF')
          .replace(/href/g, 'target="_blank" href')
          .split(/\r\n|\n|\r/gm);

        if (article.length > 0) {
          const articleDesc = result.recordset[0].news_article;
          if (articleDesc.includes('[[B]]')) {
            textShortArticle = articleDesc.split('[[B]]')[0];
          } else {
            textShortArticle = articleDesc.split(/\.|\?|\!/gm)[0];
          }

          if (textShortArticle.length > 300) {
            textShortArticle = `${textShortArticle.substring(0, 300)}...`;
          } else {
            textShortArticle = `${textShortArticle}.`;
          }
        }

        // e.news_article.substring(1, 300)
        const myJsonArry = {
          newsid: result.recordset[0].news_id,
          img: result.recordset[0].image_filename,
          newsDate: general.dateToNull(
            result.recordset[0].news_date,
            'dS mmmm yyyy'
          ),
          headLine: result.recordset[0].news_headline,
          article: article.join('</br>'),
          shortArticle: textShortArticle
            .replace(/HREF/g, 'target="_blank" HREF')
            .replace(/href/g, 'target="_blank" href'),
          visited: result.recordset[0].viewed,
          readOnly: false,
          activism_type: result.recordset[0].activism_type,
          module: result.recordset[0].module,
          categories: result.recordset[0].categories
        };
        res.json({
          data: [myJsonArry],
          pivotTable: false,
          element_type_id: req.body.element_type_id,
          alert_data: req.body.alert_data
        });
      } else {
        res.json({
          data: [],
          pivotTable: false,
          element_type_id: req.body.element_type_id,
          alert_data: req.body.alert_data
        });
      }
    } else if (req.body.element_type_id === 51) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aPersonnelDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (req.body.element_type_id === 41) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aShortAlertDetails');
      res.json({
        data: result.recordset,
        pivotTable: true,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (
      req.body.element_type_id === 61 ||
      req.body.element_type_id === 62
    ) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aCharterAmendDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (req.body.element_type_id === 131) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3a8kDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: true,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    } else if (req.body.element_type_id === 181) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('alert_inbox_id', sql.Int, req.body.alert_inbox_id)
        .execute('Getv3aRightsAgreementDetailsAlert');
      res.json({
        data: result.recordset,
        pivotTable: false,
        element_type_id: req.body.element_type_id,
        alert_data: req.body.alert_data
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetElementDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetAlertNotificationData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .execute('GetInboxAlertNotificationData');

    let elementIds = result.recordset;
    var resultData = [];

    for (const item of elementIds) {
      //news data
      if (
        item.alert_option_id === 1 ||
        item.alert_option_id === 3 ||
        item.alert_option_id === 19 ||
        item.alert_option_id === 14
      ) {
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aNewsAlert');

        let array1 = result.recordset;

        array1.filter((x) => {
          x['element_type_id'] = item.element_type_id;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'News';
          x['info'] = x.news_headline;
        });
        resultData = [...resultData, ...array1];
      } else if (item.element_type_id === 21 && item.alert_option_id === 2) {
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aNSAlert');
        let array1 = result.recordset;

        array1.filter((x) => {
          x['element_type_id'] = item.element_type_id;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Filing';
          x['info'] =
            x.Company_name !== undefined ? x.Company_name : x.investor_name;
        });

        resultData = [...resultData, ...array1];
      } else if (item.element_type_id === 22 && item.alert_option_id === 2) {
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aOFilingAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] = item.element_type_id;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Filing';
          x['info'] =
            x.Company_name !== undefined ? x.Company_name : x.investor_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.element_type_id === 23 && item.alert_option_id === 2) {
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aSFilingAlert');
        let array1 = result.recordset;
        if (array1.length > 0) {
          array1.filter((x) => {
            x['element_type_id'] = item.element_type_id;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Filing';
            x['info'] =
              x.Company_name !== undefined ? x.Company_name : x.investor_name;
          });
        }
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 4) {
        //Short Seller
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aShortAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] = item.element_type_id;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Short Alert';
          x['info'] = x.Company_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 15) {
        //Failed Management Proposals
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aFailedMgmtAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 151;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Failed Management Proposals';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 16) {
        //Shareholder Proposals with Significant Support
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aShareholderSpptAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 161;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Shareholder Proposals with Significant Support';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 17) {
        //Against Management Votes
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aAgainstMgmtAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 171;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Against Management Votes';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 5) {
        //Personnel Changes
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aPersonnelAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 51;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Personnel Changes';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 6) {
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aCharterAmendAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 61;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Charter Amendment';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 11) {
        //Investor Policy Changes
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aInvestorPolicyAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 111;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Investor Policy Changes';
          x['info'] = x.investor_profile_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 12) {
        //No Action (US)
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aNoActionAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 121;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'No Action (US)';
          x['info'] = x.Company_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 13) {
        //8-K Item 5.07 Meeting Result
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3a8kAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 131;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = '8-K Item 5.07 Meeting Result';
          x['info'] = x.Company_name;
        });
        resultData = [...resultData, ...array1];
      } else if (item.alert_option_id === 18) {
        //Rights Agreements
        const result = await pool
          .request()
          .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
          .execute('Getv3aRightsAgreementAlert');
        let array1 = result.recordset;
        array1.filter((x) => {
          x['element_type_id'] =
            item.element_type_id !== null ? item.element_type_id : 181;
          x['alert_option_id'] = item.alert_option_id;
          x['alert_read'] = item.alert_read;
          x['type'] = 'Rights Agreements';
          x['info'] = x.alert_name;
        });
        resultData = [...resultData, ...array1];
      }
    }
    res.json(resultData);
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetAlertNotificationData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetTop20AlertResult(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .execute('GetInsightiaNotification');

    let elementIds = result.recordset;
    var resultData = [];
    let notificationData = [];

    for (const item of elementIds) {
      if (item.notification_type === 1) {
        //news data
        if (
          item.alert_option_id === 1 ||
          item.alert_option_id === 3 ||
          item.alert_option_id === 19 ||
          item.alert_option_id === 14
        ) {
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aNewsAlert');

          let array1 = result.recordset;

          array1.filter((x) => {
            x['element_type_id'] = item.element_type_id;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'News';
            x['info'] = x.news_headline;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.element_type_id === 21 && item.alert_option_id === 2) {
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aNSAlert');
          let array1 = result.recordset;

          array1.filter((x) => {
            x['element_type_id'] = item.element_type_id;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Filing';
            x['info'] =
              x.Company_name !== undefined ? x.Company_name : x.investor_name;
            x['notification_type'] = 1;
          });

          resultData = [...resultData, ...array1];
        } else if (item.element_type_id === 22 && item.alert_option_id === 2) {
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aOFilingAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] = item.element_type_id;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Filing';
            x['info'] =
              x.Company_name !== undefined ? x.Company_name : x.investor_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.element_type_id === 23 && item.alert_option_id === 2) {
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aSFilingAlert');
          let array1 = result.recordset;
          if (array1.length > 0) {
            array1.filter((x) => {
              x['element_type_id'] = item.element_type_id;
              x['alert_option_id'] = item.alert_option_id;
              x['alert_read'] = item.alert_read;
              x['type'] = 'Filing';
              x['info'] =
                x.Company_name !== undefined ? x.Company_name : x.investor_name;
              x['notification_type'] = 1;
            });
          }
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 4) {
          //Short Seller
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aShortAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] = item.element_type_id;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Short Alert';
            x['info'] = x.Company_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 15) {
          //Failed Management Proposals
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aFailedMgmtAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 151;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Failed Management Proposals';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 16) {
          //Shareholder Proposals with Significant Support
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aShareholderSpptAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 161;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Shareholder Proposals with Significant Support';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 17) {
          //Against Management Votes
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aAgainstMgmtAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 171;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Against Management Votes';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 5) {
          //Personnel Changes
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aPersonnelAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 51;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Personnel Changes';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 6) {
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aCharterAmendAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 61;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Charter Amendment';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 11) {
          //Investor Policy Changes
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aInvestorPolicyAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 111;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Investor Policy Changes';
            x['info'] = x.investor_profile_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 12) {
          //No Action (US)
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aNoActionAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 121;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'No Action (US)';
            x['info'] = x.Company_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 13) {
          //8-K Item 5.07 Meeting Result
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3a8kAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 131;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = '8-K Item 5.07 Meeting Result';
            x['info'] = x.Company_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        } else if (item.alert_option_id === 18) {
          //Rights Agreements
          const result = await pool
            .request()
            .input('alert_inbox_id', sql.Int, item.alert_inbox_id)
            .execute('Getv3aRightsAgreementAlert');
          let array1 = result.recordset;
          array1.filter((x) => {
            x['element_type_id'] =
              item.element_type_id !== null ? item.element_type_id : 181;
            x['alert_option_id'] = item.alert_option_id;
            x['alert_read'] = item.alert_read;
            x['type'] = 'Rights Agreements';
            x['info'] = x.alert_name;
            x['notification_type'] = 1;
          });
          resultData = [...resultData, ...array1];
        }
      } else {
        resultData = [...resultData, item];
      }
    }
    if (resultData.length > 0) {
      resultData.map((x) => {
        if (x.notification_type === 1 && x.alert_read === 0) {
          if (notificationData.length <= 4) {
            notificationData.push(x);
          }
        }
      });
    }

    res.json({ data: resultData, popupData: notificationData });
  } catch (error) {
    general.ErrorLog(
      `${alertInboxRoutes}/GetTop20AlertResult`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
module.exports = router;
