import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const D3LineChart = ({
  lineData,
  xAxisKey,
  yAxisKey,
  yAxisTitle,
  xAxisTitle,
  isComp,
  isInvest,
  cardtitle,
  cardsmalltitle,
  addedClass,
  isDummyData,
  isGradient,
  maxValueY,
  TrialUser
}) => {
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    let { width } = dimensions || svgRef.current.getBoundingClientRect();
    const { height } = dimensions || svgRef.current.getBoundingClientRect();
    d3.select(svgRef.current).selectAll('*').remove();
    const data1 = lineData;
    // Keys within each json pass through as strings
    const data = data1.map((d) => ({
      label: new Date(d[xAxisKey]),
      value: d[yAxisKey]
    }));
    const margin = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60
    };

    width = width - margin.left - margin.right - margin.right;
    // Ceil adds some breathing room to the X axis
    const yMinValue = 0; // d3.min(data, (d) => d.value);
    const yMaxValue = maxValueY ? d3.max(data, (d) => Math.ceil(d.value)) + 20 : 100;

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

    // make defs and add the linear gradient
    const lg = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'mygrad') // id of the gradient
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%'); // since its a vertical linear gradient
    // Gradient Background colors
    lg.append('stop').attr('offset', '0%').style('stop-color', '#FF0000').style('stop-opacity', 1);

    lg.append('stop').attr('offset', '50%').style('stop-color', '#FFFF00').style('stop-opacity', 1);

    lg.append('stop').attr('offset', '100%').style('stop-color', '#00FF00').style('stop-opacity', 1);

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(''))
      .attr('fill', () => (isGradient ? 'url(#mygrad)' : '#ffffff'));

    svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%b %Y')));

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
    // svg
    //   .append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 0 - margin.left)
    //   .attr('x', 0 - height / 2)
    //   .attr('dy', '1em')
    //   .style('text-anchor', 'middle')
    //   .text(yAxisTitle);

    // // text label for the x axis
    // svg
    //   .append('text')
    //   .attr('transform', `translate(${width / 2} ,${height + margin.top + 20})`)
    //   .style('text-anchor', 'middle')
    //   .text(xAxisTitle);
  }, [lineData, dimensions, xAxisKey, yAxisKey, xAxisTitle, yAxisTitle, isGradient, maxValueY]);

  return (
    <ErrorBoundary>
      <Card isComp={isComp} isInvest={isInvest} title={cardtitle} smalltitle={cardsmalltitle} addedClass={addedClass}>
        <div
          id='line-chart'
          className={TrialUser ? 'd-inline-flex blurrytext' : 'd-inline-flex'}
          ref={svgRef}
          style={{ width: '100%', height: '200px' }}
        />
        <span style={{ fontSize: '0.8rem' }}>1) N.B. Each daily score is generated using a rolling 30-day median.</span><br />
        <span style={{ fontSize: '0.8rem' }}>2) N.B. Historical vulnerability scores are generated using default peer group data, and will not change with custom selections.</span>
      </Card>
    </ErrorBoundary>
  );
};

D3LineChart.propTypes = {
  lineData: PropTypes.array.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  yAxisKey: PropTypes.string.isRequired,
  yAxisTitle: PropTypes.string.isRequired,
  xAxisTitle: PropTypes.string.isRequired,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  cardtitle: PropTypes.string,
  cardsmalltitle: PropTypes.string,
  addedClass: PropTypes.string,
  isDummyData: PropTypes.bool,
  maxValueY: PropTypes.bool
};

D3LineChart.defaultProps = {
  isComp: false,
  isInvest: false,
  cardtitle: '',
  cardsmalltitle: '',
  addedClass: '',
  isDummyData: false,
  maxValueY: false
};

export default React.memo(D3LineChart);
