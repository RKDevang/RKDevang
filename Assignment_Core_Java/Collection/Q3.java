package Collection;

import java.util.ArrayList;
import java.util.Iterator;

public class Q3 {
	
	public static void main(String[] args) {
		
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		colors.add(0,"hello");
		
		Iterator<String> i = colors.iterator();
		
		while(i.hasNext())
		{
			System.out.println(i.next());
		}
		
		
		int index = 3;
		System.out.println("color at index 3 is:" +colors.get(index));
		
	}

}