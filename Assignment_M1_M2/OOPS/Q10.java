package OOPS;

import java.util.Scanner;

public class Q10  {
	
    public static int Factorial(int n) 
    {
        if (n == 0) 
        {
            return 1;
        }
        
        int factorial = 1;
        for (int i = 1; i <= n; i++) 
        {
            factorial *= i;
        }
        
        return factorial;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number ");
        int number = sc.nextInt();

        if (number < 0) {
        	
            System.out.println("NEGATIVE NUMBERS NOT ALLOWED");
        }
        else 
        {
            int result = Factorial(number);
            System.out.println(result);
        }
    	}
}


