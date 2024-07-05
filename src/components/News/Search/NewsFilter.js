import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import DropdownList from '../../GeneralForm/DropdownList';
import DatePicker from '../../GeneralForm/ReactDatePicker';
import DropdownTreeSelect from '../../GeneralForm/DropdownTreeSelect';
import CompanySearchComponent from '../../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../../GeneralForm/InvestorSearchComponent';
import numConst from '../../../constants/NumberConstants';
import SearchInput from '../../GeneralForm/DropdownVirtualized';

const NewsFilter = ({
  location,
  handlequickSearchReq,
  newsFilterReq,
  showFilterModel,
  listOfcompanySearchOptions,
  HandleFilterModel,
  handleCompanySelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  showIndividualOption,
  handleBulkCompanySelection,
  piListIndices,
  handleIndexSelectionChange,
  indexSelection,
  listOfExchange,
  handleExchangeSelectionChange,
  exchangeSelection,
  aiPeerGroups,
  handleAIPeerGroupSelection,
  aiPeerGroupSelection,
  listMarketCap,
  marketCapSelection,
  txtMarketCapMaxRange,
  txtMarketCapMinRange,
  handleMarketCapMaxRange,
  handleMarketCapMinRange,
  handleIndustrySelection,
  industrySelection,
  companyLocationSelection,
  piListOfSectorsAndIndustries,
  HandleTreeViewCompanyLocation,
  companySearchOptionSelection,
  handleMarketCapSelection,
  HandleTreeViewIndustry,
  listRegeionAndCountries,
  handleSaveCurrentList,
  handleCompanySearchOptionSelection,
  getAllCompanySearchSelection,
  txtSaveCurrentList,
  ResetCompanySearchOptionSelection,
  saveCurrentListButtonText,
  handleCompanyAndIndustry,
  freeSearchRecordset,
  companySelection,
  companySingleSelection,
  handleCompanySearchUpdateReq,
  getCompanySearchOptions,
  handleCompanySearchDeleteReq,
  handleCompanySingleSelection,
  handdleRun,
  HandleInvestorFilterModel,
  investorSearchOptions,
  investorSearchOptionsSelection,
  showInvestorFilterModel,
  HandleTreeViewInvestorLocation,
  investorLocationSelection,
  listInvestorTypeAndSubtype,
  listInvestorTypeAndSubtypeSelection,
  handleInvestorSelection,
  investorSelection,
  handleInvestorIsBulkUpload,
  isInvestorBulkUpload,
  handleSearchInvestor,
  handleBulkInvestorSelection,
  listByIndivProponent,
  selectionByIndivProponent,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  getInvestorSearchOptions,
  isSaveCurrentListButtonDeleteDisable,
  handleInvestorSearchUpdateReq,
  handleInvestorSearchOptionSelection,
  GetInvestorSearchSelection,
  ResetInvestorSearchOptionSelection,
  handleCompanyChangePeerGrp,
  companyPeerGroupSelection,
  handleClearPeerGroupCompanySelection,
  handleInvestorChangePeerGrp,
  handleReset,
  investorPeerGroupSelection,
  handleClearPeerGroupInvestorSelection,
  newsFreeSearchText,
  handleNewsFreeSearchText,
  handleNewsfilterSelection,
  handleNewsEventOnChange,
  newsEventSelection,
  newsEvents,
  handleNewsPeriodSelection,
  newsPeriodSelection,
  newsPeriod,
  startNewsPeriodDate,
  handleOnStartDateChange,
  endNewsPeriodDate,
  handleOnEndDateChange,
  handleTreeViewActivistObjective,
  allActivistObjective,
  activistObjectiveSelection,
  handleNewsStakeholding,
  newsStakeholdingSelection,
  newsStakeholding,
  isClickModal,
  handleModalClickEvent,
  lstProductMembership,
  handleNewsProductOnChange,
  productSelections,
  defaultCmpRegeionAndCountries,
  lstInvestorRegeionAndCountries,
  handleSearchBtn,
  isOpenTab,
  defaultPiListSectorsAndIndustries,
  listAumCategory,
  aumCategorySelection,
  handleAumCategorySelection,
  invTxtMarketCapMinRange,
  invTxtMarketCapMaxRange,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,

  handleResetCompnaySelections,
  handleResetInvestorSelections,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();

  useEffect(() => {
    async function getData() {
      if (query.q) {
        await handlequickSearchReq(query.q);
        await newsFilterReq(query.q);
        history.push(location.pathname);
      }
    }
    getData();
  }, [handlequickSearchReq, history, location.pathname, query.q, isOpenTab]);

  return (
    <div>
      <CollapseComponent
        isOpen={isOpenTab}
        isClickModal={isClickModal}
        handleModalClickEvent={handleModalClickEvent}
        Heading='News Filter'
      >
        <CompanySearchComponent
          showFilterModel={showFilterModel}
          listOfcompanySearchOptions={listOfcompanySearchOptions}
          HandleFilterModel={HandleFilterModel}
          handleCompanySelection={handleCompanySelection}
          handleShowIndividualOption={handleShowIndividualOption}
          showIndividualOption={showIndividualOption}
          handleShowGroupOption={handleShowGroupOption}
          handleBulkCompanySelection={handleBulkCompanySelection}
          piListIndices={piListIndices}
          handleIndexSelectionChange={handleIndexSelectionChange}
          indexSelection={indexSelection}
          listOfExchange={listOfExchange}
          handleExchangeSelectionChange={handleExchangeSelectionChange}
          exchangeSelection={exchangeSelection}
          aiPeerGroups={aiPeerGroups}
          handleAIPeerGroupSelection={handleAIPeerGroupSelection}
          aiPeerGroupSelection={aiPeerGroupSelection}
          listMarketCap={listMarketCap}
          marketCapSelection={marketCapSelection}
          handleMarketCapSelection={handleMarketCapSelection}
          txtMarketCapMinRange={txtMarketCapMinRange}
          txtMarketCapMaxRange={txtMarketCapMaxRange}
          handleMarketCapMinRange={handleMarketCapMinRange}
          handleMarketCapMaxRange={handleMarketCapMaxRange}
          handleIndustrySelection={handleIndustrySelection}
          industrySelection={industrySelection}
          companyLocationSelection={companyLocationSelection}
          piListOfSectorsAndIndustries={piListOfSectorsAndIndustries}
          HandleTreeViewIndustry={HandleTreeViewIndustry}
          listRegeionAndCountries={listRegeionAndCountries}
          defaultCmpRegeionAndCountries={defaultCmpRegeionAndCountries}
          lstInvestorRegeionAndCountries={lstInvestorRegeionAndCountries}
          handleSaveCurrentList={handleSaveCurrentList}
          HandleTreeViewCompanyLocation={HandleTreeViewCompanyLocation}
          companySearchOptionSelection={companySearchOptionSelection}
          handleCompanySearchOptionSelection={handleCompanySearchOptionSelection}
          getAllCompanySearchSelection={getAllCompanySearchSelection}
          txtSaveCurrentList={txtSaveCurrentList}
          ResetCompanySearchOptionSelection={ResetCompanySearchOptionSelection}
          saveCurrentListButtonText={saveCurrentListButtonText}
          handleCompanyAndIndustry={handleCompanyAndIndustry}
          freeSearchRecordset={freeSearchRecordset}
          companySelection={companySelection}
          companySingleSelection={companySingleSelection}
          handleCompanySearchUpdateReq={handleCompanySearchUpdateReq}
          getCompanySearchOptions={getCompanySearchOptions}
          handleCompanySearchDeleteReq={handleCompanySearchDeleteReq}
          handleCompanySingleSelection={handleCompanySingleSelection}
          handdleRun={handdleRun}
          defaultPiListSectorsAndIndustries={defaultPiListSectorsAndIndustries}
        />

        <InvestorSearchComponent
          HandleInvestorFilterModel={HandleInvestorFilterModel}
          investorSearchOptions={investorSearchOptions}
          investorSearchOptionsSelection={investorSearchOptionsSelection}
          showInvestorFilterModel={showInvestorFilterModel}
          HandleTreeViewInvestorLocation={HandleTreeViewInvestorLocation}
          investorLocationSelection={investorLocationSelection}
          listInvestorTypeAndSubtype={listInvestorTypeAndSubtype}
          listInvestorTypeAndSubtypeSelection={listInvestorTypeAndSubtypeSelection}
          handleInvestorSelection={handleInvestorSelection}
          investorSelection={investorSelection}
          handleInvestorIsBulkUpload={handleInvestorIsBulkUpload}
          isInvestorBulkUpload={isInvestorBulkUpload}
          freeSearchRecordset={freeSearchRecordset}
          handleSearchInvestor={handleSearchInvestor}
          lstInvestorRegeionAndCountries={lstInvestorRegeionAndCountries}
          handleBulkInvestorSelection={handleBulkInvestorSelection}
          listRegeionAndCountries={listRegeionAndCountries}
          listByIndivProponent={listByIndivProponent}
          selectionByIndivProponent={selectionByIndivProponent}
          handleByShareholderOfCompany={handleByShareholderOfCompany}
          getAllInvestorsFromShareholderOfCompany={
            getAllInvestorsFromShareholderOfCompany
          }
          HandleTreeViewListInvestorTypeAndSubtype={
            HandleTreeViewListInvestorTypeAndSubtype
          }
          listMarketCap={listMarketCap}
          handleMarketCapSelection={handleMarketCapSelection}
          marketCapSelection={marketCapSelection}
          // AUM ($bn).
          listAumCategory={listAumCategory}
          aumCategorySelection={aumCategorySelection}
          handleAumCategorySelection={handleAumCategorySelection}
          invTxtMarketCapMinRange={invTxtMarketCapMinRange}
          invTxtMarketCapMaxRange={invTxtMarketCapMaxRange}
          handleInvMarketCapMinRange={handleInvMarketCapMinRange}
          handleInvMarketCapMaxRange={handleInvMarketCapMaxRange}
          //
          handleMarketCapMinRange={handleMarketCapMinRange}
          txtMarketCapMinRange={txtMarketCapMinRange}
          txtMarketCapMaxRange={txtMarketCapMaxRange}
          handleMarketCapMaxRange={handleMarketCapMaxRange}
          handleSaveInvestorCurrentList={handleSaveInvestorCurrentList}
          txtSaveCurrentList={txtSaveCurrentList}
          handleInvestorSearchDeleteReq={handleInvestorSearchDeleteReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          isSaveCurrentListButtonDeleteDisable={
            isSaveCurrentListButtonDeleteDisable
          }
          saveCurrentListButtonText={saveCurrentListButtonText}
          handleInvestorSearchUpdateReq={handleInvestorSearchUpdateReq}
          handleInvestorSearchOptionSelection={
            handleInvestorSearchOptionSelection
          }
          GetInvestorSearchSelection={GetInvestorSearchSelection}
          ResetInvestorSearchOptionSelection={
            ResetInvestorSearchOptionSelection
          }
          handdleRun={handdleRun}
        />
        <div className='row pt-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label htmlFor='byCompanySelection' className='col-sm-4 col-form-label'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      onClick={() => {
                        HandleFilterModel(true);
                        handleCompanyChangePeerGrp();
                      }}
                    >
                      By Company Selection
                    </button>
                  </label>
                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    {companyPeerGroupSelection !== undefined ? (
                      <div className='btnPeerGrpRemove'>
                        {companyPeerGroupSelection.label}
                        <i
                          className='bi bi-backspace-fill'
                          title='Clear selection'
                          onClick={() => {
                            handleClearPeerGroupCompanySelection();
                            handleResetCompnaySelections();
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
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                    <button
                      type='button'
                      className='btn btn-primary  btn-sm'
                      onClick={() => {
                        HandleInvestorFilterModel(true);
                        handleInvestorChangePeerGrp();
                      }}
                    >
                      By Investor Selection
                    </button>
                  </label>
                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    {investorPeerGroupSelection !== undefined ? (
                      <div className='btnPeerGrpRemove'>
                        {investorPeerGroupSelection.label}
                        <i
                          className='bi bi-backspace-fill'
                          title='Clear selection'
                          onClick={() => {
                            handleClearPeerGroupInvestorSelection();
                            ResetInvestorSearchOptionSelection();
                            handleResetInvestorSelections();
                          }}
                        />
                      </div>
                    ) : (
                      'No specific investor selected'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm col-md-6'>
                <div className='row align-items-center'>
                  <label htmlFor='freetextsearch' className='col-sm-4 col-form-label '>
                    Free Text search
                  </label>
                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    <input
                      type='text'
                      className='form-control'
                      aria-describedby='freetextsearch'
                      placeholder='(Optional) Enter text to search...'
                      value={newsFreeSearchText}
                      onChange={async (e) => {
                        await handleNewsFreeSearchText(e);
                        await handleNewsfilterSelection();
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm col-md-6'>
                <div className='row align-items-center'>
                  <label htmlFor='freetextsearch' className='col-sm-4 col-form-label '>
                    Modules
                  </label>
                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    <SearchInput
                      onChange={async (e) => {
                        await handleNewsProductOnChange(e);
                        await handleNewsfilterSelection();
                      }}
                      selectValue={productSelections}
                      options={lstProductMembership}
                      isMulti
                      placeholder='(Optional) Choose one or more modules…'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <label htmlFor='ddlEvents' className='col-form-label'>
              <b>Specific Searches:</b>
            </label>
          </div>

          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                    Event
                  </label>
                  <div className='col-sm-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await handleNewsEventOnChange(e);
                        await handleNewsfilterSelection();
                      }}
                      isMulti
                      options={newsEvents}
                      Dvalue={newsEventSelection}
                      placeholder='(Optional) Choose one or more events…'
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm'>
                <div className='mb-3 row'>
                  <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                    Period
                  </label>
                  <div className='col-sm-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await handleNewsPeriodSelection(e);
                        await handleNewsfilterSelection();
                      }}
                      isMulti={false}
                      options={newsPeriod}
                      Dvalue={newsPeriodSelection}
                      placeholder='(Optional) Choose period...'
                    />
                    {newsPeriodSelection && newsPeriodSelection.value === '' && (
                      <div>
                        <label htmlFor='ddlEvents' className='col-form-label'>
                          Specify Period From:
                        </label>
                        <br />
                        <div className='row'>
                          <div className='col-6'>
                            <DatePicker
                              selectedDate={startNewsPeriodDate}
                              handleDateChange={async (e) => {
                                await handleOnStartDateChange(e);
                                await handleNewsfilterSelection();
                              }}
                              dateFormat='dd-MMM-yyyy'
                              minDate={new Date('2010-1-1')}
                              maxDate={new Date()}
                              //
                              showYearDropdown
                              showMonthDropdown
                              useShortMonthInDropdown
                            />
                          </div>
                          <div className='col-6'>
                            <DatePicker
                              selectedDate={endNewsPeriodDate}
                              handleDateChange={async (e) => {
                                await handleOnEndDateChange(e);
                                await handleNewsfilterSelection();
                              }}
                              dateFormat='dd-MMM-yyyy'
                              minDate={new Date('2010-1-1')}
                              maxDate={new Date()}
                              //
                              showYearDropdown
                              showMonthDropdown
                              useShortMonthInDropdown
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                    Activist Objective
                  </label>
                  <div className='col-sm-8'>
                    <DropdownTreeSelect
                      onChangeSelection={(currentnode, selectednode) => {
                        handleTreeViewActivistObjective(currentnode, selectednode);
                        handleNewsfilterSelection();
                      }}
                      options={allActivistObjective}
                      placeholder={
                        activistObjectiveSelection.length === numConst.EMPTY_TABLE_LENGTH
                          ? '(Optional) Choose one or more objectives…'
                          : ' '
                      }
                      totalSelection={activistObjectiveSelection.length}
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm'>
                <div className='row'>
                  <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                    Activist Stakeholding
                  </label>
                  <div className='col-sm-8'>
                    <DropdownList
                      handleChange={async (e) => {
                        await handleNewsStakeholding(e);
                        await handleNewsfilterSelection();
                      }}
                      isMulti
                      options={newsStakeholding}
                      Dvalue={newsStakeholdingSelection}
                      placeholder='(Optional) Choose one or more stakeholding…'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2 row'>
              <div className='col-12'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm float-end'
                  onClick={async () => {
                    await handleSearchBtn();
                    newsFilterReq(null);
                  }}
                  // onClick={() => {
                  //   return (
                  //     <div>
                  //       {newsFilterReq(null)}
                  //     </div>

                  //   )}}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(NewsFilter);
