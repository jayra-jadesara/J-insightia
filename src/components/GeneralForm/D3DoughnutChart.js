import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import useWindowDimensions from './useWindowDimensions';
import ErrorBoundary from './ErrorBoundary';

const D3DoughnutChart = (props) => {
  const { width } = useWindowDimensions();
  const widthWindow = width;
  const breakpoint = 1100;
  const ref = useRef(null);
  const dimensions = useResizeObserver(ref);

  const percentageDigit = props.topValue || props.data.max_score || 20;
  const duration = 0;
  const percent = props.data !== undefined ? props.data.score : 0;

  const drawDonutChart = useCallback(async () => {
    const getColorForPercentage = (pct) => {
      let i = 1;
      for (i; i < percentColors.length - 1; i += 1) {
        if (pct < percentColors[i].pct) {
          break;
        }
      }

      const lower = percentColors[i - 1];
      const upper = percentColors[i];
      const range = upper.pct - lower.pct;
      const rangePct = (pct - lower.pct) / range;
      const pctLower = 1 - rangePct;
      const pctUpper = rangePct;
      const color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
      };

      return `rgb(${[color.r, color.g, color.b].join(',')})`;
    };

    let percentColors = [];

    if (props.isMoreWorse) {
      percentColors = [
        { pct: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } }
      ];
    } else {
      percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
      ];
    }

    const calcPercent = (percent) => [percentageDigit - percent, percent];

    let { width, height } = dimensions || ref.current.getBoundingClientRect();
    d3.select(ref.current).selectAll('*').remove();
    const margin = 10;

    width = typeof width !== 'undefined' ? width : 290;
    height = typeof height !== 'undefined' ? height : 290;

    const color = getColorForPercentage(percent / percentageDigit);
    let colors = ['#dcdcdc', color];
    if (props.data.Colour !== '' && props.data.Colour !== undefined) {
      colors = ['#dcdcdc', props.data.Colour];
    }

    let status = '';
    if (props.data.ranking !== '' && props.data.ranking !== undefined) {
      status = props.data.ranking;
    } // else
    // if (props.isMoreWorse) {
    //   if (percent >= percentageDigit * 0.95) status = 'Poor';
    //   if (percent >= percentageDigit * 0.75 && percent < percentageDigit * 0.95) status = 'Bad';
    //   if (percent >= percentageDigit * 0.65 && percent < percentageDigit * 0.75) status = 'Average';
    //   if (percent >= percentageDigit * 0.55 && percent < percentageDigit * 0.65) status = 'Good';
    //   if (percent < percentageDigit * 0.55) status = 'Excellent';
    // } else {
    //   if (percent >= percentageDigit * 0.95) status = 'Excellent';
    //   if (percent >= percentageDigit * 0.75 && percent < percentageDigit * 0.95) status = 'Good';
    //   if (percent >= percentageDigit * 0.65 && percent < percentageDigit * 0.75) status = 'Average';
    //   if (percent >= percentageDigit * 0.55 && percent < percentageDigit * 0.65) status = 'Bad';
    //   if (percent < percentageDigit * 0.55) status = 'Poor';
    // }

    const dataset = {
      lower: calcPercent(percent),
      upper: calcPercent(percent)
    };
    const radius = Math.min(width, height) / 2 - margin;
    const pie = d3.pie().sort(null);

    const total_codes = percentageDigit;
    const remaining_codes = percentageDigit - percent;
    const issued = total_codes - remaining_codes;
    const dataset1 = {
      privileges: [remaining_codes, issued]
    };
    const pieData = pie(dataset1.privileges);

    const arc = d3
      .arc()
      .innerRadius(radius - 10)
      .outerRadius(radius);

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    let path = svg
      .selectAll('path')
      .data(pie(dataset.lower))
      .enter()
      .append('path')
      .style('fill', (d, i) => colors[i])
      .attr('d', arc)
      .each(function (d) {
        this._current = d;
      });

    svg
      .append('g')
      .attr('transform', () => {
        const meanRadius = radius - 5;
        const angleRadians = pieData[0].endAngle - Math.PI / 2;
        const xOffset = Math.cos(angleRadians) * meanRadius;
        const yOffset = Math.sin(angleRadians) * meanRadius;
        return ` translate(${xOffset}, ${yOffset})`;
      })
      .append('circle')
      .attr('r', '8')
      .style('fill', 'white')
      .style('stroke', '#6b6b6b');

    svg
      .append('g')
      .attr('transform', () => {
        const meanRadius = radius - 5;
        const angleRadians = pieData[0].endAngle - Math.PI / 2;
        const xOffset = Math.cos(angleRadians) * meanRadius;
        const yOffset = Math.sin(angleRadians) * meanRadius;
        return ` translate(${xOffset}, ${yOffset})`;
      })
      .append('circle')
      .attr('r', '4')
      .style('fill', () => colors[1])
      .style('stroke', '#6b6b6b')
      .style('opacity', 0.9);

    const text = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'style',
        widthWindow > breakpoint
          ? 'font-size: 22px!important;font-family: "Roboto", sans-serif; font-weight: 600; line-height: 10rem; fill: #07476f;'
          : 'font-size: small!important;font-family: "Roboto", sans-serif; font-weight: 600; line-height: 10rem; fill: #07476f;'
      )
      .text(props.isShowPercentage ? `${percent}%` : percent);

    const textstatus = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'style',
        widthWindow > breakpoint
          ? 'font-size: 11px!important; font-family: "Roboto", sans-serif;font-weight: 500; line-height: 15rem; fill: #07476f;'
          : 'font-size: xx-small!important; font-family: "Roboto", sans-serif;font-weight: 500; line-height: 15rem; fill: #07476f;'
      )
      .attr('dy', '1.38em')
      .text(status);

    if (typeof percent === 'string') {
      props.isShowPercentage ? text.text(`${percent}%`) : text.text(percent);
    } else {
      const progress = 0;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        path = path.data(pie(dataset.upper));
        path
          .transition()
          .delay((d, i) => i * 800)
          .duration(duration)
          .attrTween('d', function (d) {
            let i2;
            const i = d3.interpolate(this._current, d);
            props.isShowPercentage
              ? (i2 = d3.interpolate(progress, `${percent}%`))
              : (i2 = d3.interpolate(progress, percent));
            this._current = i(0);
            return function (t) {
              text.text(i2(t));
              textstatus.text(status);
              return arc(i(t));
            };
          });
      }, 200);
    }
  }, [
    dimensions,
    duration,
    props.data,
    percentageDigit,
    props.isMoreWorse,
    widthWindow,
    props.isShowPercentage
  ]);

  useEffect(() => {
    drawDonutChart();
  }, [drawDonutChart]);

  return props.isShowCard ? (
    <Card
      isComp={props.isComp}
      isInvest={props.isInvest}
      title={props.cardtitle}
      smalltitle={props.cardsmalltitle}
    >
      <ErrorBoundary>
      <div
        className={props.TrialUser ? 'blurrytext' : ''}
        style={{
          width: '100%',
          height: props.height,
          position: 'relative',
          bottom: '10px'
        }}
        ref={ref}
      />

      </ErrorBoundary>
    </Card>
  ) : (
    <ErrorBoundary>
    <div
      className={props.TrialUser ? 'blurrytext' : ''}
      style={{ width: '100%', height: props.height }}
      ref={ref}
    />
    </ErrorBoundary>
  );
};

D3DoughnutChart.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  data: PropTypes.any,
  height: PropTypes.number,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.any,
  isInvest: PropTypes.bool,
  isShowCard: PropTypes.bool,
  isShowPercentage: PropTypes.bool
};

D3DoughnutChart.defaultProps = {
  cardsmalltitle: '',
  cardtitle: '',
  data: undefined,
  height: 0,
  isComp: false,
  isDummyData: undefined,
  isInvest: false,
  isShowCard: true,
  isShowPercentage: false
};

export default React.memo(D3DoughnutChart);
