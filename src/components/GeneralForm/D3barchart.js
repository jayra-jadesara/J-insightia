import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  axisRight,
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  min,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  scaleOrdinal,
} from 'd3';
import * as d3 from 'd3';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import bn from '../../utils/bemnames';
import {
  NUMBER_ZERO,
  NUMBER_FOUR,
  NUMBER_FIVE
} from '../../constants/NumberConstants';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('chart');

function D3barChart({
  data,
  keys,
  dataLegends = [],
  xkeysLabel,
  xAxisTitle,
  yAxisTitle,
  title,
  smalltitle,
  isComp,
  isInvest,
  isDummyData,
  handleComapnyCog,
  handleInvestorCog,
  IsShowCard,
  tickTextVertically,
  tickxAxisDashboardWrap,
  isShowLegend,
  addedClass,
  isValueToFixed,
  isExcelDownload,
  handleDownloadExcel,
  item,
  TrialUser,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const { width, height } =
    dimensions || (wrapperRef.current !== undefined && wrapperRef.current.getBoundingClientRect());
  const svg = select(svgRef.current);

  const wrapText = (text, width) => {
    text.each(function () {
      const textEl = d3.select(this);
      const words = textEl.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let linenumber = 0;
      const lineHeight = 1;
      const y = textEl.attr('y');
      const dx = parseFloat(textEl.attr('dx') || 0);
      const dy = parseFloat(textEl.attr('dy') || 0);
      let tspan = textEl.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', `${dy}em`);

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = textEl
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dx', dx)
            .attr('dy', `${++linenumber * lineHeight}em`)
            .text(word);
        }
      }
    });
  };

  useEffect(() => {
    function getALL() {
      const stackGenerator = stack().keys(keys).order(stackOrderAscending);
      const current_year = new Date().getFullYear();
      let data1 = [];
      data.map((d) => {
        const keys = Object.keys(d);
        let otherKeys = null;
        keys.map((item) => {
          if (item !== xkeysLabel[0]) {
            otherKeys = item;
            return item;
          }
        });
        const obj = {};
        if (d[xkeysLabel] === current_year) {
          obj[xkeysLabel] = `${d[xkeysLabel]} YTD`;
          obj[otherKeys] = d[otherKeys];
        } else {
          obj[xkeysLabel] = d[xkeysLabel];
          obj[otherKeys] = d[otherKeys];
        }
        data1 = [...data1, obj];
      });
      data = data1;
      const layers = stackGenerator(data);
      let mini_mum = min(layers, (layer) => min(layer, (sequence) => sequence[1]));
      let maxi_mumm = max(layers, (layer) => max(layer, (sequence) => sequence[1]));

      mini_mum = mini_mum >= 0 ? 0 : mini_mum + (mini_mum * 2) / 10 - height / 60;
      maxi_mumm = max(layers, (layer) => max(layer, (sequence) => sequence[1]));
      const xAxisTitleVar = xAxisTitle !== undefined ? xAxisTitle : '';
      const yAxisTitleVar = yAxisTitle !== undefined ? yAxisTitle : '';
      const chartHeightWithoutLegend = isShowLegend !== undefined && isShowLegend ? height - 25 : height - 10;

      const extent = [mini_mum, maxi_mumm * 1.2];

      const xScale = scaleBand()
        .domain(data.map((d) => d[xkeysLabel]))
        .range([0, width])
        .padding(0.25);

      const yScale = scaleLinear().domain(extent).range([chartHeightWithoutLegend, 0]);

      svg
        .selectAll('.layer')
        .data(layers)
        .join('g')
        .attr('class', 'layer')
        .selectAll('rect')
        .data((layer) => layer)
        .join('rect')
        .attr('x', (sequence) => xScale(sequence.data[xkeysLabel]))
        .attr('width', xScale.bandwidth())
        .attr('y', (d) => (d.data[keys] < 0 ? yScale(0) : yScale(d.data[keys])))
        .attr('height', (d) => Math.abs(yScale(d.data[keys]) - yScale(0)))
        .attr('fill', (d) => {
          if (d.data[keys] > 0) {
            return '#4BADCF';
          }
          return '#122E3D';
        });

      // individual bar above text
      svg
        .selectAll('.layer')
        .data(layers)
        .join('g')
        .attr('text-anchor', 'middle')
        .attr('font-size', () => {
          if (xScale.bandwidth() > 10 && xScale.bandwidth() <= 16) {
            return '0.7rem';
          }
          return '0.7rem';
        })
        .selectAll('text')
        .data((layer) => layer)
        .join('text')
        .attr('x', (d) => xScale(d.data[xkeysLabel]) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(Math.max(0, Number(d.data[keys]))) - 4)
        .text((d) => d.data[keys])
        .attr('style', 'font-weight:500')
        .attr('fill', '#183f74');

      // gridline
      svg
        .select('.gridline')
        .attr('class', 'gridline')
        .call(axisRight(yScale).ticks(10).tickSize(width).tickFormat(''));

      const xAxis = axisBottom(xScale);
      svg.select('.x-axis').attr('transform', `translate(0, ${height})`).call(xAxis);

      const yAxis = axisLeft(yScale).ticks(5, '2f');
      svg.select('.y-axis').call(yAxis);

      select(svgRef.current).selectAll('#xaxisid').remove();
      select(svgRef.current).selectAll('#yaxisid').remove();

      svg
        .select('.x-axis-title')
        .append('text')
        .attr('id', 'xaxisid')
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .attr('font-family', 'sans-serif')
        .attr('fill', '#183f74')
        .attr('y', height + 40)
        .attr('x', width / 2)
        .attr('text-anchor', 'middle')
        .text(xAxisTitleVar);

      svg
        .select('.y-axis-title')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('id', 'yaxisid')
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .attr('font-family', 'sans-serif')
        .attr('fill', '#183f74')
        .attr('y', '-40')
        .attr('x', -(height / 2))
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(yAxisTitleVar);

      if (tickTextVertically) {
        svg
          .selectAll('.x-axis .tick text')
          .attr('transform', 'translate(5, -15)rotate(-20)')
          .attr('text-anchor', 'end');
      }
      if (tickxAxisDashboardWrap) {
        svg
          .selectAll('.x-axis .tick text')
          .attr('transform', 'translate(5, -20)')
          .call(wrapText, 10);
      }
    }
    getALL();
  }, [
    data,
    dimensions,
    keys,
    xAxisTitle,
    yAxisTitle,
    xkeysLabel,
    height,
    isShowLegend,
    svg,
    tickTextVertically,
    tickxAxisDashboardWrap,
    width,
    isValueToFixed,
  ]);

  const colors = scaleOrdinal(['#183f74', '#1eb8ec']);

  return (
    <ErrorBoundary>
      <Card
        isComp={isComp}
        isInvest={isInvest}
        title={title}
        smalltitle={smalltitle}
        handleComapnyCog={handleComapnyCog}
        handleInvestorCog={handleInvestorCog}
        IsShowCard={IsShowCard}
        addedClass={addedClass}
        isExcelDownload={isExcelDownload}
        handleDownloadExcel={handleDownloadExcel}
        item={item}
      >
        <div
          ref={wrapperRef}
          className={
            TrialUser
              ? bem.b('mb-1 mt-3 ps-5 pe-5 h-90 divBarChart blurrytext')
              : bem.b('mb-1 mt-3 ps-5 pe-5 h-90 divBarChart')
          }
        >
          <svg
            id='barChartId'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
          >
            <filter id='blur'>
              <feGaussianBlur stdDeviation='6' />
            </filter>
            <svg ref={svgRef} filter={isDummyData ? 'url(#blur)' : ''}>
              <g className='gridline' />
              <g className='x-axis' />
              <g className='y-axis' />
              <g className='x-axis-title' />
              <g className='y-axis-title' />
              {isShowLegend !== undefined && isShowLegend && (
                <g
                  className='legend'
                  transform={
                    tickTextVertically ? `translate(0,${height + 30 + height / 2})` : `translate(0,${height + 30})`
                  }
                  fontSize='12'
                  fontFamily='sans-serif'
                  textAnchor='start'
                >
                  {dataLegends.map((item, i) => (
                    <g key={`dataLegends${i + 1}`} transform={`translate(0,${i * 5})`}>
                      <rect x='0' y={i * 18} width='10' height='10' fill={colors(i)} />
                      <text x='14' y={i * 18} alignmentBaseline='hanging'>
                        {item}
                      </text>
                    </g>
                  ))}
                </g>
              )}
            </svg>
          </svg>
        </div>
      </Card>
    </ErrorBoundary>
  );
}

D3barChart.propTypes = {
  d3: PropTypes.any,
  data: PropTypes.array,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool,
  keys: PropTypes.any.isRequired,
  smalltitle: PropTypes.string,
  title: PropTypes.string,
  xAxisTitle: PropTypes.string,
  xkeysLabel: PropTypes.any,
  yAxisTitle: PropTypes.string,
  dataLegends: PropTypes.any,
  IsShowCard: PropTypes.any,
  tickTextVertically: PropTypes.any,
  isShowLegend: PropTypes.bool,
  addedClass: PropTypes.any,
  isValueToFixed: PropTypes.bool,
  isExcelDownload: PropTypes.bool,
};

D3barChart.defaultProps = {
  d3: [],
  data: [],
  isComp: false,
  isDummyData: false,
  isInvest: false,
  smalltitle: '',
  title: '',
  xAxisTitle: '',
  xkeysLabel: undefined,
  yAxisTitle: '',
  IsShowCard: undefined,
  isShowLegend: undefined,
  addedClass: undefined,
  dataLegends: undefined,
  isValueToFixed: false,
  isExcelDownload: false,
  tickTextVertically: undefined,
};

export default React.memo(D3barChart);
