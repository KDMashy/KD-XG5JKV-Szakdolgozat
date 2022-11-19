import { TaskBadges } from './task_badge.entity';
import { ProjectBadge } from './project_badge.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('badge')
export class Badge extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    label: string

    @Column({
        type: 'varchar'
    })
    status: string

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => ProjectBadge, projBadge => projBadge.badge, {onDelete: 'CASCADE'})
    project: ProjectBadge[]

    @OneToMany(() => TaskBadges, taskBadges => taskBadges.badge, {onDelete: 'CASCADE'})
    task: TaskBadges[]
}