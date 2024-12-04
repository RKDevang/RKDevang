package Collection;

import java.util.ArrayList;
import java.util.List;

public class Q21 {
	

	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("befpre" + colors);
		
		colors.add("white2");
		colors.add("black1");
		
		System.out.println("after" + colors);
		
	}
}
