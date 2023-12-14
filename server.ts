import express from 'express'

let port = 8001
const app = express();// Make app och alla funktioner till den

app.listen(port, () => {
  console.log('Listning to port 8001');
})
