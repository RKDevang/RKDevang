
<%@page import="dao.Dao"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:useBean id="m" class="model.ContactModel"/>
<jsp:setProperty property="*" name="m"/>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


	<%
		String option = request.getParameter("statusoption");
		String id = request.getParameter("id");
		int id2 = Integer.parseInt(id);
		
	
		int status = Dao.updatequerystatus(option, id2);
		
		if(status>0)
		{			
			response.sendRedirect("admincontacted.jsp");
		}
		else 
		{
			System.out.println("error");
		}		
	%>
		


</body>
</html>