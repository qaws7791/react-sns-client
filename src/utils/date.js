export const calculateRelativeTime = (timestamp) => {
  const currentTimestamp = Date.now(); // 현재 시간의 UTC 타임스탬프

  const timeDifference = currentTimestamp - timestamp; // 현재 시간과의 차이
  const timeMinutes = Math.floor(timeDifference / 1000);

  if (timeMinutes < 60) {
    return timeMinutes + "초 전";
  } else if (timeMinutes < 3600) {
    const minutes = Math.floor(timeMinutes / 60);
    return minutes + "분 전";
  } else if (timeMinutes < 86400) {
    const hours = Math.floor(timeMinutes / 3600);
    return hours + "시간 전";
  } else if (timeMinutes < 604800) {
    const days = Math.floor(timeMinutes / 86400);
    return days + "일 전";
  } else {
    return "7일 이상 전";
  }
};
