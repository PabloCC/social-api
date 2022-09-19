const mongoose = require('mongoose')

const connect = (uri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true  
  }

  return mongoose.connect(uri, mongooseOpts)
}

module.exports = { connect }