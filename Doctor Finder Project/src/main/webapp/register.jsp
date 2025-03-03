<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>

<%@page import="dao.Dao"%>



<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:useBean id="m" class="model.SignupModel"/>
<jsp:setProperty property="*" name="m"/>  
  
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Register Page</title>
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
    		String name = request.getParameter("fullname");
    		String phone = request.getParameter("phone");
    		String pass = request.getParameter("password");
    		String repass = request.getParameter("repassword");
    		
    		session.setAttribute("myname",name);
    		session.setAttribute("myemail",email);
			session.setAttribute("myphone",phone);
			session.setAttribute("mypass",pass);
    		
    
    		if(pass.equals(repass))
    		{
    			try
    			{
    				Class.forName("com.mysql.jdbc.Driver");
    	    		Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/ecom","root","");  
    	    		PreparedStatement ps=con.prepareStatement("select * from users where email=?");  
    	    		ps.setString(1, email);
    	    		ResultSet rs=ps.executeQuery();  
    	    		
    	    		if(rs.next()) 
    	      		{    
    	  %>
    	  
    	  <center>
				
				<b><p style="color:red;font-family: sans-serif; font-size: 25px;">Email Id Already exits, try entering new Email Address.</p></b>
			</center>

			<br>
			<br>
			<%@ include file="signup.jsp"%>
    	  
    	  <% 
    	    			
    	      		}
    	    		else
    	      		{
    	      			
    	      			int number11 = 1 + (int)(9* Math.random());
    	      			int number22 = 1 + (int)(9* Math.random());
    	      			int number33 = 1 + (int)(9* Math.random());
    	      			int number44 = 1 + (int)(9* Math.random());
    	      			
    	      			
    	      			System.out.print(number11+" "+number22+" "+number33+" "+number44);
    	      	     	
    	      			
    	      			 RequestDispatcher rd = request.getRequestDispatcher("EmailSendingServlet");
    	      			 session.setAttribute("e1", email);
    	      			 session.setAttribute("n1",number11);
    	      			 session.setAttribute("n2",number22);
    	      			 session.setAttribute("n3",number33);
    	      			 session.setAttribute("n4",number44);
    	      		     rd.forward(request, response);
    	      		}
    	    		
    			}
    			catch(Exception e)
    			{
    				e.printStackTrace();
    			}
    		}
    		else
    		{
    			
    	%>
    	
    	  <center>
				
				<b><p style="color:red;font-family: sans-serif; font-size: 25px;">Password and Confirm password are not same.</p></b>
			</center>

			<br>
			<br>
			<%@ include file="signup.jsp"%>		
    			
    			
    	<% 		
    		}
    		
    	%>	
    
    	
    		
      	
	


</body>
</html>