<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
</head>
<body>
    <h2>Reset Password</h2>
    <form action="UserServlet" method="post">
        Enter Email: <input type="email" name="email" required><br>
        <input type="submit" value="Send OTP">
    </form>
</body>
</html>
