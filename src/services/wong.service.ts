import { cluster } from '../config/cluster';

export class WongService {
    static async getItemsbyURL(url: string): Promise<string> {
        return await cluster.execute(url, async ({ page, data }) => {
            
            console.log('cargo')
            await page.goto(data, {
                waitUntil: 'domcontentloaded',
                // Remove the timeout
                timeout: 0
            });
            console.log('cargo')
            
            return await page.screenshot();
        });
    }
}