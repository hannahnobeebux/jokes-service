const app = require('./index');
const { sequelize } = require('./db');

const { PORT = 4000 } = process.env;

// IMPORTING THE APP HERE MAKES IT EASIER TO TEST WITH SUPERTEST
app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Jokes are ready at http://localhost:${PORT}`);
});