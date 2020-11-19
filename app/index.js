import document from "document";
import * as customClock from "./clock";
import * as customHRM from "./hrm";
import * as customBattery from "./battery"
import * as customActivity from "./activity";

let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let txtBattery = document.getElementById("battery");
let iconBattery = document.getElementById("battery-icon");
let txtHRM = document.getElementById("hrm-text");
let iconHRM = document.getElementById("hrm-icon");
let stepsProgress = document.getElementById("steps-progress");
let activeProgress = document.getElementById("active-progress");

/* --------- CLOCK ---------- */
function clockCallback(data) {
    txtTime.text = data.time;
    txtDate.text = data.date;
}
customClock.initialize("minutes", "longDate", clockCallback);

/* -------- BATTERY --------- */
function batteryCallback(data) {
    txtBattery.text = data.charge + "%";
    iconBattery.href = data.iconHref;
}
customBattery.initialize("minutes", batteryCallback);

/* -------- HRM ------------- */
function hrmCallback(data) {
    txtHRM.text = data.bpm;
    iconHRM.href = data.hrmIconHref;
}
customHRM.initialize(hrmCallback);

/* --------- ACTIVITY ---------- */
function activityCallback(data) {
    stepsProgress.width = Math.floor(data.steps * 160);
    activeProgress.width = Math.floor(data.activeMinutes * 160);
}
customActivity.initialize("minutes", activityCallback);
