import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720125873569 implements MigrationInterface {
    name = 'Migration1720125873569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "areTranslationsCorrect" boolean array`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ALTER COLUMN "learningInteractionType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" ALTER COLUMN "learningInteractionType" SET DEFAULT 'keyboard'`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "areTranslationsCorrect"`);
    }

}
