import React from 'react';
import bn from '../../../utils/bemnames';
import DropdownList from '../../GeneralForm/DropdownList';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';

const bem = bn.create('dashboard');

const TitleDropDown = ({ handleChangeDashboardId, ...props }) => {
  const DropdownIndicator1 = () => (
    <div className='select-arrow-zone'>
      <div className='select-arrow'>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 16 16'
          className='bi bi-caret-down-fill'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
        </svg>
      </div>
    </div>
  );
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  const DropDownstyle = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: 'none',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#183f74',
    }),
    menuList: (base) => ({
      ...base,
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
    option: (base) => ({
      ...base,
      fontSize: width > breakpoint ? '20px' : '14px',
    }),
  };
  const handleTitleChange = (e) => {
    handleChangeDashboardId(e);
  };

  return (
    <div className={bem.b('')}>
      <div className='row '>
        <div className='col-xl-7 col-lg-8'>
          <div className='row'>
            <h1 className='cr-title__title'>
              <div className=''>
                <DropdownList
                  options={props.dashboardIdOptions}
                  Dvalue={[props.dashboardID]}
                  handleChange={(e) => {
                    if (e !== null) {
                      handleTitleChange(e);
                    }
                  }}
                  style={DropDownstyle}
                  component={DropdownIndicator1}
                  maxHeight={250}
                  isClearable={false}
                />
              </div>
            </h1>
          </div>
        </div>
        <div className='col-xl-5 col-lg-4' />
      </div>
    </div>
  );
};

TitleDropDown.propTypes = {};

export default React.memo(TitleDropDown);
