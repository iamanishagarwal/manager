const mongoose = require('mongoose')

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost/manager', { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('MongoDB Connected......')
  } catch (err) {
    console.log('Error while connecting to mongodb......')
    console.log(er)
  }
}
