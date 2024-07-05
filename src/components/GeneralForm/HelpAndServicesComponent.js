import React from 'react';
import { BIG_DATAFEED_IMG, BIG_HELP_IMG } from '../../constants/PathsConstant';
import bn from '../../utils/bemnames';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';
// import  datafeedPng from '../datafeed.png';
// let  datafeedPng = import("./images/datafeed.png");

const bem = bn.create('helpService');

const helpDetails = `Frequently asked questions and definitions can be found on our <a href="${window.location.origin}/faqhelp/general/faq">Help</a> page.<br>Insightia values your feedback on our products and services. Please let us know what you find useful or any improvements by  contacting your account manager.<br>The Insightia support team is on hand to help with bespoke data requests and can be reached by contacting <a href="mailto: insightia.support@diligent.com">insightia.support@diligent.com</a>.`;
const dataFeedDetails =
  'Datafeeds allow access to all data points via FTP and can be connected to your internal data systems. Please contact a member of our team at <a href="mailto: insightia.support@diligent.com ">insightia.support@diligent.com</a> for more information regarding access to our datafeed options. ';

const HelpAndServicesComponent = () => (
  <div className={bem.b('row')}>
    <Card title='Help & Services'>
      <ErrorBoundary>
      <div className='row helpandservicesItem'>
        <div className='col-lg-2 col-md-4 col-sm-12 mt-2'>
          <img src={`${process.env.PUBLIC_URL}${BIG_HELP_IMG}`} height='61px' width='69px' alt='Help' />
          <label> Help</label>
        </div>
        <div className='col-lg-10 col-md-8 col-sm-12 mt-2 details'>
          <p dangerouslySetInnerHTML={{ __html: helpDetails }} />
        </div>
      </div>
      <div className='row helpandservicesItem'>
        <div className='col-lg-2 col-md-4 col-sm-12 mt-2'>
          <img src={`${process.env.PUBLIC_URL}${BIG_DATAFEED_IMG}`} height='61px' width='69px' alt='Datafeeds' />

          <label> Datafeeds</label>
        </div>
        {/* <div className="col-lg-2 col-md-4 col-sm-12 mt-2">
                    <label>Datafeeds</label>
                    </div> */}
        <div className='col-lg-10 col-md-8 col-sm-12 mt-2 details'>
          <p dangerouslySetInnerHTML={{ __html: dataFeedDetails }} />
        </div>
      </div>
      </ErrorBoundary>
    </Card>
  </div>
);

HelpAndServicesComponent.propTypes = {};

HelpAndServicesComponent.defaultProps = {};

export default React.memo(HelpAndServicesComponent);
