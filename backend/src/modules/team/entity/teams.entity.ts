import { Team } from './team.entity';
import { Project } from './../../project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('teams')
export class Teams extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false })
    updated_at: number

    @ManyToOne(() => User, user => user.teams)
    user: number

    @ManyToOne(() => Project, project => project.team)
    project: number

    @ManyToOne(() => Team, team => team.project, {onDelete: 'CASCADE'})
    team: number
}