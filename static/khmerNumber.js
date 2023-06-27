export function getKhmerNumber(number) {
  let numArr = number?.toString()?.split("");

  let numberKh = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩" ];
  let newArr = [];

  for (let i = 0; i < numArr?.length; i++) {
    newArr.push(numberKh[numArr[i]]);
  }
  return newArr?.join("");
}
