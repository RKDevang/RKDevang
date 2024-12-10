package OOPS;

class Shape1
{
	public void Print1()
	{
		System.out.println("This Is Shape.");
	}
}

class Rectangle1 extends Shape1
{
	public void Print2()
	{
		System.out.println("This is a Rectangle Shape.");
	}
}

class Square1 extends Rectangle1
{
	public void Print3()
	{
		System.out.println("Square is a Rectangle.");
	}
}

class Circle1 extends Shape1
{
	public void Print4()
	{
		System.out.println("This is a Circle Shape.");
	}
}

public class Q13 {
	
	public static void main(String[] args) {
		
		Square1 a1 = new Square1();
		
		a1.Print1();
		a1.Print2();
		
	}

}
