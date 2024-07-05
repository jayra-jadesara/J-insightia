import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import D3Map from '../../GeneralForm/D3Map';
import Table from '../../GeneralForm/Table';
import FilterInvestor from './FilterInvestor';
import FilterCompany from './FilterCompany';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import numConst, { ARRAY_HAS_NO_LENGTH, ARRAY_START_VALUE } from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const WidgetMapTable = (props) => {
  const [regionList, setRegionList] = useState([]);
  const regionsArray = useRef([]);

  const [gridOptions, setGridOptions] = useState({
    colDefsMedalsIncluded: props.widgetHeaders,
    colDefsMedalsExcluded: [],
    pinColumns: [],
    groupHeaderHeight: props.groupHeaderHeight,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: regionList,
    dataUpdatesFX: true,
    getRowStyle: (params) => {
      if (params.node.rowIndex === numConst.NUMBER_ZERO) {
        return {
          fontWeight: 'bold',
          backgroundColor: 'LightGray !important',
        };
      }
    },
  });
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  useLayoutEffect(() => {
    const abortController = new AbortController();
    setGridOptions({
      colDefsMedalsIncluded: props.widgetHeaders,
      colDefsMedalsExcluded: [],
      pinColumns: [],
      groupHeaderHeight: props.groupHeaderHeight,
      headerHeight: 30,
      paggination: { isPagging: false },
      rowHeight: 32,
      isfloatingFilter: false,
      rowData: regionList,
      dataUpdatesFX: true,
      getRowStyle: (params) => {
        if (params.node.rowIndex === numConst.NUMBER_ZERO) {
          return {
            fontWeight: 'bold',
            backgroundColor: 'LightGray !important',
          };
        }
      },
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [regionList]);

  useEffect(() => {
    const abortController = new AbortController();
    if (props.widgetData !== undefined && props.widgetData.length > ARRAY_HAS_NO_LENGTH) {
        const defaultFirst = props.widgetData.filter(
          (v) => v.Country_name === 'US');
        if (defaultFirst.length) {
          regionsArray.current.push({
            Region_name: defaultFirst[ARRAY_START_VALUE].Country_name,
            year1: defaultFirst[ARRAY_START_VALUE].year1 ? defaultFirst[ARRAY_START_VALUE].year1 : 0,
            year2: defaultFirst[ARRAY_START_VALUE].year2 ? defaultFirst[ARRAY_START_VALUE].year2 : 0,
            year3: defaultFirst[ARRAY_START_VALUE].year3 ? defaultFirst[ARRAY_START_VALUE].year3 : 0,
            year4: defaultFirst[ARRAY_START_VALUE].year4 ? defaultFirst[ARRAY_START_VALUE].year4 : 0,
            year5: defaultFirst[ARRAY_START_VALUE].year5 ? defaultFirst[ARRAY_START_VALUE].year5 : 0,
            year6: defaultFirst[ARRAY_START_VALUE].year6 ? defaultFirst[ARRAY_START_VALUE].year6 : 0,
          });
        }
      props.widgetData.forEach((item) => {
        const existing = regionsArray.current.filter(
          (v) => v.Region_name === item.Region_name
        );
        if (existing.length) {
          const existingIndex = regionsArray.current.indexOf(existing[ARRAY_START_VALUE]);

          regionsArray.current[existingIndex].year1 += item.year1;
          regionsArray.current[existingIndex].year2 += item.year2;
          regionsArray.current[existingIndex].year3 += item.year3;
          regionsArray.current[existingIndex].year4 += item.year4;
          regionsArray.current[existingIndex].year5 += item.year5;
          regionsArray.current[existingIndex].year6 += item.year6;
        } else {
          regionsArray.current.push({
            Region_name: item.Region_name,
            year1: item.year1,
            year2: item.year2,
            year3: item.year3,
            year4: item.year4,
            year5: item.year5,
            year6: item.year6,
          });
        }
      });
      setRegionList([...regionsArray.current]);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [props.widgetData]);

  const onCountyClickEvent = async (e, widgetData, vregionList) => {
    const existing = widgetData.filter((v) => v.Country_name === e.label);
    if (existing.length > ARRAY_HAS_NO_LENGTH) {
      const item = existing[ARRAY_START_VALUE];
      const newRegionList = vregionList;
      // Updates the TOP row on CLICK
      newRegionList[ARRAY_START_VALUE] = {
        Region_name: item.Country_name,
        year1: item.year1 ? item.year1 : 0,
        year2: item.year2 ? item.year2 : 0,
        year3: item.year3 ? item.year3 : 0,
        year4: item.year4 ? item.year4 : 0,
        year5: item.year5 ? item.year5 : 0,
        year6: item.year6 ? item.year6 : 0,
      };
      setRegionList([...newRegionList]);
      regionsArray.current = newRegionList;
    } else {
      // FOR COUNTRIES THAT ARE NOT INCLUDED IN SP - SHOWS PREVIOUS DATA
      setRegionList([...regionsArray.current]);
    }
    return regionsArray;
  };

  if (regionList.length === numConst.EMPTY_TABLE_LENGTH || regionsArray === numConst.EMPTY_TABLE_LENGTH) return null;
  return (
    <div className='col-lg-12 col-md-12 col-sm-12'>
      <div className='custom-gridstack'>
        <ErrorBoundary>
        <FilterCompany {...props} />
        <FilterInvestor {...props} />
        <div className='row row-no-gutters'>
          <span className='titleSelection'>{props.cardTitle}</span>
        </div>
        <div className='row p-1 custom-gridstack-map'>
          <div className='col-2 mb-0'>
            <D3Map
              index={1}
              onCountyClickEvent={(e) =>
                onCountyClickEvent(e, props.widgetData, regionList)
              }
              mobileScreenStopZoom={width < breakpoint}
              tableData={regionList}
            />
          </div>
          <div className='col-10'>
            <Table
              gridOptions={gridOptions}
              IsShowCard={false}
              hideExcelDownloadIcon
            />
          </div>
        </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default React.memo(WidgetMapTable);
