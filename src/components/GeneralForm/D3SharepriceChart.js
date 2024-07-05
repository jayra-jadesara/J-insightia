import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const D3SharepriceChart = (props) => {
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(svgRef);
  useEffect(() => {
    let { width, height } = dimensions || svgRef.current.getBoundingClientRect();
    d3.select(svgRef.current).selectAll('*').remove();
    const data1 = props.data;
    const data = data1.map((d) => ({
      label: new Date(d.chart_date),
      value: d.value
    }));
    const margin = {
      top: 30,
      right: 20,
      bottom: 50,
      left: 60
    };

    height += 0;
    width = width - margin.left - margin.right - margin.right;

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);

    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorRange = ['#8EADC4', '#AEC5D5', '#C1D2DF', '#C5D5E1', '#C5D5E1'];
    const color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5]);
    const linearGradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('gradientTransform', 'rotate(90)');
    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', color(1));
    linearGradient.append('stop').attr('offset', '25%').attr('stop-color', color(2));
    linearGradient.append('stop').attr('offset', '50%').attr('stop-color', color(3));
    linearGradient.append('stop').attr('offset', '75%').attr('stop-color', color(4));
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', color(5));

    const xScale = d3.scaleLinear().domain([xMinValue, xMaxValue]).range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([yMinValue, yMaxValue]);

    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(''))
      .style('fill', 'url(#linear-gradient)');

    svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%Y')));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0000FF')
      .attr('stroke-width', 4)
      .attr('class', 'line')
      .attr('d', line);

    // text label for the y axis
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Share Price');

    // text label for the x axis
    svg
      .append('text')
      .attr('transform', `translate(${width / 2} ,${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .text('Year');
  }, [props.data, dimensions]);

  return (
    <ErrorBoundary>
      <Card isComp={props.isComp} isInvest={props.isInvest} title={props.cardtitle} smalltitle={props.cardsmalltitle}>
        <div
          className={props.isDummyData ? 'd-inline-flex blurrytext' : 'd-inline-flex'}
          ref={svgRef}
          style={{ width: '100%', height: '200px' }}
        />
      </Card>
    </ErrorBoundary>
  );
};

D3SharepriceChart.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  data: PropTypes.array,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool
};

D3SharepriceChart.defaultProps = {
  cardsmalltitle: '',
  cardtitle: '',
  data: [],
  isComp: false,
  isDummyData: false,
  isInvest: false
};

export default React.memo(D3SharepriceChart);
