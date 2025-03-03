package email;

import java.io.IOException;

import java.io.PrintWriter;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/EmailSendingServlet")
public class EmailSendingServlet extends HttpServlet
{
	
	String resultMessage = "";
	private String host;
	private String port;
	private String user;
	private String pass;

	
	@Override
	public void init() throws ServletException
	{
		ServletContext context = getServletContext();
		host = context.getInitParameter("host");
		port = context.getInitParameter("port");
		user = context.getInitParameter("user");
		pass = context.getInitParameter("pass");
	
	}
	
	
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
	
		
		
		resp.setContentType("text/html");
		PrintWriter out = resp.getWriter();
		
		HttpSession sess = req.getSession();
		
		
		String email = sess.getAttribute("e1").toString();
		String num1 = sess.getAttribute("n1").toString();
		String num2 = sess.getAttribute("n2").toString();
		String num3 = sess.getAttribute("n3").toString();
		String num4 = sess.getAttribute("n4").toString();
		
		
		out.print("<br>");
		System.out.println(email);
		System.out.println(num1);
		System.out.println(num2);
		System.out.println(num3);
		System.out.println(num4);
		
		String data = (String) email;
		String subject = "Welcome to E-commerce Project";
		String content = "Welcome to E-commerce Website Here you can purchase your Valuable Products Your Verification OTP is "+num1+num2+num3+num4;
	
		try 
		{
			EmailUtility.sendEmail(host, port, user, pass, data, subject,content);
		
			Thread.sleep(3000);
			resp.sendRedirect("otp.jsp");
			
			
		} 
		
		catch (AddressException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		catch (MessagingException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		
	}
}
