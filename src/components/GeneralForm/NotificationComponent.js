import React, { useState } from 'react';
import { history } from '../../utils/navigation-util';
import { MY_ALERT_INBOX } from '../../constants/PathsConstant';
import { dateToNull } from '../../utils/general-util';
import ErrorBoundary from './ErrorBoundary';

const NotificationComponent = ({
  updateAlertStatusReq,
  notificationDetail,
  getElementDetailReq,
  toggleAlertNotificationPopover,
  isOpenAlertNotification,
  getInboxAlertByUserReq
}) => {
  const [isAlertReaded, setIsAlertReaded] = useState(null);
  return (
    <ErrorBoundary>
      {notificationDetail !== undefined ? (
        <>
          {notificationDetail.notification_type === 1 ? (
            <div
              className={notificationDetail.alert_read ? ' notification-alert ReadedAlert' : 'notification-alert'}
              onClick={async () => {
                await updateAlertStatusReq(notificationDetail.alert_inbox_id);
                const data = {
                  element_type_id: notificationDetail.element_type_id,
                  alert_inbox_id: notificationDetail.alert_inbox_id,
                  alert_data: notificationDetail
                };
                await getElementDetailReq(data);
                setIsAlertReaded(!notificationDetail.alert_read);

                await getInboxAlertByUserReq({
                  alert_id: notificationDetail.alert_id,
                  alert_inbox_id: notificationDetail.alert_inbox_id
                });
                toggleAlertNotificationPopover({
                  isOpenAlertNotification: !isOpenAlertNotification
                });
                history.push(MY_ALERT_INBOX);
              }}
            >
              <div className='col-12 contents'>
                <div className='col-12 notification-title-alert'>
                  <p className='notification-info-alert m-0'>
                    <span>
                      {notificationDetail.alert_option_id === 1 ||
                      notificationDetail.alert_option_id === 3 ||
                      notificationDetail.alert_option_id === 14 ||
                      notificationDetail.alert_option_id === 19 ? (
                        <>
                          <b>{notificationDetail.type.toUpperCase()} :</b>
                          {notificationDetail.info}
                        </>
                      ) : (
                        <b> {notificationDetail.type.toUpperCase()} </b>
                      )}
                    </span>

                    <span>
                      {notificationDetail.filing_type !== null && notificationDetail.filing_type !== undefined && (
                        <>
                          <b>Type:</b> {notificationDetail.filing_type}
                        </>
                      )}
                    </span>
                    <span>
                      {notificationDetail.Company_name !== null && notificationDetail.Company_name !== undefined && (
                        <>
                          <b>Company: </b> {notificationDetail.Company_name}
                        </>
                      )}
                    </span>
                    <span>
                      {notificationDetail.investor_name !== null &&
                        notificationDetail.investor_name !== undefined &&
                        notificationDetail.element_type_id !== undefined &&
                        notificationDetail.element_type_id === 41 && (
                          <>
                            <b>Short seller:</b>
                            {notificationDetail.investor_name}
                          </>
                        )}
                      {notificationDetail.investor_name !== null &&
                        notificationDetail.investor_name !== undefined &&
                        (notificationDetail.element_type_id === undefined ||
                          notificationDetail.element_type_id !== 41) && (
                          <>
                            <b>Investor:</b> {notificationDetail.investor_name}
                          </>
                        )}
                    </span>
                    <span>
                      {notificationDetail.meeting_date !== null && notificationDetail.meeting_date !== undefined && (
                        <p>
                          <b>Meeting Date:</b>
                          {dateToNull(notificationDetail.meeting_date, 'dd-mmm-yyyy', true)}
                        </p>
                      )}
                    </span>
                    <span>
                      {notificationDetail.alert_name !== null && notificationDetail.alert_name !== undefined ? (
                        notificationDetail.element_type_id === 151 ||
                        notificationDetail.element_type_id === 152 ||
                        notificationDetail.element_type_id === 161 ||
                        notificationDetail.element_type_id === 162 ||
                        notificationDetail.element_type_id === 171 ||
                        notificationDetail.element_type_id === 172 ||
                        notificationDetail.element_type_id === 173 ||
                        notificationDetail.element_type_id === 61 ||
                        notificationDetail.element_type_id === 62 ||
                        notificationDetail.element_type_id === 51 ? (
                          <>
                            <b>Alert Name:</b> {notificationDetail.alert_name}
                          </>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </span>
                    <span>
                      {notificationDetail.investor_profile_name !== null &&
                        notificationDetail.investor_profile_name !== undefined && (
                          <>
                            <b>Investor Profile Name: </b>
                            {notificationDetail.investor_profile_name}
                          </>
                        )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            notificationDetail.notification_type === 2 && (
              <div
                className='notification-alert'
                onClick={async () => {
                  window.open(
                    `${window.location.origin}/${notificationDetail.pdf_path}/${notificationDetail.pdf_title}`
                  );
                }}
              >
                <div className='col-12 contents'>
                  <div className='col-12 notification-title-alert'>
                    <p className='notification-info-alert m-0'>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='14'
                          height='14'
                          fill='#1eb8ec'
                          className='bi bi-file-earmark-pdf'
                          viewBox='0 0 16 16'
                        >
                          <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z' />
                          <path d='M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z' />
                        </svg>
                        <b>PDF Ready :</b> {notificationDetail.pdf_title}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

NotificationComponent.propTypes = {};

NotificationComponent.defaultProps = {
  type: 'News',
  info: "Lorem ipsum is simply dummy text of the printing and typesettingindustry. Lorem Ipsum has beenthe industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and morerecently with desktop publishing software likeAldus PageMaker including versions of Lorem Ipsum "
};
export default React.memo(NotificationComponent);
