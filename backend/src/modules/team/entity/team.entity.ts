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

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: number

    @OneToMany(() => Teams, teams => teams.team, {onDelete: 'CASCADE'})
    project: Teams[]
}