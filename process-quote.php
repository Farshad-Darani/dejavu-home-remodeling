<?php
// Load configuration from external file
// IMPORTANT: Create config.php from config.example.php and add your real values
if (file_exists('config.php')) {
    require_once 'config.php';
} else {
    die('Error: Configuration file not found. Please copy config.example.php to config.php and configure it.');
}

// Function to sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to verify reCAPTCHA
function verifyRecaptcha($recaptchaResponse, $secretKey) {
    $verifyURL = 'https://www.google.com/recaptcha/api/siteverify';
    $postData = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-type: application/x-www-form-urlencoded',
            'content' => http_build_query($postData)
        ]
    ]);
    
    $response = file_get_contents($verifyURL, false, $context);
    $responseData = json_decode($response, true);
    
    return $responseData['success'] ?? false;
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = sanitizeInput($_POST['name'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $location = sanitizeInput($_POST['location'] ?? '');
    $description = sanitizeInput($_POST['description'] ?? '');
    $projectType = sanitizeInput($_POST['project_type'] ?? 'General Inquiry');
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    }
    
    // Location and description are optional now (hidden fields with defaults)
    
    // Basic spam protection - check if submission is too fast (honeypot alternative)
    // You can add more advanced spam protection later if needed
    
    if (empty($errors)) {
        // Prepare email content
        $subject = "New Quote Request: $projectType - $name";
        
        $emailBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #1A2332; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .quote-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E9C46A; margin: 20px 0; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1A2332; }
                .value { margin-top: 5px; }
                .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h1>$COMPANY_NAME</h1>
                <h2>New Quote Request</h2>
            </div>
            
            <div class='content'>
                <p>You have received a new kitchen remodeling quote request through your website.</p>
                
                <div class='quote-details'>
                    <h3>Customer Information</h3>
                    
                    <div class='field'>
                        <div class='label'>Full Name:</div>
                        <div class='value'>$name</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Phone Number:</div>
                        <div class='value'>$phone</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Project Type:</div>
                        <div class='value'>$projectType</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Project Location:</div>
                        <div class='value'>$location</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Additional Notes:</div>
                        <div class='value'>$description</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Submitted:</div>
                        <div class='value'>" . date('F j, Y \a\t g:i A') . "</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>IP Address:</div>
                        <div class='value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
                    </div>
                </div>
                
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Contact the customer within 24 hours</li>
                    <li>Schedule a free on-site consultation</li>
                    <li>Prepare project assessment and quote</li>
                </ul>
            </div>
            
            <div class='footer'>
                <p>This email was sent from your website contact form at " . $_SERVER['HTTP_HOST'] . "</p>
            </div>
        </body>
        </html>
        ";
        
        // Email headers
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $FROM_EMAIL,
            'Reply-To: ' . $FROM_EMAIL,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        // Send email
        if (mail($TO_EMAIL, $subject, $emailBody, implode("\r\n", $headers))) {
            // Success - redirect to thank you page or show success message
            header('Location: quote-success.html');
            exit;
        } else {
            $errors[] = 'Failed to send email. Please try again or call us directly.';
        }
    }
    
    // If there are errors, redirect back with error message
    if (!empty($errors)) {
        $errorMessage = urlencode(implode('. ', $errors));
        header("Location: index.html?error=$errorMessage");
        exit;
    }
} else {
    // Direct access to this file - redirect to home
    header('Location: index.html');
    exit;
}
?>
