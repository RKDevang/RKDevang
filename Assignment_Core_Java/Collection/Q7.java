package Collection;

import java.util.ArrayList;
import java.util.Collections;

public class Q7 {
	
	public static void main(String[] args) {
	
	ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("before " + colors);
		
		Collections.shuffle(colors);
		
		System.out.println(colors);
		
	}
}
