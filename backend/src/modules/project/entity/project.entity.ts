import { Teams } from './../../team/entity/teams.entity';
import { ProjectTasks } from './project_tasks.entity';
import { Projects } from './projects.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectBadge } from './project_badge.entity';

@Entity('project')
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    project_name: string

    @Column({
        type: 'varchar'
    })
    project_description: string

    @Column({
        type: 'varchar'
    })
    project_img_url: string

    @Column({
        type: 'varchar'
    })
    project_status: string

    @Column({
        type: 'bigint'
    })
    project_creator: number

    @Column({
        type: 'tinyint'
    })
    project_only_creator: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => Projects, projects => projects.project, {onDelete: 'CASCADE'})
    user_projects: Projects[]

    @OneToMany(() => ProjectTasks, projTasks => projTasks.project, {onDelete: 'CASCADE'})
    tasks: ProjectTasks[]

    @OneToMany(() => ProjectBadge, projBadge => projBadge.project, {onDelete: 'CASCADE'})
    badges: ProjectBadge[]

    @OneToMany(() => Teams, teams => teams.project, {onDelete: 'CASCADE'})
    team: Teams[]
}