import { UserTasks } from './../../project/entity/user_task.entity';
import { Teams } from './../../team/entity/teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from 'src/modules/project/entity/project.entity';
import { Team } from 'src/modules/team/entity/team.entity';
import { Tasks } from 'src/modules/project/entity/tasks.entity';
import { Badge } from 'src/modules/project/entity/badge.entity';
import { AdminSession } from 'src/modules/admin/entity/admin_session.entity';
import { Channel } from 'src/modules/chat/entity/channel.entity';
import { Message } from 'src/modules/chat/entity/message.entity';
import { Friend } from './friends.entity';
import { Notification } from 'src/modules/chat/entity/notification.entity';
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
        select: false,
        default: 'user'
    })
    group: string

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
    status: string;

    @Column({
        type: "varchar",
        default: "false",
        select: false
    })
    active_notifications: string;

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

    @OneToMany(() => AdminSession, session => session.user)
    sessions: AdminSession[]

    @OneToMany(() => Channel, channel => channel.first_user, {onDelete: 'CASCADE'})
    sender: Channel[]

    @OneToMany(() => Channel, channel => channel.second_user, {onDelete: 'CASCADE'})
    receiver: Channel[]

    @OneToMany(() => Message, message => message.sender, {onDelete: 'CASCADE'})
    messages: Message[]

    @OneToMany(() => Friend, friend => friend.first_user, {onDelete: 'CASCADE'})
    friend_one: Friend[]

    @OneToMany(() => Friend, friend => friend.second_user, {onDelete: 'CASCADE'})
    friend_two: Friend[]

    @OneToMany(() => Notification, notification => notification.user, {onDelete: 'CASCADE'})
    notifications: Notification[]
}