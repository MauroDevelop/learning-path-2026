import express, { Request, Response } from "express";
import { FakeMailClient } from "./infrastructure/external-apis/FakeMailClient.js";
import { NotificationService } from "./services/NotificationService.js";

const app = express();
app.use(express.json());

// DEPENDENCY INJECTION

// Create the client 
const mailClient = new FakeMailClient();

// Create the service
const notificationService = new NotificationService(mailClient);

app.post('/test-welcome', async (req: Request, res: Response) => {
    try {
        const {name, email} = req.body;

        if (!name  || !email){
            return res.status(400).json({error: 'Name and email are required'})
        }

        // Trigger welcome notification
        await notificationService.notifyWelcome(name, email);

        res.status(200).json({ message: `Welcome email sent successfully to ${name}`})


    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test the endpoint us POST: http://localhost:${PORT}/test-welcome`);
})