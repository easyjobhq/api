import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { S3Service } from 'src/s3/s3.service';
import { Express } from 'express';
import { GroupChat } from '../entities/groupChat.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ProfessionalsService } from 'src/professionals/professionals.service';
import { Chat } from '../entities/chat.entity';
import { CreateChatDto } from '../dto/create-chat.dto';

@Injectable()
export class GroupChatService {

  //private readonly logger = new Logger('ClientsService');

  constructor(
    @InjectRepository(GroupChat)
    private readonly groupChatRepository: Repository<GroupChat>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly clientsService: ClientsService,
    private readonly professionalService: ProfessionalsService 
  ) {}

  async getMessages(id_client: string, id_professional: string ): Promise<GroupChat> {

    try {

        const client = await this.clientsService.findOne(id_client);
        const professional = await this.professionalService.findOne(id_professional);

        const groupChat = await this.groupChatRepository.findOne({
            where: {
                client, 
                professional
            }, 
            relations: ['chats']
        })

        if (!groupChat) {

            const newGroupChat = this.groupChatRepository.create({
                name: "Group chat",
                client: client, 
                professional: professional
            });

            return await this.groupChatRepository.save(newGroupChat);

          } else { 
            return groupChat
          }
      
    }catch(error) {
      console.log(error)
    }

    
  }

  async sendMessage(chat:CreateChatDto): Promise<Chat> {

    const client = await this.clientsService.findOne(chat.client_id);
    const professional = await this.professionalService.findOne(chat.professional_id);


    const groupChat = await this.groupChatRepository.findOne({ where: {id: chat.chatroom_id} });  

    const newChat  = this.chatRepository.create({
        groupChat: groupChat, 
        message: chat.message,
        client: client, 
        professional: professional
        
    })

    return await this.chatRepository.save(newChat);
  }


}
