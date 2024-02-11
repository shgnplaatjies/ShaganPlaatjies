import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class CommentStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 4 })
  commentStatusCode: string;

  @Column({ length: 25 })
  commentStatusName: string;

  @Column({ length: 144 })
  commentStatusCodeDesc: string;

  @OneToMany(() => Comment, (comment) => comment.status)
  comments!: Comment[];

  constructor(code: string, name: string, description: string) {
    this.commentStatusCode = code;
    this.commentStatusName = name;
    this.commentStatusCodeDesc = description;
  }
}
