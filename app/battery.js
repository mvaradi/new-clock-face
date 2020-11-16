import clock from "clock";
import battery from "power";

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
    return {
        charge: getCharge()
    };
};

function getCharge() {
    return Math.floor(battery.battery.chargeLevel);
}