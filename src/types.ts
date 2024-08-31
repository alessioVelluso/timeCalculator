export type ViewOptions = 'nb' | 'ts';

export type TimeStampType = 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
export type TimeCalculatorParams = "days" | "hours" | "minutes" | "seconds" | "milliseconds"
export type TemporalInput = {
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number
    seconds?: number
    milliseconds?: number
}
