import http.server, socketserver, os
os.chdir(r"C:\Users\19200\Desktop\川藏线")
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("0.0.0.0", 8080), Handler) as httpd:
    httpd.serve_forever()
