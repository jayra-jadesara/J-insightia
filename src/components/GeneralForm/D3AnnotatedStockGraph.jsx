import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResizeObserver from './useResizeObserver';
import Card from './Card';
import { NUMBER_ZERO } from '../../constants/NumberConstants';
import ErrorBoundary from './ErrorBoundary';

const D3AnnotatedStockGraph = (props) => {
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(svgRef);
  useEffect(() => {
    let { width, height } = dimensions || svgRef.current.getBoundingClientRect();
    d3.select(svgRef.current).selectAll('*').remove();
    const data1 = props.data;
    const data = data1.map((d) => ({
      label: new Date(d.chart_date),
      value: d.value,
    }));

    const margin = { top: 40, right: 50, bottom: 20, left: 50 },
    margin2 = { top: 20, right: 50, bottom: 20, left: 50 },
    width = 1060 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    height2 = 100 - margin2.bottom - margin2.top;

// parse the date / time
const parseTime = d3.time.format("%Y-%m-%d").parse;
const parseDate = d3.time.format("%Y-%m-%d");
const legendFormat = d3.time.format('%b %d, %Y');
const bisectDate = d3.bisector(function (d) { return d.Date; }).left;

// set the ranges
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);
const x2 = d3.time.scale().range([0, width]);
const y2 = d3.scale.linear().range([height2, 0]);

// scale the axis
const xAxis = d3.svg.axis().scale(x).orient('bottom');
const yAxis = d3.svg.axis().scale(y).orient('left');
const xAxis2 = d3.svg.axis().scale(x2).orient('bottom');

// define the stock value line
const valueline_stock = d3.svg.line().interpolate('monotone')
    .x(function (d) { return x(d.Date); })
    .y(function (d) { return y(d.close_value); });

//add base svg
const svg = d3.select("#div_graph").attr('class', 'chart').append("svg").attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + height2 + margin2.top + margin2.bottom);

// add clipPath, ('lense' on focus g), cuts off elements heading outside of graph zone
svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height + 30).attr("transform", "translate(0, -10)");

// the g element that has mouseover attached, for shwoing stock values tooltip
const mouse_area_valueline_stock = svg.append('g')
    .attr('class', 'chart__mouse')
    .append('rect')
    .attr('class', 'chart__overlay')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//focus, main graph g, stock graph 'container'
const focus = svg.append("g").attr('class', 'focus').attr("clip-path", "url(#clip)")
    .attr("transform", "translate( " + margin.left + "," + (margin.top) + ")");

//legend g
const legend = svg.append('g')
    .attr('class', 'chart__legend')
    .attr('width', width)
    .attr('height', 30)
    .attr('transform', 'translate(' + margin2.left + ', 15)');

legend.append('text')
    .attr('class', 'chart__symbol')
    .text('NASDAQ: AAPL');

// Define the div for the lollipop tooltip
const div_tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// brush g
const brush_g = d3.select("#div_graph").select("#svg").append("g")
    .attr("transform", "translate( " + margin2.left + "," + (margin.top + margin.bottom + height + margin2.top) + ")");

//stock value and lollipop jsons
const data_pop = JSON.parse(document.getElementById('<%=hdn_lollipop.ClientID %>').value);
const RangLollipopColor = <%= json_Lollipop_chart_type_colors %>;
const RangLollipopType = <%= json_Lollipop_chart_type %>;

