/**
 * Wilayah API Service - Indonesian Regions Data
 * Using static data for reliability and offline support
 */

import { 
  STATIC_PROVINSI, 
  STATIC_KABUPATEN, 
  STATIC_KECAMATAN, 
  STATIC_KELURAHAN 
} from '@/data/wilayah';

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
   * Get all provinces
   * @returns {Promise<Array>} List of provinces
   */
  getProvinsi: async () => {
    // Check cache first
    if (cache.provinsi && (Date.now() - cache.provinsi.timestamp) < CACHE_EXPIRY) {
      console.log('✅ Provinsi from cache:', cache.provinsi.data.length, 'items');
      return cache.provinsi.data;
    }

    // Use static data
    console.log('📦 Loading static provinsi:', STATIC_PROVINSI.length, 'items');
    
    cache.provinsi = {
      data: STATIC_PROVINSI,
      timestamp: Date.now()
    };

    return STATIC_PROVINSI;
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
      console.log('✅ Kabupaten from cache:', cache.kabupaten[provinsiId].data.length, 'items');
      return cache.kabupaten[provinsiId].data;
    }

    // Use static data
    const data = STATIC_KABUPATEN[provinsiId] || [];
    console.log('📦 Loading static kabupaten for', provinsiId, ':', data.length, 'items');

    cache.kabupaten[provinsiId] = {
      data: data,
      timestamp: Date.now()
    };

    return data;
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
      console.log('✅ Kecamatan from cache:', cache.kecamatan[kabupatenId].data.length, 'items');
      return cache.kecamatan[kabupatenId].data;
    }

    // Use static data
    const data = STATIC_KECAMATAN[kabupatenId] || [];
    console.log('📦 Loading static kecamatan for', kabupatenId, ':', data.length, 'items');

    cache.kecamatan[kabupatenId] = {
      data: data,
      timestamp: Date.now()
    };

    return data;
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
      console.log('✅ Kelurahan from cache:', cache.kelurahan[kecamatanId].data.length, 'items');
      return cache.kelurahan[kecamatanId].data;
    }

    // Use static data - fallback to default if kecamatanId not found
    let data = STATIC_KELURAHAN[kecamatanId] || [];
    
    // If no data found and kecamatanId is provided, try to get from default
    if (!data.length && kecamatanId) {
      console.log('⚠️ Kelurahan not found for kecamatan:', kecamatanId, '- using default data');
      data = STATIC_KELURAHAN['default'] || [];
    }
    
    console.log('📦 Loading static kelurahan for', kecamatanId, ':', data.length, 'items');

    cache.kelurahan[kecamatanId] = {
      data: data,
      timestamp: Date.now()
    };

    return data;
  },

  /**
   * Get default villages (for initialization)
   * @returns {Promise<Array>} List of default villages
   */
  getDefaultKelurahan: async () => {
    console.log('📦 Loading default kelurahan:', STATIC_KELURAHAN['default']?.length || 0, 'items');
    return STATIC_KELURAHAN['default'] || [];
  },

  /**
   * Clear all cached data
   */
  clearCache: () => {
    cache.provinsi = null;
    cache.kabupaten = {};
    cache.kecamatan = {};
    cache.kelurahan = {};
    console.log('🗑️ Wilayah cache cleared');
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
      p.id.includes(query)
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

export default wilayahApi;
