import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import d3tip from 'd3-tip';
import { propTypes } from 'react-bootstrap/esm/Image';
import { history } from '../../utils/navigation-util';
import config from '../../config/server-config';
import PageSpinner from '../PageSpinner';
import bn from '../../utils/bemnames';
import pathConst from '../../constants/PathsConstant';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('worldmap');

const D3Map = ({ index, onCountyClickEvent, mobileScreenStopZoom, cardTitle, D3Class, tableData }) => {
  const [isloading, setIsloading] = useState(true);
  const mobileScreenStopZoomRef = useRef(mobileScreenStopZoom);
  const handleOnCountyClickEvent = useCallback(
    async (e) => {
      if (onCountyClickEvent !== undefined && onCountyClickEvent !== null) {
        await onCountyClickEvent(e);
      }
      return true;
    }
  );
  const handleClick = useRef(async (e, d) => {
    // 'rgb(127,162,202)' is lightly blue shouldn't be able to be clicked as it doesn't have data
    e.preventDefault();
    if (d.properties.population !== 'rgb(127,162,202)') {
     setIsloading(true);
     await handleOnCountyClickEvent({ value: d.properties.cid, label: d.properties.name });
     setIsloading(false);
    }
    d3.select(this).style('opacity', 0.8).style('stroke', 'white').style('stroke-width', 0.3);
  });
  const svgRef = useRef(null);
  const worldmap = useCallback(async () => {
    const abortController = new AbortController();
    let result;
    // for activism dashboard widget
    if (history.location.pathname === pathConst.DASHBOARD) {
      result = await axios.post(
        config.getCountriesMapActivismCampaigns,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
    } else {
      // for governance map
      result = await axios.post(
        config.getCountriesMap,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
    }
    const { data } = result;
    // Set tooltips

    const tip = d3tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html((data) => `<span class='details'>${data.properties.name}<br></span>`);

    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const width = 960 - margin.left - margin.right;
    const height = 560 - margin.top - margin.bottom;

    const maxScale = 120;

    let path = d3.geoPath();

    const svg = d3.select(svgRef.current).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('class', 'map');

    const g = svg.append('g');

    const projection = d3
      .geoMercator()
      .scale(maxScale)
      .rotate([-11, -5])
      .translate([width / 2, height / 1.5]);

    path = d3.geoPath().projection(projection);

    g.append('rect').attr('class', 'background').attr('width', width).attr('height', height).style('fill', '#ffffff');

    svg.call(tip);

    const ready = async () => {
      svg
        .append('g')
        .attr('class', 'countries')
        .attr('id', `worldmap_${index}`)
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', (d) => d.properties.population)
        .style('stroke', 'white')
        .style('overflow', 'hidden')
        .style('stroke-width', 1.5)
        .style('opacity', 0.8)
        .style('stroke', 'white')
        .style('stroke-width', 0.3)
        .on('mouseover', function (e, d) {
          e.preventDefault();
          tip.show(d, this);
          d3.select(this).style('opacity', 1).style('stroke', 'white').style('stroke-width', 1.5);
        })
        .on('mouseout', function (d, v) {
          tip.hide(d, v);
          d3.select(this).style('opacity', 0.8).style('stroke', 'white').style('stroke-width', 0.3);
        })
        .on('click', handleClick.current);

      const zoom = d3
        .zoom()
        .scaleExtent([1, 50])
        .on('zoom', function () {
          const transform = d3.zoomTransform(this);
          const tx = Math.min(0, Math.max(transform.x, width - width * transform.k));
          const ty = Math.min(0, Math.max(transform.y, height - height * transform.k));
          d3.select(`#worldmap_${index}`).attr(
            'transform',
            [`translate(${[tx, ty]})`, `scale(${transform.k})`].join(' ')
          );
        });
      if (!mobileScreenStopZoomRef.current) svg.call(zoom);

      svg
        .append('path')
        .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
        .attr('class', 'names')
        .attr('d', path);
    };
    await ready();
    setIsloading(false);
    return function cleanup() {
      abortController.abort();
    };
  }, [index, handleClick]);

  useEffect(() => {
    const abortController = new AbortController();
    worldmap();
    return function cleanup() {
      abortController.abort();
    };
  }, [worldmap]);

  return (
    <ErrorBoundary>
      <div title={cardTitle} smalltitle='' className='m-0 p-0'>
        <div className={D3Class !== undefined ? D3Class : ''}>
          <div className={bem.b('col-lg-offset-3')}>{isloading ? <PageSpinner spinner='border' /> : ''}</div>
          <div ref={svgRef} className='div_map' />
        </div>
      </div>
    </ErrorBoundary>
  );
};

D3Map.propTypes = {
  D3Class: PropTypes.string,
  cardTitle: PropTypes.string,
  index: PropTypes.any.isRequired,
  onCountyClickEvent: PropTypes.func,
};

D3Map.defaultProps = {
  D3Class: '',
  cardTitle: '',
  onCountyClickEvent: () => {},
};

export default React.memo(D3Map);
