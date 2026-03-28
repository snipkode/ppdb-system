/**
 * Test Component - Wilayah Dropdown Testing
 * Use this to test if all dropdowns are working
 */

import { useEffect, useState } from 'react';
import { wilayahApi } from '@/services/wilayah';

const WilayahTest = () => {
  const [testResults, setTestResults] = useState({
    provinsi: { loaded: false, count: 0, data: [] },
    kabupaten: { loaded: false, count: 0, data: [] },
    kecamatan: { loaded: false, count: 0, data: [] },
    kelurahan: { loaded: false, count: 0, data: [] },
  });

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    console.log('🧪 Starting Wilayah API Tests...\n');

    // Test 1: Load all provinces
    console.log('📍 Test 1: Loading Provinsi...');
    const provinsi = await wilayahApi.getProvinsi();
    setTestResults(prev => ({
      ...prev,
      provinsi: { loaded: true, count: provinsi.length, data: provinsi }
    }));
    console.log(`✅ Provinsi: ${provinsi.length} items loaded\n`);

    // Test 2: Load kabupaten for Sumatera Barat (13)
    console.log('📍 Test 2: Loading Kabupaten for Sumatera Barat (13)...');
    const kabupaten = await wilayahApi.getKabupaten('13');
    setTestResults(prev => ({
      ...prev,
      kabupaten: { loaded: true, count: kabupaten.length, data: kabupaten }
    }));
    console.log(`✅ Kabupaten: ${kabupaten.length} items loaded\n`);

    // Test 3: Load kecamatan for Agam (1307)
    console.log('📍 Test 3: Loading Kecamatan for Agam (1307)...');
    const kecamatan = await wilayahApi.getKecamatan('1307');
    setTestResults(prev => ({
      ...prev,
      kecamatan: { loaded: true, count: kecamatan.length, data: kecamatan }
    }));
    console.log(`✅ Kecamatan: ${kecamatan.length} items loaded\n`);

    // Test 4: Load kelurahan for Malalak (1307051)
    console.log('📍 Test 4: Loading Kelurahan for Malalak (1307051)...');
    const kelurahan = await wilayahApi.getKelurahan('1307051');
    setTestResults(prev => ({
      ...prev,
      kelurahan: { loaded: true, count: kelurahan.length, data: kelurahan }
    }));
    console.log(`✅ Kelurahan: ${kelurahan.length} items loaded\n`);

    console.log('🎉 All tests completed!\n');
    console.log('📊 Summary:');
    console.log(`   - Provinsi: ${provinsi.length} items`);
    console.log(`   - Kabupaten (Sumbar): ${kabupaten.length} items`);
    console.log(`   - Kecamatan (Agam): ${kecamatan.length} items`);
    console.log(`   - Kelurahan (Malalak): ${kelurahan.length} items`);
    
    if (kelurahan.length > 0) {
      console.log('\n📮 Postal Code Test:');
      console.log(`   - ${kelurahan[0].name}: ${kelurahan[0].postal_code}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Wilayah Dropdown Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Test Results</h2>
          
          <div className="space-y-4">
            <TestResult 
              label="Provinsi" 
              loaded={testResults.provinsi.loaded} 
              count={testResults.provinsi.count}
              sample={testResults.provinsi.data.slice(0, 5)}
            />
            
            <TestResult 
              label="Kabupaten (Sumatera Barat)" 
              loaded={testResults.kabupaten.loaded} 
              count={testResults.kabupaten.count}
              sample={testResults.kabupaten.data.slice(0, 5)}
            />
            
            <TestResult 
              label="Kecamatan (Agam)" 
              loaded={testResults.kecamatan.loaded} 
              count={testResults.kecamatan.count}
              sample={testResults.kecamatan.data.slice(0, 5)}
            />
            
            <TestResult 
              label="Kelurahan (Malalak)" 
              loaded={testResults.kelurahan.loaded} 
              count={testResults.kelurahan.count}
              sample={testResults.kelurahan.data}
              showPostal
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">📋 Test Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Open browser console (F12)</li>
            <li>Check for test logs</li>
            <li>Verify all dropdowns have data</li>
            <li>Test selecting: Provinsi → Kabupaten → Kecamatan → Kelurahan</li>
            <li>Verify postal code auto-fills when kelurahan selected</li>
          </ol>
        </div>

        <button
          onClick={runTests}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔄 Run Tests Again
        </button>
      </div>
    </div>
  );
};

const TestResult = ({ label, loaded, count, sample, showPostal = false }) => (
  <div className="border rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold">{label}</span>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        loaded 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {loaded ? `✅ ${count} items` : '⏳ Loading...'}
      </span>
    </div>
    
    {sample && sample.length > 0 && (
      <div className="mt-2 text-sm text-gray-600">
        <p className="font-medium mb-1">Sample data:</p>
        <ul className="list-disc list-inside space-y-1">
          {sample.map((item, idx) => (
            <li key={idx}>
              {item.name} 
              {showPostal && item.postal_code && (
                <span className="text-gray-500"> - {item.postal_code}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default WilayahTest;
