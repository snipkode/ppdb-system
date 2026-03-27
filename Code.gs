/**
 * PPDB System - Google Apps Script Backend
 * Deploy as Web App with access: Anyone with the link
 *
 * Google Sheet: https://docs.google.com/spreadsheets/d/1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU/edit
 */

// Get Sheet ID from Script Properties (sudah di-set di Apps Script Settings)
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const SHEET_NAME = 'PPDB_Students';

/**
 * Handle GET requests
 * @param {Object} e - Event object from Apps Script
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Handle POST requests
 * @param {Object} e - Event object from Apps Script
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Main request handler
 * @param {Object} e - Event object from Apps Script
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function handleRequest(e) {
  // Handle case when e is undefined (direct function call)
  if (!e) {
    return jsonResponse({
      success: true,
      message: 'PPDB API is running!',
      timestamp: new Date().toISOString(),
      endpoints: ['getStudents', 'getStudent', 'createStudent', 'updateStudent', 'deleteStudent', 'getStats']
    });
  }
  
  // Get action from query parameter or POST body
  var action = null;
  
  if (e.parameter && e.parameter.action) {
    action = e.parameter.action;
  } else if (e.postData && e.postData.contents) {
    try {
      var postData = JSON.parse(e.postData.contents);
      action = postData.action;
    } catch (err) {
      // Ignore parse error
    }
  }

  try {
    var result;
    
    switch (action) {
      case 'getStudents':
        result = getStudents();
        break;
      case 'getStudent':
        result = getStudent(e.parameter ? e.parameter.id : null);
        break;
      case 'createStudent':
        result = createStudent(JSON.parse(e.postData.contents));
        break;
      case 'updateStudent':
        result = updateStudent(JSON.parse(e.postData.contents));
        break;
      case 'deleteStudent':
        result = deleteStudent(JSON.parse(e.postData.contents));
        break;
      case 'getStats':
        result = getStats();
        break;
      case 'ping':
        result = {
          success: true,
          message: 'API is running!',
          timestamp: new Date().toISOString()
        };
        break;
      default:
        result = {
          success: false,
          error: 'Invalid action',
          availableActions: ['getStudents', 'getStudent', 'createStudent', 'updateStudent', 'deleteStudent', 'getStats', 'ping']
        };
    }
    
    return jsonResponse(result);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return jsonResponse({
      success: false,
      error: error.message
    });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID || getOrCreateSheetId());
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Create headers
    sheet.appendRow([
      'id', 'nama_lengkap', 'nisn', 'tanggal_lahir', 'jenis_kelamin',
      'agama', 'alamat', 'kota', 'provinsi', 'kode_pos',
      'nama_ortu', 'no_telp_ortu', 'email_ortu', 'asal_sekolah',
      'jurusan_dipilih', 'tanggal_daftar', 'status', 'keterangan'
    ]);
    // Format header row
    sheet.getRange(1, 1, 1, 18).setFontWeight('bold').setBackground('#4F46E5');
    sheet.getRange(1, 1, 1, 18).setFontColor('#FFFFFF');
  }

  return sheet;
}

function getOrCreateSheetId() {
  const ss = SpreadsheetApp.create('PPDB Database');
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  return ss.getId();
}

function getStudents() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const students = data.slice(1).map(row => {
    const student = {};
    headers.forEach((header, index) => {
      student[header] = row[index];
    });
    return student;
  });
  
  return { success: true, data: students };
}

function getStudent(id) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      const headers = data[0];
      const student = {};
      headers.forEach((header, index) => {
        student[header] = data[i][index];
      });
      return { success: true, data: student };
    }
  }
  
  return { success: false, error: 'Student not found' };
}

function createStudent(studentData) {
  const sheet = getSheet();
  const id = 'STD-' + Date.now();
  
  const newRow = [
    id,
    studentData.nama_lengkap || '',
    studentData.nisn || '',
    studentData.tanggal_lahir || '',
    studentData.jenis_kelamin || '',
    studentData.agama || '',
    studentData.alamat || '',
    studentData.kota || '',
    studentData.provinsi || '',
    studentData.kode_pos || '',
    studentData.nama_ortu || '',
    studentData.no_telp_ortu || '',
    studentData.email_ortu || '',
    studentData.asal_sekolah || '',
    studentData.jurusan_dipilih || '',
    new Date().toISOString().split('T')[0],
    'pending',
    studentData.keterangan || ''
  ];
  
  sheet.appendRow(newRow);
  
  return { success: true, data: { id, message: 'Student created successfully' } };
}

function updateStudent(studentData) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == studentData.id) {
      const updates = [
        studentData.nama_lengkap, studentData.nisn, studentData.tanggal_lahir,
        studentData.jenis_kelamin, studentData.agama, studentData.alamat,
        studentData.kota, studentData.provinsi, studentData.kode_pos,
        studentData.nama_ortu, studentData.no_telp_ortu, studentData.email_ortu,
        studentData.asal_sekolah, studentData.jurusan_dipilih,
        studentData.status, studentData.keterangan
      ];
      
      sheet.getRange(i + 1, 2, 1, updates.length).setValues([updates]);
      return { success: true, message: 'Student updated successfully' };
    }
  }
  
  return { success: false, error: 'Student not found' };
}

function deleteStudent(studentData) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == studentData.id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Student deleted successfully' };
    }
  }
  
  return { success: false, error: 'Student not found' };
}

function getStats() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  const stats = {
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    byGender: { L: 0, P: 0 },
    byMajor: {}
  };
  
  data.slice(1).forEach(row => {
    stats.total++;
    const status = row[15]; // status column
    const gender = row[4]; // jenis_kelamin column
    const major = row[14]; // jurusan_dipilih column
    
    if (status === 'pending') stats.pending++;
    else if (status === 'accepted') stats.accepted++;
    else if (status === 'rejected') stats.rejected++;
    
    if (gender === 'L') stats.byGender.L++;
    else if (gender === 'P') stats.byGender.P++;
    
    if (major) {
      stats.byMajor[major] = (stats.byMajor[major] || 0) + 1;
    }
  });
  
  return { success: true, data: stats };
}

/**
 * Helper function to return JSON response
 * @param {Object} data - The data to return as JSON
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
