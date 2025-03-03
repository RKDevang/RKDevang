<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us</title>
    <style>
        * {
            margin : 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
        }

        /* Header */
        header {
            background-color: white;
            color: rgb(0, 0, 0);
            padding: 10px 0;
            position: fixed;
            width: 100%;
            z-index: 100;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px auto;
            padding: 0 20px;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: green;
            }

        .nav-links {
            list-style: none;
            display: flex;
        }

        .nav-links li {
            margin-right: 20px;
        }

        .nav-links a {
            color: rgb(0, 0, 0);
            padding: 10px;
            font-weight: bold;
            text-decoration: none;
        }

        .nav-links a:hover {
            background-color: purple;
            border-radius: 4px;
            color: white;
        }
        
      

        /* About Section */
        
 		
  
  	
  	.about {
    background: repeating-linear-gradient(
        360deg,
        #D5006D 0%,         /* Very dark pink */
        #D5006D 20%,        /* 20% for the first pink */
        #F50075 20%,        /* Less dark pink */
        #F50075 40%,        /* 20% for the second pink */
        #FF80AB 40%,        /* Lighter pink */
        #FF80AB 60%,        /* 20% for the third pink */
        #FFB3D9 60%,        /* Even lighter pink */
        #FFB3D9 80%,        /* 20% for the fourth pink */
        #FFF9F0 80%,        /* Creamy white */
        #FFF9F0 100%        /* 20% for the fifth creamy white */
    );
      padding: 100px 0 20px 0; /* Increased top padding from 50px to 100px */
    text-align: center;
}
  		
  
	
  


      .about h1 {
    font-size: 2.5rem;
    margin-top: 50px; /* Add top margin */
    margin-bottom: 20px;
}

        .about p {
            font-size: 1rem;
            color: black;
            max-width: 800px;
            margin: 0 auto;
        }

        .about-info {
            margin: 2rem 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
        }

        .about-img {
            width: 20rem;
            height: 20rem;
        }

        .about-img img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            object-fit: contain;
        }

        .about-info p {
            font-size: 1.3rem;
            margin: 0 2rem;
            text-align: justify;
        }

        button {
            border: none;
            outline: 0;
            padding: 10px;
            margin: 2rem;
            font-size: 1rem;
            color: white;
            background-color:purple;
            text-align: center;
            cursor: pointer;
            width: 15rem;
            border-radius: 4px;
        }

        button:hover {
            background-color: purple ;
        }

        /* Team Section */
        .team {
            padding: 30px 0;
            text-align: center;
              background-color: pink;
        }

        .team h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .team-cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
        }

        .card {
            background-color: pink ;
            border-radius: 6px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
            width: 18rem;
            height: 25rem;
            margin-top: 10px;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
        }

        .card-img {
            width: 18rem;
            height: 12rem;
        }

        .card-img img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }

        .card-info button {
            margin: 2rem 1rem;
        }

        .card-name {
            font-size: 2rem;
            margin: 10px 0;
        }

        .card-role {
            font-size: 1rem;
            color:black;
            margin: 5px 0;
        }

        .card-email {
            font-size: 1rem;
            color: black;
        }

        /* Footer */
        footer {
            background-color: #D5006D;
            color: white;
            text-align: center;
            padding: 20px 0;
        }

        @media (max-width: 768px) {
            nav {
                display: block;
            }

            .logo {
                text-align: center;
              
            }

            .nav-links {
                margin-top: 1rem;
                justify-content: space-between;
            }

            .nav-links li {
                margin-right: 0;
            }

            .about h1 {
                font-size: 2rem;
            }

            .about p {
                font-size: 0.9rem;
            }

            .about-info {
                flex-direction: column;
                text-align: center;
            }

            .about-img {
                width: 60%;
                height: 60%;
                margin-bottom: 1rem;
            }

            .about-info p {
                margin: 1rem 2rem;
            }

            .about-info button {
                margin: 1rem 2rem;
                width: 10rem;
            }

            .team {
                margin: 0 1rem;
            }
        
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">WEBWING</div>
            <ul class="nav-links">
                <li><a href="dashboard.jsp">Home</a></li>
            </ul>
        </nav>
    </header>

    <section class="about">
        <h1>About Us</h1>
        <p style="font-weight: bold">
          Hello... Welcome to "Webwing" Clothing Brand.
        </p>
         
        <div class="about-info">
            <div class="about-img">
                <img src="images/webwing-high-resolution-logo.png" alt="Webwing">
            </div>
            <div>
                <p>
                    At FashionFusion, we believe that fashion is more than just clothing. it's a way to express yourself and
                    embrace your individuality. As a startup, we are committed to curating a collection that blends comfort,
                    elegance, and the latest trends. Every piece is handpicked to ensure it reflects our core values: quality,
                    affordability, and timeless style.

                    <br>
                    <br>

                    We are passionate about bringing you unique designs that resonate with modern aesthetics while catering to
                    diverse tastes. From casual wear to chic outfits for special occasions, FashionFusion is here to redefine
                    your wardrobe.
                </p>
                <button>Thanks For Your Valuable Time.</button>
            </div>
        </div>
    </section>

    <section class="team">
        <h1>Meet Our Team</h1>
        <div class="team-cards">
            <!-- Card 1 -->
            <div class="card">
                <div class="card-img">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg" alt="User 1">
                </div>
                <div class="card-info">
                  <h2 class="card-name">Miller</h2>
                    <p class="card-role">Head Of Sales Department</p>
                    <p class="card-email">miller@gmail.com</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="card">
                <div class="card-img">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg" alt="User 2">
                </div>
                <div class="card-info">
                    <h2 class="card-name">Devang Gujarati</h2>
                    <p class="card-role">CEO and Founder</p>
                    <p class="card-email">devangujarati@gmail.com</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="card">
                <div class="card-img">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg" alt="User 3">
                </div>
                <div class="card-info">
                    <h2 class="card-name">Joe</h2>
                    <p class="card-role">Head of Customer Support Team</p>
                    <p class="card-email">joe@gmail.com</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 Webwing. All Rights Reserved.</p>
    </footer>
</body>
</html>
