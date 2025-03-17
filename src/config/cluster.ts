import { Cluster } from 'puppeteer-cluster';

export let cluster: Cluster; // Definimos `cluster` fuera de la función para poder exportarlo

export const initCluster = async () => {
    cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 5,
        puppeteerOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
    });
};
