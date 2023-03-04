import { TaskBadges } from './task_badge.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from 'src/modules/user/entity/user.entity';
import { Project } from './project.entity';

@Entity('badge')
export class Badge extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    badge_label: string

    @Column({
        type: 'varchar'
    })
    badge_status: string

    @ManyToOne(() => User, user => user.created_badges)
    badge_creator: number
    
    @Column({
        type: 'tinyint'
    })
    badge_only_creator: number

    @Column({
        type: 'varchar'
    })
    badge_color: string

    @CreateDateColumn({select: false})
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number

    @ManyToOne(() => Project, project => project.badges, {onDelete: 'CASCADE'})
    project: number

    @OneToMany(() => TaskBadges, taskBadges => taskBadges.badge, {onDelete: 'CASCADE'})
    task: TaskBadges[]
}