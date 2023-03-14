import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { Message } from './entities/message.entity';

export const typeOrmConfig = () => {
    return {
        type: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        // entities: [`${__dirname}/entities/*.entity.js`], // for use with entities as decorated models
        entities: [Message], // for use with entities as decorated models
        synchronize: true,
        extra: {
            trustServerCertificate: true
        }
    } as SqlServerConnectionOptions
}