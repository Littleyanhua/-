@echo off
echo.
echo.  🚴 川藏线 G318 骑行社区
echo.  ============================
echo.
echo.  正在启动本地服务器...
echo.
python -m http.server 8080 --directory "%~dp0"
if errorlevel 1 (
    echo.
    echo.  ❌ Python未找到，尝试用浏览器直接打开...
    start "" "%~dp0index.html"
)
pause
