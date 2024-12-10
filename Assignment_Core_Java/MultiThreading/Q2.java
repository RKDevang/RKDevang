package MultiThreading;

public class Q2 extends Thread {
	
	
	@Override
	public void run() {
		
        System.out.println("hello");		
	}
	
	public static void main(String[] args) {
		
		Q2 h1 = new Q2();
		
		
		h1.start();
		
	}

}


