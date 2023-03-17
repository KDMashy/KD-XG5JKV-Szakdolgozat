import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admin_sessions')
export class AdminSession extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    session_token: string

    @ManyToOne(() => User, user => user.sessions)
    user: number

    @Column({
        type: 'varchar'
    })
    valid_until: string

    @Column({
        type: 'varchar',
        default: 'true'
    })
    login: string
    
    @Column({
        type: 'varchar',
        default: 'false'
    })
    has_admin_login: string
    
    @CreateDateColumn({select: false})
    created_at: string

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number
}