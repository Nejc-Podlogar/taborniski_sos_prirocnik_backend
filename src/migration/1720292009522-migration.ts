import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720292009522 implements MigrationInterface {
    name = 'Migration1720292009522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orientation_topogrouptype_enum" AS ENUM('geodetske_tocke', 'meje_in_morska_obala', 'naselja_in_objekti', 'promet', 'rastje_in_vrste_tal', 'relief', 'vodovje')`);
        await queryRunner.query(`CREATE TABLE "orientation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageLoc" character varying NOT NULL, "topoGroupType" "public"."orientation_topogrouptype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_855d7b7a876102fbb47cba97d15" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orientation"`);
        await queryRunner.query(`DROP TYPE "public"."orientation_topogrouptype_enum"`);
    }

}
