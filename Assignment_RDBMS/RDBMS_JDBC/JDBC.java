package RDBMS_JDBC;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;


public class JDBC implements ActionListener  {
	
	JFrame frame;
	JLabel id, name, address, gender, contact, register1;
	JTextField jid, jname, jaddress, jcontact;
	JButton exit, register, delete, update, reset, refresh;
	JRadioButton male, female;

	
	JTable jtable;
	JScrollPane jsp;
	DefaultTableModel model;
	
	Font font = new Font("Times New Roman", Font.BOLD,60);
	
	public JDBC() {
		
		frame = new JFrame ("Register Form.");
		
		 jid = new JTextField(15);
	     jid.setBounds(130, 49, 167, 34);
	     
	     jname = new JTextField(15);
	     jname.setBounds(130, 87, 167, 34);
	     
	     jaddress = new JTextField(15);
	     jaddress.setBounds(130, 175, 167, 34);
	     
	     jcontact = new JTextField(15);
	     jcontact.setBounds(130, 215, 167, 34);
	     
	     id = new JLabel("ID");
	     id.setBounds(35, 58, 60, 16);
	     
	     name = new JLabel("Name");
	     name.setBounds(35, 96, 60, 16);
	        
	     address = new JLabel("Address");
	     address.setBounds(35, 184, 60, 16);
	        
	     contact = new JLabel("Contact");
	     contact.setBounds(35, 224, 60, 16);
	     
	     register1 = new JLabel("Registration Form");
	     register1.setBounds(61, 13, 157, 23);
	        
	     gender = new JLabel("Gender");
	     gender.setBounds(35, 139, 64, 25);
	     
	     exit = new JButton("Exit");
	     exit.setBounds(35, 277, 107, 34);
	     
	     register = new JButton("Register");
	     register.setBounds(150, 277, 120, 34);
	     
	     delete = new JButton("Delete");
	     delete.setBounds(35, 317, 107, 34);
	     
	     update = new JButton("Update");
	     update.setBounds(150, 317, 120, 34);
	     
	     reset = new JButton("Reset");
	     reset.setBounds(87, 356, 120, 34);
	     
	     refresh = new JButton("Refresh Table");
	     refresh.setBounds(550, 403, 300, 34);
				
	     male = new JRadioButton("Male");
	     male.setBounds(125, 139, 70, 25);
	     
	     female = new JRadioButton("Female");
	     female.setBounds(200, 139, 80, 25);
	     

	        String column[] = {"S.no", "ID", "Name", "Gender", "Address", "Contact"};

	        model = new DefaultTableModel(column, 0);
	        jtable = new JTable(model);
	        jtable.setBounds(200, 13, 600, 200);
	        
	        jsp = new JScrollPane(jtable, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED, JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
	        jsp.setBounds(350, 13, 650, 377);

	     frame.setSize(1090, 600);
	     frame.setLayout(null);
	     frame.setVisible(true);
	     frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	     
	     frame.add(id);
	     frame.add(name);
	     frame.add(contact);
	     frame.add(address);
	     frame.add(gender);
	     
	     frame.add(jaddress);
	     frame.add(jcontact);
	     frame.add(jid);
	     frame.add(jname);
	     
	     frame.add(jsp);

	     frame.add(exit);
	     frame.add(register);
	     frame.add(delete);
	     frame.add(update);
	     frame.add(reset);
	     frame.add(refresh);
	     frame.add(id);
	     
	     frame.add(male);
	     frame.add(female);
	     
	     
	     register.addActionListener(this);
	     exit.addActionListener(this);
	     delete.addActionListener(this);
	     reset.addActionListener(this);
	     update.addActionListener(this);
	     refresh.addActionListener(this);
	     
				
	}

	
	 	String host = "jdbc:mysql://localhost:3306/";
	    String dbname = "data";
	    String url = host + dbname;
	    

	    public void actionPerformed(ActionEvent e)
	    {
		        if (e.getSource() == register) 
		        {
		            insertdata();
		        }
		        
		        if (e.getSource() == exit) 
		        {
		            frame.dispose();
		        }
		        
		        if (e.getSource() == delete) 
		        {
		        	deleteData();
		        }
		        
	            if (e.getSource() == reset) 
	            {
	                jid.setText(null);
	                jname.setText(null);
	                female.setSelected(false);
	                male.setSelected(false);
	                jaddress.setText(null);
	                jcontact.setText(null);
	            }
	            
	            if (e.getSource() == update) 
	            {
	                updateData();
	            }
	            
	            if (e.getSource() == refresh) 
	            {
	                viewDataInTable();
	            }
	        }
	    
	    
	    public void insertdata()
	    {
	    	try 
	    	{
	    		
	    		 int id = Integer.parseInt(jid.getText());
	    		 
	             String name = jname.getText();
	             String gender = male.isSelected() ? male.getText() : female.getText();
	             String address = jaddress.getText();
	             long contact = Long.parseLong(jcontact.getText());
	             
	             
	    		Class.forName("com.mysql.jdbc.Driver");
				Connection con = DriverManager.getConnection(url,"root", "");
				Statement stmt = con.createStatement();
				
				String a = "insert into details (id, name, gender, address, contact) VALUES ('" + id + "','" + name + "', '" + gender + "','" + address + "','" + contact + "')";
	            stmt.executeUpdate(a);
	            JOptionPane.showMessageDialog(register , "Registered Successfully");
				
				
			} 
	    	catch (Exception e) 
	    	{
				e.printStackTrace();
			}
	    	
	    }
	    
	    public void deleteData() 
	    {
	        int datadelete;
	        int id = Integer.parseInt(jid.getText());
	        String sqldelete = "DELETE FROM employee_data WHERE ID='" + id + "'";
	                
	        try 
	        {
	            Class.forName("com.mysql.jdbc.Driver");
	            Connection con = DriverManager.getConnection(url, "root", "");
	            Statement stmt = con.createStatement();
	 
	            datadelete = stmt.executeUpdate(sqldelete);
	            
	            JOptionPane.showMessageDialog(delete, "Deleted Successfully");
	        } 
	        
	        catch (Exception e) 
	        {
	            System.out.println(e);
	        }
	    }
	    
	    

	    public void updateData() 
	    {
	        int dataupdate;
	        String gender;
	        
	        int id = Integer.parseInt(jid.getText());
	        String name = jname.getText();
	        
	        if (male.isSelected()) 
	        {
	            gender = male.getText();
	        }
	        
	        else 
	        {
	            gender = female.getText();
	        }
	        
	        String address = jaddress.getText();
	        long contact = Long.parseLong(jcontact.getText());
	        String sql = "UPDATE employee_data SET ID=" + id + ", Name='" + name + "', Gender='" + gender + "', Address='" + address + "', Contact=" + contact + " WHERE ID=" + id;

	        try 
	        {
	            Class.forName("com.mysql.jdbc.Driver");
	            Connection con = DriverManager.getConnection(url, "root", "");
	            Statement stmt = con.createStatement();
	            
	            dataupdate = stmt.executeUpdate(sql);
	            JOptionPane.showMessageDialog(update, "Updated Successfully");
	           
	        } 
	        
	        catch (Exception e) 
	        
	        {
	            System.out.println(e);
	        }
	    }
	    
	    public void viewDataInTable() 
	    {
	        String sqlviewdata = "SELECT * FROM employee_data"; 
	        
	        try 
	        {
	            Class.forName("com.mysql.jdbc.Driver");
	            Connection con = DriverManager.getConnection(url, "root", "");
	            Statement stmt = con.createStatement();
	            ResultSet rs = stmt.executeQuery(sqlviewdata);

	            model.setRowCount(0); 

	            while (rs.next()) 
	            {
	                model.addRow(new Object[]
	                {
	                    rs.getInt("sno"),    
	                    rs.getInt("id"),     
	                    rs.getString("name"), 
	                    rs.getString("gender"), 
	                    rs.getString("address"), 
	                    rs.getLong("contact")  
	                });
	            }
	           
	        } 
	        catch (Exception e) 
	        {
	            System.out.println(e);
	        }
	    }
	    
	    
	    public static void main(String[] args) 
	    {
	        new JDBC();
	    }
	}
	    

