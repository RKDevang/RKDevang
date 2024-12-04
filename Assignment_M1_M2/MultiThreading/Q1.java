package MultiThreading;

class Q1 implements Runnable 
{
	@Override
    public void run() {
       
        System.out.println("hello!!!");
    }

    public static void main(String[] args) {
        
    	Q1 h = new Q1();
    	
        Thread thread = new Thread(h);
        thread.start();

        System.out.println("running");
    }
}