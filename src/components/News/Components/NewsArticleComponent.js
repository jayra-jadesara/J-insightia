import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  ListForViewNewsTimelineTop5,
  GetNewsMoreInformationLinks,
  AddNewsVisitorLog,
  DummyActivismTimeline,
  GetNewsDetails,
  getNewsNextPrevious,
} from '../../../utils/news-util';
import pathConst, {
  NEWS_IMAGE_PATH,
  QUERY_AND_NEWS,
  QUERY_INVESTOR,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import NewsTagConstant from '../../../constants/NewsTagConstant';
import LinkShare from '../../GeneralForm/LinkShare';
import product from '../../../constants/ProductConstants';
import { AllowActivismTimelines } from '../../../utils/general-util';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const NewsArticleComponent = ({
  loadedIds,
  history,
  location,
  setLoadedIds,
  staticPathConst,
  newsDetailsArray,
  newsDetailsLocation,
  setNewsDetailsLocation,
  newsIds,
  newsid,
  setNewsIds,
  productId,
  setArticleID,
  setArticleMode,
  setNewsDetailsArray,
  selectedSidebarNews,
  isOpenedOn,
  setIsOpenedOn,
  isClickMostRead,
  setIsClickMostRead,
  isMostReadorNot,
  setIsMostReadorNot,
  isVunReport,
}) => {
  const [newsDetails, setNewsDetails] = useState(selectedSidebarNews || newsDetailsArray[newsDetailsLocation]);
  const [lstNewsTimelineTop5, setLstNewsTimelineTop5] = useState([]);
  const [lstNewsCompanyLinks, setLstNewsCompanyLinks] = useState([]);
  const [isValidUser, setIsValidUser] = useState(false);
  const [isVisited, setIsVisited] = useState(0);
  const [fadeIn, setfadeIn] = useState(true);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  async function handlePreviousNews() {
    if (newsDetailsArray[newsDetailsLocation - 1]) {
      await setNewsDetailsLocation(newsDetailsLocation - 1);
      history.push(
        `${location.search}`.replace(`${query.newsID}`, `${newsDetailsArray[newsDetailsLocation - 1].newsid}`)
      );
      await setArticleID(Number(query.newsID));
    }
  }

  async function handleNextNews() {
    // if(!isClickMostRead) {
    //   setIsClickMostRead(false);
    // }
    if (newsDetailsArray[newsDetailsLocation + 1]) {
      await setNewsDetailsLocation(newsDetailsLocation + 1);
      history.push(
        `${location.search}`.replace(`${query.newsID}`, `${newsDetailsArray[newsDetailsLocation + 1].newsid}`)
      );
      // history.push(`${location.search}`.replace(`${query.newsID}`, `${newsIds[newsDetailsLocation + 1]}`));
      await setArticleID(Number(query.newsID));
    }
    if (newsDetailsLocation + 1 === newsDetailsArray.length && !isOpenedOn) {
      newsIds.slice(newsDetailsLocation + 1, newsDetailsLocation + NewsTagConstant.PAGE_SIZE).forEach((e) => {
        GetNewsDetails(e).then(async (res) => {
          newsDetailsArray.push(res);
          await setNewsDetailsArray(
            newsDetailsArray.map((item) => item).sort((a, b) => newsIds.indexOf(a.newsid) - newsIds.indexOf(b.newsid))
          );
          loadedIds.push(e);
          await setLoadedIds(loadedIds);
        });
      });
    }
  }

  async function toggle() {
    if (query.pid !== undefined || query.investor !== undefined) {
      if (staticPathConst !== undefined) {
        history.push(staticPathConst);
      } else {
        window.history.back();
      }
    } else {
      history.push(location.pathname);
    }

    if (isMostReadorNot && setIsClickMostRead !== undefined) {
      // (Most Read News) back button clicked
      setIsClickMostRead(false);
    }
    if (setIsOpenedOn) {
      await setIsOpenedOn(false);
    }
    await setArticleMode(false);
  }

  const setActivismTimelines = useCallback(
    (newsDetails) => {
      if (Number(newsDetails.newsid) === Number(query.newsID)) {
        ListForViewNewsTimelineTop5(query.newsID)
          .then(async (res) => {
            await setLstNewsTimelineTop5(res);
          })
          .catch((e) => console.log(e));
      }
    },
    [query.newsID]
  );

  useEffect(() => {
    if (history.location.pathname !== pathConst.MY_ALERT_INBOX) {
      if (query.newsID === undefined) {
        toggle();
      }
    }
  }, [history, location, location.pathname, location.search, query.pid, query.newsID, toggle]);

  const gatherNextPrev = useCallback(
    async (newsid) => {
      const nextPrev = await getNewsNextPrevious(newsid);
      if (nextPrev) {
        if (newsid !== newsIds[1]) {
          await setNewsIds([
            nextPrev.Previous ? nextPrev.Previous.toString() : null,
            nextPrev.news_id.toString(),
            nextPrev.Next ? nextPrev.Next.toString() : null,
          ]);
          await setNewsDetailsArray([
            await GetNewsDetails(nextPrev.Previous),
            await GetNewsDetails(nextPrev.news_id),
            await GetNewsDetails(nextPrev.Next),
          ]);
          await setNewsDetailsLocation(1);
        }
      }
    },
    [setNewsDetailsArray, setNewsDetailsLocation, newsIds, setNewsIds]
  );

  useEffect(() => {
    if (isOpenedOn && query.newsID !== newsIds[1]) {
      gatherNextPrev(query.newsID);
    }
  }, [isOpenedOn, query.newsID, newsIds, history, gatherNextPrev]);

  const onLoad = useCallback(
    async (newsDetails) => {
      if (isClickMostRead) {
        setIsMostReadorNot(true);
      }
      if (newsDetails === undefined) {
        await setArticleMode(false);
        return null;
      }

      if (newsDetails.readOnly) {
        await setArticleMode(false);
        return null;
      }

      if (productId !== undefined && (product.ACTIVISM || product.ACTIVIST_VULNERABILITY)) {
        AllowActivismTimelines(productId)
          .then(async (isValidUser) => {
            setIsValidUser(isValidUser);
            if (isValidUser) {
              await setActivismTimelines(newsDetails);
            } else {
              DummyActivismTimeline(newsDetails.newsid)
                .then(async (res) => {
                  await setLstNewsTimelineTop5(res);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => console.log(e));
      } else {
        await setIsValidUser(true);
        await setActivismTimelines(newsDetails);
      }
      if (Number(newsDetails.newsid) === Number(query.newsID)) {
        await GetNewsMoreInformationLinks(query.newsID)
          .then(async (res) => {
            await setLstNewsCompanyLinks(res);
          })
          .catch((e) => console.log(e));

        await ListForViewNewsTimelineTop5(query.newsID)
          .then(async (res) => {
            await setLstNewsTimelineTop5(res);
          })
          .catch((e) => console.log(e));
        setTimeout(() => {
          setfadeIn(false);
        }, 1000);
      }
      AddNewsVisitorLog(window.location.pathname, '1', newsDetails.newsid);
      await setIsVisited(true);
    },
    [productId, setArticleMode, query.newsID]
  );

  useEffect(() => {
    if (newsDetails !== undefined || (newsDetailsArray.length !== 0 && newsDetailsLocation !== null)) {
      if (newsDetails) {
        onLoad(newsDetails);
      }
    }
  }, [query.newsID, newsDetails, newsid]);

  useEffect(() => {
    if (newsDetails !== undefined || (newsDetailsArray.length !== 0 && newsDetailsLocation !== null)) {
      if (newsDetailsLocation !== -1) {
        setNewsDetails(newsDetailsArray[newsDetailsLocation]);
      } else if (selectedSidebarNews !== null) {
        setNewsDetails(selectedSidebarNews);
      }
      setfadeIn(true);
    }
  }, [newsDetailsLocation, selectedSidebarNews, newsDetails, newsDetailsArray.length]);

  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTagConstant.NEWS_DEFAULT_IMG_PATH;
  };

  if (newsDetails === null || newsDetails === undefined) return null;

  if (Object.keys(newsDetails).length === undefined) {
    toggle();
  }
  return (
    <ErrorBoundary>
    <div
      className={
        history.location.pathname !== pathConst.MY_ALERT_INBOX
          ? fadeIn
            ? 'fadeOutAnimation d-none'
            : 'fadeInAnimation d-block'
          : ''
      }
    >
      <div
        id='newsMain'
        className={isVisited ? 'row newsMain  newsVisited expandBlock' : 'row newsMain fadeInAnimation'}
      >
        {history.location.pathname !== pathConst.MY_ALERT_INBOX ? (
          <div className='row'>
            <div className='col-3'>
              <div
                className='article-button mb-3 d-none d-md-block d-sm-block d-xs-block mr-auto btn btn-primary btn-sm'
                onClick={toggle}
              >
                Back
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3 order-xs-1 order-sm-1 order-md-2 order-lg-2 order-xl-2'>
          <img
            onError={addDefaultSrc}
            src={`${NEWS_IMAGE_PATH}${encodeURIComponent(newsDetails.img)}`}
            className='rounded w-100 h-auto mx-auto d-block'
            alt='newslogo'
          />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9 order-xs-2 order-sm-2 order-md-1 order-lg-1 order-xl-1'>
          <div className=''>
            <div className='row bottomSaprator' />
            <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12 py-auto newsExpandHeadline'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mr-auto py-auto'>
                <div>
                  <p>
                    <b id='newsHeaderArticle' dangerouslySetInnerHTML={{ __html: newsDetails.headLine }} />
                  </p>
                </div>
              </div>
              <div className='row newsDate py-auto my-auto'>
                <div className='col-8 py-auto my-auto'>{newsDetails.newsDate}</div>
                {history.location.pathname !== pathConst.MY_ALERT_INBOX ? (
                  <div className='col-4 justify-content-end py-auto'>
                    <LinkShare
                      newsid={newsDetails.newsid}
                      mailSubject={newsDetails.headLine}
                      mailBody={newsDetails.shortArticle}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='bottomSaprator' />
          <div className='row py-auto'>
            <div className='col-6 text-primary'>
              {newsDetails.categories !== undefined && newsDetails.categories !== null ? (
                <div>
                  <b className='col-4 bolder me-3'>Categories:</b>
                  <span className='col-8 font-italic'>{newsDetails.categories}</span>
                </div>
              ) : (
                <div />
              )}
            </div>
            {history.location.pathname !== pathConst.MY_ALERT_INBOX ? (
              <div className='col-xs-12 col-sm-12 col-md-6 d-flex justify-content-xs-start justify-content-sm-start justify-content-md-end mb-1'>
                {newsDetailsLocation !== 0 && newsDetailsLocation !== -1 && newsIds[newsDetailsLocation - 1] !== null && (
                  <span
                    className='btn btn-primary btn-sm text-white article-button float-end me-3'
                    onClick={handlePreviousNews}
                  >
                    <span className='bi bi-chevron-left ml-auto text-white' />
                    Previous Story
                  </span>
                )}
                {newsDetailsLocation !== newsIds.length - 1 &&
                  newsDetailsLocation !== -1 &&
                  newsIds[newsDetailsLocation + 1] !== null && (
                    <span
                      className='btn btn-primary btn-sm text-white article-button float-end'
                      onClick={handleNextNews}
                    >
                      Next Story
                      <span className='bi bi-chevron-right mr-auto text-white' />
                    </span>
                  )}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='bottomSaprator' />
          <div className='row mt-4'>
            <div className='col-12'>
              <i className={newsDetails.readOnly ? 'readOnly' : ''} />
              <p className='pt-1' dangerouslySetInnerHTML={{ __html: newsDetails.article }} />
            </div>
          </div>

          <div className='row'>
            {lstNewsCompanyLinks.length > 0 && (
              <div className=' mt-2 col-12 cardInformation'>
                <div className='row'>
                  <div className='col-md-12 bs-linebreak' />
                </div>
                <div className='cardInformationHeader'>More Information On</div>
                <ul className='list-group list-group-flush'>
                  {lstNewsCompanyLinks.map((e, i) => (
                    <p key={`key${i + 1}`} className='py-1 row'>
                      <a
                        href={
                          e.link_type === 'company'
                            ? `${pathConst.COMPANY_OVERVIEW}${QUERY_PID}${e.id}`
                            : `${pathConst.INVESTOR_OVERVIEW}${QUERY_INVESTOR}${e.id}`
                        }
                        className='text-decoration-none col-sm-12 col-md-4'
                        tabIndex='-1'
                        aria-disabled='false'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {e.name}
                      </a>
                      <a
                        href={
                          e.link_type === 'company'
                            ? `${pathConst.NEWS}${QUERY_PID}${e.id}`
                            : `${pathConst.INVESTOR_NEWS}${QUERY_INVESTOR}${e.id}`
                        }
                        className='moreNewsLinks col-sm-12 col-md-4'
                        tabIndex='-1'
                        role='button'
                        aria-disabled='false'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        More News
                      </a>
                    </p>
                  ))}
                </ul>
              </div>
            )}
            <div className='row'>
              {lstNewsTimelineTop5.length > 0 && (
                <div className=' mt-2 col-12 cardInformation'>
                  <div className='row'>
                    <div className='col-md-12 bs-linebreak' />
                  </div>
                  <div className='cardInformationHeader'>
                    Activism Timelines
                    {isValidUser === false && (
                      <span className='text-danger text-capitalize'>
                        {' '}
                        (Only available to subscribers of Activism and Activism Shorts modules)
                      </span>
                    )}
                  </div>
                  <ul className='list-group list-group-flush'>
                    {lstNewsTimelineTop5.map((e, i) => (
                      <p
                        key={`key${i + 1}`}
                        className={isValidUser ? 'py-1 text-primary' : 'py-1 text-primary blurrytext'}
                      >
                        <p className='cardInformationDate'>{e.summary_date}</p>
                        {e.Timeline}
                      </p>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

NewsArticleComponent.propTypes = {
  itemDetails: PropTypes.object,
  match: PropTypes.object,
  productId: PropTypes.number,
};

NewsArticleComponent.defaultProps = {
  itemDetails: {},
  match: {},
  productId: undefined,
};
export default withRouter(React.memo(NewsArticleComponent));
