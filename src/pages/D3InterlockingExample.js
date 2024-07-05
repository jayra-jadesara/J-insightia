import React from 'react';
import D3InterlockingDirector from '../components/GeneralForm/D3InterlockingDirectors';

const isDummyData = true;

const D3InterlockingExample = (props) => {
  const data = {
    nodes: [
      {
        name: 'Hyatt Hotels Corporation',
        group: 1,
        unique_id: 728,
        className: 'self',
        url: '/governance/Govcompprofile.aspx?pid=728'
      },
      {
        name: 'VF Corp',
        group: 1,
        unique_id: 289,
        className: 'company',
        url: '/governance/Govcompprofile.aspx?pid=289'
      },
      {
        name: 'American Eagle Outfitters Inc.',
        group: 1,
        unique_id: 1309,
        className: 'company',
        url: '/governance/Govcompprofile.aspx?pid=1309'
      },
      {
        name: 'American Airlines Group Inc.',
        group: 1,
        unique_id: 26477,
        className: 'company',
        url: '/governance/Govcompprofile.aspx?pid=26477'
      },
      {
        name: 'Mackey McDonald',
        group: 2,
        unique_id: 7368,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=7368'
      },
      {
        name: 'Mark Hoplamazian',
        group: 2,
        unique_id: 10915,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10915'
      },
      {
        name: 'Thomas Pritzker',
        group: 2,
        unique_id: 10916,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10916'
      },
      {
        name: 'Susan Kronick',
        group: 2,
        unique_id: 10918,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10918'
      },
      {
        name: 'Cary McMillan',
        group: 2,
        unique_id: 10920,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10920'
      },
      {
        name: 'Pamela Nicholson',
        group: 2,
        unique_id: 10921,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10921'
      },
      {
        name: 'Jason Pritzker',
        group: 2,
        unique_id: 10922,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10922'
      },
      {
        name: 'Michael Rocca',
        group: 2,
        unique_id: 10923,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10923'
      },
      {
        name: 'Richard Tuttle',
        group: 2,
        unique_id: 10924,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10924'
      },
      {
        name: 'James Wooten',
        group: 2,
        unique_id: 10925,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=10925'
      },
      {
        name: 'Paul Ballew',
        group: 2,
        unique_id: 18330,
        className: 'director',
        url: '/governance/directorprofile.aspx?dir=18330'
      }
    ],
    links: [
      {
        source: 4,
        target: 0
      },
      {
        source: 5,
        target: 0
      },
      {
        source: 6,
        target: 0
      },
      {
        source: 7,
        target: 0
      },
      {
        source: 8,
        target: 0
      },
      {
        source: 9,
        target: 0
      },
      {
        source: 10,
        target: 0
      },
      {
        source: 11,
        target: 0
      },
      {
        source: 12,
        target: 0
      },
      {
        source: 13,
        target: 0
      },
      {
        source: 14,
        target: 0
      },
      {
        source: 5,
        target: 1
      },
      {
        source: 8,
        target: 2
      },
      {
        source: 7,
        target: 3
      }
    ]
  };

  return (
    <div>
      <D3InterlockingDirector cardtitle='Interlocking Director' cardsmalltitle='D3 Chart' data={data} />
      <div className='p-5'>
        {props.interlockingDummyData !== undefined && (
          <D3InterlockingDirector cardtitle='Interlocking Director' cardsmalltitle='D3 Chart' data={data} />
        )}
      </div>
      <div className='p-5'>
        {props.interlockingDummyData !== undefined && (
          <D3InterlockingDirector
            cardtitle='Interlocking Director'
            isDummyData={isDummyData}
            cardsmalltitle='D3 Chart'
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default D3InterlockingExample;
