import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719674077911 implements MigrationInterface {
    name = 'Migration1719674077911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "morse_exercises" DROP COLUMN "createdAt"`);
    }

}
