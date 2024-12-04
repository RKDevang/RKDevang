package Collection;

import java.util.HashMap;

public class Q20 {
	
	public static void main(String[] args) {
		
		HashMap <Integer, String> hm = new HashMap <Integer, String>();
		
		hm.put(1, "a");
		hm.put(2, "b");
		hm.put(3, "c");
		hm.put(4, "d");
		hm.put(5, "e");
		hm.put(6, "f");
		
		boolean result = hm.isEmpty();
		
		  System.out.println("Is hash map empty: " + result);
		
		  hm.clear();
		 
		  result = hm.isEmpty();
	
		  System.out.println("Is hash map empty: " + result);
		
		
		
		
	}

}
