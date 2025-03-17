import { Request, Response, Next } from 'restify';
import { ScreenshotService } from '../services/screenshot.service';

export const screenshotController = async (req: Request, res: Response, next: Next) => {
    const url = req.query.url;
    console.log(url)
    if (!url) {
        res.send(400, { error: 'URL is required' });
        return next();
    }

    try {
        const screenshot = await ScreenshotService.capture(url);
        res.setHeader('Content-Type', 'image/png');
        res.writeHead(200);

        // Envía la imagen directamente
        res.end(screenshot);
    } catch (error) {
        res.send(500, { error: (error as Error).message });
    }
    return next();
};


export const screenshotControllerJS = async (req: Request, res: Response, next: Next) => {
    const url = req.query.url;
    console.log(url)
    if (!url) {
        res.send(400, { error: 'URL is required' });
        return next();
    }

    try {
        const screenshot = await ScreenshotService.captureEncode(url);
        res.send(200, { screenshot: `data:image/png;base64,${screenshot}` });;
    } catch (error) {
        res.send(500, { error: (error as Error).message });
    }
    return next();
};