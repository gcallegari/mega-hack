import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIdeas1602890833005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //nesse UP eu faço alterações 
        //crio tabelas, crio novo campo, edito, deleto etc

        await queryRunner.createTable(new Table({
            name: 'Ideas',
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
                    name: 'name',
                    type: 'varchar',
                },

                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'about',
                    type: 'text',
                },

                {
                    name: 'instructions',
                    type: 'text',
                },

                {
                    name: 'opening_hours',
                    type: 'varchar',
                },

                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //esse cara DESFAZ as coisas da UP
        await queryRunner.dropTable('Ideas')
    }
}
