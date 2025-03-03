<%@page import="java.util.List"%>
<%@page import="dao.Dao"%>
<%@page import="model.ContactModel"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Admin Contacted Page</title>

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
          <h2>User Queries</h2>
    
        <tbody>
            <tr>
            
                <th>Full Name</th>
                <th>Email</th>
                <th>Query</th>
                <th colspan="2">Actions</th>
               
            </tr>
        </thead>
        <tbody>



</head>
<body>

   

  
            <%-- <%
                List<ContactModel> list = Dao.getAllContacts();
                if (list != null) 
                	
                	
                	
                
                {
                    for (ContactModel m : list) {
            %> --%>
            
             <%
			List<ContactModel> list = Dao.getAllContacts();
			for(ContactModel m : list)
			{
				
				String data = m.getStatus();//Pending
				String data2="";
				if(data.equals("Pending"))
				{
					data2 = "resolved";
				}
				else
				{
					data2 = "Pending";
				}
				
			%>
	<tr>			
				<form action="updatequerystatus.jsp" method="post">
				</td><td><%=m.getFullname() %></td><td><%=m.getEmail() %></td><td><%=m.getQuery() %></td><td>
				
				<select name="statusoption">
					<option value="<%=data%>"><%=data%></option>
					<option value="<%=data2%>"><%=data2%></option>					
				</select>
				
				<input type="hidden" name="id" value="<%=m.getId() %>">
				<input type="submit" value="update">				
				</td>	
				</form>
			</tr>	
			
			<%
				}
			%>
         </tbody>
      </table>
      <%
		}
		else
		{
			response.sendRedirect("adminlogin.jsp");
		}
      %> 	 
       
        </tbody>
    </table>
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
    