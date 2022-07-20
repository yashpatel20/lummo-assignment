import "dotenv/config";
import express, { Request } from "express";
import { SearchQuery, SetBody } from "./interface";
import Logger from "./logger";
import morganMiddleware from "./middleware";
import { Service } from "./service";
import promClient from "prom-client";
import { DATA_TYPE, Metrics } from "./metrics";
const responseTime = require("response-time");

const service: Service = new Service();
const metrics: Metrics = new Metrics();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morganMiddleware);
app.use(
  responseTime((req: any, res: any, time: any) => {
    metrics.addMetric(DATA_TYPE.API_LATENCY, {
      endpoint: req.path,
      value: time,
    });
  })
);
app.use((req, res, next) => {
  metrics.addMetric(DATA_TYPE.API_STATUS, {
    endpoint: req.path,
    value: res.statusCode,
  });
  next();
});

app.get("/get/:key", (req, res) => {
  const key: string = req.params.key;
  const value = service.get(key);
  if (value == undefined) res.send("null");
  res.send(value);
});

app.post("/set", (req: Request<{}, {}, SetBody, {}>, res) => {
  service.set(req.body.key, req.body.value);
  res.status(201).end();
});

app.get("/search", (req: Request<{}, {}, {}, SearchQuery>, res) => {
  let prefixKey = null,
    suffixKey = null;
  if (req.query.prefix != undefined) prefixKey = req.query.prefix;
  if (req.query.suffix != undefined) suffixKey = req.query.suffix;
  const results = service.search(prefixKey, suffixKey);
  res.send(results);
});

app.get("/metrics", async (req, res) => {
  metrics.addMetric(DATA_TYPE.DB_COUNT, { value: service.repo.count() });
  metrics.collectMetrics();
  res.send(await promClient.register.metrics());
});

app.listen(port, () => {
  Logger.info(`App running on port ${port}`);
});
