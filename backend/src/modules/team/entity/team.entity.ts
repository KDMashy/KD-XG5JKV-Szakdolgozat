import { Teams } from './teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from 'src/modules/user/entity/user.entity';
import { ProjectTeams } from 'src/modules/project/entity/project_teams.entity';

@Entity('team')
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        unique: true
    })
    team_name: string

    @Column({
        type: 'varchar'
    })
    team_description: string

    @Column({
        type: 'varchar'
    })
    team_status: string

    @ManyToOne(() => User, user => user.created_teams)
    team_creator: number

    @Column({
        type: 'tinyint'
    })
    team_only_creator: number

    @CreateDateColumn({select: false})
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number

    @OneToMany(() => Teams, teams => teams.team, {onDelete: 'CASCADE'})
    membership: Teams[]

    @OneToMany(() => ProjectTeams, projTeams => projTeams.team, {onDelete: 'CASCADE'})
    projects: ProjectTeams[]
}