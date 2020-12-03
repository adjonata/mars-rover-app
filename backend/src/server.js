require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");

let port = 3333;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
}

mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Application running on port ${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
