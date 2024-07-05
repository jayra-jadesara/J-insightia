const { sql, poolPromise } = require('../config/db');
const { json } = require('body-parser');
const express = require('express');

const router = express.Router();
const dateFormat = require('dateformat');
// const { dateToNull } = require('../../src/utils/general-util');
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const newsRoute = 'newsRouter';

router.post('/GetNewsDetails', authenticateToken, GetNewsDetails);
router.post('/AddNewsVisitorLog', authenticateToken, AddNewsVisitorLog);
router.post('/GetLatestNewsFiltered', authenticateToken, GetLatestNewsFiltered);
router.post('/ListnewswithTag', authenticateToken, ListnewswithTag);
router.post('/ListForViewNewsTimelineTop5', authenticateToken, ListForViewNewsTimelineTop5);
router.post('/DummyActivismTimeline', authenticateToken, DummyActivismTimeline);
router.post('/GetNewsMoreInformationLinks', authenticateToken, GetNewsMoreInformationLinks);
router.post('/GetCompanyNewsIds', authenticateToken, GetCompanyNewsIds);
router.post('/GetInvestorNewsIds', authenticateToken, GetInvestorNewsIds);
router.post('/GetMostReadNews', authenticateToken, GetMostReadNews);
router.post('/GetLatestReadNews', authenticateToken, GetLatestReadNews);
router.post('/GetAllProductLatestNews', authenticateToken, GetAllProductLatestNews);
router.post('/GetNewsEvents', authenticateToken, GetNewsEvents);
router.post('/GetStakeholding', authenticateToken, GetStakeholding);
router.post('/GetActivistObjective', authenticateToken, GetActivistObjective);
router.post('/NewsFilter', authenticateToken, NewsFilter);
router.post('/GetNewsNextPrevious', authenticateToken, GetNewsNextPrevious);
router.post('/GetProductMemberships', authenticateToken, GetProductMemberships);

