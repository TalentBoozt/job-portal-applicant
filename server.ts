import 'zone.js/node';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';

const distFolder = join(process.cwd(), 'dist/client/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? join(distFolder, 'index.original.html')
  : join(distFolder, 'index.html');

// Use dynamic import for ESM compatibility
const { AppServerModule } = await import('./src/main.server.js');

const app = express();
const commonEngine = new CommonEngine();

app.set('view engine', 'html');
app.set('views', distFolder);

// Serve static files
app.use(express.static(distFolder, { maxAge: '1y' }));

// Angular SSR handler
app.get('*', async (req, res, next) => {
  try {
    const html = await commonEngine.render({
      bootstrap: AppServerModule,
      documentFilePath: indexHtml,
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      publicPath: distFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export default app;
