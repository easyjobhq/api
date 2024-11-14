import { Controller, Get, Param } from "@nestjs/common";
import { GroupChatService } from "../services/groupChat.service";

@Controller('chats')
export class ChatsController {
  constructor(private readonly groupChatService : GroupChatService) {}

  @Get("group_chats/:user_id")
  getGroupChats(@Param('user_id') client_id: string) {
    return this.groupChatService.getGroupChats(client_id)
  }

  
  @Get(":client_id/:professional_id")
  create( @Param('client_id') client_id: string, @Param('professional_id') professional_id: string ) {
    return this.groupChatService.getMessages(client_id, professional_id);
  }

}
