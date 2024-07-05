import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
  getCurrentDate,
  dateToNull,
  replaceKeyInObjectArray,
} from './general-util';

const colorPrimary = '183f74'; //4F81BD
const colorGray = 'CCCCCC';
const colorHyperlink = '0563C1';

const colorPrimaryObj = { argb: colorPrimary };
const colorGrayObj = { argb: colorGray };
const colorHyperlinkObj = { argb: colorHyperlink };

function toLetters(i) {
  const m = i % 26;
  const c = String.fromCharCode(65 + m);
  const r = i - m;
  return r > 0 ? `${toLetters((r - 1) / 26)}${c}` : `${c}`;
}
function getExcelFileNameWithDate(fileName) {
  const currentdate = getCurrentDate('_');
  if (fileName !== undefined && fileName !== null) {
    return `${fileName.replace(
      /[.,/#!$%^&*;:{}=\-_`~()\s]/g,
      '_'
    )}_${currentdate}`;
  }
  return `excel${currentdate}`;
}

function addTypeHeader(worksheet, obj) {
  if (obj.title !== '') {
    const row = worksheet.addRow([]);
    const linestatus = worksheet.lastRow.number;

    const startRange = `A${linestatus}`;
    const endRange = `C${linestatus}`;

    worksheet.unMergeCells(startRange, endRange);
    worksheet.mergeCells(startRange, endRange);
    worksheet.getCell(startRange, endRange).value = obj.title;

    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: 'Calibri', size: 18, color: colorPrimaryObj };
      cell.alignment = {
        horizontal: 'left',
        vertical: 'top',
        indent: 1,
        wrapText: true,
      };
    });
    row.addPageBreak();
    row.commit();
    addBlankRow(worksheet);
  }
}
function addTypeLabel(worksheet, obj) {
  obj.data.map((item) => {
    const row = worksheet.addRow([item.label, item.value]);
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber === 1) {
        cell.font = {
          name: 'Calibri',
          size: 11,
          bold: true,
        };
      } else {
        cell.font = {
          name: 'Calibri',
          size: 11,
        };
      }
      cell.alignment = {
        horizontal: 'left',
        vertical: 'top',
        indent: 1,
        wrapText: true,
      };
    });
    row.addPageBreak();
    row.commit();
  });
  addBlankRow(worksheet);
}
function addTypeHyperlink(worksheet, obj) {
  if (obj.data.length > 0) {
    obj.data.map((item) => {
      const row = worksheet.addRow([]); // add blank row
      const linestatus = worksheet.lastRow.number;

      const startRange = `A${linestatus}`;
      const endRange = `C${linestatus}`;

      worksheet.unMergeCells(startRange, endRange);
      worksheet.mergeCells(startRange, endRange);
      worksheet.getCell(startRange, endRange).value = item.text;

      const currentRow = `A${row.number}`;
      worksheet.getCell(currentRow).value = {
        text: item.text,
        tooltip: item.text,
        hyperlink: item.link,
      };
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = {
          name: 'Calibri',
          size: 11,
          underline: 'single',
          color: colorHyperlinkObj,
        };
        cell.alignment = {
          horizontal: 'left',
          vertical: 'middle',
          indent: 1,
          wrapText: true,
        };
      });
      row.addPageBreak();
      row.commit();
    });
    addBlankRow(worksheet);
  }
}

function addBlankRow(worksheet) {
  const rowblank = worksheet.addRow([]);
  rowblank.addPageBreak();
  rowblank.commit();
}
function addNewHeader(worksheet, obj) {
  const linestatus = worksheet.lastRow.number;
  const row = worksheet.insertRow(linestatus, []); // add blank row
  row.height = 20;
  const parentChildArr = obj.colDef.map((x) => x.children);

  // Remove hide column from colDef
  const removeHideFromParentArr = [];
  parentChildArr.map((col) => {
    removeHideFromParentArr.push(
      col
        .filter((y) =>
          y.type !== undefined ? !y.type.toString().includes('hiddenField') : y
        )
        .filter((y) => (y.hide !== undefined ? !y.hide : y))
        .filter((item) =>
          obj.excludeCol !== undefined && obj.excludeCol.length > 0
            ? !obj.excludeCol.some((x) => x === item.field)
            : item
        )
    );
  });

  // Create Array of colspan according children object
  let countIntial = 0;
  const arr_ColSpanChild = [];
  removeHideFromParentArr.map((objChild) => {
    arr_ColSpanChild.push({
      startPos: countIntial,
      endPos: countIntial + objChild.length - 1,
    });
    countIntial += objChild.length;
  });

  // Manage colspan for new header row in excel
  const parentHeaderNameArr = obj.colDef.map((x) => x.headerName);
  arr_ColSpanChild.map((x, i) => {
    const startPos = toLetters(x.startPos);
    const endPos = toLetters(x.endPos);
    const startRange = `${startPos}${linestatus}`;
    const endRange = `${endPos}${linestatus}`;

    worksheet.unMergeCells(startRange, endRange);
    worksheet.mergeCells(startRange, endRange);
    worksheet.getCell(startRange, endRange).value = parentHeaderNameArr[i];
  });

  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = {
      name: 'Calibri',
      size: 11,
      color: { argb: 'FFFFFF' },
      bold: true,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'darkVertical',
      fgColor: colorPrimaryObj,
      bgColor: colorPrimaryObj,
    };
    const borderStyle = { style: 'thin', color: colorGrayObj };
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle,
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
  });
  row.addPageBreak();
  row.commit();
}

//////////////////////////////

export const downloadAllExcelByJsonFn = (jsonData, sheetName, fileName) => {
  try {
    const ExcelFileName = getExcelFileNameWithDate(fileName);

    if (jsonData !== undefined && jsonData.length > 0) {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Insightia';
      workbook.created = new Date();
      const sheename = sheetName.replaceAll(/[.,/#!$%^&*;:{}=\-_`~()\s]/g, '_');
      const worksheet = workbook.addWorksheet(sheename);

      jsonData.map((x, ObjNumber) => {
        if (x.type === 'header') {
          addTypeHeader(worksheet, x);
        }
        if (x.type === 'label') {
          addTypeLabel(worksheet, x);
        }
        if (x.type === 'hyperlink') {
          addTypeHyperlink(worksheet, x);
        }
        if (x.type === 'table') {
          let arrColumns = Object.keys(x.data.length > 0 ? x.data[0] : []);
          if (arrColumns.length > 0) {
            const newRenameColArr = [];
            const hasChildren = x.colDef.some((x) => x.children);
            if (hasChildren) {
              const colDef = x.colDef.map((x) => x.children);

              const removeHideFromParentArr = [];
              colDef.map((a) => {
                removeHideFromParentArr.push(
                  a.filter((y) =>
                    y.type !== undefined
                      ? !y.type.toString().includes('hiddenField')
                      : y
                  )
                );
              });

              let repeateColCount = {};
              removeHideFromParentArr.map((child, i) => {
                const conDefChild = child.filter((item) =>
                  x.excludeCol !== undefined && x.excludeCol.length > 0
                    ? !x.excludeCol.some((x) => x === item.field)
                    : item
                );
                conDefChild.map((o) => {
                  //>>add space to duplicate header
                  const colValueArr = newRenameColArr.map((x) => {
                    const val = Object.values(x).toString();
                    return val;
                  });
                  let repeatColumnKeyName = '';
                  colValueArr.length > 0 &&
                    colValueArr.map((x) => {
                      if (
                        x.trim().toLowerCase() ===
                        o.headerName.trim().toLowerCase()
                      ) {
                        repeateColCount[x] = (repeateColCount[x] || 0) + 1;
                        repeatColumnKeyName = x;
                      }
                    });

                  if (Object.keys(repeateColCount).length > 0) {
                    //add blank space into header
                    let blankspace = '';
                    for (
                      let index = 1;
                      index <= repeateColCount[repeatColumnKeyName];
                      index++
                    ) {
                      blankspace += ' ';
                    }
                    if (isFinite(o.headerName)) {
                      newRenameColArr.push({
                        [`${o.field}`]: `${o.headerName} ${blankspace}`,
                      });
                    } else {
                      newRenameColArr.push({
                        [`${o.field}`]: `${repeatColumnKeyName}${blankspace}`,
                      });
                    }
                    repeatColumnKeyName = '';
                  } else {
                    if (isFinite(o.headerName)) {
                      newRenameColArr.push({
                        [`${o.field}`]: `${o.headerName} `,
                      });
                    } else {
                      newRenameColArr.push({
                        [`${o.field}`]: `${o.headerName}`,
                      });
                    }
                    repeateColCount = {};
                    repeatColumnKeyName = '';
                  }
                  //<<add space to duplicate object
                  // no => No. (field: headerName)
                });
              });
            } else {
              const colDef = x.colDef.filter((item) =>
                x.excludeCol !== undefined && x.excludeCol.length > 0
                  ? !x.excludeCol.some((x) => x === item.field)
                  : item
              );
              colDef.map((o) => {
                newRenameColArr.push({ [`${o.field}`]: o.headerName });
              });
            }
            const replaceSelectedColumnNames = Object.assign(
              {},
              ...newRenameColArr
            );

            let newdata = [];
            const arrData = [];

            newdata = x.data;
            if (
              replaceSelectedColumnNames !== undefined &&
              replaceSelectedColumnNames !== null &&
              Object.keys(replaceSelectedColumnNames).length !== 0
            ) {
              const selectedColumns = Object.keys(replaceSelectedColumnNames);
              const splitColArr = selectedColumns.toString().split(',');
              const outputSelectedColumnsData = [];

              // remove extra key from array of object
              x.data.map((x) => {
                const obj = [];
                splitColArr.map((colKey) => {
                  obj.push({
                    [`${colKey}`]:
                      x[colKey] !== undefined && x[colKey] !== null
                        ? x[colKey]
                        : '',
                  });
                });
                const dict = {};
                for (let i = 0; i < obj.length; i++) {
                  dict[obj[i].id] = { ...dict[obj[i].id], ...obj[i] };
                }
                for (const key of Object.keys(dict)) {
                  outputSelectedColumnsData.push(dict[key]);
                }
              });

              // replace key to headername, get new array
              newdata = replaceKeyInObjectArray(
                outputSelectedColumnsData,
                replaceSelectedColumnNames
              );

              // Convert in number if it is in string format
              newdata.map((x) => {
                const newObj = Object.keys(x).reduce((accumulator, key) => {
                  const isNumber = x[key];
                  if (
                    isNumber !== null &&
                    isNumber !== '' &&
                    isFinite(isNumber)
                  ) {
                    return { ...accumulator, [key]: Number(isNumber) };
                  }
                  if (
                    isNumber !== undefined &&
                    isNumber !== null &&
                    isNumber !== '' &&
                    isNumber.endsWith('%') &&
                    isNumber.split('%').length > 0 &&
                    isFinite(isNumber.split('%')[0])
                  ) {
                    const num = Number(isNumber.split('%')[0]);
                    return { ...accumulator, [key]: num };
                  }
                  return { ...accumulator };
                }, {});
                arrData.push({ ...x, ...newObj });
              });
              // arrColumns = Object.keys(newdata[0]);
              arrColumns = Object.keys(arrData[0]);
            }

            const jsonColumns =
              arrColumns !== undefined &&
              arrColumns.map((col) => ({
                name: col,
                totalsRowLabel: col,
                filterButton: true,
              }));

            addBlankRow(worksheet);

            // add new header upon table for nested header
            if (hasChildren) {
              addNewHeader(worksheet, x);
            }

            const lastRow = worksheet.lastRow.number;
            const lastRowRef = `A${lastRow}`;
            const table = worksheet.addTable({
              name: `table${ObjNumber}`,
              ref: lastRowRef,
              headerRow: true,
              totalsRow: false,
              style: {
                theme: 'TableStyleMedium16',
                showRowStripes: true,
              },
              columns: jsonColumns,
              rows: arrData.map((obj) => Object.values(obj)),
            });
            table.commit();

            // Update current added table of header-color & border
            worksheet.eachRow((row, rowNumber) => {
              row.eachCell({ includeEmpty: true }, (cell) => {
                if (rowNumber === lastRow) {
                  cell.fill = {
                    type: 'pattern',
                    pattern: 'darkVertical',
                    fgColor: colorPrimaryObj,
                    bgColor: colorPrimaryObj,
                  };
                  cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'top',
                    wrapText: true,
                    indent: 1,
                  };
                  // row.height = NaN; // auto row height fit
                }
                const borderStyle = { style: 'thin', color: colorGrayObj };
                cell.border = {
                  top: borderStyle,
                  left: borderStyle,
                  bottom: borderStyle,
                  right: borderStyle,
                };
                if (cell.style.alignment === undefined) {
                  cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'top',
                    wrapText: true,
                    indent: 1,
                  };
                }
              });
              row.commit();
            });
            addBlankRow(worksheet);
          }
        }
      });

      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          if (
            cell.value !== null &&
            cell.value.toString().includes('T00:00:00.000Z')
          ) {
            cell.value = dateToNull(cell.value, 'dd-mmm-yy', true);
          }
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        // column width applied
        if (maxLength > 200) {
          column.width = maxLength > 200 ? 200 : maxLength;
        } else {
          column.width = maxLength < 10 ? 20 : maxLength;
        }
      });

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, `${ExcelFileName}.xlsx`);
      });
    }
  } catch (e) {
    console.log('downloadAllExcelByJsonFn: ', e);
    return false;
  }
  return true;
};

