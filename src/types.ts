export type TimeStampType = 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
export type TimeStampTypeMicro = 'w' | 'd' | 'h' | 'm' | 's' | 'ms'

export type TimeCalculatorParams = "days" | "hours" | "minutes" | "seconds" | "milliseconds"
export type TimeStampTypeMicroParams = 'd' | 'h' | 'm' | 's' | 'ms'

export type TemporalInput = {
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number
    seconds?: number
    milliseconds?: number
}
