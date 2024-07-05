import PropTypes from 'prop-types';
import React, { useState, useEffect, memo } from 'react';
import DataContext from '../../utils/VulnerabilityAdvancedSearchCustomPanelDataContext';
import DropdownList from './DropdownList';
import ErrorBoundary from './ErrorBoundary';

const TableFilter = ({ gridApi, saveFilterParams, defaultFilterList, gridOptions, setServerButtonColour }) => {
  const emptyfilterValidationMsg = 'Enter Filter name';
  const alreadyFilterValidationMsg = 'Filter name already exists';

  const [filterName, setFilterName] = useState('');

  const [filterNameValidation, setFilterNameValidation] = useState(false);
  const [filterNameValidationMsg, setFilterNameValidationMsg] = useState(emptyfilterValidationMsg);
  const [editBtnDisable, setEditBtnDisable] = useState(false);
  const [clickEditBtn, setClickEditBtn] = useState(false);

  const [selectedFilterName, setSelectedFilterName] = useState(null);
  const [selectedFilterObj, setSelectedFilterObj] = useState(null);
  const [selectedFilterId, setSelectedFilterId] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const {
    createFilter,
    createFilterFx,
    deleteFilter,
    deleteFilterFx,
    listFilter,
    listFilterFx,
    updateFilter,
    updateFilterFx,
    userId
  } = saveFilterParams;

  const dataContextVulnerability = React.useContext(DataContext);
  console.log(dataContextVulnerability);
  useEffect(() => () => {
    console.log('clear data context');
      //clears datacontext on exiting the page.
      if (gridOptions.serverSideTables.from === 'v_vuln_search') {
        dataContextVulnerability.refreshDataButton = false;
        dataContextVulnerability.AdvancedSearchFilteringData = [];
        dataContextVulnerability.savedState = false;
      }
    }, []);

  useEffect(() => {
    if (userId) {
      const body = { user_id: userId };
      listFilterFx(body);
    }
  }, [userId, createFilter, deleteFilter, updateFilter, listFilterFx]);

  useEffect(() => {
    const arrUserFilterList =
      listFilter.length > 0
        ? listFilter.map((filter) => ({
            label: filter.filter_name,
            value: JSON.parse(filter.filter_definition),
            filter_id: filter.filter_id,
            insightia_filter: false
          }))
        : [{ value: 'No User Saved Searches', label: 'No User Saved Searches', isDisabled: true }];
    setFilterList([
      { value: 'User Saved Searches', label: 'User Saved Searches', isDisabled: true },
      ...arrUserFilterList,
      { value: 'Insightia Searches', label: 'Insightia Searches', isDisabled: true },
      ...defaultFilterList
    ]);
    setEditBtnDisable(true);
  }, [listFilter, selectedFilterName]);

  useEffect(() => {
    if (selectedFilterObj !== null && clickEditBtn) {
      setSelectedFilterObj({ label: selectedFilterName, value: selectedFilterObj.value, filter_id: selectedFilterObj.filter_id, insightia_filter: selectedFilterObj.insightia_filter });
      setClickEditBtn(false);
    }
  }, [selectedFilterName, selectedFilterObj]);

  const handleFilterName = (e) => {
    if (e.target.value.trim() === '') {
      setFilterNameValidation(true);
      setEditBtnDisable(true);
    } else {
      setFilterNameValidation(false);
      setEditBtnDisable(false);
    }
    setFilterName(e.target.value);
  };
  const onLoadFilter = (e) => {
    if (e === null) {
      setSelectedFilterName(null);
      setSelectedFilterObj(null);
      setSelectedFilterId(null);
      gridApi.setFilterModel({});
      gridApi.setColumnDefs(gridOptions.defaultFilterOnClear);
      if (gridOptions.serverSideTables.from === 'v_vuln_search') {
        dataContextVulnerability.refreshDataButton = false;
        dataContextVulnerability.AdvancedSearchFilteringData = [];
        dataContextVulnerability.savedState = false;
      }
      //gridApi.refreshServerSideStore({ purge: true });
    } else {
      setSelectedFilterName(null);
      setSelectedFilterObj(null);
      setSelectedFilterId(null);
      gridApi.setFilterModel({});

      if (gridOptions.serverSideTables.from === 'v_vuln_search') {
        dataContextVulnerability.refreshDataButton = e.value.dataContextFilter.refreshDataButton;
        dataContextVulnerability.AdvancedSearchFilteringData = e.value.dataContextFilter.AdvancedSearchFilteringData;
        dataContextVulnerability.savedState = false;
      }
      setSelectedFilterName(e.label);
      setSelectedFilterObj({ label: e.label, value: e.value.filters, filter_id: e.filter_id, insightia_filter: e.insightia_filter });
      setSelectedFilterId(e.filter_id);
      gridApi.setFilterModel(e.value.filters);

      //gridApi.refreshServerSideStore({ purge: true });
    }
    // saveBtnEnableOrDisable();
    setServerButtonColour(false);
    setFilterNameValidation(false);
  };

  const onEditFilter = () => {
    if (selectedFilterName) {
      const result = window.confirm(`Are you sure you wish to edit ${selectedFilterName}?`);
      let changeName = null;
      if (filterName.trim()) {
        changeName = window.confirm(`Do you wish to change the filter name to ${filterName}?`);
      }
      if (result) {
        if (saveFilterParams) {
          const body = {
            filter_id: selectedFilterId,
            user_id: userId,
            filter_name: changeName ? filterName : selectedFilterName,
            filter_defn: JSON.stringify({ filters: gridApi.getFilterModel(), dataContextFilter: gridOptions.dataContextFilter })
          };
          updateFilterFx(body);
          setSelectedFilterName(changeName ? filterName : selectedFilterName);
          setClickEditBtn(true);
        }
      }
    }
    setFilterName('');
  };

  const onDeleteFilter = () => {
    if (selectedFilterName) {
      const result = window.confirm(`Are you sure you wish to delete ${selectedFilterName}?`);
      if (result) {
        if (saveFilterParams) {
          const body = {
            filter_id: selectedFilterId,
            user_id: userId
          };
          deleteFilterFx(body);
          gridApi.setFilterModel({});
          setSelectedFilterObj(null);

          setSelectedFilterName('');
        }
      }
    }
  };

  const onSaveFilter = () => {
    if (Object.keys(gridApi.getFilterModel()).length > 0 || Object.values(gridOptions.dataContextFilter.AdvancedSearchFilteringData).length > 0) {
      if (filterName.trim() === '') {
        setFilterNameValidation(true);
        setFilterNameValidationMsg(emptyfilterValidationMsg);
      } else {
        const isAvailable = filterList.some((x) => x.label.toLowerCase().trim() === filterName.toLowerCase().trim());
        if (isAvailable) {
          setFilterNameValidationMsg(alreadyFilterValidationMsg);
          setFilterNameValidation(true);
        }
        if (saveFilterParams && !isAvailable) {
          setFilterNameValidationMsg(emptyfilterValidationMsg);
          setFilterNameValidation(false);
          const body = {
            filter_name: filterName,
            filter_defn: JSON.stringify({ filters: gridApi.getFilterModel(), dataContextFilter: gridOptions.dataContextFilter }),
            user_id: userId,
            insightia_filter: false,
          };
          createFilterFx(body);
          setFilterName('');
          if (gridOptions.serverSideTables.from === 'v_vuln_search') {
            dataContextVulnerability.savedState = false;
          }
        }
      }
    }
  };

  return (
    <ErrorBoundary>
    <div className='row'>
      <div className='col-4'>
        <div className='row'>
          <div className='col ppTerminated col-form-label'> <span className='mt-3'>Select Filter:</span></div>
          <div className='col-10'>
            <DropdownList
              options={filterList}
              handleChange={onLoadFilter}
              selectedValue={selectedFilterObj}
              placeholder='(Option) Choose One Search'
            />
          </div>
        </div>
      </div>
      <div className='col-7'>
        <div className='row'>
        <div className='ppTerminated col-2 col-form-label'>Save Current Filter:</div>
        <div className='col-5'>
          <input
            type='text'
            onChange={handleFilterName}
            value={filterName}
            className='form-control input-sm'
            placeholder='Add name to save as new filter'
          />
          {filterNameValidation && <span className='text-danger'>{filterNameValidationMsg}</span>}
        </div>
        {selectedFilterName && !selectedFilterObj.insightia_filter ? (
          <div className='col-5'>
              <div className="btn-group justify-content-between" role="toolbar" aria-label="Basic example">
              <button type='button' className='btn btn-primary btn-sm btn-block' onClick={() => onSaveFilter()}>
                Save Filter
              </button>
              <button type='button' className='btn btn-primary btn-sm btn-block' onClick={() => onLoadFilter(null)}>
                Clear Filter
              </button>
              <button type='button' className='btn btn-primary btn-sm btn-block' onClick={onDeleteFilter}>
                Delete Filter
              </button>
              <button type='button' disabled={editBtnDisable} className='btn btn-primary btn-sm btn-block' onClick={onEditFilter}>
                Edit Filter
              </button>
              </div>
          </div>
          ) : (
            <div className='col-5'>
              <div className="btn-group justify-content-between" role="toolbar" aria-label="Basic example">
                <button type='button' className='btn btn-primary btn-sm btn-block' onClick={() => onSaveFilter()}>
                  Save Filter
                </button>
                <button type='button' className='btn btn-primary btn-sm btn-block' onClick={() => onLoadFilter(null)}>
                  Clear Filter
                </button>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

TableFilter.propTypes = {
  gridApi: PropTypes.shape({
    getFilterModel: PropTypes.func,
    setFilterModel: PropTypes.func
  }),
  saveFilterParams: PropTypes.shape({
    createFilter: PropTypes.array,
    createFilterFx: PropTypes.func,
    deleteFilter: PropTypes.array,
    deleteFilterFx: PropTypes.func,
    listFilter: PropTypes.array,
    listFilterFx: PropTypes.func,
    updateFilter: PropTypes.array,
    updateFilterFx: PropTypes.func,
    userId: PropTypes.number
  })
};

TableFilter.defaultProps = {
  gridApi: PropTypes.shape({
    getFilterModel: () => {},
    setFilterModel: () => {}
  }),
  saveFilterParams: PropTypes.shape({
    createFilter: [],
    createFilterFx: () => {},
    deleteFilter: [],
    deleteFilterFx: () => {},
    listFilter: [],
    listFilterFx: () => {},
    updateFilter: [],
    updateFilterFx: () => {},
    userId: 0
  })
};

export default memo(TableFilter);
