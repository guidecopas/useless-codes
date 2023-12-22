import https from "https";
import fetch from "node-fetch";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export function options(...ext: any): object {
    return Object.assign({ agent: httpsAgent }, ...ext);
}

export async function fetchJson(url: string, ext?: any): Promise<any> {
    return await new Promise((resolve) => {
        fetch(url, options(ext)).then(async (res) => {
            if (res?.status !== 404) {
                const json = await res.json();
                resolve(json);
            }
        });
    });
}

export async function fetchText(url: string, ext?: any): Promise<any> {
    return await new Promise((resolve) => {
        fetch(url, options(ext)).then(async (res) => {
            if (res?.status !== 404) {
                const text = await res.text();
                resolve(text);
            }
        });
    });
}
export async function fetchBuffer(url: string, ext?: any): Promise<any> {
    return await new Promise((resolve) => {
        fetch(url, options(ext)).then(async (res) => {
            if (res?.status !== 404) {
                const buffer = await res.arrayBuffer();
                resolve(buffer);
            }
        });
    });
}
