import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import bn from '../../utils/bemnames';
import useWindowDimensions from '../GeneralForm/useWindowDimensions';
import { DEFAULT_MAGAZINE_IMAGE_PATH } from '../../constants/GeneralConstant';
import { dateToNull } from '../../utils/general-util';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const bem = bn.create('magazinesreport');

const MagazinesReportComponent = (props) => {
  const [btnMoreInfo, setBtnMoreInfo] = React.useState(false);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  function moreInfoFn(params) {
    const element = params.node.data;
    element.moreInfoBtn = !element.moreInfoBtn;
    params.node.setExpanded(element.moreInfoBtn);
    setBtnMoreInfo(element.moreInfoBtn);
    setTimeout(() => {
      document.getElementById(`divPDF_${element.uniqueId}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }
  async function viewPDFFn(params) {
    const newData = [];
    const { gridApi, data } = params.node;
    const isClickViewPDF = !data.viewPdfBtn;

    await props.handleSetBtnIdForExpandData(isClickViewPDF);
    setBtnMoreInfo(false);
    gridApi.setFocusedCell();

    if (isClickViewPDF) {
      await props.handleViewPDFFileName(props.pdfPath + data.URL);
      await props.handleUpdateData([data]);
      const allItems = pickExistingRowNodeAtRandom(gridApi);
      allItems.forEach((n) => {
        let element = n.data;
        element = { ...element, ...{ moreInfoBtn: false } };
        element.viewPdfBtn = data.id === element.id ? isClickViewPDF : element.viewPdfBtn;
        newData.push(element);
        n.gridApi.setRowNodeExpanded(n, n.level > 1); // set child nodes collapsed
      });
      gridApi.setRowData(newData);
      setTimeout(() => {
        document.getElementById('pdfViewId').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 1000);
    } else {
      const allItems = pickExistingRowNodeAtRandom(gridApi);
      allItems.forEach((n) => {
        let element = n.data;
        element = { ...element, ...{ moreInfoBtn: false } };
        element.viewPdfBtn = data.id === element.id ? isClickViewPDF : element.viewPdfBtn;
        newData.push(element);
        n.gridApi.setRowNodeExpanded(n, n.level > 1); // set child nodes collapsed
      });
      gridApi.setRowData(newData);
    }
  }
  function pickExistingRowNodeAtRandom(gridApi) {
    const allItems = [];
    gridApi.forEachLeafNode((rowNode) => {
      allItems.push(rowNode);
    });
    return allItems;
  }
  const downloadPDF_File = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    a.setAttribute('target', '_blank');
    a.click();
    document.body.appendChild(a);
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
  };

  const {
    params,
    pdfPath,
    imgPath,
    //
    image,
    title,
    summary,
    more_info,
    URL,
    file_type,
    filetype,
    issue_month,
    issue_year,
    //
    uniqueId,
    enableBtn,
  } = props;

  return (
    <div id={`divPDF_${uniqueId}`} key={uniqueId} className={bem.b('row')}>
      <ErrorBoundary>
        <div className='row magazineMain fadeInAnimation border-0 shadow-none'>
          <div className='col-2 col-md-2 p-1 m-0 d-flex justify-content-center'>
            <img
              src={imgPath + image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${DEFAULT_MAGAZINE_IMAGE_PATH}`;
              }}
              className='rounded m-0 d-block'
              alt='img'
            />
          </div>
          <div className='col-7 col-md-2 titleBlock'>
            {title !== undefined && title !== null && <p className='MagazinesParagraph titleMagazine'>{title}</p>}
            <p className='MagazinesParagraph'>
              {issue_month
                ? `Released: ${dateToNull(new Date(`${issue_year}-${issue_month}-01`), 'mmm yyyy', false)}`
                : `Released: ${dateToNull(new Date(`${issue_year}-01-01`), 'yyyy', false)}`}
            </p>
          </div>
          <div className='col-0 col-md-6 text-start d-none d-md-block'>
            {summary !== undefined && summary !== null && (
              <p className='d-none d-md-block MagazinesParagraph'>{summary}</p>
            )}
          </div>
          <div className={`col-3 col-md-2 buttonDiv ${!enableBtn ? 'disableCursor' : ''}`}>
            {file_type !== undefined && file_type !== null && file_type.includes('pdf') && (
              <button
                id={`btnviewpdf_${uniqueId}`}
                onClick={() => enableBtn && viewPDFFn(params)}
                type='button'
                className={`btn btn-sm btn-primary mb-1
                ${!enableBtn ? 'bg-disable border-disable' : ''} 
                 `}
              >
                View PDF
              </button>
            )}
            {filetype !== undefined && filetype !== null && filetype.includes('pdf') && (
              <button
                id={`btnviewpdf_${uniqueId}`}
                onClick={(e) => enableBtn && viewPDFFn(e, params)}
                type='button'
                className={`btn btn-sm btn-primary mb-1 ${!enableBtn ? 'bg-disable border-disable' : ''}`}
              >
                View PDF
              </button>
            )}
            <button
              id={`btndownloadpdf_${uniqueId}`}
              type='button'
              onClick={() => enableBtn && downloadPDF_File(pdfPath + URL)}
              className={`btn btn-sm btn-primary mb-1 ${!enableBtn ? 'bg-disable border-disable' : ''}`}
            >
              Download
            </button>
            {width < breakpoint && more_info !== null && more_info.length > 0 && (
              <button
                id={`btnmoreinfo_${uniqueId}`}
                onClick={() => moreInfoFn(params)}
                type='button'
                className='btn btn-sm btn-primary'
              >
                {btnMoreInfo ? 'Close Info.' : 'More Info.'}
              </button>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

MagazinesReportComponent.propTypes = {
  date: PropTypes.any,
  URL: PropTypes.string,
  enableBtn: PropTypes.bool,
  file_type: PropTypes.string,
  filetype: PropTypes.string,
  handleSetBtnIdForExpandData: PropTypes.func,
  handleUpdateData: PropTypes.func,
  handleViewPDFFileName: PropTypes.func,
  image: PropTypes.string,
  imgPath: PropTypes.string,
  more_info: PropTypes.string,
  params: PropTypes.object,
  pdfPath: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string,
  uniqueId: PropTypes.any,
  issue_month: PropTypes.number.isRequired,
  issue_year: PropTypes.number.isRequired,
};

MagazinesReportComponent.defaultProps = {
  date: undefined,
  URL: '',
  enableBtn: false,
  file_type: '',
  filetype: '',
  handleSetBtnIdForExpandData: () => {},
  handleUpdateData: () => {},
  handleViewPDFFileName: () => {},
  image: '',
  imgPath: '',
  more_info: [],
  params: {},
  pdfPath: '',
  summary: '',
  title: '',
  uniqueId: undefined,
};

export default withRouter(MagazinesReportComponent);
