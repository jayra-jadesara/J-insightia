import PropTypes from 'prop-types';
import React from 'react';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('checkbox');

const CheckboxComponent = (props) => (
  <ErrorBoundary>
  <div className={bem.b('')}>
    <label
      htmlFor={props.id}
      className={
        props.labelClassName !== undefined
          ? props.disabled
            ? `${props.labelClassName} text-disable`
            : props.labelClassName
          : props.disabled
          ? 'col-form-label text-primary font-weight-bold text-disable'
          : 'col-form-label text-primary font-weight-bold'
      }
    >
      <input
        type='checkbox'
        checked={props.checked}
        onChange={props.onChange}
        className={props.checkBoxClassName === undefined ? 'form-check-input p-2 me-2' : props.checkBoxClassName}
        disabled={props.disabled}
        id={props.id}
      />
      {props.labelName}
    </label>
  </div>
  </ErrorBoundary>
);

CheckboxComponent.propTypes = {
  checkBoxClassName: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labelClassName: PropTypes.string,
  labelName: PropTypes.string,
  onChange: PropTypes.func
};

CheckboxComponent.defaultProps = {
  checkBoxClassName: '',
  checked: false,
  disabled: false,
  id: null,
  labelClassName: '',
  labelName: '',
  onChange: () => {}
};

export default React.memo(CheckboxComponent);
