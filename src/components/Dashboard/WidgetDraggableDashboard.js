import PropTypes from 'prop-types';
import React, {
  createRef,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//= ===
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'gridstack/dist/gridstack-h5';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
// THEN to get HTML5 drag&drop
import 'gridstack/dist/h5/gridstack-dd-native';
// import CopanySearch from "./CompanySearch";
import bn from '../../utils/bemnames';
import WidgetGraggableConstant from '../../constants/WidgetGraggableConstant';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  ARRAY_HAS_NO_LENGTH,
  ARRAY_START_VALUE,
  NUMBER_ADJUST_ONE,
  ALPHA_RANDOM_STRING_SIZE,
  RANDOM_SUBSTRING_FROM,
  RANDOM_SUBSTRING_TO,
} from '../../constants/NumberConstants';
import {
  REMOVE_WIDGET_TIMEOUT,
  GENERATE_WIDGET_TIMEOUT,
  GENERATE_WIDGET_BOARD_TIMEOUT,
  MIN_ROW,
} from '../../constants/DashboardComstants';
import ComapnyInvestorFilterContainer from '../../features/DashboardContainer/ComapnyInvestorFilterContainer';
import pathConst from '../../constants/PathsConstant';

// import jquery from "gridstack/dist/jq/jquery";
const bem = bn.create('gridstack');

