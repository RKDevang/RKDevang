<%@page import="dao.Dao"%>
<%@page import="model.WishlistModel"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="ISO-8859-1">
    <title>Add To Wishlist Page</title>

    <style>
        /* Wishlist Box */
        .center-box {
            width: 350px; /* Adjust as needed */
            padding: 20px;
            border: 2px solid #f2db18;
            border-radius: 10px;
            text-align: center;
            background: #fff;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            margin: 20px auto;
        }

        /* Wishlist Button - Text Centered Properly */
        .swd-button {
            background: #f2db18;
            border: none;
            border-radius: 8px;
            color: #ffffff;
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
            width: 220px;  /* Button width */
            height: 50px;  /* Button height */
            margin: 20px auto;
            display: flex;
            justify-content: center;  /* Horizontally center text */
            align-items: center;  /* Vertically center text */
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }

        .swd-button:hover {
            background-color: #000;
            color: #fff;
            transform: scale(1.1);
        }

        /* Product Image */
        .product-image {
            width: 150px;
            height: 200px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

    <jsp:include page="header.jsp"/>

    <%
        String id = request.getParameter("id");
        int id2 = Integer.parseInt(id);
        WishlistModel wm = Dao.getproductindexwise(id2);
    %>

    <center>
        <div class="center-box">
            <img src="data:image/jpeg;base64,<%=wm.getP_image()%>" class="product-image" />
            <br>
            <b>Product Name: </b> <p><%=wm.getP_name() %></p>
            <b>Product Price: </b> <p><%=wm.getP_price() %></p>
            <b>Product Description: </b> <p><%=wm.getP_des() %></p> 

            <form action="imageSave2" enctype="multipart/form-data" method="post">
                <input type="hidden" name="id" value="<%=wm.getId() %>">
                <input type="hidden" name="p_name" value="<%=wm.getP_name()%>">
                <input type="hidden" name="p_price" value="<%=wm.getP_price()%>">
                <input type="hidden" name="p_des" value="<%=wm.getP_des()%>">
                <input type="hidden" name="p_image" value="data:image/jpeg;base64,<%=wm.getP_image() %>"> 
                <input type="hidden" name="email" value="<%=session.getAttribute("email") %>">
                
                <button type="submit" class="swd-button">Appointment</button>    
            </form>
        </div>
    </center>

    <jsp:include page="footer.jsp"/>

</body>
</html>
