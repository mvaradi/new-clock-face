/*
  A simple way of returning activity data in the correct format based on user preferences.
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import clock from "clock";
import { today, goals } from "user-activity";
import { units } from "user-settings";

let activityCallback;

export function initialize(granularity, callback) {
    if (me.permissions.granted("access_activity")) {
        clock.granularity = granularity;
        clock.addEventListener("tick", tickHandler);
        activityCallback = callback;
    } else {
        console.log("Denied User Activity permission");
        callback({
            steps: getDeniedStats(),
            activeMinutes: getDeniedStats()
        });
    }
}

let activityData = () => {
    return {
        steps: getSteps(),
        activeMinutes: getActiveMinutes()
    };
};

function tickHandler(evt) {
    activityCallback(activityData());
}

function getActiveMinutes() {
    let val = (today.adjusted.activeZoneMinutes.total || 0) / goals.activeZoneMinutes.total;
    return val > 1 ? 1 : val;
}

function getSteps() {
    let val = (today.adjusted.steps || 0) / goals.steps;
    return val > 1 ? 1 : val;
}


function getDeniedStats() {
    return {
        raw: 0,
        pretty: "Denied"
    }
}