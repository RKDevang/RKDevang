<%@page import="model.CartModel"%>
<%@page import="dao.Dao"%>
<%@page import="model.WishlistModel"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Add To Cart</title>
</head>
<body>

	<jsp:include page="header.jsp"/>
	
	

		<%
			String id = request.getParameter("id");
			int id2 = Integer.parseInt(id);
			
			CartModel wm =Dao.getproductindexwise2(id2);
			
		%>
	
	
	<br>
	<br>
	
	<center>
		 <img src="data:image/jpeg;base64, <%=wm.getP_image()%>"  width="150px" height="200px"/>
		<br> <br>
		<b>Product Name: </b><p><%=wm.getP_name() %></p>
		<b>Product Price: </b><p><%=wm.getP_price() %></p>
		<b>Product Description: </b><p><%=wm.getP_des() %></p> 
	
	
		<form action="imageSave3" enctype="multipart/form-data" method="post">
				
				<p>
					<input type=hidden name="id" value="<%=wm.getId() %>">
				</p>
				
				<p>
					<input type=hidden name="p_name" value="<%=wm.getP_name()%>">
				</p>
				
				<p>
					<input type=hidden name="p_price" value="<%=wm.getP_price()%>">
				</p>
				
				<p>
					<input type=hidden name="p_des" value="<%=wm.getP_des()%>">
				</p>
				
				<p>
					<input type="hidden" name="p_image" value="data:image/jpeg;base64,<%=wm.getP_image() %>" /> 
				</p>
				
				<p>
					<input type=hidden name="email" value="<%=session.getAttribute("email") %>">
				</p>
				
				<p>
					<input type="submit" class="swd-button" value="Add to Cart">
						
				</p>
					
				
				
			</form>
				
			</center>
				
				
				
				
				
		<jsp:include page="footer.jsp"/>
	
	
</body>
</html>