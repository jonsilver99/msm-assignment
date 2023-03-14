import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DbConfigModule } from 'src/db-config/db-config.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../', 'client/build'),
        }),
        HttpModule,
        DbConfigModule
    ],
    controllers: [AppController, MessagesController],
    providers: [MessagesService],
})
export class AppModule { }
