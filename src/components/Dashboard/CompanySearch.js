import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Modal from '../GeneralForm/Modal';
import CompanyFilter from './CompanyFilter';
import InvestorFilter from '../Investor/InvestorFilter';
import CompanyFilterGroupOptions from './CopmanyFilterGroupOptions';
import GraphBarChart from '../GeneralForm/GraphBarChart';
import DropdownList from '../GeneralForm/DropdownList';
import { ARRAY_HAS_NO_LENGTH } from '../../constants/NumberConstants';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const CompanySearch = (props) => {
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const data =
    props.widgetGraphData !== undefined
      ? props.widgetGraphData.find(
          (item) => item.label === props.dashboard_widget_link_id.toString()
        ) !== undefined
        ? props.widgetGraphData.find(
            (item) => item.label === props.dashboard_widget_link_id.toString()
          ).arraydata
        : []
      : [];

  return (
    <ErrorBoundary>
      <div className='App'>
        <div className='col'>
          <GraphBarChart
            isComp
            isInvest
            cardtitle={props.cardTitle}
            cardsmalltitle=''
            data={data}
            yKeyVal='Target'
            xKeyVal='year_action'
            handleComapnyCog={() => {
              props.HandleFilterModel(true);
              props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
              props.handleReset();
            }}
            handleInvestorCog={() => {
              props.HandleInvestorFilterModel(true);
              props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
              props.handleReset();
            }}
          />
        </div>

        {props.showFilterModel !== undefined && (
          <Modal
            show={props.showFilterModel}
            handleClose={() => props.HandleFilterModel(false)}
            size='lg'
            title='Company Filter'
          >
            {props.showIndividualOption ? (
              <CompanyFilter {...props} />
            ) : (
              <CompanyFilterGroupOptions {...props} />
            )}
            {/* handle - By My Saved Peer Groups visiblity */}
            {props.showFilterModel &&
            props.listOfcompanySearchOptions.length > ARRAY_HAS_NO_LENGTH ? (
              <div className='row'>
                <label
                  htmlFor='companySavePeerGroups'
                  className='col-sm-3 col-form-label text-primary font-weight-bold pt-0 pb-0 mb-1'
                >
                  By My Saved Peer Groups:
                </label>
                <div className='col-sm-9 mb-1'>
                  <DropdownList
                    handleChange={async (e) => {
                      if (e !== null) {
                        props.handleCompanySearchOptionSelection(e);
                        props.getAllCompanySearchSelection(e.value);
                      } else {
                        props.ResetCompanySearchOptionSelection();
                      }
                    }}
                    handleInputChange={props.handleSavedPeerGroupsInputChange}
                    isMulti={false}
                    options={props.listOfcompanySearchOptions}
                    Dvalue={props.companySearchOptionSelection}
                    placeholder='(Optional) Choose one peer groups...'
                    maxHeight={160}
                  />
                </div>
              </div>
            ) : (
              ''
            )}

            <div>
              <div className='row mb-3'>
                <label
                  htmlFor='savecurrentlist'
                  className='col-sm-3 col-form-label text-primary font-weight-bold'
                >
                  Save current list:
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    value={props.txtSaveCurrentList}
                    onChange={(e) => props.handleSaveCurrentList(e)}
                    className='form-control'
                    id='savecurrentlist'
                    placeholder='Add name to save as new list'
                  />
                </div>
              </div>
              <div className='row'>
                <label
                  htmlFor='actionCurrentList'
                  className='col-sm-3 col-form-label'
                />
                <div className='col-sm-9 m-0'>
                  <button
                    type='button'
                    onClick={async () => {
                      const data = {
                        action: 'delete',
                        companySearchOptionSelection:
                          props.companySearchOptionSelection,
                      };
                      await props.handleCompanySearchDeleteReq(data);
                      await props.getCompanySearchOptions();
                    }}
                    className='btn btn-primary btn-sm m-1'
                    disabled={props.isSaveCurrentListButtonDeleteDisable}
                  >
                    Delete List
                  </button>

                  <button
                    type='button'
                    onClick={async () => {
                      const data = {
                        action: 'update',
                        cmpSearchId: props.companySearchOptionSelection,
                        txtSaveCurrentList: props.txtSaveCurrentList,
                        companySingleSelection: props.companySingleSelection,
                        companySelection: props.companySelection,
                        indexSelection: props.indexSelection,
                        exchangeSelection: props.exchangeSelection,
                        aiPeerGroupSelection: props.aiPeerGroupSelection,
                        industrySelection: props.industrySelection,
                        marketCapSelection: props.marketCapSelection,
                        companyLocationSelection:
                          props.companyLocationSelection,
                        marketCapMinRange: props.txtMarketCapMinRange,
                        marketCapMaxRange: props.txtMarketCapMaxRange,
                        listRegeionAndCountries: props.listRegeionAndCountries,
                        piListOfSectorsAndIndustries:
                          props.piListOfSectorsAndIndustries,
                        isSaved: true,
                        dashboard_widget_link_id: props.dashBoardWidgetId,
                      };
                      await props.handleCompanySearchUpdateReq(data);
                      await props.getCompanySearchOptions();
                    }}
                    className='btn btn-primary btn-sm m-1'
                    disabled={props.isSaveCurrentListButtonSaveDisable}
                  >
                    {props.saveCurrentListButtonText}
                  </button>

                  {props.companySearchOptionSelection !== undefined &&
                    props.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH && (
                      <button
                        type='button'
                        onClick={async () => {
                          const data = {
                            action: 'update',
                            cmpSearchId: undefined,
                            txtSaveCurrentList: props.txtSaveCurrentList,
                            companySingleSelection:
                              props.companySingleSelection,
                            companySelection: props.companySelection,
                            indexSelection: props.indexSelection,
                            exchangeSelection: props.exchangeSelection,
                            aiPeerGroupSelection: props.aiPeerGroupSelection,
                            industrySelection: props.industrySelection,
                            marketCapSelection: props.marketCapSelection,
                            companyLocationSelection:
                              props.companyLocationSelection,
                            marketCapMinRange: props.txtMarketCapMinRange,
                            marketCapMaxRange: props.txtMarketCapMaxRange,
                            listRegeionAndCountries:
                              props.listRegeionAndCountries,
                            piListOfSectorsAndIndustries:
                              props.piListOfSectorsAndIndustries,
                            isSaved: true,
                          };
                          await props.handleCompanySearchUpdateReq(data);
                          await props.getCompanySearchOptions();
                        }}
                        className='btn btn-primary btn-sm m-1'
                        disabled={props.isSaveCurrentListButtonSaveDisable}
                      >
                        Save New
                      </button>
                    )}
                </div>
              </div>
            </div>
            <hr />
            <div className='row'>
              <label htmlFor='run' className='col-sm-3 col-form-label' />
              <div className='col-sm-9 m-0'>
                <button
                  onClick={async () => {
                    const data = {
                      action: 'usefilter', // "update",
                      cmpSearchId: null,
                      txtSaveCurrentList: props.txtSaveCurrentList,
                      companySingleSelection: props.companySingleSelection,
                      companySelection: props.companySelection,
                      indexSelection: props.indexSelection,
                      exchangeSelection: props.exchangeSelection,
                      aiPeerGroupSelection: props.aiPeerGroupSelection,
                      industrySelection: props.industrySelection,
                      marketCapSelection: props.marketCapSelection,
                      companyLocationSelection: props.companyLocationSelection,
                      marketCapMinRange: props.txtMarketCapMinRange,
                      marketCapMaxRange: props.txtMarketCapMaxRange,
                      listRegeionAndCountries: props.listRegeionAndCountries,
                      piListOfSectorsAndIndustries:
                        props.piListOfSectorsAndIndustries,
                      isSaved: false,
                      dashboard_widget_link_id: props.dashBoardWidgetId,
                    };
                    await props.handleCompanySearchUpdateReq(data);
                    props.handdleRun(data);
                  }}
                  type='button'
                  className='btn btn-primary btn-sm m-1 float-end'
                >
                  Use Filter
                </button>
              </div>
            </div>
          </Modal>
        )}

        {props.showInvestorFilterModel !== undefined && (
          <Modal
            show={props.showInvestorFilterModel}
            handleClose={() => props.HandleInvestorFilterModel(false)}
            size='lg'
            title='Investor Filter'
          >
            <InvestorFilter {...props} />
            {props.showInvestorFilterModel &&
            props.investorSearchOptions.length > ARRAY_HAS_NO_LENGTH ? (
              <div className='row mt-1'>
                <label
                  htmlFor='companySavePeerGroups'
                  className='col-sm-3 col-form-label text-primary font-weight-bold pt-0 pb-0 mb-1'
                >
                  By My Saved Peer Groups:
                </label>
                <div className='col-sm-9 mb-1'>
                  <DropdownList
                    handleChange={async (e) => {
                      if (e !== null) {
                        props.handleInvestorSearchOptionSelection(e);
                        props.GetInvestorSearchSelection(e.value);
                      } else {
                        props.ResetInvestorSearchOptionSelection();
                      }
                    }}
                    handleInputChange={
                      props.handleInvestorSavedPeerGroupsInputChange
                    }
                    isMulti={false}
                    options={props.investorSearchOptions}
                    Dvalue={props.investorSearchOptionsSelection}
                    placeholder='(Optional) Choose one peer groups...'
                    maxHeight={160}
                  />
                </div>
              </div>
            ) : (
              ''
            )}

            <div>
              <div className='row mb-3'>
                <label
                  htmlFor='savecurrentlist'
                  className='col-sm-3 col-form-label text-primary font-weight-bold'
                >
                  Save current list:
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    value={props.txtSaveCurrentList}
                    onChange={(e) => props.handleSaveInvestorCurrentList(e)}
                    className='form-control'
                    id='savecurrentlist'
                    placeholder='Add name to save as new list'
                  />
                </div>
              </div>
              <div className='row'>
                <label
                  htmlFor='actionCurrentList'
                  className='col-sm-3 col-form-label'
                />
                <div className='col-sm-9 m-0'>
                  <button
                    type='button'
                    onClick={async (e) => {
                      const data = {
                        action: 'delete',
                        investorSearchOptionsSelection:
                          props.investorSearchOptionsSelection,
                      };
                      await props.handleInvestorSearchDeleteReq(data);
                      await props.getInvestorSearchOptions();
                    }}
                    className='btn btn-primary btn-sm m-1'
                    disabled={props.isSaveCurrentListButtonDeleteDisable}
                  >
                    Delete List
                  </button>

                  <button
                    type='button'
                    onClick={async (e) => {
                      const data = {
                        action: 'update',
                        investorSearchId: props.investorSearchOptionsSelection,
                        txtSaveCurrentList: props.txtSaveCurrentList,
                        investorSingleSelection: props.companySingleSelection,
                        investorSelection: props.investorSelection,
                        investorLocationSelection:
                          props.investorLocationSelection,
                        AumSelection: props.marketCapSelection,
                        aum_min: props.txtMarketCapMinRange,
                        aum_max: props.txtMarketCapMaxRange,
                        listRegeionAndCountries: props.listRegeionAndCountries,
                        listInvestorTypeAndSubtypeSelection:
                          props.listInvestorTypeAndSubtypeSelection,
                        listInvestorTypeAndSubtype:
                          props.listInvestorTypeAndSubtype,
                        byShareholderOfCompany: props.selectionByIndivProponent,
                        isSaved: true,
                        dashboard_widget_link_id: props.dashBoardWidgetId,
                      };
                      await props.handleInvestorSearchUpdateReq(data);
                      await props.getInvestorSearchOptions();
                    }}
                    className='btn btn-primary btn-sm m-1'
                    disabled={props.isSaveCurrentListButtonSaveDisable}
                  >
                    {props.saveCurrentListButtonText}
                  </button>

                  {props.investorSearchOptionsSelection !== undefined &&
                    props.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH && (
                      <button
                        type='button'
                        onClick={async (e) => {
                          const data = {
                            action: 'update',
                            investorSearchId: undefined,
                            txtSaveCurrentList: props.txtSaveCurrentList,
                            investorSingleSelection:
                              props.companySingleSelection,
                            investorSelection: props.investorSelection,
                            investorLocationSelection:
                              props.investorLocationSelection,
                            AumSelection: props.marketCapSelection,
                            aum_min: props.txtMarketCapMinRange,
                            aum_max: props.txtMarketCapMaxRange,
                            listRegeionAndCountries:
                              props.listRegeionAndCountries,
                            byShareholderOfCompany:
                              props.selectionByIndivProponent,
                            listInvestorTypeAndSubtypeSelection:
                              props.listInvestorTypeAndSubtypeSelection,
                            listInvestorTypeAndSubtype:
                              props.listInvestorTypeAndSubtype,
                            isSaved: true,
                          };
                          await props.handleInvestorSearchUpdateReq(data);
                          await props.getInvestorSearchOptions();
                        }}
                        className='btn btn-primary btn-sm m-1'
                        disabled={props.isSaveCurrentListButtonSaveDisable}
                      >
                        Save New
                      </button>
                    )}
                </div>
              </div>
            </div>
            <hr />
            <div className='row'>
              <label htmlFor='run' className='col-sm-3 col-form-label' />
              <div className='col-sm-9 m-0'>
                <button
                  onClick={async () => {
                    const data = {
                      action: 'usefilter',
                      investorSearchId: null,
                      txtSaveCurrentList: props.txtSaveCurrentList,
                      investorSingleSelection: props.companySingleSelection,
                      investorSelection: props.investorSelection,
                      investorLocationSelection:
                        props.investorLocationSelection,
                      AumSelection: props.marketCapSelection,
                      aum_min: props.txtMarketCapMinRange,
                      aum_max: props.txtMarketCapMaxRange,
                      listRegeionAndCountries: props.listRegeionAndCountries,
                      byShareholderOfCompany: props.selectionByIndivProponent,
                      listInvestorTypeAndSubtypeSelection:
                        props.listInvestorTypeAndSubtypeSelection,
                      listInvestorTypeAndSubtype:
                        props.listInvestorTypeAndSubtype,
                      isSaved: false,
                      dashboard_widget_link_id: props.dashBoardWidgetId,
                    };
                    await props.handleInvestorSearchUpdateReq(data);
                    props.handdleRun(data);
                  }}
                  type='button'
                  className='btn btn-primary btn-sm m-1 float-end'
                >
                  Use Filter
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </ErrorBoundary>
  );
};

CompanySearch.propTypes = {
  GetInvestorSearchSelection: PropTypes.func,
  HandleDashBoardWidgetIdSet: PropTypes.func,
  HandleFilterModel: PropTypes.func,
  HandleInvestorFilterModel: PropTypes.func,
  ResetCompanySearchOptionSelection: PropTypes.func,
  ResetInvestorSearchOptionSelection: PropTypes.func,
  aiPeerGroupSelection: PropTypes.any,
  cardTitle: PropTypes.any,
  companyLocationSelection: PropTypes.any,
  companySearchOptionSelection: PropTypes.any,
  companySelection: PropTypes.any,
  companySingleSelection: PropTypes.any,
  dashBoardWidgetId: PropTypes.any,
  dashboardSelectionId: PropTypes.any,
  dashboard_widget_link_id: PropTypes.number,
  exchangeSelection: PropTypes.any,
  getAllCompanySearchSelection: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  getInvestorSearchOptions: PropTypes.func,
  handdleRun: PropTypes.func,
  handleCompanySearchDeleteReq: PropTypes.func,
  handleCompanySearchOptionSelection: PropTypes.func,
  handleCompanySearchUpdateReq: PropTypes.func,
  handleInvestorSavedPeerGroupsInputChange: PropTypes.any,
  handleInvestorSearchDeleteReq: PropTypes.func,
  handleInvestorSearchOptionSelection: PropTypes.func,
  handleInvestorSearchUpdateReq: PropTypes.func,
  handleReset: PropTypes.func,
  handleSaveCurrentList: PropTypes.func,
  handleSaveInvestorCurrentList: PropTypes.func,
  handleSavedPeerGroupsInputChange: PropTypes.func,
  indexSelection: PropTypes.any,
  industrySelection: PropTypes.any,
  investorLocationSelection: PropTypes.any,
  investorSearchOptions: PropTypes.array,
  investorSearchOptionsSelection: PropTypes.any,
  investorSelection: PropTypes.any,
  isSaveCurrentListButtonDeleteDisable: PropTypes.bool,
  isSaveCurrentListButtonSaveDisable: PropTypes.bool,
  listInvestorTypeAndSubtype: PropTypes.array,
  listInvestorTypeAndSubtypeSelection: PropTypes.array,
  listOfcompanySearchOptions: PropTypes.array,
  listRegeionAndCountries: PropTypes.any,
  marketCapSelection: PropTypes.any,
  piListOfSectorsAndIndustries: PropTypes.any,
  saveCurrentListButtonText: PropTypes.string,
  selectionByIndivProponent: PropTypes.any,
  showFilterModel: PropTypes.any,
  showIndividualOption: PropTypes.any,
  showInvestorFilterModel: PropTypes.any,
  txtMarketCapMaxRange: PropTypes.string,
  txtMarketCapMinRange: PropTypes.string,
  txtSaveCurrentList: PropTypes.string,
  widgetGraphData: PropTypes.array,
};

CompanySearch.defaultProps = {
  GetInvestorSearchSelection: () => {},
  HandleDashBoardWidgetIdSet: () => {},
  HandleFilterModel: () => {},
  HandleInvestorFilterModel: () => {},
  ResetCompanySearchOptionSelection: () => {},
  ResetInvestorSearchOptionSelection: () => {},
  dashboard_widget_link_id: 0,
  getAllCompanySearchSelection: () => {},
  getCompanySearchOptions: () => {},
  getInvestorSearchOptions: () => {},
  handdleRun: () => {},
  handleCompanySearchDeleteReq: () => {},
  handleCompanySearchOptionSelection: () => {},
  handleCompanySearchUpdateReq: () => {},
  handleInvestorSearchDeleteReq: () => {},
  handleInvestorSearchOptionSelection: () => {},
  handleInvestorSearchUpdateReq: () => {},
  handleReset: () => {},
  handleSaveCurrentList: () => {},
  handleSaveInvestorCurrentList: () => {},
  handleSavedPeerGroupsInputChange: () => {},
  saveCurrentListButtonText: '',
  isSaveCurrentListButtonDeleteDisable: false,
  isSaveCurrentListButtonSaveDisable: false,
  listInvestorTypeAndSubtype: [],
  listInvestorTypeAndSubtypeSelection: [],
  txtMarketCapMaxRange: '',
  txtMarketCapMinRange: '',
  txtSaveCurrentList: '',
  widgetGraphData: [],
};

export default React.memo(CompanySearch);
