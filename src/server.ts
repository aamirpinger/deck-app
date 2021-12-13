import express, { Application } from 'express';

import { routes as deckRoutes } from './routes/deck_routes';
import { routes as errorRoute } from './routes/error_route';
import { DBConfig } from './configs/db_config';

export const runServer = () => {
  try {
    const { PORT, MONGO_URL, DB_NAME } = process.env;
    const app = configServer(`${MONGO_URL}${DB_NAME}`);

    app.listen(PORT, () => {
      console.info(`server is running on PORT ${PORT}`);
    });
  } catch (e) {
    let message = e;

    if (e instanceof Error) {
      message = e.message;
    }

    console.error(message);
  }
};

export const configServer = (mongoDbUrl: string): Application => {
  const app: Application = express();

  app.use(express.json());
  app.use([deckRoutes, errorRoute]);

  DBConfig.connectDB({ db: mongoDbUrl });

  return app;
};
