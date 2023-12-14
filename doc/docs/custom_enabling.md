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

2. Configure the board's devicetree to match the hardware setup. See [trace on a custom board](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/libraries/modem/nrf_modem_lib/nrf_modem_lib_trace.html#sending_traces_over_uart_on_a_custom_board) for more details.

3. Build your application and program it to the device.