<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>xytCalendar-Login</title>
<link rel="stylesheet" href="form.css" >
</head>

<body>
    <h1> Login </h1>



<?php
    session_start();
    
    require 'database.php';
    $user_input = $_POST['username'];
    $pwd_input = $_POST['password'];
    
    if(isset($_SESSION['username'])){
        header("Location: stories.php");
        exit;
    }

    if ( isset($_POST['submit']) ) {
        if(empty($_POST['username'])) {
            echo "<script>alert('Empty Input. Please type a valid username.');</script>";
            session_destroy();
            header("refresh:0; url='login.php'"); 
            exit;
        }

        if(empty($pwd_input)) {
            echo "<script>alert('Empty Password. Please type your password.');</script>";
            session_destroy();
            header("refresh:0; url='login.php'");
            exit;
        }



        $stmt = $mysqli->prepare("select user_id, password from users where username = ?");
    
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $stmt->bind_param ('s', $user_input);
        $stmt->execute();

        $stmt->bind_result($user_id, $password);

        echo "<ul>\n";
        while($stmt->fetch()){
        printf("\t<li>%s %s</li>\n",
            htmlspecialchars($user_id),
            htmlspecialchars($password)
        );
    }



        $stmt->close();

        if (password_verify($pwd_input, $password))
        {
            $_SESSION['username'] = $user_input;
            $_SESSION['user_id'] = $user_id;
            header ("Location: stories.php");
            exit;
        }
        else {
            echo "<script>alert('Wrong password! Please enter again.');</script>";
            session_destroy();
            header("refresh:0; url='login.php'");


        }

}



?>


<div>
        <form action="login.php" method="POST">
            
            <p>
                <label for="usernameinput">Username: </label>
                <input type="text" name='username' id="usernameinput" />
            </p>

            <p>
                <label for="passwordinput">Password: </label>
                <input type="password" name='password' id="passwordinput" />
            </p>
        
            <p>
                <input type="submit" value="Login" name="submit" />
                <input type="reset" value="Reset"/>
            </p>
        </form>
        </div>


        <form action='signup.php'>
                    <input type="submit" value="Sign Up Here" />
        </form>
       
        <form action="stories.php">
            <input type="submit" name="guest" value="Login as guest">
        </form>
        
        
</body>
</html>