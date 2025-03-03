<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <h2>User Registration</h2>
    <form action="UserServlet" method="post">
        First Name: <input type="text" name="firstName" required><br>
        Last Name: <input type="text" name="lastName" required><br>
        Email: <input type="email" name="email" id="email" required>
        <span id="emailError" style="color:red;"></span><br>
        Mobile: <input type="text" name="mobile" required><br>
        Address: <textarea name="address" required></textarea><br>
        Gender: 
        <input type="radio" name="gender" value="Male" required> Male
        <input type="radio" name="gender" value="Female" required> Female<br>
        Password: <input type="password" name="password" id="password" required><br>
        Confirm Password: <input type="password" id="confirmPassword" required><br>
        <input type="submit" value="Register">
    </form>

    <script>
        // Check if email already exists (AJAX)
        $("#email").on("blur", function() {
            let email = $(this).val();
            $.ajax({
                url: "UserServlet",
                type: "GET",
                data: { action: "checkEmail", email: email },
                success: function(response) {
                    if (response == "exists") {
                        $("#emailError").text("Email already registered!");
                    } else {
                        $("#emailError").text("");
                    }
                }
            });
        });

        // Validate password match
        $("form").on("submit", function(e) {
            if ($("#password").val() !== $("#confirmPassword").val()) {
                alert("Passwords do not match!");
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
