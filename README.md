# Student Mentoring Management

## Overview
Welcome to the Mentoring project! This project aims to facilitate mentoring relationships, providing a platform for mentors and mentees to connect and collaborate.
## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequities)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authors](#authors)
## Features
- **Mentor-Mentee Matching:** Connect with mentors or mentees based on shared interests and goals.
- **Progress Tracking:** Track the progress of mentoring relationships and set goals.
- **Responsive Design:** Device friendly user interactive website
## Getting Started
### Prerequities
- **Node.js:** Make sure you have Node.js installed on your system. You can download it from the official website: [Node.js](https://nodejs.org/)
- **MongoDB Server:** Ensure you have MongoDB Server installed. You can download it from the official website: [MongoDB](https://www.mongodb.com/)
- **.env variables:** Ensure you have .env variables setted up in the *backend* folder. You can set it's value from: [.env](#environmentvariables)
### Installation

#### Clone the repository
```bash
  git clone https://github.com/Kamran-imaz/mentoring.git
```

#### Install project with npm
```bash
  npm install mentoring
  cd mentoring
```

   
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in *backend* folder

`PORT`

`JWT_SECRET`

`DATABASE_URL`


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Authors

- [Ramzan Shareef](https://www.github.com/itisRamzan)
- [Kamran Imaz](https://www.github.com/Kamran-imaz)