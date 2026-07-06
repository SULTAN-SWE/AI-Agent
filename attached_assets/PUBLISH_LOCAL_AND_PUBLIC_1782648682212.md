# Local Run and Publish Path

## Run locally
1. Open the `enterprise_platform_server.py` file in the output folder.
2. Run: `python enterprise_platform_server.py`
3. Open: `http://127.0.0.1:8010` in the same machine.

## Public publish options
1. **VPS or cloud server**: copy the output files to a Linux server, install Python 3.12, run the script with a process manager, and put Nginx in front of it.
2. **PaaS**: move the app to a host like Render, Railway, or Fly.io, set `PLATFORM_PORT`, and use the host's public URL.
3. **Object host for the HTML shell**: if you only need the front end, upload `enterprise-ai-operations-platform-suite.html` to static hosting.

## Recommended next production step
- Replace the in-memory session store with a server-backed store.
- Move the SQLite file to a managed database.
- Add HTTPS and a real auth provider.
- Deploy behind a public domain and reverse proxy.
