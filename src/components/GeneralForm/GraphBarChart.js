import PropTypes from 'prop-types';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

function GraphBarChart(props) {
  const CustomBarLabel = ({ x, y, value, width }) =>
    props.data !== undefined && (
      <text x={x + width / 2} fontSize={12} y={y} fill='#fff' textAnchor='middle' dy={15}>
        {value}
      </text>
    );

  let NagMaxVal = 0;
  let PlusMaxVal = 0;

  props.data !== undefined &&
    props.data.forEach((obj) => {
      if (Number(NagMaxVal) > Number(obj.value)) {
        NagMaxVal = obj.value;
      }
      if (Number(PlusMaxVal) < Number(obj.value)) {
        PlusMaxVal = obj.value;
      }
    });
  NagMaxVal = Math.floor(Number(NagMaxVal) + Number(NagMaxVal) / 2);
  PlusMaxVal = Math.ceil(Number(PlusMaxVal) + Number(PlusMaxVal) / 4);

  const CustomTooltip = ({ active, customTooltip }) => {
    if (active) {
      return (
        <div className='custom-tooltip '>
          <p>
            <small className='w-75 d-flex'>{customTooltip}</small>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    props.data !== undefined && (
      <Card
        isComp={props.isComp}
        isInvest={props.isInvest}
        title={props.cardtitle}
        smalltitle={props.cardsmalltitle}
        handleComapnyCog={props.handleComapnyCog}
        handleInvestorCog={props.handleInvestorCog}
      >
        <ErrorBoundary>
        <ResponsiveContainer height='100%' width='100%' minHeight={250} minWidth={250}>
          <BarChart
            data={props.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis dataKey={props.xKeyVal} />
            <YAxis domain={[NagMaxVal, PlusMaxVal]} />
            {props.customTooltip !== undefined && <Tooltip content={<CustomTooltip {...props} />} />}
            {/* <Bar dataKey={props.yKeyVal} fill="#193D75" label={<CustomBarLabel />} /> */}
            <Bar label={<CustomBarLabel />} dataKey={props.yKeyVal}>
              {props.data.map((entry, index) => (
                <Cell
                  key={`cell${index + 1}`}
                  fill={
                    props.data[index][props.keyname] > 0
                      ? '#193D75'
                      : props.data[index][props.keyname] === undefined
                      ? '#193D75'
                      : '#ff0000'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </ErrorBoundary>
      </Card>
    )
  );
}

GraphBarChart.propTypes = {
  active: PropTypes.bool,
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  customTooltip: PropTypes.string,
  data: PropTypes.array,
  handleComapnyCog: PropTypes.func,
  handleInvestorCog: PropTypes.func,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  keyname: PropTypes.string,
  xKeyVal: PropTypes.any.isRequired,
  yKeyVal: PropTypes.any.isRequired
};

GraphBarChart.defaultProps = {
  active: false,
  cardsmalltitle: '',
  cardtitle: '',
  customTooltip: '',
  data: [],
  handleComapnyCog: () => {},
  handleInvestorCog: () => {},
  isComp: false,
  isInvest: false,
  keyname: ''
};
export default React.memo(GraphBarChart);
