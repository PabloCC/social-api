const createApp = require('./src/app/app.js')
const {connect} = require('./src/app/infraestructure/db/index');

connect('mongodb://root:rootpassword@localhost:27017/organism?authSource=admin')
  .then(connection => {
    const app = createApp();
    app.listen(3000, () => console.log('Serving in port 3000'));
  })
  .catch(error => console.log(error))

  