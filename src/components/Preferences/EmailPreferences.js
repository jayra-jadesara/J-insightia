import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../GeneralForm/CheckboxComponent';
import { SavePreferencesV3 } from '../../utils/preferences-util';

const EmailPreferences = (props) => {
  const handleClick = async (e, isChild) => {
    let newArray = [];
    let newScndArray = [];
    if (!isChild) {
      // child
      newArray = props.emailListItems.map((item) =>
        item.children !== undefined && item.children.length > 0
          ? {
              ...item,
              children: item.children.map((childitem) =>
                childitem.id === e.target.id ? { ...childitem, checked: !childitem.checked } : childitem
              )
            }
          : item
      );
      newScndArray = newArray;
    } else {
      // parent
      newArray = props.emailListItems.map((item) =>
        item.id === e.target.id ? { ...item, checked: !item.checked } : item
      );
      newScndArray = newArray.map((item) =>
        item.children !== undefined && item.children.length > 0 && item.id === e.target.id
          ? {
              ...item,
              isOpen: !item.isOpen,
              children: !item.isOpen
                ? item.children.map((childitem) =>
                    // return { ...childitem, checked: false };
                    ({ ...childitem })
                  )
                : item.children
            }
          : item
      );
    }
    await props.handleEmailPreferences(newScndArray);
    SavePreferencesV3(newScndArray);
  };

  return (
    <div>
      {props.emailListItems !== undefined &&
        props.emailListItems.map((element, index) => (
          <div key={`key${index + 1}`}>
            {/* parent */}
            <div className='d-flex' key={`flex${index + 1}`}>
              <div className='m-0 me-2'>
                <Checkbox
                  checked={element.checked}
                  onChange={(e) => {
                    !element.disabled && handleClick(e, true);
                  }}
                  disabled={element.disabled}
                  labelName={element.name}
                  labelClassName='col-12 pt-0 pb-0 m-0 col-form-label text-primary font-weight-bold'
                  id={element.id}
                />
              </div>
            </div>

            {element.isOpen &&
              element.children !== undefined &&
              element.children.length > 0 &&
              element.children.map((childElement, index) => (
                // child show hide
                <div className='d-flex ms-4' key={`ms${index + 1}`}>
                  <div className='m-0 me-2'>
                    <Checkbox
                      checked={childElement.checked}
                      onChange={(e) => {
                        handleClick(e, false);
                      }}
                      disabled={childElement.disabled}
                      labelName={childElement.name}
                      labelClassName='col-12 pt-0 pb-0 m-0 col-form-label text-primary font-weight-bold'
                      id={childElement.id}
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

EmailPreferences.propTypes = {
  emailListItems: PropTypes.array,
  handleEmailPreferences: PropTypes.func
};

EmailPreferences.defaultProps = {
  emailListItems: [],
  handleEmailPreferences: () => {}
};

export default React.memo(EmailPreferences);
