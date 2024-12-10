package Collection;

import java.util.ArrayList;

public class Q22 {

	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("befpre" + colors);
		
		colors.set(0, "yellow");
		
		System.out.println("after" + colors);
		
	}
}

