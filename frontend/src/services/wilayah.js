/**
 * Wilayah API Service
 * Source: https://wilayah.web.app
 * 
 * API Endpoints:
 * - GET /v1/api/provinces.json - Get all provinces (returns array)
 * - GET /v1/api/regencies/{province_id}.json - Get cities/regencies by province
 * - GET /v1/api/districts/{regency_id}.json - Get districts by regency
 * - GET /v1/api/villages/{district_id}.json - Get villages by district
 */

const BASE_URL = 'https://wilayah.web.app/v1/api';

export const wilayahApi = {
  // Get all provinces
  getProvinsi: async () => {
    try {
      const response = await fetch(`${BASE_URL}/provinces.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // API returns array directly
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  },

  // Get regencies/cities by province ID
  getKabupaten: async (provinsiId) => {
    try {
      const response = await fetch(`${BASE_URL}/regencies/${provinsiId}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching regencies:', error);
      return [];
    }
  },

  // Get districts by regency ID
  getKecamatan: async (kabupatenId) => {
    try {
      const response = await fetch(`${BASE_URL}/districts/${kabupatenId}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  },

  // Get villages by district ID
  getKelurahan: async (kecamatanId) => {
    try {
      const response = await fetch(`${BASE_URL}/villages/${kecamatanId}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching villages:', error);
      return [];
    }
  }
};

export default wilayahApi;
