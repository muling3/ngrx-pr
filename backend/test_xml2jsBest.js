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
  // valueProcessors: [
  //   xml2js.processors.parseBooleans,
  //   xml2js.processors.parseNumbers,
  // ],
  // attrValueProcessors: [toLower],
  normalize: true,
});

const createJson = () => {
  let readData = readFromFile("patient_xml.xml");

  parser.parseString(readData, (err, res) => {
    writeToFile("patient_json.json", JSON.stringify(res));
    console.log("finished");
  });
};

const refineJson = () => {
  let readData = JSON.parse(readFromFile("patient_json.json"));
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

    // writeToFile("test_my_patienr.json", JSON.stringify(updatedPatient));
    //   Object.assign(updatedPatient, {})
    break;
  }

  Object.assign(theBiggerObj, { mailingGroup: theBiggerArray });
  writeToFile("test_all_patients.json", JSON.stringify(theBiggerObj));
};

const getJsonValue = (val) => {
  let obj = {};
  if (typeof val === "string") return val;

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

// createJson();
refineJson();
