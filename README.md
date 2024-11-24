<p align="center">
  <!-- <img width="140" src="https://cdn.jsdelivr.net/gh/innev/cdn@main/logo.png" />   -->
  <h2 align="center">Innev's Personal Website 🐬</h2>
  <p align="center">Lightweight full stack web application development</p>
</p>
<p align="center">
  <a href="https://github.com/innev/orioles-service/LICENSE">
    <img src="https://img.shields.io/github/license/innev/orioles-service"/> 
  </a>
  <a href="https://github.com/innev/orioles-service/network/members">
    <img src="https://img.shields.io/github/forks/innev/orioles-service"/> 
  </a>  
  <a href="https://github.com/innev/orioles-service/stargazers">
    <img src="https://img.shields.io/github/stars/innev/orioles-service"/> 
  </a>
    <a href="https://github.com/innev/orioles-service/issues">
    <img src="https://img.shields.io/github/issues/innev/orioles-service"/> 
  </a>
</p>
<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-2D333B?style=for-the-badge&logo=React&logoColor=61dafb"/> 
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=fff"/> 
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=Next.js&logoColor=fff"/> 
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=fff"/> 
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=fff"/> 
  </a>
</p>

## 🚀 Quick Start

First, clone the repo:

```
git clone https://github.com/innev/orioles-service.git
```

### ▼ Local Development

```shell
# install packages
pnpm i

# run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### ▼ Configuration

You can use the following environment variables to modify the application's configuration:

Name|Default|Description
--|--|--
MONGODB_API|`null`|MongoDB Atlas API 
MONGODB_API_KEY|`null`|MongoDB Atlas API Key
MONGODB_DATASOURCE|`null`|MongoDB Atlas DataSource
NEXT_PUBLIC_GA_MEASUREMENT_ID|`null`|Google Analytics Measurement ID

Custom user data saved in `./data`, you can change them to yourself.

### ▼ Deployment

#### Docker

- Build: `docker build -t orioles-service .`
- Run: `docker run -d -p 3000:3000 orioles-service`

#### Vercel

- New Project
- Add Your Github Account
- Import Your Git Repository

Then vercel will deploy your application automatically when you push your code.

#### Others

To learn more, see [Next.js Deployment](https://nextjs.org/docs/deployment).

<!-- ## 🧿 Activity -->
<!-- ![](https://repobeats.axiom.co/api/embed/a35b540b024b7b7aeac7ef2e9ec4340aab76cff3.svg) -->