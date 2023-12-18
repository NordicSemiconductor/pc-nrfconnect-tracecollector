# nRF Connect Trace Collector

nRF Connect Trace Collector is a cross-platform tool to capture trace files of the nRF9160 modem.

The tool collects Universal Asynchronous Receiver/Transmitter (UART) traces from the nRF9160 System in Package (SiP) over the serial port. If you run into problems when developing and debugging your application, Nordic Semiconductor's support team might ask you to provide these binary trace files to analyze the communication between the device and the LTE network.

The Trace Collector is implemented as an app for the [nRF Connect for Desktop](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop) application.

## Supported devices

- nRF9160 DK (PCA10090)
- Nordic Thingy:91™ (PCA20035)

You can also collect traces on a custom board that is based on the nRF9160 SiP.