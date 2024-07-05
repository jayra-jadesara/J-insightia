import React from 'react';
import DatePicker from 'react-datepicker';
import DropdownTreeSelect from '../../GeneralForm/DropdownTreeSelect';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import DropdownList from '../../GeneralForm/DropdownList';
import CompanySearchComponent from '../../GeneralForm/CompanySearchComponent';
import numConst from '../../../constants/NumberConstants';
import { filterFunctions } from '../../../utils/general-util';
import FilterSavesearchModal from '../General/FilterSavesearchModal';

import 'react-datepicker/dist/react-datepicker.css';

const GovernanceFilter = (props) => {
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
          handdleRun={() => {
            props.handleComapnySearchSelectionInvComp(
              props.companySearchOptionSelection
            );
          }}
          defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
          defaultPiListSectorsAndIndustries={
            props.defaultPiListSectorsAndIndustries
          }
        />
        <div className='row pt-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <div className='row'>
                  <label
                    htmlFor='byCompanySelection'
                    className='col-sm-2 col-form-label'
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

                  <div className='col-sm-4 text-secondary labelNewsCompanyFilter'>
                    {props.companySearchOptionSelection !== undefined ? (
                      <div className='btnPeerGrpRemove'>
                        {props.companySearchOptionSelection.label}
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
                  <div className='col-6' />
                </div>
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
              <div className='col-lg'>
                <div className='row'>
                  <div className='col-lg'>
                    <div className='row pb-2'>
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-4 col-form-label'
                      >
                        State of Incorporation
                      </label>
                      <div className='col-sm-8'>
                        <DropdownList
                          options={props.lstStateOfIncorporationSelection}
                          handleChange={async (e) => {
                            await props.handleStateOfIncorporationSelection(e);
                          }}
                          isMulti
                          placeholder='(Optional) Choose one or more State of Incorporation…'
                          selectedValue={props.stateOfIncorporationSelection}
                          maxHeight={180}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg'>
                    <div className='row align-items-center'>
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label'
                      >
                        Provisions
                      </label>
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label p-0'
                      >
                        Has:
                      </label>
                      <div className='col-sm-8'>
                        <DropdownTreeSelect
                          onChangeSelection={props.handleTreeViewProvisionHas}
                          options={props.listProvisionHas}
                          placeholder={
                            props.provisionSelectionHas.length ===
                            numConst.EMPTY_TABLE_LENGTH
                              ? '(Optional) Choose one or more Provisions ...'
                              : ' '
                          }
                          totalSelection={props.provisionSelectionHas.length}
                        />
                      </div>
                    </div>
                    <div className='row align-items-center'>
                      <span
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label'
                      />
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label p-0'
                      >
                        Does not have:
                      </label>
                      <div className='col-sm-8'>
                        <DropdownTreeSelect
                          onChangeSelection={
                            props.handleTreeViewProvisionHasNot
                          }
                          options={props.listProvisionHasNot}
                          placeholder={
                            props.provisionSelectionHasNot.length ===
                            numConst.EMPTY_TABLE_LENGTH
                              ? '(Optional) Choose one or more Provisions ...'
                              : ' '
                          }
                          totalSelection={props.provisionSelectionHasNot.length}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg'>
                    <div className='row'>
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label pb-0'
                      >
                        Director Options:
                      </label>
                      <div className='col-sm-10'>
                        <div className='mb-2 row align-items-center'>
                          <label
                            htmlFor='inputPassword'
                            className='col-sm-5 col-form-label p-0'
                          >
                            Average director tenure
                          </label>
                          <div className='col-sm-7'>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmin'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Min:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.avgDirectorTenureMin}
                                      onChange={
                                        props.handleAvgDirectorTenureMin
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmax'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Max:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.avgDirectorTenureMax}
                                      onChange={
                                        props.handleAvgDirectorTenureMax
                                      }
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
                </div>

                <div className='row'>
                  <div className='col-lg'>
                    <div className='row'>
                      <span
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label'
                      />
                      <div className='col-sm-10'>
                        <div className='mb-2 row align-items-center'>
                          <label
                            htmlFor='inputPassword'
                            className='col-sm-5 col-form-label p-0'
                          >
                            Average age
                          </label>
                          <div className='col-sm-7'>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmin'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Min:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.avgAgeMin}
                                      onChange={props.handleAvgAgeMin}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmax'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Max:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.avgAgeMax}
                                      onChange={props.handleAvgAgeMax}
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
                </div>

                <div className='row'>
                  <div className='col-lg'>
                    <div className='row'>
                      <span
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label'
                      />
                      <div className='col-sm-10'>
                        <div className='mb-2 row align-items-center'>
                          <label
                            htmlFor='inputPassword'
                            className='col-sm-5 col-form-label p-0'
                          >
                            Any director has had a term longer than:
                          </label>
                          <div className='col-sm-7'>
                            <div className='row align-items-center'>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <div className='col-sm-4' />
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.directorTerm}
                                      onChange={props.handleDirectorTerm}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <div className='col-sm-4'>
                                    <span
                                      htmlFor='Boardmin'
                                      className='col-form-label'
                                    >
                                      Years
                                    </span>
                                  </div>
                                  <div className='col-sm-8' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg'>
                    <div className='row'>
                      <span
                        htmlFor='inputPassword'
                        className='col-sm-2 col-form-label'
                      />
                      <div className='col-sm-10'>
                        <div className='mb-2 row align-items-center'>
                          <label
                            htmlFor='inputPassword'
                            className='col-sm-5 col-form-label p-0'
                          >
                            Percentage of current female director %
                          </label>
                          <div className='col-sm-7'>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmin'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Min:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.currentFemaleDirectorMin}
                                      onChange={
                                        props.handleCurrentFemaleDirectorMin
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-6'>
                                <div className='row'>
                                  <label
                                    htmlFor='Boardmax'
                                    className='col-sm-4 col-form-label'
                                  >
                                    Max:
                                  </label>
                                  <div className='col-sm-8'>
                                    <input
                                      className='form-control'
                                      value={props.currentFemaleDirectorMax}
                                      onChange={
                                        props.handleCurrentFemaleDirectorMax
                                      }
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
                </div>
                <div className='row mb-3'>
                  <div className='col-lg'>
                    <div className='row'>
                      <div className='col-sm-2' />
                      <label
                        htmlFor='inputPassword'
                        className='col-sm-4 col-form-label p-0'
                      >
                        Activist Nominee on Board
                        <br />
                        (current and past)
                      </label>
                      <div className='col-sm-6'>
                        <DropdownList
                          options={props.lstActivistNomineeOnBoard}
                          handleChange={async (e) => {
                            await props.handleActivistNomineeOnBoard(e);
                          }}
                          isMulti
                          placeholder='(Optional) Choose one or more State of Incorporation…'
                          selectedValue={props.activistNomineeOnBoardSelection}
                          maxHeight={180}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg'>
                <div className='col-lg'>
                  <div className='mb-2 row align-items-center'>
                    <label
                      htmlFor='inputPassword'
                      className='col-sm-3 col-form-label'
                    >
                      Board Size
                    </label>
                    <div className='col-sm-9'>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='row'>
                            <label
                              htmlFor='Boardmin'
                              className='col-sm-4 col-form-label'
                            >
                              Min:
                            </label>
                            <div className='col-sm-8'>
                              <input
                                className='form-control'
                                value={props.boardSizeMin}
                                onChange={props.handleBoardSizeMin}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='row'>
                            <label
                              htmlFor='Boardmax'
                              className='col-sm-4 col-form-label'
                            >
                              Max:
                            </label>
                            <div className='col-sm-8'>
                              <input
                                className='form-control'
                                value={props.boardSizeMax}
                                onChange={props.handleBoardSizeMax}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg'>
                  <div className='mb-2 row align-items-center'>
                    <label
                      htmlFor='inputPassword'
                      className='col-sm-2 col-form-label'
                    >
                      Poison Pill
                    </label>
                    <div className='col-sm-10 mb-2'>
                      <div className='row'>
                        <label
                          htmlFor='Boardmin'
                          className='col-sm-3 col-form-label ps-0'
                        >
                          Ownership%:
                        </label>
                        <div className='col-sm-9'>
                          <div className='row'>
                            <div className='col-5'>
                              <input
                                className='form-control'
                                value={props.poisonPillOwnershipMin}
                                onChange={props.handlePoisonPillOwnershipMin}
                              />
                            </div>
                            <div className='col-2'>to</div>
                            <div className='col-5'>
                              <input
                                className='form-control'
                                value={props.poisonPillOwnershipMax}
                                onChange={props.handlePoisonPillOwnershipMax}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      htmlFor='inputPassword'
                      className='col-sm-2 col-form-label'
                    >
                      {' '}
                    </span>
                    <div className='col-sm-10 p-2'>
                      <div className='row'>
                        <label
                          htmlFor='Boardmin'
                          className='col-sm-2 col-form-label ps-0'
                        >
                          Expiry date
                        </label>
                        <div className='col-1 chkCenterAlign'>
                          <div>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              onChange={(e) => {
                                props.handlePoisonPillExpiryDateChecked(e);
                              }}
                              checked={props.poisonPillExpiryDateChecked}
                            />
                          </div>
                        </div>
                        <div className='col-sm-9'>
                          <div className='row'>
                            <div className='col-5'>
                              <DatePicker
                                selected={props.poisonPillExpiryDateMin}
                                onChange={async (e) => {
                                  await props.handlePoisonPillExpiryDateMin(e);
                                }}
                                selectsStart
                                className='form-control'
                                dateFormat='dd-MMM-yyyy'
                                selectsEnd
                                startDate={props.poisonPillExpiryDateMin}
                                endDate={props.poisonPillExpiryDateMax}
                                popperPlacement='top-start'
                                popperModifiers={{
                                  offset: {
                                    enabled: true,
                                    offset: '5px, 10px',
                                  },
                                  preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                                    boundariesElement: 'viewport',
                                  },
                                }}
                                disabled={!props.poisonPillExpiryDateChecked}
                                //
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                              />
                            </div>
                            <div className='col-2'>to</div>
                            <div className='col-5'>
                              <DatePicker
                                selected={props.poisonPillExpiryDateMax}
                                onChange={async (e) => {
                                  await props.handlePoisonPillExpiryDateMax(e);
                                }}
                                className='form-control'
                                dateFormat='dd-MMM-yyyy'
                                startDate={props.poisonPillExpiryDateMax}
                                endDate={props.poisonPillExpiryDateMin}
                                minDate={props.poisonPillExpiryDateMax}
                                popperPlacement='top-end'
                                popperModifiers={{
                                  offset: {
                                    enabled: true,
                                    offset: '5px, 10px',
                                  },
                                  preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                                    boundariesElement: 'viewport',
                                  },
                                }}
                                disabled={!props.poisonPillExpiryDateChecked}
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
                  </div>
                  <div className='row'>
                    <FilterSavesearchModal
                      {...props}
                      isShowFilterSavesearchModal
                    />
                  </div>
                </div>
              </div>
              <div className='container'>
                <div className='mt-2 row'>
                  <div className='col-12'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm float-end governanceFilterBtn'
                      onClick={props.onSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(GovernanceFilter);
