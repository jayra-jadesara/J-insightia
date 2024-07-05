import React from 'react';
import bn from '../../utils/bemnames';
import useWindowDimensions from '../GeneralForm/useWindowDimensions';
import MagazinesReportComponent from './MagazinesReportComponent';
import { filters } from '../../utils/AgGridFunctions';
import pathConst from '../../constants/PathsConstant';
import prodConst from '../../constants/ProductConstants';

export const MagazinesReportComponentGridOption = (props) => {
  const bem = bn.create('magazinesreport');

  const { width } = useWindowDimensions();
  const breakpoint = 768;
  const isMobileView = width > breakpoint;

  let heightAndExtraObjSet = {};
  if (!isMobileView) {
    heightAndExtraObjSet = {
      masterDetail: true, // Mobile View Obj
      rowHeight: 85,
      detailRowAutoHeight: true,
      detailCellRendererParams: {
        template(params) {
          if (params.node.data.moreInfoBtn) {
            return (
              `<div id="moreInfo_${params.data.uniqueId}" class="${bem.b('row m-0 p-2')}">` +
              '<div style="white-space: pre-line" class="row magazineMain fadeInAnimation expandBlock m-0">' +
              '<div class="col-12 col-md-12 p-0">' +
              `<p class="d-md-block moreInfoSection pt-2 pb-2 ps-1 pe-1"> ${params.data.more_info}</p>` +
              '</div>' +
              '</div>' +
              '</div>'
            );
          }
        },
      },
      isRowMaster() {
        return true;
      },
    };
  } else {
    heightAndExtraObjSet = {
      getRowHeight: (params) => {
        if (params.data.summary === null) {
          return 0;
        }
        let newlines = 0;
        const words = params.data.summary.split(' ');
        let current = words[0].length;
        // const gridWidth = Number(document.getElementsByClassName('ag-center-cols-container')[0].style.width.split('px')[0]);
        let breaking = window.innerWidth / 48 + 11;

        if (width >= 940 && width < 1080) {
          breaking = window.innerWidth / 60 + 10;
        }

        if (width >= breakpoint && width < 940) {
          breaking = window.innerWidth / 67 + 11;
        }
        while (current > breaking) {
          newlines += 1;
          current -= breaking;
        }
        for (let i = 0; i < words.length; i += 1) {
          const test = current + words[i].length;
          newlines +=
            words[i].match(new RegExp(/(\r\n|\r|\n)/, 'g')) === null
              ? 0
              : words[i].match(new RegExp(/(\r\n|\r|\n)/, 'g')).length;
          if (test > breaking) {
            newlines += 1;
            current = words[i].length;
            while (current > breaking) {
              newlines += 1;
              current -= breaking;
            }
          } else {
            current = test;
          }
        }

        // One line needs 27px, with a line-height of 1.5, every additional line needs 17px.
        if (width < breakpoint && !params.data.moreInfoBtn) {
          return 100;
        }
        // if (width >= breakpoint && width < 940) {
        //   if (20 + newlines * 17 < 150) {
        //     return 170;
        //   }
        //   return newlines * 22;
        // }
        // if (20 + newlines * 17 < 150) {
        //   return 170;
        // }
        if (newlines <= 10) {
          newlines = 10;
        }

        return newlines * 16.5;
      },
    };
  }

  const gridOptions = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'summary',
        cellClass: 'ps-1 pe-1',
        type: isMobileView ? ['autoHeightTrue', 'flex1', 'sortableFalse'] : ['flex1', 'sortableFalse'],
        minWidth: 180,
        cellRendererFramework: (params) => {
          const data = cellRenderParamsFn(params, props);
          return <MagazinesReportComponent {...data} />;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    rowData: props.rowDataList.map((x, i) => ({
      ...x,
      viewPdfBtn: false,
      moreInfoBtn: false,
      uniqueId: Math.random().toString(36).substr(2, 6),
    })),
    rowSelection: 'single',
    domLayout: 'autoHeight',
    enableCellTextSelection: true, // For text select
    ...heightAndExtraObjSet,
    isfloatingFilter: false,
    headerHeight: 0,
    paggination: { isPagging: true, pageSize: 10 },
  };
  return gridOptions;
};

function magazinePDFPath(loc) {
  return pathConst.DOCS_INSIGHTIA_PUBLISHINGS_REPORTS;
}

function magazinePicPath(loc) {
  if (loc === 'issues') {
    return pathConst.MAGAZINE_ISSUE_IMAGE_PATH;
  }
  return pathConst.MAGAZINE_IMAGE_PATH;
}

function cellRenderParamsFn(params, props) {
  return {
    imgPath: magazinePicPath(params.data.doc_location),
    pdfPath: magazinePDFPath(params.data.doc_location),
    params: params,
    //
    image: params.data.image,
    date: params.data.Date,
    title: params.data.title,
    summary: params.data.summary,
    more_info: params.data.more_info,
    URL: params.data.URL,
    file_type: params.data.filetype,
    id: params.data.id,
    issue_month: params.data.issue_month,
    issue_year: params.data.issue_year,
    is_monthly_mag: params.data.is_monthly_mag,
    is_aim: params.data.is_aim,
    is_latest_aim: params.data.is_latest_aim,
    //
    uniqueId: params.data.uniqueId,
    moreInfoBtn: params.data.moreInfoBtn,
    enableBtn: params.data.enableBtn,
    viewPdfBtn: params.data.viewPdfBtn,
    // data={params.data}
    ...props,
  };
}

export default MagazinesReportComponentGridOption;
