import { Project } from './project.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tasks } from './tasks.entity';

@Entity('project_tasks')
export class ProjectTasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Project, project => project.tasks)
    project: number

    @ManyToOne(() => Tasks, task => task.project, {onDelete: 'CASCADE'})
    task: number

    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number
    
}