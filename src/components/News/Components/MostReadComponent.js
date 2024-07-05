import React, { useState, useEffect } from 'react';
import { GetAllMostReadNews, GetAllLatestReadNews } from '../../../utils/news-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import MostReadNewsIndivisual from './MostReadNewsIndivisual';

const MostReadComponent = ({
  handleSelectSidebarNews,
  articleMode,
  isClickMostRead,
  setIsClickMostRead,
  isMostReadorNot,
  setIsMostReadorNot,
  location
}) => {
  const [mostReadNews, setMostReadNews] = useState([]);
  const [latestReadNews, setLatestReadNews] = useState([]);

  useEffect(() => {
    let mounted = true;
    GetAllMostReadNews()
      .then((res) => {
        if (res !== undefined && res !== null && res.length && mounted) {
          setMostReadNews((prevNews) => [...new Set([...prevNews, ...res.map((b) => b.news_Id)])]);
        }
      })
      .catch((e) => console.log(e));
      return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;
    GetAllLatestReadNews()
      .then((res) => {
        if (res !== undefined && res !== null && res.length && mounted) {
        setLatestReadNews((prevNews) => [...new Set([...prevNews, ...res.map((b) => b.news_id)])]);
        }
      })
      .catch((e) => console.log(e));
      return () => mounted = false;
  }, []);

  if (articleMode) {
    return (
      <ErrorBoundary>
        {/* <QuickSearch {...props} /> */}
        {latestReadNews.length > 0 && (
          <div className='mostComponentOverall'>
            {' '}
            <div className='mostReadTitle d-flex'>Latest News</div>
            <div className='mostVisitNewsContainer'>
              {latestReadNews.map((e, i) => (
                <div key={`dv${i + 1}`}>
                  <MostReadNewsIndivisual
                    newsid={e}
                    handleSelectSidebarNews={handleSelectSidebarNews}
                    isClickMostRead={isClickMostRead}
                    setIsClickMostRead={setIsClickMostRead}
                    isMostReadorNot={isMostReadorNot}
                    setIsMostReadorNot={setIsMostReadorNot}
                    location={location}
                  />
                </div>
              ))}
            </div>{' '}
          </div>
        )}
      </ErrorBoundary>
    );
  }

  if (!articleMode) {
    return (
      <>
        {/* <QuickSearch {...props} /> */}
        {mostReadNews.length > 0 && (
          <div className='mostComponentOverall'>
            {' '}
            <div className='mostReadTitle'>Most Read</div>
            <div className='mostVisitNewsContainer'>
              {mostReadNews.map((e, i) => (
                <div key={`map${i + 1}`}>
                  <ErrorBoundary>
                    <MostReadNewsIndivisual
                      newsid={e}
                      handleSelectSidebarNews={handleSelectSidebarNews}
                      isClickMostRead={isClickMostRead}
                      setIsClickMostRead={setIsClickMostRead}
                      isMostReadorNot={isMostReadorNot}
                      setIsMostReadorNot={setIsMostReadorNot}
                      location={location}
                    />
                  </ErrorBoundary>
                </div>
              ))}
            </div>{' '}
          </div>
        )}
      </>
    );
  }
};

export default React.memo(MostReadComponent);
