@echo off

:loop
echo New push
echo -------- 
git add . && git commit -am "update %TIME%"
git push origin develop
echo -
timeout /t 1
echo -------------------
goto :loop

