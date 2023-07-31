const person = {
  firstName: "Alexander",
  lastName: "Muli",
  age: 25,
  fullName: () => {
    return this.firstName + " " + this.lastName;
    // return this
  },
};

let assignedName = person.fullName;
// console.log("fullname", assignedName.bind(person));
console.log("fullname", assignedName.bind(person)());


const myArrowFunc = (age, cb) => {
    if(age > 20) cb("age is greater than 20")
    else cb()
}

myArrowFunc(2, (val) => {
    if(val) console.log("val is", val)
    else console.log("no thing returned")
})
