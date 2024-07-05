import React, { useEffect } from 'react';
import D3StackedBarChart from '../../GeneralForm/D3StackBarChart';
import FilterInvestor from './FilterInvestor';
import FilterCompany from './FilterCompany';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const WidgetStackedBarChart = (props) => {
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, [props.widgetData]);

  return (
    <div className='custom-gridstack'>
      <ErrorBoundary>
      <FilterCompany {...props} />
      <FilterInvestor {...props} />

      <div className='d-flex justify-content-between py-2'>
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
              Investor Filter
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
              Company Filter
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
      </div>
      <div className='align-down h-100 pt-4 custom-gridstack-chart mx-0 px-5'>
        <D3StackedBarChart
          IsShowCard={false}
          hideExcelDownloadIcon
          cardtitle={props.cardTitle}
          data={props.widgetData}
          keys={props.allKeys}
          dataLegends={['Settlement Seats Won', 'Went to Vote Seats Won']}
          xkey={props.xkey}
          isComp={props.isComp}
          isInvest={props.isInvest}
          isShowLegend
          handleComapnyCog={() => {
            props.HandleFilterModel(true);
            props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id);
            props.handleReset();
          }}
          handleInvestorCog={() => {
            props.HandleInvestorFilterModel(true);
            props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id);
            props.handleReset();
          }}
        />
      </div>
      </ErrorBoundary>
    </div>
  );
};

export default React.memo(WidgetStackedBarChart);
