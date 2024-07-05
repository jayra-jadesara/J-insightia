import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import NewsTabConstant from '../../../constants/NewsTagConstant';
import PathsConstant, {
  NEWS_IMAGE_PATH,
  QUERY_AND_NEWS,
  QUERY_NEWS,
  QUERY_PID,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

// let alreadyScrolled = false;
let lastScrollNews;

const NewNewsIndividualComponent = ({
  history,
  index,
  location,
  staticPathConst,
  itemDetails,
  newsid,
  setArticleMode,
  setArticleID,
  setNewsDetailsLocation,
  handleModalClickEvent,
  isVunReport,
  isCompanyCampaignNews,
  isInvestorCampaignNews,
}) => {
  const newsRef = useRef(null);
  const newsDetails = itemDetails;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  // const [isShowShareIcons, setIsShowShareIcons] = useState(false);
  const isVisited = newsDetails.visited;

  function toggle(e) {
    e.preventDefault();
    if (e.button === 0) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (handleModalClickEvent) {
        handleModalClickEvent(true);
      }
      if (newsDetails.readOnly) {
        return null;
      }
      setTimeout(() => {
        setArticleMode(true);
      }, 1000);
      setArticleID(Number(newsid));
      setNewsDetailsLocation(index);
    }

    let strPath = '';
    if (isVunReport) {
      strPath = `${PathsConstant.NEWS}${location.search}${QUERY_AND_NEWS}${newsid}`;
    } else if (isCompanyCampaignNews) {
      strPath = `${PathsConstant.INVESTOR_NEWS}${QUERY_INVESTOR}${newsDetails.investor_id}${QUERY_AND_NEWS}${newsid}`;
    } else if (isInvestorCampaignNews) {
      strPath = `${PathsConstant.NEWS}${QUERY_PID}${newsDetails.pid}${QUERY_AND_NEWS}${newsid}`;
    } else if (
      location.pathname === PathsConstant.NEWS ||
      location.pathname === PathsConstant.INVESTOR_NEWS
    ) {
      strPath = `${location.pathname}${location.search}${QUERY_AND_NEWS}${newsid}`;
    } else {
      strPath = `${staticPathConst}${QUERY_NEWS}${newsid}`;
    }
    history.push(strPath);
    return null;
  }

  const url1 = () => {
    let strPath = '';
    if (isVunReport) {
      strPath = `${PathsConstant.NEWS}${location.search}${QUERY_AND_NEWS}${newsid}`;
    } else if (isCompanyCampaignNews) {
      strPath = `${PathsConstant.INVESTOR_NEWS}${QUERY_INVESTOR}${newsDetails.investor_id}${QUERY_AND_NEWS}${newsid}`;
    } else if (isInvestorCampaignNews) {
      strPath = `${PathsConstant.NEWS}${QUERY_PID}${newsDetails.pid}${QUERY_AND_NEWS}${newsid}`;
    } else if (
      location.pathname === PathsConstant.NEWS ||
      location.pathname === PathsConstant.INVESTOR_NEWS
    ) {
      strPath = `${location.pathname}${location.search}${QUERY_AND_NEWS}${newsid}`;
    } else {
      strPath = `${staticPathConst}${QUERY_NEWS}${newsid}`;
    }
    return strPath;
  };

  const callback = useCallback(() => {
    if (query.newsID && query.newsID === newsDetails.newsid.toString()) {
      const newsinfoDiv = document.getElementById(newsDetails.newsid);
      if (newsinfoDiv !== null) {
        if (lastScrollNews !== newsDetails.newsid) {
          lastScrollNews = newsDetails.newsid;
          setTimeout(() => {
            if (document.getElementById(newsDetails.newsid)) {
              document.getElementById(newsDetails.newsid).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }
          }, 1000);
        }
      }
    }
  }, [query.newsID, newsDetails.newsid]);

  useEffect(() => {
    callback();
  }, [callback]);

  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTabConstant.NEWS_DEFAULT_IMG_PATH;
  };

  return (
    <ErrorBoundary>
      <div ref={newsRef}>
        <div href1={`#${newsDetails.newsid}`} id={newsDetails.newsid} />
        <div
          className={
            isVisited
              ? `row newsMain fadeInAnimation newsVisited pdfpagebreakinsideavoid ${
                  newsDetails.rowHighlight ? 'bg-green-highlight' : ''
                } `
              : `row newsMain fadeInAnimation pdfpagebreakinsideavoid ${
                  newsDetails.rowHighlight ? 'bg-green-highlight' : ''
                }`
          }
        >
          <a
            href={url1()}
            activeclassname='active'
            className='col-5 col-md-2 p-0 cursor-pointer m-auto'
            onMouseDown={(e) => toggle(e)}
          >
            <img
              aria-hidden='true'
              onError={addDefaultSrc}
              src={`${NEWS_IMAGE_PATH}${encodeURI(newsDetails.img)}`}
              className='rounded mx-auto d-block'
              alt='newslogo'
            />
          </a>
          <div className='col-7 col-md-10 col-sm-10'>
            <div className='row mx-2'>
              <div className='col-12 col-md-12'>
                <p
                  className='text-secondary'
                  dangerouslySetInnerHTML={{ __html: newsDetails.module }}
                />
              </div>
              <div className='col-12 col-md-12'>
                <a
                  href={url1()}
                  activeclassname='active'
                  className='mostReadTitle1 titleBlock cursor-pointer'
                  onMouseDown={(e) => toggle(e)}
                >
                  <b
                    dangerouslySetInnerHTML={{ __html: newsDetails.headLine }}
                  />
                </a>
              </div>
              <div className='col-12 col-md-12'>
                <p className='text-secondary'>{newsDetails.newsDate}</p>
              </div>
              <div className='col-12 col-md-12'>
                <i className={newsDetails.readOnly ? 'readOnly' : ''} />
                <p
                  className='d-none d-md-block'
                  dangerouslySetInnerHTML={{ __html: newsDetails.shortArticle }}
                />
              </div>
              <div className='col-12 col-md-12 cursor-pointer'>
                <p
                  aria-hidden='true'
                  // onClick={(e) => toggle(e)}
                  // onMouseDown={(e) => toggle(e)}
                  className='text-primary'
                >
                  <a
                    href={url1()}
                    activeclassname='active'
                    className='mostReadLink'
                    onMouseDown={(e) => toggle(e)}
                  >
                    <b>Read more</b>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

NewNewsIndividualComponent.propTypes = {
  itemDetails: PropTypes.object,
  match: PropTypes.object,
  productId: PropTypes.number,
};

NewNewsIndividualComponent.defaultProps = {
  itemDetails: {},
  match: {},
  productId: 0,
};

export default withRouter(React.memo(NewNewsIndividualComponent));
