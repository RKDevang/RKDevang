package Collection;

import java.util.ArrayList;
import java.util.List;

public class Q18 {
	

	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("befpre" + colors);
		
		String[] newlist = new String [colors.size()];
		colors.toArray(newlist);
		
		System.out.println();
		
		for(String element : newlist )
			
		{
			System.out.println(element);
		
	}
}
	

}
