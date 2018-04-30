export function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function underscoreLowercase(text) {
    return text.replace(/ /g, '_').toLowerCase();
}

export function getApiHost() {
    return process.env.NODE_ENV === 'production' ? 'https://wanderermap.com' : 'http://localhost:3000';
}
