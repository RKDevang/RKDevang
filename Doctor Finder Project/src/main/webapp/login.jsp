



<%@page import="dao.Dao"%>
<%@page import="model.SignupModel"%>



<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login Page</title>
</head>
<body>

	<%
    
	    response.setHeader("cache-control", "no-cache");
	    response.setHeader("cache-control", "no-store");
	    response.setHeader("pragma", "no-cache");
	    response.setDateHeader("Expires", 0);
    
    %>
	


	<%
	
		String email = request.getParameter("email");
		String pass = request.getParameter("password");
		
		
		SignupModel m = new SignupModel();
		m.setEmail(email);
		m.setPassword(pass);
		
		SignupModel m2 = Dao.loginuser(m);
	
		if(m2!=null)
		{
			
			session.setAttribute("project", true);
			session.setAttribute("id",m2.getId());
			session.setAttribute("fullname",m2.getFullname());
			session.setAttribute("email",m2.getEmail());
			session.setAttribute("phone",m2.getPhone());
			
			response.sendRedirect("dashboard.jsp");
			
			
		}
		
		
		else
			
		{
			
	%>
	
	
			<center>
				
				<b><p style="color:red;font-family: sans-serif; font-size: 25px;">Login Failed!!! Please Try Again.</p></b>
			</center>

			<br>
			<br>
			<%@ include file="signin.jsp"%>
			
			
			<% 	
			
			}
				
			%>

</body>
</html>