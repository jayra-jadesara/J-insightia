import Page from '../components/Page';
import React, { Component } from 'react';

export class MyAlert extends Component {
  render() {
    return (
      <Page title='My Alert' breadcrumbs={[{ name: 'My Alert', active: 'true' }]} className='alert'>
        <div className='row'>
          <div className='col'>My Alert</div>
        </div>
      </Page>
    );
  }
}

export default MyAlert;
