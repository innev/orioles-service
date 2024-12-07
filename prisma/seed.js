const { PrismaClient } = require('@prisma/client');
const apps = require('../data/json/apps.json');
const { user, languages, skills, softwares } = require('../data/json/home.json');

const prisma = new PrismaClient();

const main = async () => {
  console.log('Importing data from JSON...');

  // Create
  const email = "zhaozhao200295@gmail.com";
  let userInfo = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!userInfo) {
    userInfo = await prisma.user
      .create({
        data: {
          name: "Innev",
          email,
          nickname: user.nickname,
          avatar: user.avatar,
          bio: user.bio,
          UserBrand: { create: user.brands }
        }
      })
      .then(() => {
        console.log(`User completed!`);
        return prisma.user.findUnique({ where: { email }, select: { id: true } });
      })
      .catch(error => console.error('Failed to insert user:', error));
  } else {
    console.log(`User ${userInfo.id} already exists!`)
  }
  

  // Create many app
  await prisma.app
    .createMany({
      data: apps.map(app => ({
        ...app,
        user: userInfo.id
        // User: { connect: { email } }
      })),
      skipDuplicates: true
    })
    .then(() => console.log(`App import completed!`))
    .catch(error => console.error(`Failed to insert app.`, error));

  // Create many skills
  await prisma.skills
    .createMany({
      data: languages.children.map(item => ({
        ...item,
        type: 'language',
        typeName: languages.name,
        user: userInfo.id
        // User: { connect: { email } }
      })),
      skipDuplicates: true
    })
    .then(() => console.log(`Language Skills import completed!`))
    .catch(error => console.error(`Failed to insert language skills.`, error));

  await prisma.skills
    .createMany({
      data: skills.children.map(item => ({
        ...item,
        type: 'technical',
        typeName: skills.name,
        user: userInfo.id
        // User: { connect: { email } }
      })),
      skipDuplicates: true
    })
    .then(() => console.log(`Technical Skills import completed!`))
    .catch(error => console.error(`Failed to insert technical skills.`, error));

  await prisma.skills
    .createMany({
      data: softwares.children.map(item => ({
        ...item,
        type: 'software',
        typeName: softwares.name,
        user: userInfo.id
        // User: { connect: { email } }
      })),
      skipDuplicates: true
    })
    .then(() => console.log(`Software Skills import completed!`))
    .catch(error => console.error(`Failed to insert software skills.`, error));

  console.log('JSON data import completed.');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());