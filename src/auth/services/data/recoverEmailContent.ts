import { User } from "src/auth/entities/user.entity";
import { Client } from "src/clients/entities/client.entity";

export function recoverEmailContent(user: User, new_password: string): string {
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #3B82F6;
            color: white;
            text-align: center;
            padding: 20px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            margin-bottom: 15px;
        }
        .header h2 {
            margin: 0;
            font-size: 18px;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            padding: 20px;
        }
        .footer {
            background-color: #3B82F6;
            color: white;
            text-align: center;
            padding: 20px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin-top: 30px;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: white;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
          <img src="https://easyjob-bucket.s3.us-east-2.amazonaws.com/imagotipo-vertical-blanco.png" style="width: 150px" />
        </div>
        <div class="content">
            <h2>🔑 Restablecimiento de Contraseña 🔒</h2>
            <p>Estimado/a ${user.name},</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en EasyJob. Entendemos lo importante que es la seguridad de tu cuenta y queremos asegurarnos de que puedas acceder a ella lo antes posible.</p>
            <p>Tu nueva contraseña temporal es: <strong>${new_password}</strong></p>
            <p>Por favor, inicia sesión en tu cuenta con esta nueva contraseña. Te recomendamos que cambies esta contraseña temporal por una nueva contraseña personalizada lo antes posible para garantizar la seguridad de tu cuenta. Puedes hacerlo accediendo a la configuración de tu perfil dentro del sistema.</p>
            <p>Si no has solicitado este cambio de contraseña, te pedimos que te pongas en contacto con nuestro equipo de soporte de inmediato para que podamos ayudarte a proteger tu cuenta.</p>
            <p>Gracias por tu comprensión y disculpa cualquier inconveniente que esto pueda causar. 🙏</p>
        </div>
        <div class="footer">
            <p>Saludos cordiales del Equipo EasyJob</p>
            <p>Email: <a href="mailto:contacto@easyjob.com.co">contacto@easyjob.com.co</a></p>
            <p>Teléfono: 3181234567 ☎️</p>
            <p>Web: <a href="http://easyjob.com.co">easyjob.com.co</a> 🌐</p>
        </div>
    </div>
</body>
</html>
    `
}