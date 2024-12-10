package String;

import java.util.Scanner;

public class Q2 {
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner (System.in);
		
		System.out.println("enter any character");
		char ch = sc.next().charAt(0);
		
		System.out.println("ascii value of character is : " + (int)ch );
		
		sc.close();
		
	}

}
