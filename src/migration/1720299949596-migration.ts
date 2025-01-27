import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720299949596 implements MigrationInterface {
    name = 'Migration1720299949596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."orientation_topogrouptype_enum" RENAME TO "orientation_topogrouptype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orientation_topogrouptype_enum" AS ENUM('geodetske_tocke', 'morje_in_morska_obala', 'naselja_in_objekti', 'promet', 'rastje_in_vrste_tal', 'relief', 'vodovje', 'meje_in_ograje')`);
        await queryRunner.query(`ALTER TABLE "orientation" ALTER COLUMN "topoGroupType" TYPE "public"."orientation_topogrouptype_enum" USING "topoGroupType"::"text"::"public"."orientation_topogrouptype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orientation_topogrouptype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orientation_topogrouptype_enum_old" AS ENUM('geodetske_tocke', 'meje_in_morska_obala', 'naselja_in_objekti', 'promet', 'rastje_in_vrste_tal', 'relief', 'vodovje')`);
        await queryRunner.query(`ALTER TABLE "orientation" ALTER COLUMN "topoGroupType" TYPE "public"."orientation_topogrouptype_enum_old" USING "topoGroupType"::"text"::"public"."orientation_topogrouptype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."orientation_topogrouptype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orientation_topogrouptype_enum_old" RENAME TO "orientation_topogrouptype_enum"`);
    }

}
