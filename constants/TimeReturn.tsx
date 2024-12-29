import { intervalToDuration } from "date-fns";
import { formatDuration } from "date-fns";

export const TimeReturn = (Time) => {
    const duration = intervalToDuration({
        start: new Date(Time),
        end: new Date(),
    });
    if (formatDuration(duration, { format: ["years", "months"] }) != "") {
        return formatDuration(duration, { format: ["years", "months"] });
    } else {
        return formatDuration(duration, {
          format: ["years", "months", "days", "minutes"],
        });
    }
};