<%@page import="dao.Dao"%>
<%@page import="model.AdminModel"%>


<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<jsp:useBean id="m" class="model.AdminModel"/>
<jsp:setProperty property="*" name="m"/>    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


<%
		AdminModel m2 = Dao.adminlogincheck(m);
		System.out.print(m2.getUsername());
		
		if(m2!=null)
		{
			session.setAttribute("projectadmin",true);
			response.sendRedirect("admindashboard.jsp");
		}
		
		else
		{
	%>
	
			<center>
			
				<b>
				<p style="color:red;font-family: sans-serif; font-size: 25px;">Login Failed! Please Try Again</p>
				</b>
				
			</center>
			<br>
			<br>
			
			<%@ include file="adminlogin.jsp"%>
			
	<% 		
		}
	%>


</body>
</html>