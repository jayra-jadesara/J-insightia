import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import qs from 'qs';
import Card from './Card';
import { getColorArr } from '../../utils/general-util';
import { history } from '../../utils/navigation-util';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
const bem = bn.create('d3charts');

const D3PieChart = (props) => {
  const svgHeight = props.outerRadius * 2 + 10;
  const svgWidth = props.outerRadius * 2 + 40;

  const svgMainHeight =
    props.svgMainHeight !== undefined ? props.svgMainHeight : svgHeight;
  const svgMainWidth =
    props.svgMainWidth !== undefined
      ? props.svgMainWidth
      : svgWidth - svgWidth / 8;

  const ref = useRef(null);
  const refLegend = useRef(null);
  const createPie = d3
    .pie()
    .padAngle(0.03)
    .value((d) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(getColorArr(props.data.length));
  const format = d3.format('.0f');

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

  useEffect(() => {
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const group2 = d3.select(refLegend.current);
    const groupWithData = group.selectAll('g.arc').data(data);
    const groupWithData2 = group2.selectAll('div').data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .data(data)
      .attr('class', 'arc')
      // .attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`);

    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'));

    path
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i));

    const text = groupWithUpdate
      .append('text')
      .merge(groupWithData.select('text'));

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', '0.8em')
      .text((d) => {
        if (d.value !== 0) {
          if (props.isSetChartPercentage) {
            return `${format(d.value)}%`;
          }
          return format(d.value);
        }
        return '';
      });

    //#region Legends
    const legend = groupWithData2
      .enter()
      .append('div')
      .attr('class', 'divlegend');
    const legendDiv = legend.append('div').attr('class', 'sqaurediv');
    legendDiv.append('div').style('background-color', (d, i) => colors(i));

    const legendText = legend.append('div').attr('class', 'textdiv');
    legendText.append('span').text((d) => {
      let ltext = legendTextFn(d.data.text);
      if (ltext.includes('(0%)')) {
        ltext = ltext.replaceAll('(0%)', '(>0%)');
      }
      return ltext;
    });
    //#endregion
  }, [
    props.data,
    colors,
    createArc,
    createPie,
    format,
    props.outerRadius,
    svgHeight,
    svgWidth,
    props.isDynamicLegendFontSize,
    props.isSetChartPercentage,
    props.isDynamicViewbox
  ]);

  return (
    <ErrorBoundary>
    <Card
      isComp={props.isComp}
      isInvest={props.isInvest}
      title={props.cardtitle}
      smalltitle={props.cardsmalltitle}
      addedClass={bem.b('')}
    >
      <div className={props.TrialUser ? 'D3PieChart blurrytext' : 'D3PieChart'}>
        <div
          className={
            props.isDummyData
              ? 'd-block m-auto text-center blurrytext'
              : 'd-block m-auto text-center'
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={
              props.isDynamicViewbox !== undefined
                ? `0 0 ${svgHeight} ${svgWidth}`
                : '0 0 200 200'
            }
            preserveAspectRatio='xMaxYMax meet'
            height={
              props.isDynamicViewbox !== undefined
                ? svgMainHeight
                : svgHeight - 30
            }
            width={
              props.isDynamicViewbox !== undefined
                ? svgMainWidth + 15
                : svgHeight - 80
            }
            className={props.className}
          >
            <g
              ref={ref}
              transform={
                props.isDynamicViewbox !== undefined
                  ? 'translate(-40,15)'
                  : 'translate(-20,-25)'
              }
            />
          </svg>
        </div>

        {
          //#region Legends
          query.print ? (
            <div
              className='mb-1'
              ref={refLegend}
              style={{ maxHeight: '100%' }}
            />
          ) : (
            <div
              className='legendsList mb-1'
              ref={refLegend}
              style={{ overflowY: 'auto', maxHeight: '80px' }}
            />
          )
          //#endregion
        }
      </div>
    </Card>
    </ErrorBoundary>
  );
};

D3PieChart.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool,
  outerRadius: PropTypes.number,
  width: PropTypes.number,
  isDynamicViewbox: PropTypes.any,
  isSetChartPercentage: PropTypes.bool,
  svgMainHeight: PropTypes.any,
  svgMainWidth: PropTypes.any
};

export default React.memo(D3PieChart);
