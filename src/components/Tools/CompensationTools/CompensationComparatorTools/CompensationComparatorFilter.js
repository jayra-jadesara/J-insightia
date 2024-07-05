import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import CollapseComponent from '../../../GeneralForm/CollapseComponent';
import SearchInput from '../../../GeneralForm/DropdownVirtualized';
import DropdownList from '../../../GeneralForm/DropdownList';
import CompanySearchComponent from '../../../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../../../GeneralForm/InvestorSearchComponent';
import DissidentVotingSummaryConstant from '../../../../constants/DissidentVotingSummaryConstant';
import DropdownTreeSelect from '../../../GeneralForm/DropdownTreeSelect';
import numConst, { NUMBER_ONE } from '../../../../constants/NumberConstants';
import 'react-datepicker/dist/react-datepicker.css';
import { TRIAL_USER } from '../../../../constants/CompanyTrialTypeConstants';
import { GetAllInvestors, GetAllPeopleList, GetAllIssuers } from '../../../../utils/dashboard-util';
import DropdownListAsync from '../../../GeneralForm/DropdownListAsync';
import { filterFunctions } from '../../../../utils/general-util';
// ddlCompensationType
// selectionCompensationType

function CompensationComparatorFilter(props) {
  useEffect(() => {
    filterFunctions(props);
  }, [props.isShowInvestorSelection]);
  return (
    <div className='row'>
      <CollapseComponent
        isOpen={props.isExpandFilter !== undefined ? props.isExpandFilter : true}
        Heading={props.filterHeading !== undefined ? props.filterHeading : 'Compensation Comparator Filter'}
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
          handleCompanySearchOptionSelection={props.handleCompanySearchOptionSelection}
          getAllCompanySearchSelection={props.getAllCompanySearchSelection}
          txtSaveCurrentList={props.txtSaveCurrentList}
          ResetCompanySearchOptionSelection={props.ResetCompanySearchOptionSelection}
          saveCurrentListButtonText={props.saveCurrentListButtonText}
          handleCompanyAndIndustry={props.handleCompanyAndIndustry}
          freeSearchRecordset={props.freeSearchRecordset}
          companySelection={props.companySelection}
          companySingleSelection={props.companySingleSelection}
          handleCompanySearchUpdateReq={props.handleCompanySearchUpdateReq}
          getCompanySearchOptions={props.getCompanySearchOptions}
          handleCompanySearchDeleteReq={props.handleCompanySearchDeleteReq}
          handleCompanySingleSelection={props.handleCompanySingleSelection}
          handdleRun={(e) => {
            props.handleComapnySearchSelectionInvComp(e);
          }}
          defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
          defaultPiListSectorsAndIndustries={props.defaultPiListSectorsAndIndustries}
          handleComapnySearchSelectionInvComp={props.handleComapnySearchSelectionInvComp}
        />
        <div className='row'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg'>
                <div className='row'>
                  <label htmlFor='byCompanySelection' className='col-sm-4 col-form-label'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      onClick={() => {
                        props.HandleFilterModel(true);
                      }}
                    >
                      By Company Selection
                    </button>
                  </label>

                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    {props.companySearchOptionSelection !== undefined && props.companySearchOptionSelection !== null ? (
                      <div className='btnPeerGrpRemove'>
                        {props.companySearchOptionSelection.label !== null
                          ? props.companySearchOptionSelection.label
                          : ''}
                        <i
                          className='bi bi-backspace-fill'
                          title='Clear selection'
                          onClick={() => {
                            props.handleClearPeerGroupCompanySelection();
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

              {props.isShowInvestorSelection !== undefined ? (
                props.isShowInvestorSelection
              ) : (
                <div className='col-lg'>
                  <div className='row'>
                    <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                      <button
                        type='button'
                        className='btn btn-primary  btn-sm'
                        onClick={() => {
                          props.HandleInvestorFilterModel(true);
                        }}
                      >
                        By Investor Selection
                      </button>
                    </label>
                    <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                      {props.invCompInvestorPeerGroupSelection !== undefined &&
                      props.invCompInvestorPeerGroupSelection !== null ? (
                        <div className='btnPeerGrpRemove'>
                          {props.invCompInvestorPeerGroupSelection.label !== null
                            ? props.invCompInvestorPeerGroupSelection.label
                            : ''}
                          <i
                            className='bi bi-backspace-fill'
                            title='Clear selection'
                            onClick={() => {
                              props.handleClearPeerGroupInvestorSelection();
                              props.handleResetInvestorSelections();
                            }}
                          />
                        </div>
                      ) : (
                        'No specific investor selected'
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-lg'>
                <div className='row'>
                  <label className='col-lg-4'>Individual Search</label>
                  <div className='col-lg-8'>
                    <DropdownListAsync
                      loadOptions={(e) => GetAllPeopleList(e)}
                      handleChange={(e) => props.handleCompensationIndividualSelection(e)}
                      selectedValue={props.selectionCompensationIndivisual}
                      isMulti
                      placeholder='(Optional) Start typing to search for a Individual...'
                      maxHeight={180}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg'>
                <div className='row'>
                  <label className='col-lg-4'>Job/Role:</label>
                  <label className='col-lg-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleCompensationDirectorType(e);
                      }}
                      isMulti
                      options={props.ddlDirectortypes}
                      Dvalue={props.selectionDirectortypes}
                      placeholder='(Optional) Choose one or more director type…'
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row pt-2'>
              <div className='col-lg'>
                <div className='row'>
                  <label className='col-lg-4'>Tenure:</label>
                  <div className='col-lg-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleCompensationTenure(e);
                      }}
                      isMulti
                      options={props.ddlCompensationTenure}
                      Dvalue={props.selectionDdlCompensationTenure}
                      placeholder='(Optional) Choose one or more tenure…'
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg'>
                {/* <div className='row'>
                  <label className='col-lg-4'>Committee:</label>
                  <label className='col-lg-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleMeetingTypeSelection(e);
                      }}
                      isMulti
                      options={[]}
                      Dvalue={[]}
                      placeholder='(Optional) Choose one or more committee types…'
                    />
                  </label>
                </div> */}
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row pt-2'>
              <div className='col-lg'>
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-lg-4 col-form-label'>
                    Report Date:
                  </label>
                  <div className='col-lg-8'>
                    <div className='row'>
                      <div className='col-2 chkCenterAlign'>
                        <div>
                          {props.status !== TRIAL_USER ? (
                            <input
                              className='form-check-input'
                              type='checkbox'
                              onChange={(e) => {
                                props.handleIsInvCompendationDateChecked(e);
                              }}
                              checked={props.isCompensationDateChecked}
                            />
                          ) : (
                            <input
                              className='form-check-input'
                              type='checkbox'
                              disabled
                              checked={props.isCompensationDateChecked}
                            />
                          )}
                        </div>
                      </div>
                      <div className='col-5'>
                        {props.status !== TRIAL_USER ? (
                          <DatePicker
                            selected={props.compensatinStartDate}
                            onChange={async (e) => {
                              await props.handleStartInvCompensationDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            disabled={!props.isCompensationDateChecked}
                            startDate={props.compensatinStartDate}
                            endDate={props.compensationEndDate}
                            //
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                          />
                        ) : (
                          <DatePicker
                            disabled
                            selected={new Date().setMonth(new Date().getMonth() - NUMBER_ONE)}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                          />
                        )}
                      </div>
                      <div className='col-5'>
                        {props.status !== TRIAL_USER ? (
                          <DatePicker
                            selected={props.compensationEndDate}
                            disabled={!props.isCompensationDateChecked}
                            onChange={async (e) => {
                              await props.handleEndInvCompensationDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            startDate={props.compensatinStartDate}
                            endDate={props.compensationEndDate}
                            minDate={props.compensatinStartDate}
                            readOnly={!props.compensatinStartDate}
                            //
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                          />
                        ) : (
                          <DatePicker
                            disabled
                            selected={new Date()}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg'>
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-lg-4 col-form-label'>
                    Compensation Type:
                  </label>
                  <div className='col-lg-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        if (e !== null) {
                          await props.handleOnChangeDdlValue(e);
                        }
                      }}
                      isMulti={false}
                      options={props.ddlCompensationType}
                      Dvalue={props.selectionCompensationType}
                      placeholder='Choose any one compensation types…'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-2'>
              <div className='col-lg-6' />
              <div className='col-lg-6'>
                <button type='button' className='btn btn-primary btn-sm float-end' onClick={props.onSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
}

export default React.memo(CompensationComparatorFilter);
