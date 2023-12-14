# Preparing the board for trace collection

The Trace Collector requires a current version of the board controller firmware to be programmed on the nRF52840 System on Chip (SoC) of the nRF9160 DK. Download the latest firmware from [nRF9160 DK Downloads](https://www.nordicsemi.com/Software-and-tools/Development-Kits/nRF9160-DK/Download#infotabs) (scroll down to **Board controller firmware**).

Complete the following steps to program the board controller firmware:

1. Set the switch that configures which chip to program to the **nRF52** position.</br>
   This switch is labeled **PROG/DEBUG** (**SW10** on nRF9160 DK v0.15.0 and later, **SW5** on earlier versions).

2. Connect your device to the computer with a Universal Serial Bus (USB) cable and power it on or reset it if it is already connected.

3. Program the downloaded firmware to your device.
    - To program the firmware with nRF Connect Programmer, follow the instructions in [Programming applications on nRF9160 DK](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/device_guides/working_with_nrf/nrf91/nrf9160.html#building_and_programming).
    - To program from the command line, open a terminal window in the directory that contains the downloaded firmware and enter the following command (replace `filename.hex` with the file name of the downloaded firmware image):

        ```bash
        nrfjprog --program filename.hex --sectorerase -f NRF52 -r --verify
        ```

        !!! note "Note"
              The nrfjprog tool, which is part of the [nRF Command Line Tools](https://docs.nordicsemi.com/bundle/ug_nrf_cltools/page/UG/cltools/nrf_command_line_tools_lpage.html), must be installed and in the path.