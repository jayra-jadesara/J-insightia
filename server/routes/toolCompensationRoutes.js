const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolCompensations';

router.post('/GetCompensationComparatorData', authenticateToken, GetCompensationComparatorData);
router.post('/GetDirectorTypes', authenticateToken, GetDirectorTypes);
router.post('/GetAllPeopleList', authenticateToken, GetAllPeopleList);
router.post('/GetPeerGroupData', authenticateToken, GetPeerGroupData);

async function GetCompensationComparatorData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_search_id', sql.Int, req.body.companySearchId)
      .input('director_id', sql.VarChar, req.body.director_id)
      .input('role', sql.VarChar, req.body.role)
      .input('tenure', sql.VarChar, req.body.tenure)
      .input('committee', sql.VarChar, req.body.committee)
      .input('DateFrom', sql.VarChar, req.body.DateFrom)
      .input('DateTo', sql.VarChar, req.body.DateTo)
      .input('Compensation_Type', sql.VarChar, req.body.CompensationType)
      .execute('WebToolsC_CompensationComparator');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetCompensationComparatorData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetDirectorTypes(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('GetDirectorType');
      const data = result.recordset;
      const yeardata = [];
      data.filter((item) => {
        yeardata.push({
          label: item.director_type,
          value: item.director_typeno_id
        });
      });
    res.json(yeardata);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetDirectorTypes`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetAllPeopleList(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.VarChar, req.body.text)
      .execute('WebToolsC_CompensationComparator_Get_IndividualFilter');
      const data = result.recordset;
      const mainData = [];
      data.filter((item) => {
        mainData.push({
          label: item.director_name,
          value: item.Director_id
        });
      });
    res.json({data: mainData});
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetAllPeopleList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetPeerGroupData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.VarChar, req.body.pid)
      .execute('WebToolsC_CompensationComparator_Get_PeerGroupFilter');
      const data = result.recordset;
      const mainData = [];
      data.filter((item) => {
        mainData.push({
          label: item.name,
          value: item.id,
          type: item.type
        });
      });
    res.json(mainData);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetPeerGroupData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
