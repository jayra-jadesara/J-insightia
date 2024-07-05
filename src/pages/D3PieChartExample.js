import React from 'react';
import D3PieChart from '../components/GeneralForm/D3PieChart';
import D3DoughnutChart from '../components/GeneralForm/D3DoughnutChart';
import PieChart from '../components/GeneralForm/PieChart';

const D3PieChartExample = (props) => {
  const data = [
    { text: 'label 1', value: 40 },
    { text: 'label 2', value: 10 },
    { text: 'label 3', value: 30 },
    { text: 'label 4', value: 20 },
    { text: 'label 5', value: 20 }
  ];

  return (
    <div className='container'>
      <div className='row '>
        <div className='col-lg-6 col-md-12 pt-4 pb-4 justify-content-md-center'>
          <D3PieChart
            isComp={false}
            isInvest={false}
            cardtitle='Pie Chart'
            cardsmalltitle='d3 chart'
            data={data}
            width={300}
            height={300}
            innerRadius={30}
            outerRadius={120}
          />
        </div>
        <div className='col-lg-6 col-md-12 pt-4 pb-4 justify-content-md-center'>
          <D3PieChart
            isComp={false}
            isInvest={false}
            cardtitle='Pie Chart'
            cardsmalltitle='d3 chart'
            data={props.pieChartDummayData}
            width={300}
            height={300}
            innerRadius={30}
            outerRadius={120}
            isDummyData
          />
        </div>
        <div className='row'>
          <div className='col-lg-6 col-md-12'>
            <D3DoughnutChart
              isShowCard
              cardtitle='Doughnut Chart'
              cardsmalltitle='D3 Chart'
              data={{ score: 15, max_score: 20 }}
              height={150}
            />
          </div>
          <div className='col-lg-6 col-md-12'>
            <D3DoughnutChart
              isDummyData
              cardtitle='Doughnut Chart'
              cardsmalltitle='D3 Chart'
              data={{ score: props.doughnutChartDummyData, max_score: 20 }}
              height={150}
              isShowCard
            />
          </div>
        </div>
        <div className='row '>
          <div className='col-lg-6 col-md-12 justify-content-md-center pt-4 pb-4'>
            <PieChart
              cardtitle='Pie Chart'
              cardsmalltitle='Rechart'
              data={props.pieChartDummayData}
              height={400}
              innerRadius={30}
              outerRadius={120}
              datakey='value'
              dataLabelkey='name'
              isDummyData={false}
            />
          </div>
          <div className='col-lg-6 col-md-12 justify-content-md-center pt-4 pb-4'>
            <PieChart
              cardtitle='Pie Chart'
              cardsmalltitle='Rechart'
              data={props.pieChartDummayData}
              height={400}
              innerRadius={30}
              outerRadius={120}
              datakey='value'
              dataLabelkey='name'
              isDummyData
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default D3PieChartExample;
