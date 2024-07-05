import React, { lazy } from 'react';
import { withRouter } from 'react-router';
import msgConst from '../../../constants/MessageConstans';
import { NUMBER_ONE, NUMBER_ZERO } from '../../../constants/NumberConstants';
import '../../../styles/components/_popupTrialUser.scss';
import Page from '../../Page';
import bn from '../../../utils/bemnames';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('investorProfile');

const InvestorOverview = (props) => {
  const {
    Country_nameVal,
    aboutVal,
    assets_under_mgmtVal,
    emailVal,
    focused_typeVal,
    foundedVal,
    has_voting_dataVal,
    investor_type_nameVal,
    number_activism_campaignVal,
    number_short_campaignVal,
    total_votesVal,
    websiteVal,
  } = props;

  React.useEffect(() => {
      // setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        // loadedItem.textContent = 'Loaded';
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      // }, 1000);
  }, []);

  return (
    <Page {...props} key={1} className={bem.b('pt-3')}>
      <div className='row' id='loadItem'>
        {(Country_nameVal !== null || investor_type_nameVal !== null) && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title='Investor Profile'>
              {Country_nameVal !== null && (
                <div className='row  card1'>
                  <span className='col-6 customSubHeadersInCards'>
                    Investor HQ:
                  </span>
                  <span className='col-6'>{Country_nameVal}</span>
                </div>
              )}
              {investor_type_nameVal !== null && (
                <div className='row  card2'>
                  <span className='col-6 customSubHeadersInCards'>
                    Investor Type:
                  </span>
                  <span className='col-6'>{investor_type_nameVal}</span>
                </div>
              )}
            </Card>
          </div>
        )}

        {(assets_under_mgmtVal !== null || foundedVal !== null) && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title=''>
              {assets_under_mgmtVal !== null && (
                <div className='row '>
                  <span className='col-6 customSubHeadersInCards'>AUM: </span>
                  <span className='col-6'>{assets_under_mgmtVal}</span>
                </div>
              )}
              {foundedVal !== null && (
                <div className='row '>
                  <span className='col-6 customSubHeadersInCards'>
                    Founded:
                  </span>
                  <span className='col-6'>{foundedVal}</span>
                </div>
              )}
            </Card>
          </div>
        )}

        {(websiteVal !== null || emailVal !== null) && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title=''>
              {websiteVal !== null && (
                <div className='row'>
                  <span className='col-4 customSubHeadersInCards'>
                    Website:
                  </span>
                  <a
                    className='col-8 text-secondary'
                    href={`https://${websiteVal}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {websiteVal}
                  </a>
                </div>
              )}
              {emailVal !== null && (
                <div className='row'>
                  <span className='col-4 customSubHeadersInCards'>Email: </span>
                  <a
                    className='col-8 text-secondary'
                    href={`mailto:${emailVal}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {emailVal}
                  </a>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      <div className='col-md-12 col-12 my-3'>
        <Card title='About' smalltitle='' addedClass=''>
          {aboutVal !== null ? (
            <div className='pt-2 row'>
              <span>{aboutVal}</span>
            </div>
          ) : (
            <div>&quot;{msgConst.NORECORDS}&quot;</div>
          )}
        </Card>
      </div>

      <div className='row'>
        {(focused_typeVal !== null || number_activism_campaignVal !== null) && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title='Activism Summary'>
              {focused_typeVal !== null && (
                <div className='row '>
                  <span className='col-6 customSubHeadersInCards'>
                    Activist Focus:
                  </span>
                  <span className='col-6'>{focused_typeVal}</span>
                </div>
              )}
              <div className='row  card2'>
                <span className='col-6 customSubHeadersInCards'>
                  Activist Campaigns:
                </span>
                <span className='col-6'>{number_activism_campaignVal}</span>
              </div>
            </Card>
          </div>
        )}

        {(has_voting_dataVal !== null || total_votesVal !== null) && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title='Voting Summary'>
              {has_voting_dataVal !== null && (
                <div className='row '>
                  <span className='col-6 customSubHeadersInCards'>
                    Discloses Proxy Voting:
                  </span>
                  {has_voting_dataVal === NUMBER_ONE && (
                    <span className='col-6'>Yes</span>
                  )}
                  {has_voting_dataVal === NUMBER_ZERO && (
                    <span className='col-6'>No</span>
                  )}
                </div>
              )}
              <div className='row  card2'>
                <span className='col-6 customSubHeadersInCards'>
                  Voting records:
                </span>
                <span className='col-6'>{total_votesVal}</span>
              </div>
            </Card>
          </div>
        )}

        {number_short_campaignVal !== null && (
          <div className='d-flex col-md-4 col-12 my-2'>
            <Card title='Activist Shorts Summary'>
              <div className='row  card2'>
                <span className='col-6 customSubHeadersInCards'>
                  Activist Short Campaigns:
                </span>
                <span className='col-6'>{number_short_campaignVal}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Page>
  );
};
export default withRouter(InvestorOverview);
