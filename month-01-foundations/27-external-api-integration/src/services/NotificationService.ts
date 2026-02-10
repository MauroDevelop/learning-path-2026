import { IMailProvider } from "../core/interfaces/IMailProvider.js"

export class NotificationService {
    constructor(private iMailProvider: IMailProvider) { };

    public async notifyWelcome(name: string, email: string): Promise<void> {
        const subject = `Welcome to Maro Crochet, ${name}`

        const body = `Hello, ${name}.
        Thank you for joining our community! We are preparing your next threads and patterns.
        You will soon receive updates from our catalog.`;

        await this.iMailProvider.sendEmail(email, subject, body);

        console.log(`[NotificationService] Welcome notification sent to ${email}`);
    };
};