import { program } from 'commander';
import { join } from 'path';
import { generateApi } from 'swagger-typescript-api';

program
  .requiredOption('--swaggerfile <string>', 'Open api specifications file')
  .requiredOption('--outdir <string>', 'Output directory')
  .requiredOption(
    '--filename <string>',
    'Filename of the newly generated client',
  )
  .action((options) => {
    console.log(options);

    generateApi({
      name: options.filename,
      output: join(process.cwd(), options.outdir),
      input: join(process.cwd(), options.swaggerfile),
      httpClientType: 'fetch',
    });
  });

program.parse();
