import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import bn from '../../utils/bemnames';
import {
  ACTIVISM,
  SHORTS,
  VOTING,
  GOVERNANCE,
  COMPENSATION,
  VULNERABILITY,
  AMALGAMATED
} from '../../constants/DashboardSidebarTabConstant';

import productConstant from '../../constants/ProductConstants';
import WidgetGraggableConstant from '../../constants/WidgetGraggableConstant';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';
import { ARRAY_HAS_NO_LENGTH } from '../../constants/NumberConstants';

const bem = bn.create('right-sidebarmenu');

const RightMenubar = (props) => {
  const [activeKey, setActiveKey] = useState(0);
  const [mousePointer, setMousePointer] = useState(false);

  const clickEventMenu = (e) => {
    const tgt = e.target;
    const computed = window.getComputedStyle(tgt).cursor;
    if (computed !== 'all-scroll') {
      setMousePointer(true);
    }
  };

  useLayoutEffect(() => {
    const abortController = new AbortController();
    document.addEventListener('click', clickEventMenu);
    return function cleanup() {
      document.removeEventListener('click', clickEventMenu);
      abortController.abort();
    };
  }, []);

  const sidebartab = [
    {
      name: AMALGAMATED,
      isActive: props.sideBarOpen,
      isDisable: true,
      productid: productConstant.AMALGAMATED
    },
    {
      name: ACTIVISM,
      isActive: props.sideBarOpen,
      isDisable: props.isUserAccessActivisam,
      productid: productConstant.ACTIVISM
    },
    {
      name: SHORTS,
      isActive: props.sideBarOpen,
      isDisable: props.isUserAccessShorts,
      productid: productConstant.ACTIVIST_SHORTS
    },
    {
      name: VOTING,
      isActive: props.sideBarOpen,
      isDisable: props.isUserAccessVoting,
      productid: productConstant.VOTING
    },
    {
      name: GOVERNANCE,
      isActive: props.sideBarOpen,
      isDisable: props.isUserAccessGoverance,
      productid: productConstant.GOVERNANCE
    },
    // {
    //   name: COMPENSATION,
    //   isActive: props.sideBarOpen,
    //   isDisable: props.isUserAccessCompensation,
    //   productid: productConstant.COMPENSATION
    // },
    {
      name: VULNERABILITY,
      isActive: props.sideBarOpen,
      isDisable: props.isUserAccessVarneblityTab,
      productid: productConstant.ACTIVIST_VULNERABILITY
    }
  ];
  return (
    <div
      id='menubar'
      className={bem.b(!props.sideBarOpen ? 'd-none' : ' end-0 blk-main-containt flex-column slideRightToLeft')}
    >
      <div className='force-overflow scrollbar'>
        <div className='card border-0'>
          <div className='list-group list-group-flush '>
            <ErrorBoundary>
              <Accordion onSelect={(e) => setActiveKey(e)}>
                <Card className='border-0'>
                  {props.widgetListForProductSelection.length > ARRAY_HAS_NO_LENGTH &&
                    sidebartab !== undefined && sidebartab.length > ARRAY_HAS_NO_LENGTH && sidebartab.map((e, index) => (
                      <div key={`sidebartab_${index + 1}`} className={e.isActive ? ' visible' : ' d-none'}>
                        <Accordion.Toggle
                          as={Card.Header}
                          key={`AccordionToggle_${index + 1}`}
                          className='accordion-toggle w-100 d-flex'
                          eventKey={index + 1}
                        >
                          <div className='section-header flex-grow-1'>{e.name}</div>
                          {activeKey === index + 1 ? (
                            <div className='section-header bi bi-chevron-down end-0' />
                          ) : (
                            <div className='section-header bi bi-chevron-right end-0' />
                          )}
                        </Accordion.Toggle>

                        {props.widgetListForProductSelection !== undefined && props.widgetListForProductSelection.length > ARRAY_HAS_NO_LENGTH && props.widgetListForProductSelection.map((item, index2) => (
                          <Accordion.Collapse key={`AccordionCollapse_${index2 + 1}`} eventKey={index + 1}>
                            <div key={`inner${index2 + 1}`}>
                              {/* uncomment to bring back sub headings for menu items */}
                              {/* {item.tab.filter((ta) => ta.product_id === e.productid).length > ARRAY_HAS_NO_LENGTH ? (
                                <div className='card-header'>{item.Section_name}</div>
                              ) : (
                                ''
                              )} */}
                              {item.tab && item.tab
                                .filter((ta) => ta.product_id === e.productid).length > ARRAY_HAS_NO_LENGTH && item.tab
                                .filter((ta) => ta.product_id === e.productid)
                                .map((t, i) => {
                                  if (t.dashboard_widget_id !== 46 && t.dashboard_widget_id !== 44 && t.dashboard_widget_id !== 12) {
                                    return (
                                      <div
                                        key={`dv_${i + 1}`}
                                        className={
                                          e.isDisable
                                            ? props.dashboardSelection.some(
                                                (e) => Number(e.dashboard_widget_id) === t.dashboard_widget_id
                                              )
                                              ? 'grid-stack-item cursor-all-scroll flex-grow-1 list-group-item ui-draggable p-0'
                                              : 'grid-stack-item cursor-all-scroll flex-grow-1 list-group-item ui-draggable selected p-0'
                                            : 'list-group-item bg-disable text-disable-text disable p-0'
                                        }
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        data-gs-locked={mousePointer}
                                        gs-w={t.width}
                                        gs-h={t.height}
                                        data-dashboard-widget-name={t.Name}
                                        data-dashboard-widget-id={t.dashboard_widget_id}
                                        dashboard_widget_id={t.dashboard_widget_id}
                                        dashboard_widget_link_id=''
                                        dashboard_title={t.Name}
                                        gs-id=''
                                        title={
                                          e.isDisable ? '' : WidgetGraggableConstant.TOOLTIP_MESSAGE_FOR_UNSUBSCRIBE_USER
                                        }
                                        draggable={e.isDisable ? 'true' : 'false'}
                                        onDragStart={(event) => {
                                          event.dataTransfer.setData(
                                            WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_WIDGET_NAME,
                                            t.Name
                                          );
                                          event.dataTransfer.setData(
                                            WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_WIDGET_ID,
                                            t.dashboard_widget_id
                                          );
                                          event.dataTransfer.setData(
                                            WidgetGraggableConstant.ATTRIBUTE_DASHBOARD_WIDGET_LINK_ID,
                                            ''
                                          );
                                        }}
                                        onDragEnd={() => {}}
                                      >
                                        <div className='grid-stack-item-content ui-draggable-handle'>
                                          {t.Name}
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          </Accordion.Collapse>
                        ))}
                      </div>
                    ))}
                </Card>
              </Accordion>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

RightMenubar.propTypes = {
  activisamTab: PropTypes.any.isRequired,
  dashboardSelection: PropTypes.array,
  goveranceTab: PropTypes.any,
  handleSidebarTab: PropTypes.func,
  isUserAccessActivisam: PropTypes.bool,
  isUserAccessGoverance: PropTypes.bool,
  isUserAccessCompensation: PropTypes.bool,
  isUserAccessShorts: PropTypes.bool,
  isUserAccessVarneblityTab: PropTypes.bool,
  isUserAccessVoting: PropTypes.bool,
  shortsTab: PropTypes.any.isRequired,
  varneblityTab: PropTypes.any.isRequired,
  votingTab: PropTypes.any.isRequired,
  widgetListForProductSelection: PropTypes.array
};

RightMenubar.defaultProps = {
  dashboardSelection: [],
  handleSidebarTab: () => {},
  isUserAccessActivisam: false,
  isUserAccessGoverance: false,
  isUserAccessCompensation: false,
  isUserAccessShorts: false,
  isUserAccessVarneblityTab: false,
  isUserAccessVoting: false,
  widgetListForProductSelection: []
};

export default RightMenubar;
