import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  peopleSearchFormReq,
  getPeopleProfileReq,
  resetPeopleProfile,
  getTokenDecode
} from '../PeopleSearchContainer/PeoplesearchSlice';
import PeopleHeader from '../../components/PeopleSearch/General/PeopleHeader';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const PeopleHeaderContainer = ({
  token,
  getTokenDecode,
  handlePeopleProfile,
  people_data,
  location,
  resetPeopleProfile,
  children
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    getTokenDecode();
    if (query.director_id) {
      handlePeopleProfile(query.director_id);
    }
    return resetPeopleProfile;
  }, [getTokenDecode, query.director_id]);

  return (
    <ErrorBoundary>
      <PeopleHeader people_data={people_data} token={token} children={children} />
    </ErrorBoundary>
  );
};

PeopleHeaderContainer.propTypes = {
  children: PropTypes.any.isRequired,
  people_data: PropTypes.any.isRequired,
  getTokenDecode: PropTypes.func.isRequired,
  handlePeopleProfile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetPeopleProfile: PropTypes.func.isRequired,
  token: PropTypes.any.isRequired
};

const SelectDecodeToken = (state) => state.Peoplesearch.getTokenDecode;
const selectPeople_Data = (state) => state.Peoplesearch.people_data;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  people_data: selectPeople_Data(state)
});

const mapDispatchToProps = {
  handleVisitorLog,
  handlePeopleSearch: peopleSearchFormReq,
  handlePeopleProfile: getPeopleProfileReq,
  resetPeopleProfile,
  getTokenDecode
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleHeaderContainer));
