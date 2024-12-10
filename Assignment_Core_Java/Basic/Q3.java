package Basic;

import java.util.Scanner;

public class Q3 {
	
    public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a year: ");
        int h1 = sc.nextInt();

        if ((h1 % 4 == 0 && h1 % 100 != 0) || (h1 % 400 == 0)) 
        {
            System.out.println(h1 + "leap year.");
        } 
        else 
        {
            System.out.println(h1 + "not a leap year.");
        }
    }
}
