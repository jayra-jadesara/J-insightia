import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from './Card';
import useResizeObserver from './useResizeObserver';
import { SM_MIN_WIDTH } from '../../constants/ScreenSizeConstant';
import ErrorBoundary from './ErrorBoundary';

const dateFormatter = require('dateformat');

const D3GanttChart = ({
  taskArray,
  height,
  title,
  smalltitle,
  isComp,
  isInvest
}) => {
  const ref = useRef();
  const wrapperRef = useRef();
  const h = height;
  const startYear = '2013-1-1';
  const currentYear = `${dateFormatter(new Date(), 'yyyy-m-d', true)}`;
  const dimensions = useResizeObserver(wrapperRef);
  const { width } =
    dimensions ||
    (wrapperRef.current !== undefined &&
      wrapperRef.current.getBoundingClientRect());
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
      let tspan = textEl
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

  useEffect(() => {
    if (taskArray.length > 0) {
      const w = width < SM_MIN_WIDTH ? screen.width : width;
      const data = [];
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].endTime !== null && taskArray[i].startTime !== null) {
          if (
            taskArray[i].endTime > startYear ||
            taskArray[i].startTime >= startYear
          ) {
            data.push(taskArray[i]);
          }
        }
      }
      //filter unique companies
      let categories = [];
      const positionName = [];
      for (let i = 0; i < data.length; i++) {
        categories.push(data[i].type);
      }
      for (let i = 0; i < data.length; i++) {
        positionName.push({
          position: data[i].task,
          company: data[i].type
        });
      }
      const catsUnfiltered = categories; //for vert labels
      categories = checkUnique(categories);

      const barHeight = 20;
      const gap = barHeight + 15;
      const topPadding = barHeight + categories.length;
      const sidePadding = width < SM_MIN_WIDTH ? 140 : 150;
      const svgHeight = 50 + gap * categories.length;

      const endDate = [];
      const startDate = [];

      for (let i = 0; i < data.length; i++) {
        endDate.push(Number(data[i].endTime));
        startDate.push(Number(data[i].startTime));
      }
      const years = endDate.concat(startDate);
      const totalYears = [...new Set(years.map((item) => item))];

      if (ref.current !== null) {
        d3.select(ref.current).selectAll('svg').remove();
      }

      const svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', w)
        .attr('height', svgHeight);

      const dateFormat = d3.timeParse('%Y-%m-%d');

      const timeScale = d3
        .scaleTime()
        .domain([
          d3.min(data, (d) => dateFormat(startYear)),
          d3.max(data, (d) => dateFormat(currentYear))
        ])
        .range([0, w - (sidePadding + 25)]);

      makeGant(data, w, h);

      function makeGant(tasks, pageWidth, pageHeight) {
        const colorScale = d3
          .scaleLinear()
          .domain([0, categories.length])
          .range(['#00B9FA', '#F95002'])
          .interpolate(d3.interpolateHcl);

        makeGrid(sidePadding, topPadding, pageWidth, pageHeight, gap);
        drawRects(
          tasks,
          gap,
          topPadding,
          sidePadding,
          barHeight,
          colorScale,
          pageWidth,
          pageHeight
        );
        vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
      }

      function drawRects(
        theArray,
        theGap,
        theTopPad,
        theSidePad,
        theBarHeight,
        theColorScale,
        w,
        h
      ) {
        const bigRects = svg
          .append('g')
          .selectAll('rect')
          .data(theArray)
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + theTopPad - 2;
              }
            }
          })
          .attr('width', (d) => w - theSidePad / 2)
          .attr('height', theGap)
          .attr('stroke', 'none')
          .attr('fill', 'white')
          .attr('opacity', 0.1);

        const rectangles = svg
          .append('g')
          .selectAll('rect')
          .data(theArray)
          .enter();

        //Duration line between two points
        const innerRects = rectangles
          .append('line')
          .attr('x2', (d) => {
            if (d.startTime >= startYear) {
              return timeScale(dateFormat(d.startTime)) + theSidePad;
            }
            return theSidePad;
          })
          .attr('x1', (d) => {
            if (d.endTime > currentYear) {
              return w - 25;
            }
            return timeScale(dateFormat(d.endTime)) + theSidePad;
          })
          .attr('y2', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + theTopPad + 10;
              }
            }
          })
          .attr('y1', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + theTopPad + 10;
              }
            }
          })
          .attr('pathLength', '100')
          .attr('stroke', '#203864')
          .attr('stroke-width', '2')
          .attr('stroke-dasharray', (d) => {
            if (d.startTime >= startYear) {
              return '0';
            }
            return '90,2,3,2,3';
          });

        //endpoint circle
        const endpoint = rectangles
          .append('circle')
          .attr('r', 5)
          .attr('cx', (d) => {
            if (d.endTime > currentYear) {
              return w - 25;
            }
            return timeScale(dateFormat(d.endTime)) + theSidePad;
          })
          .attr('cy', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + theTopPad + 10;
              }
            }
          })
          .attr('width', 20)
          .attr('height', 20)
          .attr('stroke', '#203864')
          .attr('stroke-width', (d) => {
            if (d.endTime >= `${currentYear}`) {
              return '4';
            }
            return '1';
          })
          .attr('fill', (d) => {
            if (d.endTime >= `${currentYear}`) {
              return '#ffffff';
            }
            return '#203864';
          });

        //start point circle
        const startpoint = rectangles
          .append('circle')
          .attr('r', (d) => {
            if (d.startTime >= startYear) {
              return 5;
            }
            return 0;
          })
          .attr('cx', (d) => timeScale(dateFormat(d.startTime)) + theSidePad)
          .attr('cy', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + theTopPad + 10;
              }
            }
          })
          .attr('width', 20)
          .attr('height', 20)
          .attr('border-radius', '50%')
          .attr('fill', '#203864');

        // TEXT **************************
        const rectText = rectangles
          .append('text')
          .text((d) => d.task)
          .attr(
            'x',
            (d, i) =>
              (timeScale(dateFormat(d.endTime)) -
                timeScale(dateFormat(d.startTime))) /
                2 +
              timeScale(dateFormat(d.startTime)) +
              theSidePad
          )
          .attr('y', (d) => {
            for (let i = 0; i < categories.length; i++) {
              if (d.type === categories[i]) {
                return i * theGap + 14 + theTopPad;
              }
            }
          })
          .attr('font-size', '1rem')
          .attr('text-anchor', 'middle')
          .attr('text-height', theBarHeight)
          .attr('fill', '#fff')
          .attr('display', 'none');

        innerRects
          .on('mouseover', (d, e) => {
            const tag = `${e.type},- ${e.task}
            ${'<br/>'} ${e.startTime} To ${
              e.endTime >= currentYear ? 'Present' : e.endTime
            }`;
            const output = document.getElementById('tag');

            const x = `${d.offsetX + 50}px`;
            const y = `${d.offsetY + 60}px`;

            output.innerHTML = tag;
            output.style.top = y;
            output.style.left = x;
            output.style.display = 'block';
            output.style.position = 'absolute';
          })
          .on('mouseout', () => {
            const output = document.getElementById('tag');
            output.style.display = 'none';
          });
      }

      function makeGrid(theSidePad, theTopPad, w, h, gap) {
        const xAxis = d3
          .axisBottom(timeScale)
          .ticks(12)
          .tickSize(-svgHeight + 3 * data.length, 0, 0)
          .tickFormat(d3.timeFormat('%Y-%m-%d'));

        const grid = svg
          .append('g')
          .attr('class', 'grid')
          .attr('id', 'xaxis')
          .attr('opacity', 1)
          .attr('transform', `translate(${theSidePad},${svgHeight - 20})`)
          .call(xAxis)
          .selectAll('text')
          .style('text-anchor', 'middle')
          .attr('fill', '#000')
          .attr('stroke', 'none')
          .attr('font-size', width < SM_MIN_WIDTH ? 7 : 11)
          .attr('dy', '1em')
          .text((d) => {
            const xAxisYear = dateFormatter(d, 'yyyy');
            const lastYear = dateFormatter(currentYear, 'yyyy');
            if (Number(xAxisYear) === Number(lastYear)) {
              return 'Present';
            }
            return xAxisYear;
          })
          .attr(
            'transform',
            `translate(${width < SM_MIN_WIDTH ? 0 : 0}, ${
              width < SM_MIN_WIDTH ? -2 : 0
            })`
          );
      }

      function vertLabels(
        theGap,
        theTopPad,
        theSidePad,
        theBarHeight,
        theColorScale
      ) {
        const numOccurances = [];
        let numPositions = [];

        for (let i = 0; i < categories.length; i++) {
          numOccurances[i] = [
            categories[i],
            getCount(categories[i], catsUnfiltered)
          ];
        }

        data.forEach((item) => {
          numOccurances.forEach((item2) => {
            if (item.type === item2[0]) {
              if (numPositions.length <= 0) {
                numPositions.push({
                  company: item2[0],
                  position: item.task,
                  lable: `${item2[0]} ${item.task},`
                });
              } else {
                numPositions.filter((positions, i) => {
                  if (positions.company === item2[0] && positions.position !== item.task) {
                    positions.lable = `${positions.lable} ${item.task},`;
                  } else {
                    numPositions.push({
                      company: item2[0],
                      position: item.task,
                      lable: `${item2[0]} ${item.task},`
                    });
                  }
                });
              }
            }
          });
        });

        numPositions = checkUniqueLable(numPositions);
        const axisText = svg
          .append('g') //without doing this, impossible to put grid lines behind text
          .selectAll('text')
          .data(numPositions)
          .enter()
          .append('text')
          .text((d) => d.lable)
          .attr('x', 10)
          .attr('id', 'yaxis')
          .attr('y', (d, i) => {
            if (i > 0) {
              for (let j = 0; j < i; j++) {
                return i * theGap + 14 + theTopPad;
              }
            } else {
              return i * theGap + 14 + theTopPad;
            }
          })
          .attr('font-size', '0.7rem')
          .attr('text-anchor', 'center')
          .attr('text-height', 14)
          .attr('fill', 'black')
          .call(wrapText, 140);
        const positionX = axisText.append('text').text('hello');
      }
      function checkUnique(arr) {
        const hash = {};
        const result = [];
        for (let i = 0, l = arr.length; i < l; ++i) {
          if (!Object.prototype.hasOwnProperty.call(hash, arr[i])) {
            //it works with objects! in FF, at least
            hash[arr[i]] = true;
            result.push(arr[i]);
          }
        }
        return result;
      }
      function checkUniqueLable(arr) {
        const hash = {};
        const result = [];
        for (let i = 0, l = arr.length; i < l; ++i) {
          if (!Object.prototype.hasOwnProperty.call(hash, arr[i].company)) {
            //it works with objects! in FF, at least
            hash[arr[i].company] = true;
            result.push(arr[i]);
          }
        }
        return result;
      }

      function getCounts(arr) {
        let i = arr.length; // const to loop over
        const obj = {}; // obj to store results
        while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
        return obj;
      }

      // get specific from everything
      function getCount(word, arr) {
        return getCounts(arr)[word] || 0;
      }
    }
  }, [height, taskArray, dimensions]);

  return (
    <ErrorBoundary>
      <Card
        isComp={isComp}
        isInvest={isInvest}
        title={title}
        smalltitle={smalltitle}
      >
        <div
          ref={wrapperRef}
          className={
            width < SM_MIN_WIDTH ? 'scrollableDiv ganttChart' : 'ganttChart'
          }
        >
          <div className='svg' ref={ref} />
          <div id='tag' />
        </div>
      </Card>
    </ErrorBoundary>
  );
};
D3GanttChart.propTypes = {
  taskArray: PropTypes.array,
  height: PropTypes.number,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  smalltitle: PropTypes.string,
  title: PropTypes.string
};
D3GanttChart.defaultProps = {
  taskArray: [],
  height: 250,
  title: '',
  smalltitle: '',
  isComp: false,
  isInvest: false
};

export default React.memo(D3GanttChart);
