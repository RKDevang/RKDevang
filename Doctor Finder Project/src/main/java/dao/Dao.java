package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import model.AdminModel;
import model.CartModel;
import model.ContactModel;
import model.ProductModel;
import model.SignupModel;
import model.WishlistModel;

public class Dao 
{
	
	public static Connection getconnect()
	{
		Connection con = null;
		
		
		try 
		{
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecom","root","");
		
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return con;
	}
	
	
	public static int signupuser(SignupModel m)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("insert into users (fullname,email,phone,password) values (?,?,?,?)");
			
			ps.setString(1,m.getFullname());
			ps.setString(2,m.getEmail());
			ps.setString(3,m.getPhone());
			ps.setString(4,m.getPassword());
			
			status = ps.executeUpdate();
		}
		catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return status;
		
		
	}
	
	public static SignupModel loginuser(SignupModel m)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		SignupModel m2 = null;
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from users where email=? and password=?");
			
			ps.setString(1,m.getEmail());
			ps.setString(2,m.getPassword());
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				int id = set.getInt(1);
				String fname = set.getString(2);
				String email = set.getString(3);
				String phone = set.getString(4);
				String pass = set.getString(5);
			
				
				 m2 = new SignupModel();
				m2.setId(id);
				m2.setFullname(fname);
				m2.setEmail(email);
				m2.setPhone(phone);
				m2.setPassword(pass);
				
			}
			
			//status = ps.executeUpdate();
		}
		catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return m2;
		
		
	}
	
	
	public static List<ProductModel>viewproducts()
	{
		
		List<ProductModel>list = new ArrayList<>();
		
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from products");
			ResultSet set = ps.executeQuery();
			
			while(set.next())
			{
				
				int id = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				
				ProductModel pm = new ProductModel();
				pm.setId(id);
				pm.setP_name(p_name);
				pm.setP_price(p_price);
				pm.setP_des(p_des);
				pm.setP_image(encode);
				
				list.add(pm);
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return list;
		
	}
	
	public static WishlistModel getproductindexwise(int id)
	{
		Connection con = Dao.getconnect();
		WishlistModel wm = null;
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from products where id=?");
			ps.setInt(1, id);
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				
				int id1 = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				//String email = set.getString(6);
			
				wm = new WishlistModel();
				wm.setId(id);
				wm.setP_name(p_name);
				wm.setP_price(p_price);
				wm.setP_des(p_des);
				wm.setP_image(encode);
				
				
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return wm;
		
	}
	
	public static CartModel getproductindexwise2(int id)
	{
		Connection con = Dao.getconnect();
		CartModel cm = null;
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from products where id=?");
			ps.setInt(1, id);
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				
				int id1 = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				//String email = set.getString(6);
			
				cm = new CartModel();
				cm.setId(id);
				cm.setP_name(p_name);
				cm.setP_price(p_price);
				cm.setP_des(p_des);
				cm.setP_image(encode);
				
				
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return cm;
		
	}
	
	
	public static List<WishlistModel>wishlistviewproducts(String email)
	{
		
		List<WishlistModel>list = new ArrayList<>();
		
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from wishlist where email=?");
			ps.setString(1, email);
			ResultSet set = ps.executeQuery();
			
			while(set.next())
			{
				
				int id = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				
				String email1 = set.getString("email");
				
				WishlistModel pm = new WishlistModel();
				pm.setId(id);
				pm.setP_name(p_name);
				pm.setP_price(p_price);
				pm.setP_des(p_des);
				pm.setP_image(encode);
				pm.setEmail(email1);
				
				list.add(pm);
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return list;
		
	}
	
	
	public static List<CartModel>cartviewproducts(String email)
	{
		
		List<CartModel>list = new ArrayList<>();
		
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from cart where email=?");
			ps.setString(1, email);
			ResultSet set = ps.executeQuery();
			
			while(set.next())
			{
				
				int id = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				
				String email1 = set.getString("email");
				
				CartModel pm = new CartModel();
				pm.setId(id);
				pm.setP_name(p_name);
				pm.setP_price(p_price);
				pm.setP_des(p_des);
				pm.setP_image(encode);
				pm.setEmail(email1);
				
				list.add(pm);
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return list;
		
	}
	
	public static int deletefromcart(int id)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("delete from cart where id=?");
			ps.setInt(1, id);
			
			status = ps.executeUpdate();
		} 
		catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return status;
	}
	
	public static int deletefromwishlist(int id)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("delete from wishlist where id=?");
			ps.setInt(1, id);
			
			status = ps.executeUpdate();
		} 
		catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return status;
	}
	
	public static WishlistModel getproductindexwise3(int id)
	{
		Connection con = Dao.getconnect();
		WishlistModel cm = null;
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from wishlist where id=?");
			ps.setInt(1, id);
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				
				int id1 = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				//String email = set.getString(6);
			
				cm = new WishlistModel();
				cm.setId(id);
				cm.setP_name(p_name);
				cm.setP_price(p_price);
				cm.setP_des(p_des);
				cm.setP_image(encode);
				
				
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return cm;
		
	}
	
	public static int contactinsert(ContactModel m)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("insert into contact (fullname,email,query,status) values (?,?,?,'Pending')");
			
			ps.setString(1,m.getFullname());
			ps.setString(2,m.getEmail());
			ps.setString(3,m.getQuery());
			
			
			status = ps.executeUpdate();
		}
		catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return status;
		
		
	}
	
	public static AdminModel adminlogincheck(AdminModel m)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		AdminModel m2 = null;
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from adminlogin where username=? and password=?");
			
			ps.setString(1,m.getUsername());
			ps.setString(2,m.getPassword());
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				int id = set.getInt(1);
				String uname = set.getString(2);
				String pass = set.getString(3);
			
				
				m2 = new AdminModel();
				m2.setId(id);
				m2.setUsername(uname);
				m2.setPassword(pass);
				
			}
		}
		catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return m2;
		
		
	}
	
	public static int deletefromadminproduct(int id)
	{
		int status = 0;
		Connection con = Dao.getconnect();
		
		try 
		{
			PreparedStatement ps = con.prepareStatement("delete from wishlist where id=?");
			ps.setInt(1, id);
			
			status = ps.executeUpdate();
		} 
		catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		
		return status;
	}
	
	
	public static List<ContactModel> getAllContacts() {
	    List<ContactModel> list = new ArrayList<>();
	    Connection con = Dao.getconnect();

	    try {
	        PreparedStatement ps = con.prepareStatement("SELECT * FROM contact");
	        ResultSet set = ps.executeQuery();

	        while (set.next())

	   	 {
	   	           
	        int id = set.getInt(1);
	   		String fullname = set.getString(2);
	   		String email = set.getString(3);
	   		String query = set.getString(4);
	   		String status = set.getString(5);
	   				
	    ContactModel m = new ContactModel();

	    			m.setId(id);
	   				m.setFullname(fullname );
	   				m.setEmail(email );
	   				m.setQuery(query );
	   				m.setStatus(status);
	   				

	         list.add(m);
	   	        }
	   	    } catch (SQLException e) {
	   	        e.printStackTrace();
	   	    }
	   	    return list;
	   	}
	
	public static ProductModel fetchproductbyid(int id)
	{
		Connection con = Dao.getconnect();
		ProductModel wm = null;
		try 
		{
			PreparedStatement ps = con.prepareStatement("select * from products where id=?");
			ps.setInt(1, id);
			
			ResultSet set = ps.executeQuery();
			
			if(set.next())
			{
				
				int id1 = set.getInt(1);
				String p_name = set.getString(2);
				String p_price = set.getString(3);
				String p_des = set.getString(4);
				
				byte[] imgData = set.getBytes(5);
				String encode = Base64.getEncoder().encodeToString(imgData);
				//String p_image = set.getString(5);
				//String email = set.getString(6);
			
				wm = new ProductModel();
				wm.setId(id);
				wm.setP_name(p_name);
				wm.setP_price(p_price);
				wm.setP_des(p_des);
				wm.setP_image(encode);
				
				
				
			}
		}
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return wm;
		
	}
	
	
public static int updatequerystatus(String option, int id) {
		
		Connection con = Dao.getconnect();
		int status = 0;
		
		
		
		try {
			PreparedStatement ps = con.prepareStatement("update contact set status=? where id=?");
			
			ps.setString(1, option);
			ps.setInt(2, id);
			
			status = ps.executeUpdate();
			
			
		} 
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return status;
	}
	
	
}
