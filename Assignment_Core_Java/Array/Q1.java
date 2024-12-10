package Array;

public class Q1 {
	
    public static int findMax(int[] array) {
    	
        int max = array[0];
        
        for (int num : array) 
        {
            if (num > max)  
            {
                max = num;
            }
        }
        
        return max;
    }

    public static void main(String[] args) {
    	
        int[] numbers = {15, 9, 6, 22, 2};
        
        int max = findMax(numbers);
        
        System.out.println("maximum is " + max);
        
    }
}
