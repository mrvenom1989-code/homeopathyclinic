const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateUsers() {
    console.log('Updating Doctor references in Users...');
    const res = await prisma.user.updateMany({
        where: { name: { contains: 'Chirag' } },
        data: { name: 'Dr. Mayank Raval', email: 'doctor@clinic.com' }
    });
    console.log(`Updated ${res.count} users.`);
}

updateUsers().catch(console.error).finally(() => prisma.$disconnect());
