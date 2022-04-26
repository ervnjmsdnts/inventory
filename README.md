## Prerequisites

    * [Node.js](https://nodejs.org/en/)
    * [MySQL](https://www.mysql.com/)
    * [Git](https://git-scm.com/)

## Installation

    * Create a database called inventory_local:
        \`CREATE DATABASE inventory_local;\`

    * Go to schema.prisma file and edit the URL to point to your local database:
        \`mysql://USER:PASSWORD@localhost:3306/inventory_local;\`
        - Change USER to your MySQL username and PASSWORD to your MySQL password.

    * Clone the repository with the local branch only:
        \`git clone -b local --single-branch https://github.com/ervnjmsdnts/inventory.git\`

    * Install dependencies:
        \`npm install\`

    * Migrate prisma schema:
        \`prisma migrate dev\`

    * Run the application:
        \`npm run dev\`

    * Perform curl command to create an admin user:
        \`curl -d '{"firstName":"Admin","lastName":"Admin","username":"admin","password":"password","role":"ADMIN"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/auth/register\`

    * Login to the application and have fun!
