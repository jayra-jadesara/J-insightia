import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  select,
  selectAll,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  stack,
  stackOffsetExpand,
  format,
  axisLeft,
  axisTop,
  axisBottom,
} from 'd3';
import { nest } from 'd3-collection';
import useResizeObserver from './useResizeObserver';
import bn from '../../utils/bemnames';
import Card from './Card';
import { SM_MIN_WIDTH } from '../../constants/ScreenSizeConstant';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('chart');

function D3GroupbarChart({ title, smalltitle, isComp, isInvest, chartdata, isPrint }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  function wrap(text, width) {
    text.each(() => {
      const text = select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1;
      const y = text.attr('y');
      const dy = parseFloat(text.attr('dy'));
      let tspan = text
        .text(null)
        .append('tspan')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', `${dy}em`);

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', `${++lineNumber * lineHeight + dy}em`)
            .text(word);
        }
      }
    });
  }

  useEffect(() => {
    function getALL() {
      const svg = select(svgRef.current);
      const { width } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const height = isPrint ? 250 : 350;
      let margin = 50;

      selectAll('.D3GroupbarChart svg > *').remove();
      svg
        .attr('width', `${width}px`)
        .attr('height', `${height + margin + 70}px`);
      margin = { top: 40, right: 45, bottom: 60, left: 35 };

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x0 = scaleBand()
        .rangeRound([0, width - margin.right - 20])
        .paddingInner(0.1);

      const x1 = scaleBand().padding(0.05);
      const y = scaleLinear().rangeRound([height, 0]);
      const z = scaleOrdinal().range(['#62D32C', '#e41c1b', '#ffc22c']);
      const st = stack().offset(stackOffsetExpand);

      x0.domain(chartdata.map((d) => d.Investor));
      x1.domain(chartdata.map((d) => d.Year))
        .rangeRound([0, x0.bandwidth()])
        .padding(0.2);

      z.domain(chartdata.map((d) => d.VoteCast));
      const keys = z.domain();

      const groupData = nest()
        .key((d) => d.Year + d.Investor)
        .rollup((d) => {
          const d2 = {
            Year: d[0].Year,
            display_year: d[0].display_year,
            Investor: d[0].Investor,
          };
          d.forEach((d) => {
            d2[d.VoteCast] = d.Value;
          });
          return d2;
        })
        .entries(chartdata)
        .map((d) => d.value);

      const stackData = st.keys(keys)(groupData);

      const serie = g
        .selectAll('.serie')
        .data(stackData)
        .enter()
        .append('g')
        .attr('class', 'serie')
        .attr('fill', (d) => {
          const a = z(d.key);
          return a;
        });

      serie
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('class', 'serie-rect')
        .attr('transform', (d) => `translate(${x0(d.data.Investor)},0)`)
        .attr('x', (d) => {
          const year = d.data.Year;
          const val = x1(year);
          return val;
        })
        .attr('y', (d) => {
          const val = y(d[1]);
          return val;
        })
        .attr('height', (d) => y(d[0]) - y(d[1]))
        .attr('width', x1.bandwidth());

      serie
        .selectAll('text')
        .data((d) => d)
        .enter()
        .append('text')
        .text((d) => {
          const txt = d.data.display_year; //d.data.Year
          return txt;
        })
        .attr(
          'transform',
          (d) =>
            `translate(${
              x0(d.data.Investor) + x1(d.data.Year) + x1.bandwidth() / 3
            },${height}) rotate(90)`
        )
        .attr('x', 5)
        .attr('y', 0)
        .style('font-size', () => {
          if (width > SM_MIN_WIDTH) {
            return '12px';
          }
          if (width < SM_MIN_WIDTH) {
            return '6px';
          }
        })
        .style('font-weight', 'bold')
        .attr('fill', 'Gray');

      const formatPercent = format('.0%');
      const yAxis = axisLeft(y).tickFormat(formatPercent).ticks(8);

      selectAll('.D3GroupbarChart path.domain').remove();
      selectAll('.D3GroupbarChart .tick line').remove();

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(axisBottom(x0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-15)')
        .text('');

      // add Investor Title under stacked graphs
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(axisBottom(x0))
        .selectAll('text')
        .style('text-anchor', 'middle')
        .attr('dx', '0.2em')
        .attr('dy', isPrint ? '-23em' : '-32em') // 40px
        .text((d, i, arr) => {
          if (arr.length > 8 && d.length > 14) {
             d = `${d.substring(0, 14)}...`;
          } else if (arr.length > 4 && d.length > 20) {
            d = `${d.substring(0, 20)}...`;
          }
          return d;
        })
        .attr('class', 'customBar')
        .style('font-size', () => {
          if (width > SM_MIN_WIDTH) {
            return '12px';
          }
          if (width < SM_MIN_WIDTH) {
            return '6px';
          }
        })
        .style('font-weight', 'bold')
        .attr('fill', 'Grey');

      g.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text('');

      const legendRectSize = 12;
      const legendSpacing = 22;

      const legend = svg
        .selectAll('.legend-lineChart')
        .data(keys.slice().reverse())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr(
          'transform',
          (d, i) =>
            `translate(${(i % 3) * 50 + 50}, ${
              Math.floor(i / 3) * 10 + height + 100
            })`
        );

      legend
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', z)
        .style('stroke', z);

      legend
        .append('text')
        .attr('x', legendRectSize + legendSpacing - 18)
        .attr('y', legendRectSize - legendSpacing + 22)
        .text((d) => d);
    }
    getALL();
  }, [chartdata, dimensions]);

  return (
    <ErrorBoundary>
      <Card
        isComp={isComp}
        isInvest={isInvest}
        title={title}
        smalltitle={smalltitle}
      >
        <div ref={wrapperRef} className={bem.b('h-100 D3GroupbarChart')}>
          <svg ref={svgRef} />
        </div>
      </Card>
    </ErrorBoundary>
  );
}

D3GroupbarChart.propTypes = {
  chartdata: PropTypes.arrayOf(
    PropTypes.shape({
      Investor: PropTypes.string.isRequired,
      InvestorId: PropTypes.number.isRequired,
      InvestorStrRep: PropTypes.string.isRequired,
      Value: PropTypes.string.isRequired,
      VoteCast: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  smalltitle: PropTypes.string,
  title: PropTypes.string,
};

D3GroupbarChart.defaultProps = {
  title: '',
  smalltitle: '',
  isComp: false,
  isInvest: false,
};

export default React.memo(D3GroupbarChart);
