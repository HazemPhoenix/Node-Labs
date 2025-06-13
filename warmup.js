const users = [
  { name: "John Doe", age: 28, role: "developer" },
  { name: "Jane Smith", age: 32, role: "admin" },
  { name: "Bob Johnson", age: 24, role: "developer" },
  { name: "Sarah Williams", age: 27, role: "manager" },
  { name: "Mike Brown", age: 35, role: "admin" },
];

// Filter 
console.log("-----Filter-----");
const filteredUsers = users.filter(user => user.age > 30);
console.log(filteredUsers);


// Transform
console.log("-----Transform-----");
const transformedUsers = users.map(user => {
    return {name: user.name};
});
console.log(transformedUsers);

// First user 
console.log("-----First User-----");
const firstUser = users[users.findIndex(user => user.role == "admin")];
console.log(firstUser);

// Last user 
console.log("-----Last User-----");
const lastUser = users[users.findLastIndex(user => user.role == "admin")];
console.log(lastUser);

// Deep copy function 
console.log("-----Deep Copy-----");
function makeDeepCopy(obj) {
    const newObj = {};
    for(let key in obj) { 
        if(typeof obj[key] == 'object') {
            newObj[key] = makeDeepCopy(obj[key]);
        }
        else newObj[key] = obj[key];
    }
    return newObj;
}

const myDetails = {
    name: "Hazem", 
    age: 24, 
    address: { 
        governorate: "Cairo", 
        city: "Maadi"
    },
}
const newObj = makeDeepCopy(myDetails);
newObj.address.city = "Zamalik"; 

console.log(newObj);
console.log(myDetails);
