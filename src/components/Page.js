import React, { useEffect } from 'react';
import qs from 'qs';
import PropTypes from '../utils/propTypes';
import bn from '../utils/bemnames';
import { history } from '../utils/navigation-util';
import { CREDENTIAL_FORM } from '../constants/PathsConstant';
// import PageSpinner from "../components/PageSpinner";

const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
const bem = bn.create('page');

const Page = ({ tag: Tag, className, children, ...props }) => {
  useEffect(() => {
    if (window.location.pathname !== CREDENTIAL_FORM && window.location.pathname !== '/') {
      window.sessionStorage.setItem('redirect', window.location.pathname + window.location.search);
    }
  }, []);

  const classes = bem.b(query.print ? 'px-3 bg-white' : 'px-3', className);

  return <Tag className={classes}>{children}</Tag>;
};

Page.propTypes = {
  tag: PropTypes.component,
  // title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // className: PropTypes.string,
  children: PropTypes.node
  // breadcrumbs: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string,
  //     active: PropTypes.string,
  //   })
  // ),
};

Page.defaultProps = {
  tag: 'div'
  // title: "",
};

export default React.memo(Page);
