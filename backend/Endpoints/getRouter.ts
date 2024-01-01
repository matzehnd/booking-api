import { Request, Response, Router } from "express";
import { getAccommodations } from "./getAccommodations";
import { StateHandler } from "../Stream/StateHandler";
import { DirectSink } from "../Stream/sink/DirectSink";
import { putAccommodation } from "./putAccommodation";
import { putBookingRequest } from "./putBookingRequest";

const tryCatcher =
  (
    fn: (req: Request, res: Response) => void
  ): ((req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500);
      res.send();
    }
  };

export const getRouter = (
  stateHandler: StateHandler,
  eventSink: DirectSink
) => {
  const router = Router();
  router.get("/accommodations", (_req, res) => {
    res.send(getAccommodations(stateHandler.state));
  });
  router.put(
    "/accommodations",
    tryCatcher(async (req, res) => {
      const [_, error] = await putAccommodation(eventSink, req.body);
      if (error) {
        res.status(400);
        res.send(error?.message);
      }
      res.send();
    })
  );
  router.put(
    "/booking-request",
    tryCatcher(async (req, res) => {
      const [_, error] = await putBookingRequest(
        stateHandler.state,
        eventSink,
        req.body
      );
      if (error) {
        res.status(400);
        res.send(error?.message);
      }
      res.send();
    })
  );
  return router;
};
