import PropTypes from 'prop-types';
import React from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('ddltree');

const DdlTreeSelect = ({
  options = [],
  placeholder,
  onChangeSelection,
  totalSelection = 0,
}) => (
  // const onChange = (currentNode, selectedNodes) => {
  // };
  // const onAction = (node, action) => {
  // };
  // const onNodeToggle = (currentNode) => {
  // };
  <ErrorBoundary>
    <div
      className={totalSelection > 0 ? bem.b('testingTreeSelection') : bem.b('')}
    >
      <DropdownTreeSelect
        // keepTreeOnSearch={true}
        data={options}
        texts={{ placeholder }}
        onChange={onChangeSelection}
      />
    </div>
  </ErrorBoundary>
);
DdlTreeSelect.propTypes = {
  onChangeSelection: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.any.isRequired,
  totalSelection: PropTypes.number,
};

DdlTreeSelect.defaultProps = {
  onChangeSelection: () => {},
  options: [],
  totalSelection: 0,
};

export default React.memo(DdlTreeSelect);
