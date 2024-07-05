import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import DashboardNewsIndivisual from '../../News/Components/DashboardNewsIndivisual';
import { GetNewsDetails } from '../../../utils/news-util';
import HelpAndServicesComponent from '../../GeneralForm/HelpAndServicesComponent';
import WidgetConstant from '../../../constants/WidgetConstant';
import {
  GetStoredProcedureDownload,
  getMagazinesIssuesESG
} from '../../../utils/dashboard-util';
import Table from '../../GeneralForm/Table';
import { filters } from '../../../utils/AgGridFunctions';
import PdfViewer from '../../GeneralForm/PdfViewer';
import { toolListItems } from '../../Tools/tools';
import { history } from '../../../utils/navigation-util';
import D3barChart from '../../GeneralForm/D3barchart';
import ProductConstants from '../../../constants/ProductConstants';
import { ARRAY_HAS_NO_LENGTH, NUMBER_THREE } from '../../../constants/NumberConstants';
import { dateToNull, agGridSrickyHeader } from '../../../utils/general-util';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import MagazinesReportComponentPage from '../../../components/MagazinesReport/MagazinesReportComponentPage';
import { MAGAZINE_IMAGE_PATH, PDF_ISSUE_PATH, ACTIVISTSHORTS_OVERVIEW, QUERY_PID, INVESTOR_ACTIVIST_SHORT_OVERVIEW, QUERY_INVESTOR } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

// const D3PieChart = lazy(() => import('../../GeneralForm/D3PieChart'));

const Pagging = { isPagging: true, pageSize: 5 };
const Card = React.lazy(() => import('../../GeneralForm/Card'));

const bem = bn.create('newsNew');
const bem2 = bn.create('tools');

