import { setupSwagger } from './swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  setupSwagger(app);
  app.use(morgan('tiny'));
  await app.listen(PORT);
}
bootstrap();
