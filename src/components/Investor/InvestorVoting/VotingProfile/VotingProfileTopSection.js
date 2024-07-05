import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../../Page';
import Table from '../../../GeneralForm/Table';
import { filters } from '../../../../utils/AgGridFunctions';
import { LOADING } from '../../../../constants/MessageConstans';
import DropdownList from '../../../GeneralForm/DropdownList';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { INVESTOR_VOTING_PROFILE } from '../../../../constants/PathsConstant';
import LightBoxPDFViewer from '../../../GeneralForm/LightBoxPDFViewer';
import useWindowDimensions from '../../../GeneralForm/useWindowDimensions';
import { ifUrlExist } from '../../../../utils/checkURL-util';
import Modal from '../../../GeneralForm/Modal';
import FailedLink from '../../../../pages/FailedLink';
import { history } from '../../../../utils/navigation-util';

const VotingProfileTopSection = ({
  location,
  loadingData,
  allowDownload,
  TrialStatus,
  ddlAllInvestor,
  handleSetInvestor,
  ddlSetInvestor,
  votingProfile,
  tableProxyVotingSummary,
  tableKeyDocument,
  InvestorTitle,
  TrialUserDisableDownload,
  handleResetVotingProfile,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bem = bn.create('investorVotingProfile');
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);
  const [linkFileName, setLinkFileName] = useState('');
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  function Togglesroll() {
    const comp = document.getElementById('BottomNavBar');
    comp.scrollIntoView();
  }

  const initialisePDFModal = (fileName, desc) => {
    setIsPDFModal(true);
    setPDFFileName(fileName);
    setPDFTitleName(desc);
  };
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
      url = `${file_name}`;
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

  function useKeypress(key, action) {
    useEffect(() => {
      async function onKeyup(e) {
        if (e.key === key) await action(false);
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }, [action, key]);
  }

  useKeypress('Enter', setIsPDFModal);

  const gridOptions_VotingSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal Type',
        field: 'proposal_top_level',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 190,
        maxWidth: query.print ? 190 : null,
      },
      {
        headerName: 'For (%)',
        field: 'votes_for_pcent',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 60 : 60,
        maxWidth: query.print ? 60 : 100,
      },
      {
        headerName: 'Against (%)',
        field: 'votes_against_pcent',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 60 : 60,
        maxWidth: query.print ? 60 : 100,
      },
      {
        headerName: 'Split (%)',
        field: 'votes_split_pcent',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 60 : 60,
        maxWidth: query.print ? 60 : 100,
      },
      {
        headerName: 'Abstain (%)',
        field: 'votes_abstain_pcent',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 60 : 60,
        maxWidth: query.print ? 60 : 100,
      },
      {
        headerName: 'Withhold (%)',
        field: 'votes_withhold_pcent',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 60 : 100,
        maxWidth: query.print ? 60 : 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'proposal_top_level',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData: tableProxyVotingSummary.length > 0 && tableProxyVotingSummary.map((x) => ({
      ...x,
      TrialStatus,
      allowDownload,
    })),
    rowSelection: 'multiple',
    headerHeight: query.print ? 40 : 60,
  };
  const gridOptions_KeyDocument = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Document Type',
        field: 'document_type',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 310 : width < breakpoint ? 180 : 270,
        maxWidth: query.print ? 310 : width < breakpoint ? 200 : null,
      },
      {
        headerName: 'Date',
        field: 'document_date',
        filter: 'agDateColumnFilter',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: query.print ? 100 : 170,
        maxWidth: query.print ? 100 : 170,
      },
      {
        headerName: '',
        field: 'document_name',
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        type: ['autoHeightTrue'],
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => {
          if (
            params.data.document_name === null ||
            params.data.document_name === undefined ||
            params.data.document_name === ''
          ) {
            return null;
          }
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.document_name}
              >
                View PDF
              </a>
            );
          }
          if (params.data.document_name.search('.pdf') > 0 || params.data.document_name.search('.PDF') > 0) {
            return (
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  checkLink(params.data.document_name).then((exists) => {
                    if (exists) {
                      initialisePDFModal(
                        params.data.document_name,
                        `${params.data.document_type}: ${params.data.document_type}`
                      );
                    }
                  });
                }}
              >
                View PDF
              </button>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              href={params.data.document_name}
            >
              View
            </a>
          );
        },
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'document_type',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: !query.print,
    rowData: tableKeyDocument.length > 0 && tableKeyDocument.map((x) => ({
      ...x,
      TrialStatus,
      allowDownload,
    })),
    rowSelection: 'multiple',
  };

  return (
    <Page key={1} className='pt-3'>
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
      <div
        id='divProfile'
        className={bem.b(query.print ? 'cr-VotingProfileTopSection' : '')}
      >
        <div className='row pt-2'>
          {ddlAllInvestor.length > 1 && (
            <div className='col-12 col-md-4 pt-3'>
              <DropdownList
                handleChange={(e) => {
                  if (e !== null) {
                    handleSetInvestor(e);
                    history.push(
                      `${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&invpfid=${e.value}`
                    );
                  } else if (ddlAllInvestor.length > 0) {
                    const objFirstSelection = ddlAllInvestor[0];
                    handleSetInvestor(objFirstSelection);
                    history.push(
                      `${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&invpfid=${objFirstSelection.value}`
                    );
                  }
                  handleResetVotingProfile();
                }}
                isMulti={false}
                options={ddlAllInvestor}
                Dvalue={ddlSetInvestor}
                disabled={loadingData}
              />
            </div>
          )}
          {ddlAllInvestor.length > 1 && (
            <div className='col-12 col-md-3'>
              <button
                type='button'
                onClick={Togglesroll}
                disabled={loadingData}
                className='btn btn-primary votingProfileButton'
              >
                View Policy Details
              </button>
            </div>
          )}
        </div>
        <div className='row'>
          <div className='col-md-12 col-sm-12 m-0'>
            {loadingData ? (
              <div className='ps-1'> {LOADING} </div>
            ) : (
              <>
                <div className='row pt-2'>
                  <div className='col-12 col-md-12 mb-2'>
                    <Card
                      cancelSlideBottomToUp
                      IsShowCard
                      title='Policy Overview'
                      smalltitle=''
                      addedClass='h-100'
                    >
                      <div className={TrialStatus ? 'blurrytext' : ''}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              votingProfile.about !== '' &&
                              votingProfile.about !== undefined
                                ? votingProfile.about
                                : 'N/A',
                          }}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
                <div className='row pt-3'>
                  {votingProfile.UN_PRI && (
                    <div className='col-sm-12 col-md mb-2'>
                      <Card>
                        <div className='row'>
                          <div className='col-6 customSubHeadersInCards'>
                            UN PRI
                          </div>
                          <div
                            className={`col-6 mb-2 ${
                              TrialStatus ? 'blurrytext' : ''
                            }`}
                          >
                            {votingProfile.UN_PRI}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  {votingProfile.Voting_Policy_Summary && (
                    <div className='col-sm-12 col-md mb-2'>
                      <Card>
                        <div className='row'>
                          <div className='col-6 customSubHeadersInCards'>
                            Policy
                          </div>
                          <div
                            className={`col-6 ${
                              TrialStatus ? 'blurrytext' : ''
                            }`}
                          >
                            {votingProfile.Voting_Policy_Summary}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  {votingProfile.proxy_advisor && (
                    <div className='col-sm-12 col-md mb-2'>
                      <Card>
                        <div className='row'>
                          <div className='col-6 customSubHeadersInCards'>
                            Proxy Adviser
                          </div>
                          <div
                            className={`col-6 ${
                              TrialStatus ? 'blurrytext' : ''
                            }`}
                          >
                            {votingProfile.proxy_advisor}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  {votingProfile.voting_platform && (
                    <div className='col-sm-12 col-md mb-2'>
                      <Card>
                        <div className='row'>
                          <div className='col-6 customSubHeadersInCards'>
                            Voting Platform
                          </div>
                          <div
                            className={`col-6 ${
                              TrialStatus ? 'blurrytext' : ''
                            }`}
                          >
                            {votingProfile.voting_platform}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
                <div className='row pdfpagebreak pt-3'>
                  {tableProxyVotingSummary.length > 0 && (
                    <div className='col-12 col-md-6 m-0'>
                      <Table
                        cancelSlideBottomToUp
                        pageTitle={InvestorTitle}
                        title='Voting Summary'
                        smalltitle=''
                        gridOptions={gridOptions_VotingSummary}
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </div>
                  )}
                  {tableKeyDocument.length > 0 && (
                    <div className='col-12 col-md-6 m-0'>
                      <Table
                        cancelSlideBottomToUp
                        pageTitle='Documents'
                        title='Documents'
                        smalltitle=''
                        hideExcelDownloadIcon
                        gridOptions={gridOptions_KeyDocument}
                      />
                    </div>
                  )}
                  <LightBoxPDFViewer
                    handleCloseModelPopup={handlePDFModal}
                    viewModalPopup={isPDFModal}
                    handleSetBtnIdForExpandData={handlePDFModal}
                    viewPDFFileName={`${pdfFileName}`}
                    pdfTitle={pdfTitleName}
                    IsShowCard
                    isShowFooter
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

VotingProfileTopSection.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  ddlAllInvestor: PropTypes.array.isRequired,
  handleSetInvestor: PropTypes.func.isRequired,
  ddlSetInvestor: PropTypes.object.isRequired,
  votingProfile: PropTypes.object.isRequired,
  tableProxyVotingSummary: PropTypes.array.isRequired,
  tableKeyDocument: PropTypes.array.isRequired,
};
VotingProfileTopSection.defaultProps = {};

export default withRouter(VotingProfileTopSection);
