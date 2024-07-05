const dateFormat = require('dateformat');
const { json } = require('body-parser');

const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const investorRoutes = 'investor-Route';

// investor
router.post(
  '/UserSearchFilter_Create',
  authenticateToken,
  UserSearchFilter_Create
);
router.post(
  '/UserSearchFilter_Update',
  authenticateToken,
  UserSearchFilter_Update
);
router.post(
  '/UserSearchFilter_Delete',
  authenticateToken,
  UserSearchFilter_Delete
);
router.post('/UserSearchFilter_Get', authenticateToken, UserSearchFilter_Get);

/// / INVESTOR

async function UserSearchFilter_Create(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_definition', sql.VarChar, req.body.filter_definition)
      .input('filter_type_id', sql.Int, req.body.filter_type_id)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, req.body.privacy)
      .input('permission', sql.Int, req.body.permission)
      .execute('activist_insight.dbo.WebComm_UserSearchFilter_Create');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/UserSearchFilter_Create`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function UserSearchFilter_Update(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_definition', sql.VarChar, req.body.filter_definition)
      .input('filter_type_id', sql.Int, req.body.filter_type_id)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, req.body.privacy)
      .input('permission', sql.Int, req.body.permission)
      .execute('activist_insight.dbo.WebComm_UserSearchFilter_Update');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/UserSearchFilter_Update`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function UserSearchFilter_Delete(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('activist_insight.dbo.WebComm_UserSearchFilter_Delete');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/UserSearchFilter_Delete`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function UserSearchFilter_Get(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_type_id', sql.Int, req.body.filter_type_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('activist_insight.dbo.WebComm_UserSearchFilter_Get');

    const ddllist = [];
    result.recordset.map((x) => {
      ddllist.push({ label: x.filter_name, value: x.filter_id });
    });
    res.json({ data: result.recordset, ddllist });
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/UserSearchFilter_Get`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
