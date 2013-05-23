var DashboardLib = {};
DashboardLib.events_table_body_elm = $('#events-table-body');
DashboardLib.period_selector_elm = $('#activities-period-selector');
DashboardLib.category_selector_elm = $('#adv-search-categories');
DashboardLib.dashboard_table_elm = $('#dashboard-table');
DashboardLib.datepicker_start_elm = $('#date-start');
DashboardLib.datepicker_end_elm = $('#date-end');
DashboardLib.adv_search_elm = $('#adv-search');
DashboardLib.adv_dashboard_icon_elm = $('#adv-search-icon-dashboard');
DashboardLib.datepicker_elm = $('.datepicker');
DashboardLib.window_elm = $(window);
DashboardLib.location_elm = $(location);
DashboardLib.trigger_timeout = undefined;
DashboardLib.allset = false;
DashboardLib.offset = 0;
DashboardLib.window_offset = 450;
DashboardLib.results_batch = 21;

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

    // Event attendance chart
    // Todo: Change placeholder data to real data
    var data = [4, 8, 15, 16, 23, 42];
    var chart = d3.select("event-attendance-chart").append("div").attr("class", "chart");
    chart.selectAll("div")
            .data(data)
        .enter().append("div")
            .style("width", function(d) { return d * 10 + "px"; })
            .text(function(d) { return d; });
    alert("hello!");

    //Initiate datepicker
    DashboardLib.datepicker_elm.datepicker({
        onSelect: function(selectedDate) {
            var period = hash_get_value('period');

            if (period !== 'custom') {
                hash_set_value('period', 'custom');
            }

            if (this.id == 'date-start') {
                if (DashboardLib.datepicker_start_elm.val() === '') {
                  hash_set_value('start', '');
                }
                else{
                  hash_set_value('start', selectedDate);
                }
            }

            if (this.id == 'date-end') {
                if (DashboardLib.datepicker_end_elm.val() === '') {
                  hash_set_value('end', '');
                }
                else{
                  hash_set_value('end', selectedDate);
                }
            }

            send_query(newquery=true);
        },
        dateFormat: 'yy-mm-dd'
    });

    DashboardLib.datepicker_elm.click(function(){
        $(this).datepicker('show');
    });

    var start_date = hash_get_value('start');
    var end_date = hash_get_value('end');

    if (start_date) {
        DashboardLib.datepicker_start_elm.datepicker('setDate', start_date);
    }
    if (end_date) {
        DashboardLib.datepicker_end_elm.datepicker('setDate', end_date);
    }

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
});
