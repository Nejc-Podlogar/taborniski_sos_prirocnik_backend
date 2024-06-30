import {MorseExcerciseController} from "../controller/morseExcerciseController";

export const MorseExerciseRoutes = [{
    method: "get",
    route: "/morse-exercise",
    controller: MorseExcerciseController,
    action: "all"
}, {
    method: "post",
    route: "/morse-exercise",
    controller: MorseExcerciseController,
    action: "save"
}, {
    method: "post",
    route: "/morse-exercise/get-exercise",
    controller: MorseExcerciseController,
    action: "getSpecificExercise"
}, {
    method: "delete",
    route: "/morse-exercise/:id",
    controller: MorseExcerciseController,
    action: "remove"
}
]