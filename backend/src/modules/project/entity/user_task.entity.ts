import { Tasks } from './tasks.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_tasks')
export class UserTasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.tasks)
    user: number

    @ManyToOne(() => Tasks, tasks => tasks.joined_user)
    task: number
}