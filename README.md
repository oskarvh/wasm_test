# Hello WASI Example

This project demonstrates how to build a simple "Hello, WebAssembly!" program targeting WASI using the official WASI SDK.

---

## Prerequisites

- **CMake** (version 3.20 or higher)
- **curl** (for downloading the WASI SDK)
- A POSIX-compatible shell (Linux/macOS). Windows users can use Git Bash or WSL.
- **Python3** (for running the web server)

---

## Project Structure
```
├── main.c
├── CMakeLists.txt
├── cmake/
│ └── wasi-toolchain.cmake
├── scripts/
│ └── setup.sh
├── external/ # Contains the downloaded WASI SDK after running setup.sh
└── build/ # Build output directory
```

---
## Setup

Run the setup script to download and extract the WASI SDK for your platform:

```bash
./scripts/setup.sh
```
This will place the WASI SDK into the external/wasi-sdk directory.

---
## Build

Configure and build the project using CMake:
```bash
cmake -B build -DCMAKE_TOOLCHAIN_FILE=cmake/wasi-toolchain.cmake
cmake --build build
```
The output WebAssembly binary will be:
```bash
build/index.wasm
```

---
## Run
Start the server:
```bash
python3 -m http.server 8000
```

Open [`http://localhost:8000/index.html`](http://localhost:8000/index.html) in your browser.

---

## Notes

- The build system uses a custom CMake toolchain file at `cmake/wasi-toolchain.cmake` to target `wasm32-wasi`.  
- The setup script detects your platform and downloads the appropriate WASI SDK release.

## Using native wasm without wasi
Install clang and lld:
- `sudo apt-get install clang`
- `sudo apt-get install lld`

