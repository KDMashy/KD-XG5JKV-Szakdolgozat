import { Badge } from './badge.entity';
import { Project } from './project.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('project_badge')
export class ProjectBadge extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false })
    updated_at: number

    @ManyToOne(() => Project, project => project.badges)
    project: number

    @ManyToOne(() => Badge, badge => badge.project, {onDelete: 'CASCADE'})
    badge: number
}