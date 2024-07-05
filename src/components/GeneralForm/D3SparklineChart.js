import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import qs from 'qs';
import bn from '../../utils/bemnames';
import Card from './Card';
import useResizeObserver from './useResizeObserver';
import { LG_MIN_WIDTH } from '../../constants/ScreenSizeConstant';

const bem = bn.create('d3Sparkline');
const dateFormatter = require('dateformat');

const D3SparklineChart = (props) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const ref = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const { width } = dimensions || (wrapperRef.current !== undefined && wrapperRef.current.getBoundingClientRect());
  const yearData = props.yearData;
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
            .attr('dy', `${++linenumber * lineHeight + dy}em`)
            .text(word);
        }
      }
    });
  };

  function kFormatter(num) {
    return Math.abs(num) > 999999
      ? `${Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1)}M`
      : Math.abs(num) > 999 ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}K` : Math.sign(num) * Math.abs(num);
  }
  const createSparklineChart = () => {
    if (ref.current !== null) {
      d3.select(ref.current).selectAll('svg').remove();
    }
    const SVG_WIDTH = width;
    const SVG_HEIGHT = props.height;
    const WIDTH = SVG_WIDTH - 200;
    const HEIGHT = 43;
    const MARGIN = { top: 5, right: 6, bottom: 5, left: 5 };
    const gapText = 45;
    const gap = 45;
    const leftPad = 20;
    const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
    const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
    const height1 = props.data.length * gap + (gap * 2);
    const dateFormat = d3.timeParse('%Y');
    // create start Date for x axis
    const startDate = new Date(`${yearData[0]}`);
    // create last date for x axis
    const endDate = new Date(`${yearData[yearData.length - 1]}`);
    const timeScale = d3
      .scaleTime()
      .domain([
        d3.min(props.data, (d) => dateFormat(yearData.length > 0 && yearData[0] && yearData[0].toString())),
        d3.max(props.data, (d) => dateFormat(yearData.length > 0 && yearData[yearData.length - 1] && yearData[yearData.length - 1].toString())),
      ])
      .range([leftPad * 7, SVG_WIDTH - gapText * 3 + leftPad]);
    // const timeScale = d3.scaleLinear().domain([0, 5]).range([leftPad * 7, SVG_WIDTH - gapText * 3 + leftPad + leftPad]);
    //axix - tick lines
    const xAxis = d3.axisBottom().scale(timeScale).ticks(yearData.length);
    const xAxisTop = d3
      .axisTop()
      .scale(timeScale)
      .ticks(yearData.length)
      .tickSize(props.data.length * gap + 10);
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', SVG_WIDTH)
      .attr('height', height1)
      .append('g')
      .attr('transform', `translate(${MARGIN.left + 10},${MARGIN.top})`);

    const rectData = svg
      .append('g')
      .selectAll('rect')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('x', leftPad * MARGIN.left - MARGIN.right)
      .attr('y', (d, index) => {
        for (let i = 1; i <= 5; i++) {
          //   if (d.type === props.data[i]) {
          return index * gap;
          //   }
        }
      })
      .attr('width', (d) => INNER_WIDTH + gap * 2)
      .attr('height', gap)
      .attr('stroke', 'none')
      .attr('fill', 'none')
      .enter();
    // const rectangles = svg.append('g').selectAll('rect').data(props.data).enter();
    //Xaxis text
    svg
      .append('g')
      .selectAll('text')
      .data(props.data)
      .text((d) => d.director_name)
      .enter()
      .append('text')
      .attr('x', leftPad)
      .attr('y', (d, i) => {
        if (i > 0) {
          for (let j = 0; j < i; j++) {
            return i * gapText + leftPad;
          }
        } else {
          return i * gapText + leftPad;
        }
      })
      .attr('font-size', '0.7rem')
      .attr('text-anchor', 'center')
      .attr('text-height', 14)
      .text((d) => d.director_name)
      .call(wrapText, 100);
    svg
      .append('g')
      .selectAll('text')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', leftPad * 4.8)
      .attr('y', (d, i) => {
        if (i > 0) {
          for (let j = 0; j < i; j++) {
            return i * gapText + leftPad;
          }
        } else {
          return i * gapText + leftPad;
        }
      })
      .attr('font-size', '0.7rem')
      .attr('text-anchor', 'center')
      .attr('text-height', 14)
      .text((d) => kFormatter(d.chart_data[0]));
    svg
      .append('g')
      .selectAll('text')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', INNER_WIDTH + gapText * 3 - gapText / 2)
      .attr('y', (d, i) => {
        if (i > 0) {
          for (let j = 0; j < i; j++) {
            return i * gapText + leftPad;
          }
        } else {
          return i * gapText + leftPad;
        }
      })
      .attr('font-size', '0.7rem')
      .attr('text-anchor', 'center')
      .attr('text-height', 14)
      .text((d) => kFormatter(d.chart_data[d.chart_data.length - 1]));
    //g tag
    const chartG1 = svg
      .append('g')
      .attr('id', 'tick_line_bottom')
      .attr('transform', `translate(${0},${(props.data.length - 1) * gap + gap + 10})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('id', 'tick_line_top')
      .attr('transform', `translate(${0},${(props.data.length - 1) * gap + gap + 10})`)
      .call(xAxisTop)
      .attr('class', 'gridlines')
      .style('fill-opacity', 0);
    props.data.forEach((item, i) => {
      createLineChart(item.chart_data, i, item);
    });
    function createLineChart(mainData, index, item) {
      svg
        .append('line')
        .attr('x1', leftPad * MARGIN.left - MARGIN.right)
        .attr('x2', SVG_WIDTH - 50 - gap)
        .attr('y1', index * gap + 5)
        .attr('y2', index * gap + 5)
        .attr('width', (d) => INNER_WIDTH + gap * 2)
        .attr('stroke', 'gray')
        .attr('fill', 'none')
        .attr('opacity', '20%');
      const data = mainData;
      const DATA_count = mainData.length;
      const startDates = new Date(dateFormatter(item.dateColumns[0].date, 'yyyy'));
      const x = d3
        .scaleTime() // .scaleLinear() originally
        // .domain([0, DATA_count]) // originally
        .domain([startDate, endDate])
        .range([0, INNER_WIDTH - gap]);
      const y = d3
        .scaleLinear()
        .domain([item.realized_pay, item.most_recent_realized_pay])
        .range([INNER_HEIGHT, 0]);
      const line = d3
        .line()
        .x((d, i) => x(d.date))
        .y((d, i) => y(d.chart_data));
      const chartG = svg.append('g').attr('transform', `translate(${leftPad * 7},${gap * index + 10})`);

      /*
       * Pass in data to line containing both the chart data and the report date.
       */
      const sparklineData = [
        // connect line from start of graph
        // eslint-disable-next-line arrow-body-style
        ...item.chart_data.map((d, idx) => {
          return {
            chart_data: d,
            date: new Date(dateFormatter(`${item.dateColumns[idx].date}`, 'yyyy'))
          };
        }),
      ];
      //create path with line
      const sparklineChartData = [];
      sparklineData.map((item) => {
        if (sparklineChartData.lenght > 0) {
          sparklineChartData.filter((subItem) => {
            if (item.chart_data !== subItem.chart_data && Date.parse(item.date) !== Date.parse(subItem.date)) {
              sparklineChartData.push(item);
            }
          });
        } else {
          sparklineChartData.push(item);
        }
      });
      chartG
        .append('path')
        .datum(sparklineData)
        .attr('fill', 'none')
        .attr('stroke', '#183f74')
        .attr('opacity', '100%')
        .attr('stroke-width', 2)
        .attr('d', line);
      //starting circle
      chartG
        .append('circle')
        .attr('r', 3)
        .attr('cx', x(sparklineData[0].date))
        .attr('cy', y(data[0]))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', '#183f74');
      //ending circle
      chartG
        .append('circle')
        .attr('r', 3)
        // x plots along the date scale
        .attr('cx', x(sparklineData[sparklineData.length - 1].date))
        .attr('cy', y(data[DATA_count - 1]))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', '#183f74');
    }
  };

  useEffect(() => {
    createSparklineChart();
  }, [createSparklineChart]);

  const setBlur = props.trialStatus ? 'blurrytext' : '';
  return (
    <>
      {props.data && (
        <Card title={props.title}>
          <div
            className={bem.b(
              width > LG_MIN_WIDTH || !query.print ? `col-lg-offset-3 row mt-3 ${setBlur}` : `col-lg-offset-3 row mt-2 ${setBlur}`
            )}
          >
            <div className='sparkline0' ref={wrapperRef}>
              <div className='sparkline' ref={ref} id='sparklines' />
            </div>
          </div>
          {props.bottomNote &&
            <div className='light-grey-text'>
              {props.bottomNote}
            </div>
          }
        </Card>
      )}
    </>
  );
};

export default React.memo(D3SparklineChart);
