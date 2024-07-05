import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getInboxAlertDetails } from '../../../utils/myAlerts-util';
import { dateToNull } from '../../../utils/general-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InboxItems = ({ setIsHide, getElementDetailReq, updateAlertStatusReq, item, indexx, handleResetelementDetail }) => {
  const [isVisited, setIsVisites] = useState(false);
  const [newsDetails, setNewsDetails] = useState(undefined);

  useEffect(() => {
    (async () => {
      const reqs = {
        alert_option_id: item.alert_option_id,
        alert_inbox_id: item.alert_inbox_id,
        element_type_id: item.element_type_id,
        alert_read: item.alert_read,
      };
      await getInboxAlertDetails(reqs).then((res) => {
        setNewsDetails(res.data);
      });
      setIsVisites(item.alert_read);
    })();
  }, [item, indexx]);

  const toggle = async (element_type_id, alert_inbox_id, alert_data) => {
    const data = {
      element_type_id: element_type_id,
      alert_inbox_id: alert_inbox_id,
      alert_data: alert_data,
    };
    await handleResetelementDetail();
    await getElementDetailReq(data);
    await updateAlertStatusReq(newsDetails.alert_inbox_id);
    setIsVisites(true);
    setIsHide(true);
  };
  return (
    <ErrorBoundary>
      {newsDetails !== undefined &&
        newsDetails.map((item) => (
          <div>
            <div
              className={
                isVisited
                  ? 'row itemAlert fadeInAnimation  cursor-pointer'
                  : 'row itemAlert alertVisited fadeInAnimation  cursor-pointer'
              }
              onClick={() => {
                toggle(item.element_type_id, item.alert_inbox_id, item);
              }}
            >
              <div className='col-12 col-md-12 col-sm-12'>
                <div className='row'>
                  <div className='col-6 col-md-6'>
                    <p className='text-secondary' />
                  </div>
                  <div className='col-9 col-md-9'>
                    <p className='text-secondary'>{dateToNull(item.sent_date, 'dd-mmm-yyyy', true)}</p>
                  </div>
                  <div className='col-3 col-md-3 col-sm-3'>
                    <p className='text-secondary date'>{item.module_name}</p>
                  </div>
                  <div className='col-12 col-md-12'>
                    <span aria-hidden='true' className='titleBlock cursor-pointer'>
                      <b>{item.alert_type !== undefined ? item.alert_type : item.Alert_type}</b>
                    </span>
                  </div>
                  {item.news_headline !== null && item.news_headline !== undefined && (
                    <div className='col-12 col-md-12 col-sm-12'>
                      <p className='d-md-block'>Headline : {item.news_headline}</p>
                    </div>
                  )}
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />
                    {item.filing_type !== null && item.filing_type !== undefined && <p>Type: {item.filing_type}</p>}
                  </div>
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />
                    {item.Company_name !== null && item.Company_name !== undefined && (
                      <p>Company: {item.Company_name}</p>
                    )}
                  </div>
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />

                    {item.investor_name !== null &&
                      item.investor_name !== undefined &&
                      item.element_type_id !== undefined &&
                      item.element_type_id === 41 && <p>Short seller: {item.investor_name}</p>}
                    {item.investor_name !== null &&
                      item.investor_name !== undefined &&
                      (item.element_type_id === undefined || item.element_type_id !== 41) && (
                        <p>Investor: {item.investor_name}</p>
                      )}
                  </div>
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />
                    {item.meeting_date !== null && item.meeting_date !== undefined && (
                      <p>Meeting Date: {dateToNull(item.meeting_date, 'dd-mmm-yyyy', true)}</p>
                    )}
                  </div>
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />
                    {item.alert_name !== null && item.alert_name !== undefined ? (
                      item.element_type_id === 151 ||
                      item.element_type_id === 152 ||
                      item.element_type_id === 161 ||
                      item.element_type_id === 162 ||
                      item.element_type_id === 171 ||
                      item.element_type_id === 172 ||
                      item.element_type_id === 173 ||
                      item.element_type_id === 61 ||
                      item.element_type_id === 62 ||
                      item.element_type_id === 51 ||
                      item.element_type_id === 181 ? (
                        <p>Alert Name: {item.alert_name}</p>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='col-12 col-md-12 col-sm-12'>
                    <i className='readOnly' />
                    {item.investor_profile_name !== null && item.investor_profile_name !== undefined && (
                      <p>Investor Profile Name: {item.investor_profile_name}</p>
                    )}
                  </div>

                  <div className='col-12 col-md-12 cursor-pointer'>
                    <p aria-hidden='true' className='text-primary text-secondary'>
                      Read more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </ErrorBoundary>
  );
};

InboxItems.propTypes = {};

InboxItems.defaultProps = {};

export default React.memo(withRouter(InboxItems));
