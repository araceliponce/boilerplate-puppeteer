import { cluster } from '../config/cluster';
import fs from 'fs';
export class WongService {
    static async getItemsbyURL(url: string): Promise<string> {
        return await cluster.execute(url, async ({ page, data }) => {
            await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
              );
            
            console.log('cargo')
            await page.goto(data, {
                waitUntil: 'domcontentloaded',
                timeout: 90000
            });
            console.log('cargo')
            console.log("🔄 Haciendo scroll para cargar productos...");
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
            const html = await page.content();
            console.log(html);
            fs.writeFileSync('pagina.html', html);

            console.log("✅ HTML guardado en 'pagina.html'");
            const info = await page.evaluate(() => {
                const products = [...document.querySelectorAll('.pod-details')].map(el=>{
                    return (el as HTMLElement)?.innerText
                })
                return products
            })
            console.log(info)
            return await page.screenshot()
        });
    }
}