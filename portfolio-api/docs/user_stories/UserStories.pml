@startuml

' As a Guest (Not Authenticated)
User -> "REST API": Register new account
User -> "REST API": View list of users

' As an Authenticated User
User -> "REST API": View own profile details
User -> "REST API": Update own password

' As an Admin User
Admin -> "REST API": View list of all users
Admin -> "REST API": View details of a specific user
Admin -> "REST API": Update details of a specific user
Admin -> "REST API": Delete a user account

' As a User Creating Comments
User -> "REST API": Create a new comment
User -> "REST API": View a list of all comments
User -> "REST API": View a list of own comments

' As an Admin Managing Comments
Admin -> "REST API": Approve or Decline a comment
Admin -> "REST API": View a list of all comments

@enduml
