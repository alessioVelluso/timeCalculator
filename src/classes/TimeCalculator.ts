import { TemporalInput, TimeCalculatorParams } from "../types";

export class TimeCalculator {

    public calculateIntValue = (value:number, type:TimeCalculatorParams):TemporalInput => {
        const { seconds, minutes, hours, days, weeks } = this.getTypeDivisions(type)

        const totWeeks = Math.floor(value / weeks!);
        value %= weeks!;

        const totDays = days === undefined ? value %= (weeks ?? 0) : Math.floor(value / days);
        value %= (days ?? 0);

        const totHours = hours === undefined ? value %= (days ?? 0) : Math.floor(value / hours);
        value %= (hours ?? 0);

        const totMinutes = minutes === undefined ? value %= (hours ?? 0) : Math.floor(value / minutes);
        value %= (minutes ?? 0);

        const totSeconds = seconds === undefined ? value %= (minutes ?? 0) : Math.floor(value / seconds);

        const totMilliseconds = value %= (seconds ?? 0);


        return {
            weeks: totWeeks,
            days: totDays,
            hours: totHours,
            minutes: totMinutes,
            seconds: totSeconds,
            milliseconds: totMilliseconds
        }
    }


    public calculateTemporalValue(value:TemporalInput, finalNumberType:TimeCalculatorParams):number {
        const { seconds, minutes, hours, days, weeks, milliseconds } = this.getTypeDivisions(finalNumberType);

        let finalValue = 0;


        const totWeeks = (!value.weeks || !weeks) ? undefined : value.weeks * weeks;
        if (totWeeks) finalValue += totWeeks;

        const totDays = (!value.days || !days) ? undefined : value.days * days;
        if (totDays) finalValue += totDays;

        const totHours = (!value.hours || !hours) ? undefined : value.hours * hours;
        if (totHours) finalValue += totHours;

        const totMinutes = (!value.minutes || !minutes) ? undefined : value.minutes * minutes;
        if (totMinutes) finalValue += totMinutes;

        const totSeconds = (!value.seconds || !seconds) ? undefined : value.seconds * seconds;
        if (totSeconds) finalValue += totSeconds;

        const totMilliseconds = (!value.milliseconds || !milliseconds) ? undefined : value.milliseconds * milliseconds;
        if (totMilliseconds) finalValue += totMilliseconds;

        finalValue += value[finalNumberType] ?? 0;
        console.log("Final value", finalValue, finalNumberType);
        return finalValue;
    }

    private getTypeDivisions(type:TimeCalculatorParams):TemporalInput {
        // undefined is the type-value you want to input
        // if you choose milliseconds, seconds will be equal to 1000(ms)
        // if you choose seconds, minutes will be equal to 60(s)
        // ecc...

        let typeIndex = this.getTypeIndex(type);

        let seconds = typeIndex < 1 ? 1000 : undefined;
        let minutes = typeIndex < 2 ? (seconds === undefined ? 60 : 60 * seconds) : undefined;
        let hours = typeIndex < 3 ? (minutes === undefined ? 60 : 60 * minutes) : undefined;
        let days = typeIndex < 4 ? (hours === undefined ? 24 : 24 * hours) : undefined;
        let weeks = days === undefined ? 7 : 7 * days;

        return { seconds, minutes, hours, days, weeks }
    }

    public getTypeIndex(type:TimeCalculatorParams):number {
        switch(type) {
            case "milliseconds": return 0;
            case "seconds": return 1;
            case "minutes": return 2;
            case "hours": return 3;
            case "days": return 4;
        }
    }
}
