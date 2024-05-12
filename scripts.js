$(document).ready(function() {
    
    $.getJSON('timetable.json', function(scheduleData) {
        const scheduleDiv = $('#schedule');
        const todayTask = $('#todayTask');
        
        function displayFullSchedule() {
            scheduleDiv.empty();

            $.each(scheduleData, function(day, activities) {
                
                const dayHeading = $('<h2>').text(day);
                scheduleDiv.append(dayHeading);

                $.each(activities, function(index, activity) {

                    const activityElement = $('<b>').text(activity.time);
                    const activityDescription = $('<p>').text(activity.activity);
                    scheduleDiv.append('<input type="checkbox" id="checkbox" name="checkbox">');
                    scheduleDiv.append(activityElement);
                    scheduleDiv.append(activityDescription);
                });
            });
        }
        displayFullSchedule();

        //! Add click event to the search button
        $('#searchButton').click(function () {
            var searchText = $('#searchInput').val().trim();
            if (searchText !== '') {
                searchSchedule(searchText);
            } else {
                displayFullSchedule();
            }
        });

        //? Function to search for a specific day in the schedule
        function searchSchedule(searchText) {
            
            scheduleDiv.empty();

            $.each(scheduleData, function(day, activities) {
                if (day.toLowerCase().includes(searchText.toLowerCase())) {
                    const dayHeading = $('<h2>').text(day);
                    scheduleDiv.append(dayHeading);
                    
                    $.each(activities, function(index, activity) {
                        const activityElement = $('<b>').text(activity.time);
                        const activityDescription = $('<p>').text(activity.activity);
                        scheduleDiv.append('<input type="checkbox" id="checkbox" name="checkbox">');
                        scheduleDiv.append(activityElement);
                        scheduleDiv.append(activityDescription);
                    });
                }
            });
        }

        var currentDate = new Date();
        var targetDate = new Date(currentDate.getFullYear(), 4, 30);
        var difference = targetDate - currentDate;
        var daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

        // Display the time left until May 30th
        $('#days').text(daysLeft);
        $('#hours').text(hoursLeft);
        $('#minutes').text(minutesLeft);
        $('#seconds').text(secondsLeft);
        //$('#timeLeft').text('Time left until May 30th: ' + daysLeft + ' days, ' + hoursLeft + ' hours, ' + minutesLeft + ' minutes, ' + secondsLeft + ' seconds');
    
        //? get today task
        var today = new Date().getDate();
        console.log(today);
        todaySchedule(today);

        function todaySchedule(searchText) {
            
            todayTask.empty();

            $.each(scheduleData, function(day, activities) {
                if (day.includes(searchText)) {
                    
                    const dayHeading = $('<h2>').text(day);
                    todayTask.append(dayHeading);
                    $('#today').text(day);
                    
                    $.each(activities, function(index, activity) {
                        const activityElement = $('<b>').text(activity.time);
                        const activityDescription = $('<p>').text(activity.activity);
                        todayTask.append('<input type="checkbox" id="checkbox" name="checkbox">');
                        todayTask.append(activityElement);
                        todayTask.append(activityDescription);
                        todayTask.append('<hr>');
                    });
                    
                }
            });
        }

        
    
    
    })
    .fail(function(error) {
        console.log('Error loading schedule:', error);
    });
});
