import { TaskBadges } from './task_badge.entity';
import { ProjectTasks } from './project_tasks.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tasks')
export class Tasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    task_name: string

    @OneToMany(() => ProjectTasks, projTasks => projTasks.task, {onDelete: 'CASCADE'})
    project: ProjectTasks[]

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => TaskBadges, taskBadges => taskBadges.task)
    badge: TaskBadges[]
}