import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealthCheck(): string {
        return `I'm still alive!`;
    }
}