/*  
  "downloadExcelByJsonFn" 
  ex: replaceSelectedColumnNames => {Investors: 'Investor(s)', newsDate: 'Date', article: 'article'}   
*/
export function downloadExcelByJsonFn(
  jsonData,
  fileName,
  replaceSelectedColumnNames
) {
  try {
    const currentdate = getCurrentDate('_');
    const ExcelFileName =
      fileName !== undefined && fileName !== null
        ? `${fileName.replaceAll(' ', '_')}${currentdate}`
        : `excel${currentdate}`;

    let data = jsonData;
    if (data !== undefined && data.length > 0) {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Insightia';
      workbook.created = new Date();
      const sheet = workbook.addWorksheet(ExcelFileName);

      let arrColumns = Object.keys(data[0]);
      if (
        replaceSelectedColumnNames !== undefined &&
        replaceSelectedColumnNames !== null &&
        Object.keys(replaceSelectedColumnNames).length !== 0
      ) {
        const selectedColumns = Object.keys(replaceSelectedColumnNames);
        const splitColArr = selectedColumns.toString().split(',');

        const outputSelectedColumnsData = [];
        data.map((x) => {
          const obj = [];
          splitColArr.map((colKey) => {
            obj.push({ [colKey]: `${x[colKey].replaceAll('</br>', '\n')}` });
          });

          const dict = {};
          for (let i = 0; i < obj.length; i++) {
            dict[obj[i].id] = { ...dict[obj[i].id], ...obj[i] };
          }
          for (const key of Object.keys(dict)) {
            outputSelectedColumnsData.push(dict[key]);
          }
        });
        data = replaceKeyInObjectArray(
          outputSelectedColumnsData,
          replaceSelectedColumnNames
        );
        arrColumns = Object.keys(data[0]);
      }

      const jsonColumns =
        arrColumns !== undefined &&
        arrColumns.map((col) => ({
          name: col,
          totalsRowLabel: col,
          filterButton: true,
        }));

      sheet.addTable({
        name: ExcelFileName.replace(/[.,/#!$%^&*;:{}=\-_`~()\s]/g, '_'),
        ref: 'A1',
        headerRow: true,
        totalsRow: false,
        style: {
          theme: 'TableStyleMedium16', // TableStyleMedium2
          showRowStripes: true,
        },
        columns: jsonColumns,
        rows: data.map((obj) => Object.values(obj)),
      });

      sheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          if (
            cell.value !== null &&
            cell.value.toString().includes('T00:00:00.000Z')
          ) {
            cell.value = dateToNull(cell.value, 'dd-mmm-yy', true);
          }
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
          cell.alignment = {
            wrapText: true,
            vertical: 'top',
          };
        });
        // column width applied
        if (maxLength > 200) {
          column.width = maxLength > 200 ? 200 : maxLength;
        } else {
          column.width = maxLength < 10 ? 20 : maxLength;
        }
      });

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, `${ExcelFileName}.xlsx`);
      });
    }
  } catch (e) {
    console.log('downloadExcelByJsonFn: ', e);
    return false;
  }
}

export default {
  downloadAllExcelByJsonFn,
  downloadExcelByJsonFn,
};
