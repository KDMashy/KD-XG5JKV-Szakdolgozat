import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity("channels")
export class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar"
    })
    message_channel: string;

    @ManyToOne(() => User, user => user.sender)
    first_user: number;

    @ManyToOne(() => User, user => user.receiver)
    second_user: number;

    @Column({
        type: "varchar",
        default: "true"
    })
    is_active: string;

    @Column({
        type: "varchar",
        default: "true"
    })
    send_notifications: string;
    
    @CreateDateColumn({ select: false })
    created_at: string;

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number;

    @OneToMany(() => Message, message => message.channel, {onDelete: "CASCADE"})
    messages: Message[]
}