import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupChat } from "./entities/groupChat.entity";
import { Chat } from "./entities/chat.entity";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/auth/entities/user.entity";
import { ChatsController } from "./controller/chat.controller";
import { GroupChatService } from "./services/groupChat.service";
import { ClientsService } from "src/clients/clients.service";
import { ProfessionalsService } from "src/professionals/professionals.service";
import { S3Service } from "src/s3/s3.service";
import { ClientsModule } from "src/clients/clients.module";
import { ProfessionalsModule } from "src/professionals/professionals.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([GroupChat]),
        TypeOrmModule.forFeature([Chat]),
        ClientsModule, 
        ProfessionalsModule
    ],
    controllers: [ChatsController],
    providers: [ChatGateway, GroupChatService], 
    
})
export class ChatModule {}