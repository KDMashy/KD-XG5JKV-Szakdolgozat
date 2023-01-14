import { UserTasks } from './user_task.entity';
import { TaskBadges } from './task_badge.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from 'src/modules/user/entity/user.entity';
import { Project } from './project.entity';
import { Row } from './row.entity';

@Entity('tasks')
export class Tasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    task_name: string

    @ManyToOne(() => User, user => user.created_tasks)
    task_creator: number

    @Column({
        type: 'tinyint'
    })
    task_only_creator: number

    @ManyToOne(() => Row, row => row.tasks, {onDelete: 'CASCADE'})
    row: number
    
    @ManyToOne(() => Project, project => project.tasks, {onDelete: 'CASCADE'})
    project: number

    @OneToMany(() => TaskBadges, taskBadges => taskBadges.task, {onDelete: 'CASCADE'})
    badge: TaskBadges[]

    @OneToMany(() => UserTasks, userTasks => userTasks.task, {onDelete: 'CASCADE'})
    joined_user: UserTasks[]
    
    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number
}