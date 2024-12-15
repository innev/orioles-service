const { PrismaClient } = require('@prisma/client');
const apps = require('./data/json/apps.json');
const { user, languages, skills, softwares } = require('./data/json/skills.json');
const icons = require('./data/json/icons.json');
const videos = require('./data/json/video.json');
const gitmojis = require('./data/json/gitmojis.json');
const githubColors = require('./data/json/github-colors.json');

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
    console.log(`User ${userInfo.id} already exists!`);
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


  /*===================================ICONS==============================================*/
  await prisma.icon
    .createMany({
      data: icons.map(name => ({ name })),
      skipDuplicates: true
    })
    .then(() => console.log(`Icons import completed!`))
    .catch(error => console.error(`Failed to insert icons.`, error));

  await prisma.gitMojis
    .createMany({
      data: gitmojis,
      skipDuplicates: true
    })
    .then(() => console.log(`Gitmojis import completed!`))
    .catch(error => console.error(`Failed to insert gitmojis.`, error));

  await prisma.githubColor
    .createMany({
      data: Object.keys(githubColors).map(name => ({ name, color: githubColors[name] })),
      skipDuplicates: true
    })
    .then(() => console.log(`Github colors import completed!`))
    .catch(error => console.error(`Failed to insert github colors.`, error));


  /*===================================Video==============================================*/
  await prisma.video
    .createMany({
      data: videos,
      skipDuplicates: true
    })
    .then(() => console.log(`Videos import completed!`))
    .catch(error => console.error(`Failed to insert videos.`, error));


  console.log('JSON data import completed.');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());