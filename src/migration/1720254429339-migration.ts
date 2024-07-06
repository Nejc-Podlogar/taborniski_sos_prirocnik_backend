import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720254429339 implements MigrationInterface {
    name = 'Migration1720254429339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "link"`);
    }

}
