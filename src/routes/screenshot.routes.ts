import { screenshotController,screenshotControllerJS } from '../controllers/screenshot.controller';

export const screenshotRoutes = (server: any) => {
    server.get('/screenshot', screenshotController);
    server.get('/screenshotjson', screenshotControllerJS);
};
