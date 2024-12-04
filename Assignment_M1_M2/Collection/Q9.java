package Collection;

import java.util.HashSet;
import java.util.Iterator;

public class Q9 {
	
	public static void main(String[] args) {

		HashSet set = new HashSet<>();
		
		set.add("a");
		set.add("b");
		set.add("c");
		set.add("d");
		set.add("e");
		set.add("f");
		
		Iterator i = set.iterator();
		
		while(i.hasNext())
		{
			System.out.println(i.next());
		}	
	}
}