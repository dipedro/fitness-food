# Fitness Food API

This project is a nutritional REST API using the Open Food Facts database.

## Commit Patterns

Commits needs to be semantics and follow the pattern below: 

- `feat`: Used when introducing a new feature or functionality.
- `fix`: Used when fixing a bug or resolving an issue.
- `docs`: Used for documentation-related changes.
- `style`: Used for code style changes, such as formatting, indentation, or whitespace. 
- `refac`: Used when refactoring code without changing its external behavior.
- `test`: Used for adding or modifying tests.
- `chore`: Used for general maintenance tasks or tooling changes.
- `build`: Used when change build files

## Nomenclature Patterns

| Standard   | Definition             | Example                  |
| ---------- | ---------------------- | -----------------------  |
| Directories| LowerCase + Plural     | dtos, services, entities |
| Files      | Kebab Case + Singular  | file-name.dto.ts         |
| Entities   | Pascal Case + Singular | EntityName               |
| Tables     | Snake Case + Plural    | tables_names                    |
| Columns    | Snake Case + Singular  | id, column_name          |
| Enum       | Snake Case + Uppercase | ENUM_NAME                |

## Running the Project

Before start, create a .env file or rename the .env.example in the root path.

To run the project, make sure you have Docker installed and running on your machine, then execute the following command in the project root directory:

```bash
docker-compose up
```

This command will build and start all the necessary containers for the API.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

>  This is a challenge by [Coodesh](https://coodesh.com/)
