import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import Idea from './Idea'

@Entity('images')

export default class Image {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Idea, Idea => Idea.images)
    @JoinColumn({ name: 'Idea_id'})
    Idea: Idea
}