//importing app
const app = require("./src/app");
const puppeteer = require("puppeteer");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
// const { fakeUsers, testFunc } = require("./fake_data");
const testFunc = require("./fake_data")

console.log("texstFunc ", testFunc.call(this, 20))

//initialising port
const PORT = 4000;

// FAKE USERS
// const fakeUsersData = fakeUsers;

const userData = {
  firstName: "John",
  lastName: "Dunning",
  email: "john.doe@example.com",
  age: 30,
  financialDetails: {
    accountNumber: "1234567890",
    bankName: "Example Bank",
    accountType: "savings",
  },
};

// // test
// (async () => {
//   // Launch the browser browserless
//   // const browser = await puppeteer.connect({
//   //   browserWSEndpoint: `wss://chrome.browserless.io?token=dfadbd4a-b26b-4b53-88d1-e1eec4e12d44`,
//   // });

//   // Launch the browser launching chrome instance
//   const browser = await puppeteer.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   // await page.goto("http://127.0.0.1:5500/test_puppeteer.html");
//   // await page.goto("http://localhost:4200/");

//   // Set screen size
//   // await page.setViewport({ width: 1080, height: 1024 });

//   //' setting content using ejs
//   let people = ["geddy", "neil", "alex"];
//   // let template = `
//   //             <form>
//   //                 <input type="text" style="width: 100vw; padding: 20px">
//   //             </form>
//   //             <% people.forEach(function(p){ %>
//   //                 <h1><%= p  %></h1>
//   //             <% }); %>
//   //         `;

//   // using custom delimeters { delimiter: '?'}
//   let template = `
//       <h1><?= people.join(" | "); ?></h1>
//   `;

//   // reading data from a file
//   // 1
//   //   let filePath = path.join(__dirname, "layouts", "user_details.ejs");
//   //   const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });

//   // 2
//     let filePath = path.join(__dirname, "layouts", "users_in_table.ejs");
//     const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });

//   let html = ejs.render(fileData, { users: fakeUsersData });
//   // let tmplFunc = ejs.compile(template)

//   //set page content
//   await page.setContent(html);

//   // // Type into search box
//   // await page.type(".search-box__input", "automate beyond recorder");

//   // // Wait and click on first result
//   // const searchResultSelector = ".search-box__link";
//   // await page.waitForSelector("#tyest");
//   // // await page.se
//   // await page.click("#tyest");

//   // // Locate the full title with a unique string
//   // const textSelector = await page.waitForSelector("#tyest");
//   // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

//   // header and footer
//   //   <style>
//   //     h4 {
//   //         font-size: 25px;
//   //     }
//   //     span {
//   //         font-size: 20px;
//   //     }
//   // </style>

//   // gen pdf
//   await page.pdf({
//     path: path.join(__dirname, "sample.pdf"),
//     format: "LETTER",
//     printBackground: true,
//     margin: {
//       top: "80px",
//       left: "50px",
//       right: "50px",
//       bottom: "80px",
//     },
//     displayHeaderFooter: true,
//     headerTemplate: `
//         <div style="display: flex; justify-content: flex-end; align-items: center; width: 100vw; font-size: 12px; margin: 0 20px;">
//             <h4> My header goes in here </h4> &nbsp;
//             Date generated: <span class="date"></span>
//             <span class="title"></span> &nbsp;&nbsp;
//             Page &nbsp; <span class="pageNumber"></span> &nbsp; of &nbsp;<span class="totalPages"></span>
//         </div>
//       `,
//     footerTemplate: `
//         <div style="display: flex; justify-content: flex-end; align-items: center; width: 100vw; font-size: 12px; margin: 0 20px;">
//             <h4> Here goes my footer </h4> &nbsp;
//             Date generated: <span class="date"></span>
//             <span class="title"></span> &nbsp;&nbsp;
//             Page &nbsp; <span class="pageNumber"></span> &nbsp; of &nbsp;<span class="totalPages"></span>
//         </div>
//       `,
//   });

//   await browser.close();
// })().catch((err) => {
//   console.error("Error occurred ", err);
// });

//spinning the server
app.listen(PORT, () =>
  console.log(`Application running locally on port ${PORT}`)
);
