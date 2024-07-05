import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileBoards = ({ location, tableBoards, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableBoards).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Board of Directors Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  let board_size_max = '';
  if (tableBoards.board_size_min === '') {
    if (tableBoards.board_size_max === '') {
      board_size_max = 'n/a';
    } else {
      board_size_max = `Max ${tableBoards.board_size_max}`;
    }
  } else if (tableBoards.board_size_max === '') {
    board_size_max = `Min ${tableBoards.board_size_min}`;
  } else {
    board_size_max = `From ${tableBoards.board_size_min} to ${tableBoards.board_size_max}`;
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Board of Directors Policy' smalltitle='' addedClass=''>
        <div className={bem.b('row')}>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Board Size</div>
              <div className='col-6 col-md-4 mb-2'>{board_size_max}</div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Board Diversity</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.diversity_quickview !== '' ? tableBoards.diversity_quickview : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Min Board Meetings</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.min_board_meetings !== '' ? tableBoards.min_board_meetings : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>ED Max Board Mandates</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.ed_max_board_mandates !== '' ? tableBoards.ed_max_board_mandates : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>NED Max Board Mandates</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.ned_max_board_mandates !== '' ? tableBoards.ned_max_board_mandates : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Term/Age Limit</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.term_age_limit !== '' ? tableBoards.term_age_limit : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Combined CEO/Chairman</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.combinedCEO_chairman !== '' ? tableBoards.combinedCEO_chairman : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Executive Chairman</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.executive_chairman !== '' ? tableBoards.executive_chairman : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Board Independence</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableBoards.board_independence !== '' ? tableBoards.board_independence : 'n/a'}
              </div>
            </div>
          </div>

          {tableBoards.board_structure !== '' && (
            <div className='row'>
              <div className='subHeaderTitle'>Board Structure</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_structure
                }}
              />
            </div>
          )}
          {tableBoards.classified_boards_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Classified Boards</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.classified_boards_text
                }}
              />
            </div>
          )}
          {tableBoards.ceo_chairman_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>CEO / Chairman Combined</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.ceo_chairman_text
                }}
              />
            </div>
          )}
          {tableBoards.exec_chairman_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Executive Chairman</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.exec_chairman_text
                }}
              />
            </div>
          )}
          {tableBoards.board_independence_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Board Independence</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_independence_text
                }}
              />
            </div>
          )}
          {tableBoards.definition_Independence !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Definition of Independence</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.definition_Independence
                }}
              />
            </div>
          )}
          {tableBoards.SID_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Senior /Lead Independent Director (SID)</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableBoards.SID_text }}
              />
            </div>
          )}
          {tableBoards.elections !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Elections / Re-election</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableBoards.elections }}
              />
            </div>
          )}
          {tableBoards.board_disclosure !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Board Disclosure</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_disclosure
                }}
              />
            </div>
          )}
          {tableBoards.board_meetings_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Board Meetings</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_meetings_text
                }}
              />
            </div>
          )}
          {tableBoards.competence_text !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Competence</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.competence_text
                }}
              />
            </div>
          )}
          {tableBoards.board_evaluation !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Board Evaluation</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_evaluation
                }}
              />
            </div>
          )}
          {tableBoards.indemnification !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Indemnification</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.indemnification
                }}
              />
            </div>
          )}
          {tableBoards.board_responsiveness !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Board Responsiveness</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.board_responsiveness
                }}
              />
            </div>
          )}
          {tableBoards.succession_planning !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Succession Planning</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.succession_planning
                }}
              />
            </div>
          )}
          {tableBoards.Diversity !== '' && (
            <div className='row pt-4 '>
              <div className='subHeaderTitle'>Diversity</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableBoards.Diversity }}
              />
            </div>
          )}
          {tableBoards.term_limits !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Term Limits</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableBoards.term_limits }}
              />
            </div>
          )}
          {tableBoards.contested_election_of_directors !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Contested Election of Directors</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.contested_election_of_directors
                }}
              />
            </div>
          )}
          {tableBoards.overboarding !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Overboarding</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableBoards.overboarding }}
              />
            </div>
          )}
          {tableBoards.conflicts_of_interest !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Conflicts of Interest</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.conflicts_of_interest
                }}
              />
            </div>
          )}

          {tableBoards.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableBoards.regional_investor})</span>
              </div>
            </div>
          )}
          {tableBoards.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableBoards.global_investor})</span>
              </div>
            </div>
          )}
          {tableBoards.other !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Other</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableBoards.other
                }}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileBoards.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableBoards: PropTypes.object
};
VotingProfileBoards.defaultProps = {
  tableBoards: {}
};

export default withRouter(VotingProfileBoards);
