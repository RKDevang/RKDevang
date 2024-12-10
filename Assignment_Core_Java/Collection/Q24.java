package Collection;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class Q24 {
	
public static void main(String[] args) {
		
		HashSet set = new HashSet<>();
		
		set.add("a");
		set.add("b");
		set.add("c");
		set.add("d");
		set.add("e");
		set.add("f");
		
		System.out.println("before" + set);
		
		HashSet set2 = new HashSet<>();
		
		set2.add("T");
		set2.add("b");
		set2.add("c");
		set2.add("Y");
		set2.add("e");
		set2.add("f");
		
		System.out.println("after" + set2);
		
		set.retainAll(set2);
		
		System.out.println(set);
		
		
		}
	}



