import {PostController} from "../controller/PostController";

export const PostRoutes = [{
    method: "get",
    route: "/posts",
    controller: PostController,
    action: "all"
},
{
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove"
}, {
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save"
}, {
    method: "get",
    route: "/posts/latest",
    controller: PostController,
    action: "latest"
}
]