import PropTypes from 'prop-types';
import React, { useState, lazy, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import bn from '../../../utils/bemnames';
import {
  checkValuesToFixed,
  numberToCommaString,
} from '../../../utils/table-tools-util';
import D3DoughnutChart from '../../GeneralForm/D3DoughnutChart';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import PeerGroupComponent from '../../GeneralForm/PeerGroupComponent';
import D3AnnotatedSharePrice from '../../GeneralForm/D3AnnotatedSharePrice';
import Table from '../../GeneralForm/Table';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import { dateToNull, isIdNotNullOrUndefined } from '../../../utils/general-util';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('companyOverview');

const CompanyOverview = ({
  location,
  company_overview,
  data_Chart,
  stock_events,
  annotatedStockGraph,
  lollipopsGraph,
  vunSummaryScoreData,
  vunSummaryScoreDataScore,
  isLoadingData,
  lstCompanyPeerGroup,
  lstOriginalData,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  lblPeerGroups,
  shell_or_spac,
  companyShellSPAC,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [useBlurryText, setUseBlurryText] = useState('');
  const [indexID, setIndex] = useState(0);

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const gridOptionStockEvents = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Event Date',
        field: 'event_date',
        type: ['dateColumn'],
        minWidth: 200,
        maxWidth: 200,
        cellRendererFramework: (params) => (
          <div>{dateToNull(params.data.event_date, 'dd-mmm-yy', true)}</div>
        ),
      },
      {
        headerName: 'Description',
        field: 'event_text',
        minWidth: 850,
        maxWidth: query.print ? 850 : null,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: stock_events.map((x) => ({
      ...x,
      // TrialStatus: props.trialStatus,
      allowDownload: false,
    })),
    paggination: { isPagging: !query.print, pageSize: 10 },
  };

  const gridOptionShellSPAC = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Current Shell Company/SPAC',
        field: 'shell_or_spac',
        type: ['dateColumn'],
        minWidth: 200,
        maxWidth: 250,
        cellClass: 'text-center',
        cellRendererFramework: (params) => {
          if (params.data.shell_or_spac && !params.data.reverse_merger) {
            return (
              <div>
                <img
                  src={`${window.location.origin}/images/icons/GreenYes.png`}
                  alt='Green Tick'
                />
              </div>
            );
          }
          return (
            <div>
              <img
                src={`${window.location.origin}/images/icons/RedCross.png`}
                alt='Red Cross'
              />
            </div>
          );
        },
      },
      {
        headerName: 'Previous Shell Company/SPAC',
        field: 'pre_shell_or_spac',
        minWidth: 200,
        maxWidth: 250,
        cellClass: 'text-center',
        cellRendererFramework: (params) => {
          if (params.data.shell_or_spac && params.data.reverse_merger) {
            return (
              <div>
                <img
                  src={`${window.location.origin}/images/icons/GreenYes.png`}
                  alt='Green Tick'
                />
              </div>
            );
          }
          return (
            <div>
              <img
                src={`${window.location.origin}/images/icons/RedCross.png`}
                alt='Red Cross'
              />
            </div>
          );
        },
      },
      {
        headerName: 'Shell Company/SPAC Name',
        field: 'shell_or_spac_name',
        minWidth: 220,
      },
      {
        headerName: 'Reverse Merger',
        field: 'reverse_merger',
        minWidth: 140,
        maxWidth: 180,
        cellClass: 'text-center',
        cellRendererFramework: (params) => {
          if (params.data.reverse_merger) {
            return (
              <div>
                <img
                  src={`${window.location.origin}/images/icons/GreenYes.png`}
                  alt='Green Tick'
                />
              </div>
            );
          }
          return (
            <div>
              <img
                src={`${window.location.origin}/images/icons/RedCross.png`}
                alt='Red Cross'
              />
            </div>
          );
        },
      },
      {
        headerName: 'Reverse Merger Date',
        field: 'reverse_merger_date',
        minWidth: 160,
        maxWidth: 180,
        cellRendererFramework: (params) => (
          <div>
            {dateToNull(params.data.reverse_merger_date, 'dd-mmm-yy', true)}
          </div>
        ),
      },
      {
        headerName: 'Reverse Merger Link',
        field: 'reverse_merger_filing',
        minWidth: 180,
        maxWidth: 200,
        cellClass: 'text-secondary text-center',
        cellRendererFramework: (params) => {
          if (
            params.data.reverse_merger_filing &&
            params.data.reverse_merger_filing !== undefined &&
            params.data.reverse_merger_filing !== ''
          ) {
            return (
              <div>
                <a
                  href={`${params.data.reverse_merger_filing}`}
                  className='text-secondary'
                  rel='noreferrer'
                  target='_blank'
                >
                  {' '}
                  View{' '}
                </a>
              </div>
            );
          }
          return '';
        },
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: companyShellSPAC.map((x) => ({
      ...x,
      allowDownload: false,
    })),
    paggination: { isPagging: false },
  };

  useEffect(() => {
    if (!isLoadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingData]);

  return (
    <Page key={1} className={bem.b('pt-3 pb-3')}>
      {isLoadingData ? (
        msgConst.LOADING
      ) : (
        <>
          <div className='row' id='loadItem'>
            {(company_overview.country_name ||
              company_overview.incorporated) && (
              <div className='col-sm-12 col-md'>
                <Card isHideHeaderDiv={true}>
                  <table>
                    <tbody>
                      {company_overview.country_name && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards pe-0'>
                            Company HQ
                          </td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {company_overview.country_name}
                          </td>
                        </tr>
                      )}
                      {company_overview.incorporated && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards pe-0 m-0'>
                            Incorporated
                          </td>
                          <td>:</td>
                          <td className={`m-0 ${useBlurryText}`}>
                            {company_overview.incorporated}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
            {(company_overview.industry_sector ||
              company_overview.industry) && (
              <div className='col-sm-12 col-md'>
                <Card isHideHeaderDiv={true}>
                  <table>
                    <tbody>
                      {company_overview.industry_sector && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>Sector</td>
                          <td>:</td>
                          <td className={`ps-0 pe-0 ${useBlurryText}`}>
                            {company_overview.industry_sector}
                          </td>
                        </tr>
                      )}

                      {company_overview.Industry && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>Industry</td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {company_overview.Industry}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
            {(company_overview.market_cap_USD ||
              company_overview.market_cap_category) && (
              <div className='col-sm-12 col-md'>
                <Card isHideHeaderDiv={true}>
                  <table>
                    <tbody>
                      {company_overview.market_cap_USD && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>
                            Market Cap
                          </td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {`$  ${numberToCommaString(
                              checkValuesToFixed(
                                company_overview.market_cap_USD
                              )
                            )} M`}
                          </td>
                        </tr>
                      )}
                      {company_overview.market_cap_category && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>
                            Market Cap Category
                          </td>
                          <td>:</td>
                          <td className={`m-0 ${useBlurryText}`}>
                            {' '}
                            {company_overview.market_cap_category}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
            {(company_overview.exchange_with_symb ||
              company_overview.company_indexes) && (
              <div className='col-sm-12 col-md'>
                <Card isHideHeaderDiv={true}>
                  <table>
                    <tbody>
                      {company_overview.exchange_with_symb && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards pe-0'>
                            Exchange
                          </td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {company_overview.exchange_with_symb}
                          </td>
                        </tr>
                      )}
                      {company_overview.company_indexes && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards m-0'>Index</td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {company_overview.company_indexes}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
            {(company_overview.ipo_year || company_overview.website) && (
              <div className='col-sm-12 col-md'>
                <Card isHideHeaderDiv={true}>
                  <table>
                    <tbody>
                      {company_overview.ipo_year && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>IPO</td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            {company_overview.ipo_year}
                          </td>
                        </tr>
                      )}
                      {company_overview.website && (
                        <tr className='cardISection'>
                          <td className='customSubHeadersInCards'>Index</td>
                          <td>:</td>
                          <td className={`${useBlurryText}`}>
                            <a
                              className='col-8'
                              href={`https://${company_overview.website}`}
                              rel='noopener noreferrer'
                              target='_blank'
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
          </div>

          {company_overview.about && (
            <div className='row py-2'>
              <div className='col-md'>
                <Card title='About'>
                  <div className='row'>
                    <div className='col m-0'>
                      <p>{company_overview.about}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className='row pdfpagebreak'>
            {company_overview.has_activism !== null && (
              <div className='col-sm-12 col-md-4 col-lg text-center'>
                <Card title='Activism Summary'>
                  {company_overview.has_activism === numConst.NUMBER_ZERO ? (
                    <div>
                      <img
                        src={`${window.location.origin}${pathConst.GREEN_FLAG_LARGE}`}
                        height='50'
                        alt='Green flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        No Current Activist Campaign
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`${window.location.origin}${pathConst.RED_FLAG_LARGE}`}
                        height='50'
                        alt='Red flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        Current Activist Campaign
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
            {company_overview.has_shareholder_dissent !== null && (
              <div className='col-sm-12 col-md-4 col-lg text-center'>
                <Card title='Voting Summary'>
                  {company_overview.has_shareholder_dissent ===
                  numConst.NUMBER_ZERO ? (
                    <div>
                      <img
                        src={`${window.location.origin}${pathConst.GREEN_FLAG_LARGE}`}
                        height='50'
                        alt='Green flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        No Significant Shareholder Dissent
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`${window.location.origin}${pathConst.RED_FLAG_LARGE}`}
                        height='50'
                        alt='Red flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        Significant Shareholder Dissent
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
            {company_overview.gov_score !== null && (
              <div className='col-sm-12 col-md-4 col-lg-2 text-center'>
                <ErrorBoundary hasCard cardtitle='Governance Summary'>
                <D3DoughnutChart
                  cardtitle='Governance Summary'
                  data={data_Chart}
                  height={120}
                  topValue={company_overview.country_name === 'UK' ? 12 : 20}
                  IsShowCard
                />
                </ErrorBoundary>
              </div>
            )}
            {company_overview.has_short_campaign !== null && (
              <div className='col-sm-12 col-md-4 col-lg text-center'>
                <Card title='Shorts Summary'>
                  {company_overview.has_short_campaign ===
                  numConst.NUMBER_ZERO ? (
                    <div>
                      <img
                        className='m'
                        src={`${window.location.origin}${pathConst.GREEN_FLAG_LARGE}`}
                        height='50'
                        alt='Green flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        No Recent Activist Short Campaigns
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`${window.location.origin}${pathConst.RED_FLAG_LARGE}`}
                        height='50'
                        alt='Red flag'
                      />
                      <div className='text-primary text-center font-italic mt-3'>
                        Recent Activist Short Campaigns
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
            {vunSummaryScoreDataScore !== undefined &&
              vunSummaryScoreDataScore !== null &&
              Object.keys(vunSummaryScoreData).length > 0 && (
                <div className='col-sm-12 col-md-4 col-lg-2 text-center'>
                  <ErrorBoundary hasCard={true} cardtitle='Vulnerability Summary'>
                    <D3DoughnutChart
                      cardtitle='Vulnerability Summary'
                      data={vunSummaryScoreData}
                      height={120}
                      IsShowCard
                      isShowPercentage={true}
                      isMoreWorse={true}
                    />
                  </ErrorBoundary>
                </div>
              )}
          </div>

          {lstCompanyPeerGroup !== undefined &&
            lstCompanyPeerGroup.length !== 0 && (
              <div className='row'>
                <div className='col-12'>
                  <ErrorBoundary hasCard cardtitle='Insightia Company Peer Group'>
                    <PeerGroupComponent
                      title='Insightia Company Peer Group'
                      lstPeerGroup={lstCompanyPeerGroup}
                      lstOriginalData={lstOriginalData}
                      handleResetCompanyTitle={handleResetCompanyTitle}
                      handleResetBreadcrumbs={handleResetBreadcrumbs}
                      handleResetCompanyPath={handleResetCompanyPath}
                      location={location}
                      indexID={indexID}
                      lblPeerGroups={lblPeerGroups}
                      setIndex={setIndex}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            )}

          {annotatedStockGraph.length > 0 && (
            <div className='row pdfpagebreak'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Share Price History'>
                  <D3AnnotatedSharePrice
                    cardtitle='Share Price History'
                    stockExchange={
                      company_overview.exchange_with_symb
                        ? company_overview.exchange_with_symb
                        : ''
                    }
                    country_hq={
                      company_overview.country_name
                        ? company_overview.country_name
                        : ''
                    }
                    stockGraph={annotatedStockGraph}
                    lolliPopGraph={lollipopsGraph}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {stock_events.length > 0 && (
            <div className='row pdfpagebreakinsideavoid'>
              <div className='col-12'>
                <CollapseComponent
                  Heading='Corporate Events'
                  index='1'
                  isOpen={false}
                  withoutCollapseComponent={query.print}
                  withoutCollapseWithCard={query.print}
                >
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      gridOptions={gridOptionStockEvents}
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              </div>
            </div>
          )}
          {shell_or_spac && (
            <div className='row pdfpagebreakinsideavoid'>
              <div className='col-12'>
                <CollapseComponent
                  Heading='SPAC/Shell Company'
                  index='1'
                  isOpen={false}
                  withoutCollapseComponent={query.print}
                  withoutCollapseWithCard={query.print}
                >
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      gridOptions={gridOptionShellSPAC}
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

CompanyOverview.propTypes = {
  location: PropTypes.object.isRequired,
  lblPeerGroups: PropTypes.string,
  lstCompanyPeerGroup: PropTypes.array,
  lstOriginalData: PropTypes.array,
};

export default withRouter(React.memo(CompanyOverview));
