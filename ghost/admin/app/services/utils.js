import Service from '@ember/service';

export default class UtilsService extends Service {
    downloadFile(url) {
        let iframe = document.getElementById('iframeDownload');

        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'iframeDownload';
            iframe.style.display = 'none';
            document.body.append(iframe);
        }

        iframe.setAttribute('src', url);
    }

    /**
     * Remove tracking parameters from a URL
     * @param {string} url 
     * @param {boolean} [display] Set to true to remove protocol and hash from the URL
     * @returns 
     */
    cleanTrackedUrl(url, display = false) {
        // Remove our own querystring parameters and protocol
        const removeParams = ['rel', 'attribution_id', 'attribution_type'];
        const urlObj = new URL(url);
        for (const param of removeParams) {
            urlObj.searchParams.delete(param);
        }
        if (!display) {
            return urlObj.toString();
        }
        // Return URL without protocol
        return urlObj.host + (urlObj.pathname === '/' && !urlObj.search ? '' : urlObj.pathname) + (urlObj.search ? urlObj.search : '');
    }
}
