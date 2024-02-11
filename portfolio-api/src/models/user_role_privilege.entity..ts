import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RolePrivilege {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  privilegeName: string;

  @Column()
  description: string;

  constructor(privilegeName: string, description: string) {
    this.privilegeName = privilegeName;
    this.description = description;
  }
}
