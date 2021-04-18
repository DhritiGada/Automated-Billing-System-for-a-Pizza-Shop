package session1;
import java.util.*;
public class pizza 
{
	public static void main(String[] args) 
	{
		Vector <String> v=new Vector<String>();
        String s = new String("MU50"); 
        String code;
		Scanner sc=new Scanner(System.in);
		int x=0;
		char y;
		double cost=0;
        System.out.println("Welcome M.U Pizzeria");
        System.out.println("*********************");
        System.out.println("1:FarmHouse Style Pizza:- ₹250");  
   		System.out.println("2:Truly Itallian:- ₹350");	 
   		System.out.println("3:Deep dish:- ₹450");
   		System.out.println("4:Exit");
        System.out.println("Choose your option:");
      while(x<=5)
      {
    	  x=sc.nextInt();
    	 if(x==1)
    	 {
           System.out.println("1:FarmHouse Style Pizza\n"); 
           System.out.println("Enter 4 to exit or Add more pizza to your cart");
           cost=cost+250;
    	 }
       	else if(x==2)
       	 {
       		System.out.println("2:Truly Itallian\n");	 
            System.out.println("Enter 4 to exit or Add more pizza to your cart");
       		cost=cost+350;
       	 }
       	else if(x==3)
      	 {
       		System.out.println("3:Deep dish\n");
            System.out.println("Enter 4 to exit or Add more pizza to your cart");
       		cost=cost+450;
      	 }
       	else 
      	 {
       		
       		break;
       	 }
       }
 		System.out.println("Would you like some toppings ?\n");
 		System.out.println("Enter 1 for Extra Toppings Or Enter 0\n");
 		x=sc.nextInt();
 		if(x==0)
 		{
 			System.out.println("You have selected no toppings\n");
 		}
 		else 
 		{
 			System.out.println("Choose your option");
 			System.out.println("1:-Paneer");
 			System.out.println("2:-Olives");
 			System.out.println("3:-Mushroom");
 			System.out.println("4:-Exit");
 			System.out.println("^Any extra topping is additonal ₹60\n");
 			while(x<=5)
 		 	{
 		 		x=sc.nextInt();
 		 		if(x==1)
 		 	    {
 		 	     System.out.println("1:Paneer\n"); 
 	             System.out.println("Enter 4 to exit or Add more toppings to your pizza\n");

 		 	     cost=cost+60;
 		 	    }
 		 		else if(x==2)
 		 		 {
 		 		  System.out.println("2:Olives\n");	 
 	 	          System.out.println("Enter 4 to exit or Add more toppings to your pizza\n");

 		 	 	  cost=cost+60;
 		 		 }
 		 		else if(x==3)
 		 		 {
 		 		  System.out.println("3:Mushroom\n");
 	 	          System.out.println("Enter 4 to exit or Add more toppings to your pizza\n");

 		 		  cost=cost+60;
 		 		 }
 		 		else
 		 		{
 		 	
 		 			
 		 			System.out.println("Thank you, your total is\n"+cost);
 		 			break;
 		 	
 		 		}
 		 	  }
 			}
 		System.out.println("Would you like Sides and Bevarages\n");
 		System.out.println("Enter 1 to Continue Or Enter 0\n");
 		x=sc.nextInt();
 		if(x==0)
 		{
 			
 		}
 		else 
 		{
 			System.out.println("Choose your option\n");
 			System.out.println("1:-Apna Cola:- ₹ 90");
 			System.out.println("2:-Garlic Bread:- ₹ 150");
 			System.out.println("3:-White Sauce Pasta:- ₹ 250");
 			System.out.println("4:-Exit");
 			while(x<=5)
 		 	{
 		 		x=sc.nextInt();
 		 		if(x==1)
 		 	    {
 		 	     System.out.println("1:Apna Cola\n"); 
 	             System.out.println("Enter 4 to exit or Add more to your cart\n");

 		 	     cost=cost+90;
 		 	    }
 		 		else if(x==2)
 		 		 {
 		 		  System.out.println("2:Garlic Bread\n");	 
  	              System.out.println("Enter 4 to exit or Add more to your cart\n");

 		 	 	  cost=cost+150;
 		 		 }
 		 		else if(x==3)
 		 		 {
 		 		  System.out.println("3:White Sauce Pasta\n");
  	              System.out.println("Enter 4 to exit or Add more to your cart\n");

 		 		  cost=cost+250;
 		 		 }
 		 		else
 		 		{
 		 	
 		 			
 		 			break;
 		 	
 		 		}
 		 	  }
 			
 		   }
 		System.out.println("Total Cost= ₹"+cost);
 		System.out.println("Do you have any coupon code");
 		System.out.println("Enter y or n");
 		y=sc.next().charAt(0);
 		if(y=='y')
 		{
 			
 		  while(true)
 		  {
 			System.out.println("Please Enter Your Coupon Code");
 			code=sc.next();
 			if(s.equals(code))
 			{
 				
 				System.out.println("Congratulations!!!");
 	 			System.out.println("You are eligible for a discount of 50%");
 	 			cost=cost-(cost*0.5);
 	 			System.out.println("Sub Total is ₹"+cost);
 	 			System.out.println("C.Gst @ 2.5% "+(0.025*cost));
 	 			System.out.println("S.Gst @ 2.5% "+(0.025*cost));
 	 	 	    System.out.println("***************");
 	 	 	    cost=cost+(0.05*cost);
 	 	 	    System.out.println("Net Total is ₹"+(cost));

 	 			break;
 			}
 			else
 			{
 				System.out.println("Your coupon is not valid");
 				System.out.println("Sub Total is ₹"+cost);
 	 			System.out.println("C.Gst @ 2.5% "+(0.025*cost));
 	 			System.out.println("S.Gst @ 2.5% "+(0.025*cost));
 	 	 	    System.out.println("***************");
 	 	 	    cost=cost+(0.05*cost);
 	 	 	    System.out.println("Net Total is ₹"+(cost));
 				break;
 			}
 		 }
 		}  
 		else
 		{
 			System.out.println("Sub Total = ₹"+cost);
 			System.out.println("********************");
	 		System.out.println("C.Gst @ 2.5% "+(0.025*cost));
	 		System.out.println("S.Gst @ 2.5% "+(0.025*cost));
	  	    System.out.println("********************");
			cost=cost+(0.05*cost);
	 	    System.out.println("Net Total = ₹"+(cost)+"\n \n");
 		}
 	   System.out.println("Payment Method");
 	   System.out.println("1:Credit/Debit Card");  
 	   System.out.println("2:PayPal");	 
 	   System.out.println("3:Wallet");
 	   System.out.println("4:Cash on Delivery");
 	  while(x<=5)
      {
    	  x=sc.nextInt();
    	 if(x==1)
    	 {
           System.out.println("1:Credit/Debit Card\n"); 
           System.out.println("Enter 16 digit number");
           
           
           
           
           
    	 }
       	else if(x==2)
       	 {
       		System.out.println("2:PayPal\n");	 
            System.out.println("Enter username");
            
            System.out.println("Enter password");
            
            
            
       		
       	 }
       	else if(x==3)
      	 {
       		System.out.println("3:Wallet\n");
            System.out.println("Enter your wallet option");
            x=sc.nextInt();
       	 if(x==1)
       	 {
              System.out.println("1:Paytm"); 
              System.out.println("Enter Phone Number");
              
       	 }
          	else if(x==2)
          	 {
          		System.out.println("2:Mobikwik\n");	 
               System.out.println("Enter Phone Number");
          		
          	 }
          	else if(x==3)
         	 {
          		System.out.println("3:Ola Money\n");
               System.out.println("Enter Phone Number");
          		
         	 }
          	else 
         	 {
          		
          		break;
          	 }
       		
      	 }
       	else 
      	 {
       		System.out.println("4:Cash on Delivery\n");
       		System.out.println("Please keep the exact change of ₹ ="+cost);
       		break;
       	 }
       }
  	   System.out.println("**********************************************");
 	   System.out.println("**********************************************");
 	   System.out.println("***Thank you for ordering from M.U Pizzeria***");
 	   System.out.println("***Use Code 'MU50'for 50% off on next order***");
 	   System.out.println("**********************************************");
 	   System.out.println("**********************************************");
		 	
	}
 }



	