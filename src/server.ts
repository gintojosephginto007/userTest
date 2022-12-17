import express, { Express, Request, Response } from 'express';
import * as path from 'path';
// import { globalLogger, serverLogger } from './common/logger';
import error from './common/middleware/error';
import config from './config/config';
import router from './routes';
export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app
    this.initApp()
  }

  public start(port: number): void {
    // this.app.listen(port, () => serverLogger.info(`server started at http://localhost:${port}`));
  }

  protected initApp() {
    process.on('uncaughtException', (err: Error) => {
      // globalLogger.error('Uncaught Exception at:' + err.message, err)
      process.exit(1)
    })

    process.on('unhandledRejection', (reason, promise) => {
      // globalLogger.error('Unhandled Rejection at:' + reason)
      process.exit(1)
    })
    this.app.disable('x-powered-by')
    this.app.use('', router)

    /* this.app.get('/', (req, res) => {
      res.status(200).send({ message: 'Welcome to our restful API' })
    }) */

    /* this.app.get("/api", (req: Request, res: Response): void => {
          res.send("You have reached the API!");
      }); */

    this.app.get('*', (req: Request, res: Response): void => {
      res.sendFile(path.resolve('./') + '/static/index.html')
    })

    this.app.use(error)
  }
}
