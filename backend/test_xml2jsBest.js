const fs = require("fs");
const xml2js = require("xml2js");
xml2js.processors;

const toLower = (val) => {
  return val.toLowerCase();
};

let parser = new xml2js.Parser({
  explicitArray: true,
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
  writeToFile("test_all_patients_one.json", JSON.stringify(theBiggerObj));

  // let otherArray = [];
  // // make it more cleaner
  // for (var i = 0; i < theBiggerArray.length; i++) {
  //   const element = theBiggerArray[i];

  //   let updatedPatient = {};
  //   let elements = Object.entries(element);
  //   for (const [k, v] of elements) {
  //     Object.assign(updatedPatient, { [k]: cleanMore(v) });
  //   }

  //   otherArray.push(updatedPatient);

  //   // console.log("updated", updatedPatient);
  //   // writeToFile("test_my_patienr.json", JSON.stringify(updatedPatient));
  //   //   Object.assign(updatedPatient, {})
  //   // break;
  // }

  // console.log("elements added ", i);
  // Object.assign(theBiggerObj, { mailingGroup: otherArray });
  // writeToFile("test_all_patients_two.json", JSON.stringify(theBiggerObj));
};

const getJsonValue = (val) => {
  let obj = {};
  if (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  )
    return val; // patien

  let entries = Object.entries(val);
  for (const [k, v] of entries) {
    let val = v;
    if (Object.entries(v[0]).length == 1) {
    // if (k === "claims" || k === "patients" || k === "procedures") {
      const key = Object.keys(v[0])[0];
      console.log("key ", key);

      console.log("entries ", Object.entries(v[0]).length);
      // // Get the inner object using the first key
      const innerObject = v[0][key];
      console.log("innerObj ", k, innerObject);

      val = innerObject;
    }

    if (Array.isArray(val) && typeof val[0] === "object" && val.length > 1) {
      // console.log("val ", val);
      let vObj = [];
      for (let i = 0; i < val.length; i++) {
        const item = val[i];
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
};

const exceptionals = ["claims", "patients", "procedures"];

const checkExceptional = (val) => {
  for (const k of exceptionals) {
    if (k === val) return true;
  }
  return false;
};

const cleanMore = (val) => {
  let obj = {};

  //if its an array
  // 1. check the length, if == 1 return the first element
  if (Array.isArray(val) && val.length == 1) return val[0];

  // if its not array just return
  if (!Array.isArray(val)) return val;

  // if(Array.isArray(val)){
  //   if(val.length == 1){
  //     return
  //   }
  //   // 2. if > 1 loop thru and apply the above rules

  // }
  // let entries = Object.entries(val);
  // for (const [k, v] of entries) {
  //   if (Array.isArray(v) && typeof v[0] === "object") {
  //     let vObj = [];
  //     for (let i = 0; i < v.length; i++) {
  //       const item = v[i];
  //       let entries = Object.entries(item);

  //       for (const [kk, vv] of entries) {
  //         vObj.push(cleanMore(vv[0]));
  //       }
  //     }

  //     Object.assign(obj, { [k]: vObj });
  //   } else {
  //     Object.assign(obj, { [k]: cleanMore(v[0]) });
  //   }
  // }
  // return obj;
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
// const originalData = {
//   procedures: {
//     procedure: [
//       {
//         code: "DEFAULT",
//         description: "Ambulance, advanced life support, emergency, ALS 1 ",
//         charge: 2148,
//         payment: 0,
//       },
//       {
//         code: "DEFAULT",
//         description: "Ground mileage",
//         charge: 299.88,
//         payment: 0,
//       },
//     ],
//   },
// };

// // Find the first key inside the outer object (assuming there's only one key)
// const outerKey = Object.keys(originalData)[0];
// console.log("outerKey ", outerKey)

// // Get the inner object using the first key
// const innerObject = originalData[outerKey];
// console.log("innerObject ", innerObject);

// // Find the first key inside the inner object (assuming there's only one key)
// const innerKey = Object.keys(innerObject)[0];
// console.log("innerKey ", innerKey);

// // Convert the inner object to an array
// const innerArray = innerObject[innerKey];
// console.log("innerArray ", innerArray);

// // Update the outer key with the extracted array
// originalData[outerKey] = innerArray;

// console.log(originalData);

// const entries = Object.entries(userData)

// console.log("entries ", entries)
