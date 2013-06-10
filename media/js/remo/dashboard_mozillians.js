$(document).ready(function () {
    $('.dashboard-mozillians-reps-grid-button').click(function () {
        $('.dashboard-mozillians-reps-grid-block').removeClass('hidden');
        $('.dashboard-mozillians-reps-reports-block').addClass('hidden');

        $('.dashboard-mozillians-reps-grid-button').parent().addClass('active');
        $('.dashboard-mozillians-reps-grid-button').parent().siblings().removeClass('active');
    });

    // Activities time period click
    $('#activities-month-button').click(function () {
        $(this).parent().addClass('active');
        $('#activities-month-button').parent().siblings().removeClass('active');
    });
    $('#activities-6months-button').click(function () {
        $(this).parent().addClass('active');
        $('#activities-6months-button').parent().siblings().removeClass('active');
    });
    $('#activities-future-button').click(function () {
        $(this).parent().addClass('active');
        $('#activities-future-button').parent().siblings().removeClass('active');
    });
    $('#activities-custom-button').click(function () {
        $(this).parent().addClass('active');
        $('#activities-custom-button').parent().siblings().removeClass('active');
    });

    // Advanced button click.
    $('#adv-search-icon-dashboard').click(function() {
        $('#adv-search').slideToggle();
    });

    $('.dashboard-mozillians-reps-reports-button').click(function () {
        $('.dashboard-mozillians-reps-reports-block').removeClass('hidden');
        $('.dashboard-mozillians-reps-grid-block').addClass('hidden');

        $('.dashboard-mozillians-reps-reports-button').parent().addClass('active');
        $('.dashboard-mozillians-reps-reports-button').parent().siblings().removeClass('active');
    });

    // Todo: Initialize datepickers for custom date range

    // Events expander button click.
    $('.dashboard-events-expander-button').click(function () {
        // TODO Toggle the icon between > and V when clicked
        $('.dashboard-events-expander-button').toggle(function() {
            $('.dashboard-events-expander-button').html('&#62;');
        }, function () {
            $('.dashboard-events-expander-button').html('/');
        });

        $('.dashboard-events-details-row').toggleClass('hidden');
    });

    $('table').each(function(index, item) { $(item).stupidtable(); });
    // Apply prettyDate on all elements with data-time attribute.
    $('*').find('*[data-time]').prettyDate({attribute:'data-time', interval: 60000, isUTC:true});

    // ======== Event attendance chart ========

    // placeholder data
    // Todo: retrieve aggregate event info, filtered by size, 
    // number of events at that size and signups for that size
    var data = [{size: "1-10", events: 54, signups: 2},
                {size: "11-50", events: 43, signups: 13},
                {size: "51-100", events: 43, signups: 18},
                {size: "101-200", events: 41, signups: 21},
                {size: "201-500", events: 44, signups: 30},
                {size: "501+", events: 35, signups: 54}];

    var barWidth = 30;
    var margin = {top: 30, right: 20, bottom: 70, left: 50},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // compute the extent of the data set
    var yMax = d3.max(data, function(datum) { return datum.events; });

    var x = d3.scale.linear()
            .domain([0, data.length])
            .range([0, width]);

    var y = d3.scale.linear()
            .domain([0, yMax])
            .range([height, 0]).nice();

    var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

    // add the canvas to the DOM
    var svg = d3.select("#events-chart")
      .append("svg:svg")
        .attr("width", width + margin.left)
        .attr("height", height + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create tooltip div
    var tooltip = d3.select("event-attendance-modal").append("div")
      .attr("class", "chart-tooltip")
      .style("opacity", 0);

    // plot bars with tooltip events
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("svg:rect")
      .attr("x", function(d, i) { return x(i); })
      .attr("y", function(d, i) { return y(d.events); })
      .attr("height", function(d, i) { return height - y(d.events); })
      .attr("width", barWidth)
      .attr("fill", "#2d578b")
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
      })
      .on("mousemove", function(d) {
        tooltip   .html(d.signups + " contributor signups")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // add the X Axis label
    svg.append("g")
      .append("text")
        .attr("x", width/2)
        .attr("y", height + margin.bottom/2)
        .style("text-anchor", "middle")
        .text("Attendees at events")
        .attr("class", "xAxis");

    // add the Y Axis label
    svg.append("g")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "0.7em")
        .style("text-anchor", "middle")
        .text("Number of events");

    // add bucket size labels to x-axis
    svg.selectAll("text.yAxis").
      data(data).
      enter().append("svg:text").
        attr("x", function(datum, index) { return x(index) + barWidth; }).
        attr("y", height).
        attr("dx", - barWidth/2 - margin.left/2).
        attr("text-anchor", "middle").
        text(function(datum) { return datum.size;}).
        attr("transform", "translate(0, 18)").
        attr("class", "yAxis");

    // ======== End Event attendance chart ========


});
