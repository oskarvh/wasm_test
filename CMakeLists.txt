cmake_minimum_required(VERSION 3.20)
project(hello_wasm C)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

add_executable(index hello.c)

# Set output to have .wasm suffix explicitly (optional)
set_target_properties(index PROPERTIES SUFFIX ".wasm")
