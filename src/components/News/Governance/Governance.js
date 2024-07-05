import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import MultiNewsComponent from '../Components/MultiNewsComponent';
import MostReadComponent from '../Components/MostReadComponent';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';
import Page from '../../Page';
import bn from '../../../utils/bemnames';
import PathsConstant from '../../../constants/PathsConstant';
import { GetNewsDetails } from '../../../utils/news-util';
import NewsArticleComponent from '../Components/NewsArticleComponent';
import numConst from '../../../constants/NumberConstants';

const bem = bn.create('newsNew');

const Governance = (props) => {
  const [articleMode, setArticleMode] = useState(false);
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

  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const getAll = useCallback(async () => {
    setNewsDetailsArray([await GetNewsDetails(query.newsID)]);
    setLoadedIds([Number(query.newsID)]);
    setArticleID(Number(query.newsID));
    setNewsIds([query.newsID]);
    setNewsDetailsLocation(0);
  }, [setNewsDetailsArray, setLoadedIds, setArticleID, setNewsDetailsLocation, query.newsID]);

  const getAll2 = useCallback(async () => {
    const obj = await GetNewsDetails(query.newsID);
    setNewsDetailsArray([obj]);
    setLoadedIds([Number(query.newsID)]);
    setArticleID(Number(query.newsID));
    setNewsIds([query.newsID]);
  }, [setNewsDetailsArray, setLoadedIds, setArticleID, setNewsDetailsLocation, query.newsID]);
  // (Most Read News) Read more button clicked
  useEffect(() => {
    if (query.newsID !== undefined && isClickMostRead && newsDetailsArray.length !== numConst.NUMBER_ZERO) {
      getAll2();
    }
  }, [isClickMostRead, getAll]);
  // .

  useEffect(() => {
    if (query.newsID !== undefined && isOpenedOn && newsDetailsArray.length === numConst.EMPTY_TABLE_LENGTH) {
      getAll();
    }
    if (props.governanceNews) {
      setNewsIds(props.governanceNews.map((c) => c.news_id));
    }
  }, [query.newsID, getAll, isOpenedOn, props.governanceNews, newsDetailsArray.length]);

  return (
    <Page>
      <div className={bem.b('row')}>
        <div className='col-xs-12 col-sm-12 col-lg-9 col-xl-9 p-0 position-reliatve'>
          {query.newsID !== undefined && isOpenedOn ? (
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
              isClickMostRead={isClickMostRead}
              setIsClickMostRead={setIsClickMostRead}
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
              isMostReadorNot={isMostReadorNot}
              setIsMostReadorNot={setIsMostReadorNot}
            />
          ) : (
            <MultiNewsComponent
              newsIds={newsIds}
              setNewsIds={setNewsIds}
              selectedSidebarNews={props.selectedSidebarNews}
              staticPathConst={PathsConstant.NEWS_GOVERNANCE}
              handleSelectSidebarNews={props.handleSelectSidebarNews}
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
            />
          )}
        </div>
        <div className='col-xs-12 col-sm-12 col-lg-3 col-xl-3'>
          <MostReadComponent
            handleSelectSidebarNews={props.handleSelectSidebarNews}
            selectedSidebarNews={props.selectedSidebarNews}
            articleMode={articleMode}
            isClickMostRead={isClickMostRead}
            setIsClickMostRead={setIsClickMostRead}
            location={props.location}
          />
        </div>
        <ScrollToTopBtn />
      </div>
    </Page>
  );
};

Governance.propTypes = {
  governanceNews: PropTypes.array
};

Governance.defaultProps = {
  governanceNews: []
};

export default withRouter(React.memo(Governance));
