import { User } from 'src/modules/user/entity/user.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from './project.entity';

@Entity('projects')
export class Projects extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.projects)
    user: number

    @ManyToOne(() => Project, project => project.user_projects, {onDelete: 'CASCADE'})
    project: number

    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number
}