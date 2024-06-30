import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719670885215 implements MigrationInterface {
    name = 'Migration1719670885215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "translate_type"`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "translated_value"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."morse_exercises_translatetype_enum" AS ENUM('textToMorse', 'morseToText')`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "translateType" "public"."morse_exercises_translatetype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "translatedValue" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."morse_exercises_type_enum" AS ENUM('letters', 'words', 'sentences')`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "type" "public"."morse_exercises_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."morse_exercises_type_enum"`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "translatedValue"`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "translateType"`);
        await queryRunner.query(`DROP TYPE "public"."morse_exercises_translatetype_enum"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "translated_value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "translate_type" character varying NOT NULL`);
    }

}
