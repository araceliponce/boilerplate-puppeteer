import { Cluster } from 'puppeteer-cluster';

export let cluster: Cluster; // Definimos `cluster` fuera de la función para poder exportarlo

export const initCluster = async () => {
    cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 5,
        puppeteerOptions: {
            headless: false,
            args: ['--no-sandbox', '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure','--disable-setuid-sandbox','--start-maximized'],
            timeout: 300000,
            defaultViewport: null
        },
    });
};
