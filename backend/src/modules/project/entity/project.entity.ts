import { Teams } from './../../team/entity/teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from 'src/modules/user/entity/user.entity';
import { Tasks } from './tasks.entity';
import { ProjectTeams } from './project_teams.entity';
import { Badge } from './badge.entity';

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

    @ManyToOne(() => User, user => user.created_projects)
    project_creator: number

    @Column({
        type: 'tinyint'
    })
    project_only_creator: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => Tasks, tasks => tasks.project, {onDelete: 'CASCADE'})
    tasks: Tasks[]

    @OneToMany(() => Badge, badge => badge.project, {onDelete: 'CASCADE'})
    badges: Badge[]

    @OneToMany(() => ProjectTeams, projTeams => projTeams.project, {onDelete: 'CASCADE'})
    teams: ProjectTeams[]
}