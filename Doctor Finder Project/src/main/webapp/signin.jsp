<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>SignIn Page</title>
</head>
<body>

	<%
    
	    response.setHeader("cache-control", "no-cache");
	    response.setHeader("cache-control", "no-store");
	    response.setHeader("pragma", "no-cache");
	    response.setDateHeader("Expires", 0);
    
    %>
	

<jsp:include page="header.jsp"/>

	<div class="card bg-light">
		<article class="card-body mx-auto" style="max-width: 400px;">
		<h4 class="card-title mt-3 text-center">Login With Your Account</h4>
		
		
		
		<form name="registrationForm" action="login.jsp"  method="get" onsubmit="return validateForm()">
			
			<!-- form-group// -->
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-envelope"></i>
					</span>
				</div>
				<input name="email" class="form-control" placeholder="Email address"
					type="email" id="email" onblur="verifyEmail()">
					
			</div>
			
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-lock"></i>
					</span>
				</div>
				<input class="form-control" placeholder="Enter password"
					type="password" name="password" id="password">
			</div>
			
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-block">
					Login</button>
			</div>
			<!-- form-group// -->
			<p class="text-center">
			Do you want to <a href="signup.jsp">Sign up?</a>
			</p>
		</form>
		<span id="tops"></span>
		</article>
	</div>
	<!-- card.// -->
	
	
	
<jsp:include page="footer.jsp"/>




</body>
</html>