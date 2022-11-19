import { Teams } from './teams.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('team')
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
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

    @Column({
        type: 'bigint'
    })
    team_creator: number

    @Column({
        type: 'tinyint'
    })
    team_only_creator: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => Teams, teams => teams.team, {onDelete: 'CASCADE'})
    project: Teams[]
}