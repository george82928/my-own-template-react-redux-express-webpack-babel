import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { createLogger, format, transports } from 'winston';

const app = express();
const port = process.env.PORT || 3000;
const HTML_FILE = path.resolve(__dirname, '../client/index.html');
const STATIC_PATH = path.resolve(__dirname, '../client');
const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('combined'));
app.use(cors());

if (isProduction) {
  app.use(express.static(`${STATIC_PATH}`));
  app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
  });
}

const {
  combine, timestamp, errors, prettyPrint,
} = format;
const logger = createLogger({
  format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});
// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!isProduction) {
    logger.error(err.stack);
  }
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`));

module.exports = app;
