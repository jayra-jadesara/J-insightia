import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import $ from 'jquery';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import bn from '../../utils/bemnames';
import Modal from './Modal';
import { NUMBER_ZERO } from '../../constants/NumberConstants';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('linechart');
const D3AnnotatedSharePrice = ({
  lolliPopGraph,
  stockGraph,
  country_hq,
  cardtitle,
  cardsmalltitle,
  stockExchange,
  isDummyData
}) => {
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(svgRef);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalDesc, setModalDesc] = useState(null);

  function OptionChkBind(RangLollipopColor) {
    for (let i = 0; i < RangLollipopColor.length; i += 1) {
      $('#childOption_Selection')
        .append(
          `
            <lable>
            <label style="float: left;" id="id_${RangLollipopColor[
              i
            ].label.replace(' ', '')}">${RangLollipopColor[i].label}</label>
            <input style="float: right;" id="subToggle_${RangLollipopColor[
              i
            ].label.replace(' ', '')}" name="${RangLollipopColor[i].label}" 
            class="toggle-slide" onclick="Toggle();" type="checkbox" checked>
            </lable>`
        )
        .append('<div style="padding:4px 0 0 0;"><br/>');
    }
  }

  const GetDatapointGraphColour = (size, order_no) => {
    const colours_two = ['#112D3C', '#4BADCF'];
    const colours_three = ['#112D3C', '#4BADCF', '#575756'];
    const colours_four = ['#112D3C', '#4BADCF', '#2B6C70', '#575756'];
    const colours_five = [
      '#112D3C',
      '#005A7F',
      '#4BADCF',
      '#2B6C70',
      '#575756'
    ];
    const colours_six = [
      '#090A16',
      '#112D3C',
      '#005A7F',
      '#4BADCF',
      '#2B6C70',
      '#575756'
    ];
    const colours_seven = [
      '#090A16',
      '#112D3C',
      '#005A7F',
      '#4BADCF',
      '#2B6C70',
      '#575756',
      '#839DA9'
    ];
    const colours_eight = [
      '#090A16',
      '#112D3C',
      '#005A7F',
      '#4BADCF',
      '#2B6C70',
      '#299A76',
      '#575756',
      '#839DA9'
    ];
    const colours_nine = [
      '#090A16',
      '#112D3C',
      '#005A7F',
      '#4BADCF',
      '#2B6C70',
      '#299A76',
      '#575756',
      '#526168',
      '#839DA9'
    ];

    if (order_no <= 9) {
      switch (size) {
        case 1:
          return '#090A16';
        case 2:
          return colours_two[order_no];
        case 3:
          return colours_three[order_no];
        case 4:
          return colours_four[order_no];
        case 5:
          return colours_five[order_no];
        case 6:
          return colours_six[order_no];
        case 7:
          return colours_seven[order_no];
        case 8:
          return colours_eight[order_no];
        case 9:
          return colours_nine[order_no];
        default:
          return colours_nine[order_no];
      }
    }
    return '#07476F';
  };

  useEffect(() => {
    const lst_event_type = [];
    const ColorLstLollipop = [];
    let { width, height } =
      dimensions || svgRef.current.getBoundingClientRect();

    lolliPopGraph.length > 0 &&
      lolliPopGraph.forEach((pop) => {
        if (!lst_event_type.includes(pop.event_type)) {
          lst_event_type.push(pop.event_type);
        }
      });

    lst_event_type.forEach((event, i) => {
      ColorLstLollipop.push(GetDatapointGraphColour(lst_event_type.length, i));
    });

    const json_Lollipop_chart_type_colors = [];
    if (ColorLstLollipop.length > 0) {
      ColorLstLollipop.forEach((colour, i) => {
        json_Lollipop_chart_type_colors.push({
          label: lst_event_type[i],
          value: colour
        });
      });
    }

    const margin = {
      top: 40,
      right: 50,
      bottom: 20,
      left: 50
    };
    const margin2 = {
      top: 20,
      right: 50,
      bottom: 20,
      left: 50
    };
    const height2 = 100 - margin2.bottom - margin2.top;
    height -= 100 + height2;
    d3.select(svgRef.current).selectAll('*').remove();
    width = width - margin.left - margin.right - margin.right;

    // parse the date / time
    const legendFormat = d3.timeFormat('%b %d, %Y');
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const x2 = d3.scaleTime().range([0, width]);
    const y2 = d3.scaleLinear().range([height2, 0]);
    const bisectDate = d3.bisector((d) => d.Date).left;

    // scale the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // define the stock value line
    const valueline_stock = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d) => x(new Date(d.Date)))
      .y((d) => y(d.close_value));

    // add base svg
    const svg = d3
      .select(svgRef.current)
      .attr('class', 'chart')
      .append('svg')
      .attr('id', 'svg')
      .attr('width', width + margin.left + margin.right)
      .attr(
        'height',
        height +
          margin.top +
          margin.bottom +
          height2 +
          margin2.top +
          margin2.bottom
      );

    // add clipPath, ('lense' on focus g), cuts off elements heading outside of graph zone
    const def = svg.append('defs');
    // focus, main graph g, stock graph 'container'
    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .attr('clip-path', 'url(#clip)')
      .attr('transform', `translate( ${margin.left},${margin.top})`);

    // the g element that has mouseover attached, for shwoing stock values tooltip
    const mouse_area_valueline_stock = def
      .append('g')
      .attr('class', 'chart__mouse')
      .append('rect')
      .attr('class', 'chart__overlay')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    def
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height + 30)
      .attr('transform', 'translate(0, -10)');

    // legend g
    const legend = svg
      .append('g')
      .attr('class', 'chart__legend')
      .attr('width', width)
      .attr('height', 30)
      .attr('transform', `translate(${margin2.left}, 15)`);

    legend.append('text').attr('class', 'chart__symbol').text(stockExchange);

    // Define the div for the lollipop tooltip
    d3.select(svgRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // brush g
    const brush_g = d3
      .select(svgRef.current)
      .select('#svg')
      .append('g')
      .attr(
        'transform',
        `translate( ${margin2.left},${
          margin.top + margin.bottom + height + margin2.top
        })`
      );

    // stock value and lollipop jsons
    const data = stockGraph;
    const data_pop = lolliPopGraph;
    const RangLollipopColor = json_Lollipop_chart_type_colors;

    // adding/render data to the graph based on datasource
    function draw(data, data_pop_temp) {
      // part of brush set up
      const brush = d3.brushX().on('brush', (e) => brushed(e));
      // stock value json processing
      // format the data
      const data1 = data
        .map((d) => ({ ...d, Date: new Date(d.Date) }))
        .sort((a, b) => a.Date - b.Date);

      // sort years ascending

      // lollipop json processing
      // format the data
      const data_pop =
        data_pop_temp.length > 0 &&
        data_pop_temp
          .map((d) => ({
            ...d,
            stick_height: 140,
            pop_height: 134,
            Date: new Date(d.Date)
          }))
          .sort((a, b) => a.Date - b.Date);
      // sort years ascending
      // Scale the range of the data

      const xRange = d3.extent(data1.map((d) => new Date(d.Date)));
      x.domain(xRange);
      y.domain(d3.extent(data1.map((d) => d.close_value)));
      x2.domain(x.domain());
      y2.domain(y.domain());

      // min max stock value, used as emergency for brush/zooming
      const min = d3.min(data1.map((d) => d.close_value));
      const max = d3.max(data1.map((d) => d.close_value));

      // min max stock value, used as emergency for brush/zooming
      const min_date = d3.min(data1.map((d) => new Date(d.Date)));
      const max_date = d3.max(data1.map((d) => new Date(d.Date)));

      // brushed date range, legend data
      const brushed_range = legend
        .append('text')
        .text(
          `${legendFormat(new Date(xRange[0]))} - ${legendFormat(
            new Date(xRange[1])
          )}`
        )
        .style('text-anchor', 'end')
        .attr('transform', `translate(${width}, 0)`);

      const path_valueline_stock = focus
        .append('path')
        .datum(data1)
        .attr('fill', 'none')
        .attr('stroke', '#0000FF')
        .attr('stroke-width', 4)
        .attr('class', 'line chart__price--focus')
        .attr('d', valueline_stock);

      focus
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom().scale(x).tickFormat(d3.timeFormat('%b %Y')));

      focus
        .append('g')
        .append('g')
        .attr('class', 'y axis')
        .attr('height', height)
        .attr('transform', 'translate(9, 0)')
        .call(yAxis);
      // brush_area added to svg, for brush_g
      const brush_area = d3
        .area()
        .x((d) => x2(new Date(d.Date)))
        .y0(height2)
        .y1((d) => y2(d.close_value));

      // add path to brush_area, brush_g
      brush_g
        .append('path')
        .data([data1])
        .attr('class', 'chart__area area')
        .attr('d', brush_area);

      // add x axis to brush_g
      brush_g
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,60)')
        .call(d3.axisBottom().scale(x2).tickFormat(d3.timeFormat('%b %Y')));

      // add rect to brush_g, brush 'area'
      brush_g
        .append('g')
        .attr('class', 'x brush')
        .call(brush)
        .selectAll('rect')
        .attr('y', -6)
        .attr('height', height2 + 7);

      // add stock_tooltip_g to legend, which is made visible and text is set when mouseover
      const stock_tooltip_g = legend
        .append('g')
        .attr('class', 'chart__helper')
        .style('text-anchor', 'end')
        .attr('transform', `translate(${width}, 15)`);

      // variable used to set stock_tooltip_g text when mouseover
      const stock_tooltip_g_text = stock_tooltip_g.append('text');

      // add lollipop_tooltip_g to legend, which is made visible and text is set when mouseover
      legend
        .append('g')
        .attr('class', 'chart__helper')
        .style('text-anchor', 'end')
        .attr('transform', `translate(${width}, 15)`);

      // variable used to set lollipop_tooltip_g text when mouseover
      const lollipop_tooltip_g_text = stock_tooltip_g.append('text');

      // the red circle shown over path_valueline_stock when mouseover
      const path_valueline_stock_pointer = focus
        .append('g')
        .attr('class', 'chart__tooltip--price')
        .append('circle')
        .style('display', 'none')
        .attr('r', 4.0)
        .on('mouseover', (e) => {
          mousemove(e);
        });

      // mouseover funtionality added to path_valueline_stock
      path_valueline_stock
        .on('mouseover', () => {
          path_valueline_stock_pointer.style('display', null);
        })
        .on('mouseout', () => {
          stock_tooltip_g_text.text('');
          path_valueline_stock_pointer.style('display', 'none');
        })
        .on('mousemove', (e) => {
          mousemove(e);
        });

      // mouseover funtionality added to mouse_area_valueline_stock
      mouse_area_valueline_stock
        .on('mouseover', () => {
          path_valueline_stock_pointer.style('display', null);
        })
        .on('mouseout', () => {
          stock_tooltip_g_text.text('');
          path_valueline_stock_pointer.style('display', 'none');
        })
        .on('mousemove', (e) => {
          mousemove(e);
        });

      // stock value mouseover functionality
      function mousemove(e) {
        const x0 = x.invert(d3.pointer(e, focus.node())[0]);
        const i = bisectDate(data1, x0, 1, data1.length - 1);

        const d0 = data1[i - 1];
        const d1 = data1[i];
        const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
        stock_tooltip_g_text.text(
          `${legendFormat(new Date(d.Date))} - High Value: ${
            d.high_value
          } Close Value: ${d.close_value} Low Value: ${
            d.low_value
          } Open Value: ${d.open_value} Volume: ${d.volume}`
        );
        path_valueline_stock_pointer.attr(
          'transform',
          `translate(${x(new Date(d.Date))},${y(d.close_value)})`
        );
      }

      // add lollipop sticks, on brush_g
      const lollipop_sticks_focus_g = focus
        .selectAll('rect')
        .data(data_pop)
        .enter()
        .append('rect')
        .attr('class', 'chart__lollipop_stick')
        .style('pointer-events', 'none') // removes event triggering
        .attr('x', (d) => x(new Date(d.Date)))
        .attr('y', (d) => d.pop_height + 6)
        .attr('width', 0.4)
        .attr('height', (d) => height - d.pop_height - 6);

      /// /add lollipop circles, on brush_g
      const lollipop_circles_focus_g = focus
        .selectAll('circles')
        .data(data_pop)
        .enter()
        .append('circle')
        // .attr('class', 'chart__lollipop')
        .style('fill', (d) => getColorClassName(d.event_type))
        .attr('cx', (d) => x(new Date(d.Date)) - 1)
        .attr('cy', (d) => d.pop_height)
        .attr('r', 4) // No overlapping
        .on('click', (d, i) => {
          lollipop_click(i);
        })
        .on('mouseover', (d, i) => {
          lollipop_mouseover(i.event_type);
        })
        .on('mouseout', () => {
          lollipop_tooltip_g_text.text('');
        });

      function getColorClassName(event_type) {
        for (let i = 0; i < RangLollipopColor.length; i += 1) {
          if (event_type === RangLollipopColor[i].label) {
            return RangLollipopColor[i].value;
          }
        }
      }
      OptionChkBind(RangLollipopColor);

      initial_brushed();
      function lollipop_click(d) {
        setShow(true);
        setModalTitle(d.event_type);
        setModalDesc(d.event_description);
      }

      function lollipop_mouseover(d) {
        stock_tooltip_g_text.text('');
        lollipop_tooltip_g_text.text(
          `Event : ${d}. Click for more information.`
        );
      }
      // brush function
      function brushed(e) {
        const s = e.selection || x2.range();
        let ext = x.domain();
        if (s) {
          x.domain(s.map(x2.invert, x2));
          ext = x.domain();
          y.domain([
            d3.min(
              data1.map((d) =>
                d.Date >= ext[0] && d.Date <= ext[1] ? d.close_value : max
              )
            ),
            d3.max(
              data1.map((d) =>
                d.Date >= ext[0] && d.Date <= ext[1] ? d.close_value : min
              )
            )
          ]);
          brushed_range.text(
            `${legendFormat(new Date(ext[0]))} - ${legendFormat(
              new Date(ext[1])
            )}`
          );
          lollipop_sticks_focus_g.attr('x', (d) => x(d.Date));
          lollipop_circles_focus_g.attr('cx', (d) => x(d.Date));

          // lollipop resising on brush
        }
        path_valueline_stock.attr('d', valueline_stock);
        focus.select('.x.axis').call(xAxis);
        focus.select('.y.axis').call(yAxis);

        if (s) {
          let prev_obj;
          for (let i = 0; i < data_pop.length; i += 1) {
            if (i > 0) {
              const obj = data_pop[i];
              prev_obj = data_pop[i - 1];
              if (prev_obj.Date === obj.Date) {
                obj.pop_height = prev_obj.pop_height - 12;
                obj.stick_height = 0;
              }
            }
          }
          const Difference_In_Time = ext[1] - ext[0];
          const Difference_In_Days = Math.round(
            Difference_In_Time / (1000 * 3600 * 24)
          );
          const day_pixel_width = width / Difference_In_Days;
          for (let i = 0; i < data_pop.length; i += 1) {
            if (i > 0) {
              const obj = data_pop[i];
              prev_obj = data_pop[i - 1];
              const pop_Difference_In_Time = obj.Date - prev_obj.Date;
              const pop_Difference_In_Days = Math.round(
                pop_Difference_In_Time / (1000 * 3600 * 24)
              );
              const pixel_diff_lollipop =
                pop_Difference_In_Days * day_pixel_width;
              if (pixel_diff_lollipop < 24) {
                let wham;
                for (let ii = [i - 1]; ii > 0; ii--) {
                  if (data_pop[ii].stick_height > 0) {
                    wham = data_pop[ii].pop_height;
                    break;
                  }
                }
                if (wham === 134) {
                  obj.pop_height = prev_obj.pop_height - 12;
                }
              } else {
                obj.pop_height = 134;
              }
            }
          }
          lollipop_sticks_focus_g.attr('y', (d) => {
            if (d.stick_height === NUMBER_ZERO) {
              return height;
            }

            return d.pop_height + 6;
          });

          lollipop_sticks_focus_g.attr('height', (d) => {
            if (d.stick_height === NUMBER_ZERO) {
              return 0;
            }

            return height - d.pop_height - 6;
          });

          lollipop_circles_focus_g.attr('cy', (d) => d.pop_height);
        }
      } // brush function end
      // brush function
      function initial_brushed() {
        let prev_obj;

        for (let i = 0; i < data_pop.length; i += 1) {
          if (i > 0) {
            const obj = data_pop[i];
            prev_obj = data_pop[i - 1];
            if (prev_obj.Date === obj.Date) {
              obj.pop_height = prev_obj.pop_height - 12;
              obj.stick_height = 0;
            }
          }
        }
        const Difference_In_Time = Math.abs(
          new Date(max_date) - new Date(min_date)
        );
        const Difference_In_Days = Math.ceil(
          Difference_In_Time / (1000 * 60 * 60 * 24)
        );
        const day_pixel_width = width / Difference_In_Days;
        for (let i = 0; i < data_pop.length; i += 1) {
          if (i > 0) {
            const obj = data_pop[i];
            prev_obj = data_pop[i - 1];
            const pop_Difference_In_Time_previous =
              new Date(obj.Date) - new Date(prev_obj.Date);
            const pop_Difference_In_Days_previous = Math.round(
              pop_Difference_In_Time_previous / (1000 * 60 * 60 * 24)
            );
            const pixel_diff_lollipop_previous =
              pop_Difference_In_Days_previous * day_pixel_width;
            if (pixel_diff_lollipop_previous < 24) {
              let wham;
              for (let ii = [i - 1]; ii > 0; ii--) {
                if (data_pop[ii].stick_height > 0) {
                  wham = data_pop[ii].pop_height;
                  break;
                }
              }
              if (wham === 134) {
                obj.pop_height = prev_obj.pop_height - 12;
              }
            } else {
              obj.pop_height = 134;
            }
            if (i < data_pop.length - 1) {
              const next_obj = data_pop[i + 1];
              const pop_Difference_In_Time_next = Math.abs(
                new Date(obj.Date) - new Date(next_obj.Date)
              );
              const pop_Difference_In_Days_next = Math.ceil(
                pop_Difference_In_Time_next / (1000 * 60 * 60 * 24)
              );
              const pixel_diff_lollipop_next =
                pop_Difference_In_Days_next * day_pixel_width;

              if (pixel_diff_lollipop_next < 24) {
                obj.pop_height = next_obj.pop_height + 12;
              } else {
                obj.pop_height = 134;
              }
            }
          }
        }
        lollipop_sticks_focus_g.attr('y', (d) => {
          if (d.stick_height === NUMBER_ZERO) {
            return height;
          }

          return d.pop_height + 6;
        });
        lollipop_sticks_focus_g.attr('height', (d) => {
          if (d.stick_height === NUMBER_ZERO) {
            return 0;
          }

          return height - d.pop_height - 6;
        });

        lollipop_circles_focus_g.attr('cy', (d) => d.pop_height);
      } // brush function end
    } // function draw end
    // trigger render
    draw(data, data_pop, country_hq);

    // stock graph function end
  }, [dimensions, country_hq, lolliPopGraph, stockExchange, stockGraph]); // props.data,

  return (
    <ErrorBoundary>
    <div className={bem.b()}>
      <Card title={cardtitle} smalltitle={cardsmalltitle}>
        <div
          className={isDummyData ? 'd-inline-flex blurrytext' : 'd-inline-flex'}
          ref={svgRef}
          style={{ width: '100%', height: '400px' }}
        />
      </Card>
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        title={modalTitle}
        size='md'
      >
        <p>{modalDesc}</p>
      </Modal>
    </div>
    </ErrorBoundary>
  );
};

D3AnnotatedSharePrice.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  lolliPopGraph: PropTypes.array,
  stockGraph: PropTypes.array,
  stockExchange: PropTypes.string,
  country_hq: PropTypes.string,
  isDummyData: PropTypes.bool
};

D3AnnotatedSharePrice.defaultProps = {
  cardsmalltitle: '',
  cardtitle: '',
  lolliPopGraph: [],
  stockGraph: [],
  stockExchange: '',
  country_hq: '',
  isDummyData: false
};

export default React.memo(D3AnnotatedSharePrice);
