import React, { useEffect, lazy } from 'react';
import { Link } from 'react-router-dom';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import DashboardNewsIndivisual from '../../News/Components/DashboardNewsIndivisual';
import { GetNewsDetails } from '../../../utils/news-util';
import HelpAndServicesComponent from '../../GeneralForm/HelpAndServicesComponent';
import WidgetConstant from '../../../constants/WidgetConstant';
import { history } from '../../../utils/navigation-util';
import {
  GetStoredProcedureDownload,
  getMagazinesIssuesESG
} from '../../../utils/dashboard-util';
import Table from '../../GeneralForm/Table';
import { toolListItems1 } from '../../Tools/tools';
import { filters } from '../../../utils/AgGridFunctions';
import PdfViewer from '../../GeneralForm/PdfViewer';
import D3barChart from '../../GeneralForm/D3barchart';
import { GOVERNANCE } from '../../../constants/ProductConstants';
import { ARRAY_HAS_NO_LENGTH, NUMBER_THREE } from '../../../constants/NumberConstants';
import { dateToNull, agGridSrickyHeader } from '../../../utils/general-util';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import { GOVERNANCE_OVERVIEW, QUERY_PID, QUERY_DIRECTOR, DIRECTORSHIP_AND_EXECUTIVE } from '../../../constants/PathsConstant';
import MagazinesReportComponentPage from '../../../components/MagazinesReport/MagazinesReportComponentPage';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const D3PieChart = lazy(() => import('../../GeneralForm/D3PieChart'));

const Card = React.lazy(() => import('../../GeneralForm/Card'));

const bem = bn.create('newsNew');
const bem2 = bn.create('tools');

