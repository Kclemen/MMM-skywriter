#!/usr/bin/env python

import signal
import skywriter
import time

some_value = 5000

last_airwheel = 0
delay = 5000

#def to_node(type, message):
    # convert to json and print (node helper will read from stdout)
 #   try:
 #       print(json.dumps({type: message}))
 #   except Exception:
  #      pass
    # stdout has to be flushed manually to prevent delays in the node helper communication
#	sys.stdout.flush()

#to_node("status", 'Skywriter started...')

@skywriter.flick()
def flick(start,finish):
  
  #slide music player div OFF the screen
  if(start == "north" and finish == "south"):
    print "gesture is north to south"
	#to_node("gesture", 'down')
 
 #slide music player div ONTO the screen
  elif(start == "south" and finish == "north"):
    print "gesture is south to north"
	#to_node("gesture", 'up')
  
  #Next track
  elif(start == "west" and finish == "east"):
    print "Gesture is west to east"
	#to_node("gesture", 'next')
  
  #previous track
  elif(start == "east" and finish == "west"):
    print "Gesture is east to west"
	#to_node("gesture", 'previous')
 
 #else:
   # print "Invalid"
   
@skywriter.airwheel()
def spinny(delta):
  global some_value
  global last_airwheel
  global delay
  some_value += delta
  if some_value < 0:
    some_value = 0
  if some_value > 10000:
    some_value = 10000
  now = int(round(time.time() * 1000))
  if(now - last_airwheel > delay):
    print("TV & Digibox: power")
 #   system("irsend SEND_ONCE TV KEY_POWER")
  #  system("irsend SEND_ONCE Digibox KEY_POWER")
    last_airwheel = now

signal.pause()