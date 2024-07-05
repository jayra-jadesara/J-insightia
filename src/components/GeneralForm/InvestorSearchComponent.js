import PropTypes from 'prop-types';
import React from 'react';
import Modal from './Modal';
import DropdownList from './DropdownList';
import InvestorFilter from '../Investor/InvestorFilter';
import propTypes from '../../utils/propTypes';
import ErrorBoundary from './ErrorBoundary';

const InvestorSearchComponent = (props) => (
  <Modal
    show={props.showInvestorFilterModel}
    handleClose={() => props.HandleInvestorFilterModel(false)}
    size='lg'
    title='Investor Filter'
  >
    <ErrorBoundary>
    <InvestorFilter {...props} />
    {props.investorSearchOptions.length > 0 ? (
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
            handleInputChange={props.handleInvestorSavedPeerGroupsInputChange}
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
      <label htmlFor='actionCurrentList' className='col-sm-3 col-form-label' />
      <div className='col-sm-9 m-0'>
        <button
          type='button'
          onClick={async () => {
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
          onClick={async () => {
            const data = {
              action: 'update',
              investorSearchId: props.investorSearchOptionsSelection,
              txtSaveCurrentList: props.txtSaveCurrentList,
              investorSingleSelection: props.companySingleSelection,
              investorSelection: props.investorSelection,
              investorLocationSelection: props.investorLocationSelection,
              AumSelection: props.aumCategorySelection,
              aum_min: props.invTxtMarketCapMinRange,
              aum_max: props.invTxtMarketCapMaxRange,
              listRegeionAndCountries: props.invListRegeionAndCountries,
              listInvestorTypeAndSubtypeSelection:
                props.listInvestorTypeAndSubtypeSelection,
              listInvestorTypeAndSubtype: props.listInvestorTypeAndSubtype,
              byShareholderOfCompany: props.selectionByIndivProponent,
              isSaved: true,
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
          props.txtSaveCurrentList.length > 0 && (
            <button
              type='button'
              onClick={async () => {
                const data = {
                  action: 'update',
                  investorSearchId: undefined,
                  txtSaveCurrentList: props.txtSaveCurrentList,
                  investorSingleSelection: props.companySingleSelection,
                  investorSelection: props.investorSelection,
                  investorLocationSelection: props.investorLocationSelection,
                  AumSelection: props.aumCategorySelection,
                  aum_min: props.invTxtMarketCapMinRange,
                  aum_max: props.invTxtMarketCapMaxRange,
                  listRegeionAndCountries: props.invListRegeionAndCountries,
                  byShareholderOfCompany: props.selectionByIndivProponent,
                  listInvestorTypeAndSubtypeSelection:
                    props.listInvestorTypeAndSubtypeSelection,
                  listInvestorTypeAndSubtype: props.listInvestorTypeAndSubtype,
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
    <hr />
    <div className='row'>
      <label htmlFor='run' className='col-sm-3 col-form-label' />
      <div className='col-sm-9 m-0'>
        <button
          onClick={async () => {
            const data = {
              action: 'update',
              investorSearchId: null,
              txtSaveCurrentList:
                props.investorSearchOptionsSelection === undefined
                  ? 'Quicksearch'
                  : props.investorSearchOptionsSelection.label,
              investorSingleSelection: props.companySingleSelection,
              investorSelection: props.investorSelection,
              investorLocationSelection: props.investorLocationSelection,
              AumSelection: props.aumCategorySelection
                ? props.aumCategorySelection
                : undefined,
              aum_min: props.invTxtMarketCapMinRange,
              aum_max: props.invTxtMarketCapMaxRange,
              listRegeionAndCountries: props.invListRegeionAndCountries,
              byShareholderOfCompany: props.selectionByIndivProponent,
              listInvestorTypeAndSubtypeSelection:
                props.listInvestorTypeAndSubtypeSelection,
              listInvestorTypeAndSubtype: props.listInvestorTypeAndSubtype,
              isSaved: false,
            };

            const updateTemp = await props.handleInvestorSearchUpdateReq(data);
            props.handleInvestorSearchSelectionInvComp(updateTemp.payload);
            if (props.isPreferences) {
              localStorage.setItem(
                'investorFilterData',
                JSON.stringify(updateTemp.payload)
              );
            }
            if (props.isPolicychecker) {
              props.handdleRun(updateTemp.payload);
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

InvestorSearchComponent.propTypes = {
  GetInvestorSearchSelection: PropTypes.func,
  HandleInvestorFilterModel: PropTypes.func,
  ResetInvestorSearchOptionSelection: PropTypes.func,
  companySingleSelection: PropTypes.any,
  getInvestorSearchOptions: PropTypes.func,
  handdleRun: PropTypes.func,
  handleInvestorSavedPeerGroupsInputChange: PropTypes.func,
  handleInvestorSearchDeleteReq: PropTypes.func,
  handleInvestorSearchOptionSelection: PropTypes.func,
  handleInvestorSearchUpdateReq: PropTypes.func,
  handleSaveInvestorCurrentList: PropTypes.func,
  investorLocationSelection: PropTypes.any,
  investorSearchOptions: PropTypes.array,
  investorSearchOptionsSelection: PropTypes.any,
  investorSelection: PropTypes.any,
  isSaveCurrentListButtonDeleteDisable: PropTypes.bool,
  isSaveCurrentListButtonSaveDisable: PropTypes.bool,
  listInvestorTypeAndSubtype: PropTypes.array,
  listInvestorTypeAndSubtypeSelection: PropTypes.array,
  listRegeionAndCountries: PropTypes.array,
  aumCategorySelection: PropTypes.any,
  saveCurrentListButtonText: PropTypes.string,
  selectionByIndivProponent: PropTypes.any,
  showInvestorFilterModel: PropTypes.any,
  txtMarketCapMaxRange: PropTypes.string,
  txtMarketCapMinRange: PropTypes.string,
  txtSaveCurrentList: PropTypes.string,
  handleInvestorSearchSelectionInvComp: propTypes.func,
};

InvestorSearchComponent.defaultProps = {
  GetInvestorSearchSelection: () => {},
  HandleInvestorFilterModel: () => {},
  ResetInvestorSearchOptionSelection: () => {},
  getInvestorSearchOptions: () => {},
  handdleRun: () => {},
  handleInvestorSavedPeerGroupsInputChange: () => {},
  handleInvestorSearchDeleteReq: () => {},
  handleInvestorSearchOptionSelection: () => {},
  handleInvestorSearchUpdateReq: () => {},
  handleSaveInvestorCurrentList: () => {},
  investorSearchOptions: [],
  isSaveCurrentListButtonDeleteDisable: false,
  isSaveCurrentListButtonSaveDisable: false,
  listInvestorTypeAndSubtype: [],
  listInvestorTypeAndSubtypeSelection: [],
  listRegeionAndCountries: [],
  saveCurrentListButtonText: '',
  txtMarketCapMaxRange: '',
  txtMarketCapMinRange: '',
  txtSaveCurrentList: '',
  aumCategorySelection: undefined,
  handleInvestorSearchSelectionInvComp: () => {},
};

export default React.memo(InvestorSearchComponent);
