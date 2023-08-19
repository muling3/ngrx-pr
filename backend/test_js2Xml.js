const fs = require("fs");
const xml2js = require("xml2js");
const uuid = require("uuid");

const createMailingGroup = () => {
  let group = {
    MailingType: "Patient Statements",
    Date: `${getRandomNum(1, 31)}/${getRandomNum(1, 12)}/2023`,
    Agency: getRandomAgency(),
  };

  return group;
};

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomAgency = (numPatients = 1) => {
  let agencyName = getRandomNameFromGivenArray([
    "American Legion Ambulance Services",
    "Community Ambulance Association of Ambler",
  ]);
  let agency = {
    GroupNumber: uuid.v4(),
    SubGroupNumber: uuid.v4(),
    Address: {
      Address: agencyName,
      StreetAddress: getRandomTokenizedStr(3),
      StreetAddress2: getRandomTokenizedStr(3),
      City: getRandomStr(5),
      State: getRandomStr(4),
      Zip: getRandomNum(100, 999),
      ZipPlus4: getRandomNum(100, 999),
    },
    FaxNumber: `${getRandomNum(100, 999)}/${getRandomNum(
      100,
      999
    )}/${getRandomNum(1000, 9999)}`,
    ReturnAddress: {
      Name: agencyName,
      StreetAddress: getRandomTokenizedStr(4),
      StreetAddress2: getRandomTokenizedStr(4),
      City: getRandomStr(5),
      State: getRandomStr(4),
      Zip: getRandomNum(100, 999),
      ZipPlus4: getRandomNum(100, 999),
    },
    RemitAddress: {
      Name: agencyName,
      StreetAddress: getRandomTokenizedStr(3),
      StreetAddress2: getRandomTokenizedStr(3),
      City: getRandomStr(5),
      State: getRandomStr(4),
      Zip: getRandomNum(100, 999),
      ZipPlus4: getRandomNum(100, 999),
    },
    Patients: getRandomPatients(getRandomNum(1, 3)),
  };
  return agency;
};

const getRandomTokenizedStr = (tokens) => {
  let street = `${getRandomNum(100, 999)} `;
  for (let i = 1; i < tokens; i++) {
    street += `${getRandomStr(getRandomNum(3, 4))} `;
  }

  return street;
};

const getRandomStr = (len, allCaps = false) => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let name = "";

  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * 25);
    if (i == 0) name += letters[index].toUpperCase();
    else name += letters[index];
  }

  return allCaps ? name.toUpperCase() : name;
};

const getRandomNameFromGivenArray = (givenArray) => {
  return givenArray[getRandomNum(0, givenArray.length - 1)];
};

const getRandomPatients = (numberOfPatients) => {
  let patients = [];
  for (let i = 0; i < numberOfPatients; i++) {
    const firstName = getRandomStr(getRandomNum(4, 8));
    const lastName = getRandomStr(getRandomNum(4, 8));
    const patient = {
      AccountNumber: `${firstName}${lastName}`,
      LastName: lastName,
      FirstName: firstName,
      SSN: `${getRandomNum(100, 999)}-${getRandomNum(50 - 200)}-${getRandomNum(
        1_000,
        10_000
      )}`,
      DoB: `${getRandomNum(1, 31)}/${getRandomNum(1, 12)}/${getRandomNum(
        1963,
        2022
      )}`,
      SendTo: {
        Name: getRandomStr(2, true),
        StreetAddress: getRandomTokenizedStr(2),
        StreetAddress2: getRandomTokenizedStr(3),
        City: getRandomStr(5),
        State: getRandomStr(4),
        Zip: getRandomNum(1200, 2400),
        ZipPlus4: getRandomNum(1000, 2000),
      },
      Claims: getRandomClaims(getRandomNum(1, 3)),
      Billing: {
        AmountTotal: getRandomNum(150, 500),
        AmountCurrent: getRandomNum(150, 500),
        Amount3160: getRandomNum(50, 500),
        Amount6190: getRandomNum(50, 500),
        Amount91120: getRandomNum(50, 500),
        AmountOver120: getRandomNum(50, 500),
        TotalPatientAmountBalance: getRandomNum(50, 500),
      },
      Notes: {
        MainHeader: getRandomNameFromGivenArray([
          "NEED_INS",
          "FIRST_STATEMENT",
          "THIRD_STATEMENT",
          "",
        ]),
        MainBody: `${getRandomStr(5)} ${getRandomStr(2)} ${getRandomStr(
          4
        )} ${getRandomStr(5)}`,
        SubHeader: `${getRandomStr(3)} ${getRandomStr(5)}`,
        SubBody: `${getRandomStr(5)} ${getRandomStr(4)} ${getRandomStr(
          3
        )} ${getRandomStr(5)} ${getRandomStr(4)}`,
      },
    };

    patients.push(patient);
  }

  return { patient: patients };
};

