import { Request, Response, Next } from 'restify';
import { ScreenshotService } from '../services/screenshot.service';
import { WongService } from '../services/wong.service';

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
        const screenshot = await ScreenshotService.captureJS(url);
        res.send(200, { screenshot: `data:image/png;base64,${screenshot}` });;
    } catch (error) {
        res.send(500, { error: (error as Error).message });
    }
    return next();
};


export const wongScrapePage = async (req: Request, res: Response, next: Next) => {
    const page = req.query.page;
    console.log(page)
    if (!page) {
        res.send(400, { error: 'Page is required' });
        return next();
    }

    try {
        const data = await WongService.getItemsbyURL(`https://tottus.falabella.com.pe/tottus-pe/category/CATG11954/Bebidas-y-licores?sid=TT_WEB_HO_CAT_9_LICORES_20240415&subdomain=tottus&page=2&store=tottus`);
        res.send(200, data);;
    } catch (error) {
        console.log(error)
        res.send(500, { error: (error as Error).message });
    }
    return next();
};