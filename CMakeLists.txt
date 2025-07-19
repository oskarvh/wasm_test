cmake_minimum_required(VERSION 3.20)
project(hello_wasm C)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

# Pull in dependencies
include(FetchContent)
set(FETCHCONTENT_QUIET FALSE)
FetchContent_Declare(
    clay
    GIT_REPOSITORY "https://github.com/nicbarker/clay.git"
    GIT_TAG "v0.14"
    GIT_PROGRESS TRUE
    GIT_SHALLOW TRUE
)
# Fetch the content without building it
FetchContent_Populate(clay)


# Add the library for the gui
add_library(gui STATIC 
    ${CMAKE_SOURCE_DIR}/gui.c
)

# pull in dependencies into the demo
target_link_libraries(
    gui
    PUBLIC
)
target_include_directories(gui PUBLIC 
    ${clay_SOURCE_DIR}/
    ${CMAKE_SOURCE_DIR}/
)

add_compile_definitions(DCLAY_WASM)

add_executable(index main.c)

target_link_libraries(
    index 
    PUBLIC
    gui
)

# Set output to have .wasm suffix explicitly (optional)
set_target_properties(index PROPERTIES SUFFIX ".wasm")
