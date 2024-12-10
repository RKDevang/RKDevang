package Collection;

import java.util.ArrayList;
import java.util.Iterator;

public class Q4 {
	
	public static void main(String[] args) {
		
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		Iterator<String> i = colors.iterator();
		
		while(i.hasNext())
		{
			System.out.println(i.next());
		}
		
		String search = "pink";
		if(colors.contains(search))
		{
			System.out.println(search + " found at index" +colors.indexOf(search));
		}
		
		else
		{
			System.out.println(search +"not found");
		}
	
	}
	
}