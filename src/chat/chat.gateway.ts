import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from "./dto/create-chat.dto";
import { GroupChatService } from "./services/groupChat.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect { 
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly groupChatService: GroupChatService,  // Injecting GroupChatService
    ) {}

    handleConnection(client: Socket) {
        //console.log(`Client connected: ${client.id} `);
    }

    handleDisconnect(client: Socket) {
        //console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() createChatDto: CreateChatDto){
        //console.log("AAAAAAAAaaa", createChatDto)
        const message = await this.groupChatService.sendMessage(createChatDto);
        this.server.emit(message.groupChat.id, message)
    }
}