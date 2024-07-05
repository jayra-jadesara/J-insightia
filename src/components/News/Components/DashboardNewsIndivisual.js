import React from 'react';
import { withRouter } from 'react-router-dom';
import pathConst, { NEWS_IMAGE_PATH, QUERY_NEWS } from '../../../constants/PathsConstant';
import NewsTagConstant from '../../../constants/NewsTagConstant';
import { history } from '../../../utils/navigation-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const DashboardNewsIndivisual = ({ itemDetails }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTagConstant.NEWS_DEFAULT_IMG_PATH;
  };

  return (
    <ErrorBoundary>
      <div
        className={
          itemDetails.visited
            ? 'row fadeInAnimation newsMain mostVisitBlockPortals dashboardNewsWidget'
            : 'row fadeInAnimation newsMain mostVisitBlockPortals dashboardNewsWidget'
        }
        style={{ margin: 'auto' }}
      >
        <div className='col-4'>
          <img
            onError={addDefaultSrc}
            src={`${NEWS_IMAGE_PATH}${itemDetails.img}`}
            className='rounded m-auto d-block'
            alt='newslogo'
          />
        </div>

        <div className='col-8 titleBlock newsBlockSection'>
          <p className='titleBlockModule'>{itemDetails.module}</p>
          <p className='titleBlockTitle text-primary' style={{ fontWeight: '500' }}>
            <b dangerouslySetInnerHTML={{ __html: itemDetails.headLine }} />
          </p>
          <p className='titleBlockDate'>{itemDetails.newsDate}</p>
          <p className='row mostReadShortArticle' dangerouslySetInnerHTML={{ __html: itemDetails.shortArticle }} />
        </div>

        <div className='row readmoreBlock p-0 m-0'>
          <div className='col-4' />
          <div className='col-8 readMore'>
            <span
              href={`${pathConst.NEWS_OVERVIEW}${QUERY_NEWS}${itemDetails.newsid}`}
              activeclassname='active'
              onClick={(e) => {
                e.preventDefault();
                history.push(`${pathConst.NEWS_OVERVIEW}${QUERY_NEWS}${itemDetails.newsid}`);
              }}
            >
              Read More
            </span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

DashboardNewsIndivisual.propTypes = {};

DashboardNewsIndivisual.defaultProps = {};

export default withRouter(React.memo(DashboardNewsIndivisual));
