// example array
const numbers = [4, 8, 2, 33, 14, 7, 6, 4, 11];

// function for max
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// function for sum
const findSum = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

// function for odd numbers
const countOdd = (arr) => arr.filter((num) => num % 2 !== 0).length;

console.log("Array:", numbers);
console.log("Maximum number:", findMax(numbers));
console.log("Sum of all elements:", findSum(numbers));
console.log("Count of odd numbers:", countOdd(numbers));