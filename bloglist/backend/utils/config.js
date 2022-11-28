require('dotenv').config()

let PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fullstackopen:0g94MC149V7LzEna@cluster0.qgqb3at.mongodb.net/blogilista?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT,
}
