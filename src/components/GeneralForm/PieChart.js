import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const COLORS = ['#090A16', '#112d3c', '#005A7F', '#4BADCF', '#2B6C70', '#299a76', '#575756', '#526168', '#839DA9'];

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul>
      {payload.map((entry, index) => (
        <li key={`item-${index + 1}`}> {entry.payload.text}</li>
      ))}
    </ul>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} fontSize={12} dominantBaseline='central'>
      {percent > 0.15 ? `${(percent * 100).toFixed(0)}%` : ''}
    </text>
  );
};

export default class ReChartPie extends PureComponent {
  render() {
    return (
      <Card
        isComp={this.props.isComp}
        isInvest={this.props.isInvest}
        title={this.props.cardtitle}
        smalltitle={this.props.cardsmalltitle}
      >
        <ErrorBoundary>
        <ResponsiveContainer
          className={this.props.isDummyData ? 'd-block m-auto blurrytext' : 'd-block m-auto'}
          height={this.props.height}
          width='100%'
        >
          <PieChart>
            <Pie
              data={this.props.data}
              innerRadius={this.props.innerRadius}
              outerRadius={this.props.outerRadius}
              fill='#fff'
              labelLine={false}
              // paddingAngle={1}
              dataKey={this.props.datakey}
              label={renderCustomizedLabel}
              strokeWidth='3px'
            >
              {this.props.data.map((entry, index) => (
                <Cell key={`cell-${index + 1}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend content={renderLegend} layout='horizontal' verticalAlign='bottom' align='center' />
          </PieChart>
        </ResponsiveContainer>
        </ErrorBoundary>
      </Card>
    );
  }
}

ReChartPie.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  data: PropTypes.array,
  datakey: PropTypes.string,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool,
  outerRadius: PropTypes.number
};

ReChartPie.defaultProps = {
  cardsmalltitle: '',
  cardtitle: '',
  data: [],
  datakey: '',
  height: 0,
  innerRadius: 0,
  isComp: false,
  isDummyData: false,
  isInvest: false,
  outerRadius: 0
};
