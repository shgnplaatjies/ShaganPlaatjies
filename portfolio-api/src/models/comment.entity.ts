import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentStatus } from "./comment_status.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 144 })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => CommentStatus, (status) => status.comments)
  status: CommentStatus;

  constructor(content: string, user: User, status: CommentStatus) {
    this.content = content;
    this.user = user;
    this.status = status;
  }
}
