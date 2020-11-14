import battery from "power";
import document from "document";
import * as customClock from "./clock";

let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let txtBattery = document.getElementById("battery");

/* --------- CLOCK ---------- */
function clockCallback(data) {
    txtTime.text = data.time;
    txtDate.text = data.date;
}
customClock.initialize("minutes", "longDate", clockCallback);

/* -------- BATTERY --------- */
txtBattery.text = Math.floor(battery.battery.chargeLevel) + "%";
