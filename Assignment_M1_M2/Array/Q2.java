package Array;

import java.util.Arrays;

public class Q2 {
	
    public static void main(String[] args) {
    	
        int[] numbers = {0, 6, 3, 5, 8, 4, 9, 4, 1}; 
        
        int secondMax = findSecondMax(numbers);
        
        System.out.println("second max " + secondMax);
    }

    public static int findSecondMax(int[] arr) {
        
        Arrays.sort(arr);
        
        return arr[arr.length - 2];
    }
}