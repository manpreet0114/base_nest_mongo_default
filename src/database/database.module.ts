import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema, UserSchema, SessionSchema } from '../../schemas/index';

import { config } from 'dotenv';
config();

const { DB_HOST, DB_PORT, DB_NAME} = process.env;

@Module({
    imports: [
        // MongooseModule.forRoot('mongodb://localhost:27017/nest_example'),
        MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`),
        MongooseModule.forFeature([
            { name: "admin", schema: AdminSchema },
            { name: "user", schema: UserSchema },
            { name: "session", schema: SessionSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }
