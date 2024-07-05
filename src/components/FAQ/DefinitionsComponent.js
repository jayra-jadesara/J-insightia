import React from 'react';
import { withRouter } from 'react-router-dom';
import bn from '../../utils/bemnames';
import CollapseComponent from '../GeneralForm/CollapseComponent';

const bem = bn.create('faqhelp');

const DefinitionsComponent = (props) => (
  <div className={bem.b('')}>
    <CollapseComponent Heading={props.faqhelpData.Heading} index={props.index}>
      <div className='row definitionTblHeader'>
        <div className='col-4 col-sm-4 col-md-4 col-lg-2 mt-3 mb-3 definitionTblLineSeparator'>
          <p className='text-white'>
            <b>Word/ Phrase</b>
          </p>
        </div>
        <div className='col-8 col-sm-8 col-md-8 col-lg-10 mt-3 mb-3'>
          <p className='text-white'>
            <b>Description</b>
          </p>
        </div>
      </div>
      {props.faqhelpData.Data.map((e, index) => (
        <div key={`faqhelpData${index + 1}`} className='row pt-1 definitionTblborder '>
          <div className='col-4 col-sm-4 col-md-4 col-lg-2 mt-2 mb-1 wrap-word definitionTblLineSeparator'>
            <p
              dangerouslySetInnerHTML={{
                __html: e.questionDefinition
              }}
            />
          </div>
          <div className='col-8 col-sm-8 col-md-8 col-lg-10 mt-2 mb-1 wrap-word'>
            <p dangerouslySetInnerHTML={{ __html: e.answer }} />
          </div>
        </div>
      ))}
    </CollapseComponent>
  </div>
);

export default withRouter(React.memo(DefinitionsComponent));
