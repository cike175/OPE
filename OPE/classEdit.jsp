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
    	
    	String className = new String(request.getParameter("className").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String year = new String(request.getParameter("year").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String lingdao = new String(request.getParameter("lingdao").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String teachers = new String(request.getParameter("teachers").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String count = request.getParameter("count");
    	
    	
    	
    	System.out.println("className = " + className);
    	System.out.println("year = " + year);
    	System.out.println("lingdao = " + lingdao);
    	System.out.println("teachers = " + teachers);
    	System.out.println("count = " + count);
    	
    	
    	
    	String json = "{'className':'" + className + "','year':'" + year + "','lingdao':'" + lingdao 
    				+ "','teachers':'" + teachers + "','count':'" + count +"'}";
    	
    	PrintWriter pw = response.getWriter();
    	pw.write(json);
    	pw.flush();
    	pw.close();
    	
     %>
  </body>
</html>
