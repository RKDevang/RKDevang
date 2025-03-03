<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
  
<!DOCTYPE html>
<html lang="en">

<head>


   <!-- basic -->
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <!-- mobile metas -->
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="viewport" content="initial-scale=1, maximum-scale=1">
   <!-- site metas -->
   <title>Doctor Finder</title>
   <meta name="keywords" content="">
   <meta name="description" content="">
   <meta name="author" content="">
   <!-- bootstrap css -->
   <link rel="stylesheet" href="css/bootstrap.min.css">
   <!-- style css -->
   <link rel="stylesheet" href="css/style.css">
   <!-- Responsive-->
   <link rel="stylesheet" href="css/responsive.css">
   <link rel="stylesheet" href="css/owl.carousel.min.css">
   <!-- fevicon -->
   <link rel="icon" href="images/fevicon.png" type="image/gif" />
   <!-- Scrollbar Custom CSS -->
   <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
   <!-- Tweaks for older IEs-->
   <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen">
   <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->

	
	
	<style type="text/css">
      
			.swd-button {
    background: #f2db18;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    display: flex;         /* Enables flexbox */
    justify-content: center; /* Centers text horizontally */
    align-items: center;   /* Centers text vertically */
    font: bold 12px Arial, Helvetica, sans-serif;
    padding: 10px 15px;
    text-decoration: none;
    text-transform: uppercase;
    margin-top: 15px;
    height: 40px; /* Adjust height as needed */
    width: 120px; /* Adjust width as needed */
    text-align: center;
 
    
}



</style>
      

</head>
<!-- body -->

<body class="main-layout">
   <!-- loader  -->
   <div class="loader_bg">
      <div class="loader"><img src="images/loading.gif" alt="#" /></div>
   </div>
   <!-- end loader -->
   <!-- header -->
   <header>
      <!-- header inner -->
      <div class="header">
         <div class="header_to d_none">
            <div class="container">
               <div class="row">
                  <div class="col-md-6 col-sm-6">
                     <ul class="lan">
                        <li> Follow Us
                        </li>
                        <li> <a href="https://www.facebook.com/TOPSTech/"><i class="fa fa-facebook" aria-hidden="true" style="color: white; margin-left: 15px;"></i>
                           </a>
                        </li>
                        <li> <a href="#"><i class="fa fa-twitter" style="color: white; margin-left: 15px;"></i></a></li>
                        <li> <a href="#"> <i class="fa fa-linkedin" aria-hidden="true" style="color: white; margin-left: 15px;"></i></a></li>
                        <li> <a href="#"><i class="fa fa-instagram" aria-hidden="true" style="color: white; margin-left: 15px;"></i>
                           </a>
                        </li>
                     </ul>
                     
                     
                     
                     
                     
                     
                  </div>
                  
                  <%
                  	if(session.getAttribute("project")!=null)
                  	{
                  		
                  	
                  	
                  %>
                  <div class="col-md-6 col-sm-6 ">
                    
                      <label style="color: white; margin-left: 250px;">Your Name is: <%=session.getAttribute("fullname") %></label>
                      <br>
                      <label style="color: white; margin-left: 250px;">Your Email is: <%=session.getAttribute("email") %></label>
                      <br>
                      <label style="color: white; margin-left: 250px;">Your Number is: <%=session.getAttribute("phone") %></label>
                    
                  </div>
		                  
		             <%
		                  	}
                  
		                  	else
		                  		
		                  	{
		              %>
		                  
                  
                  
                  <% 		
                  			}
                  %>
                  
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
               </div>
            </div>
         </div>
         <div class="header_midil">
            <div class="container">
               <div class="row d_flex">
                  <div class="col-md-4 col-sm-4 d_none">
                     <ul class="conta_icon">
                        <li><a href="#"><i class="fa fa-phone" aria-hidden="true"></i> Call Us : +91 1234567890</a> </li>
                     </ul>
                  </div>
                  <div class="col-md-4 col-sm-4 ">
                     <a class="logo" href="#"><img src="images/Doctor.png" alt="#" /></a>
                  </div>
                  <div class="col-md-4 col-sm-4 d_none">
                     <ul class="conta_icon ">
                        <li><a href="#"><i class="fa fa-envelope" aria-hidden="true"></i> devangujarati@gmail.com</a> </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div class="header_bo">
            <div class="container">
               <div class="row">
                  <div class="col-md-9 col-sm-7">
                     <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                           <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                           <ul class="navbar-nav mr-auto">
                              <li class="nav-item">
                                 <a class="nav-link" href="index.jsp"> Home </a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="about.jsp">about</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="contact.jsp">contactUs </a>
                              </li>
                              
                              
                              
                              
                              
                              <%
                              
                              	if(session.getAttribute("project")!=null)
                              		
                              	{
                
                              %>
                              
                              
                              
                              <li class="nav-item">
                                 <a class="nav-link" href="product.jsp">DoctorList</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="wishlist.jsp">Booking</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="cart.jsp">Appointment</a>
                              </li>
                              
                              
                              
                              
                              
                              <%
                              	}
                              %>
                              
                              
                              
                              
                           </ul>
                        </div>
                     </nav>
                  </div>
                  <div class="col-md-3 col-sm-5 d_none">
                     
                     
                     <%
                     	if(session.getAttribute("project")!=null)
                     	{
                     %>
                       <a class="swd-button" href="logout.jsp">logout</a>
                       
                       
                     <% 		
                     	}
                     	else
                     	{
                     		
                     	
                     %>
                     	
	                     <a class="swd-button" href="signup.jsp">sign up </a>
	                     <a class="swd-button" href="signin.jsp">sign in </a>
                    
                     <%
                     	}
                     %>
                     	
                  </div>
               </div>
            </div>
         </div>
      </div>
   </header>
   
   
   <!-- end header inner -->
   <!-- end header -->