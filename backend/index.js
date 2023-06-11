//importing app
const app = require("./src/app")

//initialising port
const PORT = 4000

//spinning the server
app.listen(PORT, () => console.log(`Application running locally on port ${PORT}`))