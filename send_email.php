<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Honeypot check
    if (!empty($_POST['hp'])) {
        // Honeypot field is filled, likely a bot
        exit('Spam detected.');
    }

    // Sanitizacija unosa
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // reCAPTCHA Validation
    $recaptchaSecret = 'YOUR_RECAPTCHA_SECRET_KEY';
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if(intval($responseKeys["success"]) !== 1) {
        exit('reCAPTCHA verification failed.');
    }

    // Postavke e-maila
    $to = "elevatic20@gmail.com"; // Zamijeni s e-mail adresom na koju želiš primati poruke
    $subject = "Nova poruka s kontakt forme";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-type: text/html; charset=utf-8" . "\r\n";

    // Sadržaj e-maila
    $email_content = "
    <html>
    <head>
        <title>Nova poruka s kontakt forme</title>
    </head>
    <body>
        <p><strong>Ime:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Poruka:</strong> {$message}</p>
    </body>
    </html>";

    // Slanje e-maila
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Poruka uspješno poslana!";
    } else {
        echo "Došlo je do greške pri slanju poruke, pokušajte ponovno.";
    }
} else {
    echo "Podaci nisu poslani putem POST metode.";
}
?>
