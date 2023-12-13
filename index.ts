import express from "express";
import { plain } from "./Stream/source/plan";
import { DirectSink } from "./Stream/sink/DirectSink";
import { getFilePersistanceHandler } from "./Stream/sink/getFilePersistanceHandler";
import { getRouter } from "./Endpoints/getRouter";

const app = express();
app.use(express.json());

const port = Bun.env.PORT || 8080;

const initFile = Bun.file(Bun.env.INITFILE || "");
const stateHandler = plain();
const sink = new DirectSink(
  stateHandler,
  getFilePersistanceHandler(Bun.env.INITFILE || "events.json")
);
await sink.init(await initFile.text());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(getRouter(stateHandler, sink));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
