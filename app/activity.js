/*
  Returns the user's progress towards the daily step and active minutes goals, as a percentage value.
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import clock from "clock";
import { today, goals } from "user-activity";
import { units } from "user-settings";

let activityCallback;

export function initialize(granularity, callback) {
    // Get the data, if there are sufficient permissions
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
    // Get and return the staps and active minutes data
    return {
        steps: getSteps(),
        activeMinutes: getActiveMinutes()
    };
};

function tickHandler(evt) {
    activityCallback(activityData());
}

function getActiveMinutes() {
    /*
      Return the number of active minutes divided by the active minutes goal for the day.
      If the user already surpassed the daily goal, set it to 1 (i.e. 100%)
      If the user has no goal set, set the progress to 1 (i.e. 100%)
     */
    let goal;
    if (!goals.activeZoneMinutes.total || goals.activeZoneMinutes.total < 1) {
        goal = 1;
    } else {
        goal = goals.activeZoneMinutes.total;
    }
    let val = (today.adjusted.activeZoneMinutes.total || 0) / goal;
    return val > 1 ? 1 : val;
}

function getSteps() {
    /*
      Returns the number of steps divided by the steps goal for the day.
      If the user already surpassed the daily goal, set it to 1 (i.e. 100%)
      If the user has no goal set, set the progress to 1 (i.e. 100%)
     */
    let goal;
    if (!goals.steps || goals.steps < 1) {
        goal = 1;
    } else {
        goal = goals.steps;
    }
    let val = (today.adjusted.steps || 0) / goal;
    return val > 1 ? 1 : val;
}

function getDeniedStats() {
    // Return default values if permissions are denied
    return {
        raw: 0,
        pretty: "Denied"
    }
}