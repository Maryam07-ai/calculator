let input = document.getElementById("input");
let inputstring = "";
function EnterNumber(number) {
  inputstring += number;
  input.value = inputstring;
}
function equals() {
  let result = eval(inputstring);
  input.value = result;
}