async function NewsFilter(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.CompanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('activist_objective_group_id', sql.VarChar, req.body.ActivistObjectiveGroupId)
      .input('activist_objective_type_id', sql.VarChar, req.body.ActivistObjectiveTypeId)
      .input('stakeholding', sql.VarChar, req.body.Stakeholding)
      .input('event', sql.VarChar, req.body.Event)
      .input('freesearch', sql.VarChar, req.body.Freesearch)
      .input('period_start', sql.VarChar, req.body.periodStart)
      .input('period_end', sql.VarChar, req.body.periodEnd)
      .input('user_id', sql.Int, req.body.user_id)
      .input('product_id', sql.VarChar, req.body.product_id)
      .execute('NewsFilter');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/NewsFilter`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function AddNewsVisitorLog(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('userid', sql.Int, req.body.userid)
      .input('page', sql.VarChar, req.body.page)
      .input('mode', sql.VarChar, req.body.mode)
      .input('newsid', sql.Int, req.body.newsid)
      .execute('AddNewsVisitorLog');
    res.json(result.returnValue);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/AddNewsVisitorLog`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetLatestNewsFiltered(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('user_id', sql.Int, req.body.userid)
    .execute('GetLatestNewsFiltered');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetLatestNewsFiltered`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetNewsEvents(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activism_category_id', sql.Int, req.body.ActivismCategoryId)
      .input('LongShort', sql.NVarChar, req.body.LongShort)
      .input('admin', sql.Int, req.body.Admin)
      .execute('AdmListActivismTypesInCategoryAiO');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'activism_type_id', 'value');
      general.RenameKey(obj, 'activism_type', 'label');
    });
    res.json(arr);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetNewsEvents`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetStakeholding(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activism_category_id', sql.Int, req.body.ActivismCategoryId)
      .input('admin', sql.Int, req.body.Admin)
      .execute('AdmListActivismTypesInCategory');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'activism_type_id', 'value');
      general.RenameKey(obj, 'activism_type', 'label');
    });
    res.json(arr);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetStakeholding`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function ListnewswithTag(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('tag', sql.VarChar, req.body.tag).execute('ListnewswithTag');

    const myJson = [];
    result.recordset.forEach((e) => {
      let textShortArticle = '';
      const article = e.news_article
        .replace('[[B]].', '.')
        .replace(/HREF/g, 'target="_blank" HREF')
        .replace(/href/g, 'target="_blank" href')
        .split(/\r\n|\n|\r/gm);

      if (article.length > 0) {
        textShortArticle = article[0].substring(0, 300);
      }

      // e.news_article.substring(1, 300)

      myJson.push({
        ...e,
        newsid: e.news_id,
        img: e.image_filename,
        newsDate: general.dateToNull(e.news_date, 'dS mmmm yyyy'),
        headLine: e.news_headline,
        article: article.join('</br>'),
        shortArticle: textShortArticle
          .replace(/HREF/g, 'target="_blank" HREF')
          .replace(/href/g, 'target="_blank" href'),
        visited: false,
        readOnly: false,
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/ListnewswithTag`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function ListForViewNewsTimelineTop5(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('news_id', sql.VarChar, req.body.newsid)
      .execute('ListForViewNewsTimelineTop5');
    const myJson = [];
    result.recordset.forEach((e) => {
      myJson.push({
        ...e,
        summary_date: general.dateToNull(e.summary_date, 'dd-mmm-yyyy'),
      });
    });
    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${newsRoute}/ListForViewNewsTimelineTop5`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function DummyActivismTimeline(req, res, next) {
  try {
    const ActivismTimelines_data = require('../config/SampleData/ActivismTimelines_data.json');
    res.json(ActivismTimelines_data);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/DummyActivismTimeline`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetNewsMoreInformationLinks(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('news_id', sql.VarChar, req.body.newsid)
      .execute('GetNewsMoreInformationLinks');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${newsRoute}/GetNewsMoreInformationLinks`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetMostReadNews(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.VarChar, req.body.userid).execute('GetMostReadNews');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetMostReadNews`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetLatestReadNews(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('userid', sql.VarChar, req.body.userid).execute('GetLatestReadNews');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetLatestReadNews`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAllProductLatestNews(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('product_id', sql.VarChar, req.body.ProductId)
      .input('company_search_id', sql.VarChar, req.body.CompanySearchId)
      .input('investor_search_id', sql.VarChar, req.body.InvestorSearchId)
      .input('is_vulnerability_report', sql.VarChar, req.body.isVulnerabilityReport)
      .execute('GetAllProductLatestNews');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetAllProductLatestNews`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetCompanyNewsIds(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('pid', sql.VarChar, req.body.pid)
    .input('user_id', sql.Int, req.body.userid)
    .execute('GetCompanyNewsIds');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetCompanyNewsIds`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetInvestorNewsIds(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.VarChar, req.body.investorid)
      .input('user_id', sql.Int, req.body.userid)
      .execute('GetInvestorNewsIds');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetInvestorNewsIds`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetNewsDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('news_id', sql.VarChar, req.body.newsid)
      .input('user_id', sql.VarChar, req.body.userid)
      .execute('GetNewsFullDetails_insightia');
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

        // textShortArticle = article[0].substring(0, 300);
      }

      // e.news_article.substring(1, 300)
      const myJsonArry = {
        newsid: result.recordset[0].news_id,
        img: result.recordset[0].image_filename,
        newsDate: general.dateToNull(result.recordset[0].news_date, 'd mmmm yyyy'),
        headLine: result.recordset[0].news_headline,
        article: article.join('</br>'),
        shortArticle: textShortArticle
          .replace(/HREF/g, 'target="_blank" HREF')
          .replace(/href/g, 'target="_blank" href'),
        visited: result.recordset[0].viewed,
        readOnly: false,
        activism_type: result.recordset[0].activism_type,
        module: result.recordset[0].module,
        categories: result.recordset[0].categories,
      };
      res.json(myJsonArry);
    } else {
      res.json({});
    }
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetNewsDetails`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetActivistObjective(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activism_category_id', sql.Int, req.body.activismCategoryId)
      .execute('AdmListActivismTypesAndGroupsInCategory');
    const jsonActivistObjective = [];
    const unique = [...new Set(result.recordset.map((item) => item.activism_group_id))];
    unique.map((e) => {
      {
        let labeltext;
        let valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((res) => res.activism_group_id === e)
          .map((row) => {
            labeltext = row.activism_group_name;
            valuetext = row.activism_group_id;
            jsonChildren.push({ label: row.activism_type, value: row.activism_type_id, expanded: true });
          });
        jsonActivistObjective.push({
          label: labeltext,
          value: valuetext,
          children: jsonChildren,
          expanded: true,
        });
      }
    });

    res.json(jsonActivistObjective);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetActivistObjective`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetNewsNextPrevious(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('news_id', sql.VarChar, req.body.newsid)
      .input('user_id', sql.VarChar, req.body.userid)
      .execute('GetNewsNextPrevious_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetNewsNextPrevious`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetProductMemberships(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.VarChar, req.body.userid)
      .execute('GetProductMemberships');

    const jsonResult = [];
      result.recordset
        .filter((res) => res.product_id !== 2 && res.product_id !== 6)
        .map((row) => {
          jsonResult.push({
            label: row.module_name,
            value: row.product_id,
          });
        });
    res.json(jsonResult);
  } catch (error) {
    general.ErrorLog(`${newsRoute}/GetProductMemberships`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
