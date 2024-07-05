import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InboxItems = React.lazy(() => import('./InboxItems'));

const MultipleAlerts = ({
  setIsHide,
  getElementDetailReq,
  updateAlertStatusReq,
  lstAlertElementId,
  handleResetState,
  handleResetelementDetail
}) => {
  const multipleAlerts = useRef(null);
  const [index, setIndex] = useState(0);

  let lstAlertElementIds = null;
  if (lstAlertElementId !== undefined) {
    if (lstAlertElementId.length > 0) {
      lstAlertElementIds = lstAlertElementId[index].map((x, i) => (
        <InboxItems
          index={i}
          getElementDetailReq={getElementDetailReq}
          setIsHide={setIsHide}
          updateAlertStatusReq={updateAlertStatusReq}
          indexx={index}
          item={x}
          handleResetState={handleResetState}
          handleResetelementDetail={handleResetelementDetail}
        />
      ));
    } else {
      lstAlertElementIds = 'Records Not found';
    }
  } else {
    lstAlertElementIds = 'Loading..';
  }

  const handlePagingNext = async () => {
    await handleResetState();
    setIndex(index + 1);
    window.scrollTo(0, 0);
    const div = document.querySelector('#divWithScroll');
    div.scrollTo(0, 0);
  };
  const handlePagingPrevious = async () => {
    await handleResetState();
    setIndex(index - 1);
    window.scrollTo(0, 0);
    const div = document.querySelector('#divWithScroll');
    div.scrollTo(0, 0);
  };
  return (
    <ErrorBoundary>
      <div ref={multipleAlerts}>

            <div
              className={lstAlertElementId !== undefined && lstAlertElementId.length > 0 && 'ScrollStyle'}
              id='divWithScroll'
            >
              {lstAlertElementIds}
            </div>
            {lstAlertElementId !== undefined && lstAlertElementId.length > 0 ? (
            <div className='row itemAlert fadeInAnimation alertVisited mt-1'>
              <div className='col-6 col-md-6'>
                {index > 0 ? (
                  <a className=' float-start' onClick={handlePagingPrevious}>
                    Previous
                  </a>
                ) : (
                  ''
                )}
              </div>
              <div className='col-6 col-md-6 '>
                {index !== lstAlertElementId.length - 1 ? (
                  <a className='float-end' onClick={handlePagingNext}>
                    Next
                  </a>
                ) : (
                  ''
                )}
              </div>
            </div>
        ) : (
          ''
        )}
      </div>
    </ErrorBoundary>
  );
};

MultipleAlerts.propTypes = {};

MultipleAlerts.defaultProps = {};

export default React.memo(withRouter(MultipleAlerts));
