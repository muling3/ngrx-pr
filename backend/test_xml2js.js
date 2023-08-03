const fs = require("fs");
const xml2js = require("xml2js");

const toLower = (val) => {
  return val.toLowerCase();
};

let parser = new xml2js.Parser({
  tagNameProcessors: [toLower],
  attrNameProcessors: [toLower],
  valueProcessors: [toLower],
  attrValueProcessors: [toLower],
});

const createJson = () => {
  let readData = readFromFile("patient_xml.xml");

  parser.parseString(readData, (err, res) => {
    console.log("inside here");
    writeToFile("patient_json.json", JSON.stringify(res));
    console.log("finished");
  });
};

const refineJson = () => {
  let readData = JSON.parse(readFromFile("patient_json.json"));

  //   console.log(readData.MailingBatch.MailingGroup[0]);
  let updatedPatient = {};
  //loop through the mailgroup array
  //   for(const obj of JSON.parse(readData)['MailingGroup']){

  //   }
  for (let i = 1; i < readData.mailingbatch.mailinggroup.length; i++) {
    const element =
      readData.mailingbatch.mailinggroup[i].agency[0].patients[0].patient[0];

      let elements = Object.entries(element)
    for (const [k, v] of elements) {
      Object.assign(updatedPatient, { [k]: getJsonValue(v[0]) });
    }

    // console.log("updated", updatedPatient);
    writeToFile("test_my_patienr.json", JSON.stringify(updatedPatient));
    //   Object.assign(updatedPatient, {})
    break;
  }
};

const getJsonValue = (val) => {
  let obj = {};
  if (typeof val === "string") return val;

  if (typeof val === "object") {
    let entries = Object.entries(val);

    for (const [k, v] of entries) {
      Object.assign(obj, { [k]: getJsonValue(v[0]) });
    }

    return obj;
  }
};

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, data, { encoding: "utf-8" });
};

const readFromFile = (filename) => {
  return fs.readFileSync(filename, { encoding: "utf-8" });
};

// calling createJson()

// createJson();
refineJson();
