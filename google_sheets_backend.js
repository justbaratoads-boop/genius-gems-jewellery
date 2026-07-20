// ==========================================================
// GENIUS GEMS & JEWELLERY - GOOGLE SHEETS BACKEND SCRIPT
// ==========================================================
// Paste this entire code into Extensions -> Apps Script inside 
// your Google Spreadsheet, then deploy it as a Web App.
// ==========================================================

const ADMIN_PASSWORD = "genius_admin_2026";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Handle Admin Actions (Status updates or deletions)
    if (data.action) {
      if (data.password !== ADMIN_PASSWORD) {
        return ContentService.createTextOutput(JSON.stringify({ 
          success: false, 
          error: "Unauthorized access." 
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      var rows = sheet.getDataRange().getValues();
      var targetId = parseInt(data.order_id);
      var rowIndex = -1;
      
      // Find row index by Order ID
      for (var i = 1; i < rows.length; i++) {
        if (parseInt(rows[i][0]) === targetId) {
          rowIndex = i + 1; // 1-indexed for Spreadsheet API
          break;
        }
      }
      
      if (rowIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({ 
          success: false, 
          error: "Order record not found." 
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (data.action === 'update_status') {
        sheet.getRange(rowIndex, 14).setValue(data.status); // Column 14 is Status
        return ContentService.createTextOutput(JSON.stringify({ success: true }))
          .setMimeType(ContentService.MimeType.JSON);
      } else if (data.action === 'delete') {
        sheet.deleteRow(rowIndex);
        return ContentService.createTextOutput(JSON.stringify({ success: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Default: Log a new order
    // Create header row if sheet is brand new and blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID", "Date", "Customer Name", "Phone", "Email", 
        "Address", "City", "State", "Zip", "Items", 
        "Subtotal", "GST", "Grand Total", "Status", "Razorpay Payment ID"
      ]);
    }
    
    var orderId = sheet.getLastRow(); // Incremental row ID
    var dateString = new Date().toISOString();
    
    sheet.appendRow([
      orderId,
      dateString,
      data.name,
      data.phone,
      data.email,
      data.address,
      data.city,
      data.state,
      data.zip,
      data.items,
      data.subtotal,
      data.gst,
      data.grand_total,
      data.payment_status,
      data.payment_id || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      order_id: orderId 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var password = e.parameter.password;
    if (password !== ADMIN_PASSWORD) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: "Unauthorized access. Invalid admin password." 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    
    // If only header is present
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, 
        orders: [] 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var orders = [];
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var order = {
        id: row[0],
        order_date: row[1],
        customer_name: row[2],
        customer_phone: row[3],
        customer_email: row[4],
        address: row[5],
        city: row[6],
        state: row[7],
        zip: row[8],
        items: row[9],
        subtotal: parseFloat(row[10]) || 0,
        gst: parseFloat(row[11]) || 0,
        grand_total: parseFloat(row[12]) || 0,
        payment_status: row[13],
        razorpay_payment_id: row[14]
      };
      orders.push(order);
    }
    
    // Sort so latest orders show first in dashboard
    orders.reverse();
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      orders: orders 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
