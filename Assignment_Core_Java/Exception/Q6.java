package Exception;

public class Q6 {
	
	static void validate(int age)
	{
		if(age>18)
		{
			System.out.println("eligible to vote");
		}
		
		else
		{
			throw new ArithmeticException("not eligible to vote.");
		}
	}
	
	public static void main(String[] args) {
		
		validate(16);
		
	}

}
