import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { writeFile } from 'fs';
import { Logger } from '@nestjs/common';
import { program } from 'commander';

type BootstrapOptions =
  | { command: 'StartApp' }
  | { command: 'CreateOpenApiSpecs'; filepath: string };

const logger = new Logger(bootstrap.name);

async function printOpenApiSpecifications(
  document: OpenAPIObject,
  file: string,
) {
  const outputPath = join(__dirname, '..', file);
  writeFile(outputPath, JSON.stringify(document), () => {});
  logger.log(`OpenApiSpecs File generated in ${outputPath}`);
}

async function bootstrap(options: BootstrapOptions) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const openApiDocumentConfig = new DocumentBuilder()
    .setTitle('Generic App')
    .setDescription("The Generics App's API description")
    .setVersion('1.0')
    .addTag('generic-app')
    .build();

  const document = SwaggerModule.createDocument(app, openApiDocumentConfig);
  SwaggerModule.setup('api', app, document);

  if (options.command === 'StartApp') {
    await app.listen(process.env.PORT);
  } else if (options.command === 'CreateOpenApiSpecs') {
    printOpenApiSpecifications(document, options.filepath);
  }
}

program
  .command('create-open-api-specs')
  .description('Creates an OpenApi specification file')
  .argument('<filepath>', 'filepath')
  .action((filepath) => {
    bootstrap({
      command: 'CreateOpenApiSpecs',
      filepath,
    });
  });

program.action(() => {
  bootstrap({ command: 'StartApp' });
});

program.parse();
