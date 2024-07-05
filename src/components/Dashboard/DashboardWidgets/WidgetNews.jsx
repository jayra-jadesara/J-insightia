import React, { useEffect } from 'react';
// import MultiNewsComponent from '../../News/Components/MultiNewsComponent';
import DashboardNewsIndivisual from '../../News/Components/DashboardNewsIndivisual';

import bn from '../../../utils/bemnames';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import { ARRAY_HAS_NO_LENGTH } from '../../../constants/NumberConstants';

const bem = bn.create('');

const WidgetNews = (props) => {
  const newsDetailsItems =
    props.widgetData !== undefined &&
    props.widgetData.length > ARRAY_HAS_NO_LENGTH &&
    props.widgetData.map((item, i) => (
      <div key={`divDashboard${i + 1}`} className='col-4 custom-gridstack-news'>
        <DashboardNewsIndivisual
          key={`Dashboard${i + 1}`}
          newsid={item.newsid}
          itemDetails={item}
          productId={item.productId}
        />
      </div>
    ));

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, [props.widgetData, newsDetailsItems]);

  return (
    <div className={bem.b('')}>
      <div className='d-flex justify-content-between custom-gridstack'>
      <ErrorBoundary>
        <span className='titleSelection'>{props.cardTitle}</span>
        <div className='flex-row'>
          {props.isInvest && (
            <span
              className={`${
                props.isInvestorFilter
                  ? 'filterSelection btn order-1 font-weight-bold'
                  : 'filterSelection btn order-1'
              }`}
              onClick={() => {
                if (props.invFiltervalue !== null) {
                  props.GetInvestorSearchSelection(props.invFiltervalue);
                  props.HandleInvestorFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                } else {
                  props.handleReset();
                  props.HandleInvestorFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                }
              }}
            >
              Investor Filter{' '}
              <span
                className={`${
                  props.isInvestorFilter
                    ? 'bi bi-funnel-fill'
                    : 'bi bi-chevron-down'
                }`}
              />
            </span>
          )}
          {props.isComp && (
            <span
              className={`${
                props.isCompanyFilterd
                  ? 'filterSelection btn order-2 font-weight-bold'
                  : 'filterSelection btn order-2'
              }`}
              onClick={() => {
                if (props.cmpFiltervalue !== null) {
                  props.getAllCompanySearchSelection(props.cmpFiltervalue);
                  props.HandleFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                } else {
                  props.handleReset();
                  props.HandleFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                }
              }}
            >
              Company Filter{' '}
              <span
                className={`${
                  props.isCompanyFilterd
                    ? 'bi bi-funnel-fill'
                    : 'bi bi-chevron-down'
                }`}
              />
            </span>
          )}
        </div>
      </ErrorBoundary>
      </div>

      <div className='row'>{newsDetailsItems}</div>
    </div>
  );
};

export default React.memo(WidgetNews);
