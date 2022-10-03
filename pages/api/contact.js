const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function recordData(data, done, stop) {
  const jwtClient = new google.auth.JWT(
    process.env.GAPI_EMAIL,
    null,
    process.env.GAPI_PRIVATE_KEY,
    SCOPES
  );
  jwtClient.authorize((err) => {
    if (err) {
      console.log(err);
      stop(err.message);
    } else {
      const sheets = google.sheets({ version: "v4", auth: jwtClient });
      const spreadsheetId = "1I6mpIfLqGBpqNEAoA8745BCnk3ApnkT3sqJw3WQu114";
      let values = [data];
      const requestBody = {
        values,
      };
      const params = {
        spreadsheetId,
        range: `Sheet1!A2:E`,
        valueInputOption: "RAW",
        requestBody,
      };
      const options = (err, res) => {
        if (err) {
          // Handle error
          console.log(err);
          stop(err.message);
        } else {
          // console.log("%d cells updated.", res.data.updates.updatedCells);
          done();
        }
      };
      sheets.spreadsheets.values.append(params, options);
    }
  });
}

export default function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.data && Array.isArray(req.body.data)) {
      recordData(
        req.body.data,
        () => {
          res.status(200).json({ status: "OK" });
        },
        (message) => {
          res.status(500).json({ message });
        }
      );
    } else {
      res.status(400).json({ message: "invalid input" });
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
}
