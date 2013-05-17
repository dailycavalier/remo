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
});
