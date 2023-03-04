import { UserTasks } from './../../project/entity/user_task.entity';
import { Teams } from './../../team/entity/teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from 'src/modules/project/entity/project.entity';
import { Team } from 'src/modules/team/entity/team.entity';
import { Tasks } from 'src/modules/project/entity/tasks.entity';
import { Badge } from 'src/modules/project/entity/badge.entity';
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    @Column({
        type: 'varchar',
    })
    first_name: string;

    @Column({
        type: 'varchar',
    })
    last_name: string;

    @Column({
        type: 'varchar',
    })
    status: string

    @CreateDateColumn({select: false})
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number

    @OneToMany(() => Project, project => project.project_creator, {onDelete: 'CASCADE'})
    created_projects: Project[]

    @OneToMany(() => Teams, teams => teams.user, {onDelete: 'CASCADE'})
    team_member: Teams[]

    @OneToMany(() => Team, team => team.team_creator, {onDelete: 'CASCADE'})
    created_teams: Team[]

    @OneToMany(() => UserTasks, userTasks => userTasks.user, {onDelete: 'CASCADE'})
    tasks: UserTasks[]

    @OneToMany(() => Tasks, tasks => tasks.task_creator)
    created_tasks: Tasks[]

    @OneToMany(() => Badge, badge => badge.badge_creator)
    created_badges: Badge[]
}