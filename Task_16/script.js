
const students = [
  { name: "Salmaan Ahmed",   marks: 38, class: "3rd",  address: "India" },
  { name: "Riya Sharma",     marks: 85, class: "10th", address: "123, ABC Colony, Delhi" },
  { name: "Rohan Patel",     marks: 70, class: "12th", address: "456, XYZ Street, Mumbai" },
  { name: "Priya Singh",     marks: 95, class: "8th",  address: "789, PQR Nagar, Bangalore" },
  { name: "Ankit Gupta",     marks: 60, class: "9th",  address: "101, LMN Road, Kolkata" },
  { name: "Neha Verma",      marks: 80, class: "11th", address: "222, DEF Avenue, Chennai" },
  { name: "Manoj Kumar",     marks: 75, class: "10th", address: "333, GHI Lane, Hyderabad" },
  { name: "Pooja Mishra",    marks: 88, class: "12th", address: "444, STU Colony, Pune" },
  { name: "Rajesh Singhania", marks: 92, class: "9th", address: "555, VWX Street, Jaipur" }
];

const container   = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");


function renderStudents(list) {
  if (list.length === 0) {
    container.innerHTML = '<div class="empty">No students found. Try a different name.</div>';
    return;
  }

  container.innerHTML = list
    .map(student => `
      <div class="card">
        <p>Student Name: <span>${student.name}</span></p>
        <p>Marks: <span>${student.marks}%</span></p>
        <p>Class: <span>${student.class}</span></p>
        <p>Address: <span>${student.address}</span></p>
      </div>
    `)
    .join("");
}


function searchStudents() {
  const text = searchInput.value.trim().toLowerCase();

  const filtered = students.filter(student =>

    student.name.toLowerCase().includes(text)
  );

  renderStudents(filtered);
}



searchInput.addEventListener("input", searchStudents);


searchBtn.addEventListener("click", searchStudents);



renderStudents(students);