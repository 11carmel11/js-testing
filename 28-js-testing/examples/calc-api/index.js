const express = require('express')
const app = express()
const port = 3000
const arithmeticsRouter = require('./src/routers/arithmeticsRouter');
const cors = require('cors');

app.use(cors());
app.use('/', arithmeticsRouter);

app.listen(port, () => {
  console.log(`Calc api listening at http://localhost:${port}`)
})
