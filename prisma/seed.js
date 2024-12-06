const { PrismaClient } = require('@prisma/client');
const appsData = require('../data/json/apps.json');

const prisma = new PrismaClient();

const main = async () =>{
  console.log('Importing data from JSON...');

  // 遍历 JSON 数据并插入到数据库
  for (const [index, app] of appsData.entries()) {
    try {
      await prisma.app.create({
        data: {
          name: app.name,
          icon: app.icon,
          url: app.url,
          visiable: app?.visiable||false,
          requiresAuth: app?.requiresAuth||false,
          sort: index,
          // user: {
          //   connect: { id: 'cljlkvjy1000juzo9dz6drihh' }
          // },
        },
      });
      console.log(`Inserted app: ${app.name}`);
    } catch (error) {
      console.error(`Failed to insert app: ${app.name}`, error);
    }
  }
  console.log('Data import completed!');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());