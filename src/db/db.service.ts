import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { greenBright, yellowBright, cyanBright, redBright } from 'console-log-colors';
import { exit } from 'process';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    async onModuleDestroy() {
        await this.$disconnect();
        console.log(cyanBright("You're disconnected to Prisma."))
        exit(1);
    }

    async onModuleInit() {
        try {
            console.log(yellowBright("Connecting to Prisma... Please wait"))
            await this.$connect();
            console.log(greenBright("You're connected successfuly to mongodb using prisma"))
        } catch(err) {
            console.log(redBright(`${err}`))
            exit(1);
        }
    }
    
}
