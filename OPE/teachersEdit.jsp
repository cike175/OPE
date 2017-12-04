<%@ page language="java" import="java.util.*, java.io.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>    
    <title>EditTicket.jsp</title>    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">	
 </head>  
  <body>
    <%
    	
    	String teachersName = new String(request.getParameter("teachersName").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String age = request.getParameter("age");
    	String year = request.getParameter("year");
    	String sex = new String(request.getParameter("sex").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String children = new String(request.getParameter("children").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String address = new String(request.getParameter("address").trim().getBytes("ISO-8859-1"), "UTF-8");
    	
    	
    	
    	System.out.println("teachersName = " + teachersName);
    	System.out.println("age = " + age);
    	System.out.println("year = " + year);
    	System.out.println("sex = " + sex);
    	System.out.println("children = " + children);
    	System.out.println("address = " + address);
    	
    	
    	
    	String json = "{'teachersName':'" + teachersName + "','age':'" + age + "','year':'" + year 
    				+ "','sex':'" + sex + "','children':'" + children +"','address':'" + address +"'}";
    	
    	PrintWriter pw = response.getWriter();
    	pw.write(json);
    	pw.flush();
    	pw.close();
    	
     %>
  </body>
</html>
