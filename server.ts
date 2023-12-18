import { makeApp } from "./app";

let port = 8001;
const app = makeApp();

app.listen(port, () => {
  console.log('Listning to port 8001');
})
