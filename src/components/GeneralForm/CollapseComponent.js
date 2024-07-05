import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import bn from '../../utils/bemnames';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('faqhelp');
const bem2 = bn.create('collapseCard');

const CollapseComponent = (props) => {
  const { headerNote } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.isOpen === undefined) {
      setOpen(true);
    } else if (!props.isOpen) {
      setOpen(false);
    } else {
      setOpen(props.isOpen);
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.isClickModal) {
      if (open) {
        document.querySelector('.iconUpDownColor').click();
      }
    }
  }, [props.isClickModal, open]);

  function ToggleHandle() {
    if (props.handleModalClickEvent) {
      props.handleModalClickEvent(false);
    }
  }

  if (
    props.withoutCollapseComponent !== undefined &&
    props.withoutCollapseComponent
  ) {
    if (
      props.withoutCollapseWithCard !== undefined &&
      props.withoutCollapseWithCard
    ) {
      return <Card title={props.Heading}>{props.children}</Card>;
    }
    return props.children;
  }

  return (
    <ErrorBoundary>
    <div className={props.isCardStyle ? bem2.b('') : bem.b('')}>
      <div className='row definitionMain'>
        <div
          onClick={open ? null : ToggleHandle()}
          className={open ? 'collapse-card-header' : 'faqcardheader'}
        >
          <div className='mb-0 w-100'>
            <div
              className='col-12 col-md-12 col-sm-12 btn btn-link text-start btnOutlineNone p-3'
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
              aria-controls={`collapse-text-${props.index}`}
              aria-expanded={open}
            >
              <h3>{props.Heading}</h3>
            </div>
          </div>

          {headerNote !== undefined && open === false && (
            <p className='lable-subscription'>{headerNote}</p>
          )}

          <span
            onClick={() => setOpen(!open)}
            className={
              open
                ? 'iconUpDownColor text-primary bi bi-dash p-3'
                : 'iconUpDownColor text-primary bi bi-plus p-3'
            }
          />
        </div>
        <Collapse in={open}>
          <div
            id={`collapse-text-${props.index}`}
            className='pb-2 pt-2 cardBody'
          >
            {props.children}
          </div>
        </Collapse>
      </div>
    </div>
    </ErrorBoundary>
  );
};

CollapseComponent.propTypes = {
  Heading: PropTypes.any,
  children: PropTypes.any,
  withoutCollapseComponent: PropTypes.any,
  withoutCollapseWithCard: PropTypes.any,
  index: PropTypes.any,
  isOpen: PropTypes.bool,
  headerNote: PropTypes.string,
};

CollapseComponent.defaultProps = {
  isOpen: false,
  headerNote: '',
  withoutCollapseComponent: undefined,
  withoutCollapseWithCard: undefined,
};

export default React.memo(CollapseComponent);
