import Page from '../Page';
import React, { Component } from 'react';

export class Faq extends Component {
  render() {
    return (
      <Page></Page>
      // <Page title="FAQ / HELP" breadcrumbs={[{ name: "FAQ / HELP", active: "true" }]} className="alert">
      //   <div className="row">
      //     <div className="col">FAQ / HELP</div>
      //   </div>
      // </Page>
    );
  }
}

export default React.memo(Faq);
