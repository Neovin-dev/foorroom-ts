# JS to Modular TS Code

conversion of this code from a singluar large unreadable and unmanagable file to typesafe. 
More modular and working on the principle of the "Seperation of Concern".

The distribution of the code is on the basis of use and bundling each thing according to usecase. 


Single Source of truth 
Seperation of Conern
DRY Dont repeat yourself 


-> for state of visablity of different elements 
Your current code is imperative. You're telling the program how to change the UI step-by-step in many different places:

"After adding a user, remove this class."

"If registrations are empty, add that class."

"When the window resizes, add this other class."

This is hard to manage. The better approach is declarative. You define the rules in one place and then just say "update the UI now."