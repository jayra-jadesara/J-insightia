import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { PropTypes } from 'prop-types';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
// import NewsIndividualComponent from './NewsIndividualComponent';
import NewNewsIndividualComponent from './NewNewsIndividualComponent';

import { GetNewsDetails } from '../../../utils/news-util';
import NewsTagConstant from '../../../constants/NewsTagConstant';
import PathsConstant from '../../../constants/PathsConstant';
import { NUMBER_NEGATIVE_ONE } from '../../../constants/NumberConstants';
import NewsArticleComponent from './NewsArticleComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const pageSize = NewsTagConstant.PAGE_SIZE;
const getInitialStartIndex = (hash, newsIds) => {
  let startIndex = 0;
  if (hash) {
    startIndex = Math.floor(newsIds.indexOf(hash * 1) - pageSize / 2);
  }
  const inxSelection = startIndex < 0 ? 0 : startIndex;
  return inxSelection;
};

const MultiNewsComponent = ({
  newsIds,
  history,
  location,
  staticPathConst,
  match,
  productId,
  selectedSidebarNews,
  handleSelectSidebarNews,
  articleMode,
  setArticleMode,
  setIsOpenedOn,
  setOpenOnLoad,
  loadedIds,
  openOnLoad,
  newsDetailsArray,
  setArticleID,
  setNewsDetailsLocation,
  articleID,
  setNewsDetailsArray,
  setLoadedIds,
  newsDetailsLocation,
  handleModalClickEvent,
  topIndex,
  isClickMostRead,
  setIsClickMostRead,
  isMostReadorNot,
  setIsMostReadorNot,
  isVunReport,
  isCompanyCampaignNews,
  isInvestorCampaignNews,
  CancelToken,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const multiNewsComponent = useRef(null);
  const [setHashScroll] = useState(true);
  const inx = getInitialStartIndex(query.newsID, newsIds);
  const [startIndex, setStartIndex] = useState(inx);

  useEffect(() => {
    setStartIndex(inx);
  }, [inx]);

  useEffect(() => {
    const thisID = Number(query.newsID);
    const indexFrom_loadedIds = loadedIds.indexOf(thisID);

    if (
      query.newsID &&
      openOnLoad &&
      indexFrom_loadedIds !== NUMBER_NEGATIVE_ONE &&
      newsDetailsArray[indexFrom_loadedIds] !== undefined
    ) {
      setOpenOnLoad(true);
      setArticleMode(true);
      setArticleID(Number(thisID));
      if (newsDetailsArray[indexFrom_loadedIds].newsid === thisID) {
        setNewsDetailsLocation(indexFrom_loadedIds);
      } else {
        const obj = newsDetailsArray.filter((item) => item.newsid === thisID);
        if (obj.length > 0) {
          const index = newsDetailsArray.indexOf(obj[0]);
          setNewsDetailsLocation(index);
        }
      }
    }
  }, [
    newsDetailsArray.length,
    history,
    loadedIds,
    openOnLoad,
    setArticleMode,
    query.newsID,
    setArticleID,
    setNewsDetailsLocation,
    setOpenOnLoad,
  ]);

  useLayoutEffect(() => {
    setIsOpenedOn(false);
  }, [setIsOpenedOn]);

  useLayoutEffect(() => {
    if (selectedSidebarNews) {
      setArticleMode(true);
      setArticleID(Number(selectedSidebarNews.newsid));
      setNewsDetailsLocation(loadedIds.indexOf(selectedSidebarNews.newsid));
    }
  }, [
    selectedSidebarNews,
    loadedIds,
    setArticleMode,
    setArticleID,
    setNewsDetailsLocation,
  ]);

  function loadPrevious() {
    topIndex = topIndex === null ? startIndex : topIndex;
    topIndex -= pageSize;
    setStartIndex(topIndex >= 0 ? topIndex : 0);
    setHashScroll(false);
  }

  const _toBeLoadedNewsIds = newsIds
    ? newsIds.slice(startIndex, startIndex + pageSize)
    : [];

  useLayoutEffect(() => {
    setTimeout(() => {
      if (!isMostReadorNot) {
        if (articleID && !articleMode && document.getElementById(articleID)) {
          window.location.hash = `#${articleID}`;
          setArticleID(0);
          if (query.pid || query.investor) {
            history.push(staticPathConst);
          }
        }
      } else {
        setIsMostReadorNot(false);
      }
    }, 1000);
    if (
      query.pid !== undefined &&
      query.newsID === undefined &&
      query.investor === undefined
    ) {
      history.push(staticPathConst);
    } else if (
      query.investor !== undefined &&
      query.newsID === undefined &&
      query.pid === undefined
    ) {
      history.push(staticPathConst);
    } else if (query.newsID === undefined) {
      history.push(location.pathname);
    } else if (query.newsID) {
      setArticleMode(true);
      setArticleID(Number(query.newsID));
    }
  }, [
    articleMode,
    articleID,
    history,
    location.pathname,
    query.investor,
    query.pid,
    query.newsID,
    setArticleID,
    staticPathConst,
    setArticleMode,
  ]);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    if (
      _toBeLoadedNewsIds.length > 0 &&
      isCompanyCampaignNews !== undefined &&
      !isCompanyCampaignNews &&
      isInvestorCampaignNews !== undefined &&
      !isInvestorCampaignNews &&
      mounted
    ) {
      _toBeLoadedNewsIds.forEach((e) => {
        if (loadedIds.indexOf(e) < 0) {
          GetNewsDetails(e).then((res) => {
            newsDetailsArray.push(res);
            const noDuplicateArr = [
              ...new Map(newsDetailsArray.map((o) => [o.newsid, o])).values(),
            ];
            setNewsDetailsArray(
              noDuplicateArr
                .map((item) => item)
                .sort(
                  (a, b) =>
                    newsIds.indexOf(a.newsid) - newsIds.indexOf(b.newsid)
                )
            );
            loadedIds.push(e);
            setLoadedIds(loadedIds);
          });
          loadedIds.push(e);
        }
      });

      const lastIndex = _toBeLoadedNewsIds[_toBeLoadedNewsIds.length - 1];
      const target = document.getElementById(lastIndex);

      if (target) {
        function handleIntersection(entries) {
          entries.map((entry) => {
            if (entry.isIntersecting) {
              if (startIndex >= 0 && startIndex < newsIds.length) {
                setStartIndex(startIndex + pageSize);
              }
            }
            return null;
          });
        }
        const observer = new IntersectionObserver(handleIntersection);
        observer.observe(target);
      }
    }

    return function cleanup() {
      mounted = false;
      abortController.abort();
    };
  }, [
    startIndex,
    _toBeLoadedNewsIds,
    loadedIds,
    newsDetailsArray,
    newsIds,
    history,
    setLoadedIds,
  ]);

  const newsDetailsItems = newsDetailsArray.map((item, i) => {
    if (Object.keys(item).length !== 0) {
      return (
        <NewNewsIndividualComponent
          key={`inx${i + 1}`}
          index={i}
          match={match}
          staticPathConst={staticPathConst}
          location={location}
          newsid={item.newsid}
          itemDetails={item}
          productId={productId}
          setArticleMode={setArticleMode}
          setArticleID={setArticleID}
          setNewsDetailsLocation={setNewsDetailsLocation}
          newsDetailsLocation={newsDetailsLocation}
          handleModalClickEvent={handleModalClickEvent || false}
          isVunReport={isVunReport}
          isCompanyCampaignNews={isCompanyCampaignNews}
          isInvestorCampaignNews={isInvestorCampaignNews}
        />
      );
    }
  });

  if (!articleMode) {
    return (
      <ErrorBoundary>
        <div className='newsblock '>
          <div ref={multiNewsComponent}>
            {(topIndex === null || topIndex > 0) && startIndex > 0 && (
              <div className='text-end'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm m-1 btnLoadPrevious'
                  onClick={() => {
                    history.push(PathsConstant.NEWSMENU);
                  }}
                >
                  Load Latest
                </button>

                <button
                  type='button'
                  className='btn btn-primary btn-sm m-1 btnLoadPrevious'
                  onClick={loadPrevious}
                >
                  Load Previous
                </button>
              </div>
            )}
            {newsDetailsItems}
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (articleMode) {
    return (
      <div>
        <NewsArticleComponent
          loadedIds={loadedIds}
          match={match}
          staticPathConst={staticPathConst}
          location={location}
          history={history}
          setLoadedIds={setLoadedIds}
          newsid={articleID}
          newsDetailsLocation={newsDetailsLocation}
          setNewsDetailsLocation={setNewsDetailsLocation}
          newsIds={newsIds}
          newsDetailsArray={newsDetailsArray}
          productId={productId}
          setArticleMode={setArticleMode}
          setArticleID={setArticleID}
          setNewsDetailsArray={setNewsDetailsArray}
          selectedSidebarNews={selectedSidebarNews}
          handleSelectSidebarNews={handleSelectSidebarNews}
          isClickMostRead={isClickMostRead}
          setIsClickMostRead={setIsClickMostRead}
          isMostReadorNot={isMostReadorNot}
          setIsMostReadorNot={setIsMostReadorNot}
          isVunReport={isVunReport}
        />
      </div>
    );
  }
};

MultiNewsComponent.propTypes = {
  newsIds: PropTypes.arrayOf(PropTypes.number),
  isCompanyCampaignNews: PropTypes.bool,
  isInvestorCampaignNews: PropTypes.bool,
};
MultiNewsComponent.defaultProps = {
  isCompanyCampaignNews: false,
  isInvestorCampaignNews: false,
};

export default withRouter(React.memo(MultiNewsComponent));
