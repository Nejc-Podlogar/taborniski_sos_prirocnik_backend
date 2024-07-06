import {AppDataSource} from "../data-source";
import { NextFunction, Request, Response } from "express"
import {Post} from "../entity/Post";

export class PostController {
    private postRepository = AppDataSource.getRepository(Post)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.postRepository.find()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let postToRemove = await this.postRepository.findOneBy({ id })

        if (!postToRemove) {
            return "this post not exist"
        }

        await this.postRepository.remove(postToRemove)

        return "post has been removed"
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, content, link } = request.body;

        const post = Object.assign(new Post(), {
            title,
            content,
            link
        })

        return this.postRepository.save(post)
    }

    async latest(request: Request, response: Response, next: NextFunction) {
    const posts = await this.postRepository.find({
        order: { createdAt: "DESC" },
        take: 1
    });
    return posts[0]; // Return the first (and only) post in the array
}
}