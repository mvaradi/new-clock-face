/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { preferences } from "user-settings";

import { days, months, monthsShort } from "../common/locales.js";
import * as util from "../common/utils";

let dateFormat, clockCallback;
let blink = false;

export function initialize(granularity, dateFormatString, callback) {
    dateFormat = dateFormatString;
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
    let today = evt.date;
    let dayName = days[today.getDay()];
    let monthName = months[today.getMonth()];
    let monthNameShort = monthsShort[today.getMonth()];
    let dayNumber = util.zeroPad(today.getDate());

    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = util.zeroPad(hours);
    }
    let mins = util.zeroPad(today.getMinutes());

    let colon;
    if (blink) {
        colon = ':';
        blink = !blink;
    } else {
        colon = '';
        blink = !blink;
    }

    let dateString = today;

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
    clockCallback({hours: hours, mins: mins, colon: colon, date: dateString});
}