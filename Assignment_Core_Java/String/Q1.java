package String;

import java.util.Scanner;

public class Q1 {
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		System.out.println("Enter");
		
		String a = sc.next();
		
		
		int spaceCount = 0;
		
		for(int i =0; i<a.length(); i++)
		{
			if(a.charAt(i)==' ')
			{
				spaceCount++;
			}
		}
		
		System.out.println("number of space" + spaceCount);
		
	}

}
