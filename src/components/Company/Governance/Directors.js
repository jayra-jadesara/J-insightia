import PropTypes from 'prop-types';
import React, { lazy, memo } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import {
  COMPANY_SEARCH,
  DIRECTORSHIP_AND_EXECUTIVE,
  GREEN_DOT,
  GREEN_YES_IMG,
  QUERY_DIRECTOR,
  YELLOW_C_DOT,
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import bn from '../../../utils/bemnames';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import Card from '../../GeneralForm/Card';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';

const D3PieChart = lazy(() => import('../../GeneralForm/D3PieChart'));
const D3InterlockingDirector = lazy(() =>
  import('../../GeneralForm/D3InterlockingDirectors')
);

const CompanyGovernanceDirectors = ({
  location,
  directorInfo,
  independentGraphData,
  tenureGraphData,
  genderGraphData,
  committeeHeaders,
  currDirectorsProf,
  pastDirectorsProf,
  interlockingDirectors,
  interlockingDirectors_NodesArr,
  interlockingDirectors_LinksArr,
  TrialLog,
  isLoadingData,
  TrialUser,
  TrialUserDisableDownload,
  getCompDirUpcomData,
  visibleEthnicityColumn,
  EthnicityChartData,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bem = bn.create(
    query.print ? 'governanceDirectorsPDF' : 'governanceDirectors'
  );
  const bemCard = bn.create('myCard');

  const { width } = useWindowDimensions();
  const breakpoint = 768;

  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  // "getCommittee(commit, strCommittee, iDirectorID)" Function declare in 'companyRoutes.js'

  if (isLoadingData) {
    return (
      <Page key={1} className={bem.b('pt-3')}>
        {LOADING}
      </Page>
    );
  }

  // #region "columnsArray" : Add Dynamic columns
  function getCommitteeImage(strCommittee, arrCommittee, iDirectorID) {
    let boolGreen = false;
    let boolYellow = false;

    arrCommittee.forEach((e) => {
      if (e.comm_name === strCommittee) {
        if (e.chair_director_id === iDirectorID) {
          boolYellow = true;
        }
        boolGreen = true;
      }
    });

    if (boolYellow) {
      return (
        <img
          src={`${window.location.origin}${YELLOW_C_DOT}`}
          alt='Committee Chair'
          title='Committee Chair'
        />
      );
    }

    if (boolGreen) {
      return (
        <img
          src={`${window.location.origin}${GREEN_DOT}`}
          alt='Committee'
          title='Committee'
        />
      );
    }

    return null;
  }
  function setCommitteeHeadersPlusCode(header) {
    return {
      headerName: header.comm_name_abb,
      field: header.comm_name,
      headerTooltip: header.comm_name,
      cellClass: TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
        : 'ws-normal-lh24 ps-1 pe-1 text-center',
      cellRendererFramework: (params) =>
        getCommitteeImage(
          header.comm_name,
          params.data.commit,
          params.data.Director_id
        ),
    };
  }
  function setCommitteeHeaders() {
    let a = [];
    if (committeeHeaders.length > numConst.EMPTY_TABLE_LENGTH) {
      if (committeeHeaders.length === numConst.NUMBER_ONE) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header) => ({
            minWidth: query.print ? 105 : 80,
            maxWidth: query.print ? 105 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (committeeHeaders.length === numConst.NUMBER_TWO) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header) => ({
            minWidth: query.print ? 103 : 80,
            maxWidth: query.print ? 103 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (committeeHeaders.length === numConst.NUMBER_THREE) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header) => ({
            minWidth: query.print ? 102 : 80,
            maxWidth: query.print ? 102 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (committeeHeaders.length === numConst.NUMBER_FOUR) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 116 : 80,
                maxWidth: query.print ? 116 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 70 : 80,
              maxWidth: query.print ? 70 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === numConst.NUMBER_FIVE) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 110 : 80,
                maxWidth: query.print ? 110 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: 60,
              maxWidth: query.print ? 60 : 90,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === numConst.NUMBER_SIX) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 105 : 80,
                maxWidth: query.print ? 105 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 60 : 80,
              maxWidth: query.print ? 60 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === numConst.NUMBER_SEVEN) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 100 : 80,
                maxWidth: query.print ? 100 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 64 : 80,
              maxWidth: query.print ? 64 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === 8) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 110 : 50,
                maxWidth: query.print ? 110 : 70,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 55 : 50,
              maxWidth: query.print ? 55 : 70,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === 9) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 105 : 80,
                maxWidth: query.print ? 105 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 50 : 80,
              maxWidth: query.print ? 50 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === 10) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 102 : 80,
                maxWidth: query.print ? 102 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length === 11) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 104 : 80,
                maxWidth: query.print ? 104 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (committeeHeaders.length >= 12) {
        a =
          committeeHeaders !== undefined &&
          committeeHeaders.map((header, index) => {
            index += 1;
            if (index === committeeHeaders.length) {
              return {
                minWidth: query.print ? 100 : 80,
                maxWidth: query.print ? 100 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
    }
    return a;
  }
  // #endregion

  function name_stringWidth() {
    const committeeHeadersCount = committeeHeaders.length;
    if (!query.print) {
      return {
        minWidth: 200,
        maxWidth: null,
      };
    }
    if (query.print) {
      if (committeeHeadersCount === numConst.NUMBER_ONE) {
        return {
          minWidth: 650,
          maxWidth: 650,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_TWO) {
        return {
          minWidth: 550,
          maxWidth: 550,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_THREE) {
        return {
          minWidth: 450,
          maxWidth: 450,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_FOUR) {
        return {
          minWidth: 430,
          maxWidth: 430,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_FIVE) {
        return {
          minWidth: 405,
          maxWidth: 405,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_SIX) {
        return {
          minWidth: 350,
          maxWidth: 350,
        };
      }
      if (committeeHeadersCount === numConst.NUMBER_SEVEN) {
        return {
          minWidth: 270,
          maxWidth: 270,
        };
      }
      if (committeeHeadersCount === 8) {
        return {
          minWidth: 260,
          maxWidth: 260,
        };
      }
      if (committeeHeadersCount === 9) {
        return {
          minWidth: 250,
          maxWidth: 250,
        };
      }
      if (committeeHeadersCount === 10) {
        return {
          minWidth: 220,
          maxWidth: 220,
        };
      }
      if (committeeHeadersCount === 11) {
        return {
          minWidth: 170,
          maxWidth: 170,
        };
      }
      if (committeeHeadersCount >= 12) {
        return {
          minWidth: 150,
          maxWidth: 150,
        };
      }
    }
  }

  const columnsArray = setCommitteeHeaders();

  const gridOptionCurrentDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'name_string',
        type: ['autoHeightTrue'],
        ...name_stringWidth(),
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) => {
          if (params.data !== undefined) {
            const eDiv = document.createElement('div');

            function getAnchorTag(imgAlt, imgName, imgTitle) {
              const hrefStr = `${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.Director_id}`;
              const aStr = `<a class="text-secondary" rel="noopener noreferrer" href="${hrefStr}" alt="${imgAlt}" title="${imgTitle}">${imgName}</a>`;
              return aStr;
            }

            eDiv.innerHTML = getAnchorTag('', params.data.name_string, '');

            if (params.data.activist === numConst.NUMBER_ONE) {
              const strTitle =
                params.data.commit.length > 0
                  ? params.data.commit[0].nom_names
                  : '';
              eDiv.innerHTML += getAnchorTag('Activist', '(ACT)', strTitle);
            }
            if (params.data.ceo === numConst.NUMBER_ONE) {
              eDiv.innerHTML += getAnchorTag('CEO', '(CEO)', '');
            }
            if (params.data.chair === numConst.NUMBER_ONE) {
              eDiv.innerHTML += getAnchorTag('chair', '(CH)', '');
            }
            if (params.data.leaddir === numConst.NUMBER_ONE) {
              eDiv.innerHTML += getAnchorTag('Lead Director', '(LD)', '');
            }
            if (params.data.pres_dir === numConst.NUMBER_ONE) {
              eDiv.innerHTML += getAnchorTag('Presiding Director', '(PD)', '');
            }

            if (params.data.director_end_date) {
              eDiv.innerHTML += `<img src="/images/icons/SmallWarningIcon.png" alt="icon" title="Departing as ${
                params.data.director_type
              } on ${
                params.data.director_end_date
                  ? dateToNull(params.data.director_end_date, 'dd-mmm-yy', true)
                  : ''
              }">`;
            }
            return eDiv;
          }
        },
      },
      {
        headerName: 'Gender',
        field: 'Gender',
        minWidth: query.print ? 52 : 70,
        maxWidth: query.print ? 52 : 70,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Ethnicity',
        field: 'ethnicity_name',
        minWidth: query.print ? 52 : 70,
        maxWidth: query.print ? 52 : 70,
        type: visibleEthnicityColumn
          ? ['autoHeightTrue', 'nonHiddenField']
          : ['autoHeightTrue', 'hiddenField'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Age',
        field: 'Age',
        minWidth: query.print ? 45 : 60,
        maxWidth: query.print ? 45 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Tenure',
        field: 'Tenure',
        headerTooltip: 'Tenure (years)',
        minWidth: query.print ? 45 : 62,
        maxWidth: query.print ? 45 : 62,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Boards',
        field: 'total_comms',
        headerTooltip: 'Current number of boards director is on',
        minWidth: query.print ? 45 : 60,
        maxWidth: query.print ? 45 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Independence',
        field: 'Independent',
        headerTooltip: 'Director is independent',
        minWidth: query.print ? 45 : 62,
        maxWidth: query.print ? 45 : 105,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) => {
          if (params.data.Independent === 'Independent') {
            return (
              <img
                src={`${window.location.origin}${GREEN_YES_IMG}`}
                alt='independent'
                title='independent'
              />
            );
          }
          return null;
        },
      },
      // {
      //   headerName: 'Prev Yr Comp.',
      //   field: 'P_YR_COMP',
      //   headerTooltip: 'Previous Year Compensation',
      //   ...gridWidthValues,
      // },
      {
        headerName: 'Latest Vote (%)',
        field: 'latest_vote',
        headerTooltip: 'AuditPrevious Year Vote (%)',
        minWidth: query.print ? 48 : 90,
        maxWidth: query.print ? 48 : 90,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      // {
      //   headerName: 'Ownership',
      //   field: 'campaign_end_date',
      //   ...gridWidthValues,
      // },
      ...columnsArray,
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 80,
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'name_string',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false },
    immutableData: true,
    isfloatingFilter: false,
    rowData:
      currDirectorsProf !== undefined &&
      currDirectorsProf.map((x) => ({
        ...x,
        TrialStatus: TrialUser,
      })),
  };

  const gridOptionUpcomingDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'name',
        type: ['autoHeightTrue'],
        // ...name_stringWidth(),
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" 
                            href="${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.director_id}">
                            ${params.data.name}</a>`;

          if (params.data.activist === numConst.NUMBER_ONE) {
            eDiv.innerHTML += `<a class="text-secondary" href="${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.Director_id}" alt="Activist" title="${params.data.commit[0].nom_names}"> (ACT)</a>`;
          }
          return eDiv;
        },
      },
      {
        headerName: 'Age',
        field: 'age',
        // minWidth: query.print ? 45 : 60,
        // maxWidth: query.print ? 45 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Event',
        field: 'event_type',
        headerTooltip: 'Tenure (years)',
        // minWidth: query.print ? 45 : 60,
        // maxWidth: query.print ? 45 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Position(s)',
        field: 'director_type',
        headerTooltip: 'Position(s)',
        // minWidth: query.print ? 45 : 60,
        // maxWidth: query.print ? 45 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Date',
        field: 'Director_since',
        // minWidth: query.print ? 48 : 90,
        // maxWidth: query.print ? 48 : 90,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 80,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      getCompDirUpcomData !== undefined &&
      getCompDirUpcomData.map((x) => ({
        ...x,
        TrialStatus: TrialUser,
        Director_since:
          x.Director_since !== null
            ? dateToNull(x.Director_since, 'dd-mmm-yy', true)
            : '',
      })),
  };

  const gridOptionPastDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'name_string',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 790 : 300,
        maxWidth: query.print ? 790 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer"
                             href="${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.Director_id}">
                             ${params.data.name_string}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Gender',
        field: 'Gender',
        minWidth: query.print ? 52 : 52,
        maxWidth: query.print ? 52 : 100,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Age',
        field: 'Age',
        minWidth: query.print ? 45 : 50,
        maxWidth: query.print ? 45 : 100,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Tenure',
        field: 'Tenure',
        minWidth: query.print ? 45 : 50,
        maxWidth: query.print ? 45 : 100,
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Date Left',
        field: 'Director_end_date',
        minWidth: query.print ? 103 : 60,
        maxWidth: query.print ? 103 : 120,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: 'rightAligned',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left',
        },
      ],
    },
    immutableData: true,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      pastDirectorsProf !== undefined &&
      pastDirectorsProf.map((x) => ({
        ...x,
        TrialStatus: TrialUser,
        Director_end_date:
          x.Director_end_date !== null
            ? dateToNull(x.Director_end_date, 'dd-mmm-yy', true)
            : '',
      })),
  };

  function getAverage_Tenure(Average_Tenure) {
    return (
      <div className={TrialUser ? 'row blurrytext' : 'row'}>
        <span className='ovr-text col-12'>
          {checkValuesToFixed(Average_Tenure, 1)}
        </span>
        <span className='text-muted col-12'>years</span>
      </div>
    );
  }
  function getAverage_Age(Average_Age_US) {
    return (
      <div className={TrialUser ? 'row blurrytext' : 'row'}>
        <span className='ovr-text col-12'>
          {checkValuesToFixed(Average_Age_US, 1)}
        </span>
        <span className='text-muted col-12'>years old</span>
      </div>
    );
  }

  function getEthnicityChart() {
    if (EthnicityChartData !== undefined && EthnicityChartData.length > 0) {
      return (
        <div className='chartArea d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
          <D3PieChart
            data={EthnicityChartData}
            isComp={false}
            isInvest={false}
            cardtitle='Ethnicity Breakdown'
            innerRadius={query.print ? 40 : 50}
            outerRadius={query.print ? 80 : 100}
            TrialUser={TrialUser}
          />
        </div>
      );
    }
  }
  function getCombineAverageTenureNAgeCard(Average_Tenure, Average_Age_US) {
    return (
      <div className='text-center d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
        <div className={bemCard.b('card justify-content-around cursor-auto')}>
          <div className='text-primary cardheader'>
            <div className='cardTitle'>
              <div className='d-inline-block divTitle w-100'>
                <div className='titleSelection' title='Average Tenure'>
                  <h3>Average Tenure</h3>
                </div>
              </div>
            </div>
            <div className='card-body slideBottomToUp d-block pt-0'>
              {getAverage_Tenure(Average_Tenure)}
            </div>
          </div>
          <div className='text-primary cardheader'>
            <div className='cardTitle'>
              <div className='d-inline-block divTitle w-100 pt-1'>
                <div className='titleSelection' title='Average Age'>
                  <h3>Average Age</h3>
                </div>
              </div>
            </div>
            <div className='card-body slideBottomToUp d-block pt-0'>
              {getAverage_Age(Average_Age_US)}
            </div>
          </div>
        </div>
      </div>
    );
  }

    if (!isLoadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }

  return (
    <Page
      {...{
        location,
        directorInfo,
        independentGraphData,
        tenureGraphData,
        genderGraphData,
        currDirectorsProf,
        pastDirectorsProf,
        interlockingDirectors,
        interlockingDirectors_NodesArr,
        interlockingDirectors_LinksArr,
      }}
      key={1}
      className={bem.b('pt-3')}
    >
      <div className='' id='loadItem'>
        <div className='row pt-2'>
          {directorInfo !== undefined && Object.keys(directorInfo).length > 0 && (
            <>
              <div className='text-center d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
                <Card title='Number of Directors'>
                  <div className={TrialUser ? 'row blurrytext' : 'row'}>
                    <span className='ovr-text col-12'>
                      {directorInfo.No_of_Directors}
                    </span>
                    <span className='text-muted col-12'>total</span>
                  </div>
                </Card>
              </div>
              {visibleEthnicityColumn ? (
                <>
                  {getCombineAverageTenureNAgeCard(
                    directorInfo.Average_Tenure,
                    directorInfo.Average_Age_US
                  )}
                  {getEthnicityChart()}
                </>
              ) : (
                <>
                  <div className='text-center d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
                    <Card title='Average Tenure'>
                      {getAverage_Tenure(directorInfo.Average_Tenure)}
                    </Card>
                  </div>
                  <div className='text-center d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
                    <Card title='Average Age'>
                      {getAverage_Age(directorInfo.Average_Age_US)}
                    </Card>
                  </div>
                </>
              )}
            </>
          )}

          {Object.keys(independentGraphData).length > 0 && (
            <div className='chartArea d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
              <ErrorBoundary hasCard cardtitle='Director Independence'>
                <D3PieChart
                  data={[
                    {
                      text: 'Independent',
                      value: independentGraphData.Independent,
                    },
                    {
                      text: 'Non-Independent',
                      value: independentGraphData['Non-Independent'],
                    },
                  ]}
                  isComp={false}
                  isInvest={false}
                  cardtitle='Director Independence'
                  innerRadius={query.print ? 40 : 50}
                  outerRadius={query.print ? 80 : 100}
                  TrialUser={TrialUser}
                />
              </ErrorBoundary>
            </div>
          )}

          {Object.keys(tenureGraphData).length > 0 && (
            <div className='chartArea d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
              <ErrorBoundary hasCard cardtitle='Tenure Length'>
                <D3PieChart
                  data={[
                    { text: '0-2 Years', value: tenureGraphData['0-2'] },
                    { text: '3-5 Years', value: tenureGraphData['3-5'] },
                    { text: '6-10 Years', value: tenureGraphData['6-10'] },
                    { text: '11-15 Years', value: tenureGraphData['11-15'] },
                    { text: '> 15 Years', value: tenureGraphData['> 15'] },
                  ]}
                  isComp={false}
                  isInvest={false}
                  cardtitle='Tenure Length'
                  innerRadius={query.print ? 40 : 50}
                  outerRadius={query.print ? 80 : 100}
                  TrialUser={TrialUser}
                />
              </ErrorBoundary>
            </div>
          )}

          {Object.keys(genderGraphData).length > 0 && (
            <div className='chartArea d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 pb-2'>
              <ErrorBoundary hasCard cardtitle='Gender Breakdown'>
                <D3PieChart
                  data={[
                    { text: 'Female', value: genderGraphData.Female },
                    { text: 'Male', value: genderGraphData.Male },
                  ]}
                  isComp={false}
                  isInvest={false}
                  cardtitle='Gender Breakdown'
                  innerRadius={query.print ? 40 : 50}
                  outerRadius={query.print ? 80 : 100}
                  TrialUser={TrialUser}
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
        <div className='row pt-3'>
          {currDirectorsProf.length > 0 ? (
            <div className='col-lg-12 '>
              <ErrorBoundary hasCard cardtitle='Current Directors'>
                <Table
                  IsShowCard
                  isHide={false}
                  smalltitle=''
                  gridOptions={gridOptionCurrentDirectors}
                  title='Current Directors'
                  pageTitle='Current Directors'
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                />
              </ErrorBoundary>
            </div>
          ) : (
            <Card title='Current Directors'>{NORECORDS}</Card>
          )}
        </div>
        <div className='row pt-3'>
          {getCompDirUpcomData.length > 0 && (
            <div className='col-lg-12 '>
              <ErrorBoundary
                hasCard
                cardtitle='Upcoming Appointments / Departures'
              >
                <Table
                  IsShowCard
                  isHide={false}
                  smalltitle=''
                  gridOptions={gridOptionUpcomingDirectors}
                  title='Upcoming Appointments / Departures'
                  pageTitle='Upcoming Appointments / Departures'
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
        <div className='row pdfpagebreak pt-2'>
          <div className='col-lg-12'>
            {pastDirectorsProf.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Past Directors'>
                <Table
                  IsShowCard
                  isHide={false}
                  smalltitle=''
                  gridOptions={gridOptionPastDirectors}
                  title='Past Directors'
                  pageTitle='Past Directors'
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Past Directors'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pdfpagebreak pt-2'>
          <div className='col-lg-12'>
            {Object.keys(interlockingDirectors).length > 0 &&
            interlockingDirectors_NodesArr.length > 0 &&
            interlockingDirectors_LinksArr.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Interlocking Directorates'>
                <D3InterlockingDirector
                  cardtitle='Interlocking Directorates'
                  data={
                    typeof interlockingDirectors === 'string'
                      ? interlockingDirectors !== null && interlockingDirectors !== undefined ? JSON.parse(interlockingDirectors) : {}
                      : interlockingDirectors
                  }
                  TrialUser={TrialUser}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Interlocking Directorates'>{NORECORDS}</Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

CompanyGovernanceDirectors.propTypes = {
  committeeHeaders: PropTypes.array,
  currDirectorsProf: PropTypes.array,
  directorInfo: PropTypes.object,
  genderGraphData: PropTypes.object,
  independentGraphData: PropTypes.object,
  interlockingDirectors: PropTypes.any,
  interlockingDirectors_NodesArr: PropTypes.array,
  interlockingDirectors_LinksArr: PropTypes.array,
  location: PropTypes.any,
  pastDirectorsProf: PropTypes.array,
  tenureGraphData: PropTypes.object,
  TrialLog: PropTypes.any,
  isLoadingData: PropTypes.any,
};

CompanyGovernanceDirectors.defaultProps = {
  committeeHeaders: [],
  currDirectorsProf: [],
  directorInfo: {},
  genderGraphData: {},
  independentGraphData: {},
  interlockingDirectors: undefined,
  interlockingDirectors_NodesArr: [],
  interlockingDirectors_LinksArr: [],
  pastDirectorsProf: [],
  tenureGraphData: {},
  TrialLog: undefined,
  isLoadingData: undefined,
};

export default memo(withRouter(CompanyGovernanceDirectors));
