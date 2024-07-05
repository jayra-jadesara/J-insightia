import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import { NORECORDS } from '../../../../constants/MessageConstans';
import Card from '../../../GeneralForm/Card';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileVotingPolicy = ({ location, tableVotingPolicy, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableVotingPolicy).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Voting Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Voting Policy' smalltitle='' addedClass='' id='VotingPolicy'>
        <div className={bem.b('row')}>
          <div className={TrialStatus ? 'blurrytext row pt-4' : 'row pt-4'}>
            <div className='col-6 col-md-2 mb-2 text-primary'>Vote in House</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableVotingPolicy.vote_in_house !== '' ? tableVotingPolicy.vote_in_house : 'n/a'}
            </div>
            <div className='col-6 col-md-2 mb-2 text-primary'>Votes where Shareblocking</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableVotingPolicy.votes_shareblocking !== '' ? tableVotingPolicy.votes_shareblocking : 'n/a'}
            </div>
            <div className='col-6 col-md-2 mb-2 text-primary'>Securities Lending</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableVotingPolicy.quickview_securities_lending !== ''
                ? tableVotingPolicy.quickview_securities_lending
                : 'n/a'}
            </div>
          </div>

          {(tableVotingPolicy.voting_policy !== '' ||
            tableVotingPolicy.vote_in_house_text !== '' ||
            tableVotingPolicy.engagement_with_issuer !== '' ||
            tableVotingPolicy.conflicts_of_interest_process !== '' ||
            tableVotingPolicy.Collaboration !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Voting Policy</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableVotingPolicy.voting_policy
                }}
              />
              {tableVotingPolicy.vote_in_house_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Vote in House</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.vote_in_house_text
                    }}
                  />
                </>
              )}
              {tableVotingPolicy.engagement_with_issuer !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Engagement with Company</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.engagement_with_issuer
                    }}
                  />
                </>
              )}
              {tableVotingPolicy.conflicts_of_interest_process !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Conflicts of Interest Process</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.conflicts_of_interest_process
                    }}
                  />
                </>
              )}
              {tableVotingPolicy.Collaboration !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Collaboration (Class Action)</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.Collaboration
                    }}
                  />
                </>
              )}
            </div>
          )}

          {(tableVotingPolicy.vote_all_resolutions !== '' ||
            tableVotingPolicy.where_shareblocking !== '' ||
            tableVotingPolicy.vote_reporting !== '' ||
            tableVotingPolicy.lending_own_funds_text !== '' ||
            tableVotingPolicy.lending_other_funds_text !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Vote all Resolutions</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableVotingPolicy.vote_all_resolutions
                }}
              />

              {tableVotingPolicy.where_shareblocking !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Where Shareblocking</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.where_shareblocking
                    }}
                  />
                </>
              )}
              {tableVotingPolicy.vote_reporting !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Vote Reporting</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableVotingPolicy.vote_reporting
                    }}
                  />
                </>
              )}

              {(tableVotingPolicy.lending_own_funds_text !== '' ||
                tableVotingPolicy.lending_other_funds_text !== '') && (
                <>
                  <div className='subHeaderTitle pt-4'>Securities Lending</div>
                  {tableVotingPolicy.lending_own_funds_text !== '' && (
                    <>
                      <div className='subHeaderTitle pt-2'>Own Funds</div>
                      <span
                        className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                        dangerouslySetInnerHTML={{
                          __html: tableVotingPolicy.lending_own_funds_text
                        }}
                      />
                    </>
                  )}
                  {tableVotingPolicy.lending_other_funds_text !== '' && (
                    <>
                      <div className='subHeaderTitle pt-4'>Other Funds</div>
                      <span
                        className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                        dangerouslySetInnerHTML={{
                          __html: tableVotingPolicy.lending_other_funds_text
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {tableVotingPolicy.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableVotingPolicy.regional_investor})</span>
              </div>
            </div>
          )}
          {tableVotingPolicy.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableVotingPolicy.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileVotingPolicy.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableVotingPolicy: PropTypes.object
};
VotingProfileVotingPolicy.defaultProps = {
  tableVotingPolicy: {}
};

export default withRouter(VotingProfileVotingPolicy);
