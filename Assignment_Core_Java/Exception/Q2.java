package Exception;

import java.util.Scanner;

public class Q2 {
	
	public static void main(String[] args) {
		
		try
		{

			Scanner sc = new Scanner(System.in);
			
			System.out.println("enter number 1:");
			int a = sc.nextInt();
			
			System.out.println("enter number 2:");
			int b = sc.nextInt();
			
			int c = a / b;
			System.out.println("division is :" + c);
		}
		
		catch(ArithmeticException e)
		{
			e.printStackTrace();
		}
		
		finally
		{
			System.out.println("code");
		}
	}

}
