import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { RolePrivilege } from "./user_role_privilege.entity.";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @OneToOne(() => RolePrivilege, (role) => role.id)
  role: RolePrivilege;

  constructor(user: User, role: RolePrivilege, userId: number, roleId: number) {
    this.user = user;
    this.role = role;
    this.userId = userId;
    this.roleId = roleId;
  }
}
