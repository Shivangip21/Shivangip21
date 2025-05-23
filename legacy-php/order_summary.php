<?php
$orderId = $_GET['order_id'] ?? null;

if (!$orderId) {
    echo "Missing order_id.";
    exit;
}

$apiUrl = "http://localhost:3000/orders/$orderId";

$response = file_get_contents($apiUrl);

if ($response === FALSE) {
    echo "Failed to fetch order data.";
    exit;
}

$order = json_decode($response, true);

if (!$order) {
    echo "Invalid JSON response.";
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Order Summary</title>
</head>
<body>
    <h1>Order Summary</h1>
    <p><strong>Order ID:</strong> <?php echo htmlspecialchars($order['id']); ?></p>
    <p><strong>Customer:</strong> <?php echo htmlspecialchars($order['customerName'] ?? 'N/A'); ?></p>
    <p><strong>Total:</strong> ₹<?php echo htmlspecialchars($order['totalAmount'] ?? '0.00'); ?></p>
    <p><strong>Status:</strong> <?php echo htmlspecialchars($order['status'] ?? 'N/A'); ?></p>

    <h3>Items:</h3>
    <ul>
        <?php foreach ($order['items'] as $item): ?>
            <li><?php echo htmlspecialchars($item['name']); ?> (x<?php echo $item['quantity']; ?>)</li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
