import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { configToken, sendPageNotFoundVisitorsLog } from '../config/server-config';
import { history } from '../utils/navigation-util';
import { HEADING, SECOND_HEADING, DETAILS, LINK_LABEL } from '../constants/NotFoundPageConstant';
import { TOKEN } from '../constants/GeneralConstant';
import PathsConstant, { DASHBOARD } from '../constants/PathsConstant';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: '',
      url: window.location.href,
      errors: 'Page Not Found!'
    };

    try {
      const decode = jwt.decode(window.localStorage.getItem(TOKEN));
      this.state.userid = decode.User_Id;
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      history.push(PathsConstant.CREDENTIAL_FORM);
    }
  }

  componentDidMount() {
    this.sendVisitorLog();
  }

  sendVisitorLog = () => {
    axios.post(sendPageNotFoundVisitorsLog, this.state, configToken);
  };

  render() {
    return (
      <Page className='notfound'>
        <div className='h-50 row align-items-center justify-content-center text-center'>
          <div className='col'>
            <h1>{HEADING}</h1>
            <h3>{SECOND_HEADING}</h3>
            <h5>{DETAILS}</h5>
            <Link className='text-secondary' to={DASHBOARD}>
              {LINK_LABEL}
            </Link>
          </div>
        </div>
      </Page>
    );
  }
}
export default NotFound;