const getRandomClaims = (numberOfClaims) => {
  let claims = [];
  for (let i = 0; i < numberOfClaims; i++) {
    const claim = {
      ClaimNumber: `${getRandomStr(2, true)}-${getRandomNum(
        10_000,
        50_000
      )}-${getRandomStr(4, true)}`,
      IncidentNumber: `${getRandomNum(2021, 2023)}-${getRandomNum(
        20_100,
        40_230
      )}`,
      DateOfService: `${getRandomNum(1, 31)}/${getRandomNum(
        1,
        12
      )}/${getRandomNum(1963, 2022)}`,
      TransportOrigin: {
        FacilityName: `${getRandomTokenizedStr(5)}`,
        StreetAddress: `${getRandomTokenizedStr(2)}`,
        City: `${getRandomStr(6)}`,
        State: `${getRandomStr(2, true)}`,
        Zip: `${getRandomNum(10_001, 19_001)}-${getRandomNum(1_000, 10_001)}`,
      },
      transportDestination: {
        FacilityName: `${getRandomTokenizedStr(5)}`,
        StreetAddress: `${getRandomTokenizedStr(2)}`,
        City: `${getRandomStr(6)}`,
        State: `${getRandomStr(2, true)}`,
        Zip: `${getRandomNum(10_001, 19_001)}-${getRandomNum(1_000, 10_001)}`,
      },
      Balance: getRandomNum(200, 999),
      SelfPosted: getRandomNum(200, 999),
      InsurancePosted: getRandomNum(200, 999),
      Procedures: getRandomProcedures(getRandomNum(1, 3)),
      BillDetail: getRandomBillDetail(getRandomNum(3, 6)),
    };

    claims.push(claim);
  }

  return { claim: claims };
};

const getRandomProcedures = (count) => {
  let procedures = [];
  for (let i = 0; i < count; i++) {
    const procedure = {
      Code: getRandomNameFromGivenArray(["DEFAULT"]),
      Description: `${getRandomStr(5)} ${getRandomStr(2)} ${getRandomStr(
        4
      )} ${getRandomStr(5)}`,
      Charge: getRandomNum(200, 999),
      Payment: getRandomNum(100, 400),
    };
    procedures.push(procedure);
  }

  return { procedure: procedures };
};

const getRandomBillDetail = (count) => {
  let billDetails = [];
  for (let i = 0; i < count; i++) {
    let detail = {
      Date: `${getRandomNum(1, 31)}/${getRandomNum(1, 12)}/${getRandomNum(
        1963,
        2022
      )}`,
      TransactionType: getRandomNameFromGivenArray(["Adjustment", "Payment"]),
      Detail: `${getRandomStr(5)} ${getRandomStr(2)} ${getRandomStr(4)}`,
      Balance: getRandomNum(10.0, 100.0),
    };

    billDetails.push(detail);
  }

  return billDetails;
};

// writing xml from js
const main = () => {
  let startingDate = Date.now();
  // create dynbamic json
  // for(let i; i < 2)
  let mailingGroup = createMailingGroup();

  // build the jsonm
  var builder = new xml2js.Builder({
    rootName: "MailingType",
    explicitArray: true,
  });
  var buildJson = builder.buildObject(mailingGroup);

  // write the json to xml file
  writeToFile("my_xml.xml", buildJson);

  console.log(getRandomTokenizedStr(5));
  console.log("took this to complete ", Date.now() - startingDate);
};

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, data, { encoding: "utf-8" });
};

const readFromFile = (filename) => {
  return fs.readFileSync(filename, { encoding: "utf-8" });
};

// start main
main();
