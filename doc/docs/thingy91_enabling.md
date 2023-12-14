# Enabling tracing in the application

To capture a modem trace, you must configure your application to enable trace output over Universal Asynchronous Receiver/Transmitter (UART).

The following instructions assume that your application is based on the [nRF Connect SDK](https://www.nordicsemi.com/Software-and-Tools/Software/nRF-Connect-SDK).

!!! note "Note"
      By default, nRF Connect SDK's modem library uses the UART1 peripheral for trace output. This means that you cannot use UART1 for other purposes in your application. If this does not work for your application, you must update the configuration and code of the modem library to use a different UART peripheral for trace output.

Complete the following steps to enable tracing:

1. Set the [`CONFIG_NRF_MODEM_LIB_TRACE`](https://docs.nordicsemi.com/bundle/ncs-latest/page/kconfig/index.html#CONFIG_NRF_MODEM_LIB_TRACE) option in your application.</br>
   See [Configuring your application](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/config_and_build/modifying.html#configuring_your_application) for instructions on how to set this option temporarily or permanently.

    !!! note "Note"
         - In nRF Connect SDK versions 1.5.0 - 2.0.0, the option was called `CONFIG_NRF_MODEM_LIB_TRACE_ENABLED`.
         - In nRF Connect SDK v1.5.x, setting the option temporarily might cause a build error. In that case, set the option permanently in the `prj.conf` file.
         - In nRF Connect SDK versions before 1.5.0, the option was called `CONFIG_BSD_LIBRARY_TRACE_ENABLED`.

2. Build your application and program it to the device.</br>

    - When programming through an external debug probe, set the switch that configures which chip to program (**SW2**) to the **nRF91** position and follow the instructions in [Building and programming from the source code](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/device_guides/working_with_nrf/nrf91/thingy91.html#building_and_programming_from_the_source_code).
    - When programming through Universal Serial Bus (USB), put the device into application serial recovery mode by pressing and holding the **SW3** button while powering on. Follow the instructions in [Getting started with Thingy:91](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/device_guides/working_with_nrf/nrf91/thingy91_gsg.html#updating_the_thingy91_firmware) to program the application.