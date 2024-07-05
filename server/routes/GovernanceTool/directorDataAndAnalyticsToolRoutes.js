/* eslint-disable no-var */
const express = require('express');
const { sql, poolPromise } = require('../../config/db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const { ErrorLog } = require('../../utill/general');
const general = require('../../utill/general');

const directorDataAndAnalyticsTool = 'directorDataAndAnalyticsTool';

router.post('/getDirectorDataAndAnalyticsData', authenticateToken, getDirectorDataAndAnalyticsData);
router.post('/getDirectorAnalysisData', authenticateToken, getDirectorAnalysisData);
router.post('/getDDLEthnicityData', authenticateToken, getDDLEthnicityData);

module.exports = router;

async function getDDLEthnicityData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetDDLEthnicityData');
    const ddlAutoSelection = { label: 'All', value: -1 };
    res.json({ddlData: [ddlAutoSelection, { label: 'Not disclosed', value: 0 }, ...result.recordset], ddlAutoSelection: ddlAutoSelection});
  } catch (error) {
    ErrorLog(
      `${directorDataAndAnalyticsTool}/getDDLEthnicityData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getDirectorDataAndAnalyticsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('gender', sql.VarChar, req.body.gender)
      .input('age_from', sql.Int, req.body.ageFrom)
      .input('age_to', sql.Int, req.body.ageTo)
      .input('tenure_from', sql.Int, req.body.tenureFrom)
      .input('tenure_to', sql.Int, req.body.tenureTo)
      .input('board_from', sql.Int, req.body.boardFrom)
      .input('board_to', sql.Int, req.body.boardTo)
      .input('company_search_id', sql.Int, req.body.company_search_id)
      .input('status', sql.Int, productStatus)
      .input('ethnicity_ids', sql.VarChar, req.body.ethnicity_ids)
      .execute('GetDirectorAppointmentData');
    res.json(result.recordset);
  } catch (error) {
    ErrorLog(
      `${directorDataAndAnalyticsTool}/getDirectorDataAndAnalyticsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getDirectorAnalysisData(req, res, next) {
  try {
    let lstDirectorAppointmentAnalysisData0 = [];
    let lstGenderDiversityOfDirectorAppointment = [];
    let lstAvgDirectorAge = [];
    let lstAvgDirectorTenure = [];
    let lstCompaniesWithFemaleDirector = [];
    let lstSectorWithAvgFemaleDirector = [];
    let lstMktCapCategoryWithAvgFemaleDirector = [];
    let lstMktCapCategoryGenderDiversity = [];
    let lstNoOfBoardWithMaleAndFemale = [];
    //
    let CompanyWithFemaleDirector = [];
    let dataForCompanyWithFemaleDirector = { all: 'Total' };
    //
    let BoardTotalData = [];
    let dataForMaleBoardTotal = { title: 'Male' };
    let dataForFemaleBoardTotal = { title: 'Female' };
    //
    let stackedBarChartDat = [];
    let keyData;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('gender', sql.VarChar, req.body.gender)
      .input('age_from', sql.Int, req.body.ageFrom)
      .input('age_to', sql.Int, req.body.ageTo)
      .input('tenure_from', sql.Int, req.body.tenureFrom)
      .input('tenure_to', sql.Int, req.body.tenureTo)
      .input('board_from', sql.Int, req.body.boardFrom)
      .input('board_to', sql.Int, req.body.boardTo)
      .input('company_search_id', sql.Int, req.body.company_search_id)
      .input('based_on_data', sql.VarChar, req.body.based_on_data)
      .execute('TopDirectorStats_insightia_v4');

    const allData = [
      ...result.recordsets[0],
      ...result.recordsets[1],
      ...result.recordsets[2],
      ...result.recordsets[3],
      ...result.recordsets[4],
      ...result.recordsets[5],
    ];
    allData.forEach((item) => {
      lstDirectorAppointmentAnalysisData0.push({
        director_appointments: item.director_appointments,
        avg_age_fem: item.avg_age_fem,
        avg_age_male: item.avg_age_male,
        total_fem: item.total_fem,
        total_male: item.total_male,
        pcent_fem: item.pcent_fem,
        pcent_male: item.pcent_male,
      });
    });
    allData.forEach((item) => {
      if (item.industry_sector_name_for_age !== undefined) {
        lstAvgDirectorAge.push({
          industry_sector_name: item.industry_sector_name_for_age,
          avg_age_fem_sec: item.avg_age_fem_sec,
          avg_age_male_sec: item.avg_age_male_sec,
          avg_age_sec: item.avg_age_sec,
        });
      }
    });

    allData.forEach((item) => {
      if (item.industry_sector_name_for_tenure !== undefined) {
        lstAvgDirectorTenure.push({
          industry_sector_name: item.industry_sector_name_for_tenure,
          avg_ten_fem: item.avg_ten_fem,
          avg_ten_male: item.avg_ten_male,
          avg_ten: item.avg_ten,
        });
      }
    });

    allData.forEach((item) => {
      if (item.num_companies !== undefined) {
        lstCompaniesWithFemaleDirector.push({
          num_companies: item.num_companies,
          number_dir_fem: item.number_dir_fem,
        });
      }
    });
    allData.forEach((item) => {
      if (item.industry_sector_name !== undefined) {
        lstSectorWithAvgFemaleDirector.push({
          industry_sector_name: item.industry_sector_name,
          number_dir_fem: item.number_dir_fem,
          pcent_dir_fem: item.pcent_dir_fem,
        });
      }
    });

    allData.forEach((item) => {
      lstNoOfBoardWithMaleAndFemale.push({
        boards: item.boards,
        dir_on_boards_M: item.dir_on_boards_M,
        dir_on_boards_F: item.dir_on_boards_F,
      });
    });

    lstGenderDiversityOfDirectorAppointment.push({
      text: `Male(${Math.round(lstDirectorAppointmentAnalysisData0[0].pcent_male)}%)`,
      value: Math.round(lstDirectorAppointmentAnalysisData0[0].pcent_male),
    });
    lstGenderDiversityOfDirectorAppointment.push({
      text: `Female(${Math.round(lstDirectorAppointmentAnalysisData0[0].pcent_fem)}%)`,
      value: Math.round(lstDirectorAppointmentAnalysisData0[0].pcent_fem),
    });

    //for company table
    lstCompaniesWithFemaleDirector.forEach((item) => {
      dataForCompanyWithFemaleDirector['title'] = 'Total';
      dataForCompanyWithFemaleDirector[item.number_dir_fem] = item.num_companies;
    });
    CompanyWithFemaleDirector.push(dataForCompanyWithFemaleDirector);
    lstCompaniesWithFemaleDirector.unshift({
      number_dir_fem: 'title',
      num_companies: 'Total',
    });
    //for board tableconsole.log(lstNoOfBoardWithMaleAndFemale)
    if (lstNoOfBoardWithMaleAndFemale !== undefined) {
      lstNoOfBoardWithMaleAndFemale.forEach((item) => {
        dataForMaleBoardTotal['title'] = 'Male';
        dataForMaleBoardTotal[item.boards] = item.dir_on_boards_M;
        dataForFemaleBoardTotal['title'] = 'Female';
        dataForFemaleBoardTotal[item.boards] = item.dir_on_boards_F;
      });
      lstNoOfBoardWithMaleAndFemale.unshift({
        boards: 'title',
        dir_on_boards_M: 'Male',
        dir_on_boards_F: 'Female',
      });
    }

    BoardTotalData.push(dataForMaleBoardTotal, dataForFemaleBoardTotal);
    //for stack bar chart
    //for dynamic key
    keyData = [...new Set(lstSectorWithAvgFemaleDirector.map((c) => c.number_dir_fem))];
    //for main data
    lstSectorWithAvgFemaleDirector.forEach((c) => {
      stackedBarChartDat.push({
        industry_sector_name: c.industry_sector_name,
      });
    });
    stackedBarChartDat.filter((c) => {
      lstSectorWithAvgFemaleDirector.forEach((item, i) => {
        if (c.industry_sector_name === item.industry_sector_name) {
          let value = Math.round(item.pcent_dir_fem * 100) / 100;
          c[item.number_dir_fem] = value;
        }
      });
    });
    //filter unique data from duplicate data
    var obj = {};
    for (var i = 0, len = stackedBarChartDat.length; i < len; i++)
      obj[stackedBarChartDat[i]['industry_sector_name']] = stackedBarChartDat[i];
    stackedBarChartDat = new Array();
    for (var key in obj) stackedBarChartDat.push(obj[key]);

    res.json({
      lstDirectorAppointmentAnalysisData0:
        lstDirectorAppointmentAnalysisData0[0] !== undefined ? lstDirectorAppointmentAnalysisData0[0] : [],
      lstAvgDirectorAge: lstAvgDirectorAge !== undefined ? lstAvgDirectorAge : [],
      lstAvgDirectorTenure: lstAvgDirectorTenure !== undefined ? lstAvgDirectorTenure : [],
      lstCompaniesWithFemaleDirector: CompanyWithFemaleDirector !== undefined ? CompanyWithFemaleDirector : [],
      lstCompaniesWithFemaleDirector_Org:
        lstCompaniesWithFemaleDirector !== undefined ? lstCompaniesWithFemaleDirector : [],
      lstSectorWithAvgFemaleDirector: stackedBarChartDat !== undefined ? stackedBarChartDat : [],
      lstMktCapCategoryWithAvgFemaleDirector:
        lstMktCapCategoryWithAvgFemaleDirector !== undefined ? lstMktCapCategoryWithAvgFemaleDirector : [],
      lstMktCapCategoryGenderDiversity:
        lstMktCapCategoryGenderDiversity !== undefined ? lstMktCapCategoryGenderDiversity : [],
      lstNoOfBoardWithMaleAndFemale: BoardTotalData !== undefined ? BoardTotalData : [],
      lstNoOfBoardWithMaleAndFemale_Org:
        lstNoOfBoardWithMaleAndFemale !== undefined ? lstNoOfBoardWithMaleAndFemale : [],
      lstGenderDiversityOfDirectorAppointment:
        lstGenderDiversityOfDirectorAppointment !== undefined ? lstGenderDiversityOfDirectorAppointment : [],
      keyData: keyData,
      data: allData,
    });
  } catch (error) {
    ErrorLog(
      `${directorDataAndAnalyticsTool}/getDirectorAnalysisData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
