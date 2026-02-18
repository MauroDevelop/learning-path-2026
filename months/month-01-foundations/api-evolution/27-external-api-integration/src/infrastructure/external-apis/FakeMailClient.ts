import { IMailProvider } from "../../core/interfaces/IMailProvider.js";

export class FakeMailClient implements IMailProvider {
    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        console.log(`[Email service] Conecting to send to ${to}`);
        // We simulate latency of 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`[Email Service] Private message: ${subject}`);
    };
};