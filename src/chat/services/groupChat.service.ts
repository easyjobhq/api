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
import { Client } from 'src/clients/entities/client.entity';
import { Professional } from 'src/professionals/entities/professional.entity';

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
  ) { }

  async getGroupChats(user_id: string) {

    let client, professional;

    try {
      client = await this.clientsService.findOne(user_id);
    } catch(error) {}
    try {
      professional = await this.professionalService.findOne(user_id);
    } catch(error) {}

    if (client) {

      return this.groupChatRepository.find({
        where: {
          client: client
        },
        relations: ['professional']
      })

    } else {
      return this.groupChatRepository.find({
        where: {
          professional: professional
        }, 
        relations: ['client']
      })
    }

  }

  async getMessages(id_client: string, id_professional: string): Promise<GroupChat> {

    try {

      const client = await this.clientsService.findOneNoRelationships(id_client);
      const professional = await this.professionalService.findOne(id_professional);

      const groupChat = await this.groupChatRepository.findOne({
        where: {
          client,
          professional
        },
        relations: ['chats', 'chats.client', 'chats.professional']
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

    } catch (error) {
      console.log(error)
    }


  }

  async sendMessage(chat: CreateChatDto): Promise<Chat> {

    let client: Client;
    let professional: Professional;

    if (chat.client_id) {
      client = await this.clientsService.findOneNoRelationships(chat.client_id);
    }
    if (chat.professional_id) {
      professional = await this.professionalService.findOneNoRelationships(chat.professional_id);
    }

    const groupChat = await this.groupChatRepository.findOne({ where: { id: chat.chatroom_id } });

    const newChat = this.chatRepository.create({
      groupChat: groupChat,
      message: chat.message,
      client: client,
      professional: professional

    })

    return await this.chatRepository.save(newChat);
  }


}
