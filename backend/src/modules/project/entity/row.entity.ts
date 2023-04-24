import { Teams } from './../../team/entity/teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from 'src/modules/user/entity/user.entity';
import { Tasks } from './tasks.entity';
import { ProjectTeams } from './project_teams.entity';
import { Badge } from './badge.entity';
import { Project } from './project.entity';

@Entity('rows')
export class Row extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    row_name: string

    @Column({
        type: 'int'
    })
    row_count: number

    @CreateDateColumn({select: false})
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number

    @OneToMany(() => Tasks, tasks => tasks.row, {onDelete: 'CASCADE'})
    tasks: Tasks[]

    @ManyToOne(() => Project, project => project.rows, {onDelete: 'CASCADE'})
    project: number
}