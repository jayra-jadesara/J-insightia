import React from 'react';
import { withRouter } from 'react-router-dom';
import bn from '../../utils/bemnames';
import CollapseComponent from '../GeneralForm/CollapseComponent';

const bem = bn.create('faqhelp');

const FAQComponent = (props) => (
  <div className={bem.b('')}>
    <CollapseComponent Heading={props.faqhelpData.Heading} index={props.index}>
      {props.faqhelpData.Data.map((e, index) => (
        <div key={`dv${index + 1}`} className='row pt-1'>
          <div className='mt-2 mb-1 row'>
            <div className='col-xs-12 col-sm-12 col-md-2 col-lg-1 m-0'>
              <p>
                <b>Question</b>
              </p>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-11 m-0'>
              <p dangerouslySetInnerHTML={{ __html: e.questionDefinition }} />
            </div>
          </div>
          <div className='mb-1 row'>
            <div className='col-xs-12 col-sm-12 col-md-2 col-lg-1 m-0'>
              <p>
                <b>Answer</b>
              </p>
            </div>
            <div className=' col-xs-12 col-sm-12 col-md-10 col-lg-11 m-0'>
              <p dangerouslySetInnerHTML={{ __html: e.answer }} />
            </div>
          </div>
        </div>
      ))}
    </CollapseComponent>
  </div>
);

export default withRouter(React.memo(FAQComponent));
