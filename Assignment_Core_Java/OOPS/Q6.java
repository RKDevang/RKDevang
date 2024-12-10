package OOPS;

import java.util.Scanner;

class Complex
{
	int real1, real2;
	int imaginary1, imaginary2;
	
	public Complex()
	{
		Scanner sc = new Scanner(System.in);
		
		System.out.println("enter real 1 number");
		this.real1=sc.nextInt();
		
		System.out.println("enter real number 2");
		this.real2=sc.nextInt();
	
		System.out.println("enter imaginary 1 number");
		this.imaginary1=sc.nextInt();
		
		System.out.println("enter imaginary number 2");
		this.imaginary2=sc.nextInt();
		
	}

	public void sum()
	{
		int realSum = real1 +real2;
		System.out.println("sum of real number is ");
		System.out.println(realSum);
		
		int imaginarySum = imaginary1 + imaginary2;
		System.out.println("sum of imaginary number is");
		System.out.println(imaginarySum);
	
	}
	
	public void difference()
	{
		int realDifference = real1 - real2;
		System.out.println("difference of real number is ");
		System.out.println(realDifference);
		
		int imaginaryProduct = imaginary1 - imaginary2;
		System.out.println("difference of imaginary number is");
		System.out.println(imaginaryProduct);
	}
	
	public void product()
	{
		int realProduct = real1 * real2;
		System.out.println("product of real number is ");
		System.out.println(realProduct);
		
		int imaginaryProduct = imaginary1 * imaginary2;
		System.out.println("product of imaginary number is");
		System.out.println(imaginaryProduct);
	}
}

public class Q6 {
	
	public static void main(String[] args) {
		
		Complex c = new Complex();
		c.sum();
		c.difference();
		c.product();
		
	}
}
