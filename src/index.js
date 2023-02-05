module.exports = function check(str, bracketsConfig) {
  let start = str.split("").concat(bracketsConfig.flat());
  const openBrackets = ["(", "[", "{", "|+", "1", "3", "5", "7+", "8+"];
  const closedBrackets = [")", "]", "}", "|-", "2", "4", "6", "7-", "8-"];
  function replaceSameBrackets(arr, el, open, closed) {
    let arr2 = [];
    let idx = arr.indexOf(el);
    while (idx != -1) {
      arr2.push(idx);
      idx = arr.indexOf(el, idx + 1);
    }
    for (let i = 0; i < arr2.length; i++) {
      if (i % 2 === 0) {
        arr[arr2[i]] = open;
      }
      else {
        arr[arr2[i]] = closed;
      }
    }
  }

  for (let x of start) {
    if (x === "|") {
      replaceSameBrackets(start, "|", "|+", "|-");
    }
    else if ("12345678".includes(x)) {
      if (x === "7") {
        replaceSameBrackets(start, "7", "7+", "7-");
      }
      else if (x === "8") {
        replaceSameBrackets(start, "8", "8+", "8-");
      }
    }
  }
  let arr = [];
  for (let x of start) {
    if (openBrackets.includes(x)) {
      arr.push(x);
    }
    else if (closedBrackets.includes(x)) {
      if (closedBrackets.indexOf(x) === openBrackets.indexOf(arr[arr.length - 1])) {
        arr.pop();
      }
      else {
        arr.push(x);
        break;
      }
    }
  }
  return arr.length === 0;
}
