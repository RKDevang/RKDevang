<%@page import="dao.Dao"%>
<%@page import="model.CartModel"%>
<%@page import="java.util.List"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Cart Page</title>

<style>
    /* Beautiful background */
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #ffecd2, #fcb69f);
        margin: 0;
        padding: 0;
    }

    /* Centered product grid */
    .product-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px;
        gap: 20px;
    }

    /* Stylish product box */
    .product {
        background: white;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 15px;
        text-align: center;
        width: 250px;
        transition: transform 0.3s ease-in-out;
    }

    /* Hover effect */
    .product:hover {
        transform: scale(1.05);
    }

    /* Product image */
    .product img {
        max-width: 150px;
        height: 200px;
        border-radius: 5px;
    }

    /* Stylish buttons */
    .swd-button {
        background: linear-gradient(45deg, #ff6b6b, #ff8e53);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 12px 15px;
        width: 90%;
        max-width: 200px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto;
    }

    /* Button hover effect */
    .swd-button:hover {
        background: linear-gradient(45deg, #ff8e53, #ff6b6b);
        transform: scale(1.1);
    }

    /* Text Styling */
    p {
        margin: 5px 0;
        font-size: 16px;
        color: #333;
    }

    b {
        color: #444;
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
    if(session.getAttribute("project")!=null) {
%>

<jsp:include page="header.jsp"/>

<div class="product-grid">

<%
    List<CartModel> list = Dao.cartviewproducts(session.getAttribute("email").toString());
    for(CartModel m : list) {
%>

    <div class="product">
        <img src="data:image/jpeg;base64,<%=m.getP_image()%>" alt="Product Image"/>
        <br><br>
        <b>Product Name:</b> <p><%=m.getP_name()%></p>
        <b>Product Price:</b> <p>₹<%=m.getP_price()%></p>
        <b>Product Description:</b> <p><%=m.getP_des()%></p>

        <!-- Payment Button -->
        <form action="payment.jsp">
            <input type="hidden" name="id" value="<%=m.getId()%>">
            <input type="submit" class="swd-button" value="Proceed to Payment">
        </form>

        <!-- Remove Button -->
        <form action="cartdelete.jsp">
            <input type="hidden" name="id" value="<%=m.getId()%>">
            <input type="submit" class="swd-button" value="Remove from Appointment">
        </form>
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
