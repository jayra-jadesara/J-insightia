const express = require('express');
const dateFormat = require('dateformat');

const router = express.Router();
const puppeteer = require('puppeteer');
const { PDFDocument, StandardFonts, cmyk } = require('pdf-lib');

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const imageFileBase64 = require('./imageFileBase64.json');
const general = require('../../utill/general');
const { authenticateToken } = require('../../utill/authUtil');
const { sql, poolPromise } = require('../../config/db');

const pdfRoutes = 'pdfRoutes';

router.post('/getPDF', authenticateToken, getPDF);
router.post('/getPDFClose', authenticateToken, getPDFClose);
router.post('/getRecentDownloadList', authenticateToken, getRecentDownloadList);

async function getRecentDownloadList(req, res, next) {
  try {
    const pool = await poolPromise;
    const resultExpireFilesData = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('pdf_path', sql.VarChar, '')
      .input('pdf_title', sql.VarChar, '')
      .execute(
        'activist_insight.dbo.recent_downloads_pdf_transaction_expireFilesData'
      );

    for (const item of resultExpireFilesData.recordset) {
      const pathOfFolderPDF = path.join(
        __dirname,
        '../../public/',
        `${item.pdf_path}${item.pdf_title}`
      );
      if (fs.existsSync(pathOfFolderPDF)) {
        fs.unlink(pathOfFolderPDF, () => {}); // delete file
      }
    }
    await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('pdf_path', sql.VarChar, '')
      .input('pdf_title', sql.VarChar, '')
      .execute(
        'activist_insight.dbo.recent_downloads_pdf_transaction_expireFilesDataDelete'
      );

    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('pdf_path', sql.VarChar, '')
      .input('pdf_title', sql.VarChar, '')
      .execute('activist_insight.dbo.recent_downloads_pdf_transaction_select');
    res.json({ data: result.recordset });
  } catch (error) {
    res.json({ data: [] });
    general.ErrorLog(`${pdfRoutes}/getRecentDownloadList`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function getPDFClose(req, res, next) {
  // bufferArray = [];
  // cancelPdf = true;
  // if (browser !== undefined && browser.close !== undefined) {
  //   // await page.close();
  //   await browser.close();
  //   browser = undefined;
  //   res.send({ data: '', errorMsg: '' });
  //   console.log('\n--Browser Close--');
  // } else {
  //   browser = undefined;
  // }
  res.send({ data: '', errorMsg: '' });
}
async function getPDF(req, res, next, retry = false) {
  const pool = await poolPromise;
  const logoBase64 = imageFileBase64.insightiaLogo;
  const { pdfListItems, loginUrl, token, User_Id, pdfTitle } = req.body;
  const startTime = new Date().getTime();
  const startTimeconsole = dateFormat('shortTime');
  const pagesurl = pdfListItems
    .filter((item) => item.checked && !item.disabled)
    .map((i) => ({ url: i.to, pdfPageName: i.pdfPageName }));
  const UserNameArray = await pool
    .request()
    .query(
      `select FirstName+' '+Surname as username, Email from tblUsers_secure where user_id=${User_Id}`
    );
  let browser;
  const cancelPdf = false;
  let bufferArray = [];
  const UserName =
    UserNameArray.recordset.length > 0
      ? UserNameArray.recordset[0].username
      : '';
  const UserEmail =
    UserNameArray.recordset.length > 0 ? UserNameArray.recordset[0].Email : '';
  const data = { token, UserEmail };
  console.log(`\n Generate PDF ${User_Id} |-- Pre-Browser Open --`);
  if (data.token === null) {
    res.send({
      FilePath: '',
      errorMsg: 'login token not get. please again login!',
    });
    return false;
  }

  try {
    browser = await puppeteer.launch({
      headless: true, // headless: false to debug
      ignoreHTTPSErrors: true,
      product: 'chrome',
      args: [
        '--use-gl=egl',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--no-zygote',
        '--single-process'
      ],
    });
    console.log(`\n\t Generate PDF ${User_Id} |-- Browser Open --`);

    // [page] = await browser.pages(); // const page = await browser.newPage();
    const initpage = await browser.newPage();
    await initpage.setCacheEnabled(false);
    await initpage.setDefaultNavigationTimeout(0);
    await initpage.goto(loginUrl, { waitUntil: 'networkidle0', timeout: 0 }).catch((e) => console.log('--error page--', e));

    await initpage.evaluate((data) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.UserEmail);
    }, data);

    bufferArray = [];
    for (const x of pagesurl) {
      console.log(`\n\t| Generate PDF ${User_Id} | New Page ---`);
      const page = await browser.newPage();
      const pdfPageName =
        x.pdfPageName !== undefined && x.pdfPageName !== null
          ? x.pdfPageName
          : '';

      console.log(`\n\t| Generate PDF ${User_Id} | url: ${x.url}`);
      await page.setViewport({ width: 1120, height: 800 }); // For charts add viewport
      await page.setDefaultNavigationTimeout(0);

      await page.goto(x.url, { waitUntil: 'networkidle0', timeout: 0 });
      await page.emulateMediaType('print');
      // await page.evaluate(() => matchMedia('print').matches);

      // await waitTillHTMLRendered(page, x.url)

      // * Waiting for whole page to load *
      await page.waitForSelector('#loadedItem', { visible: true, timeout: 0 });

      console.log(`\n\t| Generate PDF ${User_Id} | Page Rendered`);
      // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.addStyleTag({
        path: path.join(
          __dirname,
          '../',
          '/generatePDF',
          'printStyleMedia.scss'
        ),
      });

      const tableHeader = { pdfTitle, logoBase64, pdfPageName };
      const headerTemplate = fs.readFileSync(
        path.join(__dirname, '../', '/generatePDF', 'headerTemplate.ejs'),
        'utf8'
      );
      const contentHeaderTemplate = ejs.render(headerTemplate, { tableHeader });

      const dateTimeFormatFooter = getDateTimeFromTimestamp(new Date());
      const tableFooter = { dateTimeFormatFooter, UserName };
      const footerTemplate = fs.readFileSync(
        path.join(__dirname, '../', '/generatePDF', 'footerTemplate.ejs'),
        'utf8'
      );
      const contentFooterTemplate = ejs.render(footerTemplate, { tableFooter });

      const options = {
        landscape: true,
        preferCSSPageSize: true,
        printBackground: true,
        // path: 'output.pdf',
        displayHeaderFooter: true,
        headerTemplate: contentHeaderTemplate,
        footerTemplate: contentFooterTemplate,
        format: 'A4',
        timeout: 0,
        // margin: {
        //   top: "80px",
        //   bottom: "80px",
        //   right: "10px",
        //   left: "10px",
        // },
      };
      await page.emulateMediaType('print');
      const pdfBuffer = await page.pdf(options);
      console.log(`\n\t| Generate PDF ${User_Id} | PDF Buffer Added`);
      await page.close()
      bufferArray.push(pdfBuffer);
      console.log(`\n\t| Generate PDF ${User_Id} | Page Closed`);
    }
    await initpage.close()
    console.log(`\n| Generate PDF ${User_Id} | Start PDF buffer merge`);

    if (bufferArray.length > 0) {
      // #region 'Add pagination in PDF'
      const mergedPdf = await PDFDocument.create();
      for (const pdfBytes of bufferArray) {
        const pdf = await PDFDocument.load(pdfBytes);
        console.log(`\n\t| Generate PDF ${User_Id} | Merge PDF`);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }
      console.log(`\n\t| Generate PDF ${User_Id} | Merge PDF Finished`);
      const mergedbuffer = await mergedPdf.save();
      const content = await PDFDocument.load(mergedbuffer);
      const helveticaFont = await content.embedFont(StandardFonts.Helvetica);
      const pages = await content.getPages();
      console.log(`\n\t| Generate PDF ${User_Id} | Add Timestamps`);
      for (const [i, page] of Object.entries(pages)) {
        const bottomPaginationLabel = `${getDateTimeFromTimestamp(
          new Date()
        )}     |     Page ${+i + 1} of ${pages.length}`;

        const xLength = page.getWidth() - 220;
        // (page.getWidth() / 5 + bottomPaginationLabel.length);
        page.drawText(bottomPaginationLabel, {
          x: xLength,
          y: 26,
          size: 9,
          font: helveticaFont,
          color: cmyk(0.02, 0.01, 0.0, 0.63),
        });
      }
      console.log(`\n\t| Generate PDF ${User_Id} | Save Content`);
      const pdfBytes = await content.save();
      // #endregion

      const endTime = new Date().getTime();
      const endTimeconsole = dateFormat('shortTime');
      const executionTime = endTime - startTime;
      const minutes = parseInt((Math.abs(executionTime) / (1000 * 60)) % 60);
      const seconds = parseInt((Math.abs(executionTime) / 1000) % 60);
      console.log('* PDF Successfully merged!');
      console.log(`\t* start-time: \t\t${startTimeconsole}`);
      console.log(`\t* end-time: \t\t${endTimeconsole}`);
      console.log(`\t* execution-time: \t${minutes} min :${seconds} sec`);

      let createdPDFPath = '';
      // const finaldata = Buffer.concat([pdfBytes]); //bufferArray
      const finaldata = Buffer.concat([pdfBytes]); //

      const withDateNtime_PDFTitle = `${removeExtraCharacter(
        pdfTitle
      )}_${removeExtraCharacter(
        dateFormat(new Date(), 'dS mmm yyyy h:MM ss TT')
      )}.pdf`;

      console.log('withDateNtime_PDFTitle', withDateNtime_PDFTitle);
      if (finaldata !== '') {
        const dbPDFPath = path.join('/pdfcreation', `/${User_Id}/`);
        const result = await pool
          .request()
          .input('user_id', sql.Int, User_Id)
          .input('pdf_path', sql.VarChar, dbPDFPath)
          .input('pdf_title', sql.VarChar, withDateNtime_PDFTitle)
          .execute(
            'activist_insight.dbo.recent_downloads_pdf_transaction_insert'
          );
        const resId =
          result.recordset.length > 0
            ? result.recordset[0].recent_downloads_id
            : 0;

        if (resId !== 0) {
          const existFolder = path.join(
            __dirname,
            '../../public/pdfcreation',
            `/${User_Id}`
          );
          if (!fs.existsSync(existFolder)) {
            fs.mkdirSync(existFolder, { recursive: true });
          }

          const createPDF = path.join(existFolder, withDateNtime_PDFTitle);
          fs.writeFileSync(createPDF, finaldata);
          console.log('\t* pdf-creation-path:\t', createPDF);
          createdPDFPath = `${dbPDFPath}${withDateNtime_PDFTitle}`;
        }
      }
      res.send({ FilePath: createdPDFPath, errorMsg: '' });
    }
    if (browser !== undefined && browser.close !== undefined) {
        await browser.close();
        browser = undefined;
      console.log(`\n| Generate PDF ${User_Id} | Close Browser (Standard)`);
      } else {
        browser = undefined;
      console.log(`\n| Generate PDF ${User_Id}| Cannot Close Browser (Standard)`);
        general.ErrorLog(
          `${pdfRoutes}/BrowserNotSet`,
          'Browser not set within the appropriate area',
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
  } catch (error) {
    if (browser !== undefined && browser.close !== undefined) {
    await browser.close();
    browser = undefined;
      console.log(`\n| Generate PDF ${User_Id} | Close Browser (ERROR) ${error.name}: ${error.message}`);
      if (!cancelPdf) {
        console.log(`\n| Generate PDF ${User_Id} | Close Browser Not Cancel (ERROR) ${error.name}: ${error.message}`);
      general.ErrorLog(
        `${pdfRoutes}/getPDF`,
        error,
        req.user.User_Id,
        req.body,
        req.headers.origin
      );
    }
  } else {
      browser = undefined;
      console.log(`\n| Generate PDF ${User_Id} | Cannot Close Browser (ERROR) ${ error.name }: ${ error.message }`);
      if (!cancelPdf) {
        console.log(`\n| Generate PDF ${User_Id} | Cannot Close Browser Not Cancel (ERROR) ${error.name}: ${error.message}`);
        general.ErrorLog(
          `${pdfRoutes}/getPDF/No Browser`,
          error,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
    }
    }
    if (!retry) {
      console.log(`\n| Generate PDF ${User_Id} | RETRY (ERROR) ${error.name}: ${error.message}`);
      await getPDF(req, res, next, retry = true);
      return true;
    }
    console.log(`\n| Generate PDF ${User_Id} | RETRY (ERROR) ${error.name}: ${error.message}`);
    res.send({ FilePath: '', errorMsg: error.message });
  }
}

//=========================================//

const waitTillHTMLRendered = async (page, url, req, timeout = 60000000) => {
  try {
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;

    let checkDurationMsecs = 2000;
    let minStableSizeIterations = 7;

    // For 'long' time page loading
    if (url.includes('VotingVoteDetail')) {
      checkDurationMsecs = 5000;
      minStableSizeIterations = 5; // 18;
    }
    // For 'medium' time page loading
    if (
      url.includes('VotingVotesAgainstMgmt') ||
      url.includes('activistshortcampaigns')
    ) {
      checkDurationMsecs = 3000;
      minStableSizeIterations = 10;
    }
    if (url.includes('voting/investorcomparator/historicaltrend') || url.includes('tools/voting/resolutiontracker')) {
      checkDurationMsecs = 15000;
      minStableSizeIterations = 10;
    }
    const maxChecks = timeout / checkDurationMsecs;

    while (checkCounts++ <= maxChecks) {
      const html = await page.content();
      const currentHTMLSize = html.length;

      const bodyHTMLSize = await page.evaluate(
        () => document.body.innerHTML.length
      );

      console.log(
        '\tlast: ',
        lastHTMLSize,
        ' <> curr: ',
        currentHTMLSize,
        ' body html size: ',
        bodyHTMLSize,
        ' loop count: (',
        checkCounts - 1,
        ')'
      );

      if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) { countStableSizeIterations++; } else countStableSizeIterations = 0; // reset the counter

      if (countStableSizeIterations >= minStableSizeIterations) {
        console.log('\tPage rendered fully..\n');
        break;
      }

      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }
  } catch (error) {
    console.log(
      'PDF_waitTillHTMLRendered_error',
      `${error.name}: ${error.message}`
    );
    general.ErrorLog(
      'PDF_waitTillHTMLRendered_error',
      error,
      req.user.User_Id,
      req.body,
      req.headers.host
    );
  }
};

function getOrdinal(n) {
  const ord = ['st', 'nd', 'rd'];
  const exceptions = [11, 12, 13];
  const nth =
    ord[(n % 10) - 1] === undefined || exceptions.includes(n % 100)
      ? 'th'
      : ord[(n % 10) - 1];
  return n + nth;
}
function getDateTimeFromTimestamp(unixTimeStamp) {
  const date = new Date(unixTimeStamp);

  const day = getOrdinal(`0${date.getDate()}`.slice(-2));
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  const time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return `${day} ${month} ${year} ${time}`;
}
function removeExtraCharacter(text) {
  return text
    .split(' ')
    .join('_')
    .split('"')
    .join('_')
    .split('\\')
    .join('_')
    .split('/')
    .join('_')
    .split(':')
    .join('_')
    .split('.')
    .join('_')
    .split('?')
    .join('_')
    .split('#')
    .join('_')
    .split('|')
    .join('_')
    .split('>')
    .join('_')
    .split('<')
    .join('_')
    .split('*')
    .join('_');
}

module.exports = router;
