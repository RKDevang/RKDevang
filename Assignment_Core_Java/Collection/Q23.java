package Collection;

import java.util.ArrayList;

public class Q23 {


	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("befpre" + colors);
		
		for(int i = 0; i <colors.size(); i++)
		{
			System.out.println(colors.get(i));
		}
		
	}
}
