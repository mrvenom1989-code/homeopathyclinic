const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDoctors() {
    console.log('Updating Doctor references in Appointments...');
    const appRes = await prisma.appointment.updateMany({
        where: { doctor: { contains: 'Chirag' } },
        data: { doctor: 'Dr. Mayank Raval' }
    });
    console.log(`Updated ${appRes.count} appointments.`);

    console.log('Updating Doctor references in Consultations...');
    const conRes = await prisma.consultation.updateMany({
        where: { doctorName: { contains: 'Chirag' } },
        data: { doctorName: 'Dr. Mayank Raval' }
    });
    console.log(`Updated ${conRes.count} consultations.`);
}

updateDoctors().catch(console.error).finally(() => prisma.$disconnect());
