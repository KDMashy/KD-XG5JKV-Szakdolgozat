import { UserTasks } from './../../project/entity/user_task.entity';
import { Teams } from './../../team/entity/teams.entity';
import { Projects } from './../../project/entity/projects.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => Projects, projects => projects.user, {onDelete: 'CASCADE'})
    projects: Projects[]

    @OneToMany(() => Teams, teams => teams.user, {onDelete: 'CASCADE'})
    teams: Teams[]

    @OneToMany(() => UserTasks, userTasks => userTasks.user, {onDelete: 'CASCADE'})
    tasks: UserTasks[]
}