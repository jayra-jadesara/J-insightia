const { v4: uuidv4 } = require('uuid');
const { json } = require('body-parser');
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const faqHelpRoutes = 'faqHelp-Route';

router.post('/Getdata_FAQS_definition', authenticateToken, Getdata_FAQS_definition);

async function Getdata_FAQS_definition(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('productid', sql.Int, req.body.ProductID)
      .input('AdditionalSectionID', sql.Int, req.body.AdditionalSectionID)
      .execute('Getdata_FAQS_defination');
    const arr = result.recordsets;
    const myJson = [];
    // Data
    arr[1].forEach((objParent) => {
      const dataArray = [];
      arr[0].forEach((objChild) => {
        if (objParent.Heading === objChild.Heading) {
          dataArray.push({
            questionDefinition: objChild['Question/Defination'],
            answer: objChild.Answer,
          });
        }
      });
      myJson.push({
        Heading: objParent.Heading,
        Data: dataArray,
      });
    });

    res.json({ data: myJson });
  } catch (error) {
    general.ErrorLog(`${faqHelpRoutes}/Getdata_FAQS_definition`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
