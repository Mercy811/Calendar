<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xytCalendar-Signup</title>
    <link rel="stylesheet" href="form.css" >
</head>

<body>
    <h1>Create New Account</h1>
    <div>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
            <p>
            <input type="text" placeholder="username" id="username" name="username">
            </p>

            <p>
            <input type="password" placeholder="password" id="password" name="password">
            </p>
            
            <p>
            <input type="password" placeholder="re-enter password" id="repassword" name="repassword">
            </p>

            <p>
            <button type="submit" name="signup">signup</button>
            </p>
            
        </form>
    </div>

    <div>
        <p>
        <form action="login.php">
            <button type="submit" name="login">login</button>
        </form>
        </p>
    </div>

    <div>
        <p>
            <!-- TO DO :Guest -->
        <form action="">
            <button type="submit" name="guest">Login as guest</button>
        </form>
        </p>
    </div>

    <p class="msg">
        <?php
        require 'database.php';

        $username = $_POST['username'];
        $password = $_POST['password'];
        $repassword = $_POST['repassword'];

        $msg = '';

        if (isset($_POST['signup'])) {
            if (!empty($username)) {
                if ($password == $repassword) {
                    $hash = password_hash($password, PASSWORD_BCRYPT);
                    $stmt = $mysqli->prepare("insert into users 
                    (username, password) 
                    values (?,?)");
                    if (!$stmt) {
                        $msg = "mysql error";
                        echo $msg;
                        exit;
                    }else{
                        $msg = "Signup Successfullly";
                    }

                    $stmt->bind_param('ss', $username, $hash);

                    $stmt->execute();

                    $stmt->close();
                } else {
                    $msg = "Passwords do not match!";
                }
            } else {
                $msg = "Please enter username";
            }
        }
        echo $msg

        ?>
    </p>
</body>

</html>