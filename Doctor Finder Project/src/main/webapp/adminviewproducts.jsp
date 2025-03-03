<%@page import="dao.Dao"%>
<%@page import="model.ProductModel"%>
<%@page import="java.util.List"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin View Panel</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  
  
  <!-- Custom CSS -->
 <style>
    .product-view-container {
        font-family: Arial, Helvetica, sans-serif;
        margin: 20px auto;
        width: 90%;
        max-width: 1200px;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .product-view-title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
        border-bottom: 2px solid #f4f4f4;
        padding-bottom: 10px;
    }

    .product-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }

    .product-table th {
        background-color: #343a40;
        color: #ffffff;
        font-size: 16px;
        text-align: center;
        padding: 15px;
    }

    .product-table td {
        text-align: center;
        font-size: 14px;
        padding: 15px;
        color: #555;
        background-color: #f9f9f9;
        border-bottom: 1px solid #ddd;
    }

    .product-table tr:nth-child(even) td {
        background-color: #f4f4f4;
    }

    .product-table tr:hover td {
        background-color: #e0e0e0;
        color: #333;
    }

    .product-table img {
        max-width: 100px;
        max-height: 100px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 768px) {
        .product-view-container {
            padding: 10px;
        }

        .product-table th, .product-table td {
            padding: 10px;
            font-size: 12px;
        }

        .product-table img {
            max-width: 70px;
            max-height: 70px;
        }
    }
</style>

<style>
    /* Add custom styles here */
    body {
      background-color: #f4f4f4;
    }
    .sidebar {
      background-color: #343a40;
      color: white;
      height: 100vh;
    }
    .content {
      padding: 20px;
    }
</style>


  

  
</head>
<body>

<%
    
	    response.setHeader("cache-control", "no-cache");
	    response.setHeader("cache-control", "no-store");
	    response.setHeader("pragma", "no-cache");
	    response.setDateHeader("Expires", 0);
    
    %>

<%
	if(session.getAttribute("projectadmin")!=null)
	{
		
	
	

%>

  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-2 sidebar">
        <div class="pt-3">
          <h2>Admin Panel</h2>
          
          
          
          <ul class="nav flex-column mt-3">
            <li class="nav-item">
              <a class="nav-link" href="adminaddproducts.jsp" style="color: white;">Add Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="adminviewproducts.jsp" style="color: white;">View All Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="adminplacedorder.jsp" style="color: white;">Placed Order</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="admincontacted.jsp" style="color: white;">Queries</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="adminlogout.jsp" style="color: red;">Logout</a>
            </li>
            
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-md-9 col-lg-10 content">
       
        <h2>Welcome to the Admin Panel</h2>
       	 
       	 
        <!-- Add your content here -->
        
        
        
<div class="product-view-container">
    <div class="product-view-title">"Admin View Product"</div>
    <table class="product-table">
       
       
       
        <thead>
            <tr>
            
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>Product Image</th>
                <th colspan="2">Product Action</th>
            </tr>
        </thead>
        <tbody>
        
        <%
        	List<ProductModel>list = Dao.viewproducts();
		
			for(ProductModel m : list)
			{
        		
        %>
        	<%-- 	
        		<tr>
        		
        		<td><%=m.getP_name()%></td>
        		<td><%=m.getP_price()%></td>
        		<td><%=m.getP_des()%></td>
        		<td><img src="data:image/jpeg;base64,<%=m.getP_image()%>" width="150px" height="200px"/></td>
        		
        		<td>
                    <form action="" method="get">
                        <input type="hidden" name="id" value="<%= m.getId() %>">
                        <a href="adminproductedit.jsp?id=<%=m.getId()%>"><img src="images/edit.png" width="30px" height="30px"/></a></input>
                        
                       
            	</td>
                        
                    </form>
            	</td>
            	<td>
                   
                    <a href="adminproductdelete.jsp?id=<%=m.getId()%>"><img src="images/delete.png" width="30px" height="30px"/></a></input>
                    
                 </td>	
        		
 				</tr>
 					       --%> 
 					       
 					       <tr>
				</td><td><%=m.getP_name() %></td><td><%=m.getP_price() %></td><td><%=m.getP_des() %></td><td><img src="data:image/jpeg;base64,<%=m.getP_image()%>" width="150px" height="200px" /></td>
				 <td>
                   <%--  <form action="" method="get">
                        <input type="hidden" name="id" value="<%= m.getId() %>">
                        <a href=""><img src="images/edit1.png" width="20px" height="20px"/></a>
                    </form> --%>
                    
           <a href="adminproductedit.jsp?id=<%=m.getId()%>"><img src="images/edit.png" width="20px" height="20px"/></a></input>
                    
            	</td>
            	<td>
                   
                    <a href="adminproductdelete.jsp?id=<%=m.getId()%>"><img src="images/delete.png" width="20px" height="20px"/></a></input>
                 </td>	
			</tr>	
			
					
        <% 
        
			}
        	%>
        
           
        </tbody>
    </table>
    
    <%
				}
			%>
</div>
        
        
        
      </div>
    </div>
  </div>

  <!-- Bootstrap JS and dependencies -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
    