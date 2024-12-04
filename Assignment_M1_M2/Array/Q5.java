package Array;

import java.util.Scanner;

public class Q5 {
	
    public static void main(String[] args) 
    {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter");
        String str = sc.nextLine();

        int length = 0;
        for (char c : str.toCharArray()) 
        {
            length++;
        }

        System.out.println("Length " + length);
    }
}