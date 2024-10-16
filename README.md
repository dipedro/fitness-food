# Fitness Food API

This project is a nutritional REST API using the Open Food Facts database.

## Technologies Used in this Project

- NestJS Framework
- express (Route)
- pg (PostgreSQL lib)
- Swagger
- Node Streams
- CronJob (NestJS Schedule)
- Docker
- Jest (Tests)

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
| Tables     | Snake Case + Plural    | tables_names             |
| Columns    | Snake Case + Singular  | id, column_name          |
| Enum       | Snake Case + Uppercase | ENUM_NAME                |

## Running the Project

Before start, create a .env file or rename the .env.example in the root path.

To run the project, make sure you have Docker installed and running on your machine, then execute the following command in the project root directory:

```bash
docker-compose up
```

This command will build and start all the necessary containers for the API.


## Documentation

The diagram of how the Cron Jobs works:

![Cron Jobs Diagram](https://i.imgur.com/fPj5Gvo.png)

The documentation for this project can be accessed in two ways:

1. **API Documentation**: The API documentation can be found by accessing the `/docs` route of the running application. This will provide detailed information about the available endpoints, request/response formats, and any additional information related to the API.

2. **VS Code Extension**: To enhance your development experience, you can also download my custom extension for Visual Studio Code. This extension, called "NestJS Route List", provides a convenient way to view all the routes of your NestJS application directly within your code editor. You can download the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=PedroAzevedo.nestjs-route-list&ssr=false#overview).

Please note that both options are available to help you navigate and understand the project's documentation effectively.


## Test

```bash
# unit tests
$ npm run test
```


## Investigation Process

- I decided to use NestJS because is the framework that i work all day in my current job. I have some code that i can easylly reuse and give me a lot of time. Included the clean arch used with Ports and Adapters in the infrastructure layer.

- I decided to use postgres database besides mongodb because is so easy to configure in docker and the current version works like charm with json object. I want to write all the comunication with the database in Vanilla SQL too, without use ORMs. I thing this will give me some points with reviewers and this project don't has much eager load in database.

- To handle with the API files I used node streams, because I study about time ago, but never used in my projects. So I use this challenge to force myself work with streams and i'm very happy to know that is the best practice to read large files by demand and in my Proof of concept works very well. To remember like this works I rewatch this video: https://www.youtube.com/watch?v=6yvBVShDW0M and read the documentation.

- When I begin to insert the data in database i have some troubles, like: the product code sometimes has double quotes ("), some product name has apostrophes (') and i don't use prepared statement because i want to insert the data using bulk insert.

- Some business rules i'm a little confused, like the default status of a product when is imported, is draft or published? Another one is the part of insert just the 100 lines of each file, but in theory everyday the cronjob will try to insert the same list of products, if the inserted product already exist in database i need to update or just skip?

- In the beginning i threat the column code with a BigInt, but when i finish the load i saw that i lost the zeros when a barcode start with zeros. So i change the column type to VARCHAR(20) to handle with barcodes (EAN-13) or internal codes.

- For prevent errors in the next integration (i'm always getting the same first hundred products in each file), i add the clausule SKIP DUPLICATES in the bulk insert of products.

- I reuse some abstractions that i use in another project to handle with pagination in the /products route.

- I decided remove some properties in the update endpoint, because for me don't make sense update the created_at, code and etc of a product.

- I make a configuration to run the cron job every day at 2AM, because thinking in a use of this API in the early hours of the morning, usage, in theory, is lower.


>  This is a challenge by [Coodesh](https://coodesh.com/)
