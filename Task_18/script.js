const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const boxes = document.querySelectorAll(".box");



greetBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  if (name !== "") {
    greeting.textContent = "Hello, " + name;
  } else {
    greeting.textContent = "Hello";
  }
});



boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const colour = box.textContent.toLowerCase();
    box.style.backgroundColor = colour;
    box.style.color = colour === "yellow" ? "black" : "white";
  });
});