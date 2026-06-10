function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle('Heritage Fest Registration')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}


function saveRegistration(formData) {

  try {

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    let sheet = ss.getSheetByName(SHEET_NAME);


    if (!sheet) {

      sheet = ss.insertSheet(SHEET_NAME);

      sheet.appendRow([
        'Timestamp',
        'Registration ID',
        'Student Name',
        'Age',
        'Gender',
        'Mobile',
        'Email',
        'School',
        'City',
        'Event'
      ]);

    }


    const registrationId = generateRegistrationId();


    sheet.appendRow([
      new Date(),
      registrationId,
      formData.studentName,
      formData.age,
      formData.gender,
      formData.mobile,
      formData.email,
      formData.school,
      formData.city,
      formData.eventName
    ]);


    return {
      status: 'success',
      registrationId: registrationId
    };

  }

  catch(error) {

    return {
      status: 'error',
      message: error.toString()
    };

  }

}


function generateRegistrationId() {

  const date = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyyMMddHHmmss'
  );

  return 'HF-' + date;

}
