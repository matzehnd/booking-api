import { z } from "zod";
import { StateHandler } from "../StateHandler";
import { State } from "../../Models/State";
import { Accommodations } from "../../Models/Accommodations";

export const plain = () => new StateHandler(new State(new Accommodations([])));
