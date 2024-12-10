package Exception;

public class Q3 {
	
	public static void main(String[] args) {
	
		try 
		{
			int a[] = new int[5];
			a[5] = 30/0;
		} 
		
		catch (ArithmeticException e) 
		{	  
			System.out.println("Arithmetic Exception");
		}
		
		catch (ArrayIndexOutOfBoundsException e)
		{
			System.out.println("Array Index Out Of Bound Exception");
		}
		
		finally 
		{
			System.out.println("code");
		}
		
	}

}
