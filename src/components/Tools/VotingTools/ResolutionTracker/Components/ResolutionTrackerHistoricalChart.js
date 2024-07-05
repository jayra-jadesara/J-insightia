import React from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  ResponsiveContainer,
  linearGradient,
} from 'recharts';
import Card from '../../../../GeneralForm/Card';

const ResolutionTrackerHistoricalChart = ({
  chartData,
  isShowCard,
  isComp,
  isInvest,
  cardtitle,
  cardsmalltitle,
  addedClass,
  handleComapnyCog,
  handleInvestorCog,
  location,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const getText = (text) => {
    if (text === 'Proposals') {
      return '# Proposals';
    }
    if (text === 'Support') {
      return 'Support %';
    }
    if (text === 'ISS* For') {
      return 'ISS* For %';
    }
    if (text === 'GL For') {
      return 'GL For %';
    }
    return '';
  };

  const renderColorfulLegendText = (value: string, entry: any) => (
    <span>{getText(value)}</span>
  );

  const prepareChart = () => (
    <div
      style={{ width: '100%', height: query.print ? 350 : 400 }}
      className={addedClass}
    >
      <ResponsiveContainer>
        <ComposedChart
          width={600}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#c8c8c8' stopOpacity={1} />
              <stop offset='100%' stopColor='#818181' stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='meeting_year' />
          <YAxis
            tickFormatter={(tick) => `${tick}%`}
            // allowDataOverflow={true}
            domain={[70, 100]}
            tickCount={4}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            orientation='left'
            yAxisId='yAxisLeft'
          />
          <YAxis
            // allowDataOverflow={true}
            tickCount={4}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            orientation='right'
            yAxisId='yAxisRight'
          />
          <Tooltip />
          <Bar
            yAxisId='yAxisRight'
            dataKey='Proposals'
            stackId='hTreckerbarChart'
            fill='lightgrey'
          >
            {/* <LabelList dataKey="pop_num" position="insideTop" style={{ fontSize: '80%' }} /> */}
          </Bar>
          <Legend
            verticalAlign='top'
            layout='vertical'
            align='right'
            formatter={renderColorfulLegendText}
          />
          <Line
            yAxisId='yAxisLeft'
            type='monotone'
            dataKey='Support'
            strokeWidth={5}
            stroke='#00b300'
          />
          <Line
            yAxisId='yAxisLeft'
            type='monotone'
            dataKey='ISS* For'
            stroke='#E0400A'
          />
          <Line
            yAxisId='yAxisLeft'
            type='monotone'
            dataKey='GL For'
            stroke='#e68a00'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      {isShowCard ? (
        <Card
          isComp={isComp}
          isInvest={isInvest}
          title={cardtitle}
          smalltitle={cardsmalltitle}
          handleComapnyCog={handleComapnyCog}
          handleInvestorCog={handleInvestorCog}
        >
          {prepareChart()}
        </Card>
      ) : (
        prepareChart()
      )}
    </>
  );
};

ResolutionTrackerHistoricalChart.propTypes = {
  isShowCard: PropTypes.bool,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  cardtitle: PropTypes.string,
  cardsmalltitle: PropTypes.string,
  handleComapnyCog: PropTypes.func,
  handleInvestorCog: PropTypes.func,
  addedClass: PropTypes.string,
};

ResolutionTrackerHistoricalChart.defaultProps = {
  isShowCard: false,
  isComp: false,
  isInvest: false,
  cardtitle: '',
  cardsmalltitle: '',
  handleComapnyCog: () => null,
  handleInvestorCog: () => null,
  addedClass: '',
};

export default ResolutionTrackerHistoricalChart;
