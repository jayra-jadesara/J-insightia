import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import DropdownListAsync from '../GeneralForm/DropdownListAsync';
import { GetAllIssuers } from '../../utils/dashboard-util';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const CompanyFilter = (props) => {
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <ErrorBoundary>
      <div className='row'>
        <label htmlFor='savecurrentlist' className='col-sm-9 col-form-label' />
        <div className='col-sm-3 mb-3'>
          <input
            type='button'
            onClick={props.handleShowIndividualOption}
            className='btn btn-primary btn-sm float-end'
            value='Group Options'
          />
        </div>
      </div>
      <div className='mb-3'>
        <DropdownListAsync
          loadOptions={(e) => GetAllIssuers(e)}
          handleChange={(e) => props.handleCompanySingleSelection(e)}
          selectedValue={props.companySingleSelection}
          isMulti={false}
          placeholder='Start typing to search for a company...'
          maxHeight={180}
        />
      </div>
      </ErrorBoundary>
    </div>
  );
};

CompanyFilter.propTypes = {
  companySingleSelection: PropTypes.any,
  handleCompanySingleSelection: PropTypes.func,
  handleShowIndividualOption: PropTypes.func
};

CompanyFilter.defaultProps = {
  handleCompanySingleSelection: () => {},
  handleShowIndividualOption: () => {}
};

export default React.memo(CompanyFilter);
