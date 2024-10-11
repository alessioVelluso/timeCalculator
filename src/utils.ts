import { GenericUtils } from "utils-stuff";
import { TimeCalculatorParams, TimeStampType, TimeStampTypeMicro, TimeStampTypeMicroParams } from "./types";

class Utils extends GenericUtils
{
    public fromTimestampMicroToTimestamp = (val:TimeStampTypeMicroParams):TimeCalculatorParams =>
    {
        switch(val) {
            case "d": return "days";
            case "h": return "hours";
            case "m": return "minutes";
            case "s": return "seconds";
            case "ms": return "milliseconds";
        }
    }
    public fromTimestampMicroToTimestampWeeks = (val:TimeStampTypeMicro):TimeStampType =>
    {
        if (val === "w") return "weeks"
        else return this.fromTimestampMicroToTimestamp(val)
    }
    public fromTimestampToTimestampMicro = (val:TimeCalculatorParams):TimeStampTypeMicroParams =>
    {
        switch(val) {
            case "days": return "d";
            case "hours": return "h";
            case "minutes": return "m";
            case "seconds": return "s";
            case "milliseconds": return "ms";
        }
    }
    public fromTimestampToTimestampMicroWeeks = (val:TimeStampType):TimeStampTypeMicro =>
    {
        if (val === "weeks") return "w"
        else return this.fromTimestampToTimestampMicro(val)
    }
}

const utils = new Utils({ locale: "it-IT" });
export { utils };
