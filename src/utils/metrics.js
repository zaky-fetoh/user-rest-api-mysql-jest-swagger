const express = require("express");
const promClient = require("prom-client");
const responseTime = require("response-time");

const restResponseTimeHistogram = new promClient.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
  });


exports.StartMentoringServer = () => {
    promClient.collectDefaultMetrics();
    express().get("/metrics", async (req, res, next) => {
            res.set("Content-Type", promClient.register.contentType);

            return res.send(await promClient.register.metrics());
        })
        .listen(9000,()=>{
            console.log(`Metrics Server Start listening at ${9000}`)
        })
}

exports.monitorResponseTime = express.Router()
    .use(responseTime((req, res, time)=>{
        if (req?.route?.path) {
            restResponseTimeHistogram.observe(
              {
                method: req.method,
                route: req.route.path,
                status_code: res.statusCode,
              },
              time * 1000
            );
          }
    }))