// adding/render data to the graph based on datasource
function draw(data, data_pop, country) {
    //part of brush set up
    const brush = d3.svg.brush()
        .x(x2)
        .on('brush', brushed)
        //.on("brushend", update_lollipops)
        ;

    //stock value json processing
    const data = data[country];
    // format the data
    data.forEach(function (d) {
        d.Date = parseTime(d.Date);
        d.high_value = +d.high_value;
        d.close_value = +d.close_value;
        d.open_value = +d.open_value;
        d.low_value = +d.low_value;
        d.volume = +d.volume;
    });
    // sort years ascending
    data.sort(function (a, b) {
        return a["Date"] - b["Date"];
    });

    //lollipop json processing
    const data_pop = data_pop[country];
    // format the data
    data_pop.forEach(function (d) {
        d.Date = parseTime(d.Date);
        +d.event_description;
        +d.event_type;
        d.stick_height = 140;
        d.pop_height = 134;
        d.prev_Date = new Date();
    });
    // sort years ascending
    data_pop.sort(function (a, b) {
        return a["Date"] - b["Date"];
    })


    // Scale the range of the data

    const xRange = d3.extent(data.map(function (d) { return d.Date; }));

    x.domain(xRange);
    y.domain(d3.extent(data.map(function (d) { return d.close_value; })));
    x2.domain(x.domain());
    y2.domain(y.domain());

    // min max stock value, used as emergency for brush/zooming
    const min = d3.min(data.map(function (d) { return d.close_value; }));
    const max = d3.max(data.map(function (d) { return d.close_value; }));

    // min max stock value, used as emergency for brush/zooming
    const min_date = d3.min(data.map(function (d) { return d.Date; }));
    const max_date = d3.max(data.map(function (d) { return d.Date; }));

    //brushed date range, legend data
    const brushed_range = legend.append('text')
        .text(legendFormat(new Date(xRange[0])) + ' - ' + legendFormat(new Date(xRange[1])))
        .style('text-anchor', 'end')
        .attr('transform', 'translate(' + width + ', 0)');

    // Add the path_valueline_stock path, to focus g
    const path_valueline_stock = focus.append("path")
        .datum(data)
        .attr("class", "line chart__price--focus")
        .attr("d", valueline_stock);

    // Add the X axis, focus g
    //focus.append("g").append("g").attr('class', 'x axis');
    focus.append("g").append("g").attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis, focus g
    focus.append("g").append("g").attr('class', 'y axis')
        .attr("height", height)
        .attr('transform', 'translate(9, 0)')
        .call(yAxis);

    //brush_area added to svg, for brush_g
    const brush_area = d3.svg.area()
        .interpolate('monotone')
        .x(function (d) { return x2(d.Date); })
        .y0(height2)
        .y1(function (d) { return y2(d.close_value); });

    //add path to brush_area, brush_g
    brush_g.append('path')
        .data([data])
        .attr('class', 'chart__area area')
        .attr('d', brush_area);


    //add x axis to brush_g
    brush_g.append('g')
        .attr('class', 'x axis chart__axis--context')
        .attr('y', 0)
        .attr('transform', 'translate(0,' + (height2 - 22) + ')')
        .call(xAxis2);

    //add rect to brush_g, brush 'area'
    brush_g.append('g')
        .attr('class', 'x brush')
        .call(brush)
        .selectAll('rect')
        .attr('y', -6)
        .attr('height', height2 + 7);

    //add stock_tooltip_g to legend, which is made visible and text is set when mouseover
    const stock_tooltip_g = legend.append('g')
        .attr('class', 'chart__helper')
        .style('text-anchor', 'end')
        .attr('transform', 'translate(' + width + ', 15)');

    //variable used to set stock_tooltip_g text when mouseover
    const stock_tooltip_g_text = stock_tooltip_g.append('text');

    //add lollipop_tooltip_g to legend, which is made visible and text is set when mouseover
    const lollipop_tooltip_g = legend.append('g')
        .attr('class', 'chart__helper')
        .style('text-anchor', 'end')
        .attr('transform', 'translate(' + width + ', 15)');

    //variable used to set lollipop_tooltip_g text when mouseover
    const lollipop_tooltip_g_text = stock_tooltip_g.append('text');

    //the red circle shown over path_valueline_stock when mouseover
    const path_valueline_stock_pointer = focus.append('g')
        .attr('class', 'chart__tooltip--price')
        .append('circle')
        .style('display', 'none')
        .attr('r', 4.0)
        .on("mouseover", mousemove);

    //mouseover funtionality added to path_valueline_stock
    path_valueline_stock.on('mouseover', function () {
        //stock_tooltip_g.style('display', null);   
        path_valueline_stock_pointer.style('display', null);
        //averageTooltip.style('display', null);
    })
        .on('mouseout', function () {
            //stock_tooltip_g.style('display', 'none');
            stock_tooltip_g_text.text("");
            path_valueline_stock_pointer.style('display', 'none');
            //averageTooltip.style('display', 'none');
        })
        .on('mousemove', mousemove);

    //mouseover funtionality added to mouse_area_valueline_stock
    mouse_area_valueline_stock.on('mouseover', function () {
        //stock_tooltip_g.style('display', null);   
        path_valueline_stock_pointer.style('display', null);
        //averageTooltip.style('display', null);
    })
        .on('mouseout', function () {
            //stock_tooltip_g.style('display', 'none');
            stock_tooltip_g_text.text("");
            path_valueline_stock_pointer.style('display', 'none');
            //averageTooltip.style('display', 'none');
        })
        .on('mousemove', mousemove);

    //stock value mouseover functionality
    function mousemove() {

        const x0 = x.invert(d3.mouse(this)[0]);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;

        stock_tooltip_g_text.text(legendFormat(new Date(d.Date)) + ' - High Value: ' + d.high_value + ' Close Value: ' + d.close_value + ' Low Value: ' + d.low_value + ' Open Value: ' + d.open_value + ' Volume: ' + d.volume);

        path_valueline_stock_pointer.attr('transform', 'translate(' + x(d.Date) + ',' + y(d.close_value) + ')');

    }

    //add lollipop sticks, on brush_g                    
    const lollipop_sticks_focus_g = focus.selectAll('rect')
        .data(data_pop)
        .enter()
        .append('rect')
        .attr('class', 'chart__lollipop_stick')
        .style("pointer-events", "none") // removes event triggering
        .attr('x', function (d, i) { return x(d.Date); })
        .attr('y', function (d, i) { return d.pop_height + 6; })
        .attr('width', 0.4)
        .attr('height', function (d, i) { return height - d.pop_height - 6; });

    ////add lollipop circles, on brush_g
    const lollipop_circles_focus_g = focus.selectAll("circles")
        .data(data_pop)
        .enter()
        .append("circle")
        //.attr('class', 'chart__lollipop')                                           
        .style("fill", function (d, i) { return getColorClassName(d.event_type); })
        .attr("cx", function (d) { return x(d.Date) - 1; })
        .attr("cy", function (d) { return d.pop_height; })
        .attr("r", 4) // No overlapping
        .on("click", function (d) { lollipop_click(d) })
        .on("mouseover", function (d) { lollipop_mouseover(d) })
        .on("mouseout", function (d) {
            lollipop_tooltip_g_text.text("");
        });

    function getColorClassName(event_type) {
        for (const i = 0; i < RangLollipopColor.length; i += 1) {
            if (event_type === RangLollipopColor[i].label)
                return RangLollipopColor[i].value;
        }
    }
    OptionChkBind(RangLollipopColor);

    initial_brushed();
    initial_brushed();
    initial_brushed();
    initial_brushed();

    function lollipop_click(d) {
        const el = document.createElement("div");
        el.innerHTML = "<div class='swal-text' style='margin:0px;'> <h2>" + d.event_type + "</h2> <br/> " + d.event_description + "</div>"

        swal({
            content: el,
            button: false
        });
    };

    function lollipop_mouseover(d) {

        stock_tooltip_g_text.text("");
        lollipop_tooltip_g_text.text("Event : " + d.event_type + ". Click for more information.");
    };
    //brush function
    function brushed() {
        const ext = brush.extent();
        if (!brush.empty()) {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            y.domain([
                d3.min(data.map(function (d) { return (d.Date >= ext[0] && d.Date <= ext[1]) ? d.close_value : max; })),
                d3.max(data.map(function (d) { return (d.Date >= ext[0] && d.Date <= ext[1]) ? d.close_value : min; }))
            ]);

            brushed_range.text(legendFormat(new Date(ext[0])) + ' - ' + legendFormat(new Date(ext[1])));

            lollipop_sticks_focus_g.attr('x', function (d, i) { return x(d.Date); });

            lollipop_circles_focus_g.attr('cx', function (d, i) { return x(d.Date); });

            // lollipop resising on brush
        }
        path_valueline_stock.attr("d", valueline_stock);
        focus.select('.x.axis').call(xAxis);
        focus.select('.y.axis').call(yAxis);

        if (!brush.empty()) {
            const prev_obj;
            for (const i = 0; i < data_pop.length; i += 1) {
                if (i > 0) {
                    const obj = data_pop[i];
                    prev_obj = data_pop[i - 1];
                    if ((prev_obj.Date.getTime() === obj.Date.getTime())) {
                        obj.pop_height = prev_obj.pop_height - 12;
                        obj.stick_height = 0;
                    };
                };
            };
            const Difference_In_Time = ext[1].getTime() - ext[0].getTime();
            const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            const day_pixel_width = width / Difference_In_Days;
            for (const i = 0; i < data_pop.length; i += 1) {
                if (i > 0) {
                    const obj = data_pop[i];
                    prev_obj = data_pop[i - 1];
                    const pop_Difference_In_Time = obj.Date.getTime() - prev_obj.Date.getTime();
                    const pop_Difference_In_Days = Math.round(pop_Difference_In_Time / (1000 * 3600 * 24));
                    const pixel_diff_lollipop = pop_Difference_In_Days * day_pixel_width;
                    if (pixel_diff_lollipop < 24) {
                        const wham;
                        for (const ii = [i - 1]; ii > 0; ii--) {
                            if (data_pop[ii].stick_height > 0) {
                                wham = data_pop[ii].pop_height;
                                break;
                            }
                        }
                        if (wham === 134) {
                            obj.pop_height = prev_obj.pop_height - 12;
                        };
                    }
                    else {
                        obj.pop_height = 134;
                    };
                };
            };
            lollipop_sticks_focus_g.attr('y', function (d, i) {
                if (d.stick_height === NUMBER_ZERO) {
                    return height;
                }
                else {
                    return d.pop_height + 6;
                };
            });

            lollipop_sticks_focus_g.attr('height', function (d, i) {
                if (d.stick_height === NUMBER_ZERO) {
                    return 0;
                }
                else {
                    return height - d.pop_height - 6;
                };
            });

            lollipop_circles_focus_g.attr('cy', function (d, i) { return d.pop_height; });
        }
    } //brush function end
    //brush function
    function initial_brushed() {
        const prev_obj;
        for (const i = 0; i < data_pop.length; i += 1) {
            if (i > 0) {
                const obj = data_pop[i];
                prev_obj = data_pop[i - 1];
                if ((prev_obj.Date.getTime() === obj.Date.getTime())) {
                    obj.pop_height = prev_obj.pop_height - 12;
                    obj.stick_height = 0;
                };
            };
        };
        const Difference_In_Time = max_date.getTime() - min_date.getTime();
        const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        const day_pixel_width = width / Difference_In_Days;
        for (const i = 0; i < data_pop.length; i += 1) {
            if (i > 0) {
                const obj = data_pop[i];
                prev_obj = data_pop[i - 1];
                const pop_Difference_In_Time_previous = obj.Date.getTime() - prev_obj.Date.getTime();
                const pop_Difference_In_Days_previous = Math.round(pop_Difference_In_Time_previous / (1000 * 3600 * 24));
                const pixel_diff_lollipop_previous = pop_Difference_In_Days_previous * day_pixel_width;
                if (pixel_diff_lollipop_previous < 24) {
                    const wham;
                    for (const ii = [i - 1]; ii > 0; ii--) {
                        if (data_pop[ii].stick_height > 0) {
                            wham = data_pop[ii].pop_height;
                            break;
                        }
                    }
                    if (wham === 134) {
                        obj.pop_height = prev_obj.pop_height - 12;
                    };
                }
                else {
                    obj.pop_height = 134;
                };
                if (i < (data_pop.lengt - 1)) {
                    const next_obj = data_pop[i + 1];
                    const pop_Difference_In_Time_next = obj.Date.getTime() - next_obj.Date.getTime();
                    const pop_Difference_In_Days_next = Math.round(pop_Difference_In_Time_next / (1000 * 3600 * 24));
                    const pixel_diff_lollipop_next = pop_Difference_In_Days_next * day_pixel_width;

                    if (pixel_diff_lollipop_next < 24) {
                        const wham;
                        obj.pop_height = next_obj.pop_height + 12;
                    }
                    else {
                        obj.pop_height = 134;
                    };
                };
            };
        };
        lollipop_sticks_focus_g.attr('y', function (d, i) {
            if (d.stick_height === NUMBER_ZERO) {
                return height;
            }
            else {
                return d.pop_height + 6;
            };
        });
        lollipop_sticks_focus_g.attr('height', function (d, i) {
            if (d.stick_height === NUMBER_ZERO) {
                return 0;
            }
            else {
                return height - d.pop_height - 6;
            };
        });


        lollipop_circles_focus_g.attr('cy', function (d, i) { return d.pop_height; });
    } //brush function end
} //function draw end
// trigger render
draw(data, data_pop, "Afghanistan");
  }, [props.data, dimensions]);

  return (
      
    <ErrorBoundary>
      <Card isComp={props.isComp} isInvest={props.isInvest} title={props.cardtitle} smalltitle={props.cardsmalltitle}>
        <div className={props.isDummyData ? 'd-inline-flex blurrytext' : 'd-inline-flex'} ref={svgRef} style={{ width: '100%', height: '200px' }} />
      </Card>
    </ErrorBoundary>
  );
};

D3AnnotatedStockGraph.propTypes = {
  cardsmalltitle: PropTypes.string,
  cardtitle: PropTypes.string,
  data: PropTypes.array,
  isComp: PropTypes.bool,
  isDummyData: PropTypes.bool,
  isInvest: PropTypes.bool,
};

D3AnnotatedStockGraph.defaultProps = {
  cardsmalltitle: '',
  cardtitle: '',
  data: [],
  isComp: false,
  isDummyData: false,
  isInvest: false,
};

export default React.memo(D3AnnotatedStockGraph);
