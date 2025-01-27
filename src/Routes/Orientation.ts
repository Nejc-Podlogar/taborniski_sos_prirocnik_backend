import {OrientationController} from "../controller/OrientationController";

export const OrientationRoutes = [{
    method: "get",
    route: "/orientation",
    controller: OrientationController,
    action: "all"
}, {
    method: "post",
    route: "/orientation",
    controller: OrientationController,
    action: "save"
}, {
    method: "post",
    route: "/orientation/get-exercise",
    controller: OrientationController,
    action: "getSpecificExercise"
}, {
    method: "delete",
    route: "/orientation/:id",
    controller: OrientationController,
    action: "remove"
}
]