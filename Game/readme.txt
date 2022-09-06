
------ SETUP TOOLS -------------------------------------------------------------------------------
This is need to do one time only for whole project. If these is any change in this, you need to update and run the setup again!
1. Download and setup Java
2. Checkout https://svn02/vc/mig_catalog/_rim_tools to somewhere (D:/rim_tools for example)
3. Run setup.bat

------ HOW TO BUILD -------------------------------------------------------------------------------

- Call make_data.bat for make data
- Call make_release for make .release folder. Then you can upload this folder to host and test it on real device

------ HOW TO RUN AND DEBUG -----------------------------------------------------------------------

- Make sure you have call make_data.bat first
- Call bd debug, it will auto run webpack and open your browser.

------ HOW TO RELEASE ON REAL SERVER --------------------------------------------------------------

- Goto https://oms.gameloft.org/mig_admv2/#home
- Select project and create your project.
- Go to Asset Debug section and upload all of file in release folder to server for testing & debugging with creative DEV only.
- Go to Asset Build section and build assets from SVN (ensure everything were committed to SVN in-order of build assets from SVN). Check the build output then save (don't forget it).
- Go to Creatives section and press publish, then browser for check your build on server.
