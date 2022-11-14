const SibApiV3Sdk = require("sib-api-v3-sdk");

export default function handler(req, res) {
  const { name, email, company, occupation } = req.body;

  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Déess Website - Download Form";
  sendSmtpEmail.htmlContent =
    "<html><body><p>Hi,<br>A user with the following name & email has requested catalog download from your website</p><p>Name: {{params.name}}<br>Email: {{params.email}}<br>Company: {{params.company}}<br>Occupation: {{params.occupation}}</p></body></html>";
  sendSmtpEmail.sender = { name: "Deess Website", email: "noreply@deess.be" };
  sendSmtpEmail.to = [{ email: process.env.EMAIL_TO, name: "Déess Web Admin" }];
  sendSmtpEmail.replyTo = { email, name };
  sendSmtpEmail.params = {
    name,
    email,
    company,
    occupation,
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
      res
        .status(200)
        .end(JSON.stringify({ message: "Send Mail", body: req.query }));
    },
    function (error) {
      console.error(error);
      res.status(400).end(JSON.stringify({ message: "Error" }));
    }
  );
}
