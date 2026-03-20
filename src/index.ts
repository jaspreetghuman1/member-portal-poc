import express from 'express';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/members/:id', async (req, res) => {
    const memberId = Number(req.params.id);

    if (isNaN(memberId)) {
        return res.status(400).json({
            error: 'Member id must be a number',
        });
    }

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        return res.status(404).json({
            error: 'Member not found',
        });
    }

    return res.json({
        data: member,
    });
});

app.post('/events/:eventId/register', async (req, res) => {
    const eventId = Number(req.params.eventId);
    const memberId = Number(req.body.memberId);

    if (isNaN(eventId)) {
        return res.status(400).json({
            error: 'Event id must be a number',
        });
    }

    if (!req.body.memberId || isNaN(memberId)) {
        return res.status(400).json({
            error: 'memberId is required and must be a number',
        });
    }

    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { registrations: true },
    });

    if (!event) {
        return res.status(404).json({
            error: 'Event not found',
        });
    }

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        return res.status(404).json({
            error: 'Member not found',
        });
    }

    if (member.membershipStatus !== 'ACTIVE') {
        return res.status(400).json({
            error: 'Only active members can register for events',
        });
    }

    if (event.registrations.length >= event.capacity) {
        return res.status(400).json({
            error: 'Event is already full',
        });
    }

    const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
            memberId_eventId: {
                memberId,
                eventId,
            },
        },
    });

    if (existingRegistration) {
        return res.status(400).json({
            error: 'Member is already registered for this event',
        });
    }

    const registration = await prisma.eventRegistration.create({
        data: {
            memberId,
            eventId,
        },
    });

    return res.status(201).json({
        message: 'Registration successful',
        data: registration,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});