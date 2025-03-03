<%@page import="dao.Dao"%>
<%@page import="model.ProductModel"%>
<%@page import="java.util.List"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Product Page</title>

    <style>
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            grid-gap: 20px;
            padding: 20px;
        }

        .product {
            border: 1px solid #ccc;
            padding: 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            min-height: 420px; /* Increased height */
            position: relative;
        }

        .product img {
            max-width: 150px;
            max-height: 150px;
            border-radius: 5px;
        }

        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* Centers the buttons properly */
            width: 100%;
            margin-top: auto;
        }

        .swd-button {
            background: #f2db18;
            border: none;
            border-radius: 5px;
            color: black;
            font: bold 14px Arial, Helvetica, sans-serif;
            padding: 10px;
            text-decoration: none;
            text-transform: uppercase;
            width: 90%;
            max-width: 200px;
            text-align: center;
            cursor: pointer;
            margin: 8px 0; /* Adds equal spacing */
            transition: 0.3s;
            display: flex;
            justify-content: center; /* Ensures text stays in center */
            align-items: center;
        }

        .swd-button:hover {
            background: #000;
            color: white;
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
    if (session.getAttribute("project") != null) {
%>

    <jsp:include page="header.jsp"/>

    <div class="product-grid">

        <%
            List<ProductModel> list = Dao.viewproducts();
            for (ProductModel m : list) {
        %>

        <div class="product">
            <img src="data:image/jpeg;base64,<%=m.getP_image()%>" alt="Doctor Image" />
            <br>
            <b>Doctor Name: </b> <p><%=m.getP_name()%></p>
            <b>Booking Appointment Price: </b> <p><%=m.getP_price()%></p>
            <b>Description: </b> <p><%=m.getP_des()%></p>

            <div class="button-container">
                <form action="addtowishlist.jsp">
                    <input type="hidden" name="id" value="<%=m.getId()%>">
                    <input type="submit" class="swd-button" value="Booking">
                </form>

                <form action="addtocart.jsp">
                    <input type="hidden" name="id" value="<%=m.getId()%>">
                    <input type="submit" class="swd-button" value="Appointment">
                </form>
            </div>
        </div>

        <%
            }
        %>

    </div>

    <jsp:include page="footer.jsp"/>

<%
    } else {
        response.sendRedirect("index.jsp");
    }
%>

</body>
</html>
