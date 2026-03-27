/**
 * PPDB API - Google Apps Script Example
 * 
 * Deploy dengan CLASP:
 * 1. clasp login
 * 2. clasp create --title "PPDB API Example" --type sheets
 * 3. clasp push
 * 4. clasp deploy --title "v1"
 * 
 * Test endpoints:
 * GET  https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=getStudents
 * GET  https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=getStats
 * POST https://script.google.com/macros/s/DEPLOYMENT_ID/exec (body: JSON dengan action)
 */

// ============================================
// CONFIGURATION
// ============================================

/** 
 * Get Sheet ID from Properties Service
 * Set manually: clasp run --function setSheetId -- '{ "id": "YOUR_SHEET_ID" }'
 */
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const SHEET_NAME = 'PPDB_Students';

// ============================================
// MAIN ENTRY POINTS
// ============================================

/**
 * Handle GET requests
 * @param {Object} e - Event object
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Handle POST requests
 * @param {Object} e - Event object
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Main request handler
 * @param {Object} e - Event object
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function handleRequest(e) {
  const action = getAction(e);
  
  Logger.log('Action: ' + action);
  
  try {
    var result;
    
    switch (action) {
      case 'getStudents':
        result = getStudents();
        break;
      case 'getStudent':
        result = getStudent(e.parameter.id);
        break;
      case 'createStudent':
        var data = parsePostData(e);
        result = createStudent(data);
        break;
      case 'updateStudent':
        var data = parsePostData(e);
        result = updateStudent(data);
        break;
      case 'deleteStudent':
        var data = parsePostData(e);
        result = deleteStudent(data);
        break;
      case 'getStats':
        result = getStats();
        break;
      case 'ping':
        result = { success: true, message: 'API is running!', timestamp: new Date().toISOString() };
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
      error: error.message,
      stack: error.stack 
    });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get action from request
 * @param {Object} e - Event object
 * @return {string} Action name
 */
function getAction(e) {
  if (e && e.parameter && e.parameter.action) {
    return e.parameter.action;
  }
  
  if (e && e.postData && e.postData.contents) {
    try {
      var data = JSON.parse(e.postData.contents);
      return data.action || null;
    } catch (err) {
      return null;
    }
  }
  
  return null;
}

/**
 * Parse POST data
 * @param {Object} e - Event object
 * @return {Object} Parsed data
 */
function parsePostData(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  return {};
}

/**
 * Get or create spreadsheet
 * @return {GoogleAppsScript.Spreadsheet.Sheet} Sheet object
 */
function getSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID || getOrCreateSheetId());
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    initializeSheet(sheet);
  }
  
  return sheet;
}

/**
 * Initialize sheet with headers
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Sheet to initialize
 */
function initializeSheet(sheet) {
  var headers = [
    'id', 'nama_lengkap', 'nisn', 'tanggal_lahir', 'jenis_kelamin',
    'agama', 'alamat', 'kota', 'provinsi', 'kode_pos',
    'nama_ortu', 'no_telp_ortu', 'email_ortu', 'asal_sekolah',
    'jurusan_dipilih', 'tanggal_daftar', 'status', 'keterangan'
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4F46E5');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Create default spreadsheet if not exists
 * @return {string} Spreadsheet ID
 */
function getOrCreateSheetId() {
  var ss = SpreadsheetApp.create('PPDB Database');
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  return ss.getId();
}

/**
 * Return JSON response
 * @param {Object} data - Data to return
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// API ENDPOINTS
// ============================================

/**
 * Get all students
 * @return {Object} Response with students array
 */
function getStudents() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return { success: true, data: [], message: 'No students found' };
  }
  
  var headers = data[0];
  
  var students = data.slice(1).map(function(row) {
    var student = {};
    for (var i = 0; i < headers.length; i++) {
      student[headers[i]] = row[i];
    }
    return student;
  });
  
  return { success: true, data: students };
}

/**
 * Get student by ID
 * @param {string} id - Student ID
 * @return {Object} Response with student data
 */
function getStudent(id) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return { success: false, error: 'No students found' };
  }
  
  var headers = data[0];
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      var student = {};
      for (var j = 0; j < headers.length; j++) {
        student[headers[j]] = data[i][j];
      }
      return { success: true, data: student };
    }
  }
  
  return { success: false, error: 'Student not found' };
}

/**
 * Create new student
 * @param {Object} studentData - Student data
 * @return {Object} Response with created student ID
 */
function createStudent(studentData) {
  var sheet = getSheet();
  var id = 'STD-' + Date.now();
  
  var newRow = [
    id,
    studentData.nama_lengkap || '',
    studentData.nisn || '',
    studentData.tanggal_lahir || '',
    studentData.jenis_kelamin || 'L',
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
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    'pending',
    studentData.keterangan || ''
  ];
  
  sheet.appendRow(newRow);
  
  return { 
    success: true, 
    data: { id: id },
    message: 'Student created successfully'
  };
}

/**
 * Update student data
 * @param {Object} studentData - Student data with ID
 * @return {Object} Response status
 */
function updateStudent(studentData) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == studentData.id) {
      var updates = [
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

/**
 * Delete student
 * @param {Object} studentData - Object with student ID
 * @return {Object} Response status
 */
function deleteStudent(studentData) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == studentData.id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Student deleted successfully' };
    }
  }
  
  return { success: false, error: 'Student not found' };
}

/**
 * Get statistics
 * @return {Object} Statistics data
 */
function getStats() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  var stats = {
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    byGender: { L: 0, P: 0 },
    byMajor: {}
  };
  
  if (data.length <= 1) {
    return { success: true, data: stats };
  }
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    stats.total++;
    
    var status = row[15]; // status column
    var gender = row[4];  // jenis_kelamin column
    var major = row[14];  // jurusan_dipilih column
    
    if (status === 'pending') stats.pending++;
    else if (status === 'accepted') stats.accepted++;
    else if (status === 'rejected') stats.rejected++;
    
    if (gender === 'L') stats.byGender.L++;
    else if (gender === 'P') stats.byGender.P++;
    
    if (major) {
      stats.byMajor[major] = (stats.byMajor[major] || 0) + 1;
    }
  }
  
  return { success: true, data: stats };
}

// ============================================
// UTILITY FUNCTIONS (for manual testing)
// ============================================

/**
 * Set Sheet ID manually (run from Apps Script editor)
 * @param {Object} e - Event object with id property
 * @return {Object} Status
 */
function setSheetId(e) {
  var id = e.id || e;
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', id);
  return { success: true, message: 'Sheet ID set to: ' + id };
}

/**
 * Reset database (WARNING: deletes all data!)
 * @return {Object} Status
 */
function resetDatabase() {
  var sheet = getSheet();
  var ss = sheet.getParent();
  ss.deleteSheet(sheet);
  return { success: true, message: 'Database reset successfully' };
}
