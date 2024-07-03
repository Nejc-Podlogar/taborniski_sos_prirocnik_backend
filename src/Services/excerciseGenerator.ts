import OpenAI, {RateLimitError} from "openai";
import {convertTextToMorse} from "./morseConverter";
import {ExerciseType, MorseExercises, TranslateType} from "../entity/MorseExcercises";
import {AppDataSource} from "../data-source";

export async function generateRandomExercise(length: number, type: ExerciseType, translateType: TranslateType) {

    let prompt = '';
    switch (type) {
        case ExerciseType.LETTERS:
            break;
        case ExerciseType.WORDS:
            prompt = `Zgeneriraj ${length} slovenskih besed ki so povezane s taborniki, oddajanje, taborništvom, naravo, oddajanjem... Vsaka beseda naj bo v novi vrstici. Besede naj bodo brez ločil.`;
            break;
        case ExerciseType.SENTENCES:
            prompt = `Zgeneriraj ${length} naključnih slovenskih kratkih stavkov ki so povezani s taborniki, oddajanje, taborništvom, naravo, oddajanjem... Vsak stavek naj bo v novi vrstici tako da jih bo uporabnik lahko prevedel. Stavki naj bodo brez ločil.`;
            break;
    }

    try {

        if (type === ExerciseType.LETTERS) {

            const textValues: string[] = generateRandomLetters(length);
            const morseValues: string[] = textValues.map((value) => {
                return convertTextToMorse(value);
            });

            const morseExercise = Object.assign(new MorseExercises(), {
                type: type,
                translateType: translateType,
                value: translateType == TranslateType.MORSETOTEXT ? morseValues : textValues,
                translatedValue: translateType == TranslateType.MORSETOTEXT ? textValues : morseValues,
                length: length,
            })

            try {
                await AppDataSource.getRepository(MorseExercises).save(morseExercise)
            } catch (error) {
                console.error('Error saving the exercise to the database:', error);
            }

            return morseExercise

        }else {

            const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'system', content: 'You are a bot, that helps generate exercises for Morse code translation. You will generate a list of words or sentences based on the given type. You can generate words or sentences that are related to Morse code, nature, camping, etc. You only return the requested data without anything else. All the generated data is in Slovenian language. The lines are never numbered or anything that would represent a list. Also do not include any punctuations.'},
                    {role: 'assistant', content: prompt},
                ],
            });

            let content = completion.choices[0]?.message?.content?.trim() ?? '';
            console.log('OpenAI Output: \n', content);
            if (content && content.includes('{') && content.includes('}')) {
                content = extractJson(content);
            }

            // If the exercise is of type textToMorse or morseToText we need to generate the morse translations as well.
            if (translateType === TranslateType.TEXTTOMORSE || translateType === TranslateType.MORSETOTEXT) {

                const textValues = content.split('\n');

                if (textValues.length > length) {
                    textValues.length = length;
                }

                textValues.forEach((value, index) => {
                    textValues[index] = value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
                });

                const morseValues = textValues.map((value) => {
                    return convertTextToMorse(value);
                });

                // Save the generated exercise to the database
                const morseExercise = Object.assign(new MorseExercises(), {
                    type: type,
                    translateType: translateType,
                    value: translateType == TranslateType.MORSETOTEXT ? morseValues : textValues,
                    translatedValue: translateType == TranslateType.MORSETOTEXT ? textValues : morseValues,
                    length: length,
                })

                try {
                    await AppDataSource.getRepository(MorseExercises).save(morseExercise)
                } catch (error) {
                    console.error('Error saving the exercise to the database:', error);
                }

                return morseExercise

            }
        }



    }catch (error) {
        if (error instanceof RateLimitError) {
            console.error('Rate limit error');

            // Try getting the data from the database with the required parameters.
            return await AppDataSource.getRepository(MorseExercises).find({
                where: {
                    type: type,
                    length: length
                }
            });


        } else {
            console.error('Error:', error);
        }
    }
}

function generateRandomLetters(length: number): string[] {
    const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result: string[] = [];
    for (let i = 0; i < length; i++) {
        result.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }
    return result;
}


function extractJson(content: string) {
    const regex = /\{(?:[^{}]|{[^{}]*})*\}/g;
    const match = content.match(regex);

    if (match) {
        // If we get back pure text it can have invalid carriage returns
        return match[0].replace(/"([^"]*)"/g, (match) => match.replace(/\n/g, "\\n"));
    } else {
        return '';
    }
}