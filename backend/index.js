require("dotenv").config();

//importing app
const app = require("./src/app");

const dbConfig = require("./src/config/db.config");

//initialising port
const PORT = 4000;

//database conn
dbConfig((msg, err) => {
  console.log(msg);

  if (err) console.log(err);
  else {
    //spinn server
    app.listen(PORT, () =>
      console.log(`Application running locally on port ${PORT}`)
    );
  }
});
