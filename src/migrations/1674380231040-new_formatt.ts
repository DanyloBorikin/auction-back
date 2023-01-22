import {MigrationInterface, QueryRunner} from "typeorm";

export class newFormatt1674380231040 implements MigrationInterface {
    name = 'newFormatt1674380231040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "video" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "image"`);
    }

}
