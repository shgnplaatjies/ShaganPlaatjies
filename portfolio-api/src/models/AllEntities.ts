import { Comment } from "../models/comment.entity";
import { CommentStatus } from "../models/comment_status.entity";
import { User } from "../models/user.entity";
import { UserRole } from "../models/user_role.entity";
import { RolePrivilege } from "../models/user_role_privilege.entity.";

export const AppDataSourceEntities = [
  Comment,
  CommentStatus,
  UserRole,
  RolePrivilege,
  User,
];
