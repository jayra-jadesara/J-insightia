const { DateTime } = require('mssql');
const { getHostEnviroment } = require('./sendmailUtil');

/**
 * Page not found Visitor Log send mail
 * @param {userid} string
 * @param {url} string
 * @param {errors} string
 */
function PageNotFoundVisitorLog(userid, url, errors) {
  let mailstr = '<h3>Hello,</h3>';
  mailstr += `<p>User id <b style='color:Red;'>${userid}</b> is try to reach Url <a href=${url}>${url}</a> at <u>${new Date()}</u>`;
  mailstr += `<p>${errors}</p>`;
  mailstr += '</br><p>Thanks</p>';
  return mailstr;
}

function APIErrorLog(userid, url, errors) {
  let mailstr = '<h3>Hello,</h3>';
  mailstr += `<p>There has been an issue with an attempt to reach endpoint <b style='color:Red;'>${url}</b> at: <u>${new Date()}</u>`;
  mailstr += `<p>${errors}</p>`;
  mailstr += '</br><p>Thanks</p>';
  return mailstr;
}

function DemoRequestMail(userid, url, email, number_profile, trialUser) {
  let mailstr = `<p>User_id: ${userid}</p>`;
  mailstr += `<p>email: ${email}</p>`;
  mailstr += `<p>Has requested a demo</p>`;
  mailstr += `<p>Current page is: ${url}</p>`;
  mailstr += trialUser ? `<p>No of companies viewed so far: ${number_profile > 0 ? number_profile : 'N/A'}</p>` : '';
  mailstr += '</br><p>Thanks</p>';
  return mailstr;
}
/**
 * reset mail template for reset password
 * @param {hostname} string
 * @param {token} string
 */
function tokenMailSendTemplate(hostname, token) {
  const urlPath = `https://${hostname}/credential-form?key=${token}`;
  const mailstr = `<!DOCTYPE HTML> 
<html lang="en"><head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <style>
      a:link {
        Color: black;
      }
a:visited {
        Color: black;
      }
a:hover {
        Color: black;
      }
a:active {
        Color: black;
      }
body {
        font - family: sans-serif;
      }
</style>
    <title>Insightia Password Reset</title>
</head>
  <body>
        <div id="preview_text" style="display:none;font-size:1px;color:#FFFFFF;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          Reset your Insightia password</div>
        <table style="border-collapse: collapse; width: 100%">
          <tbody>
            <tr style="height:10px; background-color:white">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style="height:2px;">
              <td style="height:2px; background-color:white; font-size: 2px; line-height: 2px;">
                &nbsp;</td>
              <td colspan="5" style="height:2px; background-color:white; font-size: 2px; line-height: 2px; width:704px;">
                &nbsp;</td>
              <td style="height:2px; background-color: white; font-size: 2px; line-height: 2px;">
                &nbsp;</td>
            </tr>
            <tr style="height:10px;">
              <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                &nbsp;</td>
              <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="height:10px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                &nbsp;</td>
            </tr>
            <tr>
              <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
              <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                &nbsp;</td>
              <td style="width:600px; background-color:white; text-align: center;"><img src="https://one.insightia.com/images/logo/LogoStandardSmall.png" alt="Insightia Logo"></td>
                <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
</tr>
              <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                  &nbsp;</td>
              </tr>
              <tr>
                <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
                <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="width:600px; background-color:white; text-align: center; font-size: 16pt; font-weight: bold">
                  Insightia Password Reset</td>
                <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
              </tr>
             
            
              <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt;">
                   &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
              </tr>
             
              <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt;">
                  A password request has been sent for your account. Please click <a href="${urlPath}">here</a> to reset your password or copy this url into your browser: ${urlPath}. This link will expire in 1 day or if another password reset is requested.</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
              </tr>
			  			   <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt;">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
              </tr>
			   <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt;">
                 If you have not requested to reset your password, please ignore this email and your login details will remain the same.</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
              </tr>
			  
			            </tr>
						              </tr>
			  			   <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt;">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px;">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px;">
                  &nbsp;</td>
              </tr>
			   <tr style="height:10px;">
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:600px; background-color:white; font-size: 12pt; ">
                 Best regards, <br><br> The Insightia Team</td>
                <td style="height:10px; width:50px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; width:2px; background-color:white; font-size: 1px; ">
                  &nbsp;</td>
                <td style="height:10px; background-color:white; font-size: 2px; ">
                  &nbsp;</td>
              </tr>
			  
              <tr style="height:20px;">
                <td style="height:20px; background-color:white; font-size: 2px; line-height: 2px;">
                  &nbsp;</td>
                <td style="height:20px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:20px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:20px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:20px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:20px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                  &nbsp;</td>
                <td style="height:20px; background-color:white; font-size: 2px; line-height: 2px;">
                  &nbsp;</td>
              </tr>

                                                                                                                                          <tr style="height:10px;">
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                          </tr>
																																		    <tr>
                                                                                                                                            <td style="background-color:white; font-size: 10px; line-height: 2px;">&nbsp;</td>
                                                                                                                                            <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:600px; background-color:white; text-align: center; font-size: 10pt; color: gray;">
                                                                                                                                              Need support? Email our team at <a href="mailto:insightia.support@diligent.com">insightia.support@diligent.com</a> </td>
                                                                                                                                            <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
                                                                                                                                          </tr>
																																		    <tr style="height:10px;">
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                            <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
                                                                                                                                            <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:600px; background-color:white; text-align: center; font-size: 10pt; color: gray;">
                                                                                                                                              Insightia Ltd., 4 Old Park Lane, Mayfair, London, W1K 1QW</td>
                                                                                                                                            <td style="width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="background-color:white; font-size: 2px; line-height: 2px;">&nbsp;</td>
                                                                                                                                          </tr>
                                                                                                                                         
                                                                                                                                          <tr style="height:10px;">
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:600px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:50px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; width:2px; background-color:white; font-size: 1px; line-height: 1px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:10px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                          </tr>
                                                                                                                                          <tr style="height:2px;">
                                                                                                                                            <td style="height:2px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td colspan="5" style="height:2px; background-color:white; font-size: 2px; line-height: 2px; width:704px">
                                                                                                                                              &nbsp;</td>
                                                                                                                                            <td style="height:2px; background-color:white; font-size: 2px; line-height: 2px;">
                                                                                                                                              &nbsp;</td>
                                                                                                                                          </tr>
</tbody>
</table>
</div>
</body>
</html>`;

  return mailstr;
}

