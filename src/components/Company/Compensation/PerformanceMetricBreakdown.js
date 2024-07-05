import React, { useEffect, useState, useCallback, useMemo } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import UnderConstruction from '../../../pages/UnderConstruction';
import DropdownList from '../../GeneralForm/DropdownList';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { numberWithCommasHandleNulls } from '../../../utils/table-tools-util';

const PerformanceMetricBreakdown = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  let count = 2;
  const [data, setData] = useState(0);
  useEffect(() => {
    setData(props.isScrollLoading);
  }, [props.isScrollLoading, props.tblPerformanceMetricData]);
  window.addEventListener('scroll', () => {
    updateScroll(Number((window.innerHeight + window.scrollY).toFixed(0)), document.body.offsetHeight);
  });

  const updateScroll = async (wndows, body) => {
    if (wndows >= body) {
      props.handleScrollDownData(count * 10);
      count += 1;
    }
  };
  const tableData1 = useMemo(() => {
    const a = 123;
    return (
      <>
        {props.tblPerformanceMetricData !== undefined &&
          props.tblPerformanceMetricData.map((item, i) => (
            <div className={`pt-1 pb-2 table_${i}`} id={i}>
              <Table
                gridOptions={GetGridOption(item.data)}
                title={item.position !== null ? `${item.position}` : ''}
                extratitle={<span className={props.TrialStatus ? 'blurrytext' : ''}>{item.director_name ? item.director_name : ''}</span>}
                pageTitle={item.director_name !== null ? item.director_name : ''}
                hideExcelDownloadIcon={false}
              />
            </div>
          ))}
      </>
    );
  }, [props.tblPerformanceMetricData]);

  function GetGridOption(data) {
    const gridOptionsPerformanceMetricBreakDown = {
      colDefsMedalsIncluded: [
        {
          headerName: 'Plan',
          field: 'plan',
          cellClass: props.TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
        : 'ws-normal-lh24 ps-1 pe-1',
          minWidth: 200,
          maxWidth: query.print ? 110 : null,
          // type: ['dateColumn']
        },
        {
          headerName: 'Incentive Type',
          field: 'incentive_type',
          cellClass: props.TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
        : 'ws-normal-lh24 ps-1 pe-1',
          minWidth: 250,
          maxWidth: query.print ? 110 : 280,
        },
        {
          headerName: 'Metric',
          field: 'metric',
          cellClass: props.TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
        : 'ws-normal-lh24 ps-1 pe-1',
          minWidth: 110,
          maxWidth: query.print ? 110 : null,
        },
      ],
      // columnTypes: filters,
      colDefsMedalsExcluded: [],
      pinColumns: {
        isPinOption: false,
        columns: [{}],
      },
      paggination: { isPagging: false, pageSize: 20 },
      isfloatingFilter: false,
      rowData:
        data !== undefined &&
        data.map((x) => ({
          ...x,
          TrialStatus: props.TrialStatus,
          maximum_requirment:
            x.maximum_requirment !== null
              ? x.unit !== null
                ? x.unit === '%'
                  ? `${x.maximum_requirment}${x.unit}`
                  : `${x.unit}${Math.floor(x.maximum_requirment)}`
                : x.maximum_requirment
              : null,
          target:
            x.target !== null
              ? x.unit !== null
                ? x.unit === '%'
                  ? `${x.target}${x.unit}`
                  : `${x.unit}${Math.floor(x.target)}`
                : x.target
              : null,
          threshold:
            x.threshold !== null
              ? x.unit !== null
                ? x.unit === '%'
                  ? `${x.threshold}${x.unit}`
                  : `${x.unit}${Math.floor(x.threshold)}`
                : x.threshold
              : null,
        })),
      rowSelection: 'multiple',
      domLayout: query.print ? null : 'autoHeight',
      gridHeight: query.print ? null : null,
    };
    return gridOptionsPerformanceMetricBreakDown;
  }
  React.useEffect(() => {
    if (props.tblPerformanceMetricData !== undefined) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.tblPerformanceMetricData]);
  return (
    <Page key={1}>
      {/* selectionPerformanceBreackDownYear
  loadingPerformancedata */}
      <div className='' id='loadItem'>
        <div className='row align-items-center'>
          <div className='col-4'>
            <lable>Performance Metrics Policy as Disclosed in:</lable>
          </div>
          <div className='col-4'>
            <DropdownList
              handleChange={(e) => {
                if (e !== null) {
                  props.handleChangeYearDdl(e);
                }
              }}
              isMulti={false}
              options={props.ddlPerformanceBreackDownYear}
              Dvalue={props.selectionPerformanceBreackDownYear}
              disabled={props.loadingPerformancedata}
            />
          </div>
        </div>
        {props.tblPerformanceMetricData !== undefined ? (
          <>{props.tblPerformanceMetricData.length > 0 ? tableData1 : <Card>{NORECORDS}</Card>}</>
        ) : (
          <Card>{LOADING}</Card>
        )}
      </div>
    </Page>
  );
};

export default withRouter(React.memo(PerformanceMetricBreakdown));
