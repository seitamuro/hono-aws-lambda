import { Hono } from "hono";
import { streamHandle } from "hono/aws-lambda";
import { streamText } from "hono/streaming";

const app = new Hono();

app.get("/stream", async (c) => {
  return streamText(c, async (stream) => {
    for (let i = 0; i < 10; i++) {
      await stream.write(`Hello, World! ${i}\n`);
      await stream.sleep(100);
    }
  });
});

export const handler = streamHandle(app);
