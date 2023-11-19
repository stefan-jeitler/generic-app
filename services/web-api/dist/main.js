"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const commander_1 = require("commander");
const config_1 = require("@nestjs/config");
const logger = new common_1.Logger(bootstrap.name);
async function printOpenApiSpecifications(document, file) {
    const outputPath = (0, path_1.join)(__dirname, '..', file);
    (0, fs_1.writeFile)(outputPath, JSON.stringify(document), () => { });
    logger.log(`OpenApiSpecs File generated in ${outputPath}`);
}
async function bootstrap(options) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const openApiDocumentConfig = new swagger_1.DocumentBuilder()
        .setTitle('Generic App')
        .setDescription("The Generics App's API description")
        .setVersion('0.0.0')
        .addTag('generic-app')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, openApiDocumentConfig);
    swagger_1.SwaggerModule.setup('', app, document);
    if (options.command === 'StartApp') {
        const port = config.get('PORT', 3030);
        const environment = config.get('NODE_ENV');
        logger.log(`Run app on port ${port} in ${environment} environment`);
        await app.listen(port);
    }
    else if (options.command === 'CreateOpenApiSpecs') {
        printOpenApiSpecifications(document, options.filepath);
    }
}
commander_1.program
    .command('create-open-api-specs')
    .description('Creates an OpenApi specification file')
    .argument('<filepath>', 'filepath')
    .action((filepath) => {
    bootstrap({
        command: 'CreateOpenApiSpecs',
        filepath,
    });
});
commander_1.program.action(() => {
    bootstrap({ command: 'StartApp' });
});
commander_1.program.parse();
//# sourceMappingURL=main.js.map