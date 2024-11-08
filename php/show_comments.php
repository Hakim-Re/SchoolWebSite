<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cybertech";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle AJAX request to retrieve comments
if (isset($_GET['action']) && $_GET['action'] == 'get_comments') {
    $sql = "SELECT nom, prenom, email, message, reg_date FROM commentaires";
    $result = $conn->query($sql);
    
    $comments = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
    }
    echo json_encode($comments);
    $conn->close();
    exit;
}
?>
