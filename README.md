# omniture_behat_generator
Generate behat script based on existing props and events

Required modules
  - omniture
  - date
  
Acess the config menu through the URL admin/config/evidence/behat_generator or admin/config

*You MUST create a folder named "Screenshot" inside behat folder.<br>
*This module has been tested using platform version 7.x-2.4.5. Please report any bugs.<br>
*Before the generated script is usable some changes must be made: 
  -<suitename> must be replaced with the suite name used in the search box.
  -<InsertUsernameHere> and <InsertPasswordHere> must be replaced with the omniture username and password. 
