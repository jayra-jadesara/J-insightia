import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileESG = ({ location, tableESG, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableESG).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Environmental & Social Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Environmental & Social Policy' smalltitle='' addedClass=''>
        <div className={bem.b('row')}>
          {tableESG.ESG_overview !== '' && (
            <div className='row'>
              <div className='subHeaderTitle'>Overview</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.ESG_overview }}
              />
            </div>
          )}
          {tableESG.environmental_general !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Environmental</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.environmental_general }}
              />
            </div>
          )}

          {tableESG.greenhouse_gas !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Greenhouse Gas Emissions</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.greenhouse_gas }}
              />
            </div>
          )}

          {tableESG.nuclear_waste !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Nuclear Waste</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.nuclear_waste }}
              />
            </div>
          )}
          {tableESG.climate_change !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Climate Change</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.climate_change }}
              />
            </div>
          )}
          {tableESG.conflict_areas !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Conflict Areas</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.conflict_areas }}
              />
            </div>
          )}
          {tableESG.human_rights !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Human Rights</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.human_rights }}
              />
            </div>
          )}
          {tableESG.employment_humancapital !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Employment /Human Capital</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableESG.employment_humancapital
                }}
              />
            </div>
          )}
          {tableESG.public_health !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Public Health</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.public_health }}
              />
            </div>
          )}
          {tableESG.diversity !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Diversity</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{ __html: tableESG.diversity }}
              />
            </div>
          )}
          {tableESG.political_contributions !== '' && (
            <div className='row pt-4'>
              <div className='subHeaderTitle'>Political Contributions</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableESG.political_contributions
                }}
              />
            </div>
          )}

          {tableESG.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableESG.regional_investor})</span>
              </div>
            </div>
          )}
          {tableESG.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableESG.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileESG.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableESG: PropTypes.object
};
VotingProfileESG.defaultProps = {
  tableESG: {}
};

export default withRouter(VotingProfileESG);
