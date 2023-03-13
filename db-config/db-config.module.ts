import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './dbconfig';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: () => typeOrmConfig()
        }),
    ],
    controllers: [],
    providers: [],
    exports: []

})
export class DbConfigModule { }