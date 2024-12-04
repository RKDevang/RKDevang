package String;

import java.awt.FlowLayout;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.lang.model.util.SimpleAnnotationValueVisitor6;
import javax.swing.*;

public class Q4 implements Runnable {
	
	JFrame frame ;
	JButton btn;
	Thread t = null ; 
	int hours = 0, minute = 0, second = 0;
	String timestring = "";
	
	public void DigitalWatch ()
	{
		
		frame = new JFrame("DigitalWatch");
		btn = new JButton();
		
		t = new Thread(this);
		t.start();
		
		frame.add(btn);
		frame.setSize(300,300);
		frame.setVisible(true);
		frame.setLayout(new FlowLayout());
		
	}

	@Override
	public void run() {
		
		try
		{
			while(true)
			{
				Calendar cal = Calendar.getInstance();
				
				cal.get(Calendar.DATE);
				cal.get(Calendar.DAY_OF_MONTH);
				cal.get(Calendar.YEAR);
				
				hours = cal.get(Calendar.HOUR_OF_DAY);
				if(hours > 12) hours -= 12;
				minute = cal.get(Calendar.MINUTE);
				second = cal.get(Calendar.SECOND);
				
				SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss");
				Date date = cal.getTime();
				timestring = formatter.format(date);
				btn.setText(timestring);
				t.sleep(1000);
				
			}
		}
		
		catch (Exception e)
		
		{
			
		}
		
	}
	
			public void printtime()
			{
				btn.setText(timestring);
			}
			
			public static void main(String[] args) 
			{
				
				new DigitalWatchEx();
			}
		}
		
	