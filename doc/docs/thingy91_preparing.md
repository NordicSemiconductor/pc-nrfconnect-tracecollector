# Preparing the board for trace collection

The Trace Collector requires a current version of the board controller firmware to be programmed on the nRF52840 System on Chip (SoC) of the Nordic Thingy:91™.

Download the latest firmware from [Nordic Thingy:91 Downloads](https://www.nordicsemi.com/Software-and-Tools/Prototyping-platforms/Nordic-Thingy-91/Download#infotabs) (select **Precompiled application and modem firmware**).

The archive contains images for different applications in different formats. Choose an image based on the method you use to update the firmware:

- When programming through an external debug probe, follow the steps in [Updating firmware through external debug probe](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/device_guides/working_with_nrf/nrf91/thingy91_gsg.html#updating_the_thingy91_firmware) to program the nRF52840 SoC.
- When programming through Universal Serial Bus (USB), follow the steps in [Updating firmware through USB](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/device_guides/working_with_nrf/nrf91/thingy91_gsg.html#updating_the_thingy91_firmware) to program the nRF52840 SoC.