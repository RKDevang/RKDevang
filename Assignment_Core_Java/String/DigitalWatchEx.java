package String;

import java.awt.FlowLayout;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.swing.*;

public class DigitalWatchEx implements Runnable
{
	JFrame frame;
	JButton btn;
	Thread t=null;  
	int hours=0, minutes=0, seconds=0;  
	String timeString = "";  
	
	public DigitalWatchEx() 
	{
		frame = new JFrame();
		
		btn = new JButton();
		btn.setBounds(100,100,100,50); 
		
		t = new Thread(this);
		t.start();
		
		frame.add(btn);
		frame.setSize(500,500);
		frame.setLayout(null);
		frame.setVisible(true);
	}
	
	@Override
	public void run()
	{
		try
		{
			while(true)
			{
				Calendar cal = Calendar.getInstance();
				
				cal.get(Calendar.DATE);
				cal.get(Calendar.DAY_OF_MONTH);
				cal.get(Calendar.YEAR);
				
				hours = cal.get(Calendar.HOUR_OF_DAY);
				if (hours > 12) hours -= 12; 
				minutes = cal.get( Calendar.MINUTE);
				seconds = cal.get( Calendar.SECOND);  
				
				SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss");
				 Date date = cal.getTime();
		         timeString = formatter.format(date);
		         
		         //System.out.println(timeString);
		         
		         btn.setText(timeString);
		         
		         //printtime();
		         
		         t.sleep(1000);
			}
		}
		catch(Exception e)
		{
			
		}
	}
	
	public void printtime() 
	{
		btn.setText(timeString);
	}

	public static void main(String[] args) 
	{
		new DigitalWatchEx();
	}
}