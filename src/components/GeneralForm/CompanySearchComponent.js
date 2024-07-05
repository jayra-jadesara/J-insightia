import PropTypes from 'prop-types';
import React from 'react';
import Modal from './Modal';
import CompanyFilter from '../Dashboard/CompanyFilter';
import CompanyFilterGroupOptions from '../Dashboard/CopmanyFilterGroupOptions';
import SearchInput from './DropdownVirtualized';
import ErrorBoundary from './ErrorBoundary';
import DropdownList from './DropdownList';

const CompanySearchComponent = (props) => (
  <Modal
    show={props.showFilterModel}
    handleClose={() => props.HandleFilterModel(false)}
    size='lg'
    title='Company Filter'
  >
    <ErrorBoundary>
    {props.showIndividualOption ? <CompanyFilter {...props} /> : <CompanyFilterGroupOptions {...props} />}

    {/* handle - By My Saved Peer Groups visiblity */}
    {props.listOfcompanySearchOptions.length > 0 ? (
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
                await props.handleCompanySearchOptionSelection(e);
                await props.getAllCompanySearchSelection(e.value);
              } else {
                await props.ResetCompanySearchOptionSelection();
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
      <label htmlFor='actionCurrentList' className='col-sm-3 col-form-label' />
      <div className='col-sm-9 m-0'>
        <button
          type='button'
          onClick={async () => {
            const data = {
              action: 'delete',
              companySearchOptionSelection: props.companySearchOptionSelection,
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
              companyLocationSelection: props.companyLocationSelection,
              marketCapMinRange: props.txtMarketCapMinRange,
              marketCapMaxRange: props.txtMarketCapMaxRange,
              listRegeionAndCountries: props.listRegeionAndCountries,
              piListOfSectorsAndIndustries: props.piListOfSectorsAndIndustries,
              isSaved: true,
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
          props.txtSaveCurrentList.length > 0 && (
            <button
              type='button'
              onClick={async () => {
                const data = {
                  action: 'update',
                  cmpSearchId: undefined,
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
    <hr />
    <div className='row'>
      <label htmlFor='run' className='col-sm-3 col-form-label' />
      <div className='col-sm-9 m-0'>
        <button
          onClick={async () => {
            const data = {
              action: 'update',
              cmpSearchId: null,
              txtSaveCurrentList:
                props.companySearchOptionSelection === undefined
                  ? props.isActivistVulnerability ? '' : 'Quicksearch'
                  : props.companySearchOptionSelection.label,
              companySingleSelection: props.companySingleSelection,
              companySelection: props.companySelection,
              indexSelection: props.indexSelection,
              exchangeSelection: props.exchangeSelection,
              aiPeerGroupSelection: props.aiPeerGroupSelection,
              industrySelection: props.industrySelection,
              marketCapSelection: props.marketCapSelection
                ? props.marketCapSelection
                : undefined,
              companyLocationSelection: props.companyLocationSelection,
              marketCapMinRange: props.txtMarketCapMinRange,
              marketCapMaxRange: props.txtMarketCapMaxRange,
              listRegeionAndCountries: props.listRegeionAndCountries,
              piListOfSectorsAndIndustries: props.piListOfSectorsAndIndustries,
              isSaved: false,
            };
            await props.handleCompanySearchUpdateReq(data);
            const updateTemp = await props.handleCompanySearchUpdateReq(data);
            props.handleComapnySearchSelectionInvComp(updateTemp.payload);
            if (props.isPreferences) {
              localStorage.setItem(
                'companyFilterData',
                JSON.stringify(updateTemp.payload)
              );
            }
          }}
          type='button'
          className='btn btn-primary btn-sm m-1 float-end'
        >
          {props.isPreferences ? 'Close Window' : 'Run'}
        </button>
      </div>
    </div>
    </ErrorBoundary>
  </Modal>
);

CompanySearchComponent.propTypes = {
  HandleFilterModel: PropTypes.func,
  ResetCompanySearchOptionSelection: PropTypes.func,
  aiPeerGroupSelection: PropTypes.any,
  companyLocationSelection: PropTypes.any,
  companySearchOptionSelection: PropTypes.any,
  companySelection: PropTypes.any,
  companySingleSelection: PropTypes.any,
  exchangeSelection: PropTypes.any,
  getAllCompanySearchSelection: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  handdleRun: PropTypes.func,
  handleCompanySearchDeleteReq: PropTypes.func,
  handleCompanySearchOptionSelection: PropTypes.func,
  handleCompanySearchUpdateReq: PropTypes.func,
  handleSaveCurrentList: PropTypes.func,
  handleSavedPeerGroupsInputChange: PropTypes.any,
  indexSelection: PropTypes.any,
  industrySelection: PropTypes.any,
  isSaveCurrentListButtonDeleteDisable: PropTypes.bool,
  isSaveCurrentListButtonSaveDisable: PropTypes.bool,
  listOfcompanySearchOptions: PropTypes.array,
  listRegeionAndCountries: PropTypes.any,
  // marketCapSelection: PropTypes.any,
  piListOfSectorsAndIndustries: PropTypes.any,
  saveCurrentListButtonText: PropTypes.any,
  showFilterModel: PropTypes.any,
  showIndividualOption: PropTypes.any,
  txtMarketCapMaxRange: PropTypes.string,
  txtMarketCapMinRange: PropTypes.string,
  txtSaveCurrentList: PropTypes.string,
  handleComapnySearchSelectionInvComp: PropTypes.func,
};

CompanySearchComponent.defaultProps = {
  HandleFilterModel: () => {},
  ResetCompanySearchOptionSelection: () => {},
  getAllCompanySearchSelection: () => {},
  getCompanySearchOptions: () => {},
  handdleRun: () => {},
  handleCompanySearchDeleteReq: () => {},
  handleCompanySearchOptionSelection: () => {},
  handleCompanySearchUpdateReq: () => {},
  handleSaveCurrentList: () => {},
  isSaveCurrentListButtonDeleteDisable: false,
  isSaveCurrentListButtonSaveDisable: false,
  listOfcompanySearchOptions: [],
  txtMarketCapMaxRange: '',
  txtMarketCapMinRange: '',
  txtSaveCurrentList: '',
  // marketCapSelection: undefined,
  handleComapnySearchSelectionInvComp: () => {},
};

export default React.memo(CompanySearchComponent);
