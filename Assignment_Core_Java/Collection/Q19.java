package Collection;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

public class Q19 {
	
	public static void main(String[] args) {
		
		HashSet set = new HashSet<>();
		
		set.add("a");
		set.add("b");
		set.add("c");
		set.add("d");
		set.add("e");
		set.add("f");
		
		System.out.println("before" + set);
		
		List<String> list = new ArrayList<String>(set);
		
		System.out.println(list);
		}
	}


