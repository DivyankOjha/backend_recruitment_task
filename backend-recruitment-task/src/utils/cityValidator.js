function normalizeCityName(name) {
    if (!name || typeof name !== 'string') return '';

    // Trim spaces and normalize accents
    let cleaned = name.trim().normalize('NFC');

    // Capitalize first letter of each word
    cleaned = cleaned
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

    return cleaned;
}

function stripDiacritics(str) {
    // return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function looksLikeNonCity(name) {
    const lower = name.toLowerCase();

    const badKeywords = [
        'station',
        'power',
        'plant',
        'district',
        'zone',
        'area',
        'monitor',
        'facility',
        'plaza',
        'square'
    ];

    if (badKeywords.some(k => lower.includes(k))) return true;

    if (/\b[a-z]$/.test(lower) || /\d/.test(lower)) return true;

    if (name.length < 2 || name.length > 50) return true;

    return false;
}

function isValidCity(entry, seen = new Set()) {
    if (!entry || typeof entry !== 'object') return false;

    const {
        city, pollution, countryCode 
    } = entry;

    if (!city || pollution === null || !countryCode) return false;

    if (isNaN(Number(pollution))) return false;

    // Normalize + strip diacritics
    const normalizedCity = normalizeCityName(stripDiacritics(city));
    const cityKey = stripDiacritics(normalizedCity).toLowerCase(); // <-- key without diacritics

    // Auto-reject if looks like non-city
    if (looksLikeNonCity(cityKey)) return false;

    // Reject duplicates
    if (seen.has(cityKey)) return false;

    seen.add(cityKey);
    entry.city = normalizedCity;

    return true;
}

module.exports = isValidCity;
