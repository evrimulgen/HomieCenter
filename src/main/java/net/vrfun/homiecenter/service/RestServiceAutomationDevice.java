/*
 * Copyright (c) 2018 - 2020 by Botorabi. All rights reserved.
 * https://github.com/botorabi/HomieCenter
 *
 * License: MIT License (MIT), read the LICENSE text in
 *          main directory for more details.
 */
package net.vrfun.homiecenter.service;

import net.vrfun.homiecenter.fritzbox.FRITZBox;
import net.vrfun.homiecenter.model.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;


/**
 * A REST service providing access to home automation devices connected to a FRITZ!Box.
 *
 * @author          boto
 * Creation Date    7th June 2018
 */
@RestController
public class RestServiceAutomationDevice {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private FRITZBox fritzBox;


    @Autowired
    public RestServiceAutomationDevice(@NotNull final FRITZBox fritzBox) {
        this.fritzBox = fritzBox;
    }

    @GetMapping("/api/device")
    public ResponseEntity<List<DeviceInfo>> getDevices() {
        try {
            return new ResponseEntity<>(fritzBox.getDevices(), HttpStatus.OK);
        }
        catch (Exception exception) {
            LOGGER.debug("Problem occurred while retrieving the device list, reason: {}", exception.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/device/{id}")
    public ResponseEntity<DeviceInfo> getDevice(@PathVariable final Long id) {
        try {
            return new ResponseEntity<>(fritzBox.getDevice(id), HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/device/stats/{ain}")
    public ResponseEntity<DeviceStats> getDeviceStats(@PathVariable final String ain) {
        try {
            return new ResponseEntity<>(fritzBox.getDeviceStats(ain), HttpStatus.OK);
        }
        catch (Exception exception) {
            LOGGER.debug("Problem occurred while retrieving the device stats ({}), reason: {}", ain, exception.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/device/{id}/{command}")
    public ResponseEntity<Void> executeCommand(@PathVariable final Long id, @PathVariable final String command) {
        try {
            fritzBox.handleDeviceCommand(id, command);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception exception) {
            LOGGER.debug("Problem occurred while executing command, reason: {}", exception.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
