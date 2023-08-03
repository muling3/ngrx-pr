const fs = require("fs");

const userData = {
  user: {
    name: "John Doe",
    age: 35,
    email: "john.doe@example.com",
    address: "123 Main Street, Cityville, USA",
    phone: "+1 (555) 123-4567",
    nationality: "American",
    marital_status: "Single",
    banking_details: {
      account_number: "1234567890",
      account_type: "Checking",
      bank_name: "Bank of America",
      branch: "Cityville Branch",
      routing_number: "987654321",
      swift_code: "BOFAUS6S",
    },
    financial_details: {
      income: 75000,
      expenses: 50000,
      savings: 25000,
      investments: [
        {
          type: "Stocks",
          amount: 10000,
        },
        {
          type: "Bonds",
          amount: 15000,
        },
      ],
      loans: [
        {
          type: "Mortgage",
          amount: 200000,
          interest_rate: 3.5,
          monthly_payment: 1000,
        },
        {
          type: "Car Loan",
          amount: 25000,
          interest_rate: 5.0,
          monthly_payment: 500,
        },
      ],
      credit_score: 720,
      credit_cards: [
        {
          issuer: "Chase",
          card_type: "Rewards",
          credit_limit: 10000,
          current_balance: 2000,
        },
        {
          issuer: "American Express",
          card_type: "Platinum",
          credit_limit: 20000,
          current_balance: 0,
        },
      ],
    },
  },
};


const toXml = (jsonObject) => {
  let myEntries = Object.entries(jsonObject);

  let xmlData = "";

  for (const [k, v] of myEntries) {
    xmlData += `<${k}>${getXmlValue(v)}</${k}>` + "\n";
  }

  writeToFile("test.xml", xmlData);
  console.log("finished");
};

const fromXml = (filename) => {
  let xmlData = readFromFile(filename);

  let jsonData = {};
  //split the data by "\n"
  let splitXml = xmlData.split("\n");

  for (let i = 0; i < splitXml.length; i++) {
    // split by ' ' and get 1
    let data = splitXml[i].replace(/>/g, ",");
    data = data.replace(/</g, ",");
    data = data.replace(/<\//g, ",");

    data = data.split(",");
    let key = data[1]
      ? data[1].startsWith("/", 0)
        ? data[1].substring(1)
        : data[1]
      : undefined;
    if (data[2] === "") Object.assign(jsonData, { [key]: data[1] });
    else Object.assign(jsonData, { [key]: data[2] });
  }

  console.log("jsonData", jsonData);
};

const getXmlValue = (val) => {
  if (typeof val !== "object") return val;

  if (typeof val === "object") {
    let entries = Object.entries(val);
    let d = "\n";
    for (const [k, v] of entries) {
      d += `<${k}>${getXmlValue(v)}</${k}>` + "\n";
    }

    return d;
  }
};

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, data, { encoding: "utf-8" });
};

const readFromFile = (filename) => {
  return fs.readFileSync(filename, { encoding: "utf-8" });
};

function main() {
  toXml(userData);
  // fromXml("test.xml")
}

// main();

console.log(typeof [1,2,3,4])
console.log(Array.isArray({1: 1,2: 2,3: 3,4: 4}))
