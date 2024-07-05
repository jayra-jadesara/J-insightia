import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import SearchInput from '../GeneralForm/DropdownVirtualized';
import DropdownList from '../GeneralForm/DropdownList';
import DropdownTreeSelect from '../GeneralForm/DropdownTreeSelect';
import Table from '../GeneralForm/Table';
import DropdownListAsync from '../GeneralForm/DropdownListAsync';
import { GetAllIssuers } from '../../utils/dashboard-util';
import { ARRAY_HAS_NO_LENGTH } from '../../constants/NumberConstants';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const CopmanyFilterGroupOptions = (props) => {
  const [formVal, setFormVal] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBulkUpload, setIsBulkUpload] = React.useState(false);

  const marketCapMinInput = React.useRef(null);
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const recordset = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
      },
      {
        headerName: 'Ticker',
        field: 'ticker',
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
      },
      {
        headerName: 'Details',
        field: 'pid',
        width: '100px',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={() => {
                props.handleBulkCompanySelection(params.data);
              }}
              className='btn btn-primary btn-sm m-1'
            >
              Add
            </button>
          </div>
        ),
        sortable: false,
        suppressMovable: false,
        filter: false,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'pid',
          pinned: 'right',
        },
      ],
    },
    paggination: { isPagging: true, pageSize: 5 },
    isfloatingFilter: false,
    rowData: props.freeSearchRecordset,
  };

  const handleFreeSearchSection = () => {
    setIsBulkUpload(true);
  };

  const handleHideFreeSearchSection = () => {
    setIsBulkUpload(false);
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormVal((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleBulkSearch = async (events) => {
    events.preventDefault();
    if (formVal !== undefined && formVal.txtBulkSearch.length > ARRAY_HAS_NO_LENGTH) {
      setIsLoading(true);
      const data = {
        rowdata: formVal.txtBulkSearch,
      };
      await props.handleCompanyAndIndustry(data);
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
    <div>
      <div className='row'>
        <label htmlFor='filterOptions' className='col-sm-9 col-form-label'>
          <p className='small'>
            {/* Filter for a selection of companies using the below selection. Each option will further define your search or leave blank to select all companies. */}
          </p>
          <p className='small'>
            {/* Type to search or select from the drop down list: */}
          </p>
        </label>
        <div className='col-sm-3'>
          <input
            type='button'
            onClick={props.handleShowGroupOption}
            className='btn btn-link text-secondary font-weight-bold btn-sm float-end'
            value='Individual Options'
            disabled={props.isActivistVulnerability}
          />
        </div>
      </div>
      <div className='row mb-1'>
        <label
          htmlFor='CompaniesFilter'
          className='col-sm-3 col-form-label text-primary font-weight-bold mb-0'
        >
          Companies:
        </label>
        <div className='col-sm-9 mb-0'>
          <DropdownListAsync
            loadOptions={(e) => GetAllIssuers(e)}
            handleChange={(e) => props.handleCompanySelection(e)}
            selectedValue={props.companySelection}
            isMulti
            placeholder='(Optional) Start typing to search for a company...'
          />
        </div>
      </div>
      {isBulkUpload ? (
        <div className='row fadeInAnimation'>
          <label
            htmlFor='CompaniesFilter'
            className='col-sm-3 col-form-label text-primary font-weight-bold'
          />
          <div className='col-sm-9'>
            <button
              type='button'
              onClick={(e) => handleHideFreeSearchSection(e)}
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Hide Free Search/Bulk upload section
            </button>
          </div>
          <div className='col-sm-12 mb-3'>
            <textarea
              name='txtBulkSearch'
              onChange={inputEvent}
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='5'
              placeholder="Please, Enter CUSIP/Stock Symbol/ISIN/Name one per row or comma separated and click search below to view results.&#10;Then 'Add' your required companies below to your selection."
              required
            />
            {isLoading ? <span className='text-primary'>Loading...</span> : ''}
            <button
              type='button'
              onClick={(e) => handleBulkSearch(e)}
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Search
            </button>
          </div>
          <div className='col-sm-12'>
            {props.freeSearchRecordset && props.freeSearchRecordset.length > ARRAY_HAS_NO_LENGTH ? (
              <ErrorBoundary>
                <Table IsShowCard={false} gridOptions={recordset} />
              </ErrorBoundary>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div className='row mb-2'>
          <label
            htmlFor='CompaniesFilter'
            className='col-sm-3 col-form-label text-primary font-weight-bold'
          />
          <div className='col-sm-9'>
            <button
              type='button'
              onClick={(e) => handleFreeSearchSection(e)}
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Click to Free Search/Bulk upload
            </button>
          </div>
        </div>
      )}

      <div className='row mb-3 mt-3'>
        <label
          htmlFor='companyindex'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          Index:
        </label>
        <div className='col-sm-9'>
          <DropdownList
            handleChange={(e) => {
              props.handleIndexSelectionChange(e);
            }}
            isMulti
            options={props.piListIndices}
            Dvalue={props.indexSelection}
            placeholder='(Optional) Choose one or more indices...'
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label
          htmlFor='copamnyexchange'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          Exchange:
        </label>
        <div className='col-sm-9'>
          <DropdownList
            handleChange={(e) => {
              props.handleExchangeSelectionChange(e);
            }}
            isMulti
            options={props.listOfExchange}
            Dvalue={props.exchangeSelection}
            placeholder='(Optional) Choose one or more exchanges...'
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label
          htmlFor='companypeergroup'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          AI Peer Groups (US):
        </label>
        <div className='col-sm-9'>
          <DropdownList
            handleChange={(e) => {
              props.handleAIPeerGroupSelection(e);
            }}
            isMulti
            options={props.aiPeerGroups}
            Dvalue={props.aiPeerGroupSelection}
            placeholder='(Optional) Choose one or more peer groups...'
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label
          htmlFor='companymarketcap'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          Market Cap ($mn):
        </label>
        <div className='col-sm-9'>
          <SearchInput
            options={props.listMarketCap}
            placeholder='(Optional) Choose one or market cap groups ($mm)...'
            onChange={(e) => {
              props.handleMarketCapSelection(e);
              marketCapMinInput.current.focus();
            }}
            selectValue={props.marketCapSelection}
          />
        </div>
      </div>
      <div className='row'>
        <label
          htmlFor='companymarketcaprange'
          className='col-sm-3 col-form-label text-primary pt-0 pb-0 mb-1'
        >
          Or use your own Market Cap range:
        </label>
        <div className='col-sm-9 mb-1'>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                type='text'
                name='marketCapMin'
                value={props.txtMarketCapMinRange}
                onChange={props.handleMarketCapMinRange}
                className='form-control'
                placeholder='Min'
                ref={marketCapMinInput}
              />
            </div>
            <div className='col-sm-6'>
              <input
                type='text'
                name='marketCapMax'
                value={props.txtMarketCapMaxRange}
                onChange={props.handleMarketCapMaxRange}
                className='form-control'
                placeholder='Max'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-3'>
        <label
          htmlFor='companuindustry'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          Industry:
        </label>
        <div className='col-sm-9'>
            <DropdownTreeSelect
              onChangeSelection={props.HandleTreeViewIndustry}
              options={
                props.piListOfSectorsAndIndustries &&
                props.piListOfSectorsAndIndustries.length > ARRAY_HAS_NO_LENGTH
                  ? props.piListOfSectorsAndIndustries
                  : props.defaultPiListSectorsAndIndustries
              }
              placeholder={
                props.industrySelection &&
                props.industrySelection.length === ARRAY_HAS_NO_LENGTH
                  ? '(Optional) Choose one or more industries...'
                  : ' '
              }
              totalSelection={props.industrySelection && props.industrySelection.length}
            />
        </div>
      </div>
      <div className='row mb-3'>
        <label
          htmlFor='copmanylocation'
          className='col-sm-3 col-form-label text-primary font-weight-bold'
        >
          By Company Location:
        </label>
        <div className='col-sm-9'>
          <DropdownTreeSelect
            onChangeSelection={props.HandleTreeViewCompanyLocation}
            options={
              props.listRegeionAndCountries &&
              props.listRegeionAndCountries.length > ARRAY_HAS_NO_LENGTH
                ? props.listRegeionAndCountries
                : props.defaultCmpRegeionAndCountries
            }
            placeholder={
              props.companyLocationSelection && props.companyLocationSelection.length === ARRAY_HAS_NO_LENGTH
                ? '(Optional) Choose one or more company locations...'
                : ' '
            }
            totalSelection={props.companyLocationSelection && props.companyLocationSelection.length}
          />
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

CopmanyFilterGroupOptions.propTypes = {
  HandleTreeViewCompanyLocation: PropTypes.any.isRequired,
  HandleTreeViewIndustry: PropTypes.any.isRequired,
  aiPeerGroupSelection: PropTypes.any.isRequired,
  aiPeerGroups: PropTypes.any.isRequired,
  companyLocationSelection: PropTypes.array,
  companySelection: PropTypes.any,
  exchangeSelection: PropTypes.any.isRequired,
  freeSearchRecordset: PropTypes.array,
  handleAIPeerGroupSelection: PropTypes.func,
  handleBulkCompanySelection: PropTypes.func,
  handleCompanyAndIndustry: PropTypes.func,
  handleCompanySelection: PropTypes.func,
  handleExchangeSelectionChange: PropTypes.func,
  handleIndexSelectionChange: PropTypes.func,
  handleMarketCapMaxRange: PropTypes.any.isRequired,
  handleMarketCapMinRange: PropTypes.any.isRequired,
  handleMarketCapSelection: PropTypes.func,
  handleShowGroupOption: PropTypes.any.isRequired,
  indexSelection: PropTypes.any.isRequired,
  industrySelection: PropTypes.array,
  listMarketCap: PropTypes.array,
  listOfExchange: PropTypes.array,
  listRegeionAndCountries: PropTypes.array,
  marketCapSelection: PropTypes.any,
  piListIndices: PropTypes.array,
  piListOfSectorsAndIndustries: PropTypes.array,
  txtMarketCapMaxRange: PropTypes.string,
  txtMarketCapMinRange: PropTypes.string,
};

CopmanyFilterGroupOptions.defaultProps = {
  companyLocationSelection: [],
  freeSearchRecordset: [],
  handleAIPeerGroupSelection: () => {},
  handleBulkCompanySelection: () => {},
  handleCompanyAndIndustry: () => {},
  handleCompanySelection: () => {},
  handleExchangeSelectionChange: () => {},
  handleIndexSelectionChange: () => {},
  handleMarketCapSelection: () => {},
  industrySelection: [],
  listMarketCap: [],
  listOfExchange: [],
  listRegeionAndCountries: [],
  piListIndices: [],
  piListOfSectorsAndIndustries: [],
  txtMarketCapMaxRange: '',
  txtMarketCapMinRange: '',
  marketCapSelection: undefined,
  companySelection: undefined,
};

export default React.memo(CopmanyFilterGroupOptions);
