import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Enable CORS with specific options
  app.enableCors({
    origin: '*', // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  });
  
  await app.listen(3000, '0.0.0.0');
  //await app.listen(3001);
}
bootstrap();
