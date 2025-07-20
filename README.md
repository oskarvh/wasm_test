# Hello wasm Example

This project demonstrates how to build a simple "Hello, WebAssembly!" program, compiling with native (baremetal) wasm, with a custom [clay](https://github.com/nicbarker/clay) GUI.

The initial test was conducted to build the example gui, which was then changed to a custom gui.

---

## Prerequisites

- **CMake** (version 3.20 or higher)
- A POSIX-compatible shell (Linux/macOS). Windows users can use Git Bash or WSL.
- **Python3** (for running the web server)
- **clang** (version 18 or higher) Compiler for wasm. Install via e.g., `apt install clang`
- **lld** (version 18 or higher) Linker to use alongside clang. Install via e.g., `apt install lld`

---

## Project Structure
```
├── main.c
├── CMakeLists.txt
├── cmake/
│ └── wasm-toolchain.cmake
└── build/ # Build output directory
```

---
## Setup

Building the project will setup the external dependencies.

---
## Build

Configure and build the project using CMake:
```bash
cmake -B build -DCMAKE_TOOLCHAIN_FILE=cmake/wasm-toolchain.cmake
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

- The build system uses a custom CMake toolchain file at `cmake/wasm-toolchain.cmake` to target `wasm32`.  
- The setup script detects your platform and downloads the appropriate wasm SDK release.

