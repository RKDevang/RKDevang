<%@page import="dao.Dao"%>
<%@page import="model.WishlistModel"%>
<%@page import="java.util.List"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Wishlist Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Increased min width */
            gap: 20px;
            padding: 20px;
        }
        .product {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: 0.3s;
        }
        .product:hover {
            transform: scale(1.05);
        }
        .product img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
        }
        .product p {
            margin: 8px 0;
            font-size: 16px;
        }
        .button-container {
            display: flex;
            flex-direction: column; /* Stack buttons vertically */
            align-items: center;
            margin-top: 15px;
        }
        .swd-button {
            background: #f2db18;
            border: none;
            border-radius: 5px;
            color: white;
            font: bold 14px Arial, Helvetica, sans-serif;
            padding: 12px 20px;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            width: 80%; /* Increased width */
            margin: 8px 0;
            cursor: pointer;
            transition: 0.3s;
        }
        .swd-button:hover {
            background: #e0c50f;
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
    if(session.getAttribute("project") != null) {
%>

<jsp:include page="header.jsp"/>
<div class="product-grid">
    <%
        List<WishlistModel> list = Dao.wishlistviewproducts(session.getAttribute("email").toString());
        for (WishlistModel m : list) {
    %>
    <div class="product">
        <img src="data:image/jpeg;base64,<%=m.getP_image()%>" width="150px" height="200px" />
        <br><br>
        <b>Product Name: </b><p><%=m.getP_name()%></p>
        <b>Product Price: </b><p><%=m.getP_price()%></p>
        <b>Product Description: </b><p><%=m.getP_des()%></p>
        
        <div class="button-container">
            <form action="addtocartfromwishlist.jsp">
                <input type="hidden" name="id" value="<%=m.getId()%>">
                <button type="submit" class="swd-button">Booking Appointment</button>
            </form>
            <form action="wishlistdelete.jsp">
                <input type="hidden" name="id" value="<%=m.getId()%>">
                <button type="submit" class="swd-button">Remove From Booking</button>
            </form>
        </div>
    </div>
    <%
        }
    %>

    <%
    } else {
        response.sendRedirect("index.jsp");
    }
    %>
</div>

<jsp:include page="footer.jsp"/>

</body>
</html>
