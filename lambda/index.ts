import { Hono } from "hono";
import type { LambdaContext, LambdaEvent } from "hono/aws-lambda";
import { handle } from "hono/aws-lambda";

type Bindings = {
  event: LambdaEvent;
  lambdaContext: LambdaContext;
};

const app = new Hono<{ Bindings: Bindings }>();

// Hello, World!
app.get("/", (c) => c.text("Hello, World!"));

// Access AWS Lambda Object
app.get("/aws-lambda-info/", (c) => {
  return c.json({
    isBase64Encoded: c.env.event.isBase64Encoded,
    awsRequestId: c.env.lambdaContext.awsRequestId,
  });
});

// Access RequestContext
app.get("/request-context/", (c) => {
  const lambdaContext = c.env.event.requestContext;
  return c.json(lambdaContext);
});

export const handler = handle(app);
