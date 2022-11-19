import { UserTasks } from './user_task.entity';
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

    @Column({
        type: 'bigint'
    })
    task_creator: number

    @Column({
        type: 'tinyint'
    })
    task_only_creator: number

    @OneToMany(() => ProjectTasks, projTasks => projTasks.task, {onDelete: 'CASCADE'})
    project: ProjectTasks[]

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => TaskBadges, taskBadges => taskBadges.task)
    badge: TaskBadges[]

    @OneToMany(() => UserTasks, userTasks => userTasks.task, {onDelete: 'CASCADE'})
    joined_user: UserTasks[]
}