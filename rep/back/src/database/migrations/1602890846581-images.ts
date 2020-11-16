import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class images1602890846581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'path',
                    type: 'string',
                },

                {
                    name: 'Idea_id',
                    type: 'integer',
                }

            ],

            foreignKeys: [
                {
                    name: 'ImageIdea',
                    columnNames: ['Idea_id'],
                    referencedTableName: 'Ideas',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
