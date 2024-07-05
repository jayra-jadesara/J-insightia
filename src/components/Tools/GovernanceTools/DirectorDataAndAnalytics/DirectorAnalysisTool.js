import React, { lazy } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../Page';
import '../../../../styles/components/_popupTrialUser.scss';
import Table from '../../../GeneralForm/Table';
import { filters } from '../../../../utils/AgGridFunctions';
import { gridWidthDates } from '../../../../utils/table-tools-util';
import D3StackBarChart from '../../../GeneralForm/D3StackBarChart';
import ProcedureConstant from '../../../../constants/ProcedureConstant';
import msgConst from '../../../../constants/MessageConstans';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import { NUMBER_ONE } from '../../../../constants/NumberConstants';

const Card = lazy(() => import('../../../GeneralForm/Card'));
const D3PieChart = lazy(() => import('../../../GeneralForm/D3PieChart'));

const DirectorAnalysisTool = (props) => {
  const getDataJson = [];
  const myJson = [];

  const handleOnChangeAnalysisData = async (e) => {
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.DIRECTOR_DATA_AND_ANALYTICS_TOOL
    );
    props.handleResetSearch();
    const basedValue = e;
    const data1 = {
      gender:
        props.lstGenderSelection.label !== undefined
          ? props.lstGenderSelection.label
          : null,
      tenureFrom: props.tenureFrom !== undefined ? props.tenureFrom : null,
      tenureTo: props.tenureTo !== undefined ? props.tenureTo : null,
      boardFrom: props.boardFrom !== undefined ? props.boardFrom : null,
      boardTo: props.boardTo !== undefined ? props.boardTo : null,
      ageFrom: props.ageFrom !== undefined ? props.ageFrom : null,
      ageTo: props.ageTo !== undefined ? props.ageTo : null,
      company_search_id:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      based_on_data: basedValue === NUMBER_ONE ? 'ALL' : 'Cur'
    };
    await props.getDirectorAnalysisDataReq(data1);
  };

  const gridOptionAvgAge = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 220
      },
      {
        headerName: 'Female',
        field: 'avg_age_fem_sec',
        type: ['autoHeightTrue']
      },
      {
        headerName: 'Male',
        field: 'avg_age_male_sec',
        type: ['autoHeightTrue']
      },
      {
        headerName: 'Sector Average',
        field: 'avg_age_sec',
        type: ['autoHeightTrue']
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.lstAvgDirectorAge.map((x) => ({
      ...x,
      avg_age_fem_sec:
        x.avg_age_fem_sec !== null && x.avg_age_fem_sec !== undefined
          ? x.avg_age_fem_sec.toFixed(2)
          : '',
      avg_age_male_sec:
        x.avg_age_male_sec !== null && x.avg_age_male_sec !== undefined
          ? x.avg_age_male_sec.toFixed(2)
          : '',
      avg_age_sec:
        x.avg_age_sec !== null && x.avg_age_sec !== undefined
          ? x.avg_age_sec.toFixed(2)
          : ''
      // TrialStatus: props.TrialStatus,
      // allowDownload: props.allowDownload,
    }))
  };

  const gridOptionAvgTenure = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 220
      },
      {
        headerName: 'Female',
        field: 'avg_ten_fem',
        type: ['autoHeightTrue']
      },
      {
        headerName: 'Male',
        field: 'avg_ten_male',
        type: ['autoHeightTrue']
      },
      {
        headerName: 'Sector Average',
        field: 'avg_ten',
        type: ['autoHeightTrue']
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.lstAvgDirectorTenure.map((x) => ({
      ...x,
      avg_ten:
        x.avg_ten !== null && x.avg_ten !== undefined
          ? x.avg_ten.toFixed(2)
          : '',
      avg_ten_male:
        x.avg_ten_male !== null && x.avg_ten_male !== undefined
          ? x.avg_ten_male.toFixed(2)
          : '',
      avg_ten_fem:
        x.avg_ten_fem !== null && x.avg_ten_fem !== undefined
          ? x.avg_ten_fem.toFixed(2)
          : ''
      // TrialStatus: props.TrialStatus,
      // allowDownload: props.allowDownload,
    }))
  };

  //  let data = [11,12,13,14,15,16,17,18,19]
  function prepareJson() {
    if (props.lstNoOfBoardWithMaleAndFemale_Org.length > 0) {
      props.lstNoOfBoardWithMaleAndFemale_Org.forEach((item) => {
        if (item.boards !== undefined) {
          const values = item.boards !== undefined && item.boards;
          getDataJson.push(columnHeaderField(values));
        }
      });
    }
    if (props.lstCompaniesWithFemaleDirector_Org.length > 0) {
      props.lstCompaniesWithFemaleDirector_Org.forEach((item) => {
        if (item.number_dir_fem !== undefined) {
          const values =
            item.number_dir_fem !== undefined && item.number_dir_fem;
          myJson.push(columnHeaderField(values));
        }
      });
    }
  }
  function columnHeaderField(element) {
    if (element === 'title') {
      const column = {
        headerName: ' ',
        field: `${element}`,
        type: ['autoHeightTrue'],
        ...gridWidthDates,
        cellRendererFramework: (params) => (
          <div>
            <span style={{ fontWeight: 'bold' }}>{params.data.title}</span>
          </div>
        )
      };
      return column;
    }
    const column = {
      headerName: `${element}`,
      field: `${element}`,
      type: ['autoHeightTrue'],
      ...gridWidthDates
    };
    return column;
  }
  //company with female director
  const gridOptionCompaniesWithFemaleDirector = {
    colDefsMedalsIncluded: myJson,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.lstCompaniesWithFemaleDirector.map((x) => ({
      ...x
      // TrialStatus: props.TrialStatus,
      // allowDownload: props.allowDownload,
    }))
  };
  const gridOptionTotalNoOfBoard = {
    colDefsMedalsIncluded: getDataJson,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.lstNoOfBoardWithMaleAndFemale.map((x) => ({
      ...x
      // TrialStatus: props.TrialStatus,
      // allowDownload: props.allowDownload,
    }))
  };
  prepareJson();

  return (
    <Page {...props} key={1}>
      {props.isLoading ? (
        <>
          <div className='vh-100'>
            <div className='h-50'>
              {props.procedureRunningEstimateTime !== undefined && (
                <ProgressBar
                  avgElapsedTime={props.procedureRunningEstimateTime}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className=''>
          <div className='row'>
            <Card title='Director Appointment Analysis'>
              <div className='row mt-1 pt-1'>
                <div className='col-sm-6' />
                <div className='col-sm-6'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-sm-2' />
                      <div className='col-sm-10 p-2'>
                        <div className='row'>
                          <label htmlFor='inputPassword' className='col-lg-4'>
                            Data Based on:
                          </label>
                          <div className='col-lg-4'>
                            <div className='form-check form-check-inline'>
                              <input
                                className='form-check-input'
                                type='radio'
                                name='chkBasedOn'
                                id='chkYTD'
                                value='Year to Date'
                                onClick={async () => {
                                  await props.handleOnChangeBasedDataChecked(1);
                                  await handleOnChangeAnalysisData(1);
                                }}
                                defaultChecked={props.yearToData}
                                // checked={props.directorData}
                              />
                              <label
                                className='form-check-label'
                                htmlFor='chkYTD'
                              >
                                Current
                              </label>
                            </div>
                          </div>
                          <div className='col-lg-4'>
                            <div className='form-check form-check-inline'>
                              <input
                                className='form-check-input'
                                type='radio'
                                name='chkBasedOn'
                                id='chkCUR'
                                value='Current'
                                onClick={async () => {
                                  await props.handleOnChangeBasedDataChecked(2);
                                  await handleOnChangeAnalysisData(2);
                                }}
                                defaultChecked={props.currentData}
                              />
                              <label
                                className='form-check-label'
                                htmlFor='chkCUR'
                              >
                                Year To Date
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {props.lstDirectorAppointmentAnalysisData0 !== undefined && */}
              <div className='row'>
                {/* {props.lstDirectorAppointmentAnalysisData0.director_appointments !== 0 && props.lstDirectorAppointmentAnalysisData0.director_appointments !== null && */}
                <div className='text-center d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2'>
                  <Card title='No. of Director Appointments'>
                    <div className='row cardISection card1'>
                      <div className='ovr-text' style={{ marginTop: '83px' }}>
                        {/* {props.poisonPillCardData.total_adopted_pills} */}
                        {
                          props.lstDirectorAppointmentAnalysisData0
                            .director_appointments
                        }
                      </div>
                    </div>
                  </Card>
                </div>
                {/* } */}
                {/* {props.lstDirectorAppointmentAnalysisData0.avg_age_fem !== null && props.lstDirectorAppointmentAnalysisData0.avg_age_male !== null && */}
                <div className='text-center d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2'>
                  <Card title='Average Age of Director Appointments'>
                    <div className='row cardISection card1'>
                      <div className='row' style={{ marginTop: '60px' }}>
                        <div className='col-lg-6'>
                          <div className='text-muted '>Female</div>
                          <div className='ovr-text'>
                            {/* {props.poisonPillCardData.total_adopted_pills} */}
                            {Math.round(
                              props.lstDirectorAppointmentAnalysisData0
                                .avg_age_fem
                            )}
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='text-muted'>Male</div>
                          <div className='ovr-text'>
                            {/* {props.poisonPillCardData.total_adopted_pills} */}
                            {Math.round(
                              props.lstDirectorAppointmentAnalysisData0
                                .avg_age_male
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {/* } */}

                <div className='chartArea d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2'>
                  {props.lstGenderDiversityOfDirectorAppointment.length > 0 ? (
                    <D3PieChart
                      data={props.lstGenderDiversityOfDirectorAppointment}
                      cardtitle='Gender Diversity of Director Appointments'
                      isComp={false}
                      isInvest={false}
                      innerRadius={50}
                      outerRadius={100}
                      isDynamicViewbox
                      svgMainHeight={250}
                      svgMainWidth={250}
                      isSetChartPercentage
                    />
                  ) : (
                    <Card title='Gender Diversity of Director Appointments'>
                      {msgConst.NORECORDS}
                    </Card>
                  )}
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-lg-6'>
                  {props.lstAvgDirectorAge.length > 0 ? (
                    <Table
                      IsShowCard
                      title='Director Average Age by Sector'
                      pageTitle='Director Average Age by Sector'
                      gridOptions={gridOptionAvgAge}
                      hideExcelDownloadIcon={props.trialUserDisableDownload}
                    />
                  ) : (
                    <Card title='Director Average Age by Sector'>
                      {msgConst.NORECORDS}
                    </Card>
                  )}
                </div>

                <div className='col-lg-6'>
                  {props.lstAvgDirectorTenure.length > 0 ? (
                    <Table
                      title='Director Average Tenure by Sector'
                      pageTitle='Director Average Tenure by Sector'
                      IsShowCard
                      gridOptions={gridOptionAvgTenure}
                      hideExcelDownloadIcon={props.trialUserDisableDownload}
                    />
                  ) : (
                    <Card title='Director Average Tenure by Sector'>
                      {msgConst.NORECORDS}
                    </Card>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className='row mt-2 mb-3'>
            <Card title='Company Director Analysis'>
              <div className='row'>
                <div className='col-lg-6' style={{ height: '550px' }}>
                  <div className='row mt-2'>
                    {props.lstCompaniesWithFemaleDirector.length > 0 ? (
                      <Table
                        IsShowCard
                        title='Number of Companies with X Current Female Directors'
                        pageTitle='Number of Companies with X Current Female Directors'
                        gridOptions={gridOptionCompaniesWithFemaleDirector}
                        hideExcelDownloadIcon={props.trialUserDisableDownload}
                      />
                    ) : (
                      <Card title='Number of Companies with X Current Female Directors'>
                        {msgConst.NORECORDS}
                      </Card>
                    )}
                  </div>

                  <div className='row mt-2'>
                    {props.lstNoOfBoardWithMaleAndFemale.length > 0 ? (
                      <Table
                        title='Current Number of Boards Directors are on'
                        pageTitle='Current Number of Boards Directors are on'
                        IsShowCard
                        gridOptions={gridOptionTotalNoOfBoard}
                        hideExcelDownloadIcon={props.trialUserDisableDownload}
                      />
                    ) : (
                      <Card title='Current Number of Boards Directors are on'>
                        {msgConst.NORECORDS}
                      </Card>
                    )}
                  </div>
                </div>

                <div className='col-lg-6' style={{ height: '550px' }}>
                  <Card title='Percentage of Companies with X Female Directors by Sector'>
                    {props.lstSectorWithAvgFemaleDirector.length > 0 ? (
                      <D3StackBarChart
                        IsShowCard={false}
                        hideExcelDownloadIcon
                        data={props.lstSectorWithAvgFemaleDirector}
                        keys={props.lstChartKeys}
                        xkey='industry_sector_name'
                        barLabelShowMoreThan={1.5}
                        isVerticalText
                        svgHeight={350}
                        isSetBarPercentage
                        dataLegends={props.lstChartKeys}
                        isShowLegend
                        isValueToFixed
                        ishorizontalLegend
                      />
                    ) : (
                      msgConst.NORECORDS
                    )}
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Page>
  );
};

export default withRouter(React.memo(DirectorAnalysisTool));
