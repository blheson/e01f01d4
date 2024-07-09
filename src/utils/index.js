import moment from "moment";
import { BsFillTelephoneInboundFill, BsTelephoneOutboundFill, BsVoicemail } from "react-icons/bs";

export const TabList = {
    All: 'All',
    Archived: 'Archived'
}

export function formatCallTime(time) {
    const currentTime = moment();
    const inputTime = moment(time);

    if (currentTime.diff(inputTime, 'days') < 6 && currentTime.diff(inputTime, 'days') >= 1) {
        return inputTime.format('dddd'); // Show day name if time is between 6 days ago and yesterday
    } else if (currentTime.year() !== inputTime.year()) {
        return inputTime.format('D MMM, \'YY'); // Show day, month, and year if time is last year
    } else if (currentTime.diff(inputTime, 'days') >= 6) {
        return inputTime.format('D MMM'); // Show day and month if time is 7 days ago
    } else {
        return inputTime.format('HH:mm'); // Default to hour and minute format

    }
}
export function callIcon(call) {
    if (call.call_type === 'answered') {
        if (call.direction === 'inbound') {
            return <BsFillTelephoneInboundFill />
        } else
            if (call.direction === 'outbound') {
                return <BsTelephoneOutboundFill color='#9e9e9e' />
            }
    } else if (call.call_type === 'voicemail') {
        return <BsVoicemail />
    }
}

export function getSecondPartyData(call) {
    if (call.direction === 'inbound') {
        return call.from
    } else {
        return call.to
    }

}