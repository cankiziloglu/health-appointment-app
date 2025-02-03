export const verificationEmail = (url: string) => {
  const email = `
  <!DOCTYPE html>
<html>
<head>
  <style>
    /* General styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f7;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #f4f4f7;
      font-size: 12px;
      color: #888;
    }
    hr.custom-divider {
      border: none;
      border-top: 3px solid #bbb;
      margin: 20px 0;
    }
    @media (max-width: 600px) {
      .container {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Visite!</h1>
    </div>
    <div class="content">
      <p>Hi,</p>
      <p>Thanks for signing up! Please verify your email address to get started.</p>
      <p style="text-align: center;">
        <a href="${url}" class="button">Verify Email</a>
      </p>
      <p>If you didn’t sign up for Visite App, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Visite. All rights reserved.</p>
      <p><a href="https://visite.cankiziloglu.com">Visite</a></p>
    </div>
  </div>
  <hr class="custom-divider">
  <div class="container">
    <div class="header">
      <h1>Visite Uygulamasına Hoşgeldiniz!</h1>
    </div>
    <div class="content">
      <p>Merhaba,</p>
      <p>Kaydolduğunuz için teşekkür ederiz. Lütfen uygulamayı kullanmaya başlamak için e-posta adresinizi doğrulayınız.</p>
      <p style="text-align: center;">
        <a href="${url}" class="button">E-posta Doğrula</a>
      </p>
      <p>Eğer uygulamaya kaydolmadıysanız bir şey yapmanız gerekmez, bu e-postayı güvenle silebilirsiniz.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Visite. Tüm hakları saklıdır.</p>
      <p><a href="https://visite.cankiziloglu.com">Visite</a></p>
    </div>
  </div>
</body>
</html>
  `;
  return email;
}
