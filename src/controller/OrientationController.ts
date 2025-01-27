import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Orientation} from "../entity/Orientation";
import {generateRandomOrientationTopoExercise} from "../Services/topoOrientationExerciseGenerator";

export class OrientationController {
    private orientationRepository = AppDataSource.getRepository(Orientation)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.orientationRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { type, value, translatedValue, length } = request.body;

        const orientation = Object.assign(new Orientation(), {
            type,
            value,
            translatedValue,
            length
        })

        return this.orientationRepository.save(orientation)

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let orientationToRemove = await this.orientationRepository.findOneBy({ id })

        if (!orientationToRemove) {
            return "this orientation not exist"
        }

        await this.orientationRepository.remove(orientationToRemove)

        return "orientation element has been removed"
    }

    async getSpecificExercise(request: Request, response: Response, next: NextFunction) {
        const { type, numberOfElements } = request.body;

        console.log('Requesting orientation from the insomnia:', {
            type,
            numberOfElements
        });

        // Request data from chatGPT via the exercise generator service
        const orientation = await generateRandomOrientationTopoExercise(numberOfElements, type, this.orientationRepository);

        return orientation;
    }


}