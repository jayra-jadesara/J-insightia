import React, { useEffect } from 'react';
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
  getMagazinesIssuesESG,
} from '../../../utils/dashboard-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import Table from '../../GeneralForm/Table';
import D3Map from '../../GeneralForm/D3Map';
import { toolListItems } from '../../Tools/tools';
import PdfViewer from '../../GeneralForm/PdfViewer';
import {
  gridWidthDates,
  gridWidthValuesXLrg,
} from '../../../utils/table-tools-util';
import { demandsImageHandler, dateToNull, agGridSrickyHeader } from '../../../utils/general-util';
import {
  COMPANY_OVERVIEW,
  INVESTOR_OVERVIEW,
  INVESTOR_ACTIVISM_OVERVIEW,
  ACTIVISM_OVERVIEW,
  QUERY_INVESTOR,
  QUERY_PID,
  ACTIVIST_CAMPAIGNS,
} from '../../../constants/PathsConstant';
import ProductConstants from '../../../constants/ProductConstants';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import { NUMBER_ZERO, NUMBER_THREE, EMPTY_TABLE_LENGTH, ARRAY_HAS_NO_LENGTH, ARRAY_START_VALUE } from '../../../constants/NumberConstants';
import MagazinesReportComponentPage from '../../../components/MagazinesReport/MagazinesReportComponentPage';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = React.lazy(() => import('../../GeneralForm/Card'));

const bem = bn.create('newsNew');
const bem2 = bn.create('tools');

