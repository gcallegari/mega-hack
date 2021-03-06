import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany} from 'typeorm'
import Image from './Image'

@Entity('Ideas')

export default class Idea {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    @OneToMany(() => Image, image => image.Idea, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'Idea_id'})
    images: Image[]

}