const WidgetDraggableDashboard = (props) => {
  const refs = useRef({});
  const [portalElements, setPortalElements] = useState([]);
  const addPortalElements = (newPortal) =>
    setPortalElements((state) => [...state, newPortal]);
  const serializedFull = useRef([]);

  const options = {
    alwaysShowResizeHandle:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    resizable: {
      handles: 'e, se, s, sw, w',
      // 'e' : Horizontal only
      // 's' : Vertical only
    },
    animate: true,
    dragAndDrop: true,
    dragIn: '.grid-stack-item',
    dragInOptions: {
      revert: 'invalid',
      scroll: false,
      appendTo: 'body',
      helper: 'clone',
      stack: '.draggable',
    },
    removable: '#trash', // drag-out delete class
    removeTimeout: REMOVE_WIDGET_TIMEOUT,
    minRow: MIN_ROW,
    // orig below
    // cellHeight: '6rem',
    cellHeight: '6.2rem',
    // disable float to auto pushes widgets upwards
    float: false,
    // autoFit: true,
    // autoFitByOverflow: true,

    acceptWidgets() {
      return true;
    },
    draggable: {
      handle: '.grid-stack-item-content',
      scroll: false,
      appendTo: 'body',
      containment: null,
    },
    disableResize: true,
    disableOneColumnMode: true,
  };

  const gridRef = useRef();
  const updateRefs = useCallback(() => {
    if (Object.keys(refs.current).length !== props.dashboardSelection.length) {
      for (const [key] of Object.entries(refs.current)) {
        refs.current[key] = false;
      }
      if (
        props.dashboardSelection !== undefined &&
        props.dashboardSelection.length > ARRAY_HAS_NO_LENGTH
      ) {
        props.dashboardSelection.forEach(({ id }) => {
          if (refs.current[id] === undefined) {
            refs.current[id] = createRef(false);
          } else {
            refs.current[id] = false;
          }
        });
      }
    }
  }, [props.dashboardSelection]);

  const submitreq = useCallback(
    async (dashboardLinkArray) => {
      const selectionid = await props.dashboardSubmitReq({
        dashboardName: props.txtDashboardName,
        dashboardId: props.dashboardSelectionId,
      });
      if (selectionid.payload !== false) {
        if (dashboardLinkArray !== undefined && dashboardLinkArray.length > ARRAY_HAS_NO_LENGTH) {
          dashboardLinkArray.forEach(async (e) => {
            await props.addtblDashboardWidgetLinkReq({
              ...e,
              dashboardId: selectionid.payload,
            });
          });
        }
      }
    },
    [props]
  );

  const saveFullGrid = useCallback(() => {
    gridRef.current = gridRef.current || GridStack.init(options, '.controlled');
    gridRef.current.batchUpdate();
    const dashboardLinkArray = [];
    serializedFull.current = gridRef.current.save();

    for (
      let index = ARRAY_START_VALUE;
      index <= serializedFull.current.length - NUMBER_ADJUST_ONE;
      index++
    ) {
      const element = serializedFull.current[index];
      for (
        let index2 = ARRAY_START_VALUE;
        index2 <= gridRef.current.el.children.length - NUMBER_ADJUST_ONE;
        index2++
      ) {
        if (gridRef.current.el.children[index2] === undefined) return;
        if (
          serializedFull.current[index].id ===
          gridRef.current.el.children[index2].getAttribute('gs-id')
        ) {
          const dashboard_widget_id = gridRef.current.el.children[
            index2
          ].getAttribute(WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_WIDGET_ID);
          const dashboard_widget_link_id = gridRef.current.el.children[
            index2
          ].getAttribute(
            WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_WIDGET_LINK_ID
          );
          const title = gridRef.current.el.children[index2].getAttribute(
            WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_TITLE
          );
          const data = {
            w: element.w,
            h: element.h,
            x: element.x,
            y: element.y,
            id: element.id,
            dashboard_widget_id: Number(dashboard_widget_id),
            name: title,
            dashboard_widget_link_id,
          };
          dashboardLinkArray.push({
            dashboardId: '1',
            widgetId: Number(dashboard_widget_id),
            widgetOrder: index + NUMBER_ADJUST_ONE,
            companySearchId: null,
            investorSearchId: null,
            renameWidget: '',
            dashboardWidgetLinkId: Number(dashboard_widget_link_id),
            position: JSON.stringify(data),
          });
        }
      }
    }
    if (props.txtDashboardName.length > ARRAY_HAS_NO_LENGTH) {
      submitreq(dashboardLinkArray);
    }
    gridRef.current.commit();
  }, [props, submitreq, options]);

  const deleteWidgetSubmit = useCallback(
    (itemid, dashboard_widget_link_id, clickwidget) => {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className='react-confirm-alert-overlay fadeInAnimation fadeOutAnimation'>
            <div className='react-confirm-alert'>
              <div className='react-confirm-alert-body'>
                <h1>Delete Widget</h1>
                <div>Are you sure you want to delete this widget.</div>
                <div className='react-confirm-alert-button-group'>
                  <button
                    type='button'
                    onClick={async () => {
                      await delete refs.current[itemid];
                      gridRef.current.removeWidget(
                        clickwidget.target.parentNode.parentNode
                      );
                      await props.handleRemoveWidget({
                        itemid,
                        dashboard_widget_link_id,
                      });
                      onClose();
                    }}
                  >
                    Confirm
                  </button>
                  <button type='button' onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    },
    [props]
  );

  const addGridWidget = useCallback(
    (item, grid) => {
      grid.addWidget(
        `<div 
            gs-id='${item.id}'
            id='div_${item.id}'
            dashboard_widget_id=${item.dashboard_widget_id}
            dashboard_widget_link_id=${item.dashboard_widget_link_id}
            dashboard_title='${item.name}'
            gs-w=${item.w}
            gs-h=${item.h}            
            gs-x=${item.x}
            gs-y=${item.y}
            class= "grid-stack-item"
          >
            <div class="grid-stack-item-content cursor-all-scroll">
              <button 
                itemid="${item.id}" 
                dashboard_title='${item.name}' 
                dashboard_widget_link_id="${item.dashboard_widget_link_id}" 
                id="btndel_${item.id}" 
                class="widgetRemove shadow-none bi bi-trash-fill cursor-all-scroll">
              </button>
              <div 
                id="portal_${item.id}" 
                itemid="${item.id}" 
                class="cursor-auto" dashboard_title='${item.name}' 
                dashboard_widget_link_id="${item.dashboard_widget_link_id}">
              </div>
            </div>
          </div>`,
        {
          w: item.w,
          h: item.h,
          x: item.x,
          y: item.y,
        }
      );
      let computed;
      $('.grid-stack-item-content')
        .mousedown(async (e) => {
          const tgt = e.target;
          computed = window.getComputedStyle(tgt).cursor;
          if (computed === 'all-scroll') {
            grid.enableMove(true);
          } else {
            grid.enableMove(false);
          }
        })
        .mouseup(async (e) => {
          const tgt = e.target;
          computed = window.getComputedStyle(tgt).cursor;
          if (computed === 'all-scroll') {
            grid.enableMove(false);
          } else {
            grid.enableMove(true);
          }
        });

      $(`#btndel_${item.id}`).on('click', async (e) => {
        const itemid = e.target.getAttribute('itemid');
        const dashboard_widget_link_id = e.target.getAttribute(
          'dashboard_widget_link_id'
        );
        await deleteWidgetSubmit(
          itemid,
          dashboard_widget_link_id,
          e,
          gridRef.current
        );
      });
      return document.getElementById(`portal_${item.id}`);
    },
    [deleteWidgetSubmit]
  );

  useEffect(() => {
    async function getdata() {
      if (props.refresh) {
        saveFullGrid();
        props.setRefresh(!props.refresh);
      }
    }
    getdata();
  }, [
    props.companySearchOptionSelection,
    props.investorSearchOptionsSelection,
  ]);
  if (gridRef.current !== undefined && gridRef.current !== null) {
    gridRef.current.on('dragstop', async () => {
      saveFullGrid();
    });
  }
  useEffect(() => {
    const abortController = new AbortController();
    const drawWidget = async () => {
      await updateRefs();
      if (window.location.pathname !== pathConst.DASHBOARD) return;
      gridRef.current =
        gridRef.current || GridStack.init(options, '.controlled');
      if (gridRef.current === null && gridRef.current === undefined) return;
      gridRef.current.batchUpdate();

      if (
        props.dashboardSelection !== undefined &&
        props.dashboardSelection.length > ARRAY_HAS_NO_LENGTH
      ) {
        props.dashboardSelection.forEach(async (item, index) => {
          const domNode = document.getElementById(`portal_${item.id}`);
          if (!domNode) {
            if (refs.current[item.id] !== true) {
              if (props.widgetList.length > ARRAY_HAS_NO_LENGTH) {
                await addPortalElements(
                  ReactDOM.createPortal(
                    await getComponent(item, props, index),
                    await addGridWidget(item, gridRef.current, props, index)
                  )
                );
              }
            }
          }
          refs.current[item.id] = true;
        });

        for (const [key, value] of Object.entries(refs.current)) {
          const domDeletion = document.getElementById(`portal_${key}`);
          if (domDeletion && !value) {
            gridRef.current.removeWidget(
              domDeletion.parentElement.parentElement
            );
          }
        }
        props.setRefresh(!props.refresh);
      }
      gridRef.current.commit();

      gridRef.current.on('dropped', async (event, previousWidget, newWidget) => {
        const dashboard_widget_id = newWidget.el.dataset.dashboardWidgetId;
        const { dashboardWidgetName } = newWidget.el.dataset;
        const randomId = Math.random()
          .toString(ALPHA_RANDOM_STRING_SIZE)
          .substr(RANDOM_SUBSTRING_FROM, RANDOM_SUBSTRING_TO);
        newWidget.el.dataset.gsId = randomId;
        const content = newWidget.el.querySelector('.grid-stack-item-content');
        content.innerHTML = '';
        setTimeout(async () => {
          if (dashboardWidgetName) {
            let widgetTitle = dashboardWidgetName;
            const currentWidget = props.widgetList !== undefined && props.widgetList.filter((e) => e.dashboard_widget_id === Number(dashboard_widget_id));
            const currentWidgetSelectionIndex = currentWidget.length;

              if (currentWidgetSelectionIndex > ARRAY_HAS_NO_LENGTH) {
                widgetTitle = dashboardWidgetName;
              }
              const data = {
                dashboardId: null,
                widgetId: dashboard_widget_id,
                widgetOrder: currentWidgetSelectionIndex + NUMBER_ADJUST_ONE,
                companySearchId: null,
                investorSearchId: null,
                renameWidget: '',
                dashboardWidgetLinkId: null,
                position: JSON.stringify({
                  w: currentWidget[ARRAY_START_VALUE].width || newWidget.width,
                  h:
                    currentWidget[ARRAY_START_VALUE].height || newWidget.height,
                  x: newWidget.x,
                  y: newWidget.y,
                  id: randomId,
                  dashboard_widget_id,
                  name: widgetTitle,
                  dashboard_widget_link_id: '',
                  download:
                    currentWidget[ARRAY_START_VALUE].DownloadStoredProcedure,
                }),
              };
              const res_dashboard_widget_link_id =
                await props.addtblDashboardNewWidgetLinkReq(data);

              if (res_dashboard_widget_link_id.payload) {
                // removes empty frame then refreshes all of the widgets, giving the illusion it is loading in
                gridRef.current.removeWidget(newWidget.el);
                props.setRefresh(!props.refresh);
              } else {
                gridRef.current.removeWidget(newWidget.el);
              }
              saveFullGrid();
            }
          }, GENERATE_WIDGET_TIMEOUT);
        }
      );
    };
    const drawer = setTimeout(() => {
      drawWidget();
    }, GENERATE_WIDGET_BOARD_TIMEOUT);
    return function cleanup() {
      abortController.abort();
      clearTimeout(drawer);
    };
  }, [
    props.widgetList,
    props.dashboardSelection.length,
    updateRefs,
    props.companySearchOptionSelection,
    props.investorSearchOptionsSelection,
  ]);

  const getComponent = useCallback(
    (item, props) => {
      const currentWidget = props.widgetList !== undefined && props.widgetList.filter((e) => e.dashboard_widget_id === Number(item.dashboard_widget_id));
      if (currentWidget.length === ARRAY_HAS_NO_LENGTH) return null;
      return (
        <ComapnyInvestorFilterContainer
          getStoredProcedureReq={props.getStoredProcedureReq}
          investor_search_id={item.investor_search_id}
          company_search_id={item.company_search_id}
          StoredProcedure={currentWidget[ARRAY_START_VALUE].StoredProcedure}
          DownloadStoredProcedure={
            currentWidget[ARRAY_START_VALUE].DownloadStoredProcedure
          }
          isInvest={currentWidget[ARRAY_START_VALUE].uses_investor_search}
          isComp={currentWidget[ARRAY_START_VALUE].uses_company_search}
          dashboard_widget_id={item.dashboard_widget_id}
          dashboard_widget_link_id={item.dashboard_widget_link_id}
          name={item.name}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          resetDashboardWidgetCompanySearch={
            props.resetDashboardWidgetCompanySearchReq
          }
          resetDashboardWidgetInvestorSearch={
            props.resetDashboardWidgetInvestorSearchReq
          }
        />
      );
    },
    [props.widgetList]
  );

  return (
    <div className='dashboardScrollbar'>
      <div
        className={bem.b('grid-stack controlled fadeInAnimation')}
        id='drop-element'
      >
        {portalElements}
      </div>
    </div>
  );
};

WidgetDraggableDashboard.propTypes = {
  addtblDashboardNewWidgetLinkReq: PropTypes.func,
  addtblDashboardWidgetLinkReq: PropTypes.func,
  dashboardSelection: PropTypes.array,
  dashboardSelectionId: PropTypes.any,
  dashboardSubmitReq: PropTypes.func,
  getUserDashboardReq: PropTypes.func,
  handleRemoveWidget: PropTypes.func,
  showFilterModel: PropTypes.any.isRequired,
  showInvestorFilterModel: PropTypes.any.isRequired,
  txtDashboardName: PropTypes.string,
  widgetListForProductSelection: PropTypes.array,
  companySearchOptionSelection: PropTypes.any,
  investorSearchOptionsSelection: PropTypes.any,
};

WidgetDraggableDashboard.defaultProps = {
  addtblDashboardNewWidgetLinkReq: () => {},
  addtblDashboardWidgetLinkReq: () => {},
  dashboardSelection: [],
  dashboardSubmitReq: () => {},
  getUserDashboardReq: () => {},
  handleRemoveWidget: () => {},
  txtDashboardName: '',
  widgetListForProductSelection: [],
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
};

export default React.memo(WidgetDraggableDashboard);
