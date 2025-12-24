import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/infrastructure/http/nestjs/modules/app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function serverNestJs() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Products CRUD Example")
    .setDescription("The products CRUD API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen(process.env.PORT || 3000);
}
