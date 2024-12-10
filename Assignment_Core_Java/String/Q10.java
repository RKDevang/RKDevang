package String;

public class Q10 {
	
	
	//////////////////////////////////////////COPY////////////////////////////////////////////////////////
	
//	public class StringInterleaving {

	    // Recursive method to find all interleavings
	    public static void findInterleavings(String s1, String s2, String interleaved) {
	        // If both strings are empty, print the interleaved result
	        if (s1.isEmpty() && s2.isEmpty()) {
	            System.out.println(interleaved);
	            return;
	        }

	        // If characters are left in s1, add the first character to interleaved and recurse
	        if (!s1.isEmpty()) {
	            findInterleavings(s1.substring(1), s2, interleaved + s1.charAt(0));
	        }

	        // If characters are left in s2, add the first character to interleaved and recurse
	        if (!s2.isEmpty()) {
	            findInterleavings(s1, s2.substring(1), interleaved + s2.charAt(0));
	        }
	    }

	    public static void main(String[] args) {
	        String s1 = "WX";
	        String s2 = "YZ";

	        System.out.println("The given strings are: " + s1 + " " + s2);
	        System.out.println("The interleaving strings are:");
	        findInterleavings(s1, s2, "");
	    }
	}



