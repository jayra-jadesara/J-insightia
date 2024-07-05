import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import qs from 'qs';
import { history } from '../../utils/navigation-util';
import Card from './Card';
import bn from '../../utils/bemnames';
import useWindowDimensions from './useWindowDimensions';

const bem = bn.create('d3TreeMapChart');

const D3TreeMap = (props) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const { width } = useWindowDimensions();
  const windowWidth = width;
  const breakpoint = 768;
  const isMobileView = windowWidth < breakpoint;

  const svgRef = useRef(null);
  const legendRef = useRef(null);

  const data = props.data;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const height = 445 - margin.top - margin.bottom;

  function renderTreemap() {
    const svg = d3.select(svgRef.current);
    svg.selectAll('g').remove();

    const legendContainer = d3.select(legendRef.current);
    legendContainer.selectAll('.divlegend').remove();

    let width = windowWidth / 1.4 - margin.left - margin.right;
    if (isMobileView) {
      width = windowWidth - margin.left - margin.right - 25;
    }

    svg.attr('width', width).attr('height', height);

    // create root node
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    // create treemap layout
    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    // create 'g' element nodes based on data
    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .style('cursor', 'pointer')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    // create color scheme and fader
    const fader = (color) => d3.interpolateRgb(color, '#fff')(0.2); //0.3
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    // add treemap rects
    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => colorScale(d.data.category));

    // show title on mouse hover
    nodes.append('title').text((d) => {
      const title = `Skill: ${d.data.name}\nGrouping: ${d.data.category}  ${d.data.value}`;
      return title;
    });

    const fontSize = 11;

    // add text to rects
    nodes
      .append('text')
      .text((d) => `${d.data.name}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      .attr('x', 3)
      .attr('y', fontSize)
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .call(wrapText);
    nodes
      .append('text')
      .text((d) => `${d.data.category} ${d.data.value}`)
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      .attr('x', 3)
      .attr('y', fontSize * 4)
      // .style('fill', 'white')
      .call(wrapText);

    function wrapText(selection) {
      selection.each(function () {
        const node = d3.select(this);
        const rectWidth = +node.attr('data-width');
        let word;
        const words = node.text().split(' ').reverse();
        let line = [];
        let lineNumber = 0;
        const x = node.attr('x');
        const y = node.attr('y');
        let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
        while (words.length > 0) {
          word = words.pop();
          line.push(word);
          tspan.text(line.join(' '));
          const tspanLength = tspan.node().getComputedTextLength();
          if (tspanLength > rectWidth && line.length !== 1) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = addTspan(word);
          }
        }

        addTspan(words.pop());

        function addTspan(text) {
          lineNumber += 1;
          return node
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', `${lineNumber * fontSize}px`)
            .text(text);
        }
      });
    }

    // pull out hierarchy categories
    let categories = root.leaves().map((node) => node.data.category);
    categories = categories.filter(
      (category, index, self) => self.indexOf(category) === index
    );

    //#region Legends
    const groupWithData = legendContainer.selectAll('div').data(categories);
    const legendX = groupWithData
      .enter()
      .append('div')
      .attr('class', 'divlegend');
    const legendDiv = legendX.append('div').attr('class', 'sqaurediv');
    legendDiv.append('div').style('background-color', (d) => colorScale(d));

    function legendTextFn(text) {
      let legendTxt = text;
      if (legendTxt !== undefined) {
        if (legendTxt.startsWith('<br/>')) {
          legendTxt = legendTxt.replace('<br/>', '');
        }
        return legendTxt.replaceAll('<br/>', '\n');
      }
      return '';
    }
    const legendText = legendX.append('div').attr('class', 'textdiv');
    legendText.append('span').text((d) => {
      const ltext = legendTextFn(d);
      return ltext;
    });
    //#endregion
  }

  useEffect(() => {
    renderTreemap();
  }, [data, windowWidth]);

  return (
    <Card
      isComp={props.isComp}
      isInvest={props.isInvest}
      title={props.cardtitle}
      smalltitle={props.cardsmalltitle}
      addedClass={bem.b('')}
    >
      <div>
        <svg ref={svgRef} />
        {
          //#region Legends
          query.print ? (
            <div
              ref={legendRef}
              className='mb-1'
              style={{ maxHeight: '100%' }}
            />
          ) : (
            <div
              ref={legendRef}
              className={
                isMobileView
                  ? 'legendsList position-static mb-1'
                  : 'legendsList mb-1'
              }
              style={{
                overflowY: 'auto',
                maxHeight: isMobileView ? '100px' : `${height}px`,
                width: isMobileView ? '100%' : '',
              }}
            />
          )
          //#endregion
        }
      </div>
    </Card>
  );
};

export default React.memo(D3TreeMap);
