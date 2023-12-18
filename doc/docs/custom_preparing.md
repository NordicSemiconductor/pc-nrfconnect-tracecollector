# Preparing the board for trace collection

Trace Collector requires the board to appear as a COM port on the computer. This can be done using a Universal Asynchronous Receiver/Transmitter (UART) to Universal Serial Bus (USB) device.

!!! note "Note"
      The UART to USB device must support high throughput to keep up with the modem trace output. By default, the UART trace backend in the [nRF Connect SDK](https://www.nordicsemi.com/Software-and-Tools/Software/nRF-Connect-SDK) outputs traces with a baud rate of 1 000 000.
