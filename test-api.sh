#!/bin/bash

# PPDB API - Test Script
# Usage: ./test-api.sh DEPLOYMENT_ID

DEPLOYMENT_ID=${1:-"AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg"}
BASE_URL="https://script.google.com/macros/s/${DEPLOYMENT_ID}/exec"

echo "======================================"
echo "PPDB API - Test Script"
echo "Base URL: ${BASE_URL}"
echo "======================================"
echo ""

# Test 1: Ping
echo "📍 Test 1: Ping (Health Check)"
echo "--------------------------------------"
curl -s "${BASE_URL}?action=ping" | jq .
echo ""
echo ""

# Test 2: Get Stats (empty)
echo "📊 Test 2: Get Statistics"
echo "--------------------------------------"
curl -s "${BASE_URL}?action=getStats" | jq .
echo ""
echo ""

# Test 3: Get Students (empty)
echo "👥 Test 3: Get All Students"
echo "--------------------------------------"
curl -s "${BASE_URL}?action=getStudents" | jq .
echo ""
echo ""

# Test 4: Create Student
echo "✅ Test 4: Create New Student"
echo "--------------------------------------"
curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createStudent",
    "nama_lengkap": "Ahmad Rizki",
    "nisn": "0012345678",
    "tanggal_lahir": "2005-05-15",
    "jenis_kelamin": "L",
    "agama": "Islam",
    "alamat": "Jl. Merdeka No. 45",
    "kota": "Bandung",
    "provinsi": "Jawa Barat",
    "kode_pos": "40123",
    "nama_ortu": "Budi Santoso",
    "no_telp_ortu": "081234567890",
    "email_ortu": "budi@example.com",
    "asal_sekolah": "SMP Negeri 5 Bandung",
    "jurusan_dipilih": "RPL"
  }' | jq .
echo ""
echo ""

echo "======================================"
echo "✅ Tests completed!"
echo "======================================"
echo ""
echo "⚠️  If you see HTML error pages:"
echo "   1. Buka Apps Script Editor"
echo "   2. Deploy → Manage Deployments"
echo "   3. Edit deployment"
echo "   4. Set 'Who has access' to 'Anyone'"
echo "   5. Save dan coba lagi"
