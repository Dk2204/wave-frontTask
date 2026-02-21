import axios from 'axios';

const API_KEY = 'd6b1a63727159274e0d83042713ee999';

async function finalProbe() {
    console.log('--- FINAL PROBE ---');

    // Try account-api with x-api-key
    try {
        const r = await axios.post('https://account-api.intellizence.com/api/company-news/user/Trial', {}, {
            headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' }
        });
        console.log('Account API with x-api-key:', r.data.news?.length || 0);
    } catch (e) {
        console.log('Account API with x-api-key FAILED:', e.message);
    }

    // Try account-api with Bearer = API_KEY
    try {
        const r = await axios.post('https://account-api.intellizence.com/api/company-news/user/Trial', {}, {
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
        });
        console.log('Account API with Bearer=Key:', r.data.news?.length || 0);
    } catch (e) {
        console.log('Account API with Bearer=Key FAILED:', e.message);
    }
}

finalProbe();
