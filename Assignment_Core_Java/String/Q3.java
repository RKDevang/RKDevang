package String;

import java.util.Scanner;

public class Q3 {
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner (System.in);
		
		System.out.println("enter number");
		
		int n = sc.nextInt();
		
		System.out.println(n+"+");
		int nn = Integer.parseInt(n+ "" +n);
		System.out.println(nn+"+");
		int nnn = Integer.parseInt(n + "" + n + "" + n + "");
		System.out.println(nnn+"+");
		
		int result = n+nn+nnn;
		
		System.out.println("result is :" + result);
		
		
		
	}

}
