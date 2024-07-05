import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Magazine from '../../components/Magazine/General/Magazine';

const MagazineContainer = ({ location, children }) => {
  if (location.state) {
    return <Magazine />;
  }
  return null;
};

MagazineContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazineContainer));
