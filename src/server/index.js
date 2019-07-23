import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
const DIST_DIR = __dirname;
let HTML_FILE = path.resolve(DIST_DIR, './client/index.html');

if (env === 'production') {
  app.use(express.static(DIST_DIR + '/client'));
}

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;