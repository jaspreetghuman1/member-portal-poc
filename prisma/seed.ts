import 'dotenv/config';
import { PrismaClient, MembershipStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create members
    const member1 = await prisma.member.create({
        data: {
            fullName: "Jaspreet Singh",
            email: "jaspreetghuman1@yahoo.com",
            membershipStatus: MembershipStatus.ACTIVE,
            subscriptionExpiresAt: new Date("2026-06-15"),
        },
    });

    const member2 = await prisma.member.create({
        data: {
            fullName: "James Mallorie",
            email: "James@poc.com",
            membershipStatus: MembershipStatus.EXPIRED,
            subscriptionExpiresAt: new Date("2023-01-01"),
        },
    });

    // Create events
    const event1 = await prisma.event.create({
        data: {
            title: "Tech Meetup",
            description: "Monthly tech meetup",
            eventDate: new Date("2026-04-10"),
            capacity: 2,
        },
    });

    const event2 = await prisma.event.create({
        data: {
            title: "Tech Workshop",
            description: "Live coding workshop",
            eventDate: new Date("2026-05-01"),
            capacity: 1,
        },
    });

    console.log("Seed data created");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });