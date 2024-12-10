package MultiThreading;

public class TestDaemonThread2 extends Thread {
		@Override
		public void run() {
			
			if (isDaemon()) {
				System.out.println(Thread.currentThread().getName() + " hello 1");
			} 
			else 
			{
				System.out.println(Thread.currentThread().getName() + " hello 2");
			}
		}

			public static void main(String[] args) {
   
				TestDaemonThread2 t1 = new TestDaemonThread2();
				TestDaemonThread2 t2 = new TestDaemonThread2();

				t1.setDaemon(true);

				t1.start();
				t2.start();

				System.out.println("hello");
			}
	}


