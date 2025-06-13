const fs = require("fs");

fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

const data = fs.readFileSync("students.json", "utf-8");
const parsedData = JSON.parse(data);
parsedData.push({
  id: 6,
  name: "Shady",
  age: 24,
  grade: "A+",
  courses: ["Mathematics", "Physics", "Computer Science"],
});

// fs.writeFileSync("students.json", JSON.stringify(parsedData));

fs.writeFile("students.json", JSON.stringify(parsedData), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File written successfully");
  }
});
