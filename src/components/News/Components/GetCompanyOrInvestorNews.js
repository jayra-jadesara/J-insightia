import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import qs from 'qs';
import MultiNewsComponent from './MultiNewsComponent';
import { GetCompanyNewsIds, GetInvestorNewsIds } from '../../../utils/news-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const GetCompanyOrInvestorNews = ({
  newsIds,
  setNewsIds,
  staticPathConst,
  articleMode,
  setArticleMode,
  setIsOpenedOn,
  newsDetailsArray,
  setNewsDetailsArray,
  loadedIds,
  setLoadedIds,
  articleID,
  setArticleID,
  newsDetailsLocation,
  setNewsDetailsLocation,
  openOnLoad,
  setOpenOnLoad,
  article404,
  setArticle404,
  location,
  handleSelectSidebarNews,
  selectedSidebarNews,
  isClickMostRead,
  setIsClickMostRead,
  isMostReadorNot,
  setIsMostReadorNot,
  CancelToken
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const fillCompanyNewsIds = useCallback(
    async (ids) => {
      if (ids !== undefined) {
        const results = await GetCompanyNewsIds(ids);
        const resultMap = await results.map((c) => c.news_id);
        await setNewsIds(resultMap);
      }
    },
    [setNewsIds]
  );

  const fillInvestorNewsIds = useCallback(
    async (ids) => {
      if (ids !== undefined) {
        const results = await GetInvestorNewsIds(ids);
        const resultMap = await results.map((c) => c.news_id);
        await setNewsIds(resultMap);
      }
    },
    [setNewsIds]
  );

  useEffect(() => {
    let mounted = true;
    if (query.pid !== undefined && mounted) {
      fillCompanyNewsIds(query.pid);
    }
    const abortController = new AbortController();
    return function cleanup() {
      mounted = false;
      abortController.abort();
    };
  }, [fillCompanyNewsIds, query.pid]);

  useEffect(() => {
    let mounted = true;
    if (query.investor !== undefined && mounted) {
      fillInvestorNewsIds(query.investor);
    }
    const abortController = new AbortController();
    return function cleanup() {
      mounted = false;
      abortController.abort();
    };
  }, [fillInvestorNewsIds, query.investor]);

  return (
    <ErrorBoundary>
      {newsIds && (
        <MultiNewsComponent
          newsIds={newsIds}
          setNewsIds={setNewsIds}
          selectedSidebarNews={selectedSidebarNews}
          staticPathConst={staticPathConst}
          handleSelectSidebarNews={handleSelectSidebarNews}
          articleMode={articleMode}
          setArticleMode={setArticleMode}
          setIsOpenedOn={setIsOpenedOn}
          newsDetailsArray={newsDetailsArray}
          setNewsDetailsArray={setNewsDetailsArray}
          loadedIds={loadedIds}
          setLoadedIds={setLoadedIds}
          articleID={articleID}
          setArticleID={setArticleID}
          newsDetailsLocation={newsDetailsLocation}
          setNewsDetailsLocation={setNewsDetailsLocation}
          openOnLoad={openOnLoad}
          setOpenOnLoad={setOpenOnLoad}
          article404={article404}
          setArticle404={setArticle404}
          isClickMostRead={isClickMostRead}
          setIsClickMostRead={setIsClickMostRead}
          isMostReadorNot={isMostReadorNot}
          setIsMostReadorNot={setIsMostReadorNot}
          CancelToken={CancelToken}
        />
      )}
    </ErrorBoundary>
  );
};

GetCompanyOrInvestorNews.propTypes = {
  investorIds: PropTypes.array,
  pids: PropTypes.array
};

GetCompanyOrInvestorNews.defaultProps = {
  investorIds: [],
  pids: []
};

export default React.memo(GetCompanyOrInvestorNews);
