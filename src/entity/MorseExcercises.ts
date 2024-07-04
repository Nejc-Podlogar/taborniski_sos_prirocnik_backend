import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export enum ExerciseType {
    LETTERS = "letters",
    WORDS = "words",
    SENTENCES = "sentences",
}

export enum LearningInteractionType {
    CARDS = "cards",
    KEYBOARD = "keyboard",
    TOKENS = "tokens",
}

export enum TranslateType {
    TEXTTOMORSE = "textToMorse",
    MORSETOTEXT = "morseToText",
}

@Entity()
export class MorseExercises {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ExerciseType,
    })
    type: ExerciseType;

    @Column({
        type: "enum",
        enum: TranslateType,
    })
    translateType: TranslateType;

    @Column()
    value: string;

    @Column()
    translatedValue: string;

    @Column("boolean", {array: true, nullable: true })
    areTranslationsCorrect?: boolean[];

    @Column('int')
    length: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: "enum",
        enum: LearningInteractionType,
    })
    learningInteractionType: LearningInteractionType;

}