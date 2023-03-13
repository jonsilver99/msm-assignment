import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }

    // @Post('messages')
    // create(@Body() params: NewMessageSubDto): Promise<Message> {
    //     console.log(params)
    //     return this.appService.handleNewMessageSubmission(params);
    // }

    // @Get('messages/:skip/:take')
    // getAll(@Param() { skip, take }): Promise<Message[]> {
    //     return this.appService.getAllMessages(skip, take);
    // }
}
