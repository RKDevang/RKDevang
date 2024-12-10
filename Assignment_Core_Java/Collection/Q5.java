package Collection;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;

public class Q5 {
	
	public static void main(String[] args) {
		
	ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("before sorting " + colors);
		Collections.sort(colors);  
		System.out.println("sfter sorting " + colors);
	}
}
