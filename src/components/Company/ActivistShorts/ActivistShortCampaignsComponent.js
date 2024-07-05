import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import Table from '../../GeneralForm/Table';
import {
  DOCS_INSIGHTIA_COM_REPORTS,
  GREEN_YES_IMG,
  QUERY_AND_ID,
  RED_CROSS_IMG,
  INVESTOR_ACTIVISM_CAMPAIGNS,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW
} from '../../../constants/PathsConstant';
import {
  checkValuesToFixed,
  setCellStyleFinancial,
  buildVerticleTable
} from '../../../utils/table-tools-util';
import Card from '../../GeneralForm/Card';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import { NORECORDS } from '../../../constants/MessageConstans';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import { filters } from '../../../utils/AgGridFunctions';
import numConst from '../../../constants/NumberConstants';
import DropdownList from '../../GeneralForm/DropdownList';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ActivistShortCampaignsComponent = ({
  location,
  TrialLog,
  aiSInvestorForCompanyrowData,
  tbl_avdviser_activist_short,
  aiSActivismSummaryrowData,
  ddlForCampaingData,
  ddlShortSellerCampaignData,
  handleShortSellerCampaign,
  ddlShortSellertSelectedVal,
  sectionNo,
  TrialStatus,
  TrialUser,
  investor_data,
  // tbl_avdviser_activist_short
  TrialUserDisableDownload
}) => {
  function multiCompany(params) {
    let itemArr = [];
    if (params.data !== undefined) {
    itemArr = params.data.campaign_name
      .replace(/, Inc/gi, ' Inc')
      .split(',')
      .filter((item) => item);
    }
    return itemArr;
  }

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  // let aisSelectedData;
  const [aisSelectedData, setAisSelectedData] = useState();
  // Position within the array that the company exists at
  const [selectedActivistLocation, setSelectedActivistLocation] = useState(0);
  // subtables
  const [selectedActivistFollower, setSelectedActivistFollower] = useState([]);
  const [selectedActivistFollowerJSON, setSelectedActivistFollowerJSON] =
    useState({});
  const [selectedActivistCampaignJSON, setSelectedActivistCampaignJSON] =
    useState({});

  const [selectedActivistDetails, setSelectedActivistDetails] = useState({});
  const [selectedActivistFilings, setSelectedActivistFilings] = useState([]);
  // used to trigger reload action
  const [isLoading, setIsLoading] = useState(true);

  // pdf viewer
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');

  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };

  const handleCloseModelPopup = () => {
    setIsModalPopupVisible(false);
  };

  // handles failed link - when user clicks OK takes to failed URL, else closes modal
  const handleOKModelPopup = () => {
    window.open(linkFileName, '_blank').focus();
  };

  async function checkLink(file_name) {
    let url = file_name;
    if (file_name.search('.pdf') > 0) {
      url = `${DOCS_INSIGHTIA_COM_REPORTS}${file_name}`;
    }
    const exists = await ifUrlExist(url);
    if (exists) {
      return true;
    }

    // otherwise open warning modal
    setIsModalPopupVisible(true);
    // set state for url to continue in modal
    setLinkFileName(file_name);
    return false;
  }

  useEffect(() => {
    if (
      ddlShortSellertSelectedVal !== undefined &&
      ddlShortSellerCampaignData !== undefined &&
      ddlShortSellerCampaignData.length > 0
    ) {
      if (ddlShortSellerCampaignData.includes(ddlShortSellertSelectedVal)) {
        setSelectedActivistLocation(Number(ddlShortSellertSelectedVal.value));
      } else {
        if (ddlShortSellerCampaignData[0].value !== undefined) {
          setSelectedActivistLocation(Number(ddlShortSellerCampaignData[0].value));
        }
      }
    } else if (
      ddlShortSellerCampaignData !== undefined &&
      ddlShortSellerCampaignData.length > 0 &&
      ddlShortSellerCampaignData[0].value !== undefined) {
      setSelectedActivistLocation(Number(ddlShortSellerCampaignData[0].value));
    }
  }, [
    setSelectedActivistLocation,
    ddlShortSellertSelectedVal,
    ddlShortSellerCampaignData
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    // if the investor data exists and then each subtable exists assign the value to the state
    if (aiSInvestorForCompanyrowData.length > 0) {
      const result = aiSInvestorForCompanyrowData.filter(
        (x) => x.campaign_summary_id === selectedActivistLocation
      );
      if (result.length > 0) {
        if (typeof result[0].campaignFollowerReturns !== 'undefined') {
          // captures as an array for table and as a JSON for the verticle table
          setSelectedActivistFollower(result[0].campaignFollowerReturns);
          setSelectedActivistFollowerJSON(result[0].campaignFollowerReturns[0]);
        }
        if (typeof result[0].campaignCompanyReturns !== 'undefined') {
          setSelectedActivistCampaignJSON(result[0].campaignCompanyReturns[0]);
        }
        if (typeof result[0].campaignDetails[0] !== 'undefined') {
          setSelectedActivistDetails(result[0].campaignDetails[0]);
        }
        if (typeof result[0].companyFilings !== 'undefined') {
          setSelectedActivistFilings(result[0].companyFilings);
        }
      }
    }
    setIsLoading(false);
    return function cleanup() {
      setSelectedActivistLocation(undefined);
      abortController.abort();
    };
  }, [
    setSelectedActivistFollower,
    setSelectedActivistLocation,
    query.cmpid,
    aiSInvestorForCompanyrowData,
    selectedActivistLocation
  ]);

  // when the users are changed set the activist location, trigger reload to fadeIn
  const handleChange = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
    handleShortSellerCampaign(e);
    setSelectedActivistLocation(
      ddlShortSellertSelectedVal > 0 && ddlShortSellertSelectedVal.value !== undefined
        ? ddlShortSellertSelectedVal.value
        : e.value
    );
  };

  // Details (announcement) table
  const gridOptionDetailsVerticle = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Announcement',
        field: 'key',
        minWidth: query.print ? 200 : 230,
        maxWidth: query.print ? 200 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: '',
        field: 'value',
        minWidth: 105,
        maxWidth: query.print ? 105 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer1: (params) => {
          const eDiv = document.createElement('div');
          if (params.data !== undefined && params.data.value !== undefined && params.data.value !== null && params.data.value === 'Green') {
            eDiv.innerHTML = `<img alt='${params.data.value}' src='${window.location.origin}${GREEN_YES_IMG}'></img>`;
          } else if (
            params.data !== undefined &&
            params.data.value !== undefined &&
            params.data.value !== null &&
            params.data.value === 'Red'
          ) {
            eDiv.innerHTML = `<img alt='${params.data.value}' src='${window.location.origin}${RED_CROSS_IMG}'></img>`;
          } else {
            eDiv.innerHTML = `${
              params.data !== undefined && params.data.value !== undefined && params.data.value !== null ? params.data.value : ''
            }`;
          }
          return eDiv;
        },
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data !== undefined && params.data.value !== undefined && params.data.value !== null && params.data.value === 'Green') {
            eDiv.innerHTML = `<img alt='${params.data.value}' src='${window.location.origin}${GREEN_YES_IMG}'></img>`;
          } else if (
            params.data !== undefined &&
            params.data.value !== undefined &&
            params.data.value !== null &&
            params.data.value === 'Red'
          ) {
            eDiv.innerHTML = `<img alt='${params.data.value}' src='${window.location.origin}${RED_CROSS_IMG}'></img>`;
          } else {
            eDiv.innerHTML = `${
              params.data !== undefined && params.data.value !== undefined && params.data.value !== null
                ? checkValuesToFixed(params.data.value)
                : ''
            }`;
          }
          return eDiv;
        }
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: buildVerticleTable(
      {
        announce_date: dateToNull(
          selectedActivistDetails.announce_date,
          'dd-mmm-yy',
          true
        ),
        announce_method: selectedActivistDetails.announce_method,
        full_report:
          selectedActivistDetails.full_report === 'True' ? 'Green' : 'Red',
        latest_close_value: selectedActivistDetails.latest_close_value,
        price_target: selectedActivistDetails.price_target,
        close_on_announce: selectedActivistDetails.close_on_announce,
        Market_cap_at_announce: checkValuesToFixed(
          selectedActivistDetails.Market_cap_at_announce
        ),
        campaign_end_date: dateToNull(
          selectedActivistDetails.campaign_end_date,
          'dd-mmm-yy',
          true
        )
      },
      ''
    ).map((x) => ({ ...x, TrialStatus: TrialStatus }))
  };

  // campaign returns table
  const gridOptionsCampaignReturnsVerticle = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Campaign Returns',
        field: 'key',
        minWidth: query.print ? 200 : 230,
        maxWidth: query.print ? 200 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: '%',
        field: 'value',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 105,
        maxWidth: query.print ? 105 : null,
        type: ['autoHeightTrue'],
        cellRendererFramework: (params) =>
        params.data !== undefined && params.data.value !== undefined && params.data.value !== null && params.data.value !== '' ? params.data.value : '',
        cellClassRules: {
          redFont: (params) => params.data.value < 0,
          greenFont: (params) => params.data.value > 0
        },
        cellStyle: (params) =>
        params.data !== undefined && params.data.value !== undefined && params.data.value !== '' && setCellStyleFinancial(params.data.value)
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: buildVerticleTable(selectedActivistCampaignJSON, 'Campaign').map(
      (x) => ({
        ...x,
        value:
          x.value !== null || x.value !== undefined
            ? checkValuesToFixed(x.value)
            : '',
        TrialStatus: TrialStatus
      })
    )
  };

  // follower returns table
  const gridOptionsFollowerReturnsVerticle = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Follower Returns',
        field: 'key',
        minWidth: query.print ? 200 : 230,
        maxWidth: query.print ? 200 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: '%',
        field: 'value',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 105,
        maxWidth: query.print ? 105 : null,
        cellRendererFramework: (params) =>
        params.data !== undefined && params.data.value !== undefined && params.data.value !== null && params.data.value !== '' ? params.data.value : '',
        cellClassRules: {
          redFont: (params) => params.data.value < 0,
          greenFont: (params) => params.data.value > 0
        },
        cellStyle: (params) =>
        params.data !== undefined && params.data.value !== undefined && params.data.value !== '' && setCellStyleFinancial(params.data.value)
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: buildVerticleTable(selectedActivistFollowerJSON, 'Follower').map(
      (x) => ({
        ...x,
        value:
          x.value !== null || x.value !== undefined
            ? checkValuesToFixed(x.value)
            : '',
        TrialStatus: TrialStatus
      })
    )
  };

  // activist filings table
  const gridOptionsActivistFilings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'event_date',
        minWidth: query.print ? 150 : 100,
        maxWidth: query.print ? 150 : 120,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Description',
        field: 'document_description',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 734 : 1000,
        maxWidth: query.print ? 734 : null
      },
      {
        headerName: 'Link',
        field: 'file_name',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: query.print ? 150 : 100,
        maxWidth: query.print ? 150 : null,
        cellRendererFramework: (params) => {
          if (params.data.file_name === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.file_name}
              >
                View
              </a>
            );
          }
          return (
            <a
              className='link-primary text-secondary'
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => {
                if (!TrialUserDisableDownload) {
                  e.preventDefault();
                  checkLink(params.data.file_name).then((exists) => {
                    if (exists) {
                      window.open(params.data.file_name, '_blank');
                    }
                  });
                }
              }}
            >
              View
            </a>
          );
        }
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: !query.print, pageSize: 20 },
    isfloatingFilter: false,
    rowData: selectedActivistFilings.map((x) => ({
      ...x,
      event_date: x.event_date
        ? dateToNull(x.event_date, 'dd-mmm-yy', true)
        : '',
      TrialStatus: TrialStatus
    }))
  };

  // timeline table
  const gridOptionsActivismSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'summary_date',
        minWidth: 90,
        maxWidth: query.print ? 90 : 120,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Summary',
        field: 'summary_text',
        type: ['autoHeightTrue'],
        minWidth: 944,
        maxWidth: query.print ? 944 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: !query.print, pageSize: 20 },
    isfloatingFilter: false,
    rowData: aiSActivismSummaryrowData.map((x) => ({
      ...x,
      summary_date: x.summary_date
        ? dateToNull(x.summary_date, 'dd-mmm-yy', true)
        : '',
      TrialStatus: TrialStatus
    }))
  };

  const gridOptions_Advisors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 734,
        maxWidth: query.print ? 734 : null,
        cellRendererFramework: (params) =>
          multiCompany(params).map((d, i) => (
            <a
              rel='noopener noreferrer'
              className='text-secondary'
              href={`${INVESTOR_ACTIVISM_CAMPAIGNS}?investor=${params.data.investor_id
                .split(',')
                [i].trim()}`}
            >
              {d}
              {params.data.investor_id.split(',').length === i + 1 ? '' : ' ,'}
            </a>
          ))
      },
      {
        headerName: 'Intermediary Type',
        field: 'IntermediaryType',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Acting For',
        field: 'acting_for',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'proponent_name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: tbl_avdviser_activist_short.map((x) => ({
      ...x,
      TrialStatus: TrialStatus
      // allowDownload: allowDownload,
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight
    }
  };

  const gridAdviserOptions = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Adviser Name',
        field: 'name',
        type: ['autoHeightTrue'],
        cellClass: TrialLog
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 50,
        maxWidth: query.print ? 734 : 250
      },
      {
        headerName: 'Adviser Role',
        field: 'AdviserRole',
        type: ['autoHeightTrue'],
        minWidth: 30,
        maxWidth: query.print ? 150 : 120,
        cellClass: TrialLog
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Hired by',
        field: 'HiredBy',
        type: ['autoHeightTrue'],
        minWidth: 30,
        maxWidth: query.print ? 150 : 120,
        cellClass: TrialLog
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Details',
        field: 'Details',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: query.print ? 150 : null,
        cellClass: TrialLog
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: tbl_avdviser_activist_short.map((x) => ({
      ...x,
      TrialLog: TrialLog
    }))
  };

  React.useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoading]);

  return (
    <>
      {isModalPopupVisible && (
        <Modal
          show
          isCancelButtonFooter
          handleClose={handleCloseModelPopup}
          handleOK={handleOKModelPopup}
          title='Warning'
          isInfo
        >
          <FailedLink />
        </Modal>
      )}
      <LightBoxPDFViewer
        handleCloseModelPopup={handlePDFModal}
        viewModalPopup={isPDFModal}
        handleSetBtnIdForExpandData={handlePDFModal}
        viewPDFFileName={`${DOCS_INSIGHTIA_COM_REPORTS}${pdfFileName}`}
        pdfTitle={pdfTitleName}
        IsShowCard
        isShowFooter
      />

      {aiSInvestorForCompanyrowData.length === numConst.EMPTY_TABLE_LENGTH &&
      aiSActivismSummaryrowData.length === numConst.EMPTY_TABLE_LENGTH ? (
        <div className='row' />
      ) : (
        !query.print && (
          <div className='row mt-0'>
            <div className='col-lg-12 ps-3 mb-2'>
              <h3 className='text-primary font-weight-bold'>Campaigns</h3>
            </div>
          </div>
        )
      )}

      {aiSInvestorForCompanyrowData.length > 0 && (
        <>
          {!query.print && (
            <div className='row aiSInvestorForCompanyrowData'>
              <div className='col-lg-12 mb-3'>
                <DropdownList
                  options={ddlShortSellerCampaignData}
                  handleChange={(e) => {
                    if (e !== null) {
                      handleChange(e);
                    }
                  }}
                  maxHeight={180}
                  placeholder='Click or start typing to choose a short seller campaign…'
                  value={
                    ddlShortSellertSelectedVal !== undefined &&
                    ddlShortSellerCampaignData.includes(
                      ddlShortSellertSelectedVal
                    )
                      ? ddlShortSellertSelectedVal
                      : ddlShortSellerCampaignData[0]
                  }
                  isOptionUnique
                  isValidNewOption={false}
                  fullWidth
                  Dvalue={
                    ddlShortSellertSelectedVal === undefined
                      ? ddlShortSellerCampaignData[0]
                      : ddlShortSellertSelectedVal
                  }
                  TrialUser={TrialUser}
                />
              </div>
            </div>
          )}

          {/* <div className="row">
              <div className="col-lg-12">
                <Table gridOptions={gridOptionSummary} title="Summary" pageTitle="Summary" />
              </div>
            </div> */}
          {!query.print && (
            <div className='row mt-0'>
              <div className='col-lg-12 ps-3 mb-2'>
                {investor_data !== undefined && investor_data.length > 0 && (
                  <a
                    className='text-primary font-weight-bold'
                    rel='noopener noreferrer'
                    href={`${window.origin}${INVESTOR_ACTIVIST_SHORT_OVERVIEW}?investor=${investor_data[0].investor_id}`}
                    target='_blank'
                  >
                    {ddlShortSellertSelectedVal === undefined
                      ? ddlShortSellerCampaignData[0] !== undefined && ddlShortSellerCampaignData[0].label
                      : ddlShortSellertSelectedVal.label}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className={isLoading ? 'fadeOutAnimation' : 'fadeInAnimation'} id='loadItem'>
            {query.print && (
              <div className='row mt-2 pdfpagebreak'>
                <div className='col-lg-12'>
                  <h2 className='activistName text-primary font-weight-bold ps-2'>
                    {
                      aisSelectedData !== undefined &&
                        `${sectionNo}${ddlShortSellertSelectedVal && ddlShortSellertSelectedVal.label}` // aisSelectedData.name
                    }
                  </h2>
                </div>
              </div>
            )}

            {selectedActivistDetails !== undefined && (
              <>
                <div className='row h-100 pt-2'>
                  <div className='col-lg-8 col-8' style={{ height: '200px' }}>
                    <Card TrialUser={TrialStatus} title='Short Summary Text'>
                      {selectedActivistDetails.short_summary_text}
                    </Card>
                  </div>
                  <div className='col-lg-4 col-4' style={{ height: '200px' }}>
                    <Card TrialUser={TrialStatus} title='Company Tactics'>
                      {selectedActivistDetails.company_tactics}
                    </Card>
                  </div>
                </div>
                <div className='row h-100 pt-2'>
                  <div className='col-lg-4 col-4'>
                    <Card TrialUser={TrialStatus} title='Allegations'>
                      {selectedActivistDetails.all_allegations}
                    </Card>
                  </div>
                  <div className='col-lg-4 col-4'>
                    <Card title='Campaign Developments'>
                      <div className='row'>
                        <div className='col-lg-9 col-9 m-0 mb-2'>
                          Company Responds
                        </div>
                        <div className='col-lg-2 col-2 m-0 mb-2'>
                          <img
                            className={
                              TrialStatus ? 'smallIcon blurrytext' : 'smallIcon'
                            }
                            src={
                              selectedActivistDetails.company_respnd
                                ? `${window.location.origin}${GREEN_YES_IMG}`
                                : `${window.location.origin}${RED_CROSS_IMG}`
                            }
                            alt={selectedActivistDetails.company_respnd}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-9 col-9 m-0 mb-2'>
                          Delisted in Campaign
                        </div>
                        <div className='col-lg-2 col-2 m-0 mb-2'>
                          <img
                            className={
                              TrialStatus ? 'smallIcon blurrytext' : 'smallIcon'
                            }
                            src={
                              selectedActivistDetails.delisted
                                ? `${window.location.origin}${GREEN_YES_IMG}`
                                : `${window.location.origin}${RED_CROSS_IMG}`
                            }
                            alt={selectedActivistDetails.delisted}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-9 col-9 m-0 mb-2'>
                          Auditor Resigned
                        </div>
                        <div className='col-lg-2 col-2 m-0 mb-2'>
                          <img
                            className={
                              TrialStatus ? 'smallIcon blurrytext' : 'smallIcon'
                            }
                            src={
                              selectedActivistDetails.auditor_resigned
                                ? `${window.location.origin}${GREEN_YES_IMG}`
                                : `${window.location.origin}${RED_CROSS_IMG}`
                            }
                            alt={selectedActivistDetails.auditor_resigned}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-9 col-9 m-0 mb-2'>
                          Class Action
                        </div>
                        <div className='col-lg-2 col-2 m-0 mb-2'>
                          <img
                            className={
                              TrialStatus ? 'smallIcon blurrytext' : 'smallIcon'
                            }
                            src={
                              selectedActivistDetails.class_action
                                ? `${window.location.origin}${GREEN_YES_IMG}`
                                : `${window.location.origin}${RED_CROSS_IMG}`
                            }
                            alt={selectedActivistDetails.class_action}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className='col-lg-4 col-4'>
                    <Card title='Short Seller Tactics'>
                      <div className={TrialStatus ? 'blurrytext' : ''}>
                        {selectedActivistDetails.short_seller_tactics !==
                          null &&
                        selectedActivistDetails.short_seller_tactics !==
                          undefined
                          ? selectedActivistDetails.short_seller_tactics
                          : NORECORDS}
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            )}

            <div className='row pdfpagebreak pt-2'>
              <div className='col-lg-4 col-4'>
                <ErrorBoundary hasCard cardtitle='Announcement'>
                  <Table
                    gridOptions={gridOptionDetailsVerticle}
                    title='Announcement'
                    pageTitle='Announcement'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>

              {selectedActivistCampaignJSON !== undefined && (
                <div className='col-lg-4 col-4 selectedActivistCampaignJSON'>
                  <ErrorBoundary hasCard cardtitle='Campaign Returns'>
                    <Table
                      gridOptions={gridOptionsCampaignReturnsVerticle}
                      title='Campaign Returns'
                      pageTitle='Campaign Returns'
                      hideExcelDownloadIcon={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                </div>
              )}

              {selectedActivistFollower.length > 0 && (
                <div className='col-lg-4 col-4 selectedActivistFollower'>
                  <ErrorBoundary hasCard cardtitle='Follower Returns'>
                    <Table
                      gridOptions={gridOptionsFollowerReturnsVerticle}
                      title='Follower Returns'
                      pageTitle='Follower Returns'
                      hideExcelDownloadIcon={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                </div>
              )}
            </div>
            <div className='row pt-2'>
              <div className='col-md-12 col-12 pt-1 m-0'>
                {tbl_avdviser_activist_short.length > 0 ? (
                  <ErrorBoundary hasCard cardtitle='Advisers'>
                    <Table
                      IsShowCard
                      pageTitle='Advisers'
                      title='Advisers'
                      smalltitle=''
                      gridOptions={gridAdviserOptions}
                      hideExcelDownloadIcon={TrialUser}
                    />
                  </ErrorBoundary>
                ) : (
                  <Card title='Advisors'>{NORECORDS}</Card>
                )}
              </div>
            </div>

            {aiSActivismSummaryrowData.length > 0 && (
              <div className='row pt-4'>
                <div className='col-lg-12'>
                  <ErrorBoundary hasCard cardtitle='Timelines'>
                    <Table
                      gridOptions={gridOptionsActivismSummary}
                      title='Timelines'
                      pageTitle='Timeline'
                      hideExcelDownloadIcon={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            )}

            {selectedActivistFilings !== undefined &&
              selectedActivistFilings.length > 0 && (
                <div className='row pt-3'>
                  <div className='col-lg-12'>
                    <ErrorBoundary hasCard cardtitle='Filings'>
                      <Table
                        gridOptions={gridOptionsActivistFilings}
                        title='Filings'
                        pageTitle='Filing'
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  </div>
                </div>
              )}
          </div>
        </>
      )}
    </>
  );
};

ActivistShortCampaignsComponent.propTypes = {
  location: PropTypes.object,
  TrialLog: PropTypes.bool,
  aiSInvestorForCompanyrowData: PropTypes.array.isRequired,
  aiSActivismSummaryrowData: PropTypes.array.isRequired,
  tbl_avdviser_activist_short: PropTypes.any,
  sectionNo: PropTypes.any
};

ActivistShortCampaignsComponent.defaultProps = {
  location: { search: QUERY_AND_ID },
  TrialLog: false,
  tbl_avdviser_activist_short: [],
  sectionNo: undefined
};

export default withRouter(React.memo(ActivistShortCampaignsComponent));
