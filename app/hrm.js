/*
  Returns the Heart Rate BPM, with off-wrist detection.
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

let hrm, watchID, hrmCallback, hrmIconHref;
let lastReading = 0;
let heartRate;
let beat = false;

export function initialize(callback) {
    // If sufficient permissions are available, the heart rate is returned
    if (me.permissions.granted("access_heart_rate")) {
        hrmCallback = callback;
        hrm = new HeartRateSensor();
        setupEvents();
        start();
        lastReading = hrm.timestamp;
    } else {
        console.log("Denied Heart Rate");
        callback({
            bpm: "???",
            hrmIconHref: ''
        });
    }
}

function getReading() {
    // Get the current reading (if a second has already passed), and set the heart icon
    if (hrm.timestamp === lastReading) {
        heartRate = "--";
    } else {
        heartRate = hrm.heartRate;
    }
    lastReading = hrm.timestamp;
    // Switch the heart icon between on/off every second
    beat = !beat;
    if (beat) {
        hrmIconHref = 'heart.png';
    } else {
        hrmIconHref = '';
    }
    hrmCallback({
        bpm: heartRate,
        hrmIconHref: hrmIconHref
    });
}

function setupEvents() {
    // Only check for the heart rate if the display is on
    display.addEventListener("change", function() {
        if (display.on) {
            start();
        } else {
            stop();
        }
    });
}

function start() {
    // Check the heart rate every second (i.e. 1000 ms)
    if (!watchID) {
        hrm.start();
        getReading();
        watchID = setInterval(getReading, 1000);
    }
}

function stop() {
    // Stop getting the heart rate
    hrm.stop();
    clearInterval(watchID);
    watchID = null;
}