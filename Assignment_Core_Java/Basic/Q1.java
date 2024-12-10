package Basic;

import java.util.Scanner;

public class Q1 {
	
    public static void main(String[] args) {
    	
        Scanner sc = new Scanner(System.in);
        System.out.print("1 number: ");
        int num1 = sc.nextInt();

        System.out.print("2 number: ");
        int num2 = sc.nextInt();

        System.out.print("3 number: ");
        int num3 = sc.nextInt();

        int greatest;
        
        if (num1 > num2 && num1 > num3) {
            greatest = num1;
            
        } 
        else if (num2 > num1 && num2 > num3) {
            greatest = num2;
        } 
        
        else 
        {
            greatest = num3;
        }
        
        System.out.println("greatest number is: " + greatest);
    }
}
