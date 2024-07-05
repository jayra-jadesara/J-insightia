import React from 'react';
import CompanySearchComponent from '../../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../../GeneralForm/InvestorSearchComponent';
import { filterFunctions } from '../../../utils/general-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const CompanyAndInvestorFilter = (props) => {
  const {
    HandleFilterModel,
    invCompCompanyPeerGroupSelection,
    handleClearPeerGroupCompanySelection,
    isShowInvestorSelection,
    HandleInvestorFilterModel,
    handleReset,
    invCompInvestorPeerGroupSelection,
    handleClearPeerGroupInvestorSelection,
    isPreferences,
    alertCompanySearchId,
    alertInvestorSearchId,
    isExistingAlert,
    alert_cmp_search_id,
    alert_inv_search_id,
    isAlertFilter,
    customCompanyBtnName,
    customCompanyLabelName,
    isActivistVulnerability,
    isCompanyBtn,
    isInvestorBtn,
  } = props;

  if (isExistingAlert || isAlertFilter) {
    if (isExistingAlert || isAlertFilter) {
      React.useEffect(() => {
        props.handleResetAlertFilterIds();
      }, [props.handleResetAlertFilterIds, alert_cmp_search_id, alert_inv_search_id]);
    }
    React.useEffect(() => {
      async function get_invData() {
        // await props.handleResetAlertFilterIds();
        if (alert_inv_search_id !== null) {
          if (props.GetInvestorSearchSelection) {
            const inv_data = await props.GetInvestorSearchSelection(alert_inv_search_id);
            const obj = {
              label: inv_data.payload.investor_search[0].Name,
              value: inv_data.payload.investor_search[0].investor_search_id,
            };
            props.handleInvestorSearchSelectionInvComp(obj);
          }
        } else {
          handleClearPeerGroupInvestorSelection();
          props.handleResetInvestorSelections();
        }
      }
      get_invData();
      async function get_cmpData() {
        if (alert_cmp_search_id !== null) {
          const cmp_data = await props.getAllCompanySearchSelection(alert_cmp_search_id);
          const obj = {
            value: cmp_data.payload.company_search[0].company_search_id,
            label: cmp_data.payload.company_search[0].Name,
            isSaved: cmp_data.payload.company_search[0].is_saved,
          };
          await props.handleComapnySearchSelectionInvComp(obj);
        } else {
          handleClearPeerGroupCompanySelection();
          props.handleResetCompnaySelections();
        }
      }
      get_cmpData();
    }, [alert_cmp_search_id, alert_inv_search_id]);
  } else if (isActivistVulnerability) {
    React.useEffect(() => {
      handleClearPeerGroupCompanySelection();
      props.handleResetCompnaySelections();
    }, [handleClearPeerGroupCompanySelection, props.handleResetCompnaySelections, isActivistVulnerability]);
  } else {
    React.useEffect(() => {
      filterFunctions(props);
    }, [props.isShowInvestorSelection]);
  }

  return (
    <ErrorBoundary>
      <CompanySearchComponent
        showFilterModel={props.showFilterModel}
        listOfcompanySearchOptions={props.listOfcompanySearchOptions}
        HandleFilterModel={props.HandleFilterModel}
        handleCompanySelection={props.handleCompanySelection}
        handleShowIndividualOption={props.handleShowIndividualOption}
        showIndividualOption={isActivistVulnerability ? false : props.showIndividualOption}
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
        isPreferences={isPreferences}
        defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
        defaultPiListSectorsAndIndustries={props.defaultPiListSectorsAndIndustries}
        isAlertFilter={isAlertFilter}
        handleComapnySearchSelectionInvComp={props.handleComapnySearchSelectionInvComp}
        isActivistVulnerability={isActivistVulnerability}
      />

      <InvestorSearchComponent
        HandleInvestorFilterModel={props.HandleInvestorFilterModel}
        investorSearchOptions={props.investorSearchOptions}
        investorSearchOptionsSelection={props.investorSearchOptionsSelection}
        showInvestorFilterModel={props.showInvestorFilterModel}
        HandleTreeViewInvestorLocation={props.HandleTreeViewInvestorLocation}
        investorLocationSelection={props.investorLocationSelection}
        listInvestorTypeAndSubtype={props.listInvestorTypeAndSubtype}
        listInvestorTypeAndSubtypeSelection={props.listInvestorTypeAndSubtypeSelection}
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
        getAllInvestorsFromShareholderOfCompany={props.getAllInvestorsFromShareholderOfCompany}
        HandleTreeViewListInvestorTypeAndSubtype={props.HandleTreeViewListInvestorTypeAndSubtype}
        listMarketCap={props.listMarketCap}
        handleMarketCapSelection={props.handleMarketCapSelection}
        marketCapSelection={props.marketCapSelection}
        // AUM ($bn).
        listAumCategory={props.listAumCategory}
        aumCategorySelection={props.aumCategorySelection}
        handleAumCategorySelection={props.handleAumCategorySelection}
        //
        handleMarketCapMinRange={props.handleMarketCapMinRange}
        txtMarketCapMinRange={props.txtMarketCapMinRange}
        txtMarketCapMaxRange={props.txtMarketCapMaxRange}
        handleMarketCapMaxRange={props.handleMarketCapMaxRange}
        handleSaveInvestorCurrentList={props.handleSaveInvestorCurrentList}
        txtSaveCurrentList={props.txtSaveCurrentList}
        handleInvestorSearchDeleteReq={props.handleInvestorSearchDeleteReq}
        getInvestorSearchOptions={props.getInvestorSearchOptions}
        isSaveCurrentListButtonDeleteDisable={props.isSaveCurrentListButtonDeleteDisable}
        saveCurrentListButtonText={props.saveCurrentListButtonText}
        handleInvestorSearchUpdateReq={props.handleInvestorSearchUpdateReq}
        handleInvestorSearchOptionSelection={props.handleInvestorSearchOptionSelection}
        GetInvestorSearchSelection={props.GetInvestorSearchSelection}
        ResetInvestorSearchOptionSelection={props.ResetInvestorSearchOptionSelection}
        invTxtMarketCapMinRange={props.invTxtMarketCapMinRange}
        invTxtMarketCapMaxRange={props.invTxtMarketCapMaxRange}
        handleInvMarketCapMinRange={props.handleInvMarketCapMinRange}
        handleInvMarketCapMaxRange={props.handleInvMarketCapMaxRange}
        isPreferences={isPreferences}
        listDefaultInvestorTypeAndSubtype={props.listDefaultInvestorTypeAndSubtype}
        lstInvestorRegeionAndCountries={props.lstInvestorRegeionAndCountries}
        isAlertFilter={isAlertFilter}
        handleInvestorSearchSelectionInvComp={props.handleInvestorSearchSelectionInvComp}
      />
      {isPreferences !== undefined ? (
        <>
          <div className='row'>
            {isCompanyBtn && (
              <div>
                <div className='row' style={{ paddingLeft: '8px' }}>
                  <label htmlFor='byCompanySelection' className='col-lg-12 mb-0 col-form-label'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      onClick={() => {
                        HandleFilterModel(true);
                      }}
                    >
                      {props.companyBtnLabel !== undefined ? props.companyBtnLabel : 'By Company Selection'}
                    </button>
                  </label>
                  {props.isHideCmpLabel ? (
                    ''
                  ) : (
                    <div className='col-lg-6 mb-0 text-secondary labelNewsCompanyFilter'>
                      {invCompCompanyPeerGroupSelection !== undefined ? (
                        <div className='btnPeerGrpRemove'>
                          {invCompCompanyPeerGroupSelection.label}
                          <i
                            className='bi bi-backspace-fill'
                            title='Clear selection'
                            onClick={handleClearPeerGroupCompanySelection}
                          />
                        </div>
                      ) : (
                        'No specific company selected'
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            {isShowInvestorSelection !== undefined
              ? isShowInvestorSelection
              : isInvestorBtn && (
                  <>
                    <div>
                      <div className='row' style={{ paddingLeft: '15px' }}>
                        <label htmlFor='inputPassword' className='col-lg-12  mb-0 col-form-label'>
                          <button
                            type='button'
                            className='btn btn-primary  btn-sm'
                            onClick={() => {
                              HandleInvestorFilterModel(true);
                            }}
                          >
                            {props.investorBtnLabel !== undefined ? props.investorBtnLabel : 'By Investor Selection'}
                          </button>
                        </label>
                        {props.isHideinvLabel ? (
                          ''
                        ) : (
                          <div className='col-sm-6 mb-0 text-secondary labelNewsCompanyFilter'>
                            {invCompInvestorPeerGroupSelection !== undefined ? (
                              <div className='btnPeerGrpRemove'>
                                {invCompInvestorPeerGroupSelection.label}
                                <i
                                  className='bi bi-backspace-fill'
                                  title='Clear selection'
                                  onClick={() => {
                                    handleClearPeerGroupInvestorSelection();
                                  }}
                                />
                              </div>
                            ) : (
                              'No specific investor selected'
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
          </div>
        </>
      ) : (
        <>
          <div className='row'>
            <div className='col-sm' style={isActivistVulnerability && { marginBottom: 0, paddingBottom: 0 }}>
              <div className='row'>
                <label htmlFor='byCompanySelection' className='col-sm-4 mb-0 col-form-label'>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      HandleFilterModel(true);
                    }}
                  >
                    {customCompanyBtnName !== undefined ? customCompanyBtnName : 'By Company Selection'}
                  </button>
                </label>

                <div className='col-sm-8  mb-0 text-secondary labelNewsCompanyFilter'>
                  {invCompCompanyPeerGroupSelection !== undefined && invCompCompanyPeerGroupSelection !== null ? (
                    <div className='btnPeerGrpRemove'>
                      {isActivistVulnerability
                        ? `Custom : ${invCompCompanyPeerGroupSelection.label} *`
                        : invCompCompanyPeerGroupSelection.label}
                      <i
                        className='bi bi-backspace-fill'
                        title='Clear selection'
                        onClick={() => {
                          handleClearPeerGroupCompanySelection();
                          props.handleResetCompnaySelections();
                        }}
                      />
                    </div>
                  ) : isActivistVulnerability ? (
                    `Default : ${customCompanyLabelName} *`
                  ) : (
                    'No specific company selected'
                  )}
                </div>
              </div>
            </div>
            <div className='col-sm'>
              {isShowInvestorSelection !== undefined ? (
                isShowInvestorSelection
              ) : (
                <>
                  <div className='row'>
                    <label htmlFor='inputPassword' className='col-sm-4  mb-0 col-form-label'>
                      <button
                        type='button'
                        className='btn btn-primary  btn-sm'
                        onClick={() => {
                          HandleInvestorFilterModel(true);
                        }}
                      >
                        By Investor Selection
                      </button>
                    </label>
                    <div className='col-sm-8 mb-0 text-secondary labelNewsCompanyFilter'>
                      {invCompInvestorPeerGroupSelection !== undefined ? (
                        <div className='btnPeerGrpRemove'>
                          {invCompInvestorPeerGroupSelection.label}
                          <i
                            className='bi bi-backspace-fill'
                            title='Clear selection'
                            onClick={() => {
                              handleClearPeerGroupInvestorSelection();
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
        </>
      )}
    </ErrorBoundary>
  );
};

export default CompanyAndInvestorFilter;
