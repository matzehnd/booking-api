import { ZodError, z } from "zod";
import { State } from "../Models/State";
import { AccommodationDefinition } from "../Events/AccommodationDefinition";
import { accommodationDefinitionReducer } from "../Reducers/accommodationDefinitionReducer";

const eventSchema = z.object({
  index: z.number(),
  event: z.string(),
});

export class StateHandler {
  private actualState: State;
  private lastIndex: number | undefined;

  private applyEvent(event: unknown): ZodError | undefined {
    const result = eventSchema.safeParse(event);
    if (!result.success) {
      return;
    }
    switch (result.data.event) {
      case AccommodationDefinition.name:
        console.log("event :>> ", event);
        console.log(event instanceof AccommodationDefinition);
        const [res, error] =
          event instanceof AccommodationDefinition
            ? [event, undefined]
            : AccommodationDefinition.from(event);
        if (error) {
          console.log("-----------");
          return error;
        }
        this.actualState = accommodationDefinitionReducer(
          this.actualState,
          res
        );
        return undefined;
        break;

      default:
        break;
    }
  }

  public nextEvent(event: unknown): ZodError | Error | undefined {
    const result = eventSchema.safeParse(event);
    if (!result.success) {
      return result.error;
    }
    if (this.lastIndex !== undefined && result.data.index <= this.lastIndex) {
      return new Error("index error");
    }
    this.lastIndex = result.data.index;
    return this.applyEvent(event);
  }

  public constructor(initState: State) {
    this.actualState = initState;
  }

  public get state(): State {
    return this.actualState;
  }

  public get index(): number {
    return this.lastIndex || 0;
  }
}
