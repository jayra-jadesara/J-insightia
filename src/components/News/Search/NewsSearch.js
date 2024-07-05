import React, { useState, useEffect } from 'react';
import qs from 'qs';
import Page from '../../Page';
import NewsFilter from './NewsFilter';
import MultiNewsComponent from '../Components/MultiNewsComponent';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';
import bn from '../../../utils/bemnames';
import PathsConstant from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';
import numConst from '../../../constants/NumberConstants';
import { history } from '../../../utils/navigation-util';

const bem = bn.create('newsNew');

const NewsSearch = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [articleMode, setArticleMode] = useState(false);
  const [isOpenedOn, setIsOpenedOn] = useState(true);
  const [newsDetailsArray, setNewsDetailsArray] = useState([]);
  const [loadedIds, setLoadedIds] = useState([]);
  const [articleID, setArticleID] = useState(0);
  const [newsDetailsLocation, setNewsDetailsLocation] = useState(null);
  const [openOnLoad, setOpenOnLoad] = useState(true);
  const [article404, setArticle404] = useState(true);
  const [newsIds, setNewsIds] = useState([]);
  const [isOpenTab, setIsOpenTab] = useState(true);

  const newsFilterReq = async (txt) => {
    setIsLoading(true);
    setIsSearched(true);
    setNewsDetailsArray([]);
    setLoadedIds([]);
    await props.handleResetNewsSelection();
    const data = {
      CompanySearchId: txt === null ? props.filterByCompanySelection : null,
      InvestorSearchId: txt === null ? props.filterByInvestorSelection : null,
      ActivistObjectiveGroupId: props.filterActiveObjectiveGroupSelection,
      ActivistObjectiveTypeId: props.filterActiveObjectiveTypeSelection,
      Stakeholding: props.filterStackHolding,
      Event: props.filterEvent,
      Freesearch: txt === null ? props.filterFreeSearch : txt,
      periodStart: props.filterPeriodStart,
      periodEnd: props.filterPeriodEnd,
      product_id: props.filterProduct,
    };
    await props.NewsFilterReq(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      query.newsID !== undefined &&
      isOpenedOn &&
      newsDetailsArray.length === numConst.EMPTY_TABLE_LENGTH
    ) {
      // getAll();
    }
    if (props.newsSearchResult) {
      setNewsIds(props.newsSearchResult.map((c) => c.news_id));
    }
  }, [
    query.newsID,
    isOpenedOn,
    props.newsSearchResult,
    newsDetailsArray.length,
  ]);
  async function handleSearchBtn() {
    await setIsOpenTab(true);
    if (query.pid !== undefined || query.investor !== undefined) {
      window.history.back();
    } else {
      history.push(location.pathname);
    }
    if (setIsOpenedOn) {
      await setIsOpenedOn(false);
      await setArticleID(0);
    }
    await setArticleMode(false);
    await setIsOpenTab(false);
  }
  return (
    <Page>
      <NewsFilter
        {...props}
        newsFilterReq={newsFilterReq}
        isOpenTab={isOpenTab}
        handleSearchBtn={handleSearchBtn}
      />
      <div className={bem.b('row')}>
        <div className='col-xs-12 col-sm-12 col-lg-12 p-0 position-relative'>
          {isLoading ? (
            <span>{msgConst.LOADING}</span>
          ) : props.newsSearchResult.length > 0 ? (
            <MultiNewsComponent
              newsIds={newsIds}
              setNewsIds={setNewsIds}
              selectedSidebarNews={props.selectedSidebarNews}
              staticPathConst={PathsConstant.NEWS_SEARCH}
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
            />
          ) : (
            isSearched && 'No Search Results Found'
          )}
        </div>
        {props.newsSearchResult.length > 0 && <ScrollToTopBtn />}
      </div>
    </Page>
  );
};

export default React.memo(NewsSearch);
