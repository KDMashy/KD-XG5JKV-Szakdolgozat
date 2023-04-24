import { Team } from "src/modules/team/entity/team.entity";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('project_teams')
export class ProjectTeams extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false })
    updated_at: number

    @ManyToOne(() => Project, project => project.teams, {onDelete: 'CASCADE'})
    project: number

    @ManyToOne(() => Team, badge => badge.projects, {onDelete: 'CASCADE'})
    team: number
}