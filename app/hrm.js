/*
  Returns the Heart Rate BPM, with off-wrist detection.
  Callback raised to update your UI.
*/
import { me } from "appbit";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

let hrm, watchID, hrmCallback;
let lastReading = 0;
let heartRate;

export function initialize(callback) {
    if (me.permissions.granted("access_heart_rate")) {
        hrmCallback = callback;
        hrm = new HeartRateSensor();
        setupEvents();
        start();
        lastReading = hrm.timestamp;
    } else {
        console.log("Denied Heart Rate");
        callback({
            bpm: "???"
        });
    }
}

function getReading() {
    if (hrm.timestamp === lastReading) {
        heartRate = "--";
    } else {
        heartRate = hrm.heartRate;
    }
    lastReading = hrm.timestamp;
    hrmCallback({
        bpm: heartRate
    });
}

function setupEvents() {
    display.addEventListener("change", function() {
        if (display.on) {
            start();
        } else {
            stop();
        }
    });
}

function start() {
    if (!watchID) {
        hrm.start();
        getReading();
        watchID = setInterval(getReading, 1000);
    }
}

function stop() {
    hrm.stop();
    clearInterval(watchID);
    watchID = null;
}