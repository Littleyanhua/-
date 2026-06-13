import os
import sys

# Add project root to Python path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chuanzang_site.settings')

# Import the WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Vercel serverless handler
def handler(request):
    """Vercel Python serverless handler."""
    from django.http import HttpRequest
    from django.core.handlers.wsgi import WSGIHandler
    
    # For Vercel's Python runtime, we use the ASGI/WSGI bridge
    from urllib.parse import urlparse, parse_qs
    from io import BytesIO
    
    # Build WSGI environ from Vercel's request
    path = request.get('path', '/')
    method = request.get('method', 'GET')
    headers = request.get('headers', {})
    body = request.get('body', '')
    query_string = request.get('queryString', '')
    
    environ = {
        'REQUEST_METHOD': method,
        'PATH_INFO': path,
        'QUERY_STRING': query_string,
        'SERVER_NAME': 'vercel',
        'SERVER_PORT': '443',
        'wsgi.url_scheme': 'https',
        'wsgi.input': BytesIO(body.encode('utf-8') if isinstance(body, str) else body or b''),
        'wsgi.errors': sys.stderr,
        'wsgi.multithread': False,
        'wsgi.multiprocess': False,
        'wsgi.run_once': False,
        'CONTENT_TYPE': headers.get('content-type', ''),
        'CONTENT_LENGTH': str(len(body or '')),
    }
    
    # Copy request headers to WSGI environ
    for key, value in headers.items():
        wsgi_key = 'HTTP_' + key.upper().replace('-', '_')
        environ[wsgi_key] = value
    
    # Run Django WSGI
    result = {}
    def start_response(status, response_headers):
        result['status'] = status
        result['headers'] = dict(response_headers)
    
    response_body = application(environ, start_response)
    
    return {
        'statusCode': int(result.get('status', '200').split()[0]),
        'headers': result.get('headers', {}),
        'body': b''.join(response_body).decode('utf-8') if response_body else ''
    }
