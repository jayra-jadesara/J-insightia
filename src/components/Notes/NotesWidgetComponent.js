import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CollapseComponent from '../GeneralForm/CollapseComponent';
import bn from '../../utils/bemnames';
import Page from '../Page';
import ScrollToTopBtn from '../GeneralForm/ScrollToTop';
import NotesInformationComponent from './NotesInformationComponent';

const bem = bn.create('faqhelp');

// Use "NotesWidget" to import to pages where needed ensure to include cardTitle and cardBody placeholders to render info
// sample shown in NotesWidgetExample.js

const NotesWidget = (props) => {
  const listItems = [
    {
      heading: '',
      children: <NotesInformationComponent {...props} />
    }
  ];

  // NotesCard toggle card feature
  const NotesCard = (props) => [
    <div className={bem.b('')}>
      <CollapseComponent Heading={props.Heading} index={props.index}>
        {props.children}
      </CollapseComponent>
    </div>
  ];

  return (
    <>
      <Page key={1} className='pt-3'>
        {listItems.map((e, index) => (
          <div key={`div${index + 1}`}>
            <NotesCard {...props}>
              <div className='pt-3'>
                {' '}
                <div className='pt-3'>{e.children}</div>{' '}
              </div>
            </NotesCard>
          </div>
        ))}
      </Page>
      <ScrollToTopBtn />
    </>
  );
};

NotesWidget.propTypes = {
  Heading: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default withRouter(React.memo(NotesWidget));
