import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import routes from './routes';
import { setupSwagger } from './swagger';

async function bootstrap() {

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  setupSwagger(app);
  app.use('/', routes);
  app.get('/health', (_, res) => res.json({ status: 'ok' }));
  app.listen(env.PORT, () => {
    console.log(`Fusermint landing-page server running on port ${env.PORT}. Swagger at /docs`);
  });
}
bootstrap().catch((e) => {
  console.error('Failed to start server', e);
  process.exit(1);
});