const ActivismPortal = (props) => {
  const [newActivistInvestor, setNewActivistInvestor] = React.useState([]);
  const [settlemetBoardSeat, setSettlemetBoardSeat] = React.useState([]);
  const [activistCampaigns, setActivistCampaigns] = React.useState([]);
  const [activistCampaignsWorldMap, setActivistCampaignsWorldMap] =
    React.useState([]);
  const [regionList, setRegionList] = React.useState([]);
  const [newsDetials, setNewsDeta] = React.useState([]);
  const [magazineData, setMagazineData] = React.useState([]);
  const regionsArray = React.useRef([]);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  const Pagging = { isPagging: true, pageSize: 5 };
  const date = new Date();
  const Top3NewsID = props.activismPortalTop3News;
  const newsDetailss = newsDetials.length > ARRAY_HAS_NO_LENGTH ? newsDetials.map((item, i) => (
    <div className='col-lg-4 col-md-12 col-sm-12 mb-3 mt-2' key={`divIndivisual${i + 1}`}>
      <ErrorBoundary>
        <DashboardNewsIndivisual
          key={`Indivisual${i + 1}`}
          newsid={item.newsid}
          itemDetails={item}
          productId={item.productId}
        />
      </ErrorBoundary>
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
      const newsDetail = [];
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
    async function getMagazinesActivismData() {
      await getMagazinesIssuesESG({
        product_id: ProductConstants.ACTIVISM,
        article_type_list: null,
      }).then((res) => {
        if (res.data !== null && res.data !== undefined) {
          setMagazineData(res.data.top3Mag);
        }
      });
    }
    getMagazinesActivismData();
  }, []);
  useEffect(() => {
    async function getNewActivistInvData() {
      const StoredProcedure = 'pDashboard_Widget_NewActivistInvestors';
      const dashboard_widget_link_id = WidgetConstant.NEW_ACTIVIST_INVESTORS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id,
      }).then((res) => {
        setNewActivistInvestor(res);
      });
    }

    getNewActivistInvData();
  }, []);
  useEffect(() => {
    async function getActivistCampiagnWorldMapData() {
      const StoredProcedure = 'pDashboard_Widget_ActivistCampaignWorldMap';
      const dashboard_widget_link_id =
        WidgetConstant.ACTIVIST_CAMPAIGNS_WORLD_MAP;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id,
      }).then((res) => {
        setActivistCampaignsWorldMap(res);
      });
    }
    getActivistCampiagnWorldMapData();
  }, []);

  useEffect(() => {
    async function getActivistCampiagnData() {
      const StoredProcedure = 'pDashboard_Widget_ActivistCampaign_Table';
      const dashboard_widget_link_id = WidgetConstant.ACTIVIST_CAMPAIGNS;

      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id,
      }).then((res) => {
        setActivistCampaigns(res);
      });
    }
    getActivistCampiagnData();
  }, []);
  //table data
  useEffect(() => {
    async function getSettlementBoardSeatData() {
      const StoredProcedure = 'pDashboard_Widget_SettlementBoardSeats';
      const dashboard_widget_link_id =
        WidgetConstant.SETTLEMENT_FOR_BOARD_SEATS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id,
      }).then((res) => {
        setSettlemetBoardSeat(res);
      });
    }

    getSettlementBoardSeatData();
  }, []);
  //activist campiagn world map
  useEffect(() => {
    const abortController = new AbortController();
    if (
      activistCampaignsWorldMap !== undefined &&
      activistCampaignsWorldMap.length > ARRAY_HAS_NO_LENGTH
    ) {
      activistCampaignsWorldMap.forEach((item, i) => {
        if (i === NUMBER_ZERO) {
          const defaultFirst = activistCampaignsWorldMap.filter(
            (v) => v.Country_name === 'US'
          );
          if (defaultFirst.length) {
            regionsArray.current.push({
              Region_name: defaultFirst[ARRAY_START_VALUE].Country_name,
              year1: defaultFirst[ARRAY_START_VALUE].year1 ? defaultFirst[ARRAY_START_VALUE].year1 : 0,
              year2: defaultFirst[ARRAY_START_VALUE].year2 ? defaultFirst[ARRAY_START_VALUE].year2 : 0,
              year3: defaultFirst[ARRAY_START_VALUE].year3 ? defaultFirst[ARRAY_START_VALUE].year3 : 0,
              year4: defaultFirst[ARRAY_START_VALUE].year4 ? defaultFirst[ARRAY_START_VALUE].year4 : 0,
              year5: defaultFirst[ARRAY_START_VALUE].year5 ? defaultFirst[ARRAY_START_VALUE].year5 : 0,
              year6: defaultFirst[ARRAY_START_VALUE].year6 ? defaultFirst[ARRAY_START_VALUE].year6 : 0,
            });
          }
        }
        const existing = regionsArray.current !== undefined && regionsArray.current.filter(
          (v) => v.Region_name === item.Region_name
        );
        if (existing.length) {
          const existingIndex = regionsArray.current.indexOf(existing[EMPTY_TABLE_LENGTH]);
          regionsArray.current[existingIndex].year1 += item.year1;
          regionsArray.current[existingIndex].year2 += item.year2;
          regionsArray.current[existingIndex].year3 += item.year3;
          regionsArray.current[existingIndex].year4 += item.year4;
          regionsArray.current[existingIndex].year5 += item.year5;
          regionsArray.current[existingIndex].year6 += item.year6;
        } else {
          regionsArray.current.push({
            Region_name: item.Region_name,
            year1: item.year1,
            year2: item.year2,
            year3: item.year3,
            year4: item.year4,
            year5: item.year5,
            year6: item.year6,
          });
        }
        if (i + 1 === activistCampaignsWorldMap.length) {
          setRegionList(regionsArray.current);
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [activistCampaignsWorldMap]);

  //gridoptins Activist campaigns
  const gridOptionActivistCampaigns = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s)',
        field: 'investors',
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => {
          const obj = JSON.parse(params.data.investors);
          const oMap = obj.investors !== undefined && obj.investors.length > ARRAY_HAS_NO_LENGTH && obj.investors.map((o) => (
            <span>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${o.investor_id}`}
              >
                {o.investor_name}
              </Link>
            </span>
          ));
          return oMap !== undefined && oMap.map((e, i) => {
            const comma = i === oMap.length - 1 ? <span /> : <span>,</span>;
            return (
              <span>
                {e}
                {comma}
              </span>
            );
          });
        },
      },
      {
        headerName: 'Company',
        field: 'Company',
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.pid}`}
            >
              {params.data.Company}
            </Link>
          </div>
        ),
        colId: 'Company',
      },
      {
        headerName: 'Company HQ',
        field: 'Company_HQ',
        ...gridWidthDates,
      },
      {
        headerName: 'Campaign Start Date',
        field: 'start_camp',
        ...gridWidthDates,
        cellRendererFramework: (params) => (
          <div>{dateToNull(params.data.start_camp, 'dd-mmm-yy', true)}</div>
        ),
      },
      {
        headerName: 'Appoint Personnel',
        field: 'Board_Representation',
        minWidth: 150,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.Board_Representation),
      },
      {
        headerName: 'Pro M&A',
        field: 'push_for_ma',
        minWidth: 100,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.push_for_ma),
      },
      {
        headerName: 'Oppose M&A',
        field: 'oppose_ma',
        minWidth: 100,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.oppose_ma),
      },
      {
        headerName: 'Divestiture',
        field: 'divestiture',
        minWidth: 110,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.divestiture),
      },
      {
        headerName: 'Return Cash to Shareholders',
        field: 'return_cash_to_shareholders',
        minWidth: 150,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.return_cash_to_shareholders),
      },
      {
        headerName: 'Capital Structure',
        field: 'capital_structure',
        minWidth: 130,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.capital_structure),
      },
      {
        headerName: 'Operational',
        field: 'operational',
        minWidth: 140,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.operational),
      },
      {
        headerName: 'Personnel Removal',
        field: 'remove_personnel',
        minWidth: 130,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.remove_personnel),
      },
      {
        headerName: 'Remuneration',
        field: 'remuneration',
        minWidth: 140,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.remuneration),
      },

      {
        headerName: 'Environmental',
        field: 'environmental',
        minWidth: 140,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.environmental),
      },
      {
        headerName: 'Social',
        field: 'social',
        minWidth: 100,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.social),
      },
      {
        headerName: 'Governance',
        field: 'governance',
        minWidth: 140,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.governance),
      },
      {
        headerName: 'Campaign Detail Link',
        field: 'campaign_link',
        minWidth: 200,
        cellRendererFramework: (params) => (
          <div>
            {params.data.pid && (
              <a
                className='link-primary text-secondary'
                href={`${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}`}
                rel='noopener noreferrer'
              >
                View
              </a>
            )}
          </div>
        ),
      },
    ],
    pinColumns: [
      {
        colId: 'activists',
        pinned: 'left',
      },
      {
        colId: 'Company',
        pinned: 'left',
      },
    ],
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: activistCampaigns,
  };

  //grid option new activist investor
  const gridOptionNewActivistInvestor = {
    colDefsMedalsIncluded: [
      {
        field: 'Investor',
        minWidth: 220,
        maxWidth: 220,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor_id}`}
            >
              {params.data.Investor}
            </Link>
          </div>
        ),
      },
      {
        headerName: 'Investor HQ',
        field: 'Company_HQ',
        minWidth: 150,
      },
    ],
    pinColumns: [
      {
        colId: 'Investor',
        pinned: 'left',
      },
      {
        colId: 'Investor_HQ',
        pinned: 'left',
      },
    ],
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: newActivistInvestor,
  };
  //gridoptionSettlementforboardseat
  const gridOptionSettlementForBoardSeat = {
    colDefsMedalsIncluded: [
      {
        field: 'Investor',
        minWidth: 240,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
            >
              {params.data.Investor}
            </Link>
          </div>
        ),
      },
      {
        field: 'Company',
        minWidth: 240,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}`}
            >
              {params.data.Company}
            </Link>
          </div>
        ),
      },
      {
        headerName: 'Company HQ',
        field: 'Company_HQ',
        minWidth: 200,
        maxWidth: 200,
      },
      {
        headerName: 'Settlement Date (Outcome Date)',
        field: 'Settelement_Date',
        cellRendererFramework: (params) => (
          <div>
            {dateToNull(params.data.Settelement_Date, 'dd-mmm-yy', true)}
          </div>
        ),
      },
      {
        headerName: 'Seats Won',
        field: 'seats_won',
        minWidth: 150,
        maxWidth: 150,
      },
    ],
    pinColumns: [
      {
        colId: 'Investor',
        pinned: 'left',
      },
      {
        colId: 'Company',
        pinned: 'left',
      },
      {
        colId: 'Company_HQ',
        pinned: 'left',
      },
      {
        colId: 'Settlement_Date',
        pinned: 'left',
      },
    ],
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: settlemetBoardSeat,
  };
  //gridoptions hot activist
  const gridOptionHotActivist = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 220,
        maxWidth: 220,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
            >
              {params.data.investor_name}
            </Link>
          </div>
        ),
      },
      {
        headerName: 'Investor HQ',
        field: 'Company_HQ',
        minWidth: 150,
      },
      {
        headerName: 'Campaigns (Past Year)',
        field: 'number_campaigns',
        minWidth: 100,
      },
    ],
    pinColumns: [
      {
        colId: 'investor_name',
        pinned: 'left',
      },
      {
        colId: 'Company_HQ',
        pinned: 'left',
      },
      {
        colId: 'number_campaigns',
        pinned: 'left',
      },
    ],
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: props.lstHotActivist,
  };
  const current_year = new Date().getFullYear();

  const gridOption = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company HQ Region',
        field: 'Region_name',
        minWidth: 180,
      },
      {
        headerName: date.getFullYear() - 5,
        field: 'year6',
        type: 'rightAligned',
        minWidth: 70,
      },
      {
        headerName: date.getFullYear() - 4,
        field: 'year5',
        type: 'rightAligned',
        minWidth: 70,
      },
      {
        headerName: date.getFullYear() - 3,
        field: 'year4',
        type: 'rightAligned',
        minWidth: 70,
      },
      {
        headerName: date.getFullYear() - 2,
        field: 'year3',
        type: 'rightAligned',
        minWidth: 70,
      },
      {
        headerName: date.getFullYear() - 1,
        field: 'year2',
        type: 'rightAligned',
        minWidth: 70,
      },
      {
        headerName:
          date.getFullYear() === current_year
            ? `${date.getFullYear()} YTD`
            : date.getFullYear(),
        field: 'year1',
        type: 'rightAligned',
        minWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'Region_name',
          pinned: 'left',
        },
      ],
    },
    groupHeaderHeight: 75,
    dataUpdatesFX: true,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: regionList,
    getRowStyle: (params) => {
      if (params.node.rowIndex === NUMBER_ZERO) {
        return {
          fontWeight: 'bold',
          backgroundColor: 'LightGray !important',
        };
      }
    },
  };

  //BTNCLICK FOR map
  const onCountyClickEvent = async (
    e,
    activistCampaignsWorldMap,
    regionList
  ) => {
    const existing = activistCampaignsWorldMap !== undefined && activistCampaignsWorldMap.filter(
      (v) => v.Country_name === e.label
    );
    if (existing.length > ARRAY_HAS_NO_LENGTH) {
      const item = existing[ARRAY_START_VALUE];
      const newRegionList = regionList;
      newRegionList[ARRAY_START_VALUE] = {
        Region_name: item.Country_name,
        year1: item.year1 ? item.year1 : 0,
        year2: item.year2 ? item.year2 : 0,
        year3: item.year3 ? item.year3 : 0,
        year4: item.year4 ? item.year4 : 0,
        year5: item.year5 ? item.year5 : 0,
        year6: item.year6 ? item.year6 : 0,
      };
      setRegionList([...newRegionList]);
    }
  };

  return (
    <Page key={1} className='pt-0'>
      {props.isLoadingDashboard && LOADING}
      {!props.isLoadingDashboard && (
        <div className={bem.b('row avtivistPortal')}>
          <div className='row'>
            <Card title='News'>
              <div className='row widgetNewsContainer'>{newsDetailss}</div>
            </Card>
          </div>
          <div className='row mt-3'>
            <Card title='Activist Campaigns'>
              <div key='divActivistCampaigns' className='row mt-3'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <Card title='Latest Activist Campaigns'>
                    {activistCampaigns.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          key='tableActivistCampaigns'
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
              </div>
              <div className='row mt-3'>
                <div className='col-lg-8 col-md-12 col-sm-12'>
                  <Card title='Activist Campaigns World Map'>
                    <div className='row p-1 '>
                      <div className='col-lg-6 col-md-12 col-sm-12 p-1'>
                        <ErrorBoundary>
                          <D3Map
                            index={1}
                            onCountyClickEvent={(e) => {
                              onCountyClickEvent(
                                e,
                                activistCampaignsWorldMap,
                                regionList
                              );
                            }}
                            mobileScreenStopZoom={width < breakpoint}
                          />
                        </ErrorBoundary>
                        <div>
                          <span>*Select Country</span>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-12 col-sm-12'>
                        {regionList.length > ARRAY_HAS_NO_LENGTH ? (
                          <ErrorBoundary>
                            <Table
                              gridOptions={gridOption}
                              IsShowCard={false}
                              hideExcelDownloadIcon
                            />
                          </ErrorBoundary>
                        ) : (
                          NORECORDS
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className='col-lg-4 col-md-12 col-sm-12'>
                  <Card title='Hot Activists'>
                    {props.lstHotActivist && props.lstHotActivist.length > ARRAY_HAS_NO_LENGTH ? (
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon
                        gridOptions={gridOptionHotActivist}
                        title={props.cardTitle}
                      />
                    ) : (
                      NORECORDS
                    )}
                  </Card>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-lg-8 col-md-12 col-sm-12'>
                  <Card title='Settlements For Board Seats'>
                    {settlemetBoardSeat.length > ARRAY_HAS_NO_LENGTH ? (
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon
                        gridOptions={gridOptionSettlementForBoardSeat}
                        title={props.cardTitle}
                      />
                    ) : (
                      NORECORDS
                    )}
                  </Card>
                </div>
                <div className='col-lg-4 col-md-12 col-sm-12'>
                  <Card title='New Activist Investors'>
                    {newActivistInvestor.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={gridOptionNewActivistInvestor}
                          title={props.cardTitle}
                        />
                      </ErrorBoundary>
                    ) : (
                      NORECORDS
                    )}
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <div className=' row mt-3'>
            <Card title='Tools'>
              <div className={bem2.b('')}>
                {[toolListItems[2]].length > ARRAY_HAS_NO_LENGTH && [toolListItems[2]].map((element, index) => (
                  <div className='row ms-03rem' key={`ms${index + 1}`}>
                    {element.productItems.length > ARRAY_HAS_NO_LENGTH && element.productItems.map((childelement, index) =>
                      bindTools(childelement, index)
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className='row mt-3 mb-2'>
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
          {props.btnIdForExpandData && props.magazinesReport3_data.length > ARRAY_HAS_NO_LENGTH && (
            <div className='row pt-3'>
              <ErrorBoundary>
                <PdfViewer
                  IsShowCard
                  isHide={false}
                  title='View PDF'
                  smalltitle=''
                  fileUrl={props.viewPDFFileName}
                  isOpen={props.btnIdForExpandData}
                  clickEvent={props.handleSetBtnIdForExpandData}
                />
              </ErrorBoundary>
            </div>
          )}
          <HelpAndServicesComponent />
        </div>
      )}
    </Page>
  );
};

ActivismPortal.propTypes = {};

export default React.memo(ActivismPortal);
