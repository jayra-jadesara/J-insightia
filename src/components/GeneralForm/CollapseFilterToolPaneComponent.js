import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import bn from '../../utils/bemnames';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('collapseCardToolPane');

const CollapseFilterToolPaneComponent = (
{ isClickModal,
  open,
  handleModalClickEvent,
   withoutCollapseComponent,
   withoutCollapseWithCard,
   Heading,
   children,
   setOpen,
   index,
   isFiltered,
   level }
   ) => {
    const [isLocalOpen, setIsLocalOpen] = useState(false);

  useEffect(() => {
    if (isClickModal) {
      if (open) {
        if (document.querySelector('.iconUpDownColor')) {
          document.querySelector('.iconUpDownColor').click();
        }
      }
    }
  }, [isClickModal, open]);

  useEffect(() => {
    setIsLocalOpen(open);
  }, []);

  function ToggleHandle() {
    if (handleModalClickEvent) {
      handleModalClickEvent(false);
    }
  }

  if (withoutCollapseComponent !== undefined && withoutCollapseComponent) {
    if (withoutCollapseWithCard !== undefined && withoutCollapseWithCard) {
      return <Card title={Heading}>{children}</Card>;
    }
    return children;
  }
  return (
    <ErrorBoundary>
      <div className={`ag-group ag-filter-toolpanel-group ag-group-item-alignment-stretch ag-filter-toolpanel-group-level-${level} noAnimation`}>
        <div onClick={isLocalOpen ? null : ToggleHandle()} className={isLocalOpen ? 'collapse-card-header' : 'faqcardheader'}>
          <div className={`ag-group-title-bar ag-filter-toolpanel-group-title-bar ag-unselectable ag-filter-toolpanel-group-level-${level}-header ag-filter-toolpanel-header`}>
          <span className='ag-group-title-bar-icon ag-filter-toolpanel-group-title-bar-icon'>
            <span
              onClick={() => {
                setIsLocalOpen(!isLocalOpen);
                setOpen(Heading);
              }}
              className={
                isLocalOpen ? ' ag-icon ag-icon-tree-open' : 'text-primary ag-icon ag-icon-tree-closed'
              }
            />
          </span>
            <div
              onClick={(e) => {
                setIsLocalOpen(!isLocalOpen);
                setOpen(Heading);
              }}
              aria-controls={`collapse-text-${index}`}
              aria-expanded={isLocalOpen}
            >
              <div className='ag-group-title ag-filter-toolpanel-group-title'>{Heading}</div>
            </div>
            {isFiltered && (
                        <span className="ag-header-icon ag-filter-icon ag-filter-toolpanel-instance-header-icon" aria-hidden="true">
                          <span className="ag-icon ag-icon-filter" unselectable="on" role="presentation" />
                        </span>)
            }
          </div>
        </div>
        <Collapse in={isLocalOpen} key={Heading}>
          <div id={`collapse-text-${index}`} key={`collapse-text-${index}`} className='ag-filter-toolpanel-instance-body ag-filter'>
            {children}
          </div>
        </Collapse>
      </div>
    </ErrorBoundary>
  );
};

CollapseFilterToolPaneComponent.propTypes = {
  Heading: PropTypes.any,
  children: PropTypes.any,
  withoutCollapseComponent: PropTypes.any,
  withoutCollapseWithCard: PropTypes.any,
  index: PropTypes.any,
  isOpen: PropTypes.bool,
  headerNote: PropTypes.string
};

CollapseFilterToolPaneComponent.defaultProps = {
  isOpen: false,
  headerNote: '',
  withoutCollapseComponent: undefined,
  withoutCollapseWithCard: undefined
};

export default React.memo(CollapseFilterToolPaneComponent);
