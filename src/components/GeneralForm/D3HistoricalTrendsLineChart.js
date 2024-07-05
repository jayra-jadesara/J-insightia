import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  selectAll,
  line,
  schemeCategory10,
  select,
  scaleOrdinal,
  scaleTime,
  max,
  min,
  scaleLinear,
  axisBottom,
  axisLeft,
} from 'd3';
import useResizeObserver from './useResizeObserver';
import bn from '../../utils/bemnames';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('chart');

function D3HistoricalTrendsLineChart({
  title,
  smalltitle,
  isComp,
  isInvest,
  lineChartData,
  yearRange,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    function getALL() {
      const svg = select(svgRef.current);
      svg.selectAll('*').remove();
      const { width } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const height = 370;
      const margin = { top: 20, right: 35, bottom: 60, left: 35 };
      const duration = 250;
      const svgHight = height;
      let lineLegend = height - 15;
      let col = 0;

      const lineOpacity = '0.25';
      const lineOpacityHover = '0.85';
      const otherLinesOpacityHover = '0.1';
      const lineStroke = '1.5px';
      const lineStrokeHover = '2.5px';

      const circleOpacity = '0.85';
      const circleOpacityOnLineHover = '0.25';
      const circleRadius = 3;
      const circleRadiusHover = 6;

      const xScaleLastYear = new Date();
      xScaleLastYear.setFullYear(xScaleLastYear.getFullYear());

      const dateSelection = `15-10-${xScaleLastYear.getFullYear()}`;
      const xScaleStartYear = new Date(
        dateSelection.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
      );
      xScaleStartYear.setFullYear(xScaleStartYear.getFullYear() - 7);

      const arrChartValue = [];
      lineChartData.forEach((v) => {
        v.Values.forEach((vv) => {
          arrChartValue.push(vv.ChartValue);
        });
      });

      const xScale = scaleTime()
        .domain([xScaleStartYear, xScaleLastYear])
        .range([0, width - margin.right - 25]);

      let maxYScale = max(arrChartValue) + (max(arrChartValue) * 3) / 100;
      let minYScale = min(arrChartValue) - (min(arrChartValue) * 2) / 100;
      if (maxYScale > 100) {
        maxYScale = 100;
      }
      if (minYScale < 2) {
        minYScale = 0;
      }

      const yScale = scaleLinear()
        .domain([minYScale, maxYScale])
        .range([height - margin.right, 0]);

      const color = scaleOrdinal(schemeCategory10);

      const svg3 = svg
        .attr('width', `${width}px`)
        .attr('height', `${svgHight + margin.right}px`)
        .append('g')
        .attr('transform', `translate(${margin.right},${margin.right})`);

      /* Add line into SVG */
      const ln = line()
        .x((d) => xScale(d.Year))
        .y((d) => yScale(d.ChartValue));

      const lines = svg3.append('g').attr('class', 'lines');

      lines
        .selectAll('.line-group')
        .data(lineChartData)
        .enter()
        .append('g')
        .attr('class', 'line-group')
        .on('mouseover', (d, i) => {
          svg3
            .append('text')
            .attr('class', 'title-text')
            .style('fill', color(i))
            .text(i.Investor)
            .attr('text-anchor', 'middle')
            .attr('x', (width - margin.right) / 2)
            .attr('y', -5);
        })
        .on('mouseout', () => svg3.select('.title-text').remove())
        .append('path')
        .attr('d', (d) => ln(d.Values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .style('fill', 'none')
        .on('mouseover', () => {
          selectAll('.line').style('opacity', otherLinesOpacityHover);
          selectAll('.circle').style('opacity', circleOpacityOnLineHover);
          select(this)
            .style('opacity', lineOpacityHover)
            .style('stroke-width', lineStrokeHover)
            .style('cursor', 'pointer');
        })
        .on('mouseout', () => {
          selectAll('.line').style('opacity', lineOpacity);
          selectAll('.circle').style('opacity', circleOpacity);
          select(this)
            .style('stroke-width', lineStroke)
            .style('cursor', 'none');
        });

      /* Add circles in the line */
      lines
        .selectAll('circle-group')
        .data(lineChartData)
        .enter()
        .append('g')
        .style('fill', (d, i) => color(i))
        .selectAll('circle')
        .data((d) => d.Values)
        .enter()
        .append('g')
        .attr('class', 'circle')
        .on('mouseover', () => {
          select(this)
            .style('cursor', 'pointer')
            .append('text')
            .attr('class', 'text')
            .text((d) => d.ChartValue)
            .attr('x', (d) => xScale(d.Year) + 5)
            .attr('y', (d) => yScale(d.ChartValue) - 10);
        })
        .on('mouseout', () => {
          select(this)
            .style('cursor', 'none')
            .transition()
            .duration(duration)
            .selectAll('.text')
            .remove();
        })
        .append('circle')
        .attr('cx', (d) => xScale(d.Year))
        .attr('cy', (d) => yScale(d.ChartValue))
        .attr('r', circleRadius)
        .style('opacity', circleOpacity)
        .on('mouseover', () =>
          select(this)
            .transition()
            .duration(duration)
            .attr('r', circleRadiusHover)
        )
        .on('mouseout', () =>
          select(this).transition().duration(duration).attr('r', circleRadius)
        );

      /* Add Axis into SVG */
      const xAxis = axisBottom(xScale).ticks(5);
      const yAxis = axisLeft(yScale).ticks(5);

      svg3
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height - margin.right})`)
        .call(xAxis)
        .selectAll('text')
        .text((d) => {
          if (yearRange.length > 0 && yearRange[0].includes('-')) {
            const val = d.getFullYear() - 1;
            const data = yearRange.filter((x) => x.includes(val));
            return data;
          }
          const data = yearRange.filter((x) => x.includes(d.getFullYear()));
          return data;
        });

      svg3
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#000')
        .text('');

      // disable Source Proxy image on right side
      // svg3
      //   .append('image')
      //   .attr(
      //     'xlink:href',
      //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAFACAIAAADPluDFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVUSURBVHhe7ZpBcupIDIZnlbkUe64SVjkH2eUKrHKDVHEA9qyzZMMteL/6l/t1bFoS2BQzKX2l4hni+sao1eq2mX8ujyG9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS9JL0kvSS95Dd5v/Tfe7C8L+udHt2O5f13/aZHt+N4P06Xq+HieFfr7dXQM/p4eTjtr4fHM/L7+iDv9+X4La9XwsXyvmz2vdAz+pjX+7mtgVy3b/WMPpa35dYx/E3e1ee5BrztWz2jj+X92Lz1Qs/oY+cB19ULBye/tbXjoEYEy/t6wFTW1o4eX2NufksNHP8eH3aMSG24XqV33CPqbefuXO9q/YYUj8An+Fzf9LG8WBdwaRDVSsCxXOzM9UI47NDdayXgONLMgOcVjrUSanm4RLz3YHlf3o+90DP6WN6v97de6Bl9npEH0C692D6hziKbKGB5YXkdll7oXtZbdF55nb8/q4UFXancM6oNx/zQwPUKuMC2J7THPRwvE4oLbGtgrhdfGS0Gu9J2QUNTn7++SespXebvAqFZ9vC892J5R3O3DT2jj+XFVx7FR9kAzu7rDZh4GDG0YBm0Bfp6QUpts5ftu7Rgf9CA48Xag2yi1Er9Rps6sLw3ffERlleGaLNdfR7xHxiFntHH8tYuPg09o09o3O7gGd52go1Cz+jzm/KL7xtZyq7i5AEz7T67l4fTvtrrrhLhEsrvV9mwrnBnMYT+oY/jlU4mfWcnNcA1ieHhjJuuxMv2Helk0nDvwfServctbCpcLC/KAC2xHX0cl3TPnG+nPVIhtxUHWd/wuuD6dsYyjAtceH0DcpmbrdwVve/iE8/y1mzikrFocuKNMt7D8l7J5pBxfdvHzMP1bErG9bCPn198a6SVG+FIBojjRTalztYybnjFcWSRB5YXCpkCevtaouy0I1VheWW/P50Cp/1i9y0jep+3PMOLVE5bF5I714tUQoHRY4Wx2iS5gaZsesFBppxMX1nWpNoikwJ4XuEsVcEIb6197+hpOhIyTfoUywuFLJ2bPV75dph+88YNClmMmeJ6T6DTz8HyNvUkz5WLMdQcQNAbqtkWxyutp0R7jNAz+lheZLMXekYfy1uy2QsH26vVihkc+U2oxfJK/ZZqlf3vZn+T2vJCyhUeMxiFHPm5qWJ5R7V1U6k9ydvWbPtWz+hjjtvkdrCGntHH8s4hvcT3Ypq1M230tofvlXWomWmjtz1876iw/g91hoSiVSLqW5dAHkpOy6ZadzrL5Ld2y9p3Ig3I9051/20vVl/sozBo0HErNX89JmcUbNmqyqOYIp29HhMprGGr+h2QAt+Ldb7+SgRwXAvZIDhu7QZSHvroYZ+g9wfL1IMMV3k2gCyzHuQm1CMwbid5UoJZJx2Sm3W50XDwvbhGyS821YzYrYvvxTXq0S2Exq1c8m343o/P8gs6qrgJF987PNT4Efq3Pr63DNQ0HHwvynYaLr6XC/so9G99AnmolVsCk+1Lqtghkt+fyPOdR3iX6jujysWatEyd8QazRtlELVFnzT0mI0Qov+gPWHuQBLxGihf4XkhL25Vf6WU3Fbvx9L2Q6l2nJOGI42XmxaPWt0d5kVbULLLMWKx+kVaosYNCood91DL1C8ojP7QbWYlDJex425KqJRzB8kpDGEoKOmyfJNf5/+8MzPVy1cFOvdSWstB9ALfpTW1plj08772kl6SXpJc8xnu5/AHCywXi5c0TQwAAAABJRU5ErkJggg=='
      //   )
      //   .attr('class', 'pico')
      //   .attr('height', height)
      //   .attr('width', '29')
      //   .attr('x', width - margin.right - margin.right)
      //   .attr('y', '-40');

      const legendRectSize = 15;
      const legendSpacing = 18;

      // Draw the legend
      const legend = svg3
        .selectAll('.legend')
        .data(lineChartData)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', () => {
          let y = lineLegend;
          let x = col;
          col += 20 * 15;
          if (col > width) {
            x = 0;
            col = 20 * 15;
            lineLegend += 15;
            y = lineLegend;
          }
          return `translate(${x},${y})`;
        });

      legend
        .append('rect')
        .attr('width', 8)
        .attr('height', 8)
        .style('fill', (d, i) => color(i));

      legend
        .append('text')
        .attr('x', legendRectSize + legendSpacing - 18)
        .attr('y', legendRectSize - legendSpacing + 10)
        .style('font-size', '10px')
        .text((d) => {
          if (d.Investor.length > 55) {
            return `${d.Investor.substring(0, 55)}...`;
          }
          return d.Investor;
        });
    }
    getALL();
  }, [lineChartData, dimensions, yearRange]);

  return (
    <ErrorBoundary>
      <Card
        isComp={isComp}
        isInvest={isInvest}
        title={title}
        smalltitle={smalltitle}
      >
        <div ref={wrapperRef} className={bem.b('h-100')}>
          <svg ref={svgRef} />
        </div>
      </Card>
    </ErrorBoundary>
  );
}

D3HistoricalTrendsLineChart.propTypes = {
  // lineChartData: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     Investor: PropTypes.string.isRequired,
  //     InvestorStrRep: PropTypes.string.isRequired,
  //     InvestorId: PropTypes.number.isRequired,
  //     Values: PropTypes.arrayOf(
  //       PropTypes.shape({ Year: PropTypes.object.isRequired, ChartValue: PropTypes.number.isRequired }).isRequired
  //     ).isRequired
  //   }).isRequired
  // ).isRequired,
  title: PropTypes.string,
  smalltitle: PropTypes.string,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  lineChartData: PropTypes.array,
};

D3HistoricalTrendsLineChart.defaultProps = {
  title: '',
  smalltitle: '',
  isComp: false,
  isInvest: false,
  lineChartData: [],
};

export default React.memo(D3HistoricalTrendsLineChart);
