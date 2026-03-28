/**
 * Wilayah API Service - Indonesian Regions Data
 * 
 * Multiple API sources with fallback mechanism for maximum reliability.
 * Cached data to reduce API calls and improve performance.
 */

// API Sources (ordered by priority)
const API_SOURCES = [
  {
    name: 'emsifa',
    baseUrl: 'https://raw.githubusercontent.com/emsifa/api-wilayah-indonesia/master',
    format: 'github'
  },
  {
    name: 'kangpian',
    baseUrl: 'https://kangpian.github.io/api-wilayah-indonesia/api',
    format: 'kangpian'
  }
];

// Cache storage
const cache = {
  provinsi: null,
  kabupaten: {},
  kecamatan: {},
  kelurahan: {}
};

// Cache expiry time (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000;

export const wilayahApi = {
  /**
   * Get all provinces with caching
   * @returns {Promise<Array>} List of provinces
   */
  getProvinsi: async () => {
    // Check cache first
    if (cache.provinsi && (Date.now() - cache.provinsi.timestamp) < CACHE_EXPIRY) {
      return cache.provinsi.data;
    }

    // Try each API source
    for (const source of API_SOURCES) {
      try {
        const response = await fetch(`${source.baseUrl}/provinces.json`);
        
        if (!response.ok) {
          continue; // Try next source
        }

        const data = await response.json();
        const formatted = formatProvinsi(data, source.format);
        
        // Cache the result
        cache.provinsi = {
          data: formatted,
          timestamp: Date.now()
        };
        
        return formatted;
      } catch (error) {
        console.warn(`[${source.name}] API failed:`, error.message);
        continue;
      }
    }

    // All APIs failed, return static data
    console.warn('All APIs failed, using static data');
    return getStaticProvinsi();
  },

  /**
   * Get regencies by province ID
   * @param {string} provinsiId - Province ID
   * @returns {Promise<Array>} List of regencies
   */
  getKabupaten: async (provinsiId) => {
    // Check cache
    if (cache.kabupaten[provinsiId] && 
        (Date.now() - cache.kabupaten[provinsiId].timestamp) < CACHE_EXPIRY) {
      return cache.kabupaten[provinsiId].data;
    }

    for (const source of API_SOURCES) {
      try {
        const response = await fetch(`${source.baseUrl}/regencies/${provinsiId}.json`);
        
        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const formatted = formatKabupaten(data, source.format);
        
        cache.kabupaten[provinsiId] = {
          data: formatted,
          timestamp: Date.now()
        };
        
        return formatted;
      } catch (error) {
        console.warn(`[${source.name}] API failed:`, error.message);
        continue;
      }
    }

    return [];
  },

  /**
   * Get districts by regency ID
   * @param {string} kabupatenId - Regency ID
   * @returns {Promise<Array>} List of districts
   */
  getKecamatan: async (kabupatenId) => {
    // Check cache
    if (cache.kecamatan[kabupatenId] && 
        (Date.now() - cache.kecamatan[kabupatenId].timestamp) < CACHE_EXPIRY) {
      return cache.kecamatan[kabupatenId].data;
    }

    for (const source of API_SOURCES) {
      try {
        const response = await fetch(`${source.baseUrl}/districts/${kabupatenId}.json`);
        
        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const formatted = formatKecamatan(data, source.format);
        
        cache.kecamatan[kabupatenId] = {
          data: formatted,
          timestamp: Date.now()
        };
        
        return formatted;
      } catch (error) {
        console.warn(`[${source.name}] API failed:`, error.message);
        continue;
      }
    }

    return [];
  },

  /**
   * Get villages by district ID
   * @param {string} kecamatanId - District ID
   * @returns {Promise<Array>} List of villages
   */
  getKelurahan: async (kecamatanId) => {
    // Check cache
    if (cache.kelurahan[kecamatanId] && 
        (Date.now() - cache.kelurahan[kecamatanId].timestamp) < CACHE_EXPIRY) {
      return cache.kelurahan[kecamatanId].data;
    }

    for (const source of API_SOURCES) {
      try {
        const response = await fetch(`${source.baseUrl}/villages/${kecamatanId}.json`);
        
        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const formatted = formatKelurahan(data, source.format);
        
        cache.kelurahan[kecamatanId] = {
          data: formatted,
          timestamp: Date.now()
        };
        
        return formatted;
      } catch (error) {
        console.warn(`[${source.name}] API failed:`, error.message);
        continue;
      }
    }

    return [];
  },

  /**
   * Clear all cached data
   */
  clearCache: () => {
    cache.provinsi = null;
    cache.kabupaten = {};
    cache.kecamatan = {};
    cache.kelurahan = {};
  },

  /**
   * Search province by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Filtered provinces
   */
  searchProvinsi: async (query) => {
    const provinces = await wilayahApi.getProvinsi();
    const lowerQuery = query.toLowerCase();
    
    return provinces.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.kode?.includes(query)
    );
  },

  /**
   * Get province by ID
   * @param {string} id - Province ID
   * @returns {Promise<Object|null>} Province data
   */
  getProvinsiById: async (id) => {
    const provinces = await wilayahApi.getProvinsi();
    return provinces.find(p => p.id === id) || null;
  }
};

