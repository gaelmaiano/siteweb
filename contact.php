<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération et sécurisation des données du formulaire
    $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $email = htmlspecialchars(strip_tags(trim($_POST["email"])));
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    // Validation des données
    if (!empty($name) && !empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Destinataire de l'email (votre adresse email)
            $to = "votreadresse@example.com"; // Remplacez par votre adresse email

            // Sujet de l'email
            $subject = "Nouveau message de votre portfolio";

            // Corps de l'email
            $email_content = "Nom: $name\n";
            $email_content .= "Email: $email\n\n";
            $email_content .= "Message:\n$message\n";

            // En-têtes de l'email
            $email_headers = "From: $name <$email>";

            // Envoi de l'email
            if (mail($to, $subject, $email_content, $email_headers)) {
                // Redirection avec paramètre de succès
                header("Location: index.html?success=1");
                exit;
            } else {
                // Redirection avec paramètre d'erreur
                header("Location: index.html?error=1");
                exit;
            }
        } else {
            // Email invalide
            header("Location: index.html?error=2");
            exit;
        }
    } else {
        // Champs vides
        header("Location: index.html?error=3");
        exit;
    }
} else {
    // Accès direct au script sans soumission du formulaire
    header("Location: index.html");
    exit;
}
?>
