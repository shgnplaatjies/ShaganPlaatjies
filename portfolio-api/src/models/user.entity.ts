import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { UserRole } from "./user_role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  azureId: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  roles!: UserRole;

  @OneToMany(() => Comment, (comment) => comment.status)
  comments: Comment[];

  constructor(
    azureId: string,
    userName: string,
    email: string,
    comments: Comment[]
  ) {
    this.azureId = azureId;
    this.userName = userName;
    this.userName = userName;
    this.email = email;
    this.comments = comments;
  }
}
