const dateFormat = require('dateformat');
// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const general = require('../utill/general');

const magazinesReportRoute = 'magazinesReport';

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
// var general = require("../utill/general");

router.post('/getMagazinesReportList', authenticateToken, getMagazinesReportList);
router.post(
  '/GetMagazine_ProxyOrSpecialReports_insightia',
  authenticateToken,
  GetMagazine_ProxyOrSpecialReports_insightia
);
router.post('/SearchAiMMagazineText', authenticateToken, SearchAiMMagazineText);

async function getMagazinesReportList(req, res, next) {
  try {
    const Top3Mag = [];
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('product_id', sql.Int, req.body.product_id)
      .input('article_type_list', sql.VarChar, req.body.article_type_list)
      .execute('GetMagazineIssue_ProductType');
    result.recordset.forEach((element, i) => {
      if (i < 3) {
        Top3Mag.push(element);
      }
    });
    res.json({ data: result.recordset, top3Mag: Top3Mag });
  } catch (error) {
    general.ErrorLog(
      `${magazinesReportRoute}/getMagazinesReportList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetMagazine_ProxyOrSpecialReports_insightia(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Article_type_id', sql.Int, req.body.Article_type_id)
      .execute('GetMagazine_ProxyOrSpecialReports_insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${magazinesReportRoute}/GetMagazine_ProxyOrSpecialReports_insightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getSQLData(req) {
	const pool = await poolPromise;
	const result = await pool
		.request()
		.execute('GetMagazineIssue_ProductType');
	return result;
}

async function getPublicationsSearch(req) {
	const request = { size: '1000', _source: { includes: ['path.virtual'] }, query: { match: { content: req.body.search } } };

//API required for publications search requires an API key AND IP authentication. Request both for working on it
	const elasticapi = process.env.ELASTIC_PUBLICATIONS;

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `ApiKey ${elasticapi}`
		},
		data: request,
		json: true
	};

	const axios = require('axios');
	const searchResult = [];

	await axios('https://search.insightia.com/publications/_search', options)
		.then((response) => {
			for (let i = 0, n = response.data.hits.hits.length; i < n; i++) {
				if (response.data.hits.hits[i] !== undefined) {
					//remove first / from the response
					searchResult.push(response.data.hits.hits[i]._source.path.virtual.substring(1));
				}
			}
		});
	return searchResult;
}

async function SearchAiMMagazineText(req, res, next) {
	try {
		let searchResult = [];
		let result = [];

		await Promise.all([getPublicationsSearch(req), getSQLData(req)]).then((values) => {
			searchResult = Object.values(values[0]);
			result = values[1];
		});

		const z = [];
		for (let i = 0, n = result.recordset.length; i < n; i++) {
			if (searchResult.includes(result.recordset[i].URL)) {
				z.push(result.recordset[i]);
			}
		}
		res.json({ data: z });
	} catch (error) {
		general.ErrorLog(
			`${magazinesReportRoute}/SearchAiMMagazineText`,
			error,
			req.user.User_Id,
			req.body,
			req.headers.origin
		);
	}
}
module.exports = router;
