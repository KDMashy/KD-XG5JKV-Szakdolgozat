import { Tasks } from './tasks.entity';
import { Badge } from './badge.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('task_badges')
export class TaskBadges extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false })
    updated_at: number

    @ManyToOne(() => Badge, badge => badge.task, {onDelete: 'CASCADE'})
    badge: number

    @ManyToOne(() => Tasks, tasks => tasks.badge, {onDelete: 'CASCADE'})
    task: number
}