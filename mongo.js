const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://angyalsvart:${password}@cluster0.zdebspr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("Phonebook:")
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name , person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((_result) => {
    console.log(`${name} number ${number} added to phonebook!`);
    mongoose.connection.close();
  });
}
