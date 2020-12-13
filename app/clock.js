/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { preferences } from "user-settings";
import { days, months, monthsShort } from "../common/locales.js";
import * as util from "../common/utils";

let dateFormat, clockCallback;

export function initialize(granularity, dateFormatString, callback) {
    dateFormat = dateFormatString;
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
    /*
      Get the current time (hours, minutes) and date (day name, month, day)
      It supports 3 different formats for displaying the day
     */
    let today = evt.date;
    let dayName = days[today.getDay()];
    let monthName = months[today.getMonth()];
    let monthNameShort = monthsShort[today.getMonth()];
    let dayNumber = util.zeroPad(today.getDate());

    // Get the hours
    let hours = today.getHours();
    hours = util.zeroPad(hours);

    // Get the minutes
    let mins = util.zeroPad(today.getMinutes());

    let timeString = `${hours}:${mins}`;
    let dateString = today;

    // Format the date
    switch(dateFormat) {
        case "shortDate":
            dateString = `${dayNumber} ${monthNameShort}`;
            break;
        case "mediumDate":
            dateString = `${dayNumber} ${monthName}`;
            break;
        case "longDate":
            dateString = `${dayName} ${monthName} ${dayNumber}`;
            break;
    }
    clockCallback({time: timeString, date: dateString});
}