import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CollapseComponent from './CollapseComponent';
import Card from './Card';
import bn from '../../utils/bemnames';
import { GetErrorBoundryDetails } from '../../utils/dashboard-util';

const bem = bn.create('progressbar');

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    if (error) {
      const handleOnError = async (error, errorInfo) => {
        const url = window.location.href;
        await GetErrorBoundryDetails(
          url,
          error,
          errorInfo
        );
      };
      handleOnError(error.toString(), errorInfo.componentStack);

      this.setState({
        error: error,
        errorInfo: errorInfo,
        hasError: true
      });
    } else {
      this.setState({
        error: null,
        errorInfo: null,
        hasError: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.hasCard) {
        return (
              <Card title={this.props.cardtitle ? this.props.cardtitle : ''}>
                <div className={bem.b('cr-page-spinner')}>
                  <div className='progress-error w-100'>
                    <div className='w-100 text-center'>
                      <i className='bi bi-exclamation-triangle-fill' />
                      <p>Oops, something&apos;s gone wrong.  We have been made aware and will be looking into it </p>
                      <p>
                        Click&nbsp;
                        <a className='text-secondary' href={`${window.origin}`}>
                          here
                        </a>
                        &nbsp;to go back to the dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              );
      }
      return (
        <div className={bem.b('cr-page-spinner')}>
          <div className='progress-error w-50'>
            <div className='w-100 text-center'>
              <i className='bi bi-exclamation-triangle-fill' />
              <p>Oops, something&apos;s gone wrong </p>
              <p>
                Click&nbsp;
                <a className='text-secondary' href={`${window.origin}`}>
                  here
                </a>
                &nbsp;to go back to the dashboard
              </p>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
