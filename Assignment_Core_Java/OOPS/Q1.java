package OOPS;

public class Q1 {
		
		static int display (int length, int  breadth)
		{
			
			int c = length * breadth;
			return c;
		}
		
		static int display (int side)
		{
			
			int d = side * side;
			return d;
			
		}

	public static void main(String[] args) {
		
		System.out.println(display(11,12));
		System.out.println(display(3));
	}
}
