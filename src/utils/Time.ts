import moment from 'moment';

const secondInMs = 1000;
const minuteInMs = 60 * secondInMs;
const hourInMs = 60 * minuteInMs;
const dayInMs = 24 * hourInMs;
const monthInMs = 30 * dayInMs;
const yearInMs = 365 * dayInMs;
const noLimitInMs = 2000 * dayInMs;

export const getPassedTimeMessage = (date: moment.Moment): string => {
    const diffInMs = moment().diff(date);

    if (diffInMs < minuteInMs) {
        return '지금';
    } else if (diffInMs < hourInMs) {
        return `${Math.floor(diffInMs / minuteInMs)}분 전`;
    } else if (diffInMs < dayInMs) {
        return `${Math.floor(diffInMs / hourInMs)}시간 전`;
    } else if (diffInMs < monthInMs) {
        return `${Math.floor(diffInMs / dayInMs)}일 전`;
    } else if (diffInMs < yearInMs) {
        return `${Math.floor(diffInMs / monthInMs)}달 전`;
    }

    return `${Math.floor(diffInMs / yearInMs)}년 전`;
};
