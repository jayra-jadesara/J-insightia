import React, { useEffect, useState, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import axios from 'axios';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';
import GetCompanyOrInvestorNews from '../../News/Components/GetCompanyOrInvestorNews';
import MostReadComponent from '../../News/Components/MostReadComponent';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';
import bn from '../../../utils/bemnames';
import NewsArticleComponent from '../../News/Components/NewsArticleComponent';
import { GetNewsDetails } from '../../../utils/news-util';
import propTypes from '../../../utils/propTypes';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('newsNew');

const InvestorNews = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [articleMode, setArticleMode] = useState(false);
  const [staticPathConsts] = useState(`${props.location.pathname}${props.location.search}`);
  const [isOpenedOn, setIsOpenedOn] = useState(true);
  const [newsDetailsArray, setNewsDetailsArray] = useState([]);
  const [loadedIds, setLoadedIds] = useState([]);
  const [articleID, setArticleID] = useState(0);
  const [newsDetailsLocation, setNewsDetailsLocation] = useState(null);
  const [openOnLoad, setOpenOnLoad] = useState(true);
  const [article404, setArticle404] = useState(true);
  const [newsIds, setNewsIds] = useState([]);
  const [isClickMostRead, setIsClickMostRead] = useState(false);
  const [isMostReadorNot, setIsMostReadorNot] = useState(false);
  let source = null;
  const getAll = useCallback(
    async (newsID) => {
      setNewsDetailsArray([await GetNewsDetails(newsID)]);
      setLoadedIds([Number(query.newsID)]);
      setArticleID(Number(query.newsID));
      setNewsIds([newsID]);
      setNewsDetailsLocation(0);
    },
    [setNewsDetailsArray, setLoadedIds, setArticleID, setNewsDetailsLocation]
  );
  const getAll2 = useCallback(async () => {
    const obj = await GetNewsDetails(query.newsID);
    setNewsDetailsArray([obj]);
    setLoadedIds([Number(query.newsID)]);
    setArticleID(Number(query.newsID));
    setNewsIds([query.newsID]);
  }, [setNewsDetailsArray, setLoadedIds, setArticleID, setNewsDetailsLocation, query.newsID]);
  // (Most Read News) Read more button clicked
  useEffect(() => {
    source = axios.CancelToken.source();
    const abortController = new AbortController();
    if (query.newsID !== undefined && isClickMostRead && newsDetailsArray.length !== 0) {
      getAll2();
    }
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [isClickMostRead, getAll]);
  useEffect(() => {
    source = axios.CancelToken.source();
    const abortController = new AbortController();
    if (query.newsID !== undefined && isOpenedOn && newsDetailsArray.length === numConst.EMPTY_TABLE_LENGTH) {
      getAll(query.newsID);
    }
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [query.newsID, getAll, isOpenedOn, newsDetailsArray.length]);

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  React.useEffect(() => {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, [3000]);
  }, []);

  return (
    <Page className='pt-3'>
      <div className={bem.b('row')}>
        <div className='col-xs-12 col-sm-12 col-lg-9 col-xl-9 p-0 position-reliatve' id='loadItem'>
          {query.newsID !== undefined && isOpenedOn ? (
            <ErrorBoundary>
              <NewsArticleComponent
                articleMode={articleMode}
                setArticleMode={setArticleMode}
                setIsOpenedOn={setIsOpenedOn}
                isOpenedOn={isOpenedOn}
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
                match={props.match}
                staticPathConst={props.staticPathConst}
                location={props.location}
                history={props.history}
                newsid={query.newsID}
                newsIds={newsIds}
                setNewsIds={setNewsIds}
                productId={props.productId}
                selectedSidebarNews={null}
                handleSelectSidebarNews={() => {}}
                isClickMostRead={isClickMostRead}
                setIsClickMostRead={setIsClickMostRead}
                isMostReadorNot={isMostReadorNot}
                setIsMostReadorNot={setIsMostReadorNot}
              />
            </ErrorBoundary>
          ) : (
            <ErrorBoundary>
              <GetCompanyOrInvestorNews
                newsIds={newsIds}
                setNewsIds={setNewsIds}
                staticPathConst={staticPathConsts}
                articleMode={articleMode}
                setArticleMode={setArticleMode}
                setIsOpenedOn={setIsOpenedOn}
                newsDetailsArray={query.print ? newsDetailsArray.slice(0, 20) : newsDetailsArray}
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
                location={props.location}
                handleSelectSidebarNews={props.handleSelectSidebarNews}
                selectedSidebarNews={props.selectedSidebarNews}
                isClickMostRead={isClickMostRead}
                setIsClickMostRead={setIsClickMostRead}
                isMostReadorNot={isMostReadorNot}
                setIsMostReadorNot={setIsMostReadorNot}
              />
            </ErrorBoundary>
          )}
        </div>
        {!query.print && (
          <div className='col-xs-12 col-sm-12 col-lg-3 col-xl-3'>
            <MostReadComponent
              handleSelectSidebarNews={props.handleSelectSidebarNews}
              selectedSidebarNews={props.selectedSidebarNews}
              articleMode={articleMode}
              isMostReadorNot={isMostReadorNot}
              isClickMostRead={isClickMostRead}
              setIsClickMostRead={setIsClickMostRead}
              location={props.location}
            />
          </div>
        )}

        <ScrollToTopBtn />
      </div>
    </Page>
  );
};

InvestorNews.propTypes = {
  location: propTypes.object
};
InvestorNews.defaultProps = {
  location: {}
};

export default withRouter(React.memo(InvestorNews));
