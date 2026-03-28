/**
 * Wilayah API Service
 * Source: https://wilayah.web.app
 */

const BASE_URL = 'https://wilayah.web.app/v1/api';

export const wilayahApi = {
  // Get all provinces
  getProvinsi: async () => {
    try {
      console.log('Fetching provinces...');
      const response = await fetch(`${BASE_URL}/provinces.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Provinces data:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching provinces:', error);
      console.error('Error details:', error.message);
      return [];
    }
  },

  // Get regencies by province ID
  getKabupaten: async (provinsiId) => {
    try {
      console.log(`Fetching regencies for province ${provinsiId}...`);
      const response = await fetch(`${BASE_URL}/regencies/${provinsiId}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
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
      console.log(`Fetching districts for regency ${kabupatenId}...`);
      const response = await fetch(`${BASE_URL}/districts/${kabupatenId}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
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
      console.log(`Fetching villages for district ${kecamatanId}...`);
      const response = await fetch(`${BASE_URL}/villages/${kecamatanId}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
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
