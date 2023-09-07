let dotenv = '../../server/node_modules/dotenv';

if (process.env.NODE_ENV !== "production") {
  require(dotenv).config()
}

let mongoose = '../../server/node_modules/mongoose'
mongoose = require(mongoose)

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, console.log("The mongoose is on the loose!"))