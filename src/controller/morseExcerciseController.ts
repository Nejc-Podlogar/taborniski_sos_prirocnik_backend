import {AppDataSource} from "../data-source";
import {MorseExercises} from "../entity/MorseExcercises";
import {NextFunction, Request, Response} from "express";
import {generateRandomExercise} from "../Services/excerciseGenerator";


export class MorseExcerciseController {
    private morseExercisesRepository = AppDataSource.getRepository(MorseExercises)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.morseExercisesRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { type, translateType, value, translatedValue, length } = request.body;

        const morseExercise = Object.assign(new MorseExercises(), {
            type,
            translateType,
            value,
            translatedValue,
            length
        })

        return this.morseExercisesRepository.save(morseExercise)

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let morseExerciseToRemove = await this.morseExercisesRepository.findOneBy({ id })

        if (!morseExerciseToRemove) {
            return "this morse exercise not exist"
        }

        await this.morseExercisesRepository.remove(morseExerciseToRemove)

        return "morse exercise has been removed"
    }

    async getSpecificExercise(request: Request, response: Response, next: NextFunction) {
        const { type, translateType, numberOfElements, learningInteractionType } = request.body;

        console.log('Requesting exercise from the insomnia:', {
            type,
            translateType,
            numberOfElements,
            learningInteractionType
        });

        // Request data from chatGPT via the exercise generator service
        const exercise = generateRandomExercise(numberOfElements, type, translateType, learningInteractionType);

        return exercise;

    }
}