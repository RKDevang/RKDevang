package Collection;

import java.util.ArrayList;
import java.util.List;

public class Q15 {
	

	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		ArrayList <String> colors2 = new ArrayList<>();
		
		colors2.add("red");
		colors2.add("blue");
		colors2.add("pink");
		colors2.add("white");
		colors2.add("black");
		
		ArrayList <String> compare = new ArrayList<String>();
		
		if(colors.equals(colors2))
		{
			System.out.println("same");
		}
		
		else
		{
			System.out.println("not equal");
		}
		
	}
}