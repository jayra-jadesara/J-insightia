import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import CollapseComponent from '../../../GeneralForm/CollapseComponent';
import CompanySearchComponent from '../../../GeneralForm/CompanySearchComponent';
import DropdownList from '../../../GeneralForm/DropdownList';
import { filterFunctions } from '../../../../utils/general-util';
import DropdownTreeSelect from '../../../GeneralForm/DropdownTreeSelect';

const DirectorSkillsAndAnalyticsToolFilter = (props) => {
  const OUTCOME_FIELDS_DATA = 0;
  const OUTCOME_FIELDS_ANALYSIS = 1;
  const OUTCOME_FIELDS_DIRECTOR_LEVEL_DATA = 0;
  const OUTCOME_FIELDS_COMPANY_LEVEL_DATA = 1;
  const OUTCOME_FIELDS_INDIVIDUAL_SKILLS = 0;
  const OUTCOME_FIELDS_GROUPED_SKILLS = 1;

  const CURRENT_DIRECTOR_YES = 0;
  const CURRENT_DIRECTOR_NO = 1;

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
            : 'Director Skills and Analytics Filter '
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
          handdleRun={(e) => props.handdleRun(e)}
          defaultCmpRegeionAndCountries={props.defaultCmpRegeionAndCountries}
          defaultPiListSectorsAndIndustries={
            props.defaultPiListSectorsAndIndustries
          }
        />

        <div className='row pt-2'>
          <div className='col-lg-6'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-3'>
                  <label
                    htmlFor='byCompanySelection'
                    className='col-form-label'
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
                </div>
                <div className='col-lg-9 text-secondary labelNewsCompanyFilter'>
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
            <div className='col-sm-6' />
          </div>

          {/* {props.searchTitle !== undefined && ( */}
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <strong className='text-primary'>
                  {/* {props.searchTitle} */}
                </strong>
              </div>
            </div>
          </div>
          {/* )} */}
          <div className='row mt-1 mb-1'>
            <div className='col-lg-6 col-sm-12'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-3 col-sm-12'>Gender</div>
                  <div className='col-lg-9 col-sm-12 form-group'>
                    <DropdownList
                      options={props.ddlGenderOption}
                      Dvalue={props.lstGenderSelection}
                      handleChange={props.handleOnChangeGenderDdl}
                      placeholder='(Optional) Choose a gender...'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-3 col-md-12 p-0'>
                    Number of Boards
                    <br />
                    (current and past)
                  </div>
                  <div className='col-lg-9 col-md-12'>
                    <div className='row '>
                      <div className='col-lg-2 '>
                        <label className='form-label'>From :</label>
                      </div>
                      <div className='col-lg-3 p-0 '>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeBoardFrom(e);
                          }}
                          value={props.boardFrom}
                        />
                      </div>
                      <div className='col-lg-1 p-0 col-md-0 col-sm-0' />
                      <div className='col-lg-2 '>
                        <label className='form-label'>To :</label>
                      </div>
                      <div className='col-lg-3 p-0 '>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeBoardTo(e);
                          }}
                          value={props.boardTo}
                        />
                      </div>
                      <div className='col-lg-1 p-0 col-md-0 col-sm-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          <div className='row mt-3 pt-1'>
            <div className='col-lg-6 col-sm-12'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-3 col-md-12'>Age</div>
                  <div className='col-lg-9 col-md-12'>
                    <div className='row'>
                      <div className='col-lg-2 '>
                        <label className='form-label'>From :</label>
                      </div>
                      <div className='col-lg-3 p-0 '>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeAgeFrom(e);
                          }}
                          value={props.ageFrom}
                          placeholder='Years'
                        />
                      </div>
                      <div className='col-lg-1' />
                      <div className='col-lg-2'>
                        <label className='form-label'>To :</label>
                      </div>
                      <div className='col-lg-3 p-0'>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeAgeTo(e);
                          }}
                          value={props.ageTo}
                          placeholder='Years'
                        />
                      </div>
                      <div className='col-lg-1 flex-end' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-3 col-sm-12 p-0'>Tenure</div>
                  <div className='col-lg-9 col-sm-12'>
                    <div className='row'>
                      <div className='col-lg-2'>
                        <label className='form-label'>From :</label>
                      </div>
                      <div className='col-lg-3 p-0'>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeTenureFrom(e);
                          }}
                          value={props.tenureFrom}
                          placeholder='Years'
                        />
                      </div>
                      <div className='col-lg-1' />
                      <div className='col-lg-2'>
                        <label className='form-label'>To :</label>
                      </div>
                      <div className='col-lg-3 p-0'>
                        <input
                          className='form-control'
                          type='number'
                          max='999'
                          min='0'
                          onChange={(e) => {
                            props.handleOnChangeTenureTo(e);
                          }}
                          value={props.tenureTo}
                          placeholder='Years'
                        />
                      </div>
                      <div className='col-lg-1' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-1 pt-1'>
            <div className='col-sm-6'>
              <div className='container'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <label htmlFor='inputPassword' className=' col-form-label'>
                      Current Director
                    </label>
                  </div>
                  <div className='col-sm-9 p-2'>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chkCurrentDirector'
                        id='chkYes'
                        value='Data'
                        onClick={async () => {
                          await props.handleOnChangeCurrentDirectorChecked(
                            CURRENT_DIRECTOR_YES
                          );
                        }}
                        defaultChecked={props.currentDirectorYes}
                        checked={props.currentDirectorYes}
                      />
                      <label className='form-check-label' htmlFor='chkYes'>
                        Yes
                      </label>
                    </div>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chkCurrentDirector'
                        id='chkNo'
                        value='Analysis'
                        onClick={async () => {
                          await props.handleOnChangeCurrentDirectorChecked(
                            CURRENT_DIRECTOR_NO
                          );
                        }}
                        defaultChecked={props.currentDirectorNo}
                        checked={props.currentDirectorNo}
                      />
                      <label className='form-check-label' htmlFor='chkNo'>
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills drop-down */}
          <div className='row'>
            <div className='col-sm-6'>
              <div className='container'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <label htmlFor='inputSkills' className='col-form-label'>
                      Skills
                    </label>
                  </div>
                  <div className='col-sm-9 p-2'>
                    <DropdownTreeSelect
                      onChangeSelection={props.HandleTreeViewIndustry}
                      options={
                        props.piListOfSectorsAndIndustries.length > 0
                          ? props.piListOfSectorsAndIndustries
                          : props.defaultPiListSectorsAndIndustries
                      }
                      placeholder={
                        props.industrySelection.length === 0
                          ? '(Optional) Choose Proposal Type...'
                          : ' '
                      }
                      totalSelection={props.industrySelection.length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outcome-fields */}
          <div className='row'>
            <div className='col-sm-6'>
              <div className='container'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <label htmlFor='inputPassword' className=' col-form-label'>
                      Output Fields
                    </label>
                  </div>
                  <div className='col-sm-9 p-2'>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chkOutcome'
                        id='chkData'
                        value='Data'
                        onClick={async () => {
                          await props.handleOnChangeOutputFieldChecked(
                            OUTCOME_FIELDS_DATA
                          );
                        }}
                        defaultChecked={props.directorData}
                        checked={props.directorData}
                      />
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
                          await props.handleOnChangeOutputFieldChecked(
                            OUTCOME_FIELDS_ANALYSIS
                          );
                        }}
                        defaultChecked={props.directoAnalysis}
                        checked={props.directoAnalysis}
                      />
                      <label className='form-check-label' htmlFor='chkAnalysis'>
                        Analysis
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {props.directorData && (
            <div className='row'>
              <div className='col-sm-6'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-sm-3' />
                    <div className='col-sm-9 p-2'>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='chkOutcomFieldsData'
                          id='chkDirectorlevel'
                          value='Directorlevel'
                          onClick={async () => {
                            await props.handleOnChangeOutputFieldLevelDataChecked(
                              OUTCOME_FIELDS_DIRECTOR_LEVEL_DATA
                            );
                          }}
                          defaultChecked={props.directorLevelData}
                          checked={props.directorLevelData}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='chkDirectorlevel'
                        >
                          Director level Data
                        </label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='chkOutcomFieldsData'
                          id='chkCompanylevel'
                          value='Companylevel'
                          onClick={async () => {
                            await props.handleOnChangeOutputFieldLevelDataChecked(
                              OUTCOME_FIELDS_COMPANY_LEVEL_DATA
                            );
                          }}
                          defaultChecked={props.companyLevelData}
                          checked={props.companyLevelData}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='chkCompanylevel'
                        >
                          Company level Data
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3' />
                    <div className='col-sm-9 p-2'>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='chkOutcomeFieldsSkills'
                          id='chkIndividual'
                          value='Individual'
                          onClick={async () => {
                            await props.handleOnChangeOutputFieldSkillsChecked(
                              OUTCOME_FIELDS_INDIVIDUAL_SKILLS
                            );
                          }}
                          defaultChecked={props.individualSkills}
                          checked={props.individualSkills}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='chkIndividual'
                        >
                          Individual skills
                        </label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='chkOutcomeFieldsSkills'
                          id='chkGrouped'
                          value='Grouped'
                          onClick={async () => {
                            await props.handleOnChangeOutputFieldSkillsChecked(
                              OUTCOME_FIELDS_GROUPED_SKILLS
                            );
                          }}
                          defaultChecked={props.groupedSkills}
                          checked={props.groupedSkills}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='chkGrouped'
                        >
                          Grouped skills
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search button */}
          <div className='row'>
            <div className='container'>
              <div className='mt-2 row'>
                <div className='col-12'>
                  <button
                    type='button'
                    disabled={props.isLoading}
                    className='btn btn-primary btn-sm float-end'
                    onClick={() => props.onSearch()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(DirectorSkillsAndAnalyticsToolFilter);
