package Collection;

import java.util.HashMap;
import java.util.Map;

public class Q11 {
	
	public static void main(String[] args) {
		
		HashMap<String,Integer> map = new HashMap<>();
		
		map.put("a",1);
		map.put("b",2);
		map.put("c",3);
		map.put("d",4);
		map.put("e",5);
		map.put("f",6);
		
		for(Map.Entry<String, Integer> m : map.entrySet())
		{
			System.out.println(m.getKey() + " " + m.getValue());
		}
	}

}
