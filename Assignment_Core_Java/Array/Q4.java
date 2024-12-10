package Array;

import java.util.Scanner;

public class Q4 {
	
	/////////////////////////////////COPY/////////////////////////////////
	
    public static void main(String[] args) {
    	
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows and columns: ");
        int r = sc.nextInt();
        int c = sc.nextInt();

        int[][] a = new int[r][c];
        int[][] b = new int[r][c];
        
        int[][] sum = new int[r][c];
        int[][] diff = new int[r][c];
        int[][] prod = new int[r][c];

        System.out.println("Enter elements of matrix 1:");
        inputMatrix(a, r, c, sc);

        System.out.println("Enter elements of matrix 2:");
        inputMatrix(b, r, c, sc);

        for (int i = 0; i < r; i++) 
        {
            for (int j = 0; j < c; j++) 
            {
                sum[i][j] = a[i][j] + b[i][j];
                diff[i][j] = a[i][j] - b[i][j];
                prod[i][j] = 0;
                
                for (int k = 0; k < c; k++) 
                {
                    prod[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        System.out.println("Sum:");
        printMatrix(sum, r, c);

        System.out.println("Difference:");
        printMatrix(diff, r, c);

        System.out.println("Product:");
        printMatrix(prod, r, c);
    }

    static void inputMatrix(int[][] m, int r, int c, Scanner sc) 
    {
        for (int i = 0; i < r; i++) 
        {
            for (int j = 0; j < c; j++) 
            {
                m[i][j] = sc.nextInt();
            }
        }
    }

    static void printMatrix(int[][] m, int r, int c) 
    {
        for (int i = 0; i < r; i++) 
        {
            for (int j = 0; j < c; j++) 
            {
                System.out.print(m[i][j] + " ");
            }
            System.out.println();

        }
    }
}