const express = require('express');
const { PowerSearchService } = require('../services/powerSearchService');
const { sql, poolPromise } = require('../config/db');

const powerSearch = new PowerSearchService();

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const powersearchRoutes = 'powerSearch-Route';

const GetSearchResult = (req, res) => {
  try {
    powerSearch.getData(req.body, (rows, lastRow) => {
      res.json({ rows, lastRow });
    });
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/GetSearchResult`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const createPowerSearchFilter = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_defn', sql.VarChar, req.body.filter_defn)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, 1)
      .input('permission', sql.Int, 1)
      .execute('pPowerSearch_Filter_Create');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/createPowerSearchFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const updatePowerSearchFilter = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_defn', sql.VarChar, req.body.filter_defn)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, 1)
      .input('permission', sql.Int, 1)
      .execute('pPowerSearch_Filter_Update');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/updatePowerSearchFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const getPowerSearchFilter = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('pPowerSearch_Filter_Get');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/getPowerSearchFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const listPowerSearchFilter = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .execute('pPowerSearch_Filter_List ');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/listPowerSearchFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const deletePowerSearchFilter = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('pPowerSearch_Filter_Delete');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/deletePowerSearchFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const createPowerSearchFilterVuln = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_defn', sql.VarChar, req.body.filter_defn)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, 1)
      .input('permission', sql.Int, 1)
      .execute('pVulnAdvSearch_Filter_Create');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/createPowerSearchFilterVuln`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const updatePowerSearchFilterVuln = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('filter_name', sql.VarChar, req.body.filter_name)
      .input('filter_defn', sql.VarChar, req.body.filter_defn)
      .input('user_id', sql.Int, req.body.user_id)
      .input('privacy', sql.Int, 1)
      .input('permission', sql.Int, 1)
      .execute('pVulnAdvSearch_Filter_Update');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/updatePowerSearchFilterVuln`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const listPowerSearchFilterVuln = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .execute('pVulnAdvSearch_Filter_List ');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/listPowerSearchFilterVuln`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

const deletePowerSearchFilterVuln = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('filter_id', sql.Int, req.body.filter_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('pVulnAdvSearch_Filter_Delete');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${powersearchRoutes}/deletePowerSearchFilterVuln`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
};

router.post('/powersearch', authenticateToken, GetSearchResult);

router.post('/filter/get', authenticateToken, getPowerSearchFilter);
router.post('/filter/create', authenticateToken, createPowerSearchFilter);
router.post('/filter/list', authenticateToken, listPowerSearchFilter);
router.post('/filter/update', authenticateToken, updatePowerSearchFilter);
router.post('/filter/delete', authenticateToken, deletePowerSearchFilter);
router.post(
  '/filter/createVuln',
  authenticateToken,
  createPowerSearchFilterVuln
);
router.post('/filter/listVuln', authenticateToken, listPowerSearchFilterVuln);
router.post(
  '/filter/updateVuln',
  authenticateToken,
  updatePowerSearchFilterVuln
);
router.post(
  '/filter/deleteVuln',
  authenticateToken,
  deletePowerSearchFilterVuln
);

module.exports = router;
