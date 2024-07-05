const { v4: uuidv4 } = require('uuid');
const { sql, poolPromise } = require('../config/db');
const { json } = require('body-parser');
const express = require('express');

const router = express.Router();
const { Char } = require('mssql');
const { authenticateToken, validatePassword, hashNewPassword } = require('../utill/authUtil');
const general = require('../utill/general');

const preferenceRoute = 'preferences-Route';

router.post('/GetCompanyPeerGroup', authenticateToken, GetCompanyPeerGroup);
router.post('/GetInvestorPeerGroup', authenticateToken, GetInvestorPeerGroup);
router.post('/GetPeerGroupsData', authenticateToken, GetPeerGroupsData);
router.post('/AddSelectionInvestorPeerGroup', authenticateToken, AddSelectionInvestorPeerGroup);
router.post('/AddSelectionCompanyPeerGroup', authenticateToken, AddSelectionCompanyPeerGroup);
router.post('/ValidateOldPasswordHash', authenticateToken, ValidateOldPasswordHash);
router.post('/HandleChangePassword', authenticateToken, HandleChangePassword);
router.post('/SavePreferencesV3', authenticateToken, SavePreferencesV3);
router.post('/GetPreferences', authenticateToken, GetPreferences);

async function GetPreferences(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('User_Id', sql.Int, req.body.user_id).execute('GetPreferences');
    res.json(result.recordset[0]);
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/GetPreferences`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function SavePreferencesV3(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('Email1MonthlyNewsLetter', sql.Bit, req.body.Email1MonthlyNewsLetter)
      .input('Email2EmailUpdates', sql.Bit, req.body.Email2EmailUpdates)
      .input('Email33rdParty', sql.Bit, req.body.Email33rdParty)
      .input('daily_newsletter', sql.Bit, req.body.daily_newsletter)
      .input('NAEmailUpdates', sql.Bit, req.body.NAEmailUpdates)
      .input('AAEmailUpdates', sql.Bit, req.body.AAEmailUpdates)
      .input('ais_weekly_newsletter', sql.Bit, req.body.ais_weekly_newsletter)
      .execute('SavePreferencesV3');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/SavePreferencesV3`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetCompanyPeerGroup(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.user_id).execute('GetCompanyPeerGroup');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/GetCompanyPeerGroup`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetInvestorPeerGroup(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.user_id).execute('GetInvestorPeerGroup');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/GetInvestorPeerGroup`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetPeerGroupsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.user_id).execute('GetPeerGroupsData');
    res.json({ company_peer_group: result.recordsets[0][0], investor_peer_group: result.recordsets[1][0] });
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/GetPeerGroupsData`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function AddSelectionCompanyPeerGroup(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('cmp_peergroup_id', sql.VarChar, req.body.cmp_peergroup_id)
      .execute('AddSelectionCompanyPeerGroup');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${preferenceRoute}/AddSelectionCompanyPeerGroup`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function AddSelectionInvestorPeerGroup(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('inv_peergroup_id', sql.VarChar, req.body.inv_peergroup_id)
      .execute('AddSelectionInvestorPeerGroup');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${preferenceRoute}/AddSelectionInvestorPeerGroup`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function HandleChangePassword(req, res, next) {
  try {
    const pool = await poolPromise;
    const password = await hashNewPassword(req.body.password);
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('password', sql.VarChar, password)
      .execute('ChangePassword_v2');
    res.json(result);
  } catch (error) {
    general.ErrorLog(`${preferenceRoute}/HandleChangePassword`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function ValidateOldPasswordHash(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.user_id).execute('getPHashUserId');

    const hash = result.recordset[0].pword;
    const password = req.body.txt_oldpassword;
    const isValidPassword = await validatePassword(password, hash);
    res.json(isValidPassword);
  } catch (error) {
    general.ErrorLog(
      `${preferenceRoute}/ValidateOldPasswordHash`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
