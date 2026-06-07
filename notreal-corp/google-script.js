// ============================================================
// GOOGLE APPS SCRIPT — notreal.corp
// ============================================================
// 1. Va sur https://script.google.com
// 2. Clique "Nouveau projet"
// 3. Efface tout et colle CE CODE
// 4. Clique sur "Déployer" > "Nouveau déploiement"
//    - Type : Application Web
//    - Exécuter en tant que : Moi
//    - Accès : Tout le monde
// 5. Clique "Déployer" et copie l'URL générée
// 6. Dans main.js, remplace [VOTRE_URL_APPS_SCRIPT] par cette URL
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    MailApp.sendEmail({
      to: 'notreal.corp7@gmail.com',
      subject: 'Nouveau projet — notreal.corp',
      htmlBody:
        '<h2 style="font-family:sans-serif;">Nouveau message via notreal.corp</h2>' +
        '<table style="font-family:sans-serif;border-collapse:collapse;width:100%">' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;width:100px">Nom</td>' +
               '<td style="padding:8px;border-bottom:1px solid #eee">' + data.name + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Email</td>' +
               '<td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:' + data.email + '">' + data.email + '</a></td></tr>' +
          '<tr><td style="padding:8px;font-weight:600;vertical-align:top">Projet</td>' +
               '<td style="padding:8px;white-space:pre-wrap">' + data.project + '</td></tr>' +
        '</table>'
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
