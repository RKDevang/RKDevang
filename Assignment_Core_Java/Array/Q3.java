package Array;

import java.util.Arrays;
import java.util.Scanner;

///////////////////////////////////COPY///////////////////////////////////

public class Q3 {
	
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size of arrays: ");
        
        int n1 = sc.nextInt();
        int n2 = sc.nextInt();
        
        int[] arr1 = new int[n1];
        int[] arr2 = new int[n2];
        
        System.out.println("Enter elements of first array:");
        for (int i = 0; i < n1; i++) arr1[i] = sc.nextInt();
        
        System.out.println("Enter elements of second array:");
        for (int i = 0; i < n2; i++) arr2[i] = sc.nextInt();

        // Merge arrays
        int[] merged = new int[n1 + n2];
        System.arraycopy(arr1, 0, merged, 0, n1);
        System.arraycopy(arr2, 0, merged, n1, n2);

        // Sort and reverse if descending order
        System.out.print("Sort ascending (1) or descending (2)? ");
        Arrays.sort(merged);
        if (sc.nextInt() == 2) for (int i = 0; i < merged.length / 2; i++) {
            int temp = merged[i];
            merged[i] = merged[merged.length - 1 - i];
            merged[merged.length - 1 - i] = temp;
        }

        // Print result
        System.out.println("Sorted array: " + Arrays.toString(merged));
    }
}
