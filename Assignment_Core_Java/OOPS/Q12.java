package OOPS;

import java.util.Scanner;

class GRADE
{
	
	public void Display(int marks)
	{
		if(marks>=91 && marks<=100)
		{
			System.out.println("A Grade");
		}
		
		else if(marks>=81 && marks<=90)
		{
			System.out.println("B Grade");
		}
		
		else if(marks>=71 && marks<=80)
		{
			System.out.println("C Grade");
		}
		
		else if(marks>=61 && marks<=70)
		{
			System.out.println("D Grade");
		}
		
		else
		{
			System.out.println("enter valid");
		}
			
	}
}

public class Q12 {
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		System.out.println("enter marks");
		int marks = sc.nextInt();
		
		GRADE m = new GRADE();
		m.Display(marks);
		
	}

}
