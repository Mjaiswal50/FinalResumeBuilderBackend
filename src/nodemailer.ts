import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class Nodemailer {
    static otpgenerator(){

      let digits = '0123456789';
      let otp = '';
      for (let i = 0; i < 5; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      return (otp);
    }
    static createTransporter() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
            api_key: 'xyz'
            }
        }))
    }

    static sendEmail(from, to, subject, html) {
        return this.createTransporter().sendMail({from, to, subject, html});
    }
}

export function PasswordResetHtml(url: string): string {
    return `  <title>Reset your Password</title>
  <head>
    <style>
      /* Base ------------------------------ */
      *:not(br):not(tr):not(html) {
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #F5F7F9;
        color: #839197;
        -webkit-text-size-adjust: none;
      }
      a {
        color: #414EF9;
      }
      /* Layout ------------------------------ */
      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #F5F7F9;
      }
      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
      }
      /* Masthead ----------------------- */
      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }
      .email-masthead_logo {
        max-width: 400px;
        border: 0;
      }
      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #839197;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */
      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        border-top: 1px solid #E7EAEC;
        border-bottom: 1px solid #E7EAEC;
        background-color: #FFFFFF;
      }
      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
      }
      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        text-align: center;
      }
      .email-footer p {
        color: #839197;
      }
      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
      }
      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #E7EAEC;
      }
      .content-cell {
        padding: 35px;
      }
      .align-right {
        text-align: right;
      }
      /* Type ------------------------------ */
      h1 {
        margin-top: 0;
        font-size: 19px;
        font-weight: bold;
        text-align: left;
        color: #538ec3 !important;
      }
      h2 {
        margin-top: 0;
        color: #292E31;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      h3 {
        margin-top: 0;
        color: #292E31;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      p {
        margin-top: 0;
        color: #839197;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
      }
      p.sub {
        font-size: 12px;
      }
      p.center {
        text-align: center;
      }
      /* Buttons ------------------------------ */
      .button {
        display: inline-block;
        width: 200px;
        background-color: #414EF9;
        border-radius: 3px;
        color: #ffffff !important;
        font-size: 15px;
        line-height: 45px;
        text-align: center;
        text-decoration: none;
        -webkit-text-size-adjust: none;
        mso-hide: all;
      }
      .button--green {
        background-color: #28DB67;
      }
      .button--red {
        background-color: #FF3665;
      }
      .button--blue {
        background-color: #538ec3;
      }
      /*Media Queries ------------------------------ */
      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
        }
      }
    </style>
    <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
            <!-- Logo -->
            <tr>
              <td class="email-masthead">
                <a class="email-masthead_name">Digi Resume</a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class="email-body" width="100%">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <h1>Reset your Password</h1>
                      <p>Please click the button below to reset your password</p>
                      <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <div>
                              <a href="https://www.digiresumes.com/password/reset/${url}" class="button button--blue">Reset Password</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <p>Thanks,<br>From the Whole  Team here.</p>
                      <table class="body-sub">
                        <tr>
                          <td>
                            <p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.
                            </p>
                            <p class="sub"><a href="https://www.digiresumes.com/password/reset/${url}">Click here</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell">
                      <p class="sub center">
                        Digi Resume, Inc.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </body>
</head>`;
}
