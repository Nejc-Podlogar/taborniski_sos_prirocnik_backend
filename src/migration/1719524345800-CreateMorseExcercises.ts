import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMorseExcercises1719524345800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "morse_exercises" (
                "id" SERIAL NOT NULL,
                "type" character varying NOT NULL,
                "translate_type" character varying NOT NULL,
                "value" character varying NOT NULL,
                "translated_value" character varying NOT NULL,
                "length" integer NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "morse_exercises"`);
    }

}