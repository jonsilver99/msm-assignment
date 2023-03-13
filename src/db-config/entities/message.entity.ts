import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    sid: string

    @Column({ 
        nullable: true, 
        type: 'datetimeoffset',
        transformer: {
            to(value: any) {
                return new Date(value)
            },
            from(value: string) {
                if (!value) return value
                return new Date(value)
            }
        }
    })
    date: Date

    @Column({ nullable: true })
    phoneNum: string

    @Column({ nullable: true, length: 250 })
    text: string

    @Column({ nullable: true })
    status: string

}