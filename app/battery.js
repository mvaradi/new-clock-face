/*
  Returns the current charge level and the corresponding battery icon.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { battery } from "power";
import { charger } from "power";

let batteryCallback;

export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clock.addEventListener("tick", tickHandler);
    batteryCallback = callback;
}

function tickHandler(evt) {
    batteryCallback(batteryData());
}

let batteryData = () => {
    return getCharge();
};

function getCharge() {
    // Get the current change level
    const currentLevel = battery.chargeLevel;
    let currentIcon = "";

    /*
      Based on the charge level, set the battery icon.
      Use a special icon if the device is being charged
    */
    if (charger.connected) {
        currentIcon = "battery_charging.png";
    } else if (currentLevel <= 25) {
        currentIcon = "battery_25.png";
    } else if (currentLevel <= 50) {
        currentIcon = "battery_50.png";
    } else if (currentLevel <= 75) {
        currentIcon = "battery_75.png";
    } else if (currentLevel <= 100) {
        currentIcon = "battery_100.png";
    } else {
        currentIcon = "";
    }

    return {
        charge: Math.floor(currentLevel),
        iconHref: currentIcon
    };
}