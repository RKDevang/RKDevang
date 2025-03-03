<%@page import="model.SignupModel"%>
<%@page import="dao.Dao"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%

	//user input
	String o1 = request.getParameter("otp");
	String o2 = request.getParameter("otp2");
	String o3 = request.getParameter("otp3");
	String o4 = request.getParameter("otp4");
	
	int o11 = Integer.parseInt(o1);
	int o22 = Integer.parseInt(o2);
	int o33 = Integer.parseInt(o3);
	int o44 = Integer.parseInt(o4);
	
	
	//automatic
	String m1 = session.getAttribute("n1").toString();
	String m2 = session.getAttribute("n2").toString();
	String m3 = session.getAttribute("n3").toString();
	String m4 = session.getAttribute("n4").toString();
	
	int m11 = Integer.parseInt(m1);
	int m22 = Integer.parseInt(m2);
	int m33 = Integer.parseInt(m3);
	int m44 = Integer.parseInt(m4);
	
	String a = session.getAttribute("myname").toString();
	String b =session.getAttribute("myemail").toString();
	String c =session.getAttribute("myphone").toString();
	String d =session.getAttribute("mypass").toString();
	
	SignupModel m = new SignupModel();
	m.setFullname(a);
	m.setEmail(b);
	m.setPhone(c);
	m.setPassword(d);
	
	
	if(m11==o11 && m22 == o22 && m33 == o33 && m44 == o44)
	{
		
		int status = Dao.signupuser(m);
		if(status>0)
		{
			response.sendRedirect("signin.jsp");
			
		}
		else
		{
	%>
		<center>
				
				<b><p style="color:red;font-family: sans-serif; font-size: 25px;">Signup Failed.</p></b>
			</center>

			<br>
			<br>
			<%@ include file="signup.jsp"%>	
	
	<% 		
		}
		
		
	}
	else
	{
%>

  	  <center>
				
				<b><p style="color:red;font-family: sans-serif; font-size: 25px;">OTP is wrong.</p></b>
			</center>

			<br>
			<br>
			<%@ include file="otpsend.jsp"%>	
<% 				
  			
	
	}
	
	
%>


</body>
</html>