import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileGeneral = ({ location, tableGeneral, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableGeneral).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='General Governance Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='General Governance Policy' smalltitle='' addedClass=''>
        <div className={bem.b('row')}>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Adopt Cumulative Voting</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.adopt_cum_voting !== '' ? tableGeneral.adopt_cum_voting : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Implement Confidential Voting</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.confidential_voting !== '' ? tableGeneral.confidential_voting : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Majority Votes for Directors</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.majority_votes_directors !== '' ? tableGeneral.majority_votes_directors : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>S/H Right Act (Written Consent)</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.SH_written_consent !== '' ? tableGeneral.SH_written_consent : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>S/H Right Call Special Meeting</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.SH_Call_Special_Meeting !== '' ? tableGeneral.SH_Call_Special_Meeting : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>S/H Ratify &quot;Poison Pill&quot;</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.SH_Ratify_Poisonpill !== '' ? tableGeneral.SH_Ratify_Poisonpill : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Anti-Greenmail Proposals</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.anti_greenmail !== '' ? tableGeneral.anti_greenmail : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Reincorporation</div>
              <div className='col-6 col-md-4 mb-2'>{tableGeneral.reincorp !== '' ? tableGeneral.reincorp : 'n/a'}</div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Supermajority Vote Requirement</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableGeneral.quickview_supermajority !== '' ? tableGeneral.quickview_supermajority : 'n/a'}
              </div>
            </div>
          </div>

          {(tableGeneral.virtual_meetings !== '' ||
            tableGeneral.cumulative_vote !== '' ||
            tableGeneral.majority_vote !== '' ||
            tableGeneral.plurality_carveout !== '' ||
            tableGeneral.controlling_shareholder !== '' ||
            tableGeneral.Supermajority !== '' ||
            tableGeneral.access_to_proxy !== '' ||
            tableGeneral.written_consent !== '' ||
            tableGeneral.SH_call_special_meeting_text !== '' ||
            tableGeneral.stakeholder_provision !== '' ||
            tableGeneral.shareholder_proposals !== '' ||
            tableGeneral.reimbursement_proxy_expenses !== '' ||
            tableGeneral.bundled_proposals !== '' ||
            tableGeneral.other_business_text !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Shareholder Rights</div>
              {tableGeneral.virtual_meetings !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Virtual Meetings</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.virtual_meetings
                    }}
                  />
                </>
              )}
              {tableGeneral.cumulative_vote !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Cumulative Vote</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.cumulative_vote
                    }}
                  />
                </>
              )}
              {tableGeneral.majority_vote !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Majority Vote</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.majority_vote
                    }}
                  />
                </>
              )}
              {tableGeneral.plurality_carveout !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Plurality Carve out for Contested Elections</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.plurality_carveout
                    }}
                  />
                </>
              )}
              {tableGeneral.controlling_shareholder !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Controlling Shareholder</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.controlling_shareholder
                    }}
                  />
                </>
              )}
              {tableGeneral.Supermajority !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Supermajority Voting Provisions</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.Supermajority
                    }}
                  />
                </>
              )}
              {tableGeneral.access_to_proxy !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Shareholder Access to the Proxy</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.access_to_proxy
                    }}
                  />
                </>
              )}
              {tableGeneral.written_consent !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Shareholder ability to act by written consent</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.written_consent
                    }}
                  />
                </>
              )}
              {tableGeneral.SH_call_special_meeting_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Shareholder ability to call special meetings</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.SH_call_special_meeting_text
                    }}
                  />
                </>
              )}
              {tableGeneral.stakeholder_provision !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Stakeholder Provision</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.stakeholder_provision
                    }}
                  />
                </>
              )}
              {tableGeneral.shareholder_proposals !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Shareholder Proposals</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.shareholder_proposals
                    }}
                  />
                </>
              )}
              {tableGeneral.reimbursement_proxy_expenses !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Reimbursement of Proxy Expenses</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.reimbursement_proxy_expenses
                    }}
                  />
                </>
              )}
              {tableGeneral.bundled_proposals !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Bundled proposals</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.bundled_proposals
                    }}
                  />
                </>
              )}
              {tableGeneral.other_business_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Other Business</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.other_business_text
                    }}
                  />
                </>
              )}
            </div>
          )}

          {(tableGeneral.Reincorporation_text !== '' ||
            tableGeneral.forum_provisions !== '' ||
            tableGeneral.Reincorp_Outside_USA !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Reincorporation</div>
              {tableGeneral.Reincorporation_text !== '' && (
                <span
                  className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                  dangerouslySetInnerHTML={{
                    __html: tableGeneral.Reincorporation_text
                  }}
                />
              )}
              {tableGeneral.Reincorp_Outside_USA !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Outside USA</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.Reincorp_Outside_USA
                    }}
                  />
                </>
              )}
              {tableGeneral.forum_provisions !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Exclusive Forum Provisions</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableGeneral.forum_provisions
                    }}
                  />
                </>
              )}
            </div>
          )}
          {tableGeneral.shareholder_rights_plans !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Anti Takeover</div>
              <div className='subHeaderTitle pt-4'>Shareholder Rights Plans - &apos;Poison Pills&apos;</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableGeneral.shareholder_rights_plans
                }}
              />
            </div>
          )}
          {tableGeneral.tax_gross_ups !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle pt-4'>Tax Gross ups </div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableGeneral.tax_gross_ups
                }}
              />
            </div>
          )}

          {tableGeneral.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableGeneral.regional_investor})</span>
              </div>
            </div>
          )}
          {tableGeneral.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableGeneral.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileGeneral.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableGeneral: PropTypes.object
};
VotingProfileGeneral.defaultProps = {
  tableGeneral: {}
};

export default withRouter(VotingProfileGeneral);
