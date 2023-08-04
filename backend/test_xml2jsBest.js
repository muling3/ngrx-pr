const fs = require("fs");
const xml2js = require("xml2js");
xml2js.processors;

const toLower = (val) => {
  return val.toLowerCase();
};

let parser = new xml2js.Parser({
  tagNameProcessors: [xml2js.processors.firstCharLowerCase],
  // attrNameProcessors: [toLower],
  // valueProcessors: [toLower],
  valueProcessors: [
    xml2js.processors.parseBooleans,
    xml2js.processors.parseNumbers,
  ],
  // attrValueProcessors: [toLower],
  // normalize: true,
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
  //loop through the mailgroup array
  let theBiggerObj = {};
  let theBiggerArray = [];
  //   }
  for (var i = 0; i < readData.mailingBatch.mailingGroup.length; i++) {
    const element = readData.mailingBatch.mailingGroup[i];

    let updatedPatient = {};
    let elements = Object.entries(element);
    for (const [k, v] of elements) {
      Object.assign(updatedPatient, { [k]: getJsonValue(v[0]) });
    }

    theBiggerArray.push(updatedPatient);

    // console.log("updated", updatedPatient);
    // writeToFile("test_my_patienr.json", JSON.stringify(updatedPatient));
    //   Object.assign(updatedPatient, {})
    // break;
  }

  // console.log("elements added ", i);
  Object.assign(theBiggerObj, { mailingGroup: theBiggerArray });
  writeToFile("test_all_patients.json", JSON.stringify(theBiggerObj));
};

const getJsonValue = (val) => {
  let obj = {};
  if (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  )
    return val; // patien

  if (typeof val === "object") {
    let entries = Object.entries(val);
    for (const [k, v] of entries) {
      if (Array.isArray(v) && typeof v[0] === "object" && v.length > 1) {
        let vObj = [];
        for (let i = 0; i < v.length; i++) {
          const item = v[i];
          let itemObj = {};
          let entries = Object.entries(item);

          for (const [kk, vv] of entries) {
            Object.assign(itemObj, { [kk]: getJsonValue(vv[0]) });
          }
          vObj.push(itemObj);
        }

        Object.assign(obj, { [k]: vObj });
      } else {
        Object.assign(obj, { [k]: getJsonValue(v[0]) });
      }
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

createJson();
refineJson();
