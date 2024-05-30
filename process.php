<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "car_rental";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to handle booking data
function handleBooking($data, $conn) {
    if (isset($data['location']) && isset($data['pick_up_date']) && isset($data['return_date']) && isset($data['car_name'])) {
        $location = $data['location'];
        $pick_up_date = $data['pick_up_date'];
        $return_date = $data['return_date'];
        $car_name = $data['car_name'];

        $sql = "INSERT INTO bookings (location, pick_up_date, return_date, car_name) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $location, $pick_up_date, $return_date, $car_name);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Booking record inserted successfully";
        } else {
            http_response_code(500);
            echo "Error submitting booking";
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo "Invalid booking data";
    }
}

// Function to handle feedback data
function handleFeedback($data, $conn) {
    if (isset($data['fullName']) && isset($data['contact']) && isset($data['email']) && isset($data['feedback'])) {
        $fullName = $data['fullName'];
        $contact = $data['contact'];
        $email = $data['email'];
        $feedback = $data['feedback'];

        $sql = "INSERT INTO feedback (fullName, contact, email, feedback) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $fullName, $contact, $email, $feedback);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Feedback submitted successfully";
        } else {
            http_response_code(500);
            echo "Error submitting feedback";
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo "Invalid feedback data";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['car_name'])) {
        handleBooking($data, $conn);
    } else if (isset($data['feedback'])) {
        handleFeedback($data, $conn);
    } else {
        http_response_code(400);
        echo "Invalid form data";
    }
} else {
    http_response_code(405);
    echo "Invalid request method";
}

$conn->close();
?>
