export function getKhNumber(num, lang, zeroPadding) {
  if (typeof num !== "number") return null;

  var numInteger = parseInt(num);
  var numString = numInteger.toString();

  if (zeroPadding > 0 && numString.length < zeroPadding) {
    numString = "0" + numString;
  }

  // support only khmer
  if (lang !== "km") {
    return numString;
  }

  var khmerNumber = "";
  var numbersKhmer = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

  for (var i = 0; i < numString.length; i++) {
    khmerNumber += numbersKhmer[parseInt(numString[i])];
  }

  return khmerNumber;
}
