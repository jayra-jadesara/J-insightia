import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { GetNewsDetails } from '../../../utils/news-util';
import {
  NEWS_IMAGE_PATH,
  QUERY_NEWS,
  QUERY_PID,
  QUERY_AND_NEWS,
  QUERY_INVESTOR
} from '../../../constants/PathsConstant';
import NewsTagConstant from '../../../constants/NewsTagConstant';
import { history } from '../../../utils/navigation-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const MostReadNewsIndivisual = ({ newsid, setIsClickMostRead, location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [isLoading, setIsLoading] = useState(true);
  const [newsDetails, setNewsDetails] = useState({});

  useEffect(() => {
    async function getNewsDetails() {
      await setIsLoading(true);
      await GetNewsDetails(newsid)
        .then((res) => {
          setNewsDetails(res);
        })
        .catch((e) => console.log(e));
      await setIsLoading(false);
    }
    getNewsDetails();
  }, [setNewsDetails, newsid]);

  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTagConstant.NEWS_DEFAULT_IMG_PATH;
  };
  return (
    <ErrorBoundary>
      {isLoading === false && (
        <div className='row fadeInAnimation mostVisitBlock'>
          <div className='row d-flex justify-content-center imageHeader'>
            <img
              onError={addDefaultSrc}
              src={`${NEWS_IMAGE_PATH}${newsDetails.img}`}
              // className="rounded mx-auto d-block"
              alt='newslogo'
            />
          </div>

          <div className='row titleBlock'>
            <p className='titleBlockModule'>{newsDetails.module}</p>
            <p className='titleBlockTitle'>
              <b dangerouslySetInnerHTML={{ __html: newsDetails.headLine }} />
            </p>
            <p className='titleBlockDate'>{newsDetails.newsDate}</p>
          </div>
          <p className='row mostReadShortArticle ps-4' dangerouslySetInnerHTML={{ __html: newsDetails.shortArticle }} />
          <p className='row'>
            <div className='col-12 col-md-12 cursor-pointer read-more-padding'>
              <a
                href='#'
                activeclassname='active'
                className='mostReadLink'
                onClick={(e) => {
                  e.preventDefault();
                  setIsClickMostRead(true);
                  if (query.pid !== undefined) {
                    history.push(`${location.pathname}${QUERY_PID}${query.pid}${QUERY_AND_NEWS}${newsid}`);
                  } else if (query.investor !== undefined) {
                    history.push(`${location.pathname}${QUERY_INVESTOR}${query.investor}${QUERY_AND_NEWS}${newsid}`);
                  } else {
                    history.push(`${location.pathname}${QUERY_NEWS}${newsid}`);
                  }
                }}
              >
                Read More
              </a>
            </div>
          </p>
        </div>
      )}
    </ErrorBoundary>
  );
};

MostReadNewsIndivisual.propTypes = {
  newsid: PropTypes.number
};

MostReadNewsIndivisual.defaultProps = {
  newsid: 0
};

export default withRouter(React.memo(MostReadNewsIndivisual));
