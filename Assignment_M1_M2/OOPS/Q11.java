package OOPS;

abstract class Shape
{
	public abstract int RectangleArea(int length, int breadth);
	public abstract int SquareArea(int side);
	public abstract int CircleArea(int radius);
}

class Area extends Shape
{

	@Override
	public int RectangleArea(int length, int breadth) 
	{
		return length * breadth;
	}

	@Override
	public int SquareArea(int side) {
		// TODO Auto-generated method stub
		return side*side;
	}

	@Override
	public int CircleArea(int radius) {
		// TODO Auto-generated method stub
		return (int) (Math.PI * radius * radius);
	}
	
}

public class Q11 {
	
	public static void main(String[] args) {
		
		Area A1 = new Area();
		
		int RectangleArea = A1.RectangleArea(5, 8);
		int SquareArea = A1.SquareArea(4);
		int CircleArea = A1.CircleArea(5);
		
		System.out.println("Rectangle Area Is : " + RectangleArea);
		System.out.println("Square Area Is : " + SquareArea);
		System.out.println("Circle Area Is : " + CircleArea);
		
		
	}

}
