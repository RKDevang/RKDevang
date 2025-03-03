<%@page import="dao.Dao"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:useBean id="m" class="model.ContactModel"/>
<jsp:setProperty property="*" name="m"/>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Contact Insert Page</title>
</head>
<body>


<%
		int status = Dao.contactinsert(m);
		if(status>0)
		{
			response.sendRedirect("contact.jsp");
		}
		else
		{
			out.print("Fail");
		}
		
	%>
		


</body>
</html>