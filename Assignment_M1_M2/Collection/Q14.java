package Collection;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Q14 {


	public static void main(String[] args) {
			
		ArrayList <String> colors = new ArrayList<>();
		
		colors.add("red");
		colors.add("blue");
		colors.add("pink");
		colors.add("white");
		colors.add("black");
		
		System.out.println("befpre" + colors);
		
		List<String> NewList = colors.subList(0, 3);
		
		System.out.println("after" + NewList);
		
	}
}
	