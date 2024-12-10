package MultiThreading;

//class Q32 extends Thread{
//	
//	@Override
//	public void run() {
//		
//        try 
//        {
//        	
//        	 System.out.println("hello   1");	
//			Thread.sleep(2000);
//		} 
//        
//        catch (InterruptedException e) 
//        
//        {
//        	System.out.println("hello 2");
//			e.printStackTrace();
//		}
//	}
//	
//class Q31 extends Thread{
//		
//		@Override
//		public void run() {
//			
//	        try 
//	        {
//	        	
//	        	 System.out.println("hello   11");	
//				Thread.sleep(2000);
//			} 
//	        
//	        catch (InterruptedException e) 
//	        
//	        {
//	        	System.out.println("hello 21");
//				e.printStackTrace();
//			}
//		}
//	
//		public class Q3 {
//		
//		public static void main(String[] args) {
//			
//			Q32 q1 = new Q32();
//			Q31 q2 =new Q31();
//			
//		
//			q1.start();
//			q2.start();
//		}
//}
//}	}
//



		
class one extends Thread {
			
			@Override
		 public void run() {
		    
				try 
		     {
		         System.out.println("hello 1 ");
		         Thread.sleep(2000); 
		         
		         System.out.println("hello 2 ");
		     } 
		     catch (InterruptedException e) 
				{
		         System.out.println("hello.");
				}
			}
		}
		
		class two extends Thread {
		 @Override
		 public void run() {
		     try 
		     {
		         System.out.println("hello 11");
		         Thread.sleep(2000);
		         System.out.println("hello 12");
		     } 
		     catch (InterruptedException e) 
		     {
		         System.out.println(" hello 13");
		     }
		 	}
		}
		
	
		public class Q3 {
			
		 public static void main(String[] args) {
			
		     one thread1 = new one();
		     two thread2 = new two();
	
		     thread1.start();
		     thread2.start();
		
		     System.out.println("Main thread is running...");
		 }
	}
