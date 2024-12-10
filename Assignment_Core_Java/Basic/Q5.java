package Basic;


import java.util.Scanner;

public class Q5 {
	
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int sum = 0;
        int count = 5;
        
        for (int i = 1; i <= count; i++) 
        {
        	
        	System.out.println("5 NUMBER");
            System.out.print("number enter " + i);
            
            int num = sc.nextInt();
            sum = sum + num;
        }
        
        int average = sum / count;

        System.out.println("sum is " + sum);
        System.out.println("average is" + average);

    }
}
