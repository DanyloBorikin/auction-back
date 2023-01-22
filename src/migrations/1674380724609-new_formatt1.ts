import {MigrationInterface, QueryRunner} from "typeorm";

export class newFormatt11674380724609 implements MigrationInterface {
    name = 'newFormatt11674380724609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" RENAME COLUMN "image" TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" RENAME COLUMN "images" TO "image"`);
    }

}
