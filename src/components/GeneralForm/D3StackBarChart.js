import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  axisRight,
  scaleOrdinal,
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending
} from 'd3';
import { getColorArr } from '../../utils/general-util';
import useResizeObserver from './useResizeObserver';
import Card from './Card';

import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('chart');

function D3StackBarChart({
  data,
  keys,
  xkey = 'year',
  cardtitle,
  cardsmalltitle,
  isComp,
  isInvest,
  isDummyData,
  handleInvestorCog,
  handleComapnyCog,
  IsShowCard,
  isYscaleSetRight,
  isSetBarPercentage,
  barLabelShowMoreThan,
  dataLegends = [],
  isShowLegend,
  isVerticalText,
  svgHeight,
  ishorizontalLegend,
  isValueToFixed,
  isInstructionCalcToPerc
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // const colors = scaleOrdinal(['#183f74', '#1eb8ec']);
  const { height } =
    dimensions ||
    (wrapperRef.current !== undefined &&
      wrapperRef.current.getBoundingClientRect());
  const colors = scaleOrdinal(getColorArr(keys.length));

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const colors = scaleOrdinal(getColorArr(keys.length));
    const chartHeightWithoutLegend =
      isShowLegend !== undefined && isShowLegend ? height - 25 : height - 10;

    // stacks / layers
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    // scales
    const current_year = new Date().getFullYear();
    data.map((d) => {
      if (d[xkey] === current_year) {
        d[xkey] += ' YTD';
      }
    });
    //Value To Percent
    let MaxValue;

    if (isInstructionCalcToPerc) {
      const sumArr = [];
      data.map((d) => {
        let sum = 0;
        keys.map((k) => {
          sum += d[k];
        });
        sumArr.push(sum);
      });
      MaxValue = sumArr.sort((a, b) => b - a)[0];
    }

    const xScale = scaleBand()
      .domain(data.map((d) => d[xkey]))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear()
      .domain(extent)
      .range([chartHeightWithoutLegend, 0]);

    // rendering
    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (i) => colors(i))
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => xScale(sequence.data[xkey]))
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) =>
        yScale(sequence[0]) - yScale(sequence[1]) - 4 > 0
          ? yScale(sequence[0]) - yScale(sequence[1]) - 4
          : 0
      );

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .selectAll('text')
      .data((layer) => layer)
      .join('text')
      .attr(
        'x',
        (sequence) => xScale(sequence.data[xkey]) + xScale.bandwidth() / 2
      )
      .attr(
        'y',
        (sequence) =>
          yScale(sequence[1]) + (yScale(sequence[0]) - yScale(sequence[1])) / 2
      )
      .attr('fill', (d) => {
        if (d[0] === 0 && d[1] === 0) {
          return '#000';
        }
        if (svg) {
          return '#fff';
        }
        return '#fff';
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', () => {
        if (xScale.bandwidth() > 10 && xScale.bandwidth() <= 16) {
          return '0.7rem';
        }
        return '0.5rem';
      })
      .text((d) => {
        const val = d[1] - d[0];
        if (isInstructionCalcToPerc) {
          return isSetBarPercentage !== undefined && isSetBarPercentage
            ? `${((val / MaxValue) * 100).toFixed(1)}%`
            : val;
        }
        if (isValueToFixed) {
          if (
            val > barLabelShowMoreThan ||
            barLabelShowMoreThan === undefined
          ) {
            return isSetBarPercentage !== undefined && isSetBarPercentage
              ? `${val.toFixed(1)}%`
              : val.toFixed(1);
          }
        } else if (
          val > barLabelShowMoreThan ||
          barLabelShowMoreThan === undefined
        ) {
          return isSetBarPercentage !== undefined && isSetBarPercentage
            ? `${val}%`
            : val;
        }
      });

    // axes
    svg
      .select('.gridline')
      .attr('class', 'gridline')
      .call(axisRight(yScale).ticks(5).tickSize(width).tickFormat(''));

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    if (isVerticalText) {
      svg
        .selectAll('.x-axis .tick text')
        .attr('transform', 'translate(3, -30)rotate(-40)')
        .attr('text-anchor', 'end');
    }

    // set conditional with right and left scale
    if (isYscaleSetRight !== undefined && isYscaleSetRight) {
      const yAxis = axisRight(yScale).ticks(5, '2f');
      svg
        .select('.y-axis')
        .attr('transform', `translate(${width}, 0)`)
        .call(yAxis);
    } else {
      const yAxis = axisLeft(yScale).ticks(5, '2f');
      svg.select('.y-axis').call(yAxis);
    }
  }, [
    data,
    dimensions,
    keys,
    xkey,
    barLabelShowMoreThan,
    isSetBarPercentage,
    isShowLegend,
    isValueToFixed,
    isVerticalText,
    isYscaleSetRight
  ]);

  return (
    <ErrorBoundary>
      <Card
        isComp={isComp}
        isInvest={isInvest}
        title={cardtitle}
        smalltitle={cardsmalltitle}
        handleComapnyCog={handleComapnyCog}
        handleInvestorCog={handleInvestorCog}
        IsShowCard={IsShowCard}
      >
        <div
          ref={wrapperRef}
          className={
            isDummyData
              ? bem.b('mb-1 mt-3 ps-5 pe-5 divStackbarChart blurrytext')
              : bem.b('mb-1 mt-3 ps-5 pe-5 divStackbarChart')
          }
        >
          <svg
            ref={svgRef}
            height={svgHeight !== undefined ? `${svgHeight}px` : '100%'}
          >
            <g className='gridline' />

            {isShowLegend !== undefined && isShowLegend && (
              <g
                className='legend'
                transform={
                  ishorizontalLegend
                    ? `translate(${svgHeight / 2},${svgHeight + 80})rotate(-90)`
                    : `translate(0,${height + 50})`
                }
                fontSize='12'
                fontFamily='sans-serif'
                textAnchor='start'
              >
                {dataLegends.map((item, i) => (
                  <g key={`item_${i + 1}`} transform={`translate(0,${i * 5})`}>
                    <rect
                      x='0'
                      y={i * 10}
                      width='10'
                      height='10'
                      fill={colors(i)}
                    />
                    <text x='15' y={i * 10} alignmentBaseline='hanging'>
                      {item}
                    </text>
                  </g>
                ))}
              </g>
            )}
            <g className='x-axis xAxisStackbarChart' />
            <g className='y-axis' />
            <g
              className='legendDiv'
              style={{ height: '20px', overflow: 'scroll' }}
            />
          </svg>
        </div>
      </Card>
    </ErrorBoundary>
  );
}

D3StackBarChart.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  data: PropTypes.array,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool,
  keys: PropTypes.any.isRequired,
  isSetBarPercentage: PropTypes.bool,
  isYscaleSetRight: PropTypes.bool,
  barLabelShowMoreThan: PropTypes.number,
  isShowLegend: PropTypes.bool,
  dataLegends: PropTypes.any.isRequired,
  isVerticalText: PropTypes.bool,
  svgHeight: PropTypes.any,
  ishorizontalLegend: PropTypes.bool,
  isValueToFixed: PropTypes.bool
};

D3StackBarChart.defaultProptypes = {
  cardsmalltitle: '',
  cardtitle: '',
  data: [],
  isComp: false,
  isDummyData: false,
  isInvest: false,
  isSetBarPercentage: undefined,
  isYscaleSetRight: undefined,
  barLabelShowMoreThan: 0,
  isVerticalText: false,
  svgHeight: undefined,
  ishorizontalLegend: false,
  isValueToFixed: false
};

export default React.memo(D3StackBarChart);
