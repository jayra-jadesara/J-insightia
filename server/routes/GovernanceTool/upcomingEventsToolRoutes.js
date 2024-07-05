const express = require('express');
// const { json } = require("body-parser");
const { sql, poolPromise } = require('../../config/db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const toolsUpcomingEventRoutes = 'toolsUpcomingEventRoute';

router.post('/getAIGUpcomingMeetings', authenticateToken, GetAIGUpcomingMeetings);
router.post('/getUpcomingAppointmentsAndDepartures', authenticateToken, GetUpcomingAppointmentsAndDepartures);

async function GetAIGUpcomingMeetings(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('status', sql.Int, productStatus)
    .execute('GetAIG_UpcomingMeetings');

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsUpcomingEventRoutes}/GetAIGUpcomingMeetings`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetUpcomingAppointmentsAndDepartures(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('status', sql.Int, productStatus)
    .execute('Get_All_Upcoming_Appointments_and_Departures_insightia');

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsUpcomingEventRoutes}/GetUpcomingAppointmentsAndDepartures`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
