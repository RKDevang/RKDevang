<%@page import="dao.Dao"%>
<%@page import="model.SignupModel"%>
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
    
	    response.setHeader("cache-control", "no-cache");
	    response.setHeader("cache-control", "no-store");
	    response.setHeader("pragma", "no-cache");
	    response.setDateHeader("Expires", 0);
    
    %>
	
	<jsp:include page="header.jsp"/>

	<div class="card bg-light">
		<article class="card-body mx-auto" style="max-width: 400px;">
	
		
		<%
			
			if(session.getAttribute("project")!=null)
			{
		%>
		
		
		
		<form action="contactinsert.jsp" method="post">
			
			
			<!-- form-group// -->
			<div class="form-group input-group">
				
				<input name="email" class="form-control" placeholder="Email address"
					type="email" id="email" value="<%=session.getAttribute("email")%>">
					
			</div>
			
			<div class="form-group input-group">
				
				<input name="fullname" class="form-control" placeholder="Enter Name"
					type="text" id="fullname" value="<%=session.getAttribute("fullname")%>">
					
			</div>
			
			<div class="form-group input-group">
				
				<!-- <textarea name="query" class="form-control" placeholder="Query"
					 id="query"> -->
					 
				<input name="query" class="form-control" placeholder="Enter Query"
					type="text" id="query">
					
			</div>
			
			
			
			
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-block">
					Submit Query</button>
			</div>
			
			
		</form>
		
		<% 		
			}
			else
			{
				
			
		
		%>
		
		
		
		
		
		
		<form action="https://api.web3forms.com/submit" method="post">
			
			 <input type="hidden" name="access_key" value="c07abbbb-c3a8-45a4-96be-811c650f4ea5">
			
			<!-- form-group// -->
			<div class="form-group input-group">
				
				<input name="email" class="form-control" placeholder="Email address"
					type="email" id="email">
					
			</div>
			
			<div class="form-group input-group">
				
				<input name="fullname" class="form-control" placeholder="Enter Name"
					type="text" id="fullname" >
					
			</div>
			
			<div class="form-group input-group">
				
				<!-- <textarea name="query" class="form-control" placeholder="Query"
					 id="query"> -->
					 
				<input name="query" class="form-control" placeholder="Enter Query"
					type="text" id="query">
					
			</div>
			
			
			
			
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-block">
					Submit Query</button>
			</div>
			
			
		</form>
		
	<!-- card.// -->
	
	<%
			}
	%>

<span id="tops"></span>
		</article>
	</div>
<jsp:include page="footer.jsp"/>


	
	
		

</body>
</html>