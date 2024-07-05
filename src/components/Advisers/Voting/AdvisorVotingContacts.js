import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { NORECORDS } from '../../../constants/MessageConstans';
import PersonComponent from '../../Investor/InvestorVoting/Components/PersonComponent';
import Card from '../../GeneralForm/Card';
import numConst from '../../../constants/NumberConstants';

const VotingProfileContacts = ({ location, tableContacts, loadingData, TrialStatus }) => {
  const [jsonNew, setJsonNew] = useState([]);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const jsonImgExists = [];

  const getImageOrFallback = (path, fallback) => {
    const wrappedPromise = new Promise((resolve, reject) => {
      let rejectFn;
      rejectFn = reject;
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
      if (!img.complete) {
        return false;
      }
      return true;
    });
    wrappedPromise.cancel = () => {
      rejectFn({ canceled: true });
    };
    return wrappedPromise;
  };

  const getAll = useCallback(() => {
    for (const obj of tableContacts) {
      const pathUrl = `${window.location.origin}${CONTACT_IMG_PATH}${encodeURIComponent(obj.picture)}`;
      const link = await getImageOrFallback(pathUrl, ''); // .then((result) => result);
      jsonImgExists.push({ ...obj, imageExists: link !== '' });
    }
    setJsonNew(jsonImgExists);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [getAll]);

  if (!query.company_id) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  const contactDetails = useCallback(() => {
    jsonNew.length > 0 && jsonNew.map((items, i) => <PersonComponent key={i} {...items} TrialStatus={TrialStatus} />);
  }, []);

  return (
    <>
      {!loadingData && tableContacts.length === numConst.EMPTY_TABLE_LENGTH && NORECORDS}
      {!loadingData && tableContacts.length > 0 && (
        <Card IsShowCard title='Lawyers' smalltitle='' addedClass=''>
          {contactDetails}
        </Card>
      )}
    </>
  );
};

VotingProfileContacts.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableContacts: PropTypes.array
};
VotingProfileContacts.defaultProps = {
  tableContacts: []
};

export default withRouter(VotingProfileContacts);
