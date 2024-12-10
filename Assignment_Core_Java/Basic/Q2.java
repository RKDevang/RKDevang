package Basic;

import java.util.Scanner;

public class Q2
{
    public static void main(String[] args)
    {
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Enter Single character: ");
		String a1 = sc.next();
		
		if(a1.length()>1) 
		{
			System.out.println("Please enter single character:");
		}
		
		else
		{
			char ch = a1.charAt(0);
		
		  if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
		  {
			  if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'
				   || ch == 'A'||ch == 'E'|| ch == 'I' ||ch == 'O' ||ch == 'U' )
				{
					System.out.println("Vowel");
				}
			  
				else 
				{
					System.out.println("Consonent");
				}
		  }
		  
		  else 
		  {
			  System.out.println("Error: Please enter a valid letter between a and z or A and Z.");
		  }
		}
		
		}
}