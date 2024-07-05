import React from 'react';
import DatePicker from 'react-datepicker';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import SearchInput from '../../GeneralForm/DropdownVirtualized';
import DropdownList from '../../GeneralForm/DropdownList';
import CompanySearchComponent from '../../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../../GeneralForm/InvestorSearchComponent';
import DissidentVotingSummaryConstant from '../../../constants/DissidentVotingSummaryConstant';
import DropdownTreeSelect from '../../GeneralForm/DropdownTreeSelect';
import numConst, { NUMBER_ONE } from '../../../constants/NumberConstants';

import 'react-datepicker/dist/react-datepicker.css';
import { TRIAL_USER } from '../../../constants/CompanyTrialTypeConstants';
import { GetAllInvestors } from '../../../utils/dashboard-util';
import DropdownListAsync from '../../GeneralForm/DropdownListAsync';
import { filterFunctions } from '../../../utils/general-util';
import FilterSavesearchModal from '../General/FilterSavesearchModal';

const InvestorComparatorFilter = (props) => {
  const {
    VOTING_TOOLS_DESIRED_OUTCOME_ALL,
    VOTING_TOOLS_DESIRED_OUTCOME_SHORT_SLATE,
    VOTING_TOOLS_DESIRED_OUTCOME_BOARD_CONTROL,
  } = DissidentVotingSummaryConstant;

  React.useEffect(() => {
    if (!props.isProxyContestVoting) {
      filterFunctions(props);
    }
  }, [props.isShowInvestorSelection]);

  function handleSearchFund(e) {
    let validArray = [];
    if (
      props.ddlAdvanceVotingDataFunds &&
      props.ddlAdvanceVotingDataFunds.length
    ) {
      validArray = props.ddlAdvanceVotingDataFunds;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validArray && validArray.length > 0) {
          const data = validArray.filter((i) =>
            i.label.toLowerCase().includes(e.toLowerCase())
          );
          resolve({ data: data });
        }
      }, 100);
    });
  }

  return (
    <div className='row pdfpagebreak'>
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
          handdleRun={(e) => {
            props.handleComapnySearchSelectionInvComp(e);
          }}
          defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
          defaultPiListSectorsAndIndustries={
            props.defaultPiListSectorsAndIndustries
          }
          handleComapnySearchSelectionInvComp={
            props.handleComapnySearchSelectionInvComp
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
          // AUM ($bn).
          listAumCategory={props.listAumCategory}
          aumCategorySelection={props.aumCategorySelection}
          handleAumCategorySelection={props.handleAumCategorySelection}
          invTxtMarketCapMinRange={props.invTxtMarketCapMinRange}
          invTxtMarketCapMaxRange={props.invTxtMarketCapMaxRange}
          handleInvMarketCapMinRange={props.handleInvMarketCapMinRange}
          handleInvMarketCapMaxRange={props.handleInvMarketCapMaxRange}
          //
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
          handdleRun={(e) => {
            props.handleInvestorSearchSelectionInvComp(e);
          }}
          listDefaultInvestorTypeAndSubtype={
            props.listDefaultInvestorTypeAndSubtype
          }
          lstInvestorRegeionAndCountries={props.lstInvestorRegeionAndCountries}
        />
        <div className='row pt-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg'>
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
                      }}
                    >
                      By Company Selection
                    </button>
                  </label>

                  <div className='col-sm-8 text-secondary labelNewsCompanyFilter'>
                    {props.companySearchOptionSelection !== undefined &&
                    props.companySearchOptionSelection !== null ? (
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
                    <label
                      htmlFor='inputPassword'
                      className='col-sm-4 col-form-label'
                    >
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
                          {props.invCompInvestorPeerGroupSelection.label !==
                          null
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
              {props.isMeetingTypeFilter !== undefined ? (
                props.isMeetingTypeFilter
              ) : (
                <div className='col-lg'>
                  <div className='row'>
                    <label
                      htmlFor='inputPassword'
                      className='col-lg-4 col-form-label'
                    >
                      Meeting Type
                    </label>
                    <div className='col-lg-8'>
                      <DropdownList
                        handleChange={async (e) => {
                          await props.handleMeetingTypeSelection(e);
                        }}
                        isMulti
                        options={props.lstMeetingTypes}
                        Dvalue={props.meetingTypeSelection}
                        placeholder='(Optional) Choose one or more meeting types…'
                      />
                      {/* <SearchInput
                        onChange={async (e) => {
                          await props.handleMeetingTypeSelection(e);
                        }}
                        selectValue={props.meetingTypeSelection}
                        options={props.lstMeetingTypes}
                        isMulti
                        loadOptions={(e) => GetAllInvestors(e)}
                        placeholder='(Optional) Choose one or more meeting types…'
                      /> */}
                    </div>
                  </div>
                </div>
              )}

              {props.isShowAdvancedVotingSearchFilter === undefined &&
                !props.isShowAdvancedVotingSearchFilter && (
                  <>
                    {props.isSponsorFilter !== undefined ? (
                      props.isSponsorFilter
                    ) : (
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            Sponsor
                          </label>
                          <div className='col-lg-8'>
                            <SearchInput
                              onChange={async (e) => {
                                await props.handleSponsorSelection(e);
                              }}
                              selectValue={props.sponsorSelection}
                              options={props.lstSponsor}
                              isMulti={false}
                              placeholder='(Optional) Choose Sponsor...'
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              {props.isShowAdvancedVotingSearchFilter !== undefined &&
                props.isShowAdvancedVotingSearchFilter && (
                  <>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Fund (Voting Manager)
                        </label>
                        <div className='col-lg-8'>
                          <DropdownListAsync
                            handleChange={(e) => {
                              props.handleFundNameSelection(e);
                            }}
                            selectedValue={
                              props.ddlAdvanceVotingDataFundSelection
                            }
                            loadOptions={(e) => handleSearchFund(e)}
                            // options={props.ddlAdvanceVotingDataFunds}
                            isMulti
                            disabled={props.isFundSelection}
                            placeholder='(Optional) Choose Fund name...'
                            defaultOptions={props.ddlAdvanceVotingDataFunds.slice(
                              0,
                              10
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>

          <div className='container'>
            <div className='row'>
              <div className='col-lg'>
                <div className='row'>
                  <label
                    htmlFor='inputPassword'
                    className='col-lg-4 col-form-label'
                  >
                    Meeting Date
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
                                props.handleIsInvCompDateChecked(e);
                              }}
                              checked={props.isInvCompDateChecked}
                            />
                          ) : (
                            <input
                              className='form-check-input'
                              type='checkbox'
                              disabled
                              checked={props.isInvCompDateChecked}
                            />
                          )}
                        </div>
                      </div>
                      <div className='col-5'>
                        {props.status !== TRIAL_USER ? (
                          <DatePicker
                            selected={props.startInvCompDate}
                            onChange={async (e) => {
                              console.log('DatePicker', e);
                              console.log('DatePicker', typeof e);
                              await props.handleStartInvCompDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            readOnly={!props.isInvCompDateChecked}
                            startDate={props.startInvCompDate}
                            endDate={props.endInvCompDate}
                            //
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                          />
                        ) : (
                          <DatePicker
                            disabled
                            selected={new Date().setMonth(
                              new Date().getMonth() - NUMBER_ONE
                            )}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                          />
                        )}
                      </div>
                      <div className='col-5'>
                        {props.status !== TRIAL_USER ? (
                          <DatePicker
                            selected={props.endInvCompDate}
                            onChange={async (e) => {
                              await props.handleEndInvCompDateSelection(e);
                            }}
                            className='form-control'
                            dateFormat='dd-MMM-yyyy'
                            startDate={props.startInvCompDate}
                            endDate={props.endInvCompDate}
                            minDate={props.startInvCompDate}
                            readOnly={!props.isInvCompDateChecked}
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
              {props.isShowAdvancedVotingSearchFilter === undefined &&
                !props.isShowAdvancedVotingSearchFilter && (
                  <>
                    <div className='col-lg'>
                      <div className='row'>
                        <label
                          htmlFor='proponent'
                          className='col-lg-4 col-form-label'
                        >
                          Proponent
                        </label>
                        <div className='col-lg-8'>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='inlineRadioOptions'
                              id='individualChecked'
                              value='option1'
                              onClick={() =>
                                props.handleProponentGroupsearch(true)
                              }
                              checked={!!props.isProponentGroup}
                            />
                            <label
                              className='form-check-label'
                              htmlFor='individualChecked'
                            >
                              Individual
                            </label>
                          </div>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='inlineRadioOptions'
                              id='GroupChecked'
                              value='option2'
                              onClick={() =>
                                props.handleProponentGroupsearch(false)
                              }
                              checked={!props.isProponentGroup}
                            />
                            <label
                              className='form-check-label'
                              htmlFor='GroupChecked'
                            >
                              Group
                            </label>
                          </div>

                          {props.isProponentGroup ? (
                            <>
                              <SearchInput
                                onChange={async (e) => {
                                  await props.handleIndividualProponentSelection(
                                    e
                                  );
                                }}
                                selectValue={props.individualProponentSelection}
                                options={props.lstIndividualProponent}
                                isMulti
                                placeholder='(Optional) Choose one or more indiv. proponent'
                              />
                            </>
                          ) : (
                            <>
                              <SearchInput
                                onChange={async (e) => {
                                  await props.handleGroupProponentSelection(e);
                                }}
                                selectValue={props.groupProponentSelection}
                                options={props.lstGroupProponent}
                                isMulti
                                placeholder='(Optional) Choose one or more group proponent'
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              {props.isShowAdvancedVotingSearchFilter !== undefined &&
                props.isShowAdvancedVotingSearchFilter && (
                  <>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Sponsor
                        </label>
                        <div className='col-lg-8'>
                          <SearchInput
                            onChange={async (e) => {
                              await props.handleSponsorSelection(e);
                            }}
                            selectValue={props.sponsorSelection}
                            options={props.lstSponsor}
                            isMulti={false}
                            placeholder='(Optional) Choose Sponsor...'
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>

          {props.isSaveSearchModal && props.isSaveSearchModal && (
            <div className='row'>
              <div className='col-12'>
                <FilterSavesearchModal {...props} isShowFilterSavesearchModal />
              </div>
            </div>
          )}

          {props.isShowDissidentFilters !== undefined &&
            props.isShowDissidentFilters && (
              <>
                <div className='container'>
                  <div className='row mt-3'>
                    <div className='col-lg'>
                      <div className='row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Settlements
                        </label>
                        <div className='col-lg-8'>
                          {/* <SearchInput
                            onChange={async (e) => {
                              await props.handleOnChangeDDLSettlements(e);
                            }}
                            selectValue={props.lstSettlementSelection}
                            options={props.lstSettlements}
                            placeholder=''
                          /> */}
                          {props.isSelectExcludeWithdrawnSettled !==
                            undefined &&
                          props.isSelectExcludeWithdrawnSettled ? (
                            <SearchInput
                              onChange={async (e) => {
                                await props.handleOnChangeDDLSettlementsDissidentSummary(
                                  e
                                );
                              }}
                              selectValue={
                                props.lstSettlementDissidentSummarySelection
                              }
                              options={props.lstSettlementDissidentSummary}
                              placeholder=''
                            />
                          ) : (
                            <SearchInput
                              onChange={async (e) => {
                                await props.handleOnChangeDDLSettlements(e);
                              }}
                              selectValue={props.lstSettlementSelection}
                              options={props.lstSettlements}
                              placeholder=''
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          ISS Slate Recommendation
                        </label>
                        <div className='col-lg-8'>
                          <SearchInput
                            onChange={async (e) => {
                              await props.handleOnChangeDDLIISCardRecommendation(
                                e
                              );
                            }}
                            selectValue={
                              props.lstIISCardRecommendationSelection
                            }
                            options={props.lstIISCardRecommendation}
                            placeholder=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <div className='row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Desired Outcome
                        </label>
                        <div className='col-lg-8'>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='chkDesiredOutcome'
                              id='chkDesiredOutcome'
                              value='ALL'
                              onClick={() =>
                                props.handleDesiredOutcomeChecked(
                                  VOTING_TOOLS_DESIRED_OUTCOME_ALL
                                )
                              }
                              checked={props.isCheckedDesiredOutcomeAll}
                            />
                            <label
                              className='form-check-label'
                              htmlFor='chkDesiredOutcome'
                            >
                              All
                            </label>
                          </div>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='chkDesiredOutcome'
                              id='chkDesiredOutcomeShortSlate'
                              value='Short Slate Only'
                              onClick={() =>
                                props.handleDesiredOutcomeChecked(
                                  VOTING_TOOLS_DESIRED_OUTCOME_SHORT_SLATE
                                )
                              }
                              checked={props.isCheckedDesiredOutcomeShortSlate}
                            />
                            <label
                              className='form-check-label'
                              htmlFor='chkDesiredOutcomeShortSlate'
                            >
                              Short Slate Only
                            </label>
                          </div>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='chkDesiredOutcome'
                              id='chkDesiredOutcomeBoardControl'
                              value='Board Control Only'
                              onClick={() =>
                                props.handleDesiredOutcomeChecked(
                                  VOTING_TOOLS_DESIRED_OUTCOME_BOARD_CONTROL
                                )
                              }
                              checked={
                                props.isCheckedDesiredOutcomeBoardControl
                              }
                            />
                            <label
                              className='form-check-label'
                              htmlFor='chkDesiredOutcomeBoardControl'
                            >
                              Board Control Only
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          GL Slate Recommendation
                        </label>
                        <div className='col-lg-8'>
                          <SearchInput
                            onChange={async (e) => {
                              await props.handleOnChangeDDLGLCardRecommendation(
                                e
                              );
                            }}
                            selectValue={props.lstGLCardRecommendationSelection}
                            options={props.lstGLCardRecommendation}
                            placeholder=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <FilterSavesearchModal
                      {...props}
                      isShowFilterSavesearchModal
                    />
                  </div>
                </div>
              </>
            )}

          {props.isShowAdvancedVotingSearchFilter !== undefined &&
            !props.isShowAdvancedVotingSearchFilter && (
              <>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Proposal Type
                        </label>
                        <div className='col-lg-8'>
                          <DropdownTreeSelect
                            onChangeSelection={
                              props.handleResolutionTypeSelection
                            }
                            totalSelection={
                              props.SetDDLProposalCategory &&
                              props.SetDDLProposalCategory.length
                            }
                            options={props.ddlListOfProposalType}
                            placeholder={
                              props.SetDDLProposalCategory &&
                              props.SetDDLProposalCategory.length ===
                                numConst.EMPTY_TABLE_LENGTH
                                ? '(Optional) Choose Proposal Type...'
                                : ' '
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Vote Cast
                        </label>
                        <div className='col-lg-8'>
                          <SearchInput
                            onChange={(e) => {
                              props.handleVoteCastSelection(e);
                            }}
                            selectValue={props.voteCastSelection}
                            options={props.lstVoteCast}
                            isMulti
                            placeholder='(Optional) Choose Vote cast...'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Voting Support
                        </label>
                        <div className='col-lg-8'>
                          <div className='mb-2 row'>
                            <div className='col-2 chkCenterAlign'>
                              <input
                                className='form-check-input'
                                type='radio'
                                name='chkDesiredOutcome'
                                id='chkDesiredOutcome'
                                value='ALL'
                                onClick={() =>
                                  props.handleDesiredOutcomeChecked(
                                    VOTING_TOOLS_DESIRED_OUTCOME_ALL
                                  )
                                }
                                defaultChecked={
                                  props.isCheckedDesiredOutcomeAll
                                }
                              />
                              <label
                                className='form-check-label'
                                htmlFor='chkDesiredOutcome'
                              >
                                All
                              </label>
                            </div>
                            <div className='form-check form-check-inline'>
                              <input
                                className='form-check-input'
                                type='radio'
                                name='chkDesiredOutcome'
                                id='chkDesiredOutcomeShortSlate'
                                value='Short Slate Only'
                                onClick={() =>
                                  props.handleDesiredOutcomeChecked(
                                    VOTING_TOOLS_DESIRED_OUTCOME_SHORT_SLATE
                                  )
                                }
                                defaultChecked={
                                  props.isCheckedDesiredOutcomeShortSlate
                                }
                              />
                              <label
                                className='form-check-label'
                                htmlFor='chkDesiredOutcomeShortSlate'
                              >
                                Short Slate Only
                              </label>
                            </div>
                            <div className='form-check form-check-inline'>
                              <input
                                className='form-check-input'
                                type='radio'
                                name='chkDesiredOutcome'
                                id='chkDesiredOutcomeBoardControl'
                                value='Board Control Only'
                                onClick={() =>
                                  props.handleDesiredOutcomeChecked(
                                    VOTING_TOOLS_DESIRED_OUTCOME_BOARD_CONTROL
                                  )
                                }
                                defaultChecked={
                                  props.isCheckedDesiredOutcomeBoardControl
                                }
                              />
                              <label
                                className='form-check-label'
                                htmlFor='chkDesiredOutcomeBoardControl'
                              >
                                Board Control Only
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            GL Slate Recommendation
                          </label>
                          <div className='col-lg-8'>
                            <SearchInput
                              onChange={async (e) => {
                                await props.handleOnChangeDDLGLCardRecommendation(
                                  e
                                );
                              }}
                              selectValue={
                                props.lstGLCardRecommendationSelection
                              }
                              options={props.lstGLCardRecommendation}
                              placeholder=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-12'>
                      <FilterSavesearchModal
                        {...props}
                        isShowFilterSavesearchModal
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

          {props.isShowAdvancedVotingSearchFilter !== undefined &&
            props.isShowAdvancedVotingSearchFilter && (
              <>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-6 col-12'>
                      <div className='mb-3 row'>
                        <label
                          htmlFor='inputPassword'
                          className='col-lg-4 col-form-label'
                        >
                          Proposal Type
                        </label>
                        <div className='col-lg-8'>
                          <DropdownTreeSelect
                            onChangeSelection={
                              props.handleResolutionTypeSelection
                            }
                            totalSelection={
                              props.SetDDLProposalCategory &&
                              props.SetDDLProposalCategory.length
                            }
                            options={props.ddlListOfProposalType}
                            placeholder={
                              props.SetDDLProposalCategory.length ===
                              numConst.EMPTY_TABLE_LENGTH
                                ? '(Optional) Choose Proposal Type...'
                                : ' '
                            }
                          />
                        </div>
                      </div>
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            Voting Support
                          </label>
                          <div className='col-lg-8'>
                            <div className='mb-2 row'>
                              <div className='col-2 chkCenterAlign'>
                                <input
                                  className='form-check-input'
                                  type='checkbox'
                                  onChange={(e) => {
                                    props.handleIsSupportChecked(e);
                                  }}
                                  checked={props.isSupportChecked}
                                />
                              </div>
                              <div className='col-2'>
                                <label className='col-form-label'>
                                  Support:
                                </label>
                              </div>
                              <div className='col-8'>
                                <SearchInput
                                  onChange={(e) => {
                                    props.handleSupportSelection(e);
                                  }}
                                  selectValue={props.supportSelection}
                                  options={props.lstSupport}
                                  isMulti={false}
                                  placeholder='(Optional) Choose Sponsor...'
                                  disabled={!props.isSupportChecked}
                                />
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-2' />
                              <div className='col-2'>
                                <label className='col-form-label'>Range:</label>
                              </div>
                              <div className='col-8'>
                                <div className='row'>
                                  <div className='col-6'>
                                    <div className='row'>
                                      <div className='col-4'>
                                        <label className='col-form-label'>
                                          From:
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          className='form-control'
                                          type='number'
                                          min='0'
                                          max='100'
                                          value={props.supportFrom}
                                          readOnly={!props.isSupportChecked}
                                          onChange={(e) => {
                                            props.handleSupportFromChange(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-6'>
                                    <div className='row'>
                                      <div className='col-4'>
                                        <label className='col-form-label'>
                                          To:
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          className='form-control'
                                          type='number'
                                          min='0'
                                          max='100'
                                          value={props.supportTo}
                                          readOnly={!props.isSupportChecked}
                                          onChange={(e) => {
                                            props.handleSupportToChange(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            Output Fields
                          </label>
                          <div className='col-lg-8'>
                            <DropdownList
                              handleChange={(e) => {
                                props.handleOutputFieldSelection(e);
                              }}
                              Dvalue={props.outputFieldSelection}
                              options={props.lstOutputField}
                              isMulti
                              placeholder='(Optional) Choose Output...'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 col-12'>
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            Vote Cast
                          </label>
                          <div className='col-lg-8'>
                            <SearchInput
                              onChange={(e) => {
                                props.handleVoteCastSelection(e);
                              }}
                              selectValue={props.voteCastSelection}
                              options={props.lstVoteCast}
                              isMulti
                              placeholder='(Optional) Choose Vote cast...'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-lg'>
                        <div className='mb-3 row'>
                          <label
                            htmlFor='inputPassword'
                            className='col-lg-4 col-form-label'
                          >
                            Management Recc.
                          </label>
                          <div className='col-lg-8'>
                            <SearchInput
                              onChange={async (e) => {
                                await props.handleManagementRecc(e);
                              }}
                              selectValue={props.managementReccSelection}
                              options={props.lstManagementRecc}
                              isMulti
                              placeholder='(Optional) Choose Management Recc. ...'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-lg'>
                        <div className='row'>
                          <FilterSavesearchModal
                            {...props}
                            isShowFilterSavesearchModal
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm float-end'
                        onClick={props.onSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

          {props.isShowAdvancedVotingSearchFilter === undefined &&
            !props.isShowAdvancedVotingSearchFilter && (
              <>
                <div className='container'>
                  <div className='mt-2 row'>
                    <div className='col-12'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm float-end'
                        onClick={props.onSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(InvestorComparatorFilter);
