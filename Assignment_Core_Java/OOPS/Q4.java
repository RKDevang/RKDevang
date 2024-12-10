package OOPS;

class Rectangle
{
	int length;
	int breadth;
	
	void area()
	{
		int print_area = length * breadth;
		System.out.println("area is :" + print_area);
	}
	
	void perimeter()
	{
		int print_perimeter = 2*(length + breadth);
		System.out.println("perimeter is :" +print_perimeter);
	}
	
	public Rectangle(int length, int breadth)
	{
		this.breadth=breadth;
		this.length= length;
	}

}

class Square extends Rectangle
{
	public Square(int side)
	{
		super(side,side);
	}
}

public class Q4 {
	
	public static void main(String[] args) {
		
		Rectangle r = new Rectangle(11,12);
		r.perimeter();
		r.area();
		
		Square s = new Square(5);
		s.area();
		s.perimeter();
		
	}

}
