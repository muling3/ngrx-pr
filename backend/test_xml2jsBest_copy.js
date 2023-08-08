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
    console.log("inside here");
    writeToFile("patient_json_two.json", JSON.stringify(res));
    console.log("finished");
  });
};

const refineJson = () => {
  let readData = JSON.parse(readFromFile("patient_json_two.json"));

  let theBiggerObj = {};
  let theBiggerArray = [];
  //   }
  for (var i = 0; i < readData.mailingBatch.mailingGroup.length; i++) {
    const element = readData.mailingBatch.mailingGroup[i];

    let updatedPatient = {};
    let elements = Object.entries(element);
    for (const [k, v] of elements) {
      Object.assign(updatedPatient, { [k]: cleanJSON(v) });
    }

    theBiggerArray.push(updatedPatient);
    // break;
  }

  // console.log("elements added ", i);
  Object.assign(theBiggerObj, { mailingGroup: theBiggerArray });
  writeToFile("test_all_patients_two.json", JSON.stringify(theBiggerObj));
};

const cleanJSON = (val) => {
  if (typeof val === "string" || typeof val === "number") {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map(item => {
      let itemObj = {}; // Create a new object for each item
      for (const [kk, vv] of Object.entries(item)) {
        itemObj[kk] = cleanJSON(vv);
      }
      return itemObj;
    });
  }

  if (typeof val === "object") {
    const keys = Object.keys(val);

    // If there's only one key, remove the inner key and create an array
    if (keys.length === 1) {
      const innerArray = cleanJSON(val[keys[0]]);
      return Array.isArray(innerArray) ? innerArray : [innerArray];
    }

    let obj = {};
    for (const [k, v] of Object.entries(val)) {
      obj[k] = cleanJSON(v);
    }
    return obj;
  }
};

// const cleanJSON = (val) => {
//   let obj = {};
//   if (typeof val === "string" || typeof val === "number") return val;

//   if (typeof val === "object") {
//     console.log(
//       "VAL ",
//       Object.keys(val),
//       "v ",
//       Object.keys(val).length
//     );
//     for (const [k, v] of Object.entries(val)) {
//       //check where the v is an array
//       if (Array.isArray(v)) {
//         let list = [];
//         let itemObj = {};
//         console.log("v ", k)
//         for (const item of v) {
//           for (const [kk, vv] of Object.entries(item)) {
//             Object.assign(itemObj, { [kk]: cleanJSON(vv) });
//           }
//           list.push(itemObj);
//         }

//         Object.assign(obj, { [k]: list });
//       } else {
//         Object.assign(obj, { [k]: cleanJSON(v) });
//       }
//     }
//   }
//   return obj;
// };

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, data, { encoding: "utf-8" });
};

const readFromFile = (filename) => {
  return fs.readFileSync(filename, { encoding: "utf-8" });
};

// calling createJson()

// createJson();
refineJson();
