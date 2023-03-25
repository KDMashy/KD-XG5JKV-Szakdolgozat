import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channel } from "./channel.entity";

@Entity("messages")
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text"
    })
    message_content: string;

    @Column({
        type: "varchar",
        default: "false"
    })
    need_moderation: string;

    @Column({
        type: "varchar",
        default: "false"
    })
    reported: string;

    @Column({
        type: "varchar",
        default: "false"
    })
    edited: string;

    @Column({
        type: "varchar",
        default: "false"
    })
    deleted: string;

    @Column({
        type: "varchar",
        default: "false",
        select: false
    })
    admin_notification: string;

    @Column({
        type: "varchar",
        default: "false"
    })
    readed: string;

    @CreateDateColumn({ select: false })
    created_at: string;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number;

    @ManyToOne(() => Channel, channel => channel.messages)
    channel: number;

    @ManyToOne(() => User, user => user.messages)
    sender: number
}