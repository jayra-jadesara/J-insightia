/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../components/Page';
import NotesWidget from '../components/Notes/NotesWidgetComponent';

// To add Notes Widget to other pages
// import  NotesWidget component
// use placeholders provided

// example shown as below
const Notes = () => (
  <>
    <Page key={1} className='pt-3'>
      <NotesWidget
        Heading='test 1'
        cardTitle='Sample Title'
        cardBody={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. `}
      />
      <NotesWidget
        Heading='test 2 Header'
        cardTitle='Note 2'
        cardBody={`testing making sure. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. `}
      />
    </Page>
  </>
);

export default withRouter(Notes);
