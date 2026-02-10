import { IMailProvider } from "../../core/interfaces/IMailProvider.js";

export class FakeMailClient implements IMailProvider {
    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        console.log(`[Email service] Conecting to send to ${to}`);
        // Simulamos latencia de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`[Email Service] Mensaje enviado: ${subject}`);
    };
};