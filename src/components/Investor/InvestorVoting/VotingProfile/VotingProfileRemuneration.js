import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileRemuneration = ({ location, tableRemuneration, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableRemuneration).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Remuneration / Compensation Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Remuneration / Compensation Policy' smalltitle='' addedClass=''>
        <div className={bem.b('row')}>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Frequency Say on Pay</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.frequency_advisory_vote !== '' ? tableRemuneration.frequency_advisory_vote : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>NED Shareholding</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.NED_Shareholding !== '' ? tableRemuneration.NED_Shareholding : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Stock Ownership Requirement</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.stock_ownership_requirement !== ''
                  ? tableRemuneration.stock_ownership_requirement
                  : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Severance Payment</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.severance !== '' ? tableRemuneration.severance : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Clawback</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.clawback !== '' ? tableRemuneration.clawback : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Link compensation to non-financial factors</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableRemuneration.compensation_non_financial !== ''
                  ? tableRemuneration.compensation_non_financial
                  : 'n/a'}
              </div>
            </div>
          </div>

          {tableRemuneration.executive_compensation !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Executive Compensation</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.executive_compensation
                }}
              />
            </div>
          )}
          {tableRemuneration.advisory_vote_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Advisory Vote on Compensation (Say on Pay)</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.advisory_vote_text
                }}
              />
            </div>
          )}
          {tableRemuneration.non_financial_linked_comp !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Link Compensation to Non-Financial Factors</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.non_financial_linked_comp
                }}
              />
            </div>
          )}
          {tableRemuneration.remuneration_benchmark !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Remuneration Benchmarking</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.remuneration_benchmark
                }}
              />
            </div>
          )}
          {tableRemuneration.performance_eval !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Performance Evaluation</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.performance_eval
                }}
              />
            </div>
          )}
          {tableRemuneration.clawback_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Clawback</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.clawback_text
                }}
              />
            </div>
          )}
          {tableRemuneration.severance_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Severance Payments</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.severance_text
                }}
              />
            </div>
          )}
          {tableRemuneration.golden_parachute !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Golden /Tin Parachute</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.golden_parachute
                }}
              />
            </div>
          )}
          {tableRemuneration.service_contracts !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Service Contracts</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.service_contracts
                }}
              />
            </div>
          )}
          {tableRemuneration.retention_plans !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Retention Plans</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.retention_plans
                }}
              />
            </div>
          )}
          {tableRemuneration.pensions !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Pensions</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableRemuneration.pensions }}
              />
            </div>
          )}
          {tableRemuneration.required_disclosure !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Required Disclosure</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.required_disclosure
                }}
              />
            </div>
          )}
          {tableRemuneration.base_salary !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Base Salary</div>
              {/* <div className='subHeaderTitle'>Base Salary</div> */}
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.base_salary
                }}
              />
            </div>
          )}

          {tableRemuneration.exec_pay_restrictions !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Base Salary</div>
              <div className='subHeaderTitle pt-4'>Executive Pay Restrictions or Freezes</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.exec_pay_restrictions
                }}
              />
            </div>
          )}
          {tableRemuneration.bonus_annual !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Bonuses</div>
              <div className='subHeaderTitle pt-4'>Annual Bonus</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableRemuneration.bonus_annual
                }}
              />
            </div>
          )}
          {(tableRemuneration.equity_plans !== '' ||
            tableRemuneration.bonus_LTIP !== '' ||
            tableRemuneration.Stock_purchase_plans !== '' ||
            tableRemuneration.Evergreen !== '' ||
            tableRemuneration.repricing_provisions !== '' ||
            tableRemuneration.accelerated_equity !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Equity</div>
              {tableRemuneration.equity_plans !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Equity Based Plans</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.equity_plans
                    }}
                  />
                </>
              )}
              {tableRemuneration.bonus_LTIP !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Long Term Incentive Plan (LTIP)</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.bonus_LTIP
                    }}
                  />
                </>
              )}
              {tableRemuneration.bonus_short_term !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Short Term Incentive Plan</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.bonus_short_term
                    }}
                  />
                </>
              )}
              {tableRemuneration.directors_shareholding !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Directors&apos; Shareholding</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.directors_shareholding
                    }}
                  />
                </>
              )}
              {tableRemuneration.Stock_purchase_plans !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Employee Stock Purchase Plans</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.Stock_purchase_plans
                    }}
                  />
                </>
              )}
              {tableRemuneration.Evergreen !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Evergreen Options</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.Evergreen
                    }}
                  />
                </>
              )}
              {tableRemuneration.repricing_provisions !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Repricing provisions</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.repricing_provisions
                    }}
                  />
                </>
              )}
              {tableRemuneration.hedging_pledging_stock !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Hedging/Pledging of Stock</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.hedging_pledging_stock
                    }}
                  />
                </>
              )}
              {tableRemuneration.equity_dilution !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Equity Dilution</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.equity_dilution
                    }}
                  />
                </>
              )}
              {tableRemuneration.accelerated_equity !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Accelerated Equity Vesting (Change of Control)</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.accelerated_equity
                    }}
                  />
                </>
              )}
            </div>
          )}

          {(tableRemuneration.NED_remuneration !== '' || tableRemuneration.NED_Equity_plan !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Non-Executive Director (NED) Remuneration</div>
              {tableRemuneration.NED_remuneration !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>NED Remuneration</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.NED_remuneration
                    }}
                  />
                </>
              )}
              {tableRemuneration.NED_Equity_plan !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Equity Plan for NEDs</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.NED_Equity_plan
                    }}
                  />
                </>
              )}
              {tableRemuneration.NED_retirement_plan !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Retirement Plans for NEDs</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableRemuneration.NED_retirement_plan
                    }}
                  />
                </>
              )}
            </div>
          )}

          {tableRemuneration.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableRemuneration.regional_investor})</span>
              </div>
            </div>
          )}
          {tableRemuneration.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableRemuneration.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileRemuneration.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableRemuneration: PropTypes.object
};
VotingProfileRemuneration.defaultProps = {
  tableRemuneration: {}
};

export default withRouter(VotingProfileRemuneration);
