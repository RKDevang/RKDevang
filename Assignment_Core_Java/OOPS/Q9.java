package OOPS;

abstract class Marks
{
	public abstract int getPercentage();
}

class O extends Marks
{
	int sub1;
	int sub2;
	int sub3;
	
	public O(int sub1, int sub2, int sub3)
	{
		this.sub1=sub1;
		this.sub2=sub2;
		this.sub3=sub3;
	}

	@Override
	public int getPercentage() {
		
		int total = (sub1+ sub2+ sub3) ;
		int percentage = total*100/300;
		return percentage; 
	}	
}

class P extends Marks
{
	int sub1;
	int sub2;
	int sub3;
	int sub4;
	
	public P(int sub1, int sub2, int sub3, int sub4)
	{	
		this.sub1=sub1;
		this.sub2=sub2;
		this.sub3=sub3;
		this.sub4=sub4;
	}

	@Override
	public int getPercentage() {
		
		int total = (sub1 + sub2 + sub3 + sub4);
		int percentage = total*100/400;
		return percentage; 
	}
	
}
public class Q9 {
	
	public static void main(String[] args) {
		
		Marks o1 = new O(90, 90, 90);
		System.out.println("O Percentage Is : " + o1.getPercentage());
		
		Marks p1 = new P(90, 90, 90, 90);
		System.out.println("P Percentage Is : " + p1.getPercentage());
		
	}
}
