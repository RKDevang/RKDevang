

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
		String id = request.getParameter("id");
		int id2 = Integer.parseInt(id);
		
		int status = Dao.deletefromadminproduct(id2);
		
		if(status>0)
		{
			response.sendRedirect("adminviewproducts.jsp");
		}
		else
		{
			out.print("something went wrong");
		}
		
	%>

</body>
</html>