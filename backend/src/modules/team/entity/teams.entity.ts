import { Team } from './team.entity';
import { Project } from './../../project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('teams')
export class Teams extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.team_member, {onDelete: 'CASCADE'})
    user: number

    @ManyToOne(() => Team, team => team.membership, {onDelete: 'CASCADE'})
    team: number
    
    @CreateDateColumn({ select: false })
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false })
    updated_at: number
}