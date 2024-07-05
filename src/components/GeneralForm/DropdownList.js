import React from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const DropdownList = ({
  isMulti,
  options,
  handleChange,
  handleInputChange,
  placeholder,
  maxHeight,
  Dvalue,
  style,
  component,
  fullWidth,
  className,
  TrialUser,
  selectedValue,
  customSelectedValue,
  disabled,
  isClearable,
  classNames,
}) => {
  const bem = bn.create(`dropdownList${disabled ? '-disabled' : ''}`);

  const DropdownIndicator = () => (
    <div className='select-arrow-zone'>
      <div className='select-arrow'>
        {/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg> */}
      </div>
    </div>
  );

  const MultiValueRemove = (props) => (
    <components.MultiValueRemove {...props}>
      <div
        style={{
          paddingLeft: '3px',
          paddingRight: '3px',
          fontSize: 'x-small',
          fontWeight: 'bold',
        }}
      >
        X
      </div>
    </components.MultiValueRemove>
  );
  const DropdownIndicator1 = (props) => (
    <components.DropdownIndicator {...props}>
      <i className='bi bi-chevron-down' />
    </components.DropdownIndicator>
  );

  const reactSelectStyles = {
    menuList: (base) => ({
      ...base,
      padding: 0,
      minHeight: '100px',
      '::-webkit-scrollbar': {
        width: '10px',
        backgroundColor: '#ffffff',
      },
      '::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#183f74',
        border: '2px solid #ffffff',
      },
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: 'fit-content',
      height: 'fit-content',
    }),
  };

  if (typeof selectedValue === 'object' || customSelectedValue) {
    return (
      <ErrorBoundary>
        <div className={bem.b(`${classNames}`)}>
          <Select
            cacheOptions
            defaultOptions
            isMulti={isMulti}
            value={selectedValue}
            options={options}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            onInputChange={handleInputChange}
            onChange={handleChange}
            placeholder={placeholder}
            components={component ? { component } : { DropdownIndicator }}
            maxMenuHeight={maxHeight}
            defaultValue={Dvalue}
            styles={style !== undefined ? style : reactSelectStyles}
            menuPlacement='auto'
            className={`${className} ${fullWidth ? 'w-100' : ''}`}
            isDisabled={disabled}
            isClearable={isClearable !== undefined ? isClearable : true}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={bem.b(`${classNames}`)}>
        <Select
          cacheOptions
          defaultOptions
          isMulti={isMulti}
          options={options}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          onInputChange={handleInputChange}
          onChange={handleChange}
          placeholder={placeholder}
          components={component ? { component } : { DropdownIndicator }}
          maxMenuHeight={maxHeight}
          defaultValue={Dvalue}
          value={Dvalue}
          menuPlacement='auto'
          styles={style !== undefined ? style : reactSelectStyles}
          className={`${className} ${fullWidth ? 'w-100' : ''}`}
          isDisabled={disabled}
          isClearable={isClearable !== undefined ? isClearable : true}
        />
      </div>
    </ErrorBoundary>
  );
};

DropdownList.propTypes = {
  isMulti: PropTypes.bool,
  selectedValue: PropTypes.func,
  options: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxHeight: PropTypes.number,
  Dvalue: PropTypes.any,
  style: PropTypes.any,
  component: PropTypes.any,
  classNames: PropTypes.string,
};

DropdownList.defaultProps = {
  isMulti: false,
  handleInputChange: () => {},
  selectedValue: () => {},
  placeholder: 'Start typing to search...',
  maxHeight: 180,
  classNames: '',
  options: undefined,
};

export default React.memo(DropdownList);
