import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import D3barChart from '../../GeneralForm/D3barchart';
import FilterInvestor from './FilterInvestor';
import FilterCompany from './FilterCompany';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const WidgetBarChart = (props) => {
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
      <div className='d-flex flex-row justify-content-between py-2'>
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
      </div>
      <div className='align-down h-100 pt-4 custom-gridstack-chart mx-0 px-5'>
        <D3barChart
          IsShowCard={false}
          hideExcelDownloadIcon
          title={props.cardTitle}
          xAxisName={props.xAxisName}
          yAxisName={props.yAxisName}
          keys={props.keys}
          data={props.widgetData}
          xkeysLabel={[props.xkeysLabel]}
          isComp={props.isComp}
          isInvest={props.isInvest}
          handleComapnyCog={() => {
            props.HandleFilterModel(true);
            props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
            props.handleReset();
          }}
          handleInvestorCog={() => {
            props.HandleInvestorFilterModel(true);
            props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
            props.handleReset();
          }}
          tickxAxisDashboardWrap
        />
      </div>
    </ErrorBoundary>
    </div>
  );
};

WidgetBarChart.propTypes = {
  HandleDashBoardWidgetIdSet: PropTypes.func,
  HandleFilterModel: PropTypes.func,
  HandleInvestorFilterModel: PropTypes.func,
  cardTitle: PropTypes.any,
  dashboard_widget_link_id: PropTypes.any,
  handleReset: PropTypes.func,
  isComp: PropTypes.any,
  isInvest: PropTypes.any,
  keys: PropTypes.any,
  widgetData: PropTypes.any,
  xAxisName: PropTypes.any,
  xkeysLabel: PropTypes.any,
  yAxisName: PropTypes.any,
};

export default WidgetBarChart;
