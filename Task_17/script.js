

const divide = (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
      reject(new Error("Both inputs must be valid numbers."));
    } else if (b === 0) {
      reject(new Error("Division by zero is not allowed."));
    } else {
      resolve(a / b);
    }
  });
};




const testCases = [
  [10, 2],
  [10, 0],
  [25, 5],
  [7, 0],
  [9, 4],
  [-12, 3],
  [0, 5]
];

const output = document.getElementById("output");



const runCase = (number, a, b) => {
  const box = document.createElement("div");
  box.className = "example";
  box.innerHTML = `<h3>Example ${number}</h3><p>Dividing ${a} by ${b}...</p>`;
  output.appendChild(box);

  return divide(a, b)
    .then(result => {
      box.classList.add("success");
      box.innerHTML += `<p class="success-text">Result: ${result}</p>`;
      console.log(`Example ${number}: Dividing ${a} by ${b}... Result: ${result}`);
    })
    .catch(error => {
      box.classList.add("failure");
      box.innerHTML += `<p class="error-text">Error: ${error.message}</p>`;
      console.log(`Example ${number}: Dividing ${a} by ${b}... Error: ${error.message}`);
    });
};



testCases.reduce(
  (chain, [a, b], index) => chain.then(() => runCase(index + 1, a, b)),
  Promise.resolve()
);




const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const userResult = document.getElementById("userResult");

document.getElementById("divideBtn").addEventListener("click", () => {



  const a = num1.value === "" ? NaN : Number(num1.value);
  const b = num2.value === "" ? NaN : Number(num2.value);

  divide(a, b)
    .then(result => {
      userResult.textContent = `Result: ${result}`;
      userResult.className = "user-result success-text";
    })
    .catch(error => {
      userResult.textContent = `Error: ${error.message}`;
      userResult.className = "user-result error-text";
    });
});
