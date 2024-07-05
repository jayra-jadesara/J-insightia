import PropTypes from 'prop-types';
import React from 'react';
import SearchInput from '../GeneralForm/DropdownVirtualized';
import DropdownTreeSelect from '../GeneralForm/DropdownTreeSelect';
import Table from '../GeneralForm/Table';
import DropdownListAsync from '../GeneralForm/DropdownListAsync';
import { GetAllInvestors } from '../../utils/dashboard-util';
import numConst from '../../constants/NumberConstants';

const InvestorFilter = (props) => {
  const [formVal, setFormVal] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const marketCapMinInput = React.useRef(null);

  const recordset = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'investor_name'
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
                props.handleBulkInvestorSelection(params.data);
              }}
              className='btn btn-primary btn-sm m-1'
            >
              Add
            </button>
          </div>
        ),
        sortable: false,
        suppressMovable: false,
        filter: false
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'pid',
          pinned: 'right'
        }
      ]
    },
    paggination: { isPagging: true, pageSize: 5 },
    isfloatingFilter: false,
    rowData: props.freeSearchRecordset
  };

  const handleFreeSearchSection = () => {
    props.handleInvestorIsBulkUpload(true);
  };

  const handleHideFreeSearchSection = () => {
    props.handleInvestorIsBulkUpload(false);
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormVal((preValue) => ({
      ...preValue,
      [name]: value
    }));
  };

  const handleBulkSearch = async (events) => {
    events.preventDefault();
    if (formVal !== undefined && formVal.txtBulkSearch.length > 0) {
      setIsLoading(true);
      const data = {
        rowdata: formVal.txtBulkSearch
      };
      await props.handleSearchInvestor(data);
      setIsLoading(false);
    }
  };
  function handleSearchShareholder(e) {
    let validArray = [];
    if (props.listByIndivProponent && props.listByIndivProponent.length) {
      validArray = props.listByIndivProponent;
    } else if (props.listByIndivProponen && props.listByIndivProponent.data.length) {
      validArray = props.listByIndivProponent.data;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = validArray.filter((i) =>
          i.label.toLowerCase().includes(e.toLowerCase())
        );
        resolve({ data: data });
      }, 100);
    });
  }
  return (
    <div>
      <div className='row mb-1'>
        <label htmlFor='InvestorFilter' className='col-sm-3 col-form-label text-primary font-weight-bold mb-0'>
          Investor:
        </label>
        <div className='col-sm-9 mb-0'>
          <DropdownListAsync
            loadOptions={(e) => GetAllInvestors(e)}
            handleChange={(e) => props.handleInvestorSelection(e)}
            selectedValue={props.investorSelection}
            isMulti
            placeholder='(Optional) Start typing to search for an investor...'
          />
        </div>
      </div>
      {props.isInvestorBulkUpload ? (
        <div className='row fadeInAnimation'>
          <label htmlFor='InvestorFilter' className='col-sm-3 col-form-label text-primary font-weight-bold' />
          <div className='col-sm-9'>
            <button
              type='button'
              onClick={(e) => handleHideFreeSearchSection(e)}
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Hide Free Search/Bulk upload section
            </button>
          </div>
          <div className='col-sm-12 mb-2'>
            <textarea
              name='txtBulkSearch'
              onChange={inputEvent}
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='5'
              required
            />
            {isLoading ? <span className='text-primary'>Loading...</span> : ''}
            <button type='button' onClick={(e) => handleBulkSearch(e)} className='btn btn-primary btn-sm m-1 float-end'>
              Search
            </button>
          </div>
          <div className='col-sm-12'>
            {props.freeSearchRecordset.length > 0 ? <Table IsShowCard={false} gridOptions={recordset} /> : ''}
          </div>
        </div>
      ) : (
        <div className='row mb-3'>
          <label htmlFor='InvestorFilter' className='col-sm-3 col-form-label text-primary font-weight-bold' />
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

      <div className='row mb-2 mt-3'>
        <label htmlFor='investorlocation' className='col-sm-3 col-form-label text-primary font-weight-bold'>
          By Investor Location:
        </label>
        <div className='col-sm-9'>
          <DropdownTreeSelect
            onChangeSelection={props.HandleTreeViewInvestorLocation}
            options={props.invListRegeionAndCountries.length > 0 ? props.invListRegeionAndCountries : props.lstInvestorRegeionAndCountries}
            placeholder={

              props.investorLocationSelection.length === numConst.EMPTY_TABLE_LENGTH
                ? '(Optional) Choose one or more Investor locations...'
                : ' '
            }
            totalSelection={props.investorLocationSelection}
          />
        </div>
      </div>
      <div className='row'>
        <label
          htmlFor='byShareholderOfCompany'
          className='col-sm-3 col-form-label text-primary font-weight-bold pb-0 pt-0 mb-1'
        >
          By shareholder of Company (US only):
        </label>
        <div className='col-sm-9 mb-1'>
          <DropdownListAsync
            handleChange={(e) => {
              if (e !== null) {
                props.handleByShareholderOfCompany(e);
                props.getAllInvestorsFromShareholderOfCompany(e);
              }
            }}
            selectedValue={
              props.selectionByIndivProponent !== undefined &&
              props.selectionByIndivProponent
            }
            loadOptions={(e) => handleSearchShareholder(e)}
            isMulti={false}
            maxHeight={180}
            placeholder='(Optional) Choose Investors based on Latest Shareholder Base...'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <label htmlFor='investorType' className='col-sm-3 col-form-label text-primary font-weight-bold'>
          Investor Type:
        </label>
        <div className='col-sm-9'>
          <DropdownTreeSelect
            onChangeSelection={props.HandleTreeViewListInvestorTypeAndSubtype}
            options={props.listInvestorTypeAndSubtype.length > 0 ? props.listInvestorTypeAndSubtype : props.listDefaultInvestorTypeAndSubtype}
            placeholder={
              props.listInvestorTypeAndSubtypeSelection.length === numConst.EMPTY_TABLE_LENGTH
                ? '(Optional) Choose one or more Investor Types...'
                : ' '
            }
            totalSelection={props.listInvestorTypeAndSubtypeSelection.length}
          />
        </div>
      </div>

      <div className='row mb-3'>
        <label htmlFor='companymarketcap' className='col-sm-3 col-form-label text-primary font-weight-bold'>
          AUM ($bn):
        </label>
        <div className='col-sm-9'>
          <SearchInput
            onChange={(e) => {
              props.handleAumCategorySelection(e);
              marketCapMinInput.current.focus();
            }}
            isClearable
            selectValue={props.aumCategorySelection}
            options={props.listAumCategory}
            placeholder='(Optional) Choose AUM groups ($bn)'
          />
        </div>
      </div>
      <div className='row'>
        <label htmlFor='companymarketcaprange' className='col-sm-3 col-form-label text-primary pt-0 pb-0 mb-1'>
          or use your own AUM range:
        </label>
        <div className='col-sm-9 mb-1'>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                type='text'
                name='marketCapMin'
                value={props.invTxtMarketCapMinRange}
                onChange={props.handleInvMarketCapMinRange}
                className='form-control'
                placeholder='Min'
                ref={marketCapMinInput}
              />
            </div>
            <div className='col-sm-6'>
              <input
                type='text'
                name='marketCapMax'
                value={props.invTxtMarketCapMaxRange}
                onChange={props.handleInvMarketCapMaxRange}
                className='form-control'
                placeholder='Max'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InvestorFilter.propTypes = {
  HandleTreeViewInvestorLocation: PropTypes.func,
  HandleTreeViewListInvestorTypeAndSubtype: PropTypes.func,
  freeSearchRecordset: PropTypes.array,
  getAllInvestorsFromShareholderOfCompany: PropTypes.func,
  handleBulkInvestorSelection: PropTypes.func,
  handleByShareholderOfCompany: PropTypes.func,
  handleInvestorIsBulkUpload: PropTypes.func,
  handleInvestorSelection: PropTypes.func,
  handleMarketCapMaxRange: PropTypes.func,
  handleMarketCapMinRange: PropTypes.func,
  handleMarketCapSelection: PropTypes.func,
  handleSearchInvestor: PropTypes.func,
  investorLocationSelection: PropTypes.array,
  investorSelection: PropTypes.any,
  isInvestorBulkUpload: PropTypes.bool,
  listInvestorTypeAndSubtype: PropTypes.array,
  listInvestorTypeAndSubtypeSelection: PropTypes.array,
  listRegeionAndCountries: PropTypes.array,
  marketCapSelection: PropTypes.any,
  txtMarketCapMaxRange: PropTypes.string,
  txtMarketCapMinRange: PropTypes.string,

  listAumCategory: PropTypes.array,
  aumCategorySelection: PropTypes.any,
  handleAumCategorySelection: PropTypes.func,
  listByIndivProponent: PropTypes.array,
  invListRegeionAndCountries: PropTypes.array,
};

InvestorFilter.defaultProps = {
  HandleTreeViewInvestorLocation: () => {},
  HandleTreeViewListInvestorTypeAndSubtype: () => {},
  freeSearchRecordset: [],
  getAllInvestorsFromShareholderOfCompany: () => {},
  handleBulkInvestorSelection: () => {},
  handleByShareholderOfCompany: () => {},
  handleInvestorIsBulkUpload: () => {},
  handleInvestorSelection: () => {},
  handleMarketCapMaxRange: () => {},
  handleMarketCapMinRange: () => {},
  handleMarketCapSelection: () => {},
  handleAumCategorySelection: () => {},
  handleSearchInvestor: () => {},
  investorLocationSelection: [],
  isInvestorBulkUpload: false,
  listInvestorTypeAndSubtype: [],
  listInvestorTypeAndSubtypeSelection: [],
  listRegeionAndCountries: [],
  txtMarketCapMaxRange: '',
  txtMarketCapMinRange: '',
  listByIndivProponent: [],
  invListRegeionAndCountries: [],
  listAumCategory: undefined
};

export default InvestorFilter;
