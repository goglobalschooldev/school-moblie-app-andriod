export var enumerateDaysBetweenDates = function (startDate, endDate) {
  var now = startDate?.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("YYYY-MM-DD"));
    now.add(1, "days");
  }
  return dates;
};
