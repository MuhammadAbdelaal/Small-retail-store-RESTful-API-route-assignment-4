## Internal workflow of APIs: (Reference for learning purpose)

1. implement service -> repository.
2. implement controller -> service.
3. implement route -> controller.
4. link router to app.js
5. test.

- service: business logic, performs the required operation.
- repository: database queries.
- controller: handles HTTP requests and responses, validates data coming from request, and calls service to perform the required operation.
- route: forward the incoming request to its corresponding controller functions according to the url route.
