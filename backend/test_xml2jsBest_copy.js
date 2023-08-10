const fs = require("fs");
const xml2js = require("xml2js");
xml2js.processors;

const toLower = (val) => {
  return val.toLowerCase();
};

let parser = new xml2js.Parser({
  explicitArray: false,
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
    writeToFile("patient_json_two.json", JSON.stringify(res));
    console.log("finished");
  });
};

const refineJson = () => {
  let readData = JSON.parse(readFromFile("patient_json_two.json"));

  let theBiggerObj = {};
  Object.assign(theBiggerObj, {
    mailingBatch: readData.mailingBatch,
  });

  let theBiggerArray = [];
  //   }
  for (var i = 0; i < readData.mailingBatch.mailingGroup.length; i++) {
    const element = readData.mailingBatch.mailingGroup[i];

    let updatedMailGroup = {};
    let elements = Object.entries(element);
    for (const [k, v] of elements) {
      Object.assign(updatedMailGroup, { [k]: cleanJSON(v) });
    }

    theBiggerArray.push(updatedMailGroup);
    // break;
  }

  // console.log("elements added ", i);
  Object.assign(theBiggerObj.mailingBatch, {
    mailingGroup: theBiggerArray,
  });
  writeToFile("test_all_patients_two.json", JSON.stringify(theBiggerObj));
};

const cleanJSON = (val) => {
  if (typeof val === "string" || typeof val === "number") return val;

  if (Array.isArray(val)) {
    return val.map((item) => {
      let itemObj = {};
      for (const [kk, vv] of Object.entries(item)) {
        Object.assign(itemObj, { [kk]: cleanJSON(vv) });
      }
      return itemObj;
    });
  }

  // if it gets at this point it won't be an array but an object
  const keys = Object.keys(val);

  // If there's only one key, remove the inner key and create an array
  if (keys.length === 1) {
    const data = cleanJSON(val[keys[0]]);
    return Array.isArray(data) ? data : [data];
  }

  let obj = {};
  for (const [k, v] of Object.entries(val)) {
    Object.assign(obj, { [k]: cleanJSON(v)})
  }

  return obj;
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
