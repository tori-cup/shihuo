const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const userSchema = new Schema({
  imgurl: String,
  username: String,
  password: String,
  area: String
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User
