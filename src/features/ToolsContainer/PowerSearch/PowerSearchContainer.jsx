import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PowerSearch from '../../../components/Tools/PowerSearchTools/PowerSearch';
import {
  createPowerSearchFilterReq,
  deletePowerSearchFilterReq,
  handleDeleteFilterLocally,
  listPowerSearchFilterReq,
  updatePowerSearchFilterReq,
  getTokenDecode
} from './PowerSearchSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const PowerSearchContainer = ({
  listFilter,
  deleteFilter,
  createFilter,
  updateFilter,
  token,
  createPowerSearchFilterReq,
  deletePowerSearchFilterReq,
  listPowerSearchFilterReq,
  updatePowerSearchFilterReq,
  getTokenDecode
}) => {
  function isMembershipStatus(product_id, hasStatus, noStatus) {
    if (
      token.MemberShip !== undefined &&
      token.MemberShip.filter(
        (item) =>
          item.product_id === product_id &&
          (item.status === 4 || item.status === 2)
      ).length > 0
    ) {
      return hasStatus;
    }
    return noStatus;
  }

  useEffect(() => {
    getTokenDecode();
  }, [getTokenDecode]);

  return (
    <ErrorBoundary>
      <PowerSearch
        listFilter={listFilter}
        deleteFilter={deleteFilter}
        createFilter={createFilter}
        updateFilter={updateFilter}
        createPowerSearchFilterReq={createPowerSearchFilterReq}
        deletePowerSearchFilterReq={deletePowerSearchFilterReq}
        updatePowerSearchFilterReq={updatePowerSearchFilterReq}
        listPowerSearchFilterReq={listPowerSearchFilterReq}
        isMembershipStatus={isMembershipStatus}
        token={token}
      />
    </ErrorBoundary>
  );
};

const SelectListFilter = (state) => state.powersearch.listFilter;
const SelectDeleteFilter = (state) => state.powersearch.deleteFilter;
const SelectCreateFilter = (state) => state.powersearch.createFilter;
const SelectUpdateFilter = (state) => state.powersearch.updateFilter;
const SelectDecodeToken = (state) => state.powersearch.getTokenDecode;

const mapStateToProps = (state) => ({
  listFilter: SelectListFilter(state),
  deleteFilter: SelectDeleteFilter(state),
  createFilter: SelectCreateFilter(state),
  updateFilter: SelectUpdateFilter(state),
  token: SelectDecodeToken(state)
});

const mapDispatchToProps = {
  handleDeleteFilterLocally,
  listPowerSearchFilterReq,
  createPowerSearchFilterReq,
  updatePowerSearchFilterReq,
  deletePowerSearchFilterReq,
  getTokenDecode
};

PowerSearchContainer.propTypes = {
  getTokenDecode: PropTypes.func,
  token: PropTypes.any.isRequired,
  listPowerSearchFilterReq: PropTypes.func,
  createPowerSearchFilterReq: PropTypes.func,
  updatePowerSearchFilterReq: PropTypes.func,
  deletePowerSearchFilterReq: PropTypes.func,
  listFilter: PropTypes.array,
  deleteFilter: PropTypes.array,
  createFilter: PropTypes.array,
  updateFilter: PropTypes.array
};

PowerSearchContainer.defaultProps = {
  getTokenDecode: () => {},
  listPowerSearchFilterReq: () => {},
  createPowerSearchFilterReq: () => {},
  updatePowerSearchFilterReq: () => {},
  deletePowerSearchFilterReq: () => {},
  listFilter: [],
  deleteFilter: [],
  createFilter: [],
  updateFilter: []
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PowerSearchContainer)
);
