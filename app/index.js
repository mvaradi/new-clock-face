import document from "document";
import * as customClock from "./clock";
import * as simpleHRM from "./hrm";
import * as simpleBattery from "./battery"

// TODO add battery icons: charging
// TODO add active minutes goal meter
// TODO add step count goal meter

let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let txtBattery = document.getElementById("battery");
let iconBattery = document.getElementById("battery-icon");
let txtHRM = document.getElementById("hrm-text");
let iconHRM = document.getElementById("hrm-icon");

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
simpleBattery.initialize("seconds", batteryCallback);

/* -------- HRM ------------- */
function hrmCallback(data) {
    txtHRM.text = `${data.bpm}`;
    iconHRM.href = `${data.hrmIconHref}`;
}
simpleHRM.initialize(hrmCallback);