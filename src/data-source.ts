import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import {MorseExercises} from "./entity/MorseExcercises";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "sos_admin",
    password: "kZpmbT9dqqmsJHo8bshZ",
    database: "t_sos_p",
    synchronize: false,
    logging: true,
    migrationsRun: true,
    entities: [
        Post,
        MorseExercises
    ],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
})
