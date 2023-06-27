export function padLeadingZeros(num, size) {
  var s = num + "";
  return s?.padStart(size, "0");
}
