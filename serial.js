const wasmModule = await WebAssembly.instantiateStreaming(
  fetch("build/main.wasm"), {
    env: {
      // Optional WASI imports; empty if not used
    }
  }
);

const { memory, processSerialData, alloc, free } = wasmModule.instance.exports;

document.getElementById("connectBtn").addEventListener("click", async () => {
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });

  const reader = port.readable.getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done || !value) break;

    const ptr = alloc(value.length);
    const memView = new Uint8Array(memory.buffer, ptr, value.length);
    memView.set(value);

    processSerialData(ptr, value.length);
    free(ptr);
  }
});
