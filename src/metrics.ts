import { Gauge } from "prom-client";

export enum DATA_TYPE {
  API_LATENCY = "API_LATENCY",
  API_STATUS = "API_STATUS",
  DB_COUNT = "DB_COUNT",
}

const api = new Gauge({
  name: "api",
  help: "api data; type = [status, latency]",
  labelNames: ["type", "endpoint"],
});

const db = new Gauge({
  name: "db",
  help: "db data; type = [key_count]",
  labelNames: ["type"],
});

export class Metrics {
  metricsMap: Map<string, any[]>;
  constructor() {
    this.metricsMap = new Map<string, any[]>();
  }
  addMetric(type: DATA_TYPE, data: any) {
    if (!this.metricsMap.has(type)) {
      this.metricsMap.set(type, [data]);
    } else {
      this.metricsMap.get(type)?.push(data);
    }
  }
  collectMetrics() {
    this.metricsMap.forEach((value, key) => {
      switch (key) {
        case DATA_TYPE.API_LATENCY:
          value.forEach((v) => {
            api.labels("latency", v.endpoint).set(v.value);
          });
          break;
        case DATA_TYPE.API_STATUS:
          value.forEach((v) => {
            api.labels("status", v.endpoint).set(v.value);
          });
          break;
        case DATA_TYPE.DB_COUNT:
          const v = value[0];
          db.labels("key_count").set(v.value);
          break;
      }
    });
    this.metricsMap.clear();
  }
}
