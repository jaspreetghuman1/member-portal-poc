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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});