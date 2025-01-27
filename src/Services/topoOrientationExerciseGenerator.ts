import {Orientation, topoCharactersType} from "../entity/Orientation";
import {AppDataSource} from "../data-source";
import {In, Repository} from "typeorm";

export async function generateRandomOrientationTopoExercise( length: number, type: topoCharactersType[], orientationRepository: Repository<Orientation>) {

    try {

        console.log(' Group types are: ', type)

        let orientation = await orientationRepository.find(
            {
                where: {
                    topoGroupType: In(type),
                }
            }
        )

        // shuffle the array and only take the first $length elements
        let orientationUpdated = orientation.sort(() => Math.random() - 0.5).slice(0, length);

        const imageLoc: string[] = orientationUpdated.map((value) => value.imageLoc);
        const correctAnswers: boolean[] = new Array(orientationUpdated.length).fill(true);
        const names: string[] = orientationUpdated.map((value) => value.name);


        const shuffledNames = names.map((name, index) => {
            if (Math.random() < 0.5) {
                const sameGroupOrientations = orientation.filter(o => o.topoGroupType === orientationUpdated[index].topoGroupType && o.name !== name);
                if (sameGroupOrientations.length > 0) {
                    const randomIndex = Math.floor(Math.random() * sameGroupOrientations.length);
                    correctAnswers[index] = false;
                    return sameGroupOrientations[randomIndex].name;
                }
            }
            return name;
        });

return {
    names: shuffledNames,
    imageLoc: imageLoc,
    areCombinationsCorrect: correctAnswers
};


    } catch (error) {
        console.error('Error saving the exercise to the database:', error);
        throw error;
    }

}