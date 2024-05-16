
$(document).ready(function() {
    var currentDate = new Date();
    
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = daysOfWeek[currentDate.getDay()];

    var dayOfMonth = currentDate.getDate();

    var monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthsOfYear[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    $('#day').text(dayOfWeek);
    $('#date').text(dayOfMonth);
    $('#month').text(month);
    $('#year').text(year);
}); 
