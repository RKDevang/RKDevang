<%@page import="model.CartModel"%>
<%@page import="dao.Dao"%>
<%@page import="model.WishlistModel"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Add To Cart From Wishlist</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .product-container {
            width: 90%;
            max-width: 400px;
            margin: 30px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: 0.3s;
        }
        .product-container:hover {
            transform: scale(1.05);
        }
        .product-container img {
            width: 150px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        .product-container p {
            margin: 8px 0;
            font-size: 16px;
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
    width: auto; /* Change from 100% to auto */
    min-width: 150px; /* Ensures the button has a good size */
    cursor: pointer;
    transition: 0.3s;
    margin-top: 10px;
    display: block; /* Ensures it's a block element */
    margin-left: auto; /* Centers horizontally */
    margin-right: auto; /* Centers horizontally */
}

        .swd-button:hover {
            background: #e0c50f;
        }
    </style>
</head>
<body>

<jsp:include page="header.jsp"/>

<%
    String id = request.getParameter("id");
    int id2 = Integer.parseInt(id);
    WishlistModel wm = Dao.getproductindexwise3(id2);
%>

<div class="product-container">
    <img src="data:image/jpeg;base64,<%=wm.getP_image()%>" alt="Product Image">
    <br><br>
    <b>Product Name: </b><p><%=wm.getP_name()%></p>
    <b>Product Price: </b><p>₹<%=wm.getP_price()%></p>
    <b>Product Description: </b><p><%=wm.getP_des()%></p> 
    
    <form action="imageSave4" enctype="multipart/form-data" method="post">
        <input type="hidden" name="id" value="<%=wm.getId()%>">
        <input type="hidden" name="p_name" value="<%=wm.getP_name()%>">
        <input type="hidden" name="p_price" value="<%=wm.getP_price()%>">
        <input type="hidden" name="p_des" value="<%=wm.getP_des()%>">
        <input type="hidden" name="p_image" value="data:image/jpeg;base64,<%=wm.getP_image()%>"> 
        <input type="hidden" name="email" value="<%=session.getAttribute("email")%>">
        
        <button type="submit" class="swd-button">Book Appointment</button>
    </form>
</div>

<jsp:include page="footer.jsp"/>

</body>
</html>
