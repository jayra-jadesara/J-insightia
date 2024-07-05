import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CollapseComponent from '../../../GeneralForm/CollapseComponent';
import DropdownList from '../../../GeneralForm/DropdownList';
import CompanySearchComponent from '../../../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../../../GeneralForm/InvestorSearchComponent';
import DropdownTreeSelect from '../../../GeneralForm/DropdownTreeSelect';
import { NUMBER_ZERO } from '../../../../constants/NumberConstants';
import { FULL_USER } from '../../../../constants/CompanyTrialTypeConstants';
import { filterFunctions } from '../../../../utils/general-util';
import FilterSavesearchModal from '../../General/FilterSavesearchModal';

const NoActionLetterFilter = (props) => {
  const OUTCOME_FIELDS_DATA = 0;
  const OUTCOME_FIELDS_ANALYSIS = 1;

  React.useEffect(() => {
    filterFunctions(props);
  }, [props.isShowInvestorSelection]);

  return (
    <div>
      <CollapseComponent
        isOpen={
          props.isExpandFilter !== undefined ? props.isExpandFilter : true
        }
        Heading={
          props.filterHeading !== undefined
            ? props.filterHeading
            : 'Investor Filter'
        }
      >
        <CompanySearchComponent
          showFilterModel={props.showFilterModel}
          listOfcompanySearchOptions={props.listOfcompanySearchOptions}
          HandleFilterModel={props.HandleFilterModel}
          handleCompanySelection={props.handleCompanySelection}
          handleShowIndividualOption={props.handleShowIndividualOption}
          showIndividualOption={props.showIndividualOption}
          handleShowGroupOption={props.handleShowGroupOption}
          handleBulkCompanySelection={props.handleBulkCompanySelection}
          piListIndices={props.piListIndices}
          handleIndexSelectionChange={props.handleIndexSelectionChange}
          indexSelection={props.indexSelection}
          listOfExchange={props.listOfExchange}
          handleExchangeSelectionChange={props.handleExchangeSelectionChange}
          exchangeSelection={props.exchangeSelection}
          aiPeerGroups={props.aiPeerGroups}
          handleAIPeerGroupSelection={props.handleAIPeerGroupSelection}
          aiPeerGroupSelection={props.aiPeerGroupSelection}
          listMarketCap={props.listMarketCap}
          marketCapSelection={props.marketCapSelection}
          handleMarketCapSelection={props.handleMarketCapSelection}
          txtMarketCapMinRange={props.txtMarketCapMinRange}
          txtMarketCapMaxRange={props.txtMarketCapMaxRange}
          handleMarketCapMinRange={props.handleMarketCapMinRange}
          handleMarketCapMaxRange={props.handleMarketCapMaxRange}
          handleIndustrySelection={props.handleIndustrySelection}
          industrySelection={props.industrySelection}
          companyLocationSelection={props.companyLocationSelection}
          piListOfSectorsAndIndustries={props.piListOfSectorsAndIndustries}
          HandleTreeViewIndustry={props.HandleTreeViewIndustry}
          listRegeionAndCountries={props.listRegeionAndCountries}
          handleSaveCurrentList={props.handleSaveCurrentList}
          HandleTreeViewCompanyLocation={props.HandleTreeViewCompanyLocation}
          companySearchOptionSelection={props.companySearchOptionSelection}
          handleCompanySearchOptionSelection={
            props.handleCompanySearchOptionSelection
          }
          getAllCompanySearchSelection={props.getAllCompanySearchSelection}
          txtSaveCurrentList={props.txtSaveCurrentList}
          ResetCompanySearchOptionSelection={
            props.ResetCompanySearchOptionSelection
          }
          saveCurrentListButtonText={props.saveCurrentListButtonText}
          handleCompanyAndIndustry={props.handleCompanyAndIndustry}
          freeSearchRecordset={props.freeSearchRecordset}
          companySelection={props.companySelection}
          companySingleSelection={props.companySingleSelection}
          handleCompanySearchUpdateReq={props.handleCompanySearchUpdateReq}
          getCompanySearchOptions={props.getCompanySearchOptions}
          handleCompanySearchDeleteReq={props.handleCompanySearchDeleteReq}
          handleCompanySingleSelection={props.handleCompanySingleSelection}
          handleComapnySearchSelectionInvComp={
            props.handleComapnySearchSelectionInvComp
          }
          handdleRun={(e) => props.handleComapnySearchSelection(e)}
          defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
          defaultPiListSectorsAndIndustries={
            props.defaultPiListSectorsAndIndustries
          }
        />

        <InvestorSearchComponent
          HandleInvestorFilterModel={props.HandleInvestorFilterModel}
          investorSearchOptions={props.investorSearchOptions}
          investorSearchOptionsSelection={props.investorSearchOptionsSelection}
          showInvestorFilterModel={props.showInvestorFilterModel}
          HandleTreeViewInvestorLocation={props.HandleTreeViewInvestorLocation}
          investorLocationSelection={props.investorLocationSelection}
          listInvestorTypeAndSubtype={props.listInvestorTypeAndSubtype}
          listInvestorTypeAndSubtypeSelection={
            props.listInvestorTypeAndSubtypeSelection
          }
          handleInvestorSelection={props.handleInvestorSelection}
          investorSelection={props.investorSelection}
          handleInvestorIsBulkUpload={props.handleInvestorIsBulkUpload}
          isInvestorBulkUpload={props.isInvestorBulkUpload}
          freeSearchRecordset={props.freeSearchRecordset}
          handleSearchInvestor={props.handleSearchInvestor}
          handleBulkInvestorSelection={props.handleBulkInvestorSelection}
          listRegeionAndCountries={props.listRegeionAndCountries}
          invListRegeionAndCountries={props.invListRegeionAndCountries}
          listByIndivProponent={props.listByIndivProponent}
          selectionByIndivProponent={props.selectionByIndivProponent}
          handleByShareholderOfCompany={props.handleByShareholderOfCompany}
          getAllInvestorsFromShareholderOfCompany={
            props.getAllInvestorsFromShareholderOfCompany
          }
          HandleTreeViewListInvestorTypeAndSubtype={
            props.HandleTreeViewListInvestorTypeAndSubtype
          }
          listMarketCap={props.listMarketCap}
          handleMarketCapSelection={props.handleMarketCapSelection}
          marketCapSelection={props.marketCapSelection}
          handleMarketCapMinRange={props.handleMarketCapMinRange}
          txtMarketCapMinRange={props.txtMarketCapMinRange}
          txtMarketCapMaxRange={props.txtMarketCapMaxRange}
          handleMarketCapMaxRange={props.handleMarketCapMaxRange}
          handleSaveInvestorCurrentList={props.handleSaveInvestorCurrentList}
          txtSaveCurrentList={props.txtSaveCurrentList}
          handleInvestorSearchDeleteReq={props.handleInvestorSearchDeleteReq}
          getInvestorSearchOptions={props.getInvestorSearchOptions}
          isSaveCurrentListButtonDeleteDisable={
            props.isSaveCurrentListButtonDeleteDisable
          }
          saveCurrentListButtonText={props.saveCurrentListButtonText}
          handleInvestorSearchUpdateReq={props.handleInvestorSearchUpdateReq}
          handleInvestorSearchOptionSelection={
            props.handleInvestorSearchOptionSelection
          }
          GetInvestorSearchSelection={props.GetInvestorSearchSelection}
          ResetInvestorSearchOptionSelection={
            props.ResetInvestorSearchOptionSelection
          }
          handleInvestorSearchSelectionInvComp={
            props.handleInvestorSearchSelectionInvComp
          }
          handdleRun={props.handdleRun}
          listDefaultInvestorTypeAndSubtype={
            props.listDefaultInvestorTypeAndSubtype
          }
          lstInvestorRegeionAndCountries={props.lstInvestorRegeionAndCountries}
        />

        <div className='row pt-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label
                    htmlFor='byCompanySelection'
                    className='col-sm-4 col-form-label'
                  >
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      onClick={() => {
                        props.HandleFilterModel(true);
                        props.handleCompanyChangePeerGrp();
                      }}
                    >
                      By Company Selection
                    </button>
                  </label>

                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    {props.companySearchOptionSelection !== undefined ? (
                      <div className='btnPeerGrpRemove'>
                        {props.companySearchOptionSelection.label}
                        <i
                          className='bi bi-backspace-fill'
                          title='Clear selection'
                          onClick={() => {
                            props.ResetCompanySearchOptionSelection();
                            props.handleResetCompnaySelections();
                          }}
                        />
                      </div>
                    ) : (
                      'No specific company selected'
                    )}
                  </div>
                </div>
              </div>
              <div className='col-sm'>
                {props.isShowInvestorSelection !== undefined ? (
                  props.isShowInvestorSelection
                ) : (
                  <>
                    <div className='row'>
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-4 col-form-label'
                      >
                        <button
                          type='button'
                          className='btn btn-primary  btn-sm'
                          onClick={() => {
                            props.HandleInvestorFilterModel(true);
                            props.handleInvestorChangePeerGrp();
                            props.handleReset();
                          }}
                        >
                          By Investor Selection
                        </button>
                      </label>
                      <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                        {props.investorPeerGroupSelection !== undefined ? (
                          <div className='btnPeerGrpRemove'>
                            {props.investorPeerGroupSelection.label}
                            <i
                              className='bi bi-backspace-fill'
                              title='Clear selection'
                              onClick={() => {
                                props.handleClearPeerGroupInvestorSelection();
                                props.ResetInvestorSearchOptionSelection();
                                props.handleResetInvestorSelections();
                              }}
                            />
                          </div>
                        ) : (
                          'No specific investor selected'
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {props.searchTitle !== undefined && (
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <strong className='text-primary'>{props.searchTitle}</strong>
                </div>
              </div>
            </div>
          )}

          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label
                    htmlFor='inputPassword'
                    className='col-sm-4 col-form-label'
                  >
                    By Shareholder Proposal Category
                  </label>
                  <div className='col-sm-8'>
                    <DropdownTreeSelect
                      onChangeSelection={
                        props.HandleTreeviewShareholderProposalCategory
                      }
                      options={props.DDLShareholderProposalCategory}
                      placeholder={
                        props.SetDDLShareholderProposalCategory.length ===
                        NUMBER_ZERO
                          ? '(Optional) Choose one or more Shareholder Proposal Category...'
                          : ' '
                      }
                      totalSelection={
                        props.SetDDLShareholderProposalCategory.length
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm'>
                <div className='row'>
                  <label
                    htmlFor='proponent'
                    className='col-sm-4 col-form-label'
                  >
                    Proponent
                  </label>
                  <div className='col-sm-8'>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='individualChecked'
                        value='option1'
                        onClick={() => props.handleProponentGroupsearch(true)}
                        onChange={() => {}}
                        defaultChecked
                      />
                      <label
                        className='form-check-label'
                        htmlFor='individualChecked'
                      >
                        Individual
                      </label>
                    </div>
                    <DropdownList
                      handleChange={async (e) => {
                        if (e !== null) {
                          await props.handleIndividualProponentSelection(e);
                        }
                      }}
                      isMulti={false}
                      options={props.DDLProponent}
                      Dvalue={props.individualProponentSelection}
                      placeholder='(Optional) Choose one or more indiv. proponent'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='row'>
              <div className='col-6 col-sm-6'>
                <div className='col-12'>
                  <div className='row'>
                    <label
                      htmlFor='inputPassword'
                      className='col-sm-4 col-form-label'
                    >
                      Date
                    </label>
                    <div className='col-sm-8'>
                      <div className='row'>
                        <div className='col-2 chkCenterAlign'>
                          <div>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              onChange={(e) => {
                                props.handleIsDateChecked(e);
                              }}
                              checked={props.isDateChecked}
                            />
                          </div>
                        </div>
                        <div className='col-5'>
                          <DatePicker
                            selected={props.startInvCompDate}
                            onChange={async (e) => {
                              await props.handleStartDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            readOnly={!props.isDateChecked}
                            selectsStart
                            startDate={props.startInvCompDate}
                            endDate={props.endInvCompDate}
                            //
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                          />
                        </div>
                        <div className='col-5'>
                          <DatePicker
                            selected={props.endInvCompDate}
                            onChange={async (e) => {
                              await props.handleEndDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            selectsEnd
                            startDate={props.startInvCompDate}
                            endDate={props.endInvCompDate}
                            minDate={props.startInvCompDate}
                            readOnly={!props.isDateChecked}
                            //
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 pt-2'>
                  <div className='row'>
                    <label
                      htmlFor='inputPassword'
                      className='col-sm-4 col-form-label'
                    >
                      Output Fields
                    </label>
                    <div className='col-sm-8 p-2'>
                      <div className='form-check form-check-inline'>
                        {props.status &&
                          (props.status === FULL_USER ? (
                            <input
                              className='form-check-input'
                              type='radio'
                              name='chkOutcome'
                              id='chkData'
                              value='Data'
                              onClick={async () => {
                                await props.handleOutcomeFieldsChecked(
                                  OUTCOME_FIELDS_DATA
                                );
                              }}
                              checked={props.isCheckedOutcomeFieldsData}
                              onChange={() => {}}
                            />
                          ) : (
                            <input
                              className='form-check-input'
                              type='radio'
                              name='chkOutcome'
                              id='chkData'
                              value='Data'
                              disabled
                            />
                          ))}

                        <label className='form-check-label' htmlFor='chkData'>
                          Data
                        </label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='chkOutcome'
                          id='chkAnalysis'
                          value='Analysis'
                          onClick={async () => {
                            await props.handleOutcomeFieldsChecked(
                              OUTCOME_FIELDS_ANALYSIS
                            );
                          }}
                          checked={props.isCheckedOutcomeFieldsAnalysis}
                          onChange={() => {}}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='chkAnalysis'
                        >
                          Analysis
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <FilterSavesearchModal {...props} isShowFilterSavesearchModal />
            </div>
          </div>

          {/* <div className='container'>
            <div className='row'></div>
          </div> */}

          <div className='container'>
            <div className='mt-2 row'>
              <div className='col-12'>
                {props.DDLProponent.length > 0 && (
                  <button
                    type='button'
                    className='btn btn-primary btn-sm float-end'
                    onClick={() => props.onSearch()}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(NoActionLetterFilter);
