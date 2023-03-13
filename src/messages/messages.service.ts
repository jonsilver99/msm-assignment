import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/db-config/entities/message.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(private readonly httpService: HttpService) { }

    async handleNewMessageSubmission(params): Promise<Message> {
        const env = process.env

        let newMsg;
        try {
            // create db record
            newMsg = Message.create(params)
            newMsg = await newMsg.save()

            // create msg at twillio
            const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT}/Messages.json`

            const res = await this.httpService.post(url,
                new URLSearchParams({
                    Body: params.text,
                    To: params.phoneNum,
                    From: env.TWILIO_PHONE_NUM,
                }),
                { headers: { Authorization: 'Basic ' + btoa(`${env.TWILIO_ACCOUNT}:${env.TWILIO_TOKEN}`) } }
            ).toPromise()

            // update db record with returned data from twilio 
            newMsg.status = res.data.status
            newMsg.sid = res.data.sid
            newMsg.save()

            return newMsg

        } catch (error) {
            console.log(error)

            // On error - set db record's status to 'failed' 
            newMsg ? newMsg.status = 'failed' : null
            newMsg?.save()

            // respond with error
            throw error
        }
    }

    getAllMessages(skip, take): Promise<Message[]> {
        console.log(skip, take)
        return Message.find(({ skip, take, order: { date: "DESC" } } as FindManyOptions))
    }


}
