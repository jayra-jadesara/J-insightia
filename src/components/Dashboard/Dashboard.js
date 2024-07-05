import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import bn from '../../utils/bemnames';
import RightMenubar from './RightMenubar';
import WidgetDraggable from './WidgetDraggableDashboard';
import Page from '../Page';
import VotingPortal from './Components/VotingPortal';
import ActivismPortal from './Components/ActivismPortal';
import GovernancePortal from './Components/GovernancePortal';
import ESGPortal from './Components/ESGPortal';
import VulnerabilityPortal from './Components/VulnerabilityPortal';
import ActivistShortsPortal from './Components/ActivistShortsPortal';
import prodConst from '../../constants/ProductConstants';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';
import { ARRAY_HAS_NO_LENGTH } from '../../constants/NumberConstants';

const bem = bn.create('dashboard');

const Dashboard = (props) => {
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {props.dashboardID.value === prodConst.INSIGHTIA_DASHBOARD_PORTAL && (
        <div key={props.dashboardID.value} className={bem.b('d-flex noStickyHeader')} id='dashboard'>
          <div title='Dashboard' id='draggableArea' className='flex-grow-1 dashboardDraggable'>
            <div className='row'>
              <div className='end-0'>
                <button type='button' className='dashboard-sidebar-button' onClick={() => props.handleSideBar()}>
                  <span className={props.sideBarOpen ? 'no-slideout' : 'slideout'}>Add Widgets</span>
                  {props.widgetList !== undefined && props.widgetList.length > ARRAY_HAS_NO_LENGTH ? (
                    <span className={props.sideBarOpen ? 'bi bi-chevron-right' : 'bi bi-chevron-left'} />
                  ) : (
                    <span className='spinner-border spinner-border-xsm' role='status' aria-hidden='true' />
                  )}
                </button>
              </div>
            </div>
            {props.widgetList !== undefined && props.widgetList.length > ARRAY_HAS_NO_LENGTH && (
              <WidgetDraggable {...props} refresh={refresh} setRefresh={setRefresh} />
            )}
          </div>
          {props.widgetList !== undefined && props.widgetList.length > ARRAY_HAS_NO_LENGTH && (
            <RightMenubar {...props} refresh={refresh} setRefresh={setRefresh} />
          )}
        </div>
      )}

      {props.dashboardID.value === prodConst.ACTIVISM_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <ActivismPortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}

      {props.dashboardID.value === prodConst.VOTING_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <VotingPortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}

      {props.dashboardID.value === prodConst.GOVERNANCE_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <GovernancePortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}

      {props.dashboardID.value === prodConst.ESG_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <ESGPortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}

      {props.dashboardID.value === prodConst.ACTIVIST_SHORTS_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <ActivistShortsPortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}

      {props.dashboardID.value === prodConst.VULNERABILITY_PORTAL && (
        <Page key={props.dashboardID.value}>
          <div className='row'>
            <ErrorBoundary>
              <VulnerabilityPortal {...props} dashboardIDValue={props.dashboardID.value} />
            </ErrorBoundary>
          </div>
        </Page>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  activisamTab: PropTypes.any.isRequired,
  goveranceTab: PropTypes.any.isRequired,
  shortsTab: PropTypes.any.isRequired,
  varneblityTab: PropTypes.any.isRequired,
  votingTab: PropTypes.any.isRequired,
};

export default React.memo(Dashboard);
