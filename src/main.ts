import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  }

  const options = new DocumentBuilder()
    .setTitle('Demo NestJs')
    .setDescription('The Description content')
    .setVersion('1.0')
    .build()

  const documnent = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, documnent)

  const serverConfig = config.get('server')

  const port = serverConfig.port || process.env.PORT || 3000
  await app.listen(port);
}
bootstrap();