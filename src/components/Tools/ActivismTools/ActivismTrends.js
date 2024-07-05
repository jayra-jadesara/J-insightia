import React, { lazy } from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import D3barchart from '../../GeneralForm/D3barchart';
import D3StackBarChart from '../../GeneralForm/D3StackBarChart';
import DropdownList from '../../GeneralForm/DropdownList';
// import messageConst from '../../../constants/MessageConstans';
import '../../../styles/components/_popupTrialUser.scss';
import {
  ACTIVISM_DEFINITION,
  ACTIVISM_OVERVIEW,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import regions from '../../../constants/NationsConstants';
import TrendsConst from '../../../constants/ActivismTrendsConstant';
import { dateToNull } from '../../../utils/general-util';

const yesterDate = new Date(Date.now() - 3600 * 1000 * 24);

const Card = lazy(() => import('../../GeneralForm/Card'));
const ActivismTrends = (props) => {
  const gridOptionsMultipleCompanies = {
    suppressRowTransform: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'Company_name',
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            href={`${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.pid}`}
          >
            {params.data.company_name}
          </a>
        ),
      },
      {
        headerName: 'Number of Campaigns',
        field: 'count_campaigns',
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
    },

    paggination: { isPagging: true, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.lstCompaniesWithMultipleactivistsTrends.map((x) => ({
      ...x,
    })),
  };
  return (
    <Page {...props} key={1}>
      <div>
        <div>
          {/* <Card isHideHeaderDiv> */}
          <div className='row mt-3'>
            <div className='col-sm-6 col-lg-2 text-primary'>
              Select Region :
            </div>
            <div className='col-sm-6 col-lg-3'>
              <DropdownList
                handleChange={async (e) => {
                  await props.handleRegionChange(e);
                }}
                isMulti={false}
                options={props.lstRegionTrade}
                Dvalue={props.selectedRegion}
                placeholder='(Optional) Choose one or more meeting types…'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12 col-lg-6'>
              <p>
                All YTD (year-to-date) figures relate to the period January 1 to{' '}
                {dateToNull(yesterDate, 'mmmm dd', true)} of each year.
              </p>
            </div>
            <div className='col-sm-12 col-lg-6'>
              <a
                style={{ fontWeight: 'bold' }}
                href={ACTIVISM_DEFINITION}
                className='float-end'
              >
                Glossary
              </a>
            </div>
          </div>
          {/* </Card> */}
        </div>
        <div className='row mt-3'>
          {props.companiesTargetedTrendsChartData.length > 0 ? (
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 chart'>
              <D3barchart
                title={`Number of companies publicly subjected to activist campaigns (${props.selectedRegion.label})`}
                data={props.companiesTargetedTrendsChartData}
                keys={['Target']}
                xkeysLabel={['year_action']}
                adjustSize
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'companyInfomation',
                  id: 'company',
                  download: 'DownloadContentforchar135_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              />
            </div>
          ) : null}
          {props.activeActivistsTrendsChartData.length > 0 ? (
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 chart'>
              <D3barchart
                title={`Number of activists publicly subjecting companies to campaigns (${props.selectedRegion.label})`}
                data={props.activeActivistsTrendsChartData}
                keys={['Target']}
                xkeysLabel={['year_action']}
                adjustSize
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'activistInfomation',
                  id: 'activist',
                  download: 'ActiveActivists_data_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              />
            </div>
          ) : null}
          {props.activeCompanyRegiontrendsChartData.length > 0 &&
          Number(props.selectedRegion.value) === regions.GLOBAL_REGION_ID ? (
            <div className='col-lg-6' style={{ height: '600px' }}>
              <Card
                title='Regions of companies publicly subjected to activist campaigns (%)'
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'companyInfomation',
                  id: 'company',
                  download: 'DownloadContentforchar135_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              >
                <D3StackBarChart
                  IsShowCard={false}
                  hideExcelDownloadIcon
                  data={props.activeCompanyRegiontrendsChartData}
                  keys={props.chartKeyCompanyRegion}
                  xkey='year_action'
                  svgHeight={350}
                  dataLegends={[
                    'North America',
                    'Europe',
                    'Asia',
                    'Australasia',
                    'Other',
                  ]}
                  isShowLegend
                  isValueToFixed
                />
              </Card>
            </div>
          ) : null}
          {props.activeCompanyRegiontrendsChartData.length > 0 &&
          Number(props.selectedRegion.value) === regions.GLOBAL_REGION_ID ? (
            <div className='col-lg-6' style={{ height: '600px' }}>
              <Card
                title='Regions of activists publicly subjecting companies to campaigns (%)'
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'activistInfomation',
                  id: 'activist',
                  download: 'ActiveActivists_data_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              >
                <D3StackBarChart
                  IsShowCard={false}
                  data={props.activeActivistsRegiontrendsChartData}
                  keys={props.chartKeyActivistsRegion}
                  xkey='year_action'
                  svgHeight={350}
                  dataLegends={[
                    'North America',
                    'Europe',
                    'Asia',
                    'Australasia',
                    'Other',
                  ]}
                  isShowLegend
                  isValueToFixed
                  hideExcelDownloadIcon
                />
              </Card>
            </div>
          ) : null}
          {props.industryTargetedTrendsChartData !== undefined &&
          props.industryTargetedTrendsChartData.length > 0 ? (
            <div className='col-lg-6' style={{ height: '600px' }}>
              <Card
                title={`Industry Sectors of Companies Publicly Subjected to Activist Campaigns (%) (${props.selectedRegion.label})`}
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'companyInfomation',
                  id: 'company',
                  download: 'DownloadContentforchar135_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              >
                <D3StackBarChart
                  IsShowCard={false}
                  hideExcelDownloadIcon
                  data={props.industryTargetedTrendsChartData}
                  keys={props.chartKeyIndustryTargetedTrends}
                  xkey='year_action'
                  svgHeight={400}
                  dataLegends={props.chartKeyIndustryTargetedTrends}
                  isShowLegend
                  isValueToFixed
                />
              </Card>
            </div>
          ) : null}
          {props.lstCompaniesWithMultipleactivistsTrends !== undefined &&
          props.lstCompaniesWithMultipleactivistsTrends.length > 0 ? (
            <div className='col-lg-6 '>
              <Table
                hideExcelDownloadIcon
                IsShowCard
                gridOptions={gridOptionsMultipleCompanies}
                title={`Popular Stocks: Top 10 companies by number of ongoing activist campaigns (${props.selectedRegion.label})`}
              />
            </div>
          ) : null}
          {props.lstMarketCapbyYearTrends !== undefined &&
          props.lstMarketCapbyYearTrends.length > 0 ? (
            <div className='col-lg-6' style={{ height: '600px' }}>
              <Card
                title={`Market Caps of Companies Publicly Subjected to Activist Campaigns (%)(${props.selectedRegion.label})`}
                isExcelDownload={!props.trialUserDisableDownload}
                handleDownloadExcel={props.handleDownloadExcel}
                item={{
                  name: 'companyInfomation',
                  id: 'company',
                  download: 'DownloadContentforchar135_insightia',
                  parameters: 3,
                  region: props.selectedRegion.value,
                  shortlong: TrendsConst.LONG,
                  public: 'P',
                }}
              >
                <D3StackBarChart
                  IsShowCard={false}
                  hideExcelDownloadIcon
                  data={props.lstMarketCapbyYearTrends}
                  keys={props.chartKeyMarketCapbyYearTrends}
                  xkey='yr'
                  svgHeight={350}
                  dataLegends={['Nano', 'Micro', 'Small', 'Mid', 'Large']}
                  isShowLegend
                  isValueToFixed
                />
              </Card>
            </div>
          ) : null}
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 chart'>
            {props.activeActivistsAUMChartData.length > 0 &&
            (Number(props.selectedRegion.value) === regions.GLOBAL_REGION_ID ||
              Number(props.selectedRegion.value) ===
                regions.NORTH_AMERICA_REGION_ID) ? (
              <div>
                <D3barchart
                  title={`Assets under management for activists (USD Bn)(${props.selectedRegion.label})`}
                  data={props.activeActivistsAUMChartData}
                  keys={['AUM']}
                  xkeysLabel={['year']}
                  adjustSize
                  isExcelDownload={!props.trialUserDisableDownload}
                  handleDownloadExcel={props.handleDownloadExcel}
                  item={{
                    name: 'ActivistAUMData',
                    id: 'AUMTrendsdata',
                    download: 'AumPrimary_Trends',
                    parameters: 1,
                    region: props.selectedRegion.value,
                  }}
                />
              </div>
            ) : null}
            {props.activeActivistsAUMChartData.length > 0 ? (
              <div className='mt-4'>
                <D3barchart
                  title={`Proportion of resolved public activist campaigns at least partially satisfied (%) (${props.selectedRegion.label})`}
                  data={props.successRatesTrendsChartData}
                  keys={['perc']}
                  xkeysLabel={['year_action']}
                  adjustSize
                  isValueToFixed
                  isExcelDownload={!props.trialUserDisableDownload}
                  handleDownloadExcel={props.handleDownloadExcel}
                  item={{
                    name: 'activistcampaignInfomation',
                    id: 'activistcampaign',
                    download: 'StatisticaltrendsLast2_insightia',
                    parameters: 1,
                    region: props.selectedRegion.value,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(ActivismTrends));