function promiseRejectionErorLog(url, errors, user_id, body, host) {
  const environmental = getHostEnviroment(host);

  let mailstr = `<p>Salutations,</p><p>There has been an issue with an attempt to reach endpoint on ${host}`;
  mailstr += `<p><b>User:</b> <br /> <span style='color:Red;'>${user_id}</b> </span>`;
  mailstr += `<p><b>Enviroment:</b> <br /> ${environmental} </p>`;
  mailstr += `<p><b>Time:</b> <br /> ${new Date()} </p>`;
  mailstr += `<p><b>URL endpoint:</b> <br /> ${url} </p>`;
  mailstr += `<p><b>Sent Data:</b> <br /> ${JSON.stringify(body, null, 4)}</p>`;
  mailstr += `<p><b>Error Message:</b> <br />${errors}</p>`;
  mailstr += '<p>Thanks</p>';
  return mailstr;
}

function promiseRejectionErorLogSQL(url, errors, sql) {
  let mailstr = '<p>There has been an error on the Dynamic SQL</p>';
  mailstr += `<p><b>Time:</b> <br /> ${new Date()} </p>`;
  mailstr += `<p><b>URL endpoint:</b> <br /> ${url} </p>`;
  mailstr += `<p><b>SQL:</b> <br /> ${sql}</p>`;
  mailstr += `<p><b>Error Message:</b> <br />${errors}</p>`;
  mailstr += '</br><p>Thanks</p>';
  return mailstr;
}
function feedbackMailTemplate(userID, url, message) {
  let mailstr = '<DIV style=""width:100%;text-align:left;"">';
        mailstr += '<br/><br/> Dear Support team, <br/>';
        mailstr += 'One of our product users has submitted feedback. Details below. <br/>';
        mailstr += `<br/><br/> Time:  <br/>${new Date()}`;
        mailstr += `<br/><br/> User ID:  <br/> ${userID}`;
        mailstr += `<br/><br/> Page: <br/>${url}`;
        mailstr += `<br/><br/> Message = <br/>${message}`;
        mailstr += '</DIV>';
        return mailstr;
}
module.exports = {
  promiseRejectionErorLog,
  promiseRejectionErorLogSQL,
  PageNotFoundVisitorLog,
  tokenMailSendTemplate,
  APIErrorLog,
  DemoRequestMail,
  feedbackMailTemplate
};
