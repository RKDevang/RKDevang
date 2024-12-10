package Collection;

import java.util.ArrayList;
import java.util.Collections;

public class Q6 {

	public static void main(String[] args) {
		
		ArrayList <String> colors = new ArrayList<>();
			
			colors.add("red");
			colors.add("blue");
			colors.add("pink");
			colors.add("white");
			colors.add("black");
			
			System.out.println("before copy " + colors);
			
			
			ArrayList <String> colors2 = new ArrayList<>();
			
			colors2.add("orange");
			colors2.add("purple");
			colors2.add("green");
			colors2.add("brown");
			colors2.add("yellow");
			
			System.out.println("list 2" + colors2);
			
			Collections.copy(colors, colors2);
			System.out.println(colors);
			System.out.println(colors2);
			
		}
	}

