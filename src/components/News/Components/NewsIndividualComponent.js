import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import {
  ListForViewNewsTimelineTop5,
  GetNewsMoreInformationLinks,
  AddNewsVisitorLog,
  DummyActivismTimeline
} from '../../../utils/news-util';
import { AllowActivismTimelines } from '../../../utils/general-util';
import pathConst, { NEWS_IMAGE_PATH, QUERY_INVESTOR, QUERY_PID } from '../../../constants/PathsConstant';
import LinkShare from '../../GeneralForm/LinkShare';
import product from '../../../constants/ProductConstants';
import NewsTabConstant from '../../../constants/NewsTagConstant';
// let alreadyScrolled = false;
let lastScrollNews;
const NewsIndividualComponent = ({ itemDetails, match, productId }) => {
  const newsRef = useRef(null);
  const newsDetails = itemDetails;
  const [isOpened, setIsOpened] = useState(false);
  // const [isShowShareIcons, setIsShowShareIcons] = useState(false);
  const [lstNewsTimelineTop5, setLstNewsTimelineTop5] = useState([]);
  const [lstNewsCompanyLinks, setLstNewsCompanyLinks] = useState([]);
  const [isValidUser, setIsValidUser] = useState(false);
  const [isVisited, setIsVisited] = useState(newsDetails.visited);

  function toggle() {
    if (newsDetails.readOnly) {
      return null;
    }
    setIsOpened((wasOpened) => !wasOpened);
    if (isOpened === false) {
      if (productId !== undefined && (product.ACTIVISM || product.ACTIVIST_VULNERABILITY)) {
        AllowActivismTimelines(productId)
          .then((isValidUser) => {
            setIsValidUser(isValidUser);
            if (isValidUser) {
              setActivismTimelines();
            } else {
              DummyActivismTimeline(newsDetails.newsid)
                .then((res) => {
                  setLstNewsTimelineTop5(res);
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      } else {
        setIsValidUser(true);
        setActivismTimelines();
      }

      ListForViewNewsTimelineTop5(newsDetails.newsid)
        .then((res) => {
          setLstNewsTimelineTop5(res);
        })
        .catch((e) => console.log(e));

      GetNewsMoreInformationLinks(newsDetails.newsid)
        .then((res) => {
          setLstNewsCompanyLinks(res);
        })
        .catch((e) => console.log(e));

      AddNewsVisitorLog(window.location.pathname, '1', newsDetails.newsid);
      setIsVisited(true);
    }
  }

  const setActivismTimelines = () => {
    ListForViewNewsTimelineTop5(newsDetails.newsid)
      .then((res) => {
        setLstNewsTimelineTop5(res);
      })
      .catch((e) => console.log(e));
  };

  const callback = useCallback(() => {
    if (query.newsID && query.newsID === newsDetails.newsid.toString()) {
      const newsinfoDiv = document.getElementById(newsDetails.newsid);
      if (newsinfoDiv !== null) {
        // if (!alreadyScrolled) {
        //   alreadyScrolled = true;
        if (lastScrollNews !== newsDetails.newsid) {
          lastScrollNews = newsDetails.newsid;

          setTimeout(() => {
            document
              .getElementById(newsDetails.newsid)
              .scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }, 1000);
        }
        // }
        setIsOpened(true);
      }
    } else {
      setIsOpened(false);
    }
  }, [query.newsID, newsDetails.newsid]);

  useEffect(() => {
    callback();
  }, [callback]);

  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTabConstant.NEWS_DEFAULT_IMG_PATH;
  };

  return (
    <>
      <div ref={newsRef}>
        <div href1={`#${newsDetails.newsid}`} id={newsDetails.newsid} />
        {isOpened ? (
          <div className={'row newsMain fadeInAnimation mostReadTitle'}>
            <div className='expandBlock'>
              <div className='row bottomSaprator'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <img
                    onError={addDefaultSrc}
                    src={`${NEWS_IMAGE_PATH}${newsDetails.img}`}
                    className='rounded mx-auto d-block'
                    alt='newslogo'
                  />
                  <LinkShare
                    newsid={newsDetails.newsid}
                    mailSubject={newsDetails.headLine}
                    mailBody={newsDetails.shortArticle}
                  />
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9 newsExpandHeadline'>
                  <div className='titleAlignment'>
                    <div>
                      <p>
                        <b dangerouslySetInnerHTML={{ __html: newsDetails.headLine }} />
                      </p>
                    </div>
                    <div>
                      {' '}
                      <button type='button' className='btn btn-primary float-end btn-sm' onClick={toggle}>
                        Back
                      </button>
                    </div>
                  </div>
                  <div className='d-block d-sm-none mobileDate text-primary'>{newsDetails.newsDate}</div>
                </div>
              </div>
              <div className='row bottomSaprator'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 d-none d-sm-block'>
                  <p>{newsDetails.newsDate}</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9 titleBlock text-primary'>
                  {newsDetails.activism_type && <b>Job cuts -{newsDetails.activism_type}</b>}
                </div>
              </div>
              <div className='col-12'>
                <i className={newsDetails.readOnly ? 'readOnly' : ''} />
                <p className='pt-1' dangerouslySetInnerHTML={{ __html: newsDetails.article }} />
              </div>
              <div className='col-12'>
                {lstNewsCompanyLinks.length > 0 && (
                  <div className='card mt-2 cardInformation'>
                    <div className='card-header'>More Information On</div>
                    <ul className='list-group list-group-flush'>
                      {lstNewsCompanyLinks.map((e, i) => (
                        <li key={i} className='list-group-item'>
                          <a
                            href={
                              e.link_type === 'company'
                                ? `${pathConst.COMPANY_OVERVIEW}${QUERY_PID}${e.id}`
                                : `${pathConst.INVESTOR_OVERVIEW}${QUERY_INVESTOR}${e.id}`
                            }
                            className='text-decoration-none'
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
                            className='btn btn-primary btn-sm float-end me-2'
                            tabIndex='-1'
                            role='button'
                            aria-disabled='false'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            More News
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lstNewsTimelineTop5.length > 0 && (
                  <div className='card mt-2 cardTimeLines'>
                    <div className='card-header'>
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
                        <li
                          key={i}
                          className={
                            isValidUser ? 'list-group-item text-primary' : 'list-group-item text-primary blurrytext'
                          }
                        >
                          <b>{e.summary_date}</b> {e.Timeline}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={isVisited ? 'row newsMain fadeInAnimation newsVisited' : 'row newsMain fadeInAnimation'}
            onClick={toggle}
          >
            <div className='col-5 col-md-2 p-0'>
              <img
                onError={addDefaultSrc}
                src={`${NEWS_IMAGE_PATH}${encodeURI(newsDetails.img)}`}
                className='rounded mx-auto d-block'
                alt='newslogo'
              />
            </div>
            <div className='col-7 col-md-3 titleBlock'>
              <p>
                <b dangerouslySetInnerHTML={{ __html: newsDetails.headLine }} />
              </p>
              <p>{newsDetails.newsDate}</p>
            </div>
            <div className='col-12 col-md-7'>
              <i className={newsDetails.readOnly ? 'readOnly' : ''} />
              <p className='d-none d-md-block' dangerouslySetInnerHTML={{ __html: newsDetails.shortArticle }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

NewsIndividualComponent.propTypes = {
  itemDetails: PropTypes.object,
  match: PropTypes.object,
  productId: PropTypes.number
};

NewsIndividualComponent.defaultProps = {
  itemDetails: {},
  match: {},
  productId: 0
};

export default withRouter(React.memo(NewsIndividualComponent));
