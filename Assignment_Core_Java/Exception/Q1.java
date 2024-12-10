package Exception;

public class Q1 {
	
	public static void main(String[] args) {
	
		try
		{
			int a = 10/0;
			System.out.println("answer" + a );	
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		finally
		{
			System.out.println(" code");
		}
		
		
	}

}
