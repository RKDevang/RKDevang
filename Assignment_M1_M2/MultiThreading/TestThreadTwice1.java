package MultiThreading;

public class TestThreadTwice1 extends Thread {
 
	
	@Override
	public void run() {
		
     System.out.println("HELLO 1");
 }
	

 public static void main(String[] args) {
	 
     TestThreadTwice1 t1 = new TestThreadTwice1(); 

     t1.start(); 
     
     try 
     {
       t1.start(); 
     } 
     catch (Exception e) 
     {
         System.out.println(" HELLO " + e); 
     }
 }
 
}

