import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import PropTypes from 'prop-types';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

// import 'react-virtualized/styles.css';
// import 'react-virtualized-select/styles.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const DropdownVirtualized = (props) => {
  const bem = bn.create(`search-form${props.disabled ? '-disabled' : ''}`);

  const reactSelectStyles = {
    container: (provided, state) => ({
      ...provided,
      padding: 0,
      height: 'fit-content',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      minHeight: '100px',
      '::-webkit-scrollbar': {
        width: '10px',
        'background-color': '#ffffff',
      },
      '::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      },
      '::-webkit-scrollbar-thumb': {
        'background-color': '#183f74',
        border: '2px solid #ffffff',
      },
    }),
    // option: (styles, { isFocused, isSelected }) => ({
    //   ...styles,
    //   background: isFocused
    //     ? 'hsla(291, 64%, 42%, 0.5)'
    //     : isSelected
    //     ? 'hsla(291, 64%, 42%, 1)'
    //     : undefined,
    //   zIndex: 1
    // }),
    control: (provided, state) => ({
      ...provided,
      minHeight: 'fit-content',
      height: 'fit-content',
    }),
  };

  const DropdownIndicator = () => (
    <div className='select-arrow-zone'>
      <div className='select-arrow'>
        {/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg> */}
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
    <div className={bem.b('')}>
      <VirtualizedSelect
        placeholder={props.placeholder}
        options={props.options}
        multi={props.isMulti}
        onChange={(selectValue) => props.onChange(selectValue)}
        onInputChange={props.handleOnInputChange}
        value={props.selectValue}
        disabled={props.disabled}
        components={
          props.component
            ? { component: props.component }
            : { DropdownIndicator }
        }
        style={props.style !== undefined ? props.style : reactSelectStyles}
        // maxHeight={props.maxHeight}
      />
    </div>
    </ErrorBoundary>
  );
};

DropdownVirtualized.propTypes = {
  handleOnInputChange: PropTypes.func,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.any,
  selectValue: PropTypes.any,
  disabled: PropTypes.bool,
  maxHeight: PropTypes.any,
};

DropdownVirtualized.defaultProps = {
  handleOnInputChange: () => {},
  isMulti: false,
  onChange: () => {},
  options: [],
  disabled: false,
  maxHeight: 150,
};

export default React.memo(DropdownVirtualized);
