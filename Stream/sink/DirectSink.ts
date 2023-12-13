import { ZodError } from "zod";
import { WithError } from "../../helper/WithError";
import { StateHandler } from "../StateHandler";
import { Sink } from "./Sink";
import { Event } from "../../Events/Event";

export class DirectSink implements Sink {
  private allEvents: Array<unknown> = [];
  constructor(
    private readonly stateHandler: StateHandler,
    private readonly persistanceHandler: (
      events: Array<unknown>
    ) => Promise<void>
  ) {}

  public init = async (initFile: string) => {
    const fileData = JSON.parse(initFile);
    if (!Array.isArray(fileData)) {
      throw new Error("fileData is not an array");
    }
    for (const event of fileData) {
      if (typeof event !== "object") {
        continue;
      }
      await this.applyEvent(event);
    }
  };

  public applyEvent = async (
    event: Event
  ): Promise<WithError<{ index: number }, ZodError | Error>> => {
    event.index = this.stateHandler.index + 1;

    const error = this.stateHandler.nextEvent(event);
    if (error) {
      return [undefined, error];
    }
    this.allEvents.push(event);
    await this.persistanceHandler(this.allEvents);
    return [{ index: event.index }, undefined];
  };
}
