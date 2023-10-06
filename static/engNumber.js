export function getEngNumber(number) {
  let numArr = number?.toString()?.split("");

  let numberKh = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let newArr = [];

  for (let i = 0; i < numArr?.length; i++) {
    newArr.push(numberKh[numArr[i]]);
  }
  return newArr?.join("");
}
