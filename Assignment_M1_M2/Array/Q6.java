package Array;

import java.util.Scanner;

public class Q6 {
	
	/////////////////COPY/////////////////
	
    public static void main(String[] args) 
    {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.nextLine();
        
        String reversedStr = reverseString(str);
        System.out.println("Reversed string: " + reversedStr);

        if (str.equalsIgnoreCase(reversedStr)) 
        {
            System.out.println("The string is a palindrome.");
        } 
        else 
        {
            System.out.println("The string is not a palindrome.");
        }
    }

    public static String reverseString(String str) 
    {
        StringBuilder reversed = new StringBuilder();
        
        for (int i = str.length() - 1; i >= 0; i--) 
        {
            reversed.append(str.charAt(i));
        }
        
        return reversed.toString();
    }
}