/**
 * Format province data based on API source
 */
const formatProvinsi = (data, format) => {
  if (!Array.isArray(data)) return [];
  
  if (format === 'kangpian') {
    return data.map(item => ({
      id: item.id,
      name: item.province,
      kode: item.code
    }));
  }
  
  // emsifa format
  return data.map(item => ({
    id: item.id,
    name: item.name,
    kode: item.code
  }));
};

/**
 * Format regency data based on API source
 */
const formatKabupaten = (data, format) => {
  if (!Array.isArray(data)) return [];
  
  if (format === 'kangpian') {
    return data.map(item => ({
      id: item.id,
      name: item.regency,
      province_id: item.province_id,
      kode: item.code
    }));
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    province_id: item.province_id,
    kode: item.code
  }));
};

/**
 * Format district data based on API source
 */
const formatKecamatan = (data, format) => {
  if (!Array.isArray(data)) return [];
  
  if (format === 'kangpian') {
    return data.map(item => ({
      id: item.id,
      name: item.district,
      regency_id: item.regency_id,
      kode: item.code
    }));
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    regency_id: item.regency_id,
    kode: item.code
  }));
};

/**
 * Format village data based on API source
 */
const formatKelurahan = (data, format) => {
  if (!Array.isArray(data)) return [];
  
  if (format === 'kangpian') {
    return data.map(item => ({
      id: item.id,
      name: item.village,
      district_id: item.district_id,
      kode: item.code,
      postal_code: item.postal_code
    }));
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    district_id: item.district_id,
    kode: item.code,
    postal_code: item.postal_code
  }));
};

/**
 * Static fallback data for provinces
 */
const getStaticProvinsi = () => [
  { id: '11', name: 'ACEH', kode: '11' },
  { id: '12', name: 'SUMATERA UTARA', kode: '12' },
  { id: '13', name: 'SUMATERA BARAT', kode: '13' },
  { id: '14', name: 'RIAU', kode: '14' },
  { id: '15', name: 'JAMBI', kode: '15' },
  { id: '16', name: 'SUMATERA SELATAN', kode: '16' },
  { id: '17', name: 'BENGKULU', kode: '17' },
  { id: '18', name: 'LAMPUNG', kode: '18' },
  { id: '19', name: 'KEPULAUAN BANGKA BELITUNG', kode: '19' },
  { id: '21', name: 'KEPULAUAN RIAU', kode: '21' },
  { id: '31', name: 'DKI JAKARTA', kode: '31' },
  { id: '32', name: 'JAWA BARAT', kode: '32' },
  { id: '33', name: 'JAWA TENGAH', kode: '33' },
  { id: '34', name: 'DI YOGYAKARTA', kode: '34' },
  { id: '35', name: 'JAWA TIMUR', kode: '35' },
  { id: '36', name: 'BANTEN', kode: '36' },
  { id: '51', name: 'BALI', kode: '51' },
  { id: '52', name: 'NUSA TENGGARA BARAT', kode: '52' },
  { id: '53', name: 'NUSA TENGGARA TIMUR', kode: '53' },
  { id: '61', name: 'KALIMANTAN BARAT', kode: '61' },
  { id: '62', name: 'KALIMANTAN TENGAH', kode: '62' },
  { id: '63', name: 'KALIMANTAN SELATAN', kode: '63' },
  { id: '64', name: 'KALIMANTAN TIMUR', kode: '64' },
  { id: '65', name: 'KALIMANTAN UTARA', kode: '65' },
  { id: '71', name: 'SULAWESI UTARA', kode: '71' },
  { id: '72', name: 'SULAWESI TENGAH', kode: '72' },
  { id: '73', name: 'SULAWESI SELATAN', kode: '73' },
  { id: '74', name: 'SULAWESI TENGGARA', kode: '74' },
  { id: '75', name: 'GORONTALO', kode: '75' },
  { id: '76', name: 'SULAWESI BARAT', kode: '76' },
  { id: '81', name: 'MALUKU', kode: '81' },
  { id: '82', name: 'MALUKU UTARA', kode: '82' },
  { id: '91', name: 'PAPUA BARAT', kode: '91' },
  { id: '94', name: 'PAPUA', kode: '94' }
];

export default wilayahApi;
