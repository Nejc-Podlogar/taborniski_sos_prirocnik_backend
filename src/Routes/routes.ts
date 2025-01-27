import { UserController } from "../controller/UserController"
import {UserRoutes} from "./UserRoutes";
import {PostRoutes} from "./PostRoutes";
import {MorseExerciseRoutes} from "./MorseExerciseRoutes";
import {OrientationRoutes} from "./Orientation";

export const Routes = [...UserRoutes, ...PostRoutes, ...MorseExerciseRoutes, ...OrientationRoutes]