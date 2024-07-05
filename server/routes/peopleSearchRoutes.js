const express = require('express');
const { sql, poolPromise } = require('../config/db');
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const peopleRoutes = 'peopleSearchRoute';

const router = express.Router();
const GanttChartSampleData = require('../config/SampleData/D3GanttChartSampleData.json');
const { componentsToColor } = require('pdf-lib');

router.post('/search', authenticateToken, GetPeopleSearch);
router.post('/getPeopleProfile', authenticateToken, GetPeopleProfile);
router.post('/getDirectorPersonInfo', authenticateToken, GetDirectorPersonInfo);
router.post(
  '/getDirectorAppointmentInfo',
  authenticateToken,
  GetDirectorAppointmentInfo
);
router.post(
  '/getDirectorAppointmentInfo2',
  authenticateToken,
  GetDirectorAppointmentInfo2
);
router.post('/getDirectorsDetails', authenticateToken, GetDirectorsDetails);
router.post(
  '/GetDirectorContactData',
  authenticateToken,
  GetDirectorContactData
);
router.post(
  '/GetDirectorOnBoardData',
  authenticateToken,
  GetDirectorOnBoardData
);
router.post(
  '/GetGanttChartSampleData',
  authenticateToken,
  GetGanttChartSampleData
);
router.post('/GetPeopleOverview', authenticateToken, GetPeopleOverview);
async function GetPeopleSearch(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.VarChar, req.body.nameSearch)
      .input('quicksearch', sql.Int, req.body.quicksearch)
      .execute('GetPeopleSearchData');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetPeopleSearch`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPeopleProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('GetPeopleDataByID');
    if (result.recordset.length > 0) {
      return res.json({
        data: result.recordset[0],
        people_name: result.recordset[0].name,
      });
    }
    res.json({ data: result.recordset, people_name: [] });
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetPeopleProfile`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorPersonInfo(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('getDirectorPersonInfo');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorPersonInfo`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorAppointmentInfo(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .input('current', sql.Bit, 1)
      .execute('getDirectorAppointmentInfo_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorAppointmentInfo`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorAppointmentInfo2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .input('current', sql.Bit, 0)
      .execute('getDirectorAppointmentInfo_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorAppointmentInfo2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetDirectorsDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('Get_current_dir_appointments_Details');
    const current_directors = [];
    result.recordset.forEach((item) => {
      if (item.appointment_type !== 'Executive') {
        current_directors.push({
          company_name: item.CmpName,
          pid: item.PID,
          role: item.appointment_type,
          start_date: item.Director_since,
          end_date: item.director_end_date,
          tenure: `${item.Director_since !== null ? item.Director_since.getFullYear() : ''}${item.Director_since && item.director_end_date ? '-' : ''}${item.director_end_date ? item.director_end_date.getFullYear() : 'Present'}`,
        });
      } else {
        current_directors.push({
          company_name: item.CmpName,
          pid: item.PID,
          role: item.Position,
          start_date: item.Director_since,
          end_date: item.director_end_date,
          tenure: `${item.Director_since !== null ? item.Director_since.getFullYear() : ''}${item.Director_since && item.director_end_date ? '-' : ''}${item.director_end_date ? item.director_end_date.getFullYear() : 'Present'}`,
        });
      }
    });

    const result_past_director = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('Get_past_dir_appointments_Details');

    const past_directors = [];
    result_past_director.recordset.forEach((item) => {
      if (item.appointment_type !== 'Executive') {
        past_directors.push({
          company_name: item.CmpName,
          pid: item.PID,
          role: item.appointment_type,
          start_date: item.Director_since,
          end_date: item.director_end_date,
          tenure: `${item.Director_since !== null ? item.Director_since.getFullYear() : ''}${item.Director_since && item.director_end_date ? '-' : ''}${item.director_end_date ? item.director_end_date.getFullYear() : ''}`,
        });
      } else {
        past_directors.push({
          company_name: item.CmpName,
          pid: item.PID,
          role: item.Position,
          start_date: item.Director_since,
          end_date: item.director_end_date,
          tenure: `${item.Director_since !== null ? item.Director_since.getFullYear() : ''}${item.Director_since && item.director_end_date ? '-' : ''}${item.director_end_date ? item.director_end_date.getFullYear() : ''}`,
        });
      }
    });
    res.json({
      current_director: current_directors,
      past_director: past_directors
    });
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorsDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorContactData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('GetDirectorContactdetail');

    if (result.recordset.length > 0) {
      const company_id = result.recordset[0].company_id;
      const active = result.recordset[0].active;
      const result_activist_detail = await pool
        .request()
        .input('company_id', sql.Int, company_id)
        .execute('AdmGetCompanyProfile');
      res.json({ data: result_activist_detail.recordset, active: active });
    } else {
      res.json({ data: [], active: null });
    }
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorContactData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetDirectorOnBoardData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('GetDirectorOnBoardActivistData');
    const tblLastdata = [];
    if (result.recordset.length > 0) {
      result.recordset.forEach((item) => {
        if (item.nums !== 0) {
          tblLastdata.push(item);
        }
      });
    }
    res.json(tblLastdata);
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetDirectorOnBoardData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetGanttChartSampleData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.Int, req.body.director_id)
      .execute('GetDirectorGanttChartData');
    const ganttChartCurrentData = [];
    result.recordset.forEach((item) => {
      ganttChartCurrentData.push({
        task: item.Position,
        type: item.Company_name,
        startTime: general.dateToNull(item.Director_since, 'yyyy-m-d', true),
        endTime: item.Director_end_date !== null ? general.dateToNull(item.Director_end_date, 'yyyy-m-d', true) : general.dateToNull(new Date(), 'yyyy-m-d', true),
        details: '',
      });
    });
    res.json({ data: ganttChartCurrentData });
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetGanttChartSampleData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetPeopleOverview(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('director_id', sql.VarChar, req.body.director_id)
      .execute('WebPeopleC_Get_Overview');
    res.json(result.recordsets);
  } catch (error) {
    general.ErrorLog(
      `${peopleRoutes}/GetPeopleOverview`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
module.exports = router;
