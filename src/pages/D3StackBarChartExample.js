import React from 'react';
import StackedBarChart from '../components/GeneralForm/D3StackBarChart';
import D3barchart from '../components/GeneralForm/D3barchart';
import D3SharePriceChart from '../components/GeneralForm/D3SharepriceChart';

const data = [
  {
    year: 1980,
    A: 40,
    B: 20,
    C: 40
  },
  {
    year: 1990,
    A: 10,
    B: 40,
    C: 50
  },
  {
    year: 2000,
    A: 15,
    B: 25,
    C: 60
  },
  {
    year: 2010,
    A: 40,
    B: 50,
    C: 10
  },
  {
    year: 2020,
    A: 20,
    B: 40,
    C: 40
  },
  {
    year: 2021,
    A: 60,
    B: 20,
    C: 20
  }
];

const dataBarChart = [
  {
    year: 1980,
    A: 40
  },
  {
    year: 1990,
    A: 10
  },
  {
    year: 2000,
    A: 15
  },
  {
    year: 2010,
    A: 40
  },
  {
    year: 2011,
    A: 80
  },
  {
    year: 2012,
    A: 40
  },
  {
    year: 2013,
    A: 35
  },
  {
    year: 2020,
    A: 20
  },
  {
    year: 2021,
    A: 60
  }
];

const dataSharePricechart = [
  { chart_date: '1985-01-01', value: 0.647 },
  { chart_date: '1986-01-01', value: 0.648 },
  { chart_date: '1987-01-01', value: 0.625 },
  { chart_date: '1988-01-01', value: 0.635 },
  { chart_date: '1989-01-01', value: 0.637 },
  { chart_date: '1990-01-01', value: 0.654 },
  { chart_date: '1991-01-01', value: 0.653 },
  { chart_date: '1992-01-01', value: 0.654 },
  { chart_date: '1993-01-01', value: 0.659 },
  { chart_date: '1994-01-01', value: 0.671 },
  { chart_date: '1995-01-01', value: 0.671 },
  { chart_date: '1996-01-01', value: 0.672 },
  { chart_date: '1997-01-01', value: 0.672 },
  { chart_date: '1998-01-01', value: 0.647 },
  { chart_date: '1998-02-01', value: 0.671 },
  { chart_date: '1998-03-01', value: 0.672 },
  { chart_date: '1999-01-01', value: 0.675 },
  { chart_date: '2000-01-01', value: 0.675 },
  { chart_date: '2001-01-01', value: 0.677 },
  { chart_date: '2002-01-01', value: 0.677 },
  { chart_date: '2003-01-01', value: 0.669 },
  { chart_date: '2003-02-01', value: 0.678 },
  { chart_date: '2003-02-01', value: 0.676 },
  { chart_date: '2004-01-01', value: 0.667 },
  { chart_date: '2005-01-01', value: 0.671 },
  { chart_date: '2006-01-01', value: 0.672 }
];

const allKeys = ['A', 'B', 'C'];
const BarChartKey = ['A'];

function D3StackBarChartExample(props) {
  return (
    <>
      <div className='row p-3 '>
        <div className='col-lg-6 col-md-6'>
          <StackedBarChart
            dataLegends={allKeys}
            cardtitle='Stacked Bar Chart'
            cardsmalltitle='D3 Chart'
            data={data}
            keys={allKeys}
          />
        </div>
        <div className='col-lg-6 col-md-6'>
          <D3barchart
            cardtitle='Bar Chart'
            cardsmalltitle='D3 Chart'
            data={dataBarChart}
            keys={BarChartKey}
            dataLegends={BarChartKey}
            xkeysLabel={['year']}
          />
        </div>
      </div>

      <div className='row p-3 '>
        <div className='col-lg-12 col-md-12 '>
          <D3SharePriceChart cardtitle='Share price Chart' cardsmalltitle='D3 Chart' data={dataSharePricechart} />
        </div>
      </div>

      <div className='row p-3 '>
        <div className='col-lg-6 col-md-6'>
          <StackedBarChart
            isDummyData
            cardtitle='Stacked Bar Chart'
            cardsmalltitle='D3 Chart'
            data={props.stackBarChartDummyData}
            keys={allKeys}
            dataLegends={allKeys}
          />
        </div>
        <div className='col-lg-6 col-md-6 mb-3'>
          <D3barchart
            cardtitle='Bar Chart'
            cardsmalltitle='D3 Chart'
            data={props.barchartDummyData}
            keys={BarChartKey}
            isDummyData
            // keys={["value"]}
            xkeysLabel={['label']}
          />
        </div>
      </div>
      <div className='row p-3 '>
        <div className='col-lg-12 col-md-12 '>
          <D3SharePriceChart
            cardtitle='Share price Chart'
            cardsmalltitle='D3 Chart'
            data={props.sharePriceChartDummyData}
            isDummyData
          />
        </div>
      </div>
    </>
  );
}

export default D3StackBarChartExample;
