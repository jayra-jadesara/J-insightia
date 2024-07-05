import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import SearchInput from '../../GeneralForm/DropdownVirtualized';
import bn from '../../../utils/bemnames';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import { MAX_MOBILE_WIDTH } from '../../../constants/ScreenSizeConstant';
import CompanyAndInvestorFilter from '../Components/CompanyAndInvestorFilter';
import DropdownTreeSelect from '../../GeneralForm/DropdownTreeSelect';
import PathsConstant from '../../../constants/PathsConstant';
import prodConstant from '../../../constants/ProductConstants';
import Model from '../../GeneralForm/Modal';
import { UpdateTblalert, InserttblAlertOptionLink, InsertTblAlertSubOptionLink } from '../../../utils/myAlerts-util';
import { history } from '../../../utils/navigation-util';
import myAlertConst from '../../../constants/MyAlertConstant';
import numConst from '../../../constants/NumberConstants';

const bem = bn.create('myAlert');

const NewAlerts = (props) => {
  const { width } = useWindowDimensions();
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);
  const [modelWarningMessage, setModelWarningMessage] = useState('');
  const [loaderOnBtn, setLoaderOnBtn] = useState(false);
  const [isAlertFilter, setIsAlertFilter] = useState(true);

  // const [DropDownValues, setDropDownValues] = useState('');
  const alertNameInput = React.useRef(null);
  const btnRef = React.useRef();

  const handleCloaseModelPopup = () => {
    setIsModalPopupVisible(false);
  };

  function useKeypress(key, action) {
    useEffect(() => {
      async function onKeyup(e) {
        if (e.key === key) await action();
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }, [action, key]);
  }

  useKeypress('Enter', handleCloaseModelPopup);

  const {
    handleOnChangeRdoEmailTo,
    isEmailMeToo,
    handleOnChangeChkNotifiedMe,
    handleOnChangeAlertName,
    alertName,
    chkNotifiedMe,
    isJustMyJIOAlertInbox,
    handleOnChangeisJustMyJIOAlertInbox,
    editAlertid,
    handleCancelEditingAlert,
    getExistingAlertsReq,
    handleDeleteOptionAndSubOptionLink,

    alertOptions,
    alertSubOptions,

    myAlertSelectedOptionIds,
    alertStaticSubOptions,
    myAlertSelectedSubOptionStatic,

    // Activism
    ddlSpecificActivistActionNews,
    ddlSpecificShortActivistActionNews,
    ddlSpecificActivistActionNewsSelection,
    ddlSpecificShortActivistActionNewsSelection,
    ddlSpecificFillingType,
    ddlSpecificFillingTypeSelection,
    ddlActivismEventNewsAlerts,
    ddlActivismShortEventNewsAlerts,
    ddlActivismEventNewsAlertsSelection,
    ddlActivismShortEventNewsAlertsSelection,
    handleOnChangeDdlActivisamEventNews,
    handleOnChangeDdlActivisamShortEventNews,
    handleOnChangeDdlActivismNewsFillingAlert,
    handleOnChangeDdlSpecificNews,
    handleOnChangeDdlSpecificShortNews,
    ddlAlertOptionActivismFilingSelection,
    ddlAlertOptionActivismNewsSelection,
    ddlAlertOptionShortActivismNewsSelection,
    activismNewsActivistTypeSelection,
    activismShortNewsActivistTypeSelection,
    //activist demands
    ddlSpecificActivistDemands,
    ddlAlertOptionActivistDemandsSelection,

    isAccessGovernance,
    handleOnChangeDynamicSubOption,

    handleDynamicbtnClick,
    handleOnChangeDdlSpecificActivistDemands,
    //activist Demands
    ddlSpecificActivistDemandsSelection,
    activistDemandTypeSelection,

    isEnabledButtonfor_subs_Activism,
    isEnabledButtonfor_subs_ShortActivism,
    isEnabledButtonfor_subs_Governance,
    isEnabledButtonfor_subs_Voting,

    alertCompanySearchId,
    alertInvestorSearchId,
    isExistingAlert,
    alert_cmp_search_id,
    alert_inv_search_id,
  } = props;

  const noteMessage = 'The alerts for this module are not available on your subscription.';

  const handleOnSubmit = async () => {
    if (alertName.length === numConst.EMPTY_TABLE_LENGTH) {
      setModelWarningMessage('Please ensure you have given your alert a name');
      setIsModalPopupVisible(true);
      alertNameInput.current.focus();
    } else if (myAlertSelectedOptionIds.length === numConst.EMPTY_TABLE_LENGTH) {
      setModelWarningMessage('Please ensure you have selected at least one alert type');
      setIsModalPopupVisible(true);
    } else {
      if (editAlertid !== undefined && editAlertid !== null) {
        await handleDeleteOptionAndSubOptionLink(editAlertid);
      }
      const data = {
        AlertId: editAlertid !== undefined && editAlertid !== null ? editAlertid : null,
        AlertName: alertName,
        CompanySearchId:
          props.invCompCompanyPeerGroupSelection !== undefined ? props.invCompCompanyPeerGroupSelection.value : null,
        InvestorSearchId:
          props.invCompInvestorPeerGroupSelection !== undefined ? props.invCompInvestorPeerGroupSelection.value : null,
        ReceivedEmail: isEmailMeToo !== undefined ? isEmailMeToo : false,
        ReceivedAlertInboxOnline: isJustMyJIOAlertInbox !== undefined ? isJustMyJIOAlertInbox : true,
        notyfy_me_instant_alert: chkNotifiedMe
      };

      await UpdateTblalert(data)
        .then(async (res) => {
          // Insert Activism News Selection
          if (ddlAlertOptionActivismNewsSelection !== undefined) {
            // insert sub alert options
            if (activismNewsActivistTypeSelection !== undefined && activismNewsActivistTypeSelection.length > 0) {
              await InserttblAlertOptionLink(res.alertId, ddlAlertOptionActivismNewsSelection.value).then(
                async (alertOptionRes) => {
                  for (const tSelection of activismNewsActivistTypeSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_ACTIVISM_DEMAND_TYPE, tSelection);
                  }
                }
              );
            }

            if (ddlActivismEventNewsAlertsSelection !== undefined && ddlActivismEventNewsAlertsSelection.length > 0) {
              await InserttblAlertOptionLink(res.alertId, ddlAlertOptionActivismNewsSelection.value).then(
                async (alertOptionRes) => {
                  for (const dNews of ddlActivismEventNewsAlertsSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_ACTIVISM_EVENTS, dNews.value);
                  }
                }
              );
            }
          }

          // Insert Activism filling Selection
          if (ddlSpecificFillingTypeSelection !== undefined && ddlSpecificFillingTypeSelection.length > 0) {
            await InserttblAlertOptionLink(res.alertId, ddlAlertOptionActivismFilingSelection.value).then(
              async (alertOptionRes) => {
                // insert sub alert options
                if (ddlSpecificFillingTypeSelection !== undefined && ddlSpecificFillingTypeSelection.length > 0) {
                  for (const fVal of ddlSpecificFillingTypeSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_FILING_TYPE, fVal.value);
                  }
                }
              }
            );
          }
          //insert short activism news selections
          if (ddlAlertOptionShortActivismNewsSelection !== undefined) {
            // insert sub alert options
            if (
              activismShortNewsActivistTypeSelection !== undefined &&
              activismShortNewsActivistTypeSelection.length > 0
            ) {
              await InserttblAlertOptionLink(res.alertId, ddlAlertOptionShortActivismNewsSelection.value).then(
                async (alertOptionRes) => {
                  for (const tSelection of activismShortNewsActivistTypeSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_SHORT_SELLER_ACTION, tSelection);
                  }
                }
              );
            }

            if (
              ddlActivismShortEventNewsAlertsSelection !== undefined &&
              ddlActivismShortEventNewsAlertsSelection.length > 0
            ) {
              await InserttblAlertOptionLink(res.alertId, ddlAlertOptionShortActivismNewsSelection.value).then(
                async (alertOptionRes) => {
                  for (const dNews of ddlActivismShortEventNewsAlertsSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_SHORT_EVENTS, dNews.value);
                  }
                }
              );
            }
          }

          if (ddlAlertOptionActivistDemandsSelection !== undefined) {
            if (activistDemandTypeSelection !== undefined && activistDemandTypeSelection.length > 0) {
              await InserttblAlertOptionLink(res.alertId, ddlAlertOptionActivistDemandsSelection.value).then(
                async (alertOptionRes) => {
                  for (const tSelection of activistDemandTypeSelection) {
                    await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, myAlertConst.ALERT_SUBOPTION_ACTIVISM_DEMAND_TYPE, tSelection);
                  }
                }
              );
            }
          }

          let datas = [];
          let staticData = [];
          // let suboptins = [];
          let ids = [];
          staticData = myAlertSelectedSubOptionStatic;

          ids = myAlertSelectedOptionIds.filter((o) => !staticData.some((i) => i.alert_option_id === o));
          const alert_option_id = [];

          ids.forEach((item) => {
            if (item === myAlertConst.MY_ALERT_OPTION_ID_ONE) {
              if (
                activismNewsActivistTypeSelection.length === numConst.EMPTY_TABLE_LENGTH &&
                ddlActivismEventNewsAlertsSelection.length === numConst.EMPTY_TABLE_LENGTH
              ) {
                alert_option_id.push({ alert_option_id: item });
              }
            } else if (item === myAlertConst.MY_ALERT_OPTION_ID_TWO) {
              if (ddlSpecificFillingTypeSelection.length === numConst.EMPTY_TABLE_LENGTH) {
                alert_option_id.push({ alert_option_id: item });
              }
            } else if (item === myAlertConst.MY_ALERT_OPTION_ID_THREE) {
              if (
                activismShortNewsActivistTypeSelection.length === numConst.EMPTY_TABLE_LENGTH &&
                ddlActivismShortEventNewsAlertsSelection.length === numConst.EMPTY_TABLE_LENGTH
              ) {
                alert_option_id.push({ alert_option_id: item });
              }
            } else if (item === numConst.MY_ALERT_ACTIVIST_DEMANDS_ALERT_OPTION_ID) {
              if (
                activistDemandTypeSelection.length === numConst.EMPTY_TABLE_LENGTH &&
                ddlSpecificActivistDemandsSelection === numConst.EMPTY_TABLE_LENGTH
              ) {
                alert_option_id.push({ alert_option_id: item });
              }
            } else if (
              myAlertSelectedSubOptionStatic.length === numConst.EMPTY_TABLE_LENGTH ||
              myAlertSelectedSubOptionStatic.length !== numConst.EMPTY_TABLE_LENGTH
            ) {
              alert_option_id.push({ alert_option_id: item });
            }
          });

          datas = [...staticData, ...alert_option_id];
          for (const c of datas) {
            if (c.alert_option_id !== null) {
              await InserttblAlertOptionLink(res.alertId, c.alert_option_id).then(async (alertOptionRes) => {
                // insert sub alert options
                if (c.alert_suboption_id !== null) {
                  await InsertTblAlertSubOptionLink(alertOptionRes.alertOptionId, c.alert_suboption_id, c.value);
                }
              });
            }
          }
        })
        .then(() => {
          history.push(PathsConstant.MY_ALERT_EXISTING_ALERT);
          // if (editAlertid !== undefined && editAlertid !== null) {
          getExistingAlertsReq();
          handleCancelEditingAlert();
          // }
        });
    }
  };

  const getSubOptionDropdownList = (alert_option_id) => {
    switch (alert_option_id) {
      case 1:
        return (
          <>
            <div
              className={
                MAX_MOBILE_WIDTH < width
                  ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                  : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
              }
            >
              <DropdownTreeSelect
                id={alert_option_id}
                onChangeSelection={handleOnChangeDdlSpecificNews}
                totalSelection={ddlSpecificActivistActionNewsSelection}
                options={ddlSpecificActivistActionNews}
                placeholder={
                  ddlSpecificActivistActionNewsSelection.length === numConst.EMPTY_TABLE_LENGTH
                    ? 'Specific activist action news (Optional)'
                    : ' '
                }
              />
            </div>
            <div
              className={
                MAX_MOBILE_WIDTH < width
                  ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                  : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
              }
            >
              <SearchInput
                id={alert_option_id}
                onChange={(e) => {
                  if (e !== null) {
                    handleOnChangeDdlActivisamEventNews(e);
                  }
                }}
                selectValue={ddlActivismEventNewsAlertsSelection}
                options={ddlActivismEventNewsAlerts}
                placeholder='Specific events news (Optional)'
                isMulti
              />
            </div>
          </>
        );
      case 2:
        return (
          <div
            className={
              MAX_MOBILE_WIDTH < width
                ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
            }
          >
            <SearchInput
              id={alert_option_id}
              onChange={(e) => {
                if (e !== null) {
                  handleOnChangeDdlActivismNewsFillingAlert(e);
                }
              }}
              selectValue={ddlSpecificFillingTypeSelection}
              options={ddlSpecificFillingType}
              isMulti
              placeholder='Specific filings types (Optional)'
            />
          </div>
        );
      case 3:
        return (
          <>
            <div
              className={
                MAX_MOBILE_WIDTH < width
                  ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                  : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
              }
            >
              <DropdownTreeSelect
                id={alert_option_id}
                onChangeSelection={handleOnChangeDdlSpecificShortNews}
                totalSelection={ddlSpecificShortActivistActionNewsSelection}
                options={ddlSpecificShortActivistActionNews}
                placeholder={
                  ddlSpecificShortActivistActionNewsSelection.length === numConst.EMPTY_TABLE_LENGTH
                    ? 'Specific activist action news (Optional)'
                    : ' '
                }
              />
            </div>
            <div
              className={
                MAX_MOBILE_WIDTH < width
                  ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                  : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
              }
            >
              <SearchInput
                id={alert_option_id}
                onChange={(e) => {
                  if (e !== null) {
                    handleOnChangeDdlActivisamShortEventNews(e);
                  }
                }}
                selectValue={ddlActivismShortEventNewsAlertsSelection}
                options={ddlActivismShortEventNewsAlerts}
                placeholder='Specific events news (Optional)'
                isMulti
              />
            </div>
          </>
        );
      case 20:
        return (
          <div
            className={
              MAX_MOBILE_WIDTH < width
                ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
            }
          >
            <DropdownTreeSelect
              id={alert_option_id}
              onChangeSelection={handleOnChangeDdlSpecificActivistDemands}
              totalSelection={ddlSpecificActivistDemandsSelection}
              options={ddlSpecificActivistDemands}
              placeholder={ddlSpecificActivistDemandsSelection.length === 0 ? 'Select Demand Type (Optional)' : ' '}
            />
          </div>
        );
      default:
        return (
          <>
            {alertSubOptions && alertSubOptions
              .filter((x) => x.alert_option_id === alert_option_id)
              .map((y) => (
                <div
                  className={
                    MAX_MOBILE_WIDTH < width
                      ? 'col-sm-4  fadeInLeftanimated fadeInLeft d-block'
                      : 'col-sm-4  fadeInLeftanimated fadeInBottom d-block'
                  }
                >
                  <SearchInput
                    id={alert_option_id}
                    onChange={(e) => {
                      if (e !== null) {
                        handleOnChangeDynamicSubOption(e, alert_option_id, y.alert_suboption_id);
                      }
                    }}
                    selectValue={myAlertSelectedSubOptionStatic.filter(
                      (c) => c.alert_suboption_id === y.alert_suboption_id
                    )}
                    options={alertStaticSubOptions.filter((c) => c.alert_suboption_id === y.alert_suboption_id)}
                    isMulti
                    placeholder={`Select ${y.label} type (Optional)`}
                  />
                </div>
              ))}
          </>
        );
    }
  };

  const bindAlertProduct = (productId, isDisabled) =>
  alertOptions && alertOptions
      .filter((x) => x.product_id === productId)
      .map((c) => (
        <div className='row mb-3'>
          {myAlertSelectedOptionIds.includes(c.alert_option_id) ? (
            <>
              <div className='col-sm-4'>
                <button
                  type='button'
                  disabled={isDisabled}
                  className='btn btnStories btn-sm w-100 btnActive'
                  onClick={() => {
                    handleDynamicbtnClick(c.alert_option_id, false);
                  }}
                >
                  <h5 id={c.alert_option_id}>{c.option_name}</h5>
                  {c.option_sub_label}
                </button>
              </div>
              {getSubOptionDropdownList(c.alert_option_id)}
            </>
          ) : (
            <div className='col-sm-4'>
              <button
                type='button'
                disabled={isDisabled}
                className='btn btnStories btn-sm w-100'
                onClick={() => {
                  handleDynamicbtnClick(c.alert_option_id, true);
                }}
              >
                <h5>{c.option_name}</h5>
                {c.option_sub_label}
              </button>
            </div>
          )}
        </div>
      ));

  return (
    <Page key={1} className={bem.b('')}>
      {isModalPopupVisible && (
        <Model show isShowFooter handleClose={handleCloaseModelPopup} title='Warning' isInfo>
          <h5>{modelWarningMessage}</h5>
        </Model>
      )}
      <div className='alertContainer mt-2'>
        <div className='row'>
          <div className='col-12 mb-0'>
            <p>Specify the filters for the alerts</p>
          </div>
        </div>
        <CompanyAndInvestorFilter
          alertCompanySearchId={alertCompanySearchId}
          alertInvestorSearchId={alertInvestorSearchId}
          alert_cmp_search_id={alert_cmp_search_id}
          alert_inv_search_id={alert_inv_search_id}
          isExistingAlert={isExistingAlert}
          isAlertFilter={isAlertFilter}
          {...props}
        />
        <div className='row'>
          <div className='col-12 mb-0'>
            <p>Specify which alerts you would like to receive</p>
          </div>
          <div className='col-12'>
            <CollapseComponent Heading='Activism' index='0'>
              <div className='blkCollapse'>
                {props.isEnabledButtonfor_subs_Activism && (
                  <>
                    <span className='ps-3 text-danger'>
                      <i className='bi bi-exclamation-triangle' />
                      <span className='ps-1 note-message'>{noteMessage}</span>
                    </span>
                  </>
                )}
                <div className='row'>
                  <div className='col-12'>
                    <p className='mb-3'>
                      Activism alerts are instant. Click on an alert to activate it and add any filters that appear.
                    </p>
                  </div>
                </div>
                {bindAlertProduct(prodConstant.ACTIVISM, props.isEnabledButtonfor_subs_Activism)}
              </div>
            </CollapseComponent>
            <CollapseComponent Heading='Activist Shorts' index='1'>
              <div className='blkCollapse'>
                {props.isEnabledButtonfor_subs_ShortActivism && (
                  <>
                    <span className='ps-3 text-danger'>
                      <i className='bi bi-exclamation-triangle' />
                      <span className='ps-1 note-message'>{noteMessage}</span>
                    </span>
                  </>
                )}
                <div className='row p-1'>
                  <div className='col-12'>
                    <p className='mb-3'>
                      Short Activism alerts are instant. Click on an alert to activate it and add any filters that appear.
                    </p>
                  </div>
                  {bindAlertProduct(prodConstant.ACTIVIST_SHORTS, props.isEnabledButtonfor_subs_ShortActivism)}{' '}
                </div>
              </div>
            </CollapseComponent>
            <CollapseComponent
              Heading='Governance'
              index='2'
              headerNote={
                isAccessGovernance === false ? 'Note: these alerts are not available in your current subscription' : ''
              }
            >
              <div className='blkCollapse'>
                {props.isEnabledButtonfor_subs_Governance && (
                  <>
                    <span className='ps-3 text-danger'>
                      <i className='bi bi-exclamation-triangle' />
                      <span className='ps-1 note-message'>{noteMessage}</span>
                    </span>
                  </>
                )}
                <div className='row p-1'>
                  <div className='col-12'>
                    <p className='mb-3'>
                    Governance alerts are sent daily. Click on an alert to activate it and add any filters that appear.
                    </p>
                  </div>
                  {bindAlertProduct(prodConstant.GOVERNANCE, props.isEnabledButtonfor_subs_Governance)}
                </div>
              </div>
            </CollapseComponent>
            <CollapseComponent Heading='Voting' index='3'>
              <div className='blkCollapse'>
                {props.isEnabledButtonfor_subs_Voting && (
                  <>
                    <span className='ps-3 text-danger'>
                      <i className='bi bi-exclamation-triangle' />
                      <span className='ps-1 note-message'>{noteMessage}</span>
                    </span>
                  </>
                )}
                <div className='row p-1'>
                  <div className='col-12'>
                    <p className='mb-3'>
                      Voting alerts are instant. Click on an alert to activate it and add any filters that appear.
                    </p>
                  </div>
                  {bindAlertProduct(prodConstant.VOTING, props.isEnabledButtonfor_subs_Voting)}
                </div>
              </div>
            </CollapseComponent>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-7'>
          <p>
            In addition to receiving alerts to your Insightia alerts inbox, would you also like alerts to be sent to the
            email address associated with this account?
          </p>
          <div className='form-check-inline' onChange={handleOnChangeRdoEmailTo}>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='chkEmailMetoo'
              checked={isEmailMeToo}
              // defaultChecked={isEmailMeToo}
            />
            <label className='form-check-label' htmlFor='chkEmailMetoo'>
              Email me too
            </label>
          </div>
          <div className='form-check-inline' onChange={handleOnChangeisJustMyJIOAlertInbox}>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='chkJustMyAIOAlertInbox'
              checked={isEmailMeToo === undefined && isJustMyJIOAlertInbox === undefined ? true : isJustMyJIOAlertInbox}
              // defaultChecked={isJustMyJIOAlertInbox}
            />
            <label className='form-check-label' htmlFor='chkJustMyAIOAlertInbox'>
              Just my Insightia alerts inbox please
            </label>
          </div>
        </div>
        <div className='col-sm-5'>
          <div className='row g-1 float-end'>
            <div className='col-auto'>
              <label htmlFor='inputAlertName' className='col-form-label'>
                Give your alert a name…
              </label>
            </div>
            <div className='col-auto'>
              <input
                type='text'
                id='inputAlertName'
                className='form-control'
                aria-describedby='alertName'
                maxLength='50'
                value={alertName}
                placeholder='Alert name'
                onChange={handleOnChangeAlertName}
                ref={alertNameInput}
              />
            </div>
          </div>
        </div>
        <div className='col-sm-7'>
          <div className='form-check' onChange={handleOnChangeChkNotifiedMe}>
            <input className='form-check-input' type='checkbox' id='chkNotifyMe' defaultChecked={chkNotifiedMe} />
            <label className='form-check-label' htmlFor='chkNotifyMe'>
              Notify me when I am in the app of any instant alerts
            </label>
          </div>
        </div>
        <div className='col-sm-5 text-end'>
          <button
            type='button'
            className='btn btn-primary btn-sm align-items-center d-inline-flex'
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              if (btnRef.current) {
                btnRef.current.setAttribute('disabled', 'disabled');
                setLoaderOnBtn(true);
                handleOnSubmit();
              }
              if (
                myAlertSelectedOptionIds.length === numConst.EMPTY_TABLE_LENGTH ||
                alertName.length === numConst.EMPTY_TABLE_LENGTH
              ) {
                btnRef.current.removeAttribute('disabled', 'disabled');
                setLoaderOnBtn(false);
              }
            }}
          >
            {editAlertid !== undefined && editAlertid !== null ? 'Update this alert' : 'Save this alert'}
            {loaderOnBtn && (
              <div className='ps-2'>
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
              </div>
            )}
          </button>
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(NewAlerts));
