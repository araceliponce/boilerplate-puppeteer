import { screenshotController,screenshotControllerJS,wongScrapePage } from '../controllers/screenshot.controller';

export const screenshotRoutes = (server: any) => {
    server.get('/screenshot', screenshotController);
    server.get('/screenshotjson', screenshotControllerJS);
    server.get('/wongscraping', wongScrapePage);
};
