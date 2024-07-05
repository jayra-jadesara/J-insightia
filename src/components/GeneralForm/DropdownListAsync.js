import React from 'react';
import AsyncSelect from 'react-select/async';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('dropdownListAsync');

const DropdownListAsync = (props) => {
  const loadOptions = (inputValue) => {
    if (inputValue.length > 2) {
      return props.loadOptions(inputValue).then((res) => res.data);
    }
  };

  const defaultStyles = {
    control: (base) => ({
      ...base
    }),
    menu: (base) => ({
      ...base
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: `${props.maxHeight ? props.maxHeight : 400}px` // your desired height
    })
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
      <AsyncSelect
        cacheOptions
        defaultOptions={props.defaultOptions}
        isMulti={props.isMulti}
        value={props.selectedValue}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value}
        loadOptions={loadOptions}
        onInputChange={props.handleInputChange}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        components={{ DropdownIndicator }}
        maxMenuHeight={props.maxHeight}
        styles={defaultStyles}
        isClearable
        isDisabled={props.disabled}
      />
    </div>
    </ErrorBoundary>
  );
};

export default React.memo(DropdownListAsync);
