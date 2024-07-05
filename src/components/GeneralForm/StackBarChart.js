import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const StackBarChart = ({ chartData, partition, xAxis_KeyName, isShowCard, cardtitle, cardsmalltitle, addedClass }) => {
  const [fillData, setFillData] = useState([]);

  useEffect(() => {
    setFillData(prepareChart());
  }, [chartData]);

  // #region Example: Pass data like below.

  // chartData={props.chartProposalsBy}
  // xAxis_KeyName="date_act_Year"
  // partition={[
  //   { labelName: 'Rejected', field: 'rejected', labelColor: '#ff0000' },
  //   { labelName: 'Accepted', field: 'accepted', labelColor: '#008000' },
  //   { labelName: 'Withdrawn', field: 'withdrawn', labelColor: '#808080' },
  // ]}

  // #endregion

  const prepareChart = () => (
    <ResponsiveContainer width='100%' height='100%' className={addedClass}>
      <Card IsShowCard={isShowCard} title={cardtitle} smalltitle={cardsmalltitle}>
        <ErrorBoundary>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#c8c8c8' stopOpacity={1} />
                <stop offset='100%' stopColor='#818181' stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis dataKey={xAxis_KeyName} />
            <YAxis allowDataOverflow allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />

            {partition.map((item) => (
              <Bar name={item.labelName} key={Math.random()} dataKey={item.field} stackId='a' fill={item.labelColor} />
            ))}
          </BarChart>
        </ErrorBoundary>
      </Card>
    </ResponsiveContainer>
  );

  return <>{fillData}</>;
};

StackBarChart.propTypes = {
  isShowCard: PropTypes.bool,
  cardtitle: PropTypes.string,
  cardsmalltitle: PropTypes.string,
  partition: PropTypes.array.isRequired,
  xAxis_KeyName: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
  addedClass: PropTypes.string.isRequired,
};

StackBarChart.defaultProps = {
  isShowCard: false,
  cardtitle: '',
  cardsmalltitle: '',
};

export default StackBarChart;
