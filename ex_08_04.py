# -*- coding: utf-8 -*-
"""
Created on Mon Sep 12 18:44:39 2022
8.4 Open the file romeo.txt and read it line by line. 
For each line, split the line into a list of words 
using the split() method. The program should build 
a list of words. For each word on each line check 
to see if the word is already in the list and 
if not append it to the list. When the program completes, 
sort and print the resulting words in python sort() 
order as shown in the desired output.
@author: Arturo
"""
while True:
    fname=input('Entre file name:   ')
    if len(fname)<1: #This is a shorcut to don't use the exact name romeo.txt#
        fname='romeo.txt'
    try:
        fh=open(fname)
        break
    except:
        print('File not found. Try again')
        continue
lst=list()
for line in fh:
    words=line.rstrip()
    adj=words.split()
    for w in range(len(adj)):
        if adj[w] in lst:
            continue
        lst.append(adj[w])
lst.sort()
print(lst)
#for i in range(len(lst)):
#    print(lst[i])
    
    


#    for w in range(len(words)):
 #       lst.append(words[w])
  #      print(lst[w])
    
    
        