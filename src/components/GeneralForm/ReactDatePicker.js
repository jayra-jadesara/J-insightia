import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorBoundary from './ErrorBoundary';

const ReactDatePicker = ({
  selectedDate,
  handleDateChange,
  dateFormat,
  readOnly,
  selectsStart,
  minDate,
  maxDate,
  endDate,
  selectsEnd,
  startDate,
  showYearDropdown,
  showMonthDropdown,
  useShortMonthInDropdown
}) => (
  <ErrorBoundary>
  <DatePicker
    selected={selectedDate}
    onChange={(value) => handleDateChange(new Date(value))}
    className='form-control'
    dateFormat={dateFormat}
    readOnly={readOnly}
    placeholderText='dd-MMM-yyyy'
    selectsStart={selectsStart}
    selectsEnd={selectsEnd}
    minDate={minDate || null}
    maxDate={maxDate || null}
    endDate={endDate}
    startDate={startDate}
    showYearDropdown={showYearDropdown}
    showMonthDropdown={showMonthDropdown}
    useShortMonthInDropdown={useShortMonthInDropdown}
  />
  </ErrorBoundary>
);

ReactDatePicker.propTypes = {
  dateFormat: PropTypes.string,
  endDate: PropTypes.any,
  handleDateChange: PropTypes.func,
  minDate: PropTypes.any,
  readOnly: PropTypes.bool,
  selectedDate: PropTypes.any,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  startDate: PropTypes.any,
  showYearDropdown: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  useShortMonthInDropdown: PropTypes.bool
};

ReactDatePicker.defaultProps = {
  selectedDate: new Date(),
  handleDateChange: () => null,
  dateFormat: 'dd-MMM-yyyy',
  readOnly: false,
  selectsStart: false,
  selectsEnd: false,
  minDate: new Date(),
  endDate: new Date(),
  startDate: new Date(),
  showYearDropdown: true,
  showMonthDropdown: true,
  useShortMonthInDropdown: true
};

export default React.memo(ReactDatePicker);
