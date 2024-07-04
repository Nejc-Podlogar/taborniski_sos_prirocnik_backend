import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720124549987 implements MigrationInterface {
    name = 'Migration1720124549987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Add the column with a default value
        await queryRunner.query(`CREATE TYPE "public"."morse_exercises_learninginteractiontype_enum" AS ENUM('cards', 'keyboard', 'tokens')`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "learningInteractionType" "public"."morse_exercises_learninginteractiontype_enum" NOT NULL DEFAULT 'keyboard'`);

        // Step 2 (Optional): Alter the column to remove the default value if not needed
        // This step is optional and can be omitted if you want to keep the default value for future rows
        // await queryRunner.query(`ALTER TABLE "morse_exercises" ALTER COLUMN "learningInteractionType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "learningInteractionType"`);
        await queryRunner.query(`DROP TYPE "public"."morse_exercises_learninginteractiontype_enum"`);
    }
}