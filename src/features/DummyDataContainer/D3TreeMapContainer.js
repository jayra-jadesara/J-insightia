import React from 'react';
import { connect } from 'react-redux';
import D3TreeMap from '../../components/GeneralForm/D3TreeMap';

const D3TreeMapContainer = ({ ...props }) => {
  const data = {
    name: 'Celtics',
    children: [
      {
        category: 'Administration',
        name: 'Administration',
        value: 45,
      },
      {
        category: 'Basic Materials',
        name: 'Basic Materials',
        value: 34,
      },
      {
        category: 'Basic Materials',
        name: 'Mining',
        value: 32,
      },
      {
        category: 'Communications',
        name: 'Communications',
        value: 27,
      },
      {
        category: 'Compensation',
        name: 'Compensation',
        value: 27,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Commercial',
        value: 66,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Consumer',
        value: 50,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'E-commerce',
        value: 12,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Hospitality',
        value: 8,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Procurement',
        value: 2,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Retail',
        value: 5,
      },
      {
        category: 'Consumer/ Commercial',
        name: 'Sales',
        value: 15,
      },
      {
        category: 'Energy',
        name: 'Energy',
        value: 29,
      },
      {
        category: 'Energy',
        name: 'Exploration (Oil and Gas)',
        value: 34,
      },
      {
        category: 'ESG',
        name: 'Environmental',
        value: 55,
      },
      {
        category: 'ESG',
        name: 'Governance',
        value: 90,
      },
      {
        category: 'ESG',
        name: 'Social',
        value: 43,
      },
      {
        category: 'ESG',
        name: 'Sustainability',
        value: 33,
      },
      {
        category: 'Financial',
        name: 'Accounting',
        value: 77,
      },
      {
        category: 'Financial',
        name: 'Audit',
        value: 80,
      },
      {
        category: 'Financial',
        name: 'Banking',
        value: 20,
      },
      {
        category: 'Financial',
        name: 'Capital Allocation',
        value: 20,
      },
      {
        category: 'Financial',
        name: 'Economics',
        value: 14,
      },
      {
        category: 'Financial',
        name: 'Finance',
        value: 95,
      },
      {
        category: 'Financial',
        name: 'Financial Reporting',
        value: 33,
      },
      {
        category: 'Financial',
        name: 'Insurance/ Reinsurance',
        value: 10,
      },
      {
        category: 'Financial',
        name: 'Mortgage',
        value: 7,
      },
      {
        category: 'Financial',
        name: 'Tax',
        value: 23,
      },
      {
        category: 'Financial',
        name: 'Treasury',
        value: 6,
      },
      {
        category: 'Food & Beverage',
        name: 'Food & Beverage',
        value: 16,
      },
      {
        category: 'Government/ Public Policy/ Politics',
        name: 'Government/ Public Policy',
        value: 30,
      },
      {
        category: 'Government/ Public Policy/ Politics',
        name: 'Politics',
        value: 58,
      },
      {
        category: 'Health & Safety',
        name: 'Health & Safety',
        value: 53,
      },
      {
        category: 'Healthcare',
        name: 'Biotechnology',
        value: 40,
      },
      {
        category: 'Healthcare',
        name: 'Healthcare',
        value: 89,
      },
    ],
  };
  return (
    <div className='p-2'>
      <D3TreeMap
        {...props}
        data={data}
        cardtitle='Number of distinct directors in search with that skill'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(D3TreeMapContainer);
