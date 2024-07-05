const express = require('express');
const { sql, poolPromise } = require('../config/db');
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const peopleCompesationRoutes = 'peopleCompesationRoutes';

const router = express.Router();

router.post('/GetIndividualGrantedPeopleCompensation', authenticateToken, GetIndividualGrantedPeopleCompensation);

function addYears(y, d) {
  const years = {};
  y.map((y) => {
    years[y] = d[y];
  });
  return years;
}

function compensation(data, years) {
  const arr = [];
  data.map((d) => {
      arr.push({
        mainHead: '',
        head: d.type,
        sub_head: d.elno === 1 ? null : d.element,
        Yr1: d.yr1,
        Yr3: d.yr3,
        Yr5: d.yr5,
        ...addYears(years, d),
      });
  });
  return arr;
}

function getJSON(pid, dir, data, years) {
  return {
    Company_name: data[0].Company_name,
    director_type: dir,
    compensation: [...compensation(data, years)],
  };
}

async function GetIndividualGrantedPeopleCompensation(req, res, next) {
  try {
    const pool = await poolPromise;
    // Individual Granted

    const resultInd = await pool
      .request()
      .input('director_id', sql.VarChar, req.body.director_id)
      .execute('WebPeopleC_Get_IndividualGranted');

    const resultRealised = await pool
      .request()
      .input('director_id', sql.VarChar, req.body.director_id)
      .execute('WebPeopleC_Get_IndividualRealised');

    const resultOutstanding = await pool
    .request()
    .input('director_id', sql.VarChar, req.body.director_id)
    .execute('WebPeopleC_Get_IndividualOutstanding');

    // exec results
    const recordAddType1Ind = resultInd.recordsets[0];
    // non exec results
    const recordAddType2Ind = resultInd.recordsets[1];
    const recordAddType1Rea = resultRealised.recordsets[0];
    const recordAddType1Out = resultOutstanding.recordsets[0];

    recordAddType1Ind && recordAddType1Ind.length > 0 &&
      recordAddType1Ind.map((i) => {
        i.type = 'Total Granted Compensation *';
      });
      recordAddType2Ind && recordAddType2Ind.length > 0 &&
      recordAddType2Ind.map((i) => {
        i.type = 'Total Granted Compensation *';
      });
      recordAddType1Rea && recordAddType1Rea.length > 0 &&
      recordAddType1Rea.map((i) => {
        i.type = 'Total Realised Compensation';
      });
      recordAddType1Out && recordAddType1Out.length > 0 &&
      recordAddType1Out.map((i) => {
        i.type = 'Total Outstanding Compensation';
      });

    const record1 = [...recordAddType1Ind, ...recordAddType1Rea, ...recordAddType1Out];
    const record2 = [...recordAddType2Ind];
    const result1 = [];
    const result2 = [];

    const uniquePID1 = record1 && [...new Set(record1.map((item) => item.PID))];
    const uniqueDir1 = record1 && [...new Set(record1.map((item) => item.director_type))];

    const uniquePID2 = record2 && [...new Set(record2.map((item) => item.PID))];
    const uniqueDir2 = record2 && [...new Set(record2.map((item) => item.director_type))];

    const objKeys1 = [];
    if (recordAddType1Ind[0] && recordAddType1Rea[0] && recordAddType1Out[0]) {
    const objKeys1 = [...Object.keys(recordAddType1Ind[0]), ...Object.keys(recordAddType1Rea[0]), ...Object.keys(recordAddType1Out[0])];
    }
    const AvailYears1 = objKeys1.filter((d) => !isNaN(Number(d)));

    let objKeys2 = [];
    if (recordAddType2Ind[0]) {
      objKeys2 = [...Object.keys(recordAddType2Ind[0])];
    }
    const AvailYears2 = objKeys2.filter((d) => !isNaN(Number(d)));

    uniquePID2 &&
      uniquePID2[0] !== null &&
      uniquePID2.length > 0 &&
      uniquePID2.map((pid) => {
        if (pid && pid !== null) {
          uniqueDir2 &&
            uniqueDir2.length > 0 &&
            uniqueDir2.map((dir) => {
              const filterArr2 = record2.filter((data) => data.PID === pid && data.director_type === dir);
              if (filterArr2.length > 0) {
                result2.push(getJSON(pid, dir, filterArr2, AvailYears1, AvailYears2));
              }
            });
        }
      });

    uniquePID1 &&
      uniquePID1[0] !== null &&
      uniquePID1.length > 0 &&
      uniquePID1.map((pid) => {
        if (pid && pid !== null) {
          uniqueDir1 &&
            uniqueDir1.length > 0 &&
            uniqueDir1.map((dir) => {
              const filterArr1 = record1.filter((data) => data.PID === pid && data.director_type === dir);
              if (filterArr1.length > 0) {
                result1.push(getJSON(pid, dir, filterArr1, AvailYears1));
              }
            });
        }
      });

    res.json({ result1: result1, result2: result2, AvailYears1: AvailYears1, AvailYears2: AvailYears2 });
  } catch (error) {
    general.ErrorLog(
      `${peopleCompesationRoutes}/GetIndividualGrantedPeopleCompensation`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
