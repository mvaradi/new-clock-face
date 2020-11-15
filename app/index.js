import battery from "power";
import document from "document";
import * as customClock from "./clock";
import * as simpleHRM from "./hrm";

// TODO add battery icons: low, medium, high and charging
// TODO add heart rate meter
// TODO add heart icons: empty, full
// TODO add active minutes goal meter
// TODO add step count goal meter

let txtTimeHour = document.getElementById("txtTimeHour");
let txtTimeColon = document.getElementById("txtTimeColon");
let txtTimeMinute = document.getElementById("txtTimeMinute");
let txtDate = document.getElementById("txtDate");
let txtBattery = document.getElementById("battery");
let txtHRM = document.getElementById("hrm-text");

/* --------- CLOCK ---------- */
function clockCallback(data) {
    txtTimeHour.text = data.hours;
    txtTimeColon.text = data.colon;
    txtTimeMinute.text = data.mins;
    txtDate.text = data.date;
}
customClock.initialize("seconds", "longDate", clockCallback);

/* -------- BATTERY --------- */
txtBattery.text = Math.floor(battery.battery.chargeLevel) + "%";

/* -------- HRM ------------- */
function hrmCallback(data) {
    txtHRM.text = `${data.bpm}`;
}
simpleHRM.initialize(hrmCallback);