const GovernancePortal = (props) => {
  const [newsDetials, setNewsDeta] = React.useState([]);
  const [executiveDirectorUpdates, setExecutiveDirectorUpdates] =
    React.useState([]);
  const [characterAmendment, setCharacterAmendment] = React.useState([]);
  const [rightsAgreementAdoptionChart, setRightsAgreementAdoptionChart] =
    React.useState([]);
  const [magazineData, setMagazineData] = React.useState([]);

  const Pagging = { isPagging: true, pageSize: 5 };

  const Top3NewsID = props.governancePortalTop3New;
  const newsDetailss = newsDetials !== undefined && newsDetials.length > ARRAY_HAS_NO_LENGTH ? newsDetials.map((item, i) => (
    <div key={`divDashboard${i + 1}`} className='col-lg-4 col-md-12 col-sm-12 mb-3 mt-2'>
      <DashboardNewsIndivisual
        key={`News${i + 1}`}
        newsid={item.newsid}
        itemDetails={item}
        productId={item.productId}
      />
    </div>
  )) : [];

  window.addEventListener('scroll', () => {
    agGridSrickyHeader();
  });

  //news
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsDetails() {
      if (Top3NewsID !== undefined) {
        const newsDetail = [];
        for (const item of Top3NewsID) {
          await GetNewsDetails(item.news_id).then((res) => {
            newsDetail.push(res);
          });
          if (newsDetail.length === NUMBER_THREE) {
            setNewsDeta(newsDetail);
          }
        }
      }
    }
    getNewsDetails();
    return function cleanup() {
      abortController.abort();
    };
  }, [Top3NewsID]);

  //Table Data
  useEffect(() => {
    async function getExecutiveDirectorUpdatesData() {
      const StoredProcedure = 'pDashboard_Widget_ExecutiveDirectorUpdates';
      const dashboard_widget_link_id =
        WidgetConstant.EXECUTIVE_DIRECTOR_UPDATES_UPCOMING;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setExecutiveDirectorUpdates(res);
      });
    }
    getExecutiveDirectorUpdatesData();
  }, []);

  useEffect(() => {
    async function getCharacterAmendmentData() {
      const StoredProcedure = 'pDashboard_Widget_CharterAmendment';
      const dashboard_widget_link_id = WidgetConstant.CHARTER_AMENDMENT;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setCharacterAmendment(res);
      });
    }
    getCharacterAmendmentData();
  }, []);

  useEffect(() => {
    async function getRightsAgreementAdoptionChartData() {
      const StoredProcedure =
        'pDashboard_Widget_RightsAgreementAdoption_BarGraph';
      const dashboard_widget_link_id =
        WidgetConstant.RIGHTS_AGREEMENT_ADOPTION_CHART;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setRightsAgreementAdoptionChart(res);
      });
    }
    getRightsAgreementAdoptionChartData();
  }, []);

  useEffect(() => {
    async function getGovMagazineData() {
      await getMagazinesIssuesESG({
        product_id: GOVERNANCE,
        article_type_list: null
      }).then((res) => {
        if (res.data !== null && res.data !== undefined) {
          setMagazineData(res.data.top3Mag);
        }
      });
    }
    getGovMagazineData();
  }, []);

  //tools

  function bindTools(element, index) {
    return (
      <div
        key={index}
        className='card bg-light col-xs-12 col-sm-6 col-md-4 col-lg-4'
      >
        <div className='card-header cardTitleHeader'>
          <span>{element.cardHeading}</span>
        </div>
        <div className='card-body'>
          <div className='card-text'>
            <p>{element.cardDesc}</p>
          </div>
        </div>
        <div>
          <button
            id={`cardItem-${index}_${element.cardHeading.replaceAll(' ', '-')}`} // replace(/\s/g, "-")}`}
            className='btn btn-primary card-button'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              // history.replace(element.cardGotoPath);

              history.push(element.cardGotoPath);
            }}
          >
            {element.castButtonName}
          </button>
        </div>
      </div>
    );
  }

  //grid option new activist investor
  const gridOptionExecutiveDiectorUpdates = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'CustDate',
        minWidth: 110,
        maxWidth: 110,
        type: ['dateColumn']
      },
      {
        headerName: 'Company',
        field: 'Company_name',
        cellRendererFramework: (params) => (
          <div>
            <Link className="text-secondary" to={`${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
              {params.data.Company_name}
            </Link>
          </div>
        ),
      },
      {
        headerName: 'Name',
        field: 'Dir_Name',
        cellRendererFramework: (params) => (
          <div>
            <Link className="text-secondary" to={`${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.director_id}`}>
              {params.data.Dir_Name}
            </Link>
          </div>
        ),
      },
      {
        headerName: 'Type',
        field: 'director_type',
        minWidth: 110,
        maxWidth: 110
      },
      {
        headerName: 'Start/End',
        field: 'StartEnd',
        minWidth: 110,
        maxWidth: 110
      }
    ],
    pinColumns: [
      {
        colId: 'Company',
        pinned: 'left'
      },
      {
        colId: 'Director',
        pinned: 'left'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: executiveDirectorUpdates.length > ARRAY_HAS_NO_LENGTH && executiveDirectorUpdates.map((x) => ({
      ...x,
      CustDate:
        x.CustDate !== null ? dateToNull(x.CustDate, 'dd-mmm-yy', true) : ''
    }))
  };

  const gridOptionCharaterAmendment = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'Date',
        minWidth: 110,
        maxWidth: 110,
        type: ['dateColumn'],
        cellRendererFramework: (params) => {
          if (params.data.Categories === null) return null;
        return (
          <div>{dateToNull(params.data.Date, 'dd-mmm-yy')}</div>
        );
        }
      },
      {
        headerName: 'Company',
        field: 'Company',
        cellRendererFramework: (params) => {
          if (params.data.Categories === null) return null;
        return (
          <div>
            <Link className="text-secondary" to={`${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
              {params.data.Company}
            </Link>
          </div>
        );
        }
      },
      {
        headerName: 'Categories',
        field: 'Categories',
        type: ['autoHeightTrue', 'wrapTextTrue'],
        cellClass: 'ws-normal-lh30',
        width: 750,
      }
    ],
    pinColumns: [
      {
        colId: 'Company',
        pinned: 'left'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: characterAmendment.length > ARRAY_HAS_NO_LENGTH && characterAmendment.map((x) => ({
      ...x,
      Date: x.Date !== null ? dateToNull(x.Date, 'dd-mmm-yy', true) : ''
    }))
  };

  return (
    <Page key={1} className='pt-0'>
      {props.isLoadingDashboard && LOADING}
      {!props.isLoadingDashboard && (
        <div className={bem.b()}>
          <div className='row mt-3'>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              {executiveDirectorUpdates.length > ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary hasCard cardtitle='Latest Personnel Changes'>
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    gridOptions={gridOptionExecutiveDiectorUpdates}
                    title='Latest Personnel Changes'
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Personnel Changes'>{NORECORDS}</Card>
              )}
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              {characterAmendment.length > ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary hasCard cardtitle='Latest US Charter Amendments'>
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    gridOptions={gridOptionCharaterAmendment}
                    title='Latest US Charter Amendments'
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Charter Amendments'>{NORECORDS}</Card>
              )}
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-4'>
            <ErrorBoundary hasCard cardtitle='Rights Agreement Adoption'>
              <D3barChart
                IsShowCard
                hideExcelDownloadIcon
                title='Rights Agreement Adoption'
                xAxisName='Years'
                yAxisName='Number of Adopted Poison Pills'
                keys={['Num_Adopted']}
                data={rightsAgreementAdoptionChart}
                xkeysLabel='Years'
              />
            </ErrorBoundary>
            </div>
            <div className='col-4 txtWhiteSpaceNormal'>
              <ErrorBoundary hasCard cardtitle='Gender Diversity of Director Appointments at Russell 3000 Companies (past year)'>
                <D3PieChart
                  data={props.directorAppointmentChartData}
                  isComp={false}
                  isInvest={false}
                  innerRadius={70}
                  outerRadius={120}
                  height={350}
                  cardtitle='Gender Diversity of Director Appointments at Russell 3000 Companies (past year)'
                  isSetChartPercentage
                  isDynamicViewbox
                />
              </ErrorBoundary>
            </div>
            <div className='col-4'>
              <ErrorBoundary hasCard cardtitle='Russell 3000 Governance Score Breakdown'>
                <D3PieChart
                  data={props.AigScoreChartData}
                  isComp={false}
                  isInvest={false}
                  innerRadius={70}
                  outerRadius={120}
                  height={350}
                  cardtitle='Russell 3000 Governance Score Breakdown'
                  isSetChartPercentage
                  isDynamicViewbox
                />
              </ErrorBoundary>
            </div>
          </div>
          <div className='mt-3'>
            <Card title='Tools'>
              <div className={bem2.b('')}>
                {[toolListItems1[4]].length > ARRAY_HAS_NO_LENGTH && [toolListItems1[4]].map((element, index) => (
                  <div className='row ms-03rem' key={`List${index + 1}`}>
                    {element.productItems.length > ARRAY_HAS_NO_LENGTH && element.productItems.map((childelement, index) =>
                      bindTools(childelement, index)
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className='mt-3 mb-2'>
            <Card title='Publications'>
              {!props.isLoadingMagazinesReport && magazineData.length > ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary>
                  <MagazinesReportComponentPage
                    {...props}
                    rowDataList={magazineData}
                    dashboardIDValue={props.dashboardIDValue}
                    hidePDFBox
                  />
                </ErrorBoundary>
              ) : (
                NORECORDS
              )}
            </Card>
          </div>
          <div>
            {props.btnIdForExpandData &&
              props.magazinesReport3_data.length > ARRAY_HAS_NO_LENGTH && (
                <ErrorBoundary hasCard cardtitle='View PDF'>
                  <PdfViewer
                    IsShowCard
                    isHide={false}
                    title='View PDF'
                    smalltitle=''
                    fileUrl={props.viewPDFFileName} // fileUrl="/pdf/pdf-open-parameters.pdf"
                    isOpen={props.btnIdForExpandData}
                    clickEvent={props.handleSetBtnIdForExpandData}
                  />
                </ErrorBoundary>
              )}
          </div>
          <HelpAndServicesComponent />
        </div>
      )}
    </Page>
  );
};

GovernancePortal.propTypes = {};

export default React.memo(GovernancePortal);
