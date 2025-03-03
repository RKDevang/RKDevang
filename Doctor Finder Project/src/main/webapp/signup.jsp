<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">

<title>Sign Up</title>

<script>

    function validateForm() 
    
    {
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const repassword = document.getElementById("repassword").value.trim();

        if (fullname ==="")
        {
            alert("Please Enter Your Full Name.");
            
            return false;
        }

        
         const allowedDomain =".com"; // Replace with your domain
            if (!email.endsWith(allowedDomain)) {
                alert("Invalid email domain. Please use an email ending with" +allowedDomain);
                return false;
            }


        const phoneRegex =/^[0-9]{10}$/;
        
        if (!phoneRegex.test(phone)) 
        {
            alert("Phone Enter 10 Digit Number.);
            return false;
        }

        
        if (password.length<6) 
        {
            alert("Password Required At Least 6 Character.");
            return false;
        }

        if (password !== repassword) 
        
        {
            alert("Password And Repassword Do Not Match.");
            
            return false;
            
        }
        return true;
    }

    function verifyEmail() 
    {
        const email = document.getElementById("email").value.trim();
        const allowedDomain = ".com"; // Replace with your domain

        if (!email.endsWith(allowedDomain)) 
        {
            document.getElementById("email").style.borderColor = "red";
            alert("Invalid email domain. Please use an email ending with " + allowedDomain);
        } 
        
        else 
        
        {
            document.getElementById("email").style.borderColor ="green";
        }
        
    }
</script>
</script>



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
		<h4 class="card-title mt-3 text-center">Create Account</h4>
		<p class="text-center">Get started with your free account</p>
		
		
		<form name="registrationForm" action="register.jsp"  method="get" onsubmit="return validateForm()">
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-user"></i>
					</span>
				</div>
				<input name="fullname" class="form-control" placeholder="Full name"
					type="text" id="fullname">
			</div>
			<!-- form-group// -->
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-envelope"></i>
					</span>
				</div>
				<input name="email" class="form-control" placeholder="Email address"
					type="email" id="email" onblur="verifyEmail()">
					
			</div>
			<!-- form-group// -->
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-phone"></i>
					</span>
				</div>
				<select class="custom-select" style="max-width: 120px;">
					<option selected="">+91</option>
					<option value="1">+1</option>

				</select> <input name="phone" class="form-control"
					placeholder="Phone number" type="text" id="phone">
			</div>
			<!-- form-group// -->
			
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-lock"></i>
					</span>
				</div>
				<input class="form-control" placeholder="Create password"
					type="password" name="password" id="password">
			</div>
			<!-- form-group// -->
			<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"> <i class="fa fa-lock"></i>
					</span>
				</div>
				<input name="repassword" class="form-control"
					placeholder="Repeat password" type="password" id="repassword">
			</div>
			<!-- form-group// -->
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-block">
					Create Account</button>
			</div>
			<!-- form-group// -->
			<p class="text-center">
				Have an account? <a href="signin.jsp">Log In</a>
			</p>
		</form>
		<span id="tops"></span>
		</article>
	</div>
	<!-- card.// -->
	

<jsp:include page="footer.jsp"/>
</body>
</html>