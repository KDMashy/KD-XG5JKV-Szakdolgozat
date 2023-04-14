import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('notifications')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ManyToOne(() => User, user => user.notifications)
    user: number

    @Column({
        type: "text"
    })
    content: string

    @CreateDateColumn({ select: false })
    created_at: string;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number;
}