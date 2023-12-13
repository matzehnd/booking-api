import { Router } from "express";
import { getAccommodations } from "./getAccommodations";
import { StateHandler } from "../Stream/StateHandler";
import { DirectSink } from "../Stream/sink/DirectSink";
import { putAccommodation } from "./putAccommodation";

export const getRouter = (
  stateHandler: StateHandler,
  eventSink: DirectSink
) => {
  const router = Router();
  router.get("/accommodations", (_req, res) => {
    res.send(getAccommodations(stateHandler.state));
  });
  router.put("/accommodations", async (req, res) => {
    try {
      const [_, error] = await putAccommodation(eventSink, req.body);
      if (error) {
        res.status(400);
        res.send(error?.message);
      }
      res.send();
    } catch (error) {
      res.status(500);
      res.send();
    }
  });
  return router;
};
