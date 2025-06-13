const fs = require("fs");

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

// Create the students.json file and add the data to it
// Async
function writeStudentDataAsync(data) {
  try {
    fs.writeFile("students.json", JSON.stringify(data));
    console.log("File written successfully");
  } catch (err) {
    console.log(err);
  }
}

// Sync
function writeStudentDataSync(data) {
  try {
    fs.writeFileSync("students.json", JSON.stringify(data));
    console.log("File written successfully");
  } catch (err) {
    console.log(err);
  }
}

// writeStudentDataAsync(studentData);
// writeStudentDataSync(studentData);

// Read student.json data

// Async
function readStudentDataAsync() {
  const parsedStudentData = fs.readFile(
    "students.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsed = JSON.parse(data);
        console.log(parsed);
        return parsed;
      }
    }
  );
  return parsedStudentData;
}

// console.log(readStudentDataAsync());

// Sync
function readStudentDataSync() {
  const studentData = fs.readFileSync("students.json", "utf-8");
  const parsedData = JSON.parse(studentData);
  return parsedData;
}

console.log(readStudentDataSync());
