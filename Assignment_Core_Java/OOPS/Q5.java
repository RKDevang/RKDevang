package OOPS;

class Triangle
{
	int a = 3;
	int b = 4;
	int c = 5;
	
	public Triangle()
	{
		this.a=a;
		this.b=b;
		this.c=c;
	}
	
	public double perimeter()
	{
		return a + b + c ;
	}
	
	public double area()
	{
		int s = (a+b+c)/2;
		return Math.sqrt(s*(s-a)*(s-b)*(s-c));
				
	}
}

public class Q5 {
	
	public static void main(String[] args) {
		
		Triangle t = new Triangle();
		
		System.out.println("area is :" +t.area());
		System.err.println("perimeter is :" +t.perimeter());
		
	}

}
