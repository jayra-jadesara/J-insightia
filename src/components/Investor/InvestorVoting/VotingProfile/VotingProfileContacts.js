import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import PersonComponent from '../Components/PersonComponent';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileContacts = ({ tableContacts, loadingData, TrialStatus, dataContactDetails }) => {
  // if (!query.investor) {
  //   return <Redirect to={INVESTOR_SEARCH} />;
  // }
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataContactDetails);
    return () => setData([]);
  }, [dataContactDetails, dataContactDetails.length]);

  // const contactDetails =
  //   jsonNew.length > 0 && jsonNew.map((items, i) => <PersonComponent key={i} {...items} TrialStatus={TrialStatus} investor={query.investor} />);

  const contactDetails =
    data.length > 0 ?
    data.map((items, i) => (
      <PersonComponent key={`Person${i + 1}`} {...items} TrialStatus={TrialStatus} />
    )) : '';

  return (
    <div className='pt-2'>
      {!loadingData && tableContacts.length === numConst.EMPTY_TABLE_LENGTH && (
        <Card title='Contacts'>{NORECORDS}</Card>
      )}
      {!loadingData && tableContacts.length > 0 && (
        <Card IsShowCard title='Contacts' smalltitle='' addedClass=''>
          {contactDetails}
        </Card>
      )}
    </div>
  );
};

VotingProfileContacts.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.any,
  TrialStatus: PropTypes.any,
  tableContacts: PropTypes.array,
  dataContactDetails: PropTypes.array,
};
VotingProfileContacts.defaultProps = {
  tableContacts: [],
  loadingData: undefined,
  TrialStatus: undefined,
  dataContactDetails: []
};

export default withRouter(VotingProfileContacts);
