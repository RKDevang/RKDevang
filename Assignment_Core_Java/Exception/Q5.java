package Exception;

import java.util.Scanner;

public class Q5 {
	
	public static void main(String[] args) {
		
		try
		{
		Scanner sc = new Scanner (System.in);
		
		System.out.println("enter number 1:"); 
		int num1 = Integer.parseInt(args[0]);
		
		System.out.println("enter number 2:");
		int num2 = Integer.parseInt(args[1]);
		
		int result = num1/num2;
		
		System.out.println("result" + result);
		
		}
		catch (ArithmeticException e) 
		{	  
			System.out.println("Arithmetic Exception");
		}
		
		catch (ArrayIndexOutOfBoundsException e)
		{
			System.out.println("Array Index Out Of Bound Exception");
		}
		
		catch (NumberFormatException e)
		{
			System.out.println("Number Format Exception");
		}
		
		finally 
		{
			System.out.println("code");
		}
		
	}

}
