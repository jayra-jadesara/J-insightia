const dateFormat = require('dateformat');
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const investorRoute = 'investorOwnershipRoute';

router.post(
  '/getLatestOwnershipDateList',
  authenticateToken,
  getLatestOwnershipDateList
);
router.post('/getInvestor_OwnershipLongInvestorData', authenticateToken, getInvestor_OwnershipLongInvestorData);
router.post(
  '/getInvestor_OwnershipLongFundData_Insightia',
  authenticateToken,
  getInvestor_OwnershipLongFundData_Insightia
);
router.post(
  '/getInvestor_OwnershipShortInvestorData_Insightia',
  authenticateToken,
  getInvestor_OwnershipShortInvestorData_Insightia
);
router.post(
  '/getInvestor_OwnershipShortFundData_Insightia',
  authenticateToken,
  getInvestor_OwnershipShortFundData_Insightia
);
router.post(
  '/getInvestorOwnershipLongShortDataCheck',
  authenticateToken,
  getInvestorOwnershipLongShortDataCheck
);

async function getLatestOwnershipDateList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PeriodOfReport', sql.Date, '2015-01-01')
      .execute('proxy_insight.dbo.getLatestOwnershipDateList');
    const arr = result.recordset;
    const myJson = [];

    myJson.push({ label: 'Latest Ownership', value: null });
    arr.forEach((obj) => {
      myJson.push({
        label:
          obj.period_of_report !== null && obj.period_of_report !== undefined
            ? `As at: ${dateFormat(obj.period_of_report, 'dd-mmm-yyyy', true)}`
            : '',
        value:
          obj.period_of_report !== null && obj.period_of_report !== undefined
            ? Number(dateFormat(obj.period_of_report, 'yyyymmdd', true))
            : '',
      });
    });

    res.json({ DateList: myJson });
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getLatestOwnershipDateList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestor_OwnershipLongInvestorData(req, res, next) {
  try {
    const { filterRecords } = req.body;

    let period_of_report = null;
    if (
      req.body.period_of_report === null ||
      req.body.period_of_report === undefined
    ) {
      period_of_report = null;
    } else {
      period_of_report = `${req.body.period_of_report
        .toString()
        .substr(0, 4)}-${req.body.period_of_report
        .toString()
        .substr(4, 2)}-${req.body.period_of_report.toString().substr(6, 2)}`;
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .input('period_of_report', sql.Date, period_of_report)
      .input('change_comparison', sql.Int, req.body.change_comparison)
      .execute(
        'proxy_insight.dbo.GetInvestor_OwnershipLongInvestorData_Insightia'
      );
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      company_name: 'Company',
      all_company_name: 'All Companies',
      top_20_company_name: 'Top 20 Companies',
      period_of_report: 'As at:',
      shares_value: "Value ($000's)",
      shares: 'Shares',
      shares_pcent: '%',
      change_in_holdings_shares: 'Shares',
      change_in_holdings_pcent: '%',
      voting_sole: 'Sole',
      voting_shared: 'Shared',
      voting_none: 'None',
    };
    if (arr.length > 0) {
      const totalArray = arr;
      if (filterRecords === null && arr.length >= 5) {
        statusTop5 = true;
        arr = arr.slice(0, 5); // TOP 5 & status = 2
      }
      if (filterRecords && arr.length >= 20) {
        arr = arr.slice(0, 20); // TOP 20
      }

      // Data
      arr.forEach((element) => general.validateNulltoEmptyString(element));
      arr.forEach((obj) => {
        myJson.push({
          pid: obj.pid,
          company_name: obj.company_name,
          period_of_report:
            obj.period_of_report !== ''
              ? dateFormat(obj.period_of_report, 'dd-mmm-yyyy', true)
              : '',
          shares_value: obj.value,
          shares: obj.shares,
          shares_pcent:
            obj.share_pcent !== '' && obj.share_pcent !== undefined
              ? Number(obj.share_pcent).toFixed(1)
              : '',
          change_in_holdings_shares: obj.shares_change,
          change_in_holdings_pcent:
            obj.shares_change_pcent !== ''
              ? Number(obj.shares_change_pcent).toFixed(1)
              : '',
          voting_sole: obj.voting_sole,
          voting_shared: obj.voting_shared,
          voting_none: obj.voting_none,
        });
      });
      const ttl_shares_value = totalArray
        .map((bill) =>
          bill.value === undefined || bill.value === '' ? 0 : Number(bill.value)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_shares = totalArray
        .map((bill) =>
          bill.shares === undefined || bill.shares === ''
            ? 0
            : Number(bill.shares)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_shares_pcent = totalArray
        .map((bill) =>
          bill.share_pcent === undefined || bill.share_pcent === ''
            ? 0
            : Number(bill.share_pcent)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_voting_sole = totalArray
        .map((bill) =>
          bill.voting_sole === undefined || bill.voting_sole === ''
            ? 0
            : Number(bill.voting_sole)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_voting_shared = totalArray
        .map((bill) =>
          bill.voting_shared === undefined || bill.voting_shared === ''
            ? 0
            : Number(bill.voting_shared)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_voting_none = totalArray
        .map((bill) =>
          bill.voting_none === undefined || bill.voting_none === ''
            ? 0
            : Number(bill.voting_none)
        )
        .reduce((acc, bill) => Number(bill) + acc);

      const myJsonTotal = [
        {
          pid: '',
          company_name: 'Total',
          type: '',
          period_of_report: '',
          shares_value: general.NumberFormatFn(ttl_shares_value),
          shares: general.NumberFormatFn(ttl_shares),
          shares_pcent: ttl_shares_pcent.toFixed(1),
          change_in_holdings_shares: '',
          change_in_holdings_pcent: '',
          voting_sole: general.NumberFormatFn(ttl_voting_sole),
          voting_shared: general.NumberFormatFn(ttl_voting_shared),
          voting_none: general.NumberFormatFn(ttl_voting_none),
        },
      ];

      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: myJsonTotal,
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getInvestor_OwnershipLongInvestorData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestor_OwnershipLongFundData_Insightia(req, res, next) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetInvestor_OwnershipLongFundData_Insightia');
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      company_name: 'Company',
      top_20_company_name_by_fund: 'Top 20 Companies by fund',
      all_company_name_by_fund: 'All Companies by fund',
      balance: 'Shares',
      valUSD: 'Value ($)',
      ReppdDate: 'Reported Date',
      seriesName: 'Series',
      regName: 'Registrant',
    };

    const totalArray = arr;
    if (filterRecords === null && arr.length >= 5) {
      statusTop5 = true;
      arr = arr.slice(0, 5); // TOP 5 & status = 2
    }
    if (filterRecords && arr.length >= 20) {
      arr = arr.slice(0, 20); // TOP 20
    }

    // Data
    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        seriesid: obj.seriesid,
        pid: obj.pid.toString().includes(',')
          ? obj.pid.toString().split(',')[0]
          : obj.pid,
        units: obj.units,
        company_name: obj.company_name.includes('/')
          ? obj.company_name.split('/')[0]
          : obj.company_name,
        regName: obj.regName,
        seriesName: obj.seriesName,
        balance: obj.balance,
        valUSD: obj.valUSD,
        ReppdDate:
          obj.ReppdDate !== ''
            ? dateFormat(obj.ReppdDate, 'dd-mmm-yy', true)
            : '',
      });
    });

    const ttl_balance =
      totalArray.length > 0 &&
      totalArray
        .map((bill) =>
          bill.balance === undefined || bill.balance === ''
            ? 0
            : Number(bill.balance)
        )
        .reduce((acc, bill) => Number(bill) + acc);
    const ttl_valUSD =
      totalArray.length > 0 &&
      totalArray
        .map((bill) =>
          bill.valUSD === undefined || bill.valUSD === ''
            ? 0
            : Number(bill.valUSD)
        )
        .reduce((acc, bill) => Number(bill) + acc);

    const myJsonTotal = [
      {
        seriesid: '',
        pid: '',
        units: '',
        company_name: 'Total',
        regName: '',
        seriesName: '',
        balance: general.NumberFormatFn(ttl_balance),
        valUSD: general.NumberFormatFn(ttl_valUSD),
        ReppdDate: '',
      },
    ];

    res.json({
      data: myJson,
      heading: myJsonHeading,
      dataFooter: myJsonTotal,
      statusTop5,
    });
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getInvestor_OwnershipLongFundData_Insightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestor_OwnershipShortInvestorData_Insightia(
  req,
  res,
  next
) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute(
        'proxy_insight.dbo.GetInvestor_OwnershipShortInvestorData_Insightia'
      );
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      company_name: 'Company',
      top_20_company_name: 'Top 20 Companies',
      all_company_name: 'All Companies',
      balance: 'Shares',
      valUSD: 'Value ($)',
      ReppdDate: 'Latest Reported Date',
    };
    const totalArray = arr;
    if (filterRecords === null && arr.length >= 5) {
      statusTop5 = true;
      arr = arr.slice(0, 5); // TOP 5 & status = 2
    }
    if (filterRecords && arr.length >= 20) {
      arr = arr.slice(0, 20); // TOP 20
    }

    // Data
    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        pid: obj.pid.toString().includes(',') ? obj.pid.split(',')[0] : obj.pid,
        company_name: obj.company_name.includes('/')
          ? obj.company_name.split('/')[0]
          : obj.company_name,
        balance: obj.total_balance,
        valUSD: obj.total_valusd,
        ReppdDate:
          obj.latest_reppddate !== ''
            ? dateFormat(obj.latest_reppddate, 'dd-mmm-yy', true)
            : '',
      });
    });
    let ttl_balance = [];
    let ttl_valUSD = [];
    if (totalArray.length > 0) {
      ttl_balance = totalArray
        .map((bill) =>
          bill.total_balance === undefined || bill.total_balance === ''
            ? 0
            : Number(bill.total_balance)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      ttl_valUSD = totalArray
        .map((bill) =>
          bill.total_valusd === undefined || bill.total_valusd === ''
            ? 0
            : Number(bill.total_valusd)
        )
        .reduce((acc, bill) => Number(bill) + acc);
    } else {
      ttl_balance = totalArray;
      ttl_valUSD = totalArray;
    }

    const myJsonTotal = [
      {
        pid: '',
        company_name: 'Total',
        balance: general.NumberFormatFn(ttl_balance),
        valUSD: general.NumberFormatFn(ttl_valUSD),
        ReppdDate: '',
      },
    ];

    res.json({
      data: myJson,
      heading: myJsonHeading,
      dataFooter: myJsonTotal,
      statusTop5,
    });
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getInvestor_OwnershipShortInvestorData_Insightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestor_OwnershipShortFundData_Insightia(req, res, next) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute(
        'proxy_insight.dbo.GetInvestor_OwnershipShortFundData_Insightia'
      );
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      company_name: 'Company',
      top_20_company_name_by_fund: 'Top 20 Companies by fund',
      all_company_name_by_fund: 'All Companies by fund',
      balance: 'Shares',
      valUSD: 'Value ($)',
      ReppdDate: 'Reported Date',
      seriesName: 'Series',
      regName: 'Registrant',
    };
    if (arr.length > 0) {
      const totalArray = arr;
      if (filterRecords === null && arr.length >= 5) {
        statusTop5 = true;
        arr = arr.slice(0, 5); // TOP 5 & status = 2
      }
      if (filterRecords && arr.length >= 20) {
        arr = arr.slice(0, 20); // TOP 20
      }

      // Data
      arr.forEach((element) => general.validateNulltoEmptyString(element));
      arr.forEach((obj) => {
        myJson.push({
          seriesid: obj.seriesid,
          pid: obj.pid,
          company_name: obj.company_name,
          balance: obj.balance,
          valUSD: obj.valUSD,
          ReppdDate:
            obj.ReppdDate !== ''
              ? dateFormat(obj.ReppdDate, 'dd-mmm-yy', true)
              : '',
          seriesName: obj.seriesName,
          regName: obj.regName,
        });
      });

      const ttl_balance = totalArray
        .map((bill) =>
          bill.balance === undefined || bill.balance === ''
            ? 0
            : Number(bill.balance)
        )
        .reduce((acc, bill) => Number(bill) + acc);
      const ttl_valUSD = totalArray
        .map((bill) =>
          bill.valUSD === undefined || bill.valUSD === ''
            ? 0
            : Number(bill.valUSD)
        )
        .reduce((acc, bill) => Number(bill) + acc);

      const myJsonTotal = [
        {
          pid: '',
          seriesid: '',
          company_name: 'Total',
          balance: general.NumberFormatFn(ttl_balance),
          valUSD: general.NumberFormatFn(ttl_valUSD),
          ReppdDate: '',
          seriesName: '',
          regName: '',
        },
      ];

      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: myJsonTotal,
        statusTop5,
      });
    } else {
      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: [],
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getInvestor_OwnershipShortFundData_Insightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestorOwnershipLongShortDataCheck(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute(
        'proxy_insight.dbo.GetInvestor_OwnershipLongShortInvestorDataCheck_Insightia'
      );
    res.json(result.recordset.length > 0 ? result.recordset[0] : undefined);
  } catch (error) {
    general.ErrorLog(
      `${investorRoute}/getInvestorOwnershipLongShortDataCheck`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;

// Make a route and function within the server/routes/____routes.js
// -Add the route to the frontends server-config.js as an export
// -Within company-utils.js  create an exported function to post the call
// -Within the ____Slice.js import the function and create an async thunk function to request the call and export it, also adding it to the extraReducers with a name for its value in state.
// -Within the page container import the request function, add it to the props deconstruction, call the function within the useEffect and add the exclusion, add the request to a mapDispatchtoProps.
// -Within the page container create a function