const ActivistShortsPortal = (props) => {
  const [newsDetials, setNewsDeta] = useState([]);
  const [activistShortCampaigns, setActivistShortCampaigns] = useState([]);
  const [activistShortCampaignsChart, setActivistShortCampaignsChart] =
    useState([]);
  const [
    recentNotifiedShortsPositionData,
    setRecentNotifiedShortsPositionData
  ] = useState([]);
  const [mostShortedStocksData, setMostShortedStocksData] = useState([]);
  const [hotSellersData, setHotSellersData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);

  const Top3NewsID = props.activistShortTop3News;
  const newsDetail = [];

  const newsDetailss = newsDetials.length > ARRAY_HAS_NO_LENGTH ? newsDetials.map((item, i) => (
    <div key={`divDashboard${i + 1}`} className='col-lg-4 col-md-12 col-sm-12 mb-3 mt-2'>
      <DashboardNewsIndivisual
        key={`Dashboard${i + 1}`}
        newsid={item.newsid}
        itemDetails={item}
        productId={item.productId}
      />
    </div>
  )) : [];

  window.addEventListener('scroll', () => {
    agGridSrickyHeader();
  });

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

  //news
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsDetails() {
      if (Top3NewsID !== undefined) {
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

  useEffect(() => {
    async function getMagazineData() {
      await getMagazinesIssuesESG({
        product_id: ProductConstants.ACTIVIST_SHORTS,
        article_type_list: null
      }).then((res) => {
        if (res.data !== null && res.data !== undefined) {
          setMagazineData(res.data.top3Mag);
        }
      });
    }
    getMagazineData();
  }, []);

  useEffect(() => {
    async function getActivistShortCampiagnData() {
      const StoredProcedure = 'pDashboard_Widget_ActivistShortCampaign';
      const dashboard_widget_link_id =
        WidgetConstant.ACTIVIST_SHORT_CAMPAIGN_CHART;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setActivistShortCampaigns(res);
      });
    }
    getActivistShortCampiagnData();
  }, []);

  useEffect(() => {
    async function getActivistShortCampiagnChartData() {
      const StoredProcedure =
        'pDashboard_Widget_ActivistShortCampaigns_BarChart';
      const dashboard_widget_link_id = WidgetConstant.ACTIVIST_SHORT_CAMPAIGN;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setActivistShortCampaignsChart(res);
      });
    }
    getActivistShortCampiagnChartData();
  }, []);

  useEffect(() => {
    async function getRecentNotifiedShortsPositionData() {
      const StoredProcedure =
        'pDashboard_Widget_RecentlyNotifiedShortPositions';
      const dashboard_widget_link_id =
        WidgetConstant.RECENTLY_NOTIFIED_SHORT_POSITIONS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setRecentNotifiedShortsPositionData(res);
      });
    }
    getRecentNotifiedShortsPositionData();
  }, []);

  useEffect(() => {
    async function getMostShortedStocksData() {
      const StoredProcedure = 'pDashboard_Widget_MostShortedStocks';
      const dashboard_widget_link_id = WidgetConstant.MOST_SHORTED_STOCKS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setMostShortedStocksData(res);
      });
    }
    getMostShortedStocksData();
  }, []);

  //table data
  useEffect(() => {
    async function getHotSellersData() {
      const StoredProcedure =
        'pDashboard_Widget_KeyProposals_TopActivistShortSellers';
      const dashboard_widget_link_id =
        WidgetConstant.TOP_ACTIVIST_SHORT_SELLERS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setHotSellersData(res);
      });
    }
    getHotSellersData();
  }, []);

  //gridoptins

  const gridOptionActivistCampaigns = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Announce Date',
        field: 'date',
        type: ['dateColumn'],
        minWidth: 150
      },
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <span>
            <Link className="text-secondary" to={`${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
              {params.data.investor_name}
            </Link>
          </span>
        )
      },
      {
        headerName: 'Company',
        field: 'Company',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <div>
            <Link className="text-secondary" to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
              {params.data.company_name}
            </Link>
          </div>
        ),
        colId: 'Company'
      },
      {
        headerName: 'Allegations',
        field: 'all_allegations',
        minWidth: 150
      }
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      },
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
    rowData: activistShortCampaigns.length > ARRAY_HAS_NO_LENGTH && activistShortCampaigns.map((x) => ({
      ...x,
      date: x.date !== null ? dateToNull(x.date, 'dd-mmm-yy', true) : ''
    }))
  };

  const gridOptionRecentShortPositions = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'announce_date',
        minWidth: 150,
        cellRendererFramework: (params) => <div>{dateToNull(params.data.announce_date, 'dd-mmm-yy', true)}</div>,
      },
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 150,
        cellRendererFramework: (params) => {
          if (params.data.investor_id !== null) {
        return (
            <span>
            <Link className="text-secondary" to={`${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
              {params.data.investor_name}
            </Link>
            </span>
          );
}
          return (
            <span>
              {params.data.investor_name}
            </span>
          );
        },
      },
      {
        headerName: 'Company',
        field: 'Company',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <span>
            <Link className="text-secondary" to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
              {params.data.company_name}
            </Link>
          </span>
        ),
        colId: 'Company'
      },
      {
        headerName: 'Company HQ',
        field: 'company_hq',
        minWidth: 150
      },
      {
        headerName: 'Date of Initial Position',
        field: 'initial_date',
        minWidth: 150,
        type: ['dateColumn']
      },
      {
        headerName: 'Initial Position (%)',
        field: 'initial_position',
        minWidth: 150,
      },
      {
        headerName: 'Latest Disclosed Position (%)',
        field: 'latest_position',
        minWidth: 150,
      },
      {
        headerName: 'Change Since Last Notified (pp)',
        field: 'change_since_last_notified',
        minWidth: 150,
      },
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      },
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
    rowData: recentNotifiedShortsPositionData.length && recentNotifiedShortsPositionData.map((x) => ({
      ...x,
      initial_date:
        x.initial_date !== null
          ? dateToNull(x.initial_date, 'dd-mmm-yy', true)
          : '',
      announce_date:
        x.announce_date !== null
          ? dateToNull(x.announce_date, 'dd-mmm-yy', true)
          : ''
    }))
  };

  const gridOptionMostShortedStocks = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'Company',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <span>
            <Link className="text-secondary" to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
            {params.data.company_name}
            </Link>
          </span>
        ),
        colId: 'Company'
      },
      {
        headerName: 'Company HQ',
        field: 'company_hq',
        minWidth: 150
      },
      {
        headerName: 'Shares Shorted',
        field: 'total_short',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <div>
              {params.data.total_short.toFixed(2)}
          </div>
        ),
      },
      {
        headerName: 'No. of Current Short Positions',
        field: 'count_short',
        minWidth: 150,
      },
      {
        headerName: 'Industry',
        field: 'industry',
        minWidth: 150
      },
      {
        headerName: 'Sector',
        field: 'sector',
        minWidth: 150
      }
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      },
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
    rowData: mostShortedStocksData
  };

  const gridOptionHotSellers = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 150,
        cellRendererFramework: (params) => (
          <span>
            <Link className="text-secondary" to={`${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
              {params.data.investor_name}
            </Link>
          </span>
        ),
      },
      {
        headerName: 'Number of Campaigns',
        field: 'num_short_campaigns',
        minWidth: 80,
        maxWidth: 120,
      },
      {
        headerName: 'Avg One Week Campaign Return(%)',
        field: 'one_week_avg',
        minWidth: 150,
        // cellRendererFramework: (params) => (
        //   <div>
        //       {params.data.one_week_avg.toFixed(2)}
        //   </div>
        // ),
      },
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      },
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
    rowData: hotSellersData.length && hotSellersData.map((x) => ({
      ...x,
      one_week_avg: x.one_week_avg !== null ? x.one_week_avg.toFixed(2) : null,
    }))
  };

  return (
    <Page key={1} className='pt-0'>
      {props.isLoadingDashboard && LOADING}
      {!props.isLoadingDashboard && (
        <div className={bem.b()}>
          <div className='row'>
            <div className='col-12'>
              <Card title='News'>
                <div className='row widgetNewsContainer'>{newsDetailss}</div>
              </Card>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-lg-8 col-md-12 col-sm-12'>
              <Card title='Latest Activist Short Campaigns'>
                {activistShortCampaigns.length > ARRAY_HAS_NO_LENGTH ? (
                  <ErrorBoundary hasCard cardtitle={props.cardTitle}>
                    <Table
                      IsShowCard={false}
                      hideExcelDownloadIcon
                      gridOptions={gridOptionActivistCampaigns}
                      title={props.cardTitle}
                    />
                  </ErrorBoundary>
                ) : (
                  NORECORDS
                )}
              </Card>
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4'>
             <ErrorBoundary hasCard cardtitle='Activist Short Campaigns'>
                <D3barChart
                  IsShowCard
                  hideExcelDownloadIcon
                  xAxisName='Year'
                  yAxisName='Number of Activist Campaigns'
                  keys={['CampaignCount']}
                  data={activistShortCampaignsChart}
                  xkeysLabel={['ActionYear']}
                  title='Activist Short Campaigns'
                />
             </ErrorBoundary>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12'>
              <Card title='Recently Notified Short Positions'>
                {recentNotifiedShortsPositionData.length > ARRAY_HAS_NO_LENGTH ? (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      hideExcelDownloadIcon
                      gridOptions={gridOptionRecentShortPositions}
                      title={props.cardTitle}
                    />
                  </ErrorBoundary>
                ) : (
                  NORECORDS
                )}
              </Card>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-lg-4 col-md-12 col-sm-12'>
              <Card title='Hot Activist Short Sellers'>
                {hotSellersData.length > ARRAY_HAS_NO_LENGTH ? (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      hideExcelDownloadIcon
                      gridOptions={gridOptionHotSellers}
                      title={props.cardTitle}
                    />
                  </ErrorBoundary>
                ) : (
                  NORECORDS
                )}
              </Card>
            </div>
            <div className='col-lg-8 col-md-12 col-sm-12'>
              <Card title='Most Shorted Stocks'>
                {mostShortedStocksData.length > ARRAY_HAS_NO_LENGTH ? (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      hideExcelDownloadIcon
                      gridOptions={gridOptionMostShortedStocks}
                      title={props.cardTitle}
                    />
                  </ErrorBoundary>
                ) : (
                  NORECORDS
                )}
              </Card>
            </div>
          </div>
          <div className=' row mt-3'>
            <div className='col-12'>
              <Card title='Tools'>
                <div className={bem2.b('')}>
                  {[toolListItems[1]].length > ARRAY_HAS_NO_LENGTH && [toolListItems[1]].map((element, index) => (
                    <div className='row ms-03rem' key={`Tools${index + 1}`}>
                      {element.productItems.length > ARRAY_HAS_NO_LENGTH && element.productItems.map((childelement, index) =>
                        bindTools(childelement, index)
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          <div className='row mt-3 mb-2'>
            <div className='col-12'>
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
          </div>
          <div className='row'>
            <div className='col-12'>
              {props.btnIdForExpandData &&
                props.magazinesReport3_data.length > ARRAY_HAS_NO_LENGTH && (
                  <ErrorBoundary>
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
          </div>
          <HelpAndServicesComponent />
        </div>
      )}
    </Page>
  );
};

ActivistShortsPortal.propTypes = {};

export default React.memo(ActivistShortsPortal);
