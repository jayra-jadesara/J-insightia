import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import { filters } from '../../../utils/AgGridFunctions';
import MagazinesReportComponent from '../MagazinesReportComponent';
import PdfViewer from '../../GeneralForm/PdfViewer';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import bn from '../../../utils/bemnames';
import { MAGAZINE_IMAGE_PATH, PDF_ISSUE_PATH } from '../../../constants/PathsConstant';
// import msgConst from '../../../constants/MessageConstans';
// import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';

const bem = bn.create('magazinesreport');

const SpecialReports = (props) => {
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  const gridOptions = {
    colDefsMedalsIncluded: [
      {
        cellClass: 'ws-normal-lh30 p-0',
        type: ['autoHeightTrue'],
        minWidth: 180,
        flex: 1,
        cellRendererFramework: (params) => (
          <MagazinesReportComponent
            imgPath={MAGAZINE_IMAGE_PATH}
            pdfPath={PDF_ISSUE_PATH}
            params={params}
            //
            image={params.data.image}
            date={params.data.date}
            title={params.data.title}
            summary={params.data.description}
            more_info={params.data.description}
            URL={params.data.link}
            file_type={params.data.link.substr(params.data.link.indexOf('.'))}
            id={params.data.id}
            issue_month={params.data.Month}
            issue_year={params.data.Year}
            is_monthly_mag={params.data.is_monthly_mag}
            is_aim={params.data.is_aim}
            is_latest_aim={params.data.is_latest_aim}
            //
            uniqueId={params.data.uniqueId}
            moreInfoBtn={params.data.moreInfoBtn}
            enableBtn={params.data.enableBtn}
            viewPdfBtn={params.data.viewPdfBtn}
            // data={params.data}
            {...props}
          />
        )
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    isRowMaster() {
      return true; // dataItem ? dataItem.callRecords.length > 0 : false;
    },
    headerHeight: 0,
    getRowHeight(params) {
      let newlines = 0;
      const words = params.data.description.split(' ');
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
      if (width < breakpoint) {
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
    columnTypes: filters,
    paggination: { isPagging: true, pageSize: 10 },
    rowData: props.rowDataList.map((x) => ({
      ...x,
      viewPdfBtn: false,
      moreInfoBtn: false,
      uniqueId: Math.random().toString(36).substr(2, 6)
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
    // gridHeight: '80vh',
    enableCellTextSelection: true, // For text select
    masterDetail: true,
    detailRowAutoHeight: true,
    detailCellRendererParams: {
      template(params) {
        if (params.node.data.moreInfoBtn) {
          return (
            `<div id="moreInfo_${params.data.uniqueId}" class="${bem.b('row m-0')}">` +
            '<div style="white-space: pre-line" class="row magazineMain fadeInAnimation expandBlock ">' +
            '<div class="col-12 col-md-12">' +
            `<p class="d-md-block moreInfoSection"> ${params.data.more_info}</p>` +
            '</div>' +
            '</div>' +
            '</div>'
          );
        }
      }
    }
  };

  return (
    <Page key={1}>
      <div key={1} className='row'>
        {
          !props.isLoading && props.rowDataList.length > 0 && (
            <div>
              <div className='col-md-12 col-sm-12'>
                <Table
                  hideExcelDownloadIcon
                  key={1}
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptions}
                />
              </div>
              {props.btnIdForExpandData && (
                <PdfViewer
                  IsShowCard
                  title='View PDF'
                  smalltitle=''
                  fileUrl={props.viewPDFFileName} // fileUrl="/pdf/pdf-open-parameters.pdf"
                  isOpen={props.btnIdForExpandData}
                  clickEvent={props.handleSetBtnIdForExpandData}
                />
              )}
            </div>
          )
          //  : (
          //   <span className="text-primary ps-4">{msgConst.NORECORDS}</span>
          // )
        }
      </div>
    </Page>
  );
};

SpecialReports.propTypes = {
  btnIdForExpandData: PropTypes.bool,
  handleSetBtnIdForExpandData: PropTypes.func,
  isLoading: PropTypes.bool,
  rowDataList: PropTypes.array,
  viewPDFFileName: PropTypes.string
};

SpecialReports.defaultProps = {
  btnIdForExpandData: false,
  handleSetBtnIdForExpandData: () => {},
  isLoading: false,
  rowDataList: [],
  viewPDFFileName: ''
};

export default withRouter(SpecialReports);
