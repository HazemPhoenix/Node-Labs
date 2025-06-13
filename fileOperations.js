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

/*--------------Write student.json data--------------*/
// Async
function writeStudentDataAsync(data) {
  try {
    fs.writeFile("students.json", JSON.stringify(data), () =>
      console.log("File written successfully")
    );
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

/*--------------Read student.json data--------------*/

// Async
async function readStudentDataAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile("students.json", "utf-8", (err, data) => {
      if (err) {
        reject(error);
      } else {
        const parsed = JSON.parse(data);
        resolve(parsed);
      }
    });
  });
}

// readStudentDataAsync()
//   .then((res) => console.log(res))
//   .catch((error) => {
//     console.log(error);
//   });

// Sync
function readStudentDataSync() {
  const studentData = fs.readFileSync("students.json", "utf-8");
  const parsedData = JSON.parse(studentData);
  return parsedData;
}

// console.log(readStudentDataSync());

/*--------------Add a new Student--------------*/

// Async
async function addNewStudentAsync(studentData) {
  try {
    const students = await readStudentDataAsync();
    students.push(studentData);
    console.log(students);
    fs.writeFile("students.json", JSON.stringify(students), () =>
      console.log("Student added successfully!")
    );
  } catch (err) {
    console.log(err);
  }
}

// addNewStudentAsync({
//   id: 4,
//   name: "John Smith",
//   age: 20,
//   grade: "A",
//   courses: ["Mathematics", "Physics", "Computer Science"],
// });

// Sync
function addNewStudentSync(studentData) {
  try {
    const students = readStudentDataSync();
    students.push(studentData);
    fs.writeFileSync("students.json", JSON.stringify(students));
    console.log("Student added successfully!");
  } catch (error) {
    console.log(error);
  }
}

// addNewStudentSync({
//   id: 4,
//   name: "John Smith",
//   age: 20,
//   grade: "A",
//   courses: ["Mathematics", "Physics", "Computer Science"],
// });

/*--------------Update a student's course--------------*/

// Sync
function updateStudentCourseSync(studentID, newCourse) {
  const students = readStudentDataSync();
  students.forEach((student) => {
    if (student.id == studentID) {
      student.course = newCourse;
    }
  });
  fs.writeFileSync("students.json", JSON.stringify(students));
  console.log(`Student ${studentID}, course updated successfully.`);
}

// updateStudentCourseSync(1, "Bioinformatics");

// Async

async function updateStudentCourseAsync(studentID, newCourse) {
  const students = await readStudentDataAsync();
  students.forEach((student) => {
    if (student.id == studentID) {
      student.course = newCourse;
    }
  });
  fs.writeFile("students.json", JSON.stringify(students), () => {
    console.log(`Student ${studentID}, course updated successfully.`);
  });
}

// updateStudentCourseAsync(2, "Data Analysis");

/*--------------Delete a student--------------*/

// Async
async function deleteStudentAsync(studentID) {
  const students = await readStudentDataAsync();
  const studentIndex = students.findIndex((student) => student.id == studentID);
  students.splice(studentIndex, 1);
  fs.writeFile("students.json", JSON.stringify(students), () => {
    console.log(`Student ${studentID}, deleted successfully.`);
  });
}

// deleteStudentAsync(4);

// Sync
function deleteStudentSync(studentID) {
  const students = readStudentDataSync();
  const studentIndex = students.findIndex((student) => student.id == studentID);
  students.splice(studentIndex, 1);
  fs.writeFileSync("students.json", JSON.stringify(students));
  console.log(`Student ${studentID}, deleted successfully.`);
}

// deleteStudentSync(3);

/*--------------Difference between sync and async--------------*/

// Sync (Synchronous)
// Blocks everything - Your code stops and waits until the file operation is completely done
// If the file is large, your entire program freezes until it's finished

// Async (Asynchronous)
// Non-blocking - Your code continues running while the file operation happens in the background
// Your program can handle other tasks while waiting for the file operation to complete
