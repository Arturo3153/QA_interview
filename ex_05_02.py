# -*- coding: utf-8 -*-
"""
Created on Sat Aug 20 20:09:15 2022
5.2 Write a program that repeatedly prompts a user for integer numbers 
until the user enters 'done'. Once 'done' is entered, print out 
the largest and smallest of the numbers. If the user enters anything 
other than a valid number catch it with a try/except and put out an 
appropriate message and ignore the number. Enter 7, 2, bob, 10, and 4 
and match the output below.
@author: Arturo
"""
smallest_sf = None
largest_sf = None
while True:
    num=input(">")
    if num=="done":
        print("The smallest number is",smallest_sf)
        print("The largest number is",largest_sf)
        break
    try:
        _nmb=int(num)
    except:
        print("invalid value, try again")
        continue
    if smallest_sf==None:
        smallest_sf=_nmb
    if largest_sf==None:
        largest_sf=_nmb
    if smallest_sf>_nmb:
        smallest_sf=_nmb
    if largest_sf<_nmb:
        largest_sf=_nmb