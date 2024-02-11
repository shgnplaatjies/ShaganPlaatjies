@startuml

entity "users" {
  + id: int <<PK, autoincrement>>
  username: varchar(144) <<Unique>>
  password: varchar
  email: varchar <<Unique>>
}

entity "role_privileges" {
  + id: int <<PK, autoincrement>>
  name: varchar(50) <<Unique>>
  description: varchar(255)
}

entity "user_roles" {
  userId: int <<FK, users.id>>
  roleId: int <<FK, role_privileges.id>>
}

entity "comments" {
  + id: int <<PK, autoincrement>>
  content: varchar(144)
  userId: int <<FK, users.id>>
  comment_status: varchar <<FK, comment_statuses.commentStatusCode>>
}

entity "comment_statuses" {
  + id: int <<PK, autoincrement>>
  commentStatusCode: varchar(4)
  commentStatusName: varchar(25)
  commentStatusCodeDesc: varchar(144)
}

users ||--|| user_roles
users |o--o{ comments
user_roles }|--|{ role_privileges
comments }|--|| comment_statuses

@enduml
