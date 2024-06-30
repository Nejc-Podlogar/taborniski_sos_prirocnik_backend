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
        const { title, content } = request.body;

        const post = Object.assign(new Post(), {
            title,
            content
        })

        return this.postRepository.save(post)
    }

    async latest(request: Request, response: Response, next: NextFunction) {
        return this.postRepository.find({
            order: { createdAt: "DESC" },
            take: 1
        });
    }
}