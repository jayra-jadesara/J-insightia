import React, { useEffect } from 'react';
import { SlideDown } from 'react-slidedown';
import jwt from 'jsonwebtoken';
import { logout } from '../utils/login-util';
import SearchInput from '../components/GeneralForm/SearchInput';
import { history } from '../utils/navigation-util';
import config from '../config/server-config';
import bn from '../utils/bemnames';
import 'react-slidedown/lib/slidedown.css';
import pathConst from '../constants/PathsConstant';
import { QUERY_SELECTOR_SIDEBAR, QUERY_SELECTOR_SIDEBAR_OPEN } from '../constants/ScreenSizeConstant';
import { dateToNull, GetForeignSecurityKey } from '../utils/general-util';
import NotificationComponent from '../components/GeneralForm/NotificationComponent';
import { TRIAL_USER, FULL_USER, LAST_MEMBERSHIP_ITEM } from '../constants/NumberConstants';
import YellowStatusBar from '../components/GeneralForm/YellowStatusBar';
import TypeConstants from '../constants/TrialTypeConstants';
import { ACTIVIST_INSIGHT_MONTHLY, COMPENSATION } from '../constants/ProductConstants';

const bem = bn.create('header');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenUserCardPopover: false,
      isOpenAlertNotification: false,
      isOpenFeedbackPopup: false,
      Membership: [],
      UserEmailName: '',
      UserEmailDomain: '',
      sessionid: '',
      userid: '',
      isRedDotDisplay: true,
      userTrialStatus: '',
      UserEmail: '',
      showProxyIcon: null,
      showActivistIcon: null,
    };
    this.myRef = React.createRef();
    try {
      const decode = jwt.decode(window.localStorage.getItem('token'));
      jwt.verify(window.localStorage.getItem('token'), config.tokenSecrectKey, (err) => {
        if (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('userEmail');
          history.push(pathConst.CREDENTIAL_FORM);
        }
      });

      if (decode.MemberShip.length === undefined) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = pathConst.CREDENTIAL_FORM;
      }
      this.state.Membership = decode.MemberShip;

      this.state.UserEmailName = decode.UserEmail.substring(0, decode.UserEmail.lastIndexOf('@'));
      this.state.UserEmailDomain = decode.UserEmail.substring(decode.UserEmail.lastIndexOf('@'));

      this.state.userid = decode.User_Id;
      this.state.sessionid = decode.Session_Id;
      this.state.userTrialStatus = decode.Status;
      this.state.UserEmail = decode.UserEmail;
      this.state.showProxyIcon = decode.showProxyIcon;
      this.state.showActivistIcon = decode.showActivistIcon;
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      history.push(pathConst.CREDENTIAL_FORM);
    }
  }

  toggleAlertNotificationPopover = () => {
    this.setState({
      isOpenAlertNotification: !this.state.isOpenAlertNotification,
      isOpenUserCardPopover: this.state.isOpenUserCardPopover
        ? !this.state.isOpenUserCardPopover
        : this.state.isOpenUserCardPopover,
      isOpenFeedbackPopup: this.state.isOpenFeedbackPopup
        ? !this.state.isOpenFeedbackPopup
        : this.state.isOpenFeedbackPopup,
    });
    if (this.props.isAnyNotification) {
      localStorage.setItem(
        'alertNotificationData',
        JSON.stringify({ data: this.props.top20AlertData, firstLoad: false })
      );
    }
  };

  toggleChangeRedDot = () => {
    this.setState({
      isRedDotDisplay: false,
    });
  };

  handleSidebarControlButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector(QUERY_SELECTOR_SIDEBAR).classList.toggle(QUERY_SELECTOR_SIDEBAR_OPEN);
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
      isOpenAlertNotification: this.state.isOpenAlertNotification
        ? !this.state.isOpenAlertNotification
        : this.state.isOpenAlertNotification,
      isOpenFeedbackPopup: this.state.isOpenFeedbackPopup
        ? !this.state.isOpenFeedbackPopup
        : this.state.isOpenFeedbackPopup,
    });
  };
  toggleFeedbackPopover = () => {
    this.setState({
      isOpenFeedbackPopup: !this.state.isOpenFeedbackPopup,
      isOpenUserCardPopover: this.state.isOpenUserCardPopover
        ? !this.state.isOpenUserCardPopover
        : this.state.isOpenUserCardPopover,
      isOpenAlertNotification: this.state.isOpenAlertNotification
        ? !this.state.isOpenAlertNotification
        : this.state.isOpenAlertNotification,
    });
  };

  toggleSendFeedback = async () => {
    if (this.props.txtFeedback.trim().length > 0) {
      await this.props.sendFeedbackMailReq({
        feedbackPage: window.location.href,
        feedbacktext: this.props.txtFeedback,
      });
    } else {
      this.myRef.current.focus();
    }
  };

  toggleCloseFeedback = async () => {
    this.setState({
      isOpenFeedbackPopup: !this.state.isOpenFeedbackPopup,
    });
    await this.props.handleClosefeedback();
  };

  render() {
    return (
      <nav
        className={
          this.props.trialProductStatus && this.props.trialProductStatus !== TypeConstants.NOT_TRIAL_USER
            ? bem.b('bg-white navbar navbar-expand navbar-light yellowtrial')
            : `${bem.b('bg-white navbar navbar-expand navbar-light')}`
        }
      >
        <ul className='me-2'>
          <button type='button' className='btn p-0 m-0' onClick={this.handleSidebarControlButton}>
            <i className='bi bi-list' style={{ fontSize: '1.7rem', color: '#183f74' }} />
          </button>
        </ul>
        <ul className='navbar-nav'>
          <SearchInput
            className='topSearchBar'
            univarsalCompanysearchFormReq={this.props.univarsalCompanysearchFormReq}
            univarsalInvestorsearchFormReq={this.props.univarsalInvestorsearchFormReq}
            univarsalAdvisorsearchFormReq={this.props.univarsalAdvisorsearchFormReq}
            univarsalPeopleSearchFormReq_V2={this.props.univarsalPeopleSearchFormReq_V2}
            handleEvent={this.props.handleEvent}
          />
        </ul>
        <ul className='navbar-nav'>
          <YellowStatusBar
            distinctProfile={this.props.distinctProfile}
            trialProductStatus={this.props.trialProductStatus}
            userid={this.state.userid}
            userTrialStatus={this.state.userTrialStatus}
            UserEmail={this.state.UserEmail}
            url={this.props.location}
            ProductStatusNo={this.props.trialProductStatus}
            uniqueId={this.props.uniqueId}
            queryUniqueId={this.props.queryUniqueId}
            profileCount={this.props.profileCount}
            module={this.props.module}
            module_product_id={this.props.module_product_id}
          />
        </ul>
        <ul className={bem.e('nav-right navbar-nav')}>
          {/* HIDE BELL TEMPORARILY UNTIL ALERT / PDF  */}
          {/* showActivistIcon={showActivistIcon} */}
          {this.state.showProxyIcon && this.state.showProxyIcon !== null ? (
            <li className='d-inline-flex nav-item'>
              <span
                id='navbarDropdown'
                className='nav-link'
                role='button'
                onClick={async () => {
                  await GetForeignSecurityKey({ userid: this.state.userid }).then((res) => {
                    if (res && res.length > 0) {
                      const fsKey = res[0].foreign_security_key;
                      window.open(`https://www.proxyinsight.com/crosslogin.aspx?ui=${this.state.userid}&fsk=${fsKey}`, '_blank');
                    }
                  }).catch((e) => console.log(e));
                }
                }
                style={{ position: 'relative' }}
              >
                <img
                  alt='PI_project'
                  height={24}
                  width={24}
                  title='Proxy Insight'
                  src='https://www.proxyinsight.com/favicon-32x32.png'
                />
              </span>
            </li>
          ) : (
            ''
          )}
          {/* foreignSecurityKey={foreignSecurityKey} */}
          {this.state.showActivistIcon && this.state.showActivistIcon !== null ? (
            <li className='d-inline-flex nav-item'>
              <span
                id='navbarDropdown'
                className='nav-link'
                role='button'
                onClick={async () => {
                  await GetForeignSecurityKey({ userid: this.state.userid }).then((res) => {
                    if (res && res.length > 0) {
                      const fsKey = res[0].foreign_security_key;
                      window.open(`https://www.activistinsight.com/crosslogin.aspx?ui=${this.state.userid}&fsk=${fsKey}`, '_blank');
                    }
                  }).catch((e) => console.log(e));
                }}
                style={{ position: 'relative' }}
              >
                <img
                  alt='AI_project'
                  title='Activist Insight'
                  height={24}
                  width={24}
                  src='https://www.activistinsight.com/favicon-32x32.png'
                />
              </span>
            </li>
          ) : (
            ''
          )}

          <li className='d-inline-flex nav-item'>
            <span
              id='navbarDropdown'
              className='nav-link'
              role='button'
              onClick={this.toggleFeedbackPopover}
              style={{ position: 'relative' }}
            >
              <i className='bi bi-question-circle' id='feedback' />
              <div
                className={this.state.isOpenFeedbackPopup ? bem.b('dropdown-menu show') : bem.b('dropdown-menu')}
                aria-labelledby='navbarDropdown'
                style={{ zIndex: 1003 }}
              >
                <SlideDown className='my-dropdown-slidedown'>
                  <div
                    className={bem.b('card')}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className={bem.b('card-header feedbackHeader')}>Support</div>
                    <div className='card-body feedbackHeader-card'>
                      {this.props.isFeedbackSubmitted ? (
                        <ul className='list-group list-group-flush'>
                          <li className='list-group-item feedbackCloseText'>
                            <span>Thank You!</span>
                          </li>
                          <li className='list-group-item'>
                            <span>
                              Your feedback has been submitted and our team will review it shortly. Should you require
                              urgent assistance, please contact our team at insightia.support@diligent.com.
                            </span>
                            <span className='float-end'>
                              <button
                                className='btn btn-primary mt-3 btnFeedbackClose'
                                type='button'
                                onClick={() => {
                                  this.toggleCloseFeedback();
                                }}
                              >
                                {' '}
                                Close
                              </button>
                            </span>
                          </li>
                        </ul>
                      ) : (
                        <ul className='list-group list-group-flush'>
                          <li className='feedbackText '>
                            <table>
                              <thead />
                              <tbody>
                                <tr className='list-group-item list-group-item-support'>
                                  <td>
                                    <img src='/images/icons/support.svg' alt='support' />
                                  </td>
                                  <td className='text-left help_allign'>Help:</td>
                                  <td className='text-left'>
                                    <a href={pathConst.GENERAL_FAQ}>FAQ/Help</a>
                                  </td>
                                </tr>
                                <tr className='list-group-item list-group-item-support'>
                                  <td>
                                    <img
                                      src='/images/icons/mail.svg'
                                      alt='support'
                                    />
                                  </td>
                                  <td className='text-left email_allign'>
                                    Email:
                                  </td>
                                  <td
                                    className='text-left'
                                    style={{ fontSize: '0.68rem' }}
                                  >
                                    <a href='mailto:insightia.support@diligent.com'>
                                      insightia.support@diligent.com
                                    </a>
                                  </td>
                                  <div>
                                  <span>
                                    For any custom data requirements or general queries about the product please send us an email.
                                  </span>
                                  </div>
                                </tr>
                                {/* COMMENTED OUT TO REMOVE OLD INSIGHTIA NEW NUMBER - AWAITING NEW CONTACT NUMBER
                                <tr className='list-group-item list-group-item-support'>
                                  <td>
                                    <img src='/images/icons/phone.svg' alt='support' />
                                  </td>
                                  <td className='text-left'>Phone:</td>
                                  <td className='text-left'>
                                    +1 646 475 2214 <br /> +44(0)20 7788 7772
                                  </td>
                                </tr>
                                  */}
                                <tr className='list-group-item list-group-item-support'>
                                  <td>
                                    <img src='/images/icons/feedback2.svg' alt='support' />
                                  </td>
                                  <td className='text-left'>
                                    <div className='mb-1'>Feedback:</div>
                                    <div>
                                      Send us a quick message below. Feedback gives us a welcome opportunity to improve
                                      the platform for the benefit of our clients.
                                    </div>
                                  </td>
                                  <td />
                                </tr>
                              </tbody>
                            </table>
                          </li>
                          <li className='list-group-item '>
                            <span>
                              <textarea
                                rows={10}
                                onChange={(e) => {
                                  this.props.handledFeedbackText(e.target.value);
                                }}
                                className='feedbackInput'
                                id='feedbackText'
                                value={this.props.txtFeedback}
                                ref={this.myRef}
                              />
                            </span>
                            <span>
                              <label className='feedbackCount'>{this.props.feedbackTextLength}/250</label>
                            </span>
                            <span className='float-end'>
                              <button
                                className='btn btn-primary '
                                type='button'
                                disabled={!this.props.txtFeedback.trim().length > 0}
                                onClick={() => {
                                  this.toggleSendFeedback();
                                }}
                              >
                                {' '}
                                Send Feedback
                              </button>
                            </span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </SlideDown>
              </div>
            </span>
          </li>
          <li className='d-inline-flex nav-item'>
            <span id='Popover1' className='position-relative nav-link'>
              <div
                className='d-inline-block position-relative'
                onClick={() => {
                  this.toggleAlertNotificationPopover();
                  this.toggleChangeRedDot();
                }}
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 24 24'
                  size='25'
                  className='bi can-click animated infinite'
                  height='25'
                  width='25'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z' />
                </svg>
                {this.props.isAnyNotification && this.state.isRedDotDisplay ? (
                  <span className={bem.e('badge position-absolute badge-primary')} />
                ) : (
                  ''
                )}
              </div>
              <div
                className={
                  this.state.isOpenAlertNotification ? bem.b('alertdrop dropdown-menu show') : bem.b('dropdown-menu')
                }
                aria-labelledby='navbarDropdown'
                style={{ zIndex: 1003 }}
              >
                <SlideDown className='my-dropdown-slidedown'>
                  <div
                    className='card alertNotificationCard'
                    style={{
                      width: '300px',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {this.props.top20AlertData.length > 0 ? (
                      <div className='alertNotificationsList'>
                        {this.props.top20AlertData.map((item, index) => (
                          <NotificationComponent
                            key={`Notification_${index + 1}`}
                            top20AlertData={this.props.top20AlertData}
                            updateAlertStatusReq={this.props.updateAlertStatusReq}
                            getElementDetailReq={this.props.getElementDetailReq}
                            toggleAlertNotificationPopover={this.toggleAlertNotificationPopover}
                            isOpenAlertNotification={this.state.isOpenAlertNotification}
                            getInboxAlertByUserReq={this.props.getInboxAlertByUserReq}
                            notificationDetail={item}
                          />
                        ))}
                        <div className='alert-bottom-box'>
                          <span
                            className='alert-bottom-section'
                            onClick={() => {
                              history.push(pathConst.MY_ALERT_INBOX);
                              this.toggleAlertNotificationPopover();
                            }}
                          >
                            View all alerts here
                          </span>
                        </div>
                        {/*  */}
                      </div>
                    ) : (
                      <>
                        <div className='no-alert-box'>
                          <span
                            className='alert-bottom-section'
                            onClick={() => {
                              history.push(pathConst.MY_ALERT_NEW);
                              this.toggleAlertNotificationPopover();
                            }}
                          >
                            <svg
                              className='svg-icon'
                              style={{
                                width: '1.3em',
                                height: '1.3em',
                                verticalAlign: 'middle',
                                fill: 'white',
                                overflow: 'hidden',
                              }}
                              viewBox='0 0 1024 1024'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M426.666667 896C426.666667 943.36 465.066667 981.333333 512 981.333333 558.933333 981.333333 597.333333 942.933333 597.333333 896M805.546667 717.653333 805.546667 469.333333C805.546667 330.666667 709.546667 214.613333 579.84 183.893333L579.84 153.173333C579.84 115.626667 549.546667 85.333333 512 85.333333 474.453333 85.333333 444.16 115.626667 444.16 153.173333L444.16 183.893333C314.453333 214.613333 218.453333 330.666667 218.453333 469.333333L218.453333 717.653333 128 808.106667 128 853.333333 896 853.333333 896 808.106667M682.666667 554.666667 554.666667 554.666667 554.666667 682.666667 469.333333 682.666667 469.333333 554.666667 341.333333 554.666667 341.333333 469.333333 469.333333 469.333333 469.333333 341.333333 554.666667 341.333333 554.666667 469.333333 682.666667 469.333333' />
                            </svg>
                            Create alerts here{' '}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </SlideDown>
              </div>
            </span>
          </li>

          <li className='d-inline-flex nav-item'>
            <span
              id='navbarDropdown'
              className='nav-link'
              role='button'
              onClick={this.toggleUserCardPopover}
              style={{ position: 'relative' }}
            >
              <svg
                width='2em'
                height='2em'
                viewBox='0 0 16 16'
                className='bi bi-gear'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'
                />
                <path
                  fillRule='evenodd'
                  d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'
                />
              </svg>
              <div
                className={this.state.isOpenUserCardPopover ? bem.b('dropdown-menu show') : bem.b('dropdown-menu')}
                aria-labelledby='navbarDropdown'
                style={{ zIndex: 1003 }}
              >
                <SlideDown className='my-dropdown-slidedown'>
                  <div
                    className={bem.b('card')}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className={bem.b('card-header')}>
                      {this.state.UserEmailName} <br /> {this.state.UserEmailDomain}
                    </div>
                    <div className='card-body'>
                      <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(pathConst.PREFERENCES);
                              this.toggleUserCardPopover();
                            }}
                          >
                            Preferences
                          </span>
                        </li>
                        <li className='list-group-item'>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(pathConst.MY_ALERT_NEW);
                              this.toggleUserCardPopover();
                            }}
                          >
                            My Alerts
                          </span>
                        </li>
                        <li className='list-group-item'>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(pathConst.RECENT_DOWNLOADS);
                              this.toggleUserCardPopover();
                            }}
                          >
                            Recent Downloads
                          </span>
                        </li>
                        <li className='list-group-item'>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(pathConst.GENERAL_FAQ);
                              this.toggleUserCardPopover();
                            }}
                          >
                            FAQ / Help
                          </span>
                        </li>
                        <li style={{ listStyleType: 'none', background: 'white' }}>
                          <div className='list-group-innertitle'>
                            <span>Modules Available:</span>
                            <ul className='innerlist-group'>
                              {this.state.Membership.map((membership) => (
                                <li
                                  key={Math.random()}
                                  className={`innerlist-group-item ${
                                    membership.product_id === LAST_MEMBERSHIP_ITEM ? 'pb-2' : ''
                                  } ${
                                    membership.product_id === ACTIVIST_INSIGHT_MONTHLY
                                      ? 'listitem-insightia-monthly pt-2 pb-2'
                                      : ''
                                  } ${
                                    membership.product_id === ACTIVIST_INSIGHT_MONTHLY
                                      ? 'active'
                                      : membership.status === FULL_USER || membership.status === TRIAL_USER
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  {membership.status === TRIAL_USER ? (
                                    <span>
                                      {membership.short_name}&nbsp;
                                      <span className={bem.e('trial-lable')}>
                                        (Trial expires - {dateToNull(membership.end_date, 'dd-mmm')})
                                      </span>
                                    </span>
                                  ) : (
                                    <span
                                      className='moduleList'
                                      onClick={() => {
                                        if (history.location.pathname === pathConst.DASHBOARD) {
                                          this.props.handleDashboardFromModule(membership.product_id);
                                          this.toggleUserCardPopover();
                                        } else {
                                          history.push(pathConst.DASHBOARD);
                                          this.props.handleDashboardFromModule(membership.product_id);
                                          this.toggleUserCardPopover();
                                        }
                                      }}
                                    >
                                      {membership.short_name}{' '}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className='card-footer text-muted'>
                      <span
                        className='btn btn-link'
                        onClick={() => {
                          logout(this.state.userid, this.state.sessionid);
                          window.location.href = pathConst.CREDENTIAL_FORM;
                        }}
                      >
                        Sign out
                      </span>
                    </div>
                  </div>
                </SlideDown>
              </div>
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default React.memo(Header);
