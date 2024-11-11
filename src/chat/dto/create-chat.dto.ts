import { IsOptional, IsString } from 'class-validator';

export class CreateChatDto {

    @IsString()
    @IsOptional()
    chatroom_id: string;
    
    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsOptional()
    client_id: string;

    @IsString()
    @IsOptional()
    professional_id: string;

}
