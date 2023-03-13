import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from 'src/db-config/entities/message.entity';
import { MessagesService } from './messages.service';
import { NewMessageSubDto } from './dtos';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    create(@Body() params: NewMessageSubDto): Promise<Message> {
        return this.messagesService.handleNewMessageSubmission(params);
    }

    @Get('/:skip/:take')
    getAll(@Param() { skip, take }): Promise<Message[]> {
        return this.messagesService.getAllMessages(skip, take);
    